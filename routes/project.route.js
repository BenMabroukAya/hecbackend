// create : /
// getAll : /
// getById : /:id
// update : /:id
// deleteById : /:id

const express = require('express');
const router = express.Router();
const Project = require('../models/project');

// Create a new project
router.post('/', async (req, res) => {
    try {
        const { title, photo, description, client, status } = req.body;
        const project = new Project({ title, photo, description, client, status });
        await project.save();
        res.status(201).json({ message: 'Project created successfully', project });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate('client');
        res.status(200).json(projects);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get a single project by ID
router.get('/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('client');
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
    try {
        const { title, photo, description, client, status } = req.body;
        const project = await Project.findByIdAndUpdate(req.params.id, { title, photo, description, client, status }, { new: true });
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project updated successfully', project });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a project
router.delete('/:id', async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
