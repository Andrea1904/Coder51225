import userModel from "../src/dao/models/User.js";
import Users from '../src/dao/Users.dao.js'
import mongoose from "mongoose";
import Assert from "assert"

mongoose.connect(
    "mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority"
  );

  const assert =Assert.strict;

  describe("Pruebas del DAO",async function(){
    this.timeout(5000)

    before(async function(){
        this.userDao=new Users();
    })

    beforeEach(async function(){
        await userModel.deleteMany()
    })

    after(()=>{
        console.log("Se ejecuta una vez despues de cada prueba")
    })

    afterEach(()=>{
        console.log("Se ejecuta una vez despues de cada prueba")
    })

    it("Consultar con metodo Get",async function(){
        const result = await this.userDao.get();
        assert.strictEqual(Array.isArray(result),true)
        assert.strictEqual(result.length,0)
        assert.deepStrictEqual(result,[]) 
    })

    it("Agregar un usuario",async function(){
        const newUser ={
            first_name: "Prueba",
            last_name:"Prueba",
            email: "correo@correo",
            password:"secret"
        }
        const result = await this.userDao.save(newUser);

        const resultadoFinal= !!result._id
        assert.deepStrictEqual(resultadoFinal,true)
        assert.ok(result._id)
    })

    it("Agregar un usuario y un arreglo de mascotas vacio",async function(){
        const newUser ={
            first_name: "Prueba",
            last_name:"Prueba",
            email: "correo@correo",
            password:"secret"
        }
        const result = await this.userDao.save(newUser);
        assert.deepStrictEqual(result.pets,[])  
    })

    it("Consultar usuario por mail",async function(){
        const newUser ={
            first_name: "Prueba",
            last_name:"Prueba",
            email: "correo@correo",
            password:"secret"
        }
        const result = await this.userDao.save(newUser);
        const userEmail = await this.userDao.getBy({email: "correo@correo"})
        assert.ok(userEmail._id) 
    })

    after(async function(){
        await userModel.deleteMany()
    })


  })