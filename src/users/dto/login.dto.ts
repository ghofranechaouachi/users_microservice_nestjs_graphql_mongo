// login.dto.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class LoginDto {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field()
  @IsNotEmpty()
  readonly password: string;
}
