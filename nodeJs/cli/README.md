在根目录执行:
node nodeJs/cli/index.js create [projectName]

或者使用 npm link 添加软连接：

## npm link 的作用

npm link 是一个非常有用的 npm 命令，它可以：

1. 在全局 node_modules 目录下创建一个符号链接（软链接），指向当前项目
2. 将项目中的可执行文件链接到全局环境，使其可以在任何地方执行

## 如何使用

1. 首先确保你的 package.json 配置正确（你已经配置好了）：

```json
{
  "bin": {
    "cwl-cli": "nodeJs/cli/index.js"
  }
}
```

2. 确保你的入口文件 index.js 第一行添加了 shebang：

3. 执行以下步骤：

```bash
# 进入项目目录
cd 你的项目目录

# 执行 npm link
npm link
```

## 验证安装

完成后，你可以在终端中的任何位置执行：

```bash
cwl-cli
```

如果要取消全局链接，可以使用：

```bash
npm unlink cwl-cli
```

## 注意事项

1. 执行 npm link 时需要管理员权限，在 Unix 系统中可能需要使用 sudo
2. 确保 index.js 文件有可执行权限（Unix 系统）：

这样设置后，你就可以在全局范围内使用 cwl-cli 命令了。这对于本地开发和测试 CLI 工具特别有用。
