import express from "express";
import mongoose from "mongoose";
import helmet from "helmet";
import passport from "passport";
import ip from "ip";
import routes from "./routes/routes";

const app = express();
app.use(helmet());
app.use(express.json());
app.use(passport.initialize());

mongoose.connect(process.env.MONGODB_CONNECTION_STRING!, (err) => {
  if (err) throw err;
  console.log("MongoDB connection established");
});

app.use(routes);

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
  console.log(ip.address());
});
