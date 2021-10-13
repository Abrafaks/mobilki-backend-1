import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { matchedData } from "express-validator";
import authService, { AuthService } from "../services/auth.service";
import { User } from "../dto/user.dto";

export class UserController {
  constructor(private authService: AuthService) {}

  async login(req: Request, res: Response): Promise<Response> {
    const user = req.user!;

    return res
      .status(StatusCodes.OK)
      .send({ token: await this.authService.getToken(user) });
  }
}

export default new UserController(authService);
