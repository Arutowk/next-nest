import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/LoginDto';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { jwtConstants } from './constant';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authPayload: LoginDto) {
    const existUser = await this.userService.findByUsername(
      authPayload.username,
    );
    if (!existUser) {
      return null;
    }

    const isMatch = await bcrypt.compare(
      authPayload.password,
      existUser.password,
    );

    if (!isMatch) {
      return null;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: ignorePass, ...restUser } = existUser;

    return restUser;
  }

  async login(user: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...restUser } = user;
    const payload = { ...restUser, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
      user: restUser,
      expiresIn: jwtConstants.expiresIn,
    };
  }
}
