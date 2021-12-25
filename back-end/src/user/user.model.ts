import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  firstName?: string;

  @Prop()
  lastName?: string;

  @Prop()
  email?: string;

  @Prop()
  password?: string;

  @Prop()
  watchListMovies: any[];

  @Prop()
  likedMovies: any[];
}

export const UserSchema = SchemaFactory.createForClass(User);