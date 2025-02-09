import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({})
  age: number;

  @Prop([String])
  hobbies: string[];

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
