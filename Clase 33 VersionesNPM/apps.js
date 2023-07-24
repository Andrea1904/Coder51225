import express from 'express'
const app=express();

app.get('/',(req,res)=>{
  res.send('Hola es mi primer paquete en NPM')
})
app.listen(8080,()=> {
  console.log("Server Arriba")
})
