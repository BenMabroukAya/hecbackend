//GetAll : /
//Modifier : /:categorieId
//Delete : /:categorieId
//GetById : /:categorieId


const express = require('express');
const router = express.Router();
const Categorie=require("../models/categorie")

//GetAll
router.get('/', async (req, res )=> {
    try {
    const cat = await Categorie.find({}, null, {sort: {'_id': -1}})
    res.status(200).json(cat);
} catch (error) {
res.status(404).json({ message: error.message });
}
});

// créer une nouvelle catégorie
router.post('/', async (req, res) => {
    //const { nomcategorie, imagecategorie} = req.body;
    const newCategorie = new Categorie(req.body)
    try {
    await newCategorie.save();
    res.status(200).json(newCategorie );
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });

// modifier une catégorie
router.put('/:categorieId', async (req, res)=> {
    try {
    const cat1 = await Categorie.findByIdAndUpdate(
    req.params.categorieId,
    { $set: req.body },
    { new: true }
    );
    res.status(200).json(cat1);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });


    // Supprimer une catégorie
router.delete('/:categorieId', async (req, res)=> {
    //const id = req.params.categorieId;
    await Categorie.findByIdAndDelete(req.params.categorieId);
    res.json({ message: "categorie deleted successfully." });
    
    });

    // chercher une catégorie
router.get('/:categorieId',async(req, res)=>{
    try {
    const cat = await Categorie.findById(req.params.categorieId);res.status(200).json(cat);
} catch (error) {
res.status(404).json({ message: error.message });
}
});

// Rechercher une catégorie par Datecategorie
router.get('/date/:date', async (req, res) => {
    try {
        const cat = await Categorie.findOne({ Datecategorie: req.params.date });
        if (!cat) return res.status(404).json({ message: "Aucune catégorie trouvée pour cette date" });
        res.status(200).json(cat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;