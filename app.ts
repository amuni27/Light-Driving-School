import express, {Request, Response, NextFunction} from 'express';
import 'reflect-metadata';
import cors from 'cors';
import dbConnection from './loader/db-connection'
import UserRoutes from "./routes/UserRoutes";

require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended: true}));

dbConnection();

app.use('/users', UserRoutes)

app.use((req: Request, res: Response, next: NextFunction): void => {
    res.status(404).send('Not Found');
})

app.use((err: Error, req: Request, res: Response, next: NextFunction): void => {
    res.status(500).send('Internal Server Error');
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})