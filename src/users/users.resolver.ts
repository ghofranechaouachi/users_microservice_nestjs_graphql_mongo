// users.resolver.ts
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { UserResponseType } from './types/userResponse.type';
import { User } from './users.schema';
import { Token } from 'graphql';
import { UpdateUserDto } from './dto/update-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => UserResponseType)
  async register(@Args('createUserDto') createUserDto: CreateUserDto): Promise<UserResponseType> {
    const user = await this.usersService.createUser(createUserDto);
    return this.usersService.buildUserResponse(user);
  }

  @Mutation(() => UserResponseType)
  async login(@Args('loginDto') loginDto: LoginDto): Promise<UserResponseType> {
    const user = await this.usersService.loginUser(loginDto);
    return this.usersService.buildUserResponse(user);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Query(() => User, { nullable: true })
  async user(@Args('email') email: string): Promise<User> {
    return this.usersService.findByEmail(email);
  }

  @Query(() => User, { nullable: true })
  async userByToken(@Args('token') token: string): Promise<User> {
    return this.usersService.findByToken(token);
  }
  @Mutation(() => User)
  async updateUser(@Args('token') token: string, @Args('updateUserDto') updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersService.updateUserByToken(token, updateUserDto);
  }

  @Mutation(() => Boolean)
  async deleteUser(@Args('token') token: string): Promise<boolean> {
    const result = await this.usersService.deleteUserByToken(token);
    return result.deleted;
  }
  @Query(() => User, { nullable: true })
  async userById(@Args('id', { type: () => ID }) id: string): Promise<User> {
    return this.usersService.findById(id);
  }
}
