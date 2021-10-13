import { Strategy } from "passport-jwt";
import options from "../../../config/passport";
import userDto from "../../../dbo/user.dbo";

const jwt = new Strategy(options, async (payload, done) => {
  try {
    const user = await userDto.getUserById(payload._id);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err, null);
  }
});

export default jwt;
