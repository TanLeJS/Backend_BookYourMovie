import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { Public, ResponseMessage } from 'src/decorator/customize';
import { RegisterGoogleUserDto, RegisterUserDto } from 'src/users/dto/register-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Public()
  @ResponseMessage('Register a user successfully')
  @Post('/register')
  handleRegister(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Public()
  @ResponseMessage('Register a user successfully')
  @Post('/google')
  handleRegisterWithGoogle(@Body() registerGoogleUserDto: RegisterGoogleUserDto) {
    return this.authService.registerWithGoogle(registerGoogleUserDto);
  }
}
