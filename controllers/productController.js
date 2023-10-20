const filesystem = require("fs").promises;
const path = require("path");

const productFilePath = path.join(__dirname, "../data/products.json");

const getProducts= ()=>{
    return filesystem.readFile(productFilePath, 'utf-8')
    .then((productsData) => JSON.parse(productsData))
    .catch((error)=> {
        throw new Error('Unable to read product file')

    })
};
// readfile obrigatório: argumento 1- caminho onde está o arquivo que irá manipular, arg 2- opcional - utf-8
// productsData vai receber todos os dados,independente do ID


const getProductById = (productId) => {
    //logica para acessar os produtos, procurar pelo productId e retornar o produto
    return getProducts()
    .then((allProducts)=> allProducts.find(
        product => product.id === parseInt(productId)
        ))
        //como é uma arrow function de apenas uma linha, não precisa do return pq já é implícito 
    .catch((error)=>{
        throw new Error('Unable to find product by ID')
    })
};
//find- procurar o produto que tenha ID e faz uma seleção dos produtos que tenha o ID que queremos 


const searchProductByName= (productName)=>{
    return getProducts()
    .then((productsData)=>{
      
        const filteredProducts= productsData.filter((product)=>
            product.title.toLowerCase().includes(productName.toLowerCase())
             //aqui é 1 produto do JSON que está incluso o titulo do productName
            )
            return filteredProducts;
    })
    .catch((error)=>{
        throw new Error ('Unable to find products by name')
    })
}


module.exports={
    getProducts,
    getProductById,
    searchProductByName
};


// processamento, procura de produtos