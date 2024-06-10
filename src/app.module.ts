//app.module.ts
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { UsersModule } from './users/users.module';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthMiddleware } from './users/middlewares/auth.middleware';
import { ReclamationsModule } from './reclamation/reclamation.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
    driver:ApolloFederationDriver,
    autoSchemaFile:{
      federation:2
    }
  }), 
  ConfigModule.forRoot(), 
  MongooseModule.forRoot(process.env.MONGO_URL), 
  UsersModule, ReclamationsModule],

})
export class AppModule { configure(consumer: MiddlewareConsumer) {
  consumer.apply(AuthMiddleware).forRoutes({
    path: '*',    
    method: RequestMethod.ALL
  })
}}
