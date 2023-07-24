//packege.json npm 
/*
npm init -y 
npm init

npm install express
npm uninstall express

// yarn

yarn init -y 

// instalacion dependencias

yarn add express 
yarn remove express*/

import express from 'express'

const app = express();
const port=8080;

app.get('/',(req,res)=>{
  res.send("Este es mi server de express en yarn")
})

app.listen(port,()=>{
  console.log("El server esta arriba")
})