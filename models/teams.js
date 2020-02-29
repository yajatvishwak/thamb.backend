var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var TeamsSchema = new Schema({
  _id: false,
  teamID: { type: String },
  //password: String,
  members: [String],
  data: [
    {
      title: String,
      subtitle: String,
      response: { type: String, maxlength: 1 },
      body: String
    }
  ],
  score: Number
});

module.exports = mongoose.model("Teams", TeamsSchema);
