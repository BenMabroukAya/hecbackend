// create : /
// getAll : /
// getById : /:id
// update : /:id
// deleteById : /:id
// Get project with scategorieId : /scat/:scategorieID
// Get project with categorieId : /cat/:categorieID

const express = require('express');
const router = express.Router();

const Scategorie =require("../models/scategorie");

const Project = require('../models/project');

// Create a new project
router.post('/', async (req, res) => {
    /*try {
        const { title/*, photo, description/*, client, status } = req.body;
        const project = new Project({ title/*, photo, description/*, client, status });
        await project.save();
        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }*/

        const newproject = new Project(req.body)
        try {
        await newproject.save();
        res.status(200).json(newproject );
        } catch (error) {
            
        res.status(404).json({ message: error.message });}
        
        
});

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find({}, null, {sort: {'_id': - 1}}).populate("scategorieID").exec();
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get a single project by ID
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json(project);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a project
router.put('/:id', async (req, res) => {
    /*try {
        const { title, photo, description, client, status } = req.body;
        const project = await Project.findByIdAndUpdate(req.params.id, { title, photo, description, client, status }, { new: true });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project updated successfully', project });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }*/

        try {
            const project = await Project.findByIdAndUpdate(req.params.id,{ $set: req.body },{ new: true });
            const projects = await Project.findById(project._id).populate("scategorieID").exec();
            res.status(200).json({ message: 'Project updated successfully', projects });;
            } catch (error) {
            res.status(404).json({ message: error.message });
            }
});



// Delete a project

/*router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});*/


/*router.delete('/:id', async (req, res)=> {
    const id = req.params.projectId;
    await Project.findByIdAndDelete(id);
    res.json({ message: "project deleted successfully." });
    });*/

    router.delete('/:id', async (req, res) => {
        try {
          await Project.findByIdAndDelete(req.params.id);
          res.json({ message: "project deleted successfully." });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      });
      



    // Get project with scategorieId
router.get('/scat/:scategorieID',async(req, res)=>{
    try {
    const project = await Project.find({ scategorieID: req.params.scategorieID}).exec();
    res.status(200).json(project);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });


    // Get project with categorieId
    router.get('/cat/:categorieID', async (req, res) => {
    try {
        
        // Recherche des sous-catégories correspondant à la catégorie donnée
        const sousCategories = await Scategorie.find({ categorieID: req.params.categorieID }).exec();

        // Initialiser un tableau pour stocker les identifiants des sous-catégories trouvées
        const sousCategorieIDs = sousCategories.map(scategorie => scategorie._id);
        
        // Recherche des projets correspondants aux sous-catégories trouvées
        const projects = await Project.find({ scategorieID: { $in: sousCategorieIDs } }).exec();
        res.status(200).json(projects);
    } 
    catch (error) {
    res.status(404).json({ message: error.message });
    }
    });



module.exports = router;
