const express = require('express');
const router = express.Router();
const dboperations = require('./utilisateur_operations');

// Get all utilisateurs
router.get('/utilisateurs', (req, res) => {
    dboperations.getUtilisateurs().then((result) => {
        res.json(result);
    });
});

// Get an utilisateur by email and password
router.get('/utilisateurs/:mail/:pwd_web', (req, res) => {
    dboperations.getUtilisateur(req.params.mail, req.params.pwd_web).then((result) => {
        res.json(result);
    });
});

// Get societes et code by ID
router.get('/societes/:id', (req, res) => {
    dboperations.getSocietes(req.params.id).then((result) => {
        res.json(result);
    });
});

module.exports = router;