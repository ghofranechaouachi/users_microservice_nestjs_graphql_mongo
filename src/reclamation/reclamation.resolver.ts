import { Resolver, Query, Mutation, Args, ID, ResolveField, Parent } from '@nestjs/graphql';
import { Reclamation } from './reclamation.schema';
import { ReclamationsService } from './reclamation.service';
import { CreateReclamationDto } from './dto/create-reclamation.dto';
import { UpdateReclamationDto } from './dto/update-reclamation.dto';
import { UsersService } from '../users/users.service'; // Import UsersService

@Resolver(() => Reclamation)
export class ReclamationsResolver {
  constructor(
    private readonly reclamationService: ReclamationsService,
    private readonly userService: UsersService, // Inject UsersService
  ) {}

  @Query(() => [Reclamation])
  async reclamations(): Promise<Reclamation[]> {
    return this.reclamationService.getAllReclamations();
  }

  @Mutation(() => Reclamation)
  async createReclamation(@Args('createReclamationDto') createReclamationDto: CreateReclamationDto): Promise<Reclamation> {
    return this.reclamationService.createReclamation(createReclamationDto);
  }

  @Mutation(() => Reclamation)
  async updateReclamation(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateReclamationDto') updateReclamationDto: UpdateReclamationDto,
  ): Promise<Reclamation> {
    return this.reclamationService.updateReclamation(id, updateReclamationDto);
  }

  @Mutation(() => Boolean)
  async deleteReclamation(@Args('id', { type: () => ID }) id: string): Promise<boolean> {
    await this.reclamationService.deleteReclamation(id);
    return true;
  }
  @Query(() => Reclamation, { nullable: true })
  async reclamation(@Args('id', { type: () => ID }) id: string): Promise<Reclamation> {
    return this.reclamationService.getReclamationById(id);
  }

// Resolve the createdBy field
@ResolveField()
async createdBy(@Parent() reclamation: Reclamation) {
  const user = reclamation.createdBy; // Get the user object from the reclamation
  if (user) {
    const userId = user._id; // Get the ID string from the user object
    // Fetch user data using the UsersService
    return this.userService.findById(userId);
  }
  return null; // Return null if no user object is provided
}
}
