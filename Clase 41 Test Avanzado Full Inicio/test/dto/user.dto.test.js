import UserDTO from "../../src/dto/User.dto.js";
import { expect } from "chai";

describe('User DTO tests cases', function() {
  // Vamos a agrupar ambas validaciones que pide la consigna en un solo test
  it('User DTO should format user for token correctly', function() {
    const testUser = {
      _id: "6463fc4ae7ccadc8cfbaf7e7",
      first_name: 'PruebaCoder',
      last_name: 'Coder',
      email: 'correo@correo.co',
      password: 'super-secret',
      role: 'user',
      pets: [],
      __v: 0
    };
    const formattedUser = UserDTO.getUserTokenFrom(testUser);

    // El user formateado NO debería tener las siguientes propiedades:
    expect(formattedUser).to.not.have.property('first_name');
    expect(formattedUser).to.not.have.property('last_name');
    expect(formattedUser).to.not.have.property('password');
    expect(formattedUser).to.not.have.property('pets');
    expect(formattedUser).to.not.have.property('__v');

    // El user formateade SI debería tener las siguientes propiedades:
    expect(formattedUser).to.have.property('name');
    expect(formattedUser).to.have.property('role');
    expect(formattedUser).to.have.property('email');

    // La propiedad name deber+ia ser la concatenación del first_name y last_name
    expect(formattedUser.name).to.be.equal("PruebaCoder Coder");
  })

  
});