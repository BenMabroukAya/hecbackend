// projects will be classed into categories 
// categories are the date of projects 

const mongoose =require("mongoose")
const categorieSchema=mongoose.Schema({
    Datecategorie:{ type: String, required: true,unique:true },
    //imagecategorie :{ type: String, required: false }
    })
    module.exports=mongoose.model('Categorie',categorieSchema)