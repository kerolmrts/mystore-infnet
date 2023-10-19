const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// router.get("/categories", (req, res) => {
    router.get('/', (req, res) => {
        //usando app.use, não precisa sobrescrever as categorias
        //sempre que formos usar outro arquivo de rotas, vamos utilizar o "use"
        //só utiliza get se tiver com a resposta pronta
  categoryController.getCategories()
    //como o getCategories é uma promise, pode usar o then e catch
    .then((categories) => res.json(categories))
    .catch((error) => res.status(500).send("Error getting categories"))
     console.log("camada de roteamento");
});


router.post("/",(req, res)=>{
    const newCategory= req.body;
      categoryController.createCategory(newCategory)
    .then(()=> res.status(201).send('Category created successfully'))
    .catch((error)=> res.status(500).send('Error creating category'))
    // console.log(newCategory)

    
});



module.exports = router;
