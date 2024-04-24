import express, { NextFunction, Response, Request } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mainRouter from './routes';

const app = express(); // New express instance
const port = 9000; // Port number

// Middlewares
app.use(cors()); 
app.use(helmet());
app.use(express.json());

// Start Express server
app.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`Hello from http://localhost:${port}`);
});

// Health check endpoint
app.get('/', (_, res) => {
    res.send('I am alive!');
});

app.use('/api', mainRouter);

const globalErrorHandler = (err: Error | SyntaxError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && (err as any).status === 400 && 'body' in err) {
      return res.status(400).send({ status: 400, message: err.message }); // Bad request
  }
  
  next();
  res.status(500).send('Something broke!');
}

app.use(globalErrorHandler); // 500 handler

// Export Express app
export default app;