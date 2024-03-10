const fileInput = document.getElementById('file-input')
const uploadBtn = document.getElementById('upload-btn');
const readBlobBtn = document.getElementById('read-blob');

fileInput.addEventListener('change', (e) => {
  console.log(e.target === fileInput) // true
  const files = e.target.files
  console.log('files', files)
})


// 验证文件大小
uploadBtn.addEventListener('click', () => {
  const selectedFile = fileInput.files[0];
  const fileSizeLimit = 100 * 1024 * 1024; // 100 MB in bytes

  if (selectedFile.size > fileSizeLimit) {
    alert('Selected file exceeds the size limit of 100 MB. Please select a smaller file.');
    return;
  }

  // If file size is within the limit, proceed with file upload
  // Your code for uploading the file to the server goes here
});

// 显示文件读取进度
const reader = new FileReader()

reader.addEventListener('progress', (e) => {
  if (e.loaded && e.total) {
    // 计算完成百分比
    const percent = (e.loaded / e.total) * 100
    // 将值设置为进度组件
    progress.value = percent
  }
})
readBlobBtn.addEventListener('click', () => {
  const selectedFile = fileInput.files[0];
  // 以 URL 二进制字符串的形式读取数据
  reader.readAsDataURL(selectedFile);
})



// 拖放
const dropZone = document.getElementById('drop-zone');

dropZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', (event) => {
  event.preventDefault();
  dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (event) => {
  event.preventDefault();
  dropZone.classList.remove('drag-over');
  // 获取文件
  const files = event.dataTransfer.files;
  console.log('files: ', files);

  // const xhr = new XMLHttpRequest();
  // xhr.open('POST', '/upload');

  // xhr.onload = () => {
  //   console.log('File uploaded successfully');
  // };

  // xhr.onerror = () => {
  //   console.log('File upload failed');
  // };

  // const formData = new FormData();
  // formData.append('file', files[0]);

  // xhr.send(formData);
});


// 下载
const imgUrl = 'https://nd-news-mangement.oss-cn-hangzhou.aliyuncs.com/2023/04/274a8263e05f37a5d8663193b86e1a0583.png'
// location.href = imgUrl

function downloadFile(url, fileName) {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  // download仅适用于同源 URL
  link.download = fileName;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
// downloadFile(imgUrl, '123')