import { createHash, passwordValidation } from "../../src/utils/index.js";
import { expect } from "chai";


describe("Utils tests cases", () => {
  before(function() {
    // Un hasheo efectivo de una contraseña contiene lo siguiente:
      // 1. Por lo menos un caracter especial
      // 2. Por lo menos un valor en minúscula
      // 3. Por lo menos un valor en mayúscula
      // 4. Por lo menos un número
      // 5. Una longitud mayor a 8 caracteres
    
    // Para validar lo anterior, lo podemos hacer mediante una expresión regular como la siguiente:
    this.hashRegex = /(?=[A-Za-z0-9@#$%/^.,{}&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g;
  });

  it('createHash method should hash the password correctly', async function() {
    const testPassword = "Test-123*";
    const hashedPassword = await createHash(testPassword);
    expect(hashedPassword).not.to.be.equal(testPassword);
    const isValidHash = this.hashRegex.test(hashedPassword);
    expect(isValidHash).to.be.equal(true);
  });

  it('passwordValidation should compare the original and the hashed password correctly', async function() {
    const testPassword = "Test-123*";
    const hashedPassword = await createHash(testPassword);
    const testUser = {
      password: hashedPassword
    };
    let isValidPassword = await passwordValidation(testUser, "wrong-password");
    expect(isValidPassword).to.be.equal(false);

    isValidPassword = await passwordValidation(testUser, "Test-123*");
    expect(isValidPassword).to.be.equal(true);
  });
  
  it('passwordValidation should return false is hashed password is altered', async function() {
    const testPassword = "Test-123*";
    const hashedPassword = await createHash(testPassword);
    const testUser = {
      password: hashedPassword + "altered-password"
    };
    const isValidPassword = await passwordValidation(testUser, "Test-123*");
    expect(isValidPassword).to.be.equal(false);
  }); 
});