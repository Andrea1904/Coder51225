import mongoose from "mongoose";
import Users from "../../src/dao/Users.dao.js";
import userModel from "../../src/dao/models/User.js";

import chai from 'chai' // lo primero es importar chai

const expect =chai.expect; // expeext esperar o estar espectante
mongoose.connect(
  "mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority"
);

describe("titulo del grupo de pruebas User DAO test cases con chai", async function (){
    this.timeout(5000)

  before(function()  {
    this.usersDao =new Users()
  });

  // para que no falle borro la bd 
  beforeEach(async function()  {
   await userModel.deleteMany();
  });

  it('Prueba 1',async function(){
    const result = await this.usersDao.get() /// al ser un metodo asincrono conolocar el await
    expect(result).deep.equal([])
   })

  it('Agregamos el usuario correctamente ',async function(){
    const testUser={
      first_name: "jhon",
      last_name:"prueba",
      email: "correo@correo",
      password: "secret"
    };
    const result = await this.usersDao.save(testUser)
    expect(result).to.have.property('_id')
    expect(result.first_name).to.be.equal(testUser.first_name)
  })

  it('Inbsertado por defecto vacio',async function(){
    const testUser={
      first_name: "jhon",
      last_name:"prueba",
      email: "correo@correo",
      password: "secret"
    };

    const result = await this.usersDao.save(testUser)
    expect(result.pets).deep.equal([])
   
  })

  it('Validar que los datos sean iguales',async function(){
    const testUser={
      first_name: "jhon",
      last_name:"prueba",
      email: "correo@correo",
      password: "secret"
    };

    const result = await this.usersDao.save(testUser)
    const user = await this.usersDao.getBy({email:"correo@correo"})
    expect(result).to.have.property('_id')
    expect(user.email).to.be.equal(testUser.email)
   
  })


  ///pruebas para la actividad en la clase

  it('actividad en laclase para update',async function(){
    const testUser={
      first_name: "aloha",
      last_name:"lora",
      email: "correo@correo",
      password: "secret"
    };

    const result = await this.usersDao.save(testUser)
    expect(result).to.have.property('_id') // vañllidemos que se creo 
    //se puede hacer mas robusta la prueba
    expect(result.first_name).to.be.equal("aloha")
    expect(result.last_name).to.be.equal("lora")   

    const updateUser = await this.usersDao.update(result._id,{
      first_name:"Prueba",
      last_name:"Prueba 2"
    })

    const user =await this.usersDao.getBy({_id:result._id})
    expect(user.first_name).to.be.equal("Prueba")
    expect(user.last_name).to.be.equal("Prueba 2")   
  })

  it('actividad en laclase para delete',async function(){
    const testUser={
      first_name: "aloha",
      last_name:"lora",
      email: "correo@correo",
      password: "secret"
    };

    const result = await this.usersDao.save(testUser)
    expect(result).to.have.property('_id') // vañllidemos que se creo 

    await this.usersDao.delete(result._id)
    //se puede hacer mas robusta la prueba
    const user =await this.usersDao.getBy({_id:result._id})
   expect(user).to.be.equal(null)
      
  })
  after(async function()  {
    await userModel.deleteMany();
   });






});
