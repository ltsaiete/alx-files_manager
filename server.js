import 'dotenv/config';
import express from 'express';
import routes from './routes';

const app = express();

app.use(routes);

const port = process.env.port || 5000;
app.listen(port, () => console.log(`App listening on port ${port}`));
