import userModel from "../src/dao/models/User.js";
import Users from '../src/dao/Users.dao.js'
import mongoose
 from "mongoose";
import Assert from "assert"

mongoose.connect(
    "mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority"
  );

  const assert =Assert.strict;

  describe("Titulo de las pruebas",()=>{
    before(()=>{
        console.log("Se ejecuta una vez antes de cada prueba")
    })

    beforeEach(()=>{
        console.log("Se ejecuta antes de cada prueba")
    })

    after(()=>{
        console.log("Se ejecuta una vez despues de cada prueba")
    })

    afterEach(()=>{
        console.log("Se ejecuta una vez despues de cada prueba")
    })

    it("Prueba escenario 1",()=>{
        assert.strictEqual(true,true)
    })

    it("Prueba escenario 1",()=>{
        assert.strictEqual(true,true)
    })

  })