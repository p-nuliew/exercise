import {
  controller,
  httpGet as GetMapping,
  httpPost as PostMapping,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { UserService } from './service';
import type { Request, Response } from 'express';
import { JWT } from '../jwt';
const { middleware } = new JWT();

// ts 类型扩充：因为express中req.user是any类型，需要类型扩充user类型
declare global {
  namespace Express {
    interface User {
      id: number;
      name: string;
      email: string;
    }
  }
}

@controller('/user') //路由
export class UserController {
  constructor(
    @inject(UserService) private readonly userService: UserService, //依赖注入
  ) {}

  @GetMapping('/index', middleware()) //get请求,接口鉴权
  public async getIndex(req: Request, res: Response) {
    // 类型扩充后可以直接使用类型user.id
    console.log(req.user.id);
    const info = await this.userService.getUserInfo();
    res.send(info);
  }

  @PostMapping('/create') //post请求
  public async createUser(req: Request, res: Response) {
    console.log(req.body);
    const user = await this.userService.createUser(req.body);
    res.send(user);
  }
}
