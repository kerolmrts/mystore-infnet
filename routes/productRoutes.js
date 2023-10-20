const express = require("express");
const router = express.Router();
const productController= require('../controllers/productController');


router.get('/', (req, res)=>{
    productController.getProducts()
    //para mostrar todos os arquivos
    .then((productsData)=> res.json(productsData))
    .catch((error) => res.status(500).send('Error obtaining products'))

})

router.get('/:id', (req,res)=>{
    //concatenação com url /products
    const IdRecebido = req.params.id;
    //conectar com um controller pra buscar os dados
    productController.getProductById(IdRecebido)
    .then((productRecebido)=>{
        if(productRecebido){
            res.status(200).json(productRecebido);
        }else{
            res.status(404).send('Product not found');
        }
    })
    .catch((error)=> res.status(500).send())
      
    })

    router.get('/search/:name',(req,res)=>{
    const productName= req.params.name;
    productController.searchProductByName(productName)
    // res.send("Name send by client to server:" + productName)    -- para testar a rota
    .then((products)=>{
        if(products){
            res.status(200).send(products)
        }else{
            res.status(404).send('Product Name not found')
        }

    })
    .catch((error)=> res.status(500).send())
    })

module.exports= router; 

//receber uma solicitação e encaminhar

