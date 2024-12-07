分布式锁：通过 Redis 的原子性操作和 Lua 的脚本编写能力，可以实现分布式锁机制，用于解决并发访问和资源竞争的问题

本 dome 并没有用到 lua 分布式锁功能。

一个分布式锁的例子：

```lua
-- 这才是分布式锁的示例
local key = KEYS[1]
local value = ARGV[1]    -- 通常是客户端唯一标识
local expireTime = ARGV[2]

-- 尝试获取锁（必须确保不存在才能设置）
if redis.call('setnx', key, value) == 1 then
    -- 设置过期时间（防止死锁）
    redis.call('expire', key, expireTime)
    return 1
else
    return 0
end
```

分布式锁是：确保互斥访问
分布式锁使用互斥设置（setnx）
分布式锁适合：秒杀、库存扣减等
