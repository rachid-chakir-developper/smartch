import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/user/user.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql';
import { LoginTypeResponse } from './auth.schema';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>
  ) {}

  async getToken(email, _id): Promise<string> {
        try {
            return await this.jwtService.signAsync({ email, _id });
            //return await this.jwtService.sign({ email, _id });
        } catch (err) {
            console.error(err);
        }
    }

  async login({ password, email }) {
    try {
        const user = await this.userModel.findOne({ email });
        return user && (await bcrypt.compare(password, user.password))
        ? this.getToken(email, user._id).then((accessToken) => {
            return <LoginTypeResponse>{user, accessToken}
        })
        : new GraphQLError('Invalid credentials.');
    } catch (err) {
        console.error(err);
    }
}
}