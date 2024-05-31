import { Body, Controller, Post } from '@nestjs/common';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { RegisterUserDto } from 'src/users/dto/register-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @ResponseMessage('Register a user')
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }
}
