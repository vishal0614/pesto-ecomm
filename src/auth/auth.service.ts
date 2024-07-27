import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.username, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = { username: user.username, sub: user.userId };

    // Generate the JWT token
    const accessToken = this.jwtService.sign(payload);
    // Store the JWT token in the database
    await this.usersService.updateToken(user?._id, accessToken);
    return {
      access_token: accessToken,
    };
  }

  async register(username: string, password: string) {
    return this.usersService.create(username, password);
  }
}
