// userResponse.type.ts
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserResponseType {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  role: string;

  @Field()
  token: string;
}
