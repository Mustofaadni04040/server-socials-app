import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/create-auth.dto';
import { TransformDTO } from 'src/_cores/interceptors/transform-dto.interceptor';
import { ResponseAuthDTO } from './dto/response-auth.dto';

@Controller('auth')
@TransformDTO(ResponseAuthDTO)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async create(@Body() SignUpDto: SignUpDto) {
    return this.authService.create(SignUpDto);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string) {
    return 'This action updates a #${id} auth';
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
