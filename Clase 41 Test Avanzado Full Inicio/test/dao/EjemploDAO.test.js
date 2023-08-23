import mongoose from "mongoose";
import Assert from "assert";
import Users from "../../src/dao/Users.dao.js";
import userModel from "../../src/dao/models/User.js";

mongoose.connect(
  "mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority"
);

const assert = Assert.strict;
// lleva una descripcion y una funcion y la funcion es un contexto

describe("titulo del grupo de pruebas User DAO test cases", async function (){
  
  this.timeout(5000)

  before(function()  {
    this.usersDao =new Users()
  });

  beforeEach(async function()  {
    await userModel.deleteMany();
   });

  // formato arrrow funtion => contexto padre el global por lo que se debe poner el funtion  ()=>{}

  // vamos a probar el metodo getl del dao de user

  // devolver el arreglo de usuarios 
  it('Prueba 1',async function(){
    const result = await this.usersDao.get() /// al ser un metodo asincrono conolocar el await
    // probamos que sea un arreglo 
    // no se puede probar result ¨[] porque son datos complejos apuntan a espacios de memoria dif
    // el array nos devuelve un true o false compara el true con el true
    assert.strictEqual(Array.isArray(result),true)
    // validamos si el array es vacio 
    assert.strictEqual(result.length,0 )
  })

  // otra forma de comparar deepStric
  it('Prueba 2',async function(){
    const result = await this.usersDao.get() 
    assert.deepStrictEqual(result,[])
    // validamos si el array es vacio 
  })

  // sale un error de 2seg por la config de mocha

  
  it('Agregar el usuario correctamente',async function(){
    const testUser={
      first_name: "jhon",
      last_name:"prueba",
      email: "correo@correo",
      password: "secret"
    };

    const result = await this.usersDao.save(testUser)
    //validar si se creo  valido el describe id   //una opcion 
    const result1= !!result._id // si llega con id entrega true
    assert.deepStrictEqual(result1,true)
    // otra es con el asser de ok
    assert.ok(result._id)
    // algo adicional probar 
    assert.strictEqual(result.first_name,testUser.first_name)

  })

  it('Inbsertado por defecto vacio',async function(){
    const testUser={
      first_name: "jhon",
      last_name:"prueba",
      email: "correo2@correo",
      password: "secret"
    };

    const result = await this.usersDao.save(testUser)
      assert.deepStrictEqual(result.pets,[])
   
  })

  it('Validar que los datos sean iguales ',async function(){
    const testUser={
      first_name: "jhon",
      last_name:"prueba",
      email: "correo1@correo",
      password: "secret"
    };

    const result = await this.usersDao.save(testUser)
    const user = await this.usersDao.getBy({email:"correo1@correo"})
    assert.ok(user._id)
    assert.strictEqual(user.email,testUser.email)
   
  })

  it('Obtener usuario por mail',async function(){
    const testUser={
      first_name: "jhon",
      last_name:"prueba",
      email: "correo3@correo",
      password: "secret"
    };

    const result = await this.usersDao.save(testUser)
    const user = await this.usersDao.getBy({email: result.email})
  
    assert.strictEqual(typeof user, 'object')
   
  })

// los borrados los colocarmos despues de agregado las pruebas
  after(async function()  {
    await userModel.deleteMany();
   });
});
