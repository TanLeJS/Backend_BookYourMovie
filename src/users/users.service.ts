import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import {
  RegisterGoogleUserDto,
  RegisterUserDto,
} from './dto/register-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async register(registerUserDto: RegisterUserDto) {
    const { name, email, password, phone } = registerUserDto;
    //add logic check email
    const isExist = await this.userModel.findOne({ email });
    if (isExist) {
      throw new BadRequestException(`Email ${email} đã tồn tại trên hệ thống`);
    }
    const hashPassword = this.getHashPassword(password);
    const newRegister = await this.userModel.create({
      name,
      email,
      password: hashPassword,
      phone,
      type: 'SYSTEM',
      createdAt: new Date(),
    });
    return newRegister;
  }

  async registerWithGoogle(registerGoogleUserDto: RegisterGoogleUserDto) {
    const { type, name, email } = registerGoogleUserDto;
    const isExist = await this.userModel.findOne({ email });
    const hashPassword = this.getHashPassword(
      Math.random().toString(36).slice(-8),
    );
    if (isExist) {
      throw new BadRequestException(
        `Email ${email} has already exist. Please try another different email`,
      );
    } else {
    }
    const newGoogleRegister = await this.userModel.create({
      name,
      email,
      type,
      password: hashPassword,
      phone: '',
      createdAt: new Date(),
    });
    return newGoogleRegister;
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  findOneByUsername(username: string) {
    return this.userModel.findOne({
      email: username,
    });
  }

  isValidPassword(password: string, hash: string) {
    return compareSync(password, hash);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
