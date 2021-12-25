import { Injectable } from '@nestjs/common';
import { User, UserDocument } from './user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GraphQLError } from 'graphql';
import * as bcrypt from 'bcrypt';
import {  RegisterInput } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async register(registerInput: RegisterInput) {
        try {
          const isUser = await this.userModel.findOne({
            email: registerInput.email,
          });
          if (isUser) {
            throw new GraphQLError('Nah Bro, you already exist 🤡');
          } else {
            registerInput.password = await bcrypt
              .hash(registerInput.password, 10)
              .then((r) => r);
            return await new this.userModel(registerInput).save();
          }
        } catch (err) {
          console.error(err);
        }
      }

    findOneById(id){}

    async findOne(username: string): Promise<User> {
        return this.userModel.findOne({email : username}).exec();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }
}
