### 表结构编写

- 在 schema.prisma 写完之后，执行 prisma migrate dev (该命令会覆盖库，建议新建一个库)
- prisma migrate dev: 生成 sql 文件->执行 sql 文件->安装 prisma 依赖
