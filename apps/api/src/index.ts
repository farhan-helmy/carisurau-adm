import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import surauRoute from "./routes/surauRoute";
import authRoute from "./routes/authRoute";
import pingRoute from "./routes/pingRoute";
import ratingRoute from "./routes/ratingRoute";
import appRoute from "./routes/appRoute";
import rateLimit from "express-rate-limit";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const PORT = process.env.PORT || 8000;

const app: Application = express();
app.set('trust proxy', 1)
app.get('/ip', (request, response) => response.send(request.ip))

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors(
  {
    origin: ["*", "https://developer.carisurau.com"]
  }
));

app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
}));

app.use(surauRoute);
app.use(authRoute);
app.use(pingRoute);
app.use(ratingRoute);
app.use(appRoute);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
