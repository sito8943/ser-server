const dbo = require("../db/conn");

const MostUsedHospitals = () => {
  const dbConnect = dbo.getDb();
  const now = new Date()
  let data = [];
  await dbConnect
  .collection("consultation")
  .find({})
  .limit(50)
  .toArray(function (err, result) {
    if (err) {
      log(error(`Error fetching Consultation`));
      return {error: "Error!"}
    } else {
      log(good("Query executed correctly"));
      data = result;
    }
  });
  const mostUsedHospitals = data.filter((item) => {
    if (new Date(item.date).getMonth() === now.getMonth())
      return item
    return null;
  })
  let parsed = {}
  mostUsedHospitals.forEach((item) => {
    if (parsed[item])
      parsed[item] += 1
    else parsed[item] = 0;
  })
  
};

module.exports = {
  MostUsedHospitals,
};
