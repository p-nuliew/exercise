const { execSync } = require('node:child_process');

// execSync('ffmpeg -version');

// 视频转gif
// execSync(`ffmpeg -i test.mp4 test.gif`, { stdio: 'inherit' });

// 视频添加水印
// execSync(
//   `ffmpeg -i test.mp4 -vf drawtext=text="XMZS":fontsize=30:fontcolor=white:x=10:y=10 test2.mp4`,
//   { stdio: 'inherit' },
// );

// 视频裁剪+控制大小
// execSync(`ffmpeg -ss 10 -to 20 -i test.mp4  test3.mp4`, { stdio: 'inherit' });

// 提取视频的音频
// execSync(`ffmpeg -i test.mp4 test.mp3`, { stdio: 'inherit' });

// 去掉水印
execSync(
  `ffmpeg -i  test2.mp4 -vf delogo=w=120:h=30:x=10:y=10 test_qushuiying.mp4`,
  {
    stdio: 'inherit',
  },
);
