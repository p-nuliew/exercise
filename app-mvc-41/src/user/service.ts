import { injectable, inject } from 'inversify';
import { UserDto } from './user.dto';
import { plainToClass } from 'class-transformer'; //dto验证
import { validate } from 'class-validator'; //dto验证
import { PrismaDB } from '../db';
@injectable()
export class UserService {
  constructor(
    @inject(PrismaDB) private readonly PrismaDB: PrismaDB, //依赖注入
  ) {}

  public async getUserInfo() {
    return await this.PrismaDB.prisma.user.findMany(); // 查询数据
  }

  public async createUser(data: UserDto) {
    const user = plainToClass(UserDto, data); // 1. 把data转换成UserDto
    const errors = await validate(user); // 2. 验证
    const dto = [];
    if (errors.length) {
      errors.forEach((error) => {
        Object.keys(error.constraints).forEach((key) => {
          dto.push({
            [error.property]: error.constraints[key],
          });
        });
      });
      return dto;
    } else {
      const userInfo = await this.PrismaDB.prisma.user.create({ data: user });
      return userInfo;
    }
  }
}
