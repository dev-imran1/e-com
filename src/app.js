import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

// all routes
import userRouter from "./routes/userRoute.js";
import categoryRouter from "./routes/categoryRoute.js";
import subCategoryRouter from "./routes/subCategroyRoutes.js";
import productRouter from "./routes/productRoute.js";
import variationRouter from "./routes/variationsRoute.js";
import inventoryiRouter from "./routes/inventoryRoute.js";
app.use("/api/v1", userRouter);
app.use("/api/v1", categoryRouter);
app.use("/api/v1", subCategoryRouter);
app.use("/api/v1", productRouter);
app.use("/api/v1", variationRouter);
app.use("/api/v1", inventoryiRouter);

export default app;
