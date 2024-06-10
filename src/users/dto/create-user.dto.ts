// create-users.dto.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsNotEmpty()
  readonly username: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @Field()
  @IsNotEmpty()
  readonly password: string;

  @Field()
  @IsNotEmpty()
  readonly role: string;
@Field()
  @IsOptional()
  
  readonly storeName?: string;
}
