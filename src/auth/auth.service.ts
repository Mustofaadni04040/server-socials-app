import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/sign-in.dto';

const SALT = 10;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}
  async signUp(SignUpDto: SignUpDto) {
    const hashedPassword = await bcrypt.hash(SignUpDto.password, SALT);
    const existingUser = await this.userModel.findOne({
      email: SignUpDto.email,
    });

    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const user = new this.userModel({
      name: SignUpDto.name,
      email: SignUpDto.email,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    const payload = {
      _id: savedUser._id,
      name: savedUser.name,
      email: savedUser.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { user: savedUser, accessToken };
  }

  async signIn(SignInDto: SignInDto) {
    const user = await this.userModel.findOne({
      email: SignInDto.email,
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(SignInDto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Password not matched, try again');
    }

    const payload = {
      _id: user._id,
      name: user.name,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return { user, accessToken };
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
