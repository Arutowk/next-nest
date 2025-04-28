import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { SignInInput } from './dto/signin.input';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import { User } from '@repo/database';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor( private prisma:PrismaService,private jwtService:JwtService,private configService: ConfigService,){}

    async validateLocalUser({ email, password }: SignInInput) {
        const user=await this.prisma.user.findUnique({
            where:{
                email
            }
        })

        if(!user) throw new UnauthorizedException("User Not Found")
        
        const passwordMatched=await verify(user.password,password)
        if(!passwordMatched)throw new UnauthorizedException('Invalid Credentials!')

        return user
    }

    async generateToken(userId:number){
        const payload: AuthJwtPayload = { sub: userId }
        const accessToken=await this.jwtService.signAsync(
            payload,
            {
                expiresIn:this.configService.get<string>('JWT_EXPIRIES_IN'),
                secret:this.configService.get<string>('JWT_SECRET')
            }
        )
        return { accessToken };
    }

    async login(user: User) {
        const { accessToken } = await this.generateToken(user.id);
        return {
          id: user.id,
          name: user.name,
          avatar: user.avatar,
          accessToken,
        };
    }

    async validateJwtUser(userId:number){
        const user=await this.prisma.user.findUnique({
            where:{
                id:userId
            }
        })

        if(!user)throw new UnauthorizedException("User not found!")

        const currentUser={id:user.id}
        return currentUser
    }
}
