import { createHash, passwordValidation } from "../src/utils/index.js";
import { expect } from "chai";

describe("Casos prueba para el utils", async function () {
  before(async function () {
    this.hash =
      /(?=[A-Za-z0-9@#$%/^.,{}&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/g;
  });

  it("validar que el create hash genere un password", async function () {
    const test = "Prueba-123";
    const testHash = await createHash(test);

    expect(testHash).not.to.be.equal(test);
    const testValid = this.hash.test(testHash);
    expect(testValid).to.be.equal(true);
  });

  it("validar password original correctamente", async function () {
    const test = "Prueba-123";
    const testHash = await createHash(test);

    const testUser = {
      password: testHash,
    };

    let isValidPassword = await passwordValidation(testUser, "wrong -password");
    expect(isValidPassword).to.be.equal(false);
    isValidPassword = await passwordValidation(testUser, "Prueba-123");
    expect(isValidPassword).to.be.equal(true);
  });

  it("passwordValidation si fue alterado", async function () {
    const test = "Prueba-123";
    const testHash = await createHash(test);

    const testUser = {
      password: testHash + "adicional",
    };

    const isValidPassword = await passwordValidation(testUser, "Prueba-123");
    expect(isValidPassword).to.be.equal(false);
  });
});
