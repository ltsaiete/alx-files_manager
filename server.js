import express from 'express';
import 'express-async-errors';
import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);

app.use(async (err, req, res, next) => {
  if (err instanceof AppError) return res.status(err.statusCode).json({ error: err.error });

  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`App listening on port ${port}`));
