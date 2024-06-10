// create-reclamation.dto.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsMongoId } from 'class-validator';

@InputType()
export class CreateReclamationDto {
  @Field()
  @IsNotEmpty()
  readonly title: string;

  @Field()
  @IsNotEmpty()
  readonly description: string;

  @Field() // Include user's ID
  @IsNotEmpty()
  @IsMongoId() // Validate if it's a valid MongoDB ObjectId
  readonly createdBy: string; // User who created the reclamation
}
