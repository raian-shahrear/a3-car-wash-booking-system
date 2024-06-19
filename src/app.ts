import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// application route
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Car Wash Booking System!');
});

// application middleware
// app.use(globalErrorHandler);
// app.use(notFound);

export default app;
