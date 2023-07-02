import express from 'express';
import debug from 'debug';
import morgan from 'morgan';
import compression from 'compression'; // compresses requests
import path from 'path';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import http from 'http';
import cors from 'cors';

import { PORT } from './config';
import { registerEndpoints } from './registerEndpoints';

export const app = express();

const debugApp = debug('app');

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(session({
    secret: 'terces',
}));
app.use(express.json());
app.use(express.static('ffffff/build'));
app.use(cors());

app.get('/', (_, res) => {
    res.send('FFF');
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

const server = http.createServer(app);

server.listen(PORT, () => {
    debugApp(`Server listening on ${PORT}`);
});

registerEndpoints();
