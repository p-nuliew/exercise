// javascript
document.getElementById('btn').addEventListener('click', function () {
  require(['./utils/alert'], function (alert) {
    alert.alertName('周杰伦')
  })
})
