const express = require("express");
const router = express.Router();

router.get('/:id', (req,res)=>{
    //concatenação com url /products
    const IdRecebido = req.params.id;
    //conectar com um controller pra buscar os dados
    

})

module.exports= router; 