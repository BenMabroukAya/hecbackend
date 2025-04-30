// projects's categories will be classed into other categories (scategories) as demanded from hec'admin
// scategories will be the Building type
// it references the project's categorie
// under every year we find projects classed into many types according to the type Building

const mongoose =require("mongoose")
const Categorie =require("./categorie.js");

const scategorieSchema=mongoose.Schema({

nomScategorie:{ type: String, required: true },
//imagescat :{ type: String, required: false },
categorieID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categorie",}
})

module.exports=mongoose.model('scategorie',scategorieSchema)