const dbo = require("../db/conn");
const { error, log, info, good } = require("../utils/chalk");

const MostUsedHospitals = async () => {
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
        const mostUsedHospitals = data.filter((item) => {
          if (new Date(item.date).getMonth() === now.getMonth()) return item;
          return null;
        });
        let parsed = {};
        mostUsedHospitals.forEach((item) => {
          if (parsed[item.id]) parsed[item.id] += 1;
          else parsed[item.id] = 1;
        });
        let arrayOfParsed = [];
        Object.keys(parsed).forEach((item) => {
          arrayOfParsed.push({ id: item, count: parsed[item] });
        });
        arrayOfParsed = arrayOfParsed.sort((itemA, itemB) => {
          if (itemA.count < itemB.count) return -1;
          if (itemA.count > itemB.count) return 1;
          return 0;
        });
        console.log(arrayOfParsed);
      }
    });
};

module.exports = {
  MostUsedHospitals,
};
