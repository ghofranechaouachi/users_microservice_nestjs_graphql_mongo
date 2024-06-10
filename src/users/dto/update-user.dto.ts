// update-user.dto.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsEmail } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly username?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly password?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly role?: string;
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  readonly storeName?: string;
}
