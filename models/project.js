const mongoose = require("mongoose");
const categorie =require("./scategorie.js");
const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  photo :{

    type: String,

    required: false

},
  description: { type: String, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["En cours", "Terminé", "Annulé"], default: "en cours" },
  createdAt: { type: Date, default: Date.now },

  scategorieID: {type:mongoose.Schema.Types.ObjectId,
    ref:Scategorie}
});

module.exports = mongoose.model("Project", ProjectSchema);
