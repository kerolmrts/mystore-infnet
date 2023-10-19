const filesystem = require("fs").promises;
const path = require("path");

const productFilePath = path.join(__dirname, "../data/products.json");
const getProductById = (productId) => {
    //logica para acessar os produtos, procurar pelo productId e retornar o produto
}


module.exports={
    getProductById
};
