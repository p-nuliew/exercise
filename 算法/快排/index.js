var arr1 = [1, 6, 63, 5];
function quickSort(arr) {
  var arrLength = arr.length;
  console.log("arrLength: ", arrLength);
  if (arrLength <= 1) return arr;
  var index = Math.floor(arrLength / 2);
  var base = arr.splice(index, 1)[0];
  var left = [];
  var right = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < base) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  return quickSort(left).concat([base], quickSort(right));
}

console.log(quickSort(arr1));

// var arr2 = [3, 34];
// function qs(arr) {
//   if (arr.length <= 1) return arr;
//   const left = [];
//   const right = [];
//   const [a, ...rest] = arr;
//   rest.forEach((x) => {
//     if (x < a) {
//       left.push(x);
//     } else {
//       right.push(x);
//     }
//   });

//   return [...qs(left), a, ...qs(right)];
// }
// console.log(arr2 === qs(arr2));
