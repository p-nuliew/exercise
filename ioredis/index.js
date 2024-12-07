import Ioredis from 'ioredis';

const ioredis = new Ioredis({
  host: 'localhost', //ip
  port: 6379, //端口
});

//存储字符串并且设置过期时间
ioredis.setex('key', 10, 'value');
//普通存储
ioredis.set('key', 'value');
//读取
ioredis.get('key');

//删除
ioredis.del('key');

// 集合
// 添加元素到集合
ioredis.sadd('myset', 'element1', 'element2', 'element3');
// 获取集合中的所有元素
ioredis.smembers('myset');
// 获取集合中的元素个数
ioredis.scard('myset');
// 删除集合中的元素
ioredis.srem('myset', 'element1', 'element2');
// 判断元素是否存在于集合中
ioredis.sismember('myset', 'element1');

// 哈希
// 添加元素到哈希
ioredis.hset('myhash', 'key1', 'value1', 'key2', 'value2');
// 获取哈希中的所有元素
ioredis.hgetall('myhash');
// 获取哈希中的元素个数
ioredis.hlen('myhash');
// 删除哈希中的元素
ioredis.hdel('myhash', 'key1', 'key2');
// 判断元素是否存在于哈希中
ioredis.hexists('myhash', 'key1');

// 队列
// 在队列的头部添加元素
ioredis.lpush('myqueue', 'element1', 'element2', 'element3');
// 获取队列中的所有元素
ioredis.lrange('myqueue', 0, -1);
// 获取队列中的元素个数
ioredis.llen('myqueue');
// 删除队列中的元素
ioredis.lpop('myqueue');
// 判断元素是否存在于队列中
ioredis.lindex('myqueue', 0);

// 发布订阅
// 创建另一个 Redis 实例
const redis2 = new Ioredis();

// ioredis 订阅频道 ’channel1‘
ioredis.subscribe('’channel1‘', (message) => {
  console.log(message);
});

// ioredis 监听消息事件
ioredis.on('message', (channel, message) => {
  console.log(channel, message);
});

// 发布消息到频道 ’channel1‘
redis2.publish('’channel1‘', 'hello world');
