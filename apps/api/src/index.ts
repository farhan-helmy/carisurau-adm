import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import surauRoute from "./routes/surauRoute";
import authRoute from "./routes/authRoute";
import pingRoute from "./routes/pingRoute";
import ratingRoute from "./routes/ratingRoute";
import appRoute from "./routes/appRoute";
import swaggerUi from "swagger-ui-express";

// eslint-disable-next-line turbo/no-undeclared-env-vars
const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));
app.use(cors(
    {
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
            "http://100.83.54.101:5174",
            "http://192.168.1.231:5173",
            "http://192.168.1.231:5174",
            "http://100.113.198.98:5174",
        ]
    }
));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  );
  

app.use(surauRoute);
app.use(authRoute);
app.use(pingRoute);
app.use(ratingRoute);
app.use(appRoute);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
