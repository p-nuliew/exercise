import { IsNotEmpty, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

//数据验证和转换
export class UserDto {
  @IsNotEmpty({ message: '用户名必填' })
  @Transform((user) => user.value.trim())
  name: string;

  @IsNotEmpty({ message: '邮箱必填' })
  @IsEmail({}, { message: '邮箱格式不正确' })
  @Transform((user) => user.value.trim())
  email: string;
}
