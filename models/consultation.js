const Patience = require("./patience");

class Consultation {
  constructor(
    options = {
      id: 0,
      type: 0,
      specialization: 0,
      hospital: 0,
      patience: new Patience(),
    }
  ) {
    const { id, type, specialization, patience } = options;
    this.id = id;
    this.type = type;
    this.specialization = specialization;
    this.patience = patience;
    this.hospital = hospital;
  }

  // getters

  get Id() {
    return this.id;
  }

  get Type() {
    return this.type;
  }

  get Specialization() {
    return this.specialization;
  }

  get Patience() {
    return this.patience;
  }

  get Hospital() {
    return this.hospital;
  }
}

module.exports = Consultation;
