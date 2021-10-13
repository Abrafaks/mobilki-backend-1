import passport from "passport";
import basicStrategy from "./basic.strategy";
import jwt from "./jwt.strategy";

enum Strategy {
  Basic = "basic",
  Bearer = "bearer",
}

passport.use(Strategy.Bearer, jwt);
passport.use(Strategy.Basic, basicStrategy);

const auth = {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  authenticate: (strategies: Array<Strategy>) => {
    return passport.authenticate(strategies, { session: false });
  },
};

export { Strategy, auth };
