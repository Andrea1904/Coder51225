import userModel from "../src/dao/models/User.js";
import Users from '../src/dao/Users.dao.js'
import mongoose from "mongoose";

import chai from "chai";
const expect =chai.expect;

mongoose.connect(
    "mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority"
  );

  describe("Pruebas del DAO con chai",async function(){
    this.timeout(5000)

    before(async function(){
        this.userDao=new Users();
    })

    beforeEach(async function(){
        await userModel.deleteMany()
    })

    it("Consultar con metodo Get",async function(){
        const result = await this.userDao.get();
        //assert.strictEqual(Array.isArray(result),true)
        //assert.strictEqual(result.length,0)
        //assert.deepStrictEqual(result,[]) 
        expect(result).deep.equal([])
    })

    it("Agregar un usuario",async function(){
        const newUser ={
            first_name: "Prueba",
            last_name:"Prueba",
            email: "correo@correo",
            password:"secret"
        }
        const result = await this.userDao.save(newUser);
        expect(result).to.have.property('_id')
        expect(result.first_name).to.be.equal(newUser.first_name)
    })

    it("Agregar un usuario y un arreglo de mascotas vacio",async function(){
        const newUser ={
            first_name: "Prueba",
            last_name:"Prueba",
            email: "correo@correo",
            password:"secret"
        }
        const result = await this.userDao.save(newUser);
        //assert.deepStrictEqual(result.pets,[])  
        expect(result.pets).deep.equal([])
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
        expect(result).to.have.property('_id')
        expect(userEmail.email).to.be.equal(newUser.email)

    })

    it("Prueba metodo update",async function(){
        const newUser ={
            first_name: "Prueba",
            last_name:"Prueba",
            email: "correo@correo",
            password:"secret"
        }
        const result = await this.userDao.save(newUser);

        expect(result).to.have.property('_id')
        expect(result.first_name).to.be.equal("Prueba")
        expect(result.last_name).to.be.equal("Prueba")

        const updateUser = await this.userDao.update(result._id,{
            first_name:"Prueba 1",
            last_name:"Prueba 2"
        })

        const user =await this.userDao.getBy({_id:result._id})
        expect(user.first_name).to.be.equal("Prueba 1")
        expect(user.last_name).to.be.equal("Prueba 2")
    })

    it("Prueba metodo DELETE",async function(){
        const newUser ={
            first_name: "Prueba",
            last_name:"Prueba",
            email: "correo@correo",
            password:"secret"
        }
        const result = await this.userDao.save(newUser);
        expect(result).to.have.property('_id')
        await this.userDao.delete(result._id)
        const user =await this.userDao.getBy({_id:result._id})
        expect(user).to.be.equal(null)
    })

    after(async function(){
        await userModel.deleteMany()
    })


  })