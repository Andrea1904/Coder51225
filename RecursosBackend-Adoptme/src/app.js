import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';

import swaggerJsdoc from  'swagger-jsdoc'
import swaggerUiExpress from 'swagger-ui-express'

const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect(`mongodb+srv://CoderUser:123@codercluster.w5adegs.mongodb.net/?retryWrites=true&w=majority`)

const swaggerOptions={
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
    //apis: [`${process.cwd()}/src/docs/**/*.yaml`],
    apis: [`./docs/**/*.yaml`]
}

const spec=swaggerJsdoc(swaggerOptions)

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(spec))

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))

