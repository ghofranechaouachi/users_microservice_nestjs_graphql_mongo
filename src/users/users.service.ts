//users.service.ts
import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from '../users/dto/create-user.dto';
import {InjectModel} from '@nestjs/mongoose';
import {User} from './users.schema';
import {Model} from 'mongoose';
import {UserResponseType} from '../users/types/userResponse.type';
import {LoginDto} from '../users/dto/login.dto';
import {compare} from 'bcrypt';
import {sign, verify} from 'jsonwebtoken';
import { UpdateUserDto } from './dto/update-user.dto';
import {hash} from "bcrypt";
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({email: createUserDto.email})

    if (user) {
      throw new HttpException('Email is already taken', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const createdUser = new this.userModel(createUserDto)
    return createdUser.save()
  }

  async loginUser(loginDto: LoginDto): Promise<User> {
    const user = await this.userModel.findOne({email: loginDto.email}).select('+password')

    if (!user) {
      throw new HttpException('User not found', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    const isPasswordCorrect = await compare(loginDto.password, user.password)

    if (!isPasswordCorrect) {
      throw new HttpException('Incorrect password', HttpStatus.UNPROCESSABLE_ENTITY)
    }

    return user
  }

  buildUserResponse(userEntity: User): UserResponseType {
    return {
      username: userEntity.username,
      email: userEntity.email,
      role: userEntity.role,
      token: this.generateJwt(userEntity)
    }
  }

  generateJwt(userEntity: User): string {
    return sign({email: userEntity.email}, 'JWT_SECRET')
  }

  async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne({email})
  }

  async findByToken(token: string): Promise<User> {
    try {
      const decoded: any = verify(token, 'JWT_SECRET');
      return await this.userModel.findOne({email: decoded.email});
    } catch (err) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.find().exec();
  }
  async updateUserByToken(token: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const decoded: any = verify(token, 'JWT_SECRET');
      const user = await this.userModel.findOneAndUpdate({ email: decoded.email }, { $set: updateUserDto }, { new: true });
  
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
     // Update user fields except for password
     user.username = updateUserDto.username || user.username;
     user.email = updateUserDto.email || user.email;
     user.storeName = updateUserDto.storeName || user.storeName;
 
     // If password is provided in the update DTO, hash and update it
     if (updateUserDto.password) {
       user.password = await hash(updateUserDto.password, 10);
     }
 
     await user.save();
 
      // Omitting the password update here
      delete user.password;
  
      return user;
    } catch (err) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async deleteUserByToken(token: string): Promise<{ deleted: boolean }> {
    try {
      const decoded: any = verify(token, 'JWT_SECRET');
      const result = await this.userModel.deleteOne({ email: decoded.email });
      if (result.deletedCount === 0) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { deleted: true };
    } catch (err) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
  
  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }
}