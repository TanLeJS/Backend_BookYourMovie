import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  RegisterGoogleUserDto,
  RegisterUserDto,
} from 'src/users/dto/register-user.dto';
import { IUser } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  //username password là 2 tham số thư viện trả về
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isValid = this.usersService.isValidPassword(
        password,
        user.password,
      );
      if (isValid === true) {
        return user;
      }
    }
    return null;
  }

  async login(user: IUser) {
    const { _id, name, email } = user;
    const payload = {
      sub: 'token login',
      iss: 'from server',
      _id,
      name,
      email,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
      },
    };
  }

  async register(user: RegisterUserDto) {
    const newUser = await this.usersService.register(user);
    return {
      _id: newUser?._id,
      createdAt: newUser?.createdAt,
    };
  }

  async registerWithGoogle(user: RegisterGoogleUserDto) {
    const newGoogleUser = await this.usersService.registerWithGoogle(user);
    return {
      _id: newGoogleUser?._id,
      createdAt: newGoogleUser?.createdAt,
    };
  }
}
