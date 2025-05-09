import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/db.js";
import userRoutes from './routes/user.routes.js'
import categoryRoutes from "./routes/category.routes.js"
import uploadRoutes from "./routes/upload.routes.js"
import subCategoryRoutes from "./routes/subCategory.routes.js"
import productRoutes from "./routes/product.routes.js"
import cartRouter from './routes/cart.routes.js'
import addressRouter from './routes/address.routes.js'
import orderRouter from './routes/order.routes.js'

dotenv.config();

const app = express();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/file', uploadRoutes)
app.use('/api/subcategory', subCategoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/cart', cartRouter)
app.use("/api/address",addressRouter)
app.use('/api/order', orderRouter)

connectDB().then(() => {  
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
})
});
