import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

const app = express(); // New express instance
const port = 9000; // Port number

// Middlewares
app.use(cors()); 
app.use(helmet());

// Start Express server
app.listen(port, () => {
  // Callback function when server is successfully started
  console.log(`Hello from http://localhost:${port}`);
});

app.get('/healthcheck', (req, res) => {
    res.send('I am alive!');
});

// Export Express app
export default app;