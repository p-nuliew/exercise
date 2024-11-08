#!/bin/bash

# 默认参数
CMD_SOURCE="npm"
BUILD_CMD="run build"
BUILD_PATH="./dist"
REMOTE_PATH="/var/www/face"
REMOTE_USER="donny"
REMOTE_HOST="192.168.8.215"
REMOTE_PORT="22"

function show_help {
  echo "Usage: publish.sh [options]"
  echo
  echo "Options:"
  echo "  -s, --cmd-source      构建命令 (default: 'npm')"
  echo "  -b, --build-cmd       构建命令 (default: 'run build')"
  echo "  -p, --build-path      构建产物路径 (default: './dist')"
  echo "  -r, --remote-path     远程服务器目标路径 (default: '/var/www/face')"
  echo "  -u, --remote-user     远程服务器用户名 (default: 'donny')"
  echo "  -h, --remote-host     远程服务器地址 (default: '192.168.8.215')"
  echo "  -P, --remote-port     远程服务器端口 (default: '22')"
  echo "  --help                显示帮助信息"
}

# 解析命令行参数
while [[ "$#" -gt 0 ]]; do
  case $1 in
  -b | --build-cmd)
    BUILD_CMD="$2"
    shift
    ;;
  -s | --cmd-source)
    CMD_SOURCE="$2"
    shift
    ;;
  -p | --build-path)
    BUILD_PATH="$2"
    shift
    ;;
  -r | --remote-path)
    REMOTE_PATH="$2"
    shift
    ;;
  -u | --remote-user)
    REMOTE_USER="$2"
    shift
    ;;
  -h | --remote-host)
    REMOTE_HOST="$2"
    shift
    ;;
  -P | --remote-port)
    REMOTE_PORT="$2"
    shift
    ;;
  --help)
    show_help
    exit 0
    ;;
  *)
    echo "Unknown parameter passed: $1"
    show_help
    exit 1
    ;;
  esac
  shift
done

# 执行构建命令
echo "Running build command: $BUILD_CMD"

"$CMD_SOURCE" $BUILD_CMD
# /mnt/c/Program\ Files/nodejs/npm run build
if [ $? -ne 0 ]; then
  echo "Build failed"
  exit 1
fi

echo "Build success"

# 打包构建产物
PACKAGE_NAME="dist_package.tar.gz"
echo "Packaging build artifacts from $BUILD_PATH"
tar -zcvf $PACKAGE_NAME $BUILD_PATH

# 传输打包文件到远程服务器
echo "Transferring package to remote server $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"
scp -P $REMOTE_PORT $PACKAGE_NAME $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

if [ $? -ne 0 ]; then
  echo "Failed to transfer package"
  rm $PACKAGE_NAME
  exit 1
fi

# 连接远程服务器解压文件并清理
echo "Connecting to remote server to extract package"
ssh $REMOTE_USER@$REMOTE_HOST -p $REMOTE_PORT "
cd $REMOTE_PATH &&
find . -type f ! -name $PACKAGE_NAME -exec rm {} +
tar -zxvf $PACKAGE_NAME --strip-components=2 &&
rm $PACKAGE_NAME
"

# 清理本地打包文件
rm $PACKAGE_NAME

echo "Deployment completed successfully"
