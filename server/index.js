import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import classRouter from './routes/classRoutes.js';
import connectDB from './mongodb/connect.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

app.use('/api/v1/user', userRouter);
app.use('/api/v1/class', classRouter);

app.get('/', (req, res) => {
    res.send('Server is running');
})

const startServer = async () => {
    try {
        await connectDB(process.env.MONGO_URL);
        app.listen(8080, () => {
            console.log('Server is running');
        })
    } catch (error) {
        console.log(error);
    }

}

startServer();

