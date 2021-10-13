import { body, param, ValidationChain } from "express-validator";

const login = body("login").isString().withMessage("Login must be string");
const loginOptional = login.optional();

const password = body("password")
  .isStrongPassword()
  .withMessage(
    "Password must have minimum length of 8 and contain at least 1 lowercase, 1 uppercase character, 1 symbol and 1 number"
  );
const passwordOptional = password.optional();

export class UserValidator {
  public validateUser(): ValidationChain[] {
    return [login, password];
  }

  public validateUpdateUser(): ValidationChain[] {
    return [loginOptional, passwordOptional];
  }
}

export default new UserValidator();
