import express from 'express';
import routes from './routes';
import { PORT } from './utils/env';

const app = express();

app.use(express.json());
app.use(routes);

const port = PORT;
app.listen(port, () => console.log(`App listening on port ${port}`));
