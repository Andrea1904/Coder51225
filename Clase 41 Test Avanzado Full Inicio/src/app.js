import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import swaggerJsDoc from 'swagger-jsdoc';
import { serve as swaggerServe, setup as swaggerSetup } from 'swagger-ui-express';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect("mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority")
const swaggerOptions = {
  definition:{
    openapi:'3.0.1',
    info:{
        title:" Documentacion de las APIs",
        description:" Informacion pets y usuarios",
        version: '1.0.0',
        contact:{
            name:"Andrea Lopez",
            url: "https://www.linkedin.com/in/adelid-andrea-l%C3%B3pez-411868105/"
        }
    }
},
  apis: [`${process.cwd()}/src/docs/**/*.yaml`]
};

const specs = swaggerJsDoc(swaggerOptions);

app.use(express.json());
app.use(cookieParser());

app.use('/api/doc', swaggerServe, swaggerSetup(specs));
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
