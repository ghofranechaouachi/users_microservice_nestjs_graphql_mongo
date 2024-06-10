// reclamations.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Reclamation, ReclamationSchema } from './reclamation.schema';
import { ReclamationsResolver } from './reclamation.resolver';
import { ReclamationsService } from './reclamation.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reclamation.name, schema: ReclamationSchema }]),
    UsersModule
  ],
  providers: [ReclamationsResolver, ReclamationsService],
})
export class ReclamationsModule {}