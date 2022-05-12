const ConsultationTypes = {
  DePrimera: 0,
  Reconsulta: 1,
  Interconsulta: 2,
};

class Consultation {
  constructor(
    options = {
      id: 000000000000,
      patienceId: 0,
      type: ConsultationTypes.DePrimera,
    }
  ) {
    const { id, patienceId, type } = options;
    this.id = id;
    this.patienceId = patienceId;
    this.type = type;
  }

  // getters

  get Id() {
    return this.id;
  }

  get PatienceId() {
    return this.patienceId;
  }

  get Type() {
    return this.type;
  }
}

module.exports = Consultation;
