// update-reclamation.dto.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsNotEmpty } from 'class-validator';

@InputType()
export class UpdateReclamationDto {
  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  readonly title?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsNotEmpty()
  readonly description?: string;
}