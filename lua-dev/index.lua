-- 导入模块
local Modules = require('./utils')
print(Modules.add(1, 2))

-- name = '12'
-- -- name = 3
-- print(name)
do
    local name = '34'
    print(name)
end

local type = 1
local type = 'str'
-- arr 
local type = {1, 2, 3}
print(type[1])

-- obj 
local obj = {
    a = 1,
    b = 2,
    c = 3
}
print(obj.a)

-- 条件写法
local a = ww
if a == 1 then
    print(1)
elseif a == 2 then
    print(2)
else
    print(3)
end

-- 函数写法
local function func(a, b)
    print(a + b)
end
func(2, 2)

local function func2(a, b)
    print(a + b)
    return 'wer'
end
local res = func2(2, 2)
print(res)

-- 循环写法
for i = 1, 10 do
    print(i)
end
-- 循环写法，步进为2
for i = 1, 10, 2 do
    print(i)
end
-- 循环数组，lua的索引是从1开始的
local arr = {10, 20, 30}
for index, value in ipairs(arr) do
    print(index, value)
end
-- 循环对象，lua的索引是从1开始的
local obj = {
    a = 100,
    b = 200,
    c = 300
}
for index, value in pairs(obj) do
    print(index, value)
end
