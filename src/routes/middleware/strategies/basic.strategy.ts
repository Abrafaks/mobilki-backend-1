import userDto from "../../../dbo/user.dbo";
import { BasicStrategy } from "passport-http";
import authService from "../../../services/auth.service";

const basicStrategy = new BasicStrategy(async (login, password, done) => {
  try {
    const user = await userDto.getUserByLogin(login);

    if (user) {
      const passwordCorrect = await authService.arePasswordsMatching(
        password,
        user.passwordHash
      );

      if (!passwordCorrect) {
        return done(null, false);
      }
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err, false);
  }
});

export default basicStrategy;
