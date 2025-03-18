const express = require("express");
const helmet = require("helmet");
const app = express();
const mongoSanitize = require("express-mongo-sanitize");

app.use(helmet());
app.disable("x-powered-by");
app.use(mongoSanitize());

require("dotenv").config(); //loads the environment variables from .env
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoute");
const movieRouter = require("./routes/movieRouter");
const theatreRouter = require("./routes/theatreRouter");
const showRouter = require("./routes/showRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
connectDB();

app.use(express.json());

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 mins",
});
app.use("/api", apiLimiter);
app.use("/api/users", userRouter);
app.use("/api/movies", movieRouter);
app.use("/api/theatres", theatreRouter);
app.use("/api/shows", showRouter);
app.use("/api/bookings", bookingRoutes);

app.listen(8082, () => {
  console.log("Server is running at port 8082");
});
