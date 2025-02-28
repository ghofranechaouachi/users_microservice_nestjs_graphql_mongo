//auth.middleware.ts

import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {User} from "../users.schema";
import {verify} from "jsonwebtoken";
import {UsersService} from "../users.service";

export interface ExpressRequest extends Request {
  user?: User
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private userService: UsersService) {}

  async use(req: ExpressRequest, res: Response, next: NextFunction) {
    if (!req.headers['authorization']) {
      req.user = null
      next()
      return
    }

    const token = req.headers['authorization'].split(' ')[1]

    try {
      const decode = verify(token, 'JWT_SECRET') as {email: string}
      const user = await this.userService.findByEmail(decode.email)
      req.user = user
      next()

      /* Define the Autorisations // Check user role
    if (user && (user.role === 'buyer' || user.role === 'seller')) {
      // Allow access to buyer/seller-specific routes
      next();
    } else {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }*/ 
    } catch (err) {
      req.user = null
      next()
    }
  }
}