import express, {Express, Request, Response} from 'express';
import cors from 'cors'
import bodyParser from 'body-parser';

import UserRouter from './controllers/v0/User/userController';
import PostRouter from './controllers/v0/Post/postController';
const app: Express = express();
const port = 3000;


app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}))


app.use('/api/v0/user', UserRouter);
app.use('/api/v0/post', PostRouter);
// this is a comment

app.listen(port, ()=> {
console.log(`[Server]: I am running at https://localhost:${port}`);
});