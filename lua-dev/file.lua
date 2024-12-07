-- 读取文件内容
local file = io.open('index.txt', 'r')
print(file:read())

-- 写入文件
local file = io.open('index.txt', 'w')
file:write('hello world')
file:close()
