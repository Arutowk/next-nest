import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { jwtConstants } from '../constant';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';

//不能直接使用 passport 包，而是与包装器 @nestjs/passport 交互，它会在底层调用 passport 包
//要使用 @nestjs/passport 来配置一个策略，你需要创建一个扩展自 PassportStrategy 的类
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  //将与你的数据库交互，并根据 JWT 负载获取一个用户。如果找到了用户，validate() 方法则应返回用户对象
  async validate(payload: any): Promise<Omit<User, 'password'>> {
    const existUser = await this.userService.findOne(payload.sub);

    if (!existUser) {
      throw new UnauthorizedException();
    }

    return { ...payload, id: payload.sub };
  }

  // You can throw an exception based on either "info" or "err" arguments
  // handleRequest(err, user, info) {
  //   if (err || !user) {
  //     throw err || new UnauthorizedException();
  //   }
  //   return user;
  // }
}

//The first strategy to succeed, redirect, or error will halt the chain. Authentication failures will proceed through each strategy in series, ultimately failing if all strategies fail.
//export class JwtAuthGuard extends AuthGuard(['strategy_jwt_1', 'strategy_jwt_2', '...']) { ... }
