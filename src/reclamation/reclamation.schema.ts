import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose'; // Import Schema as MongooseSchema
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../users/users.schema'; // Import User schema

@Schema()
@ObjectType()
export class Reclamation extends Document {
  @Field(() => ID) // Use @Field(() => ID) for the id field
  _id: string;
  @Prop({ required: true })
  @Field()
  title: string;

  @Prop({ required: true })
  @Field()
  description: string;

  @Prop({ default: Date.now })
  @Field()
  createdAt: Date;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' }) // Use MongooseSchema.Types.ObjectId
  @Field(() => User, { nullable: true })
  createdBy: User;

}

export const ReclamationSchema = SchemaFactory.createForClass(Reclamation);
