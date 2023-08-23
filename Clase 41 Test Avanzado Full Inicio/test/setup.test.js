import mongoose from "mongoose";
import petModel from "../src/dao/models/Pet.js";
import userModel from "../src/dao/models/User.js";

before(async ()=>{
    await mongoose.connect( "mongodb+srv://CoderUser:A123456*@pruebacoder.rpvqwdz.mongodb.net/?retryWrites=true&w=majority")
}) 

after(async ()=>{
    mongoose.connection.close()
})

export const dropPets =async ()=>{
    await petModel.collection.drop()
}
export const dropUsers =async ()=>{
    await userModel.collection.drop()
}