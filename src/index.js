import express from 'express';
import productRouter from './routes/products.routes.js'

const app = express();
app.use(express.json());
app.use("/products", productRouter)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
})