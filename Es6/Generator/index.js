const userList = [
  {name: 'tom'}
]

const getUser = function () {
  return new Promise(function(reslove, reject) {
    setTimeout(() => reslove(userList), 1000)
  } )
}

