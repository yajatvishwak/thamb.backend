const mongoose = require("mongoose");
const Team = require("../models/teams");
var _ = require("lodash");
const ansKey = [
  { clueCode: "Clue1", response: "Y" },
  { clueCode: "Clue2", response: "4" },
  { clueCode: "Clue3", response: "J" },
  { clueCode: "Clue4", response: "T" }
];

const acceptData = (req, res, next) => {
  //console.log(req.body);
  //console.log(req.body);
  var updated = false;
  const teamid = req.body.teamID;
  const data = req.body.data;
  //console.log(teamid);
  //console.log(data);
  var a = [];

  Team.findOne({ teamID: teamid }, (err, doc) => {
    if (doc) {
      var arr = doc.data;

      a = a.concat(arr);
      const finalArr = a.concat(data);

      Team.updateOne(
        { teamID: teamid },
        {
          data: finalArr,
          score: 0
        }
      )
        .then((updated = true))
        .catch(err => {
          console.log(err);
        });

      if (updated) {
        res.json(true);
      } else {
        res.json(false);
      }
    }
  });
};

const auth = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const query = {
    teamID: username,
    password: password
  };
  Team.findOne(query, (err, doc) => {
    if (doc) {
      res.json(true);
    } else {
      res.json(false);
    }
  });
};
const connectChk = (req, res, next) => {
  res.json(true);
};

const result = (req, res, next) => {
  Team.find({}, (err, docs) => {
    const scoreArr = docs.map(doc => {
      console.log(doc.teamID);

      var a = {
        score: getResult(doc),
        teamID: doc.teamID,
        members: doc.members
      };
      return a;
    });
    res.json(scoreArr); //console.log(scoreArr);
  });
};

const getResult = doc => {
  var data = doc.data;
  data = data.map(ele => {
    const newarr = {
      clueCode: ele.subtitle,
      response: ele.response
    };
    return newarr;
  });
  var ndata = _.uniqBy(data, "clueCode");
  var scoreArr = ndata.map(e => {
    for (var i in ansKey) {
      if (e.response === ansKey[i].response) {
        return 10;
      }
    }
    return 0;
  });
  //console.log(scoreArr);
  const sum = scoreArr.reduce((a, b) => a + b, 0);
  return sum;
};

exports.auth = auth;
exports.result = result;
exports.connectChk = connectChk;
exports.acceptData = acceptData;
