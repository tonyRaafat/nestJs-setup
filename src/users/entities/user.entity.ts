import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

enum Role {
  admin = 'admin',
  user = 'user',
}

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({})
  age: number;

  @Prop([String])
  hobbies: string[];

  @Prop(Role)
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
