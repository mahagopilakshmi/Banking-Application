var promise = require("bluebird");
var _ = require("lodash");

var options = {
  promiseLib: promise
};

var pgp = require("pg-promise")(options);
var connectionString = "postgres://postgres:postgres@postgres:5432/postgres";
var db = pgp(connectionString);

function getSingleBranch(req, res, next) {
  var ifsc = req.params.ifsc;
  db.one("select * from branches where ifsc = $1", ifsc.toUpperCase())
    .then(function(data) {
      console.log(data);
      res.status(200).json({
        status: "success",
        data: data,
        message: "Retrieved branch details for requested ifsc code"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

function getBranches(req, res, next) {
  var { bankname, cityname } = req.params;
  bankname = _.upperCase(_.startCase(bankname));
  cityname = _.upperCase(_.startCase(cityname));
  console.log(bankname, cityname)
  db.any(
    `select * from banks INNER JOIN branches ON branches.bank_id=banks.id WHERE banks.name = $1 AND branches.city = $2`,
    [bankname, cityname]
  )
    .then(function(data) {
      res.status(200).json({
        status: "success",
        data: data,
        message:
          "Retrieved all the branch details of the given bank in the specified city"
      });
    })
    .catch(function(err) {
      return next(err);
    });
}

module.exports = {
  getSingleBranch: getSingleBranch,
  getBranches: getBranches
};
