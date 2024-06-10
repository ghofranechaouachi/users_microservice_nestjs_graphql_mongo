// users.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Field, ObjectType ,ID} from '@nestjs/graphql';
import {hash} from "bcrypt";
@Schema()
@ObjectType()
export class User extends Document {
  @Field(() => ID) // Use @Field(() => ID) for the id field
  _id: string;
  @Prop({ required: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @Field()
  username: string;

  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  @Field()
  role: string;
  @Prop()
  @Field()
  storeName?: string;// Only for sellers
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre<User>('save', async function (next: Function) {
    this.password = await hash(this.password, 10)
    next()
  })