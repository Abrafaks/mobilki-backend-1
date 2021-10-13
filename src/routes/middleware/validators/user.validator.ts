import { body, param, ValidationChain } from "express-validator";

const login = body("login").isString().withMessage("Login must be string");
const loginOptional = login.optional();

const password = body("password")
  .isStrongPassword()
  .withMessage(
    "Password must have minimum length of 8 and contain at least 1 lowercase, 1 uppercase character, 1 symbol and 1 number"
  );
const passwordOptional = password.optional();

const note = body("note").optional();

export class UserValidator {
  public validateUser(): ValidationChain[] {
    return [login, password, note];
  }

  public validateUpdateUser(): ValidationChain[] {
    return [loginOptional, passwordOptional, note];
  }
}

export default new UserValidator();
