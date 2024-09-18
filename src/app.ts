import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app: Application = express();

// parser
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());

// application route
app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Car Wash Booking System!');
});

// application middleware
app.use(globalErrorHandler);
app.use(notFound);

export default app;
