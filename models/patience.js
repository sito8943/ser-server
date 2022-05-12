const PatienceTypes = {
  Lactante: 0,
  Niño: 1,
  Adolecente: 2,
  AdultoMayor: 3,
};

const PatienceGenders = {
  M: 0,
  F: 0,
};

class Patience {
  constructor(
    options = {
      name: "",
      type: PatienceTypes.Lactante,
      id: 000000,
      age: 0,
      gender: PatienceGenders.M,
      region: 0,
    }
  ) {
    const { name, type, id, age, gender, region } = options;
    this.name = name;
    this.type = type;
    this.id = id;
    this.age = age;
    this.gender = gender;
    this.region = region;
  }

  // getters

  get Name() {
    return this.name;
  }

  get Type() {
    return this.type;
  }
}

module.exports = Patience;
