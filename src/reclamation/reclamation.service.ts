import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reclamation } from './reclamation.schema';
import { CreateReclamationDto } from './dto/create-reclamation.dto';
import { UpdateReclamationDto } from './dto/update-reclamation.dto';

@Injectable()
export class ReclamationsService {
  constructor(@InjectModel(Reclamation.name) private reclamationModel: Model<Reclamation>) {}

  async getAllReclamations(): Promise<Reclamation[]> {
    return this.reclamationModel.find().exec();
  }

  async createReclamation(createReclamationDto: CreateReclamationDto): Promise<Reclamation> {
    const createdReclamation = new this.reclamationModel(createReclamationDto);
    return createdReclamation.save();
  }

  async updateReclamation(id: string, updateReclamationDto: UpdateReclamationDto): Promise<Reclamation> {
    return this.reclamationModel.findByIdAndUpdate(id, updateReclamationDto, { new: true }).exec();
  }

  async deleteReclamation(id: string): Promise<void> {
    await this.reclamationModel.findByIdAndDelete(id).exec();
  }
  async getReclamationById(id: string): Promise<Reclamation> {
    return this.reclamationModel.findById(id).exec();
  }
}
