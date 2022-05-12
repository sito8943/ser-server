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

  // setters

  /**
   * It sets the attribute of the object to the value of the second argument
   * @param which - The attribute to change.
   * @param to - The value to set the attribute to.
   */
  setAttribute(which, to) {
    this[which] = to;
  }

  // getters

  get Name() {
    return this.name;
  }

  get Type() {
    return this.type;
  }

  get Id() {
    return this.id;
  }

  get Age() {
    return this.age;
  }

  get Gender() {
    return this.gender;
  }

  get Region() {
    return this.region;
  }
}

module.exports = Patience;
