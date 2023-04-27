// 621. 任务调度器
const tasks = ['A', 'B', 'C', 'D', 'A']
let arr = Array(26).fill(0);
for (let c of tasks) {
    //统计各个字母出现的次数
    arr[c.charCodeAt() - "A".charCodeAt()]++;
}
console.log(arr);