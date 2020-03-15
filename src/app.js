import express from 'express';
import sanitizer from 'express-sanitizer';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

import controller from './controller';
import connectToDatabase from './database';
import startServer from './server';

// load environment variables
dotenv.config({ path: './config.env' });

// init
const app = express();

connectToDatabase();

// Configuring body parser middleware, allows us to use form data and send responses as json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cross-origin resource sharing
app.use(cors());

// sanitize form data to prevent malware
app.use(sanitizer());

// remove etag's in order to manually configure HTTP response codes
app.disable('etag');

// use our defined routes
app.use(controller);

startServer(app);
