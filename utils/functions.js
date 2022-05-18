const dbo = require("../db/conn");
const { error, log, info, good } = require("../utils/chalk");

const MostUsedHospitals = async (options) => {
  const dbConnect = dbo.getDb();
  const { year, month } = options;
  let data = [];
  await dbConnect
    .collection("consultation")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        log(error(`Error fetching Consultation`));
        return { error: "Error!" };
      } else {
        log(good("Query executed correctly"));
        data = result;
        const mostUsedHospitals = data.filter((item) => {
          const date = new Date(item.date);
          if (date.getMonth() === month && date.getFullYear() === year)
            return item;
          return null;
        });
        let parsed = {};
        mostUsedHospitals.forEach((item) => {
          if (parsed[item.hospital]) parsed[item.hospital] += 1;
          else parsed[item.hospital] = 1;
        });
        let arrayOfParsed = [];
        // counting hospitals
        Object.keys(parsed).forEach((item) => {
          arrayOfParsed.push({ id: item, count: parsed[item] });
        });
        arrayOfParsed = arrayOfParsed
          .sort((itemA, itemB) => {
            if (itemA.count < itemB.count) return -1;
            if (itemA.count > itemB.count) return 1;
            return 0;
          })
          .reverse();
        return arrayOfParsed;
      }
    });
};

const MostUsedConsultationTypes = async (options) => {
  const dbConnect = dbo.getDb();
  const { year, month } = options;
  let data = [];
  await dbConnect
    .collection("consultation")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        log(error(`Error fetching Consultation`));
        return { error: "Error!" };
      } else {
        log(good("Query executed correctly"));
        data = result;
        const mostUsedConsultations = data.filter((item) => {
          const date = new Date(item.date);
          if (date.getFullYear() === year && date.getMonth() === month)
            return item;
          return null;
        });
        let parsed = {};
        mostUsedConsultations.forEach((item) => {
          if (parsed[item.type]) parsed[item.type] += 1;
          else parsed[item.type] = 1;
        });
        let arrayOfParsed = [];
        Object.keys(parsed).forEach((item) => {
          arrayOfParsed.push({ id: item, count: parsed[item] });
        });
        arrayOfParsed = arrayOfParsed
          .sort((itemA, itemB) => {
            if (itemA.count < itemB.count) return -1;
            if (itemA.count > itemB.count) return 1;
            return 0;
          })
          .reverse();
        return arrayOfParsed;
      }
    });
};

const MostUsedPatienceTypes = async () => {
  const dbConnect = dbo.getDb();
  const now = new Date();
  let data = [];
  await dbConnect
    .collection("consultation")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        log(error(`Error fetching Consultation`));
        return { error: "Error!" };
      } else {
        log(good("Query executed correctly"));
        data = result;
        const mostUsedPatienceTypes = data.filter((item) => {
          if (new Date(item.date).getFullYear() === now.getFullYear())
            return item;
          return null;
        });
        let parsed = {};
        mostUsedPatienceTypes.forEach((item) => {
          if (parsed[item.id]) parsed[item.id] += 1;
          else parsed[item.id] = 1;
        });
        let arrayOfParsed = [];
        Object.keys(parsed).forEach((item) => {
          arrayOfParsed.push({ id: item, count: parsed[item] });
        });
        arrayOfParsed = arrayOfParsed
          .sort((itemA, itemB) => {
            if (itemA.count < itemB.count) return -1;
            if (itemA.count > itemB.count) return 1;
            return 0;
          })
          .reverse();
        return arrayOfParsed;
      }
    });
};

module.exports = {
  MostUsedHospitals,
  MostUsedConsultationTypes,
  MostUsedPatienceTypes,
};
