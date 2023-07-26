import express from 'express'
import { addLogger } from '../utils/logger.js'

const app =express();

app.use(addLogger);

app.get('/',(req,res)=>{
    //crearemos una peticion con warn
    req.logger.warning("Alerta")

    res.send({message:" Estamos probando el logger"})
})

app.listen(8080,()=> console.log("Server Up"))