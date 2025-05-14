//GetAll : /

const express = require('express');
const router = express.Router();
const Scategorie=require("../models/scategorie")

router.get('/', async (req, res )=> {
    try {
    const scat = await Scategorie.find({}, null, {sort: {'_id': -1}})
    res.status(200).json(scat);
} catch (error) {
res.status(404).json({ message: error.message });
}
});

// Ajouter une nouvelle sous-catégorie
router.post('/', async (req, res) => {
    const newScategorie = new Scategorie(req.body);
    try {
        await newScategorie.save();
        res.status(201).json(newScategorie);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Rechercher par nomScategorie
router.get('/name/:name', async (req, res) => {
    try {
        const scat = await Scategorie.findOne({ nomScategorie: req.params.name });
        if (!scat) return res.status(404).json({ message: "Sous-catégorie non trouvée" });
        res.status(200).json(scat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Rechercher par ID
router.get('/:scategorieId', async (req, res) => {
    try {
        const scat = await Scategorie.findById(req.params.scategorieId);
        if (!scat) return res.status(404).json({ message: "Sous-catégorie non trouvée" });
        res.status(200).json(scat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Modifier une sous-catégorie par ID
router.put('/:scategorieId', async (req, res) => {
    try {
        const updatedScategorie = await Scategorie.findByIdAndUpdate(
            req.params.scategorieId,
            { $set: req.body },
            { new: true } // Retourne le document modifié
        );
        
        if (!updatedScategorie) {
            return res.status(404).json({ message: "Sous-catégorie non trouvée" });
        }
        
        res.status(200).json(updatedScategorie);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Supprimer une sous-catégorie par ID
router.delete('/:scategorieId', async (req, res) => {
    try {
        await Scategorie.findByIdAndDelete(req.params.scategorieId);
        res.status(200).json({ message: "Sous-catégorie supprimée avec succès" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



module.exports = router;