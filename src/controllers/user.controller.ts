import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { matchedData } from "express-validator";
import userService, { UserService } from "../services/user.service";
import { updateUser } from "../dto/user.dto";

export class UserController {
  constructor(private userService: UserService) {}

  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { login, password } = matchedData(req);

      console.log("register - user controller");

      const existingUser = await this.userService.getUserByLogin(login);

      if (existingUser) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ errorMessage: "Account with this login already exists." });
      }

      return res
        .status(StatusCodes.CREATED)
        .send(await this.userService.addUser({ login, password }));
    } catch (err) {
      return res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { _id } = req.user!;
    const updateData: updateUser = matchedData(req);

    return res
      .status(StatusCodes.OK)
      .send(await this.userService.updateUser(_id, updateData));
  }
}

export default new UserController(userService);
