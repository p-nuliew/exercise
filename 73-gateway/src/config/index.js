export const rateLimitConfig = {
  max: 5, //每 1 分钟最多允许 5 次请求
  timeWindow: '1 minute', //一分钟
};

export const cachingConfig = {
  privacy: 'private', //缓存客户端服务器 禁止缓存代理服务器
  expiresIn: 30 * 1000, //缓存30s
};

export const breakerConfig = {
  errorThresholdPercentage: 40, //超过 40% 会触发熔断
  timeout: 1000, //超过 1s 会触发熔断
  resetTimeout: 5000, //熔断后 5s 会重置
};
