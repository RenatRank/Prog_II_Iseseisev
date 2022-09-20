import express, { Request, Response, Express } from 'express';

const app: Express = express();
const port: number = 3000;

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Hello world!',
  });
});

app.get('/ping', (req: Request, res: Response) => {
    res.status(200).json({
      message: 'I am alive',
    });
  });

app.listen(port, () => {

  console.log(`App is running on port ${port}`);
});