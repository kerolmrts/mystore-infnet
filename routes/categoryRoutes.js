const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController')


router.get('/categories', (req, res) =>{
   categoryController.getCategories()
   //como o getCategories é uma promise, pode usar o then e catch
   .then((categories)=> res.json(categories))
   .catch((error)=> res.status(500).send('Error getting categories'))
    console.log('camada de roteamento')
});

module.exports= router;

