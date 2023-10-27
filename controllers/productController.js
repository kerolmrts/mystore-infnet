const filesystem = require("fs").promises;
const path = require("path");

const productFilePath = path.join(__dirname, "../data/products.json");

const getProducts = () => {
  return filesystem
    .readFile(productFilePath, "utf-8")
    .then((productsData) => JSON.parse(productsData))
    .catch((error) => {
      throw new Error("Unable to read product file");
    });
};
// readfile obrigatório: argumento 1- caminho onde está o arquivo que irá manipular, arg 2- opcional - utf-8
// productsData vai receber todos os dados,independente do ID

const getProductById = (productId) => {
  //logica para acessar os produtos, procurar pelo productId e retornar o produto
  return (
    getProducts()
      .then((allProducts) =>
        allProducts.find((product) => product.id === parseInt(productId))
      )
      //como é uma arrow function de apenas uma linha, não precisa do return pq já é implícito
      .catch((error) => {
        throw new Error("Unable to find product by ID");
      })
  );
};
//find- procurar o produto que tenha ID e faz uma seleção dos produtos que tenha o ID que queremos

const searchProductByName = (productName) => {
  return getProducts()
    .then((productsData) => {
      const filteredProducts = productsData.filter(
        (product) =>
          product.title.toLowerCase().includes(productName.toLowerCase())
        //aqui é 1 produto do JSON que está incluso o titulo do productName
      );
      return filteredProducts;
    })
    .catch((error) => {
      throw new Error("Unable to find products by name");
    });
};

const updateProduct = (productId, updatedData) => {
  return getProducts() //obtém todos os produtos
    .then((productsData) => {
      //consegui os produtos, agora preciso achar o produto do id escolhido para ser alterado
      //em seguida, atualizar o campo (titulo)
      const productIndex = productsData.findIndex(
        (product) => product.id === parseInt(productId) //Dá um nome para cada produto e faz a comparação
      );
      if (productIndex != -1) {
        //existe um produto com aquele ID
        const existingProduct = productsData[productIndex]; //productIndex está dentro do productsData
        if (updatedData.title != undefined) {
          //ter certeza de tem coisas a serem atualizadas
          existingProduct.title = updatedData.title;
        }
        if (updatedData.price != undefined) {
          existingProduct.price = updatedData.price;
        }

        if (updatedData.description != undefined) {
          existingProduct.description = updatedData.description;
        }
        if (updatedData.category != undefined) {
          existingProduct.category = updatedData.category;
        }
        if (updatedData.rating.rate != undefined) {
            existingProduct.rating.rate= updatedData.rating.rate;
        }
        if(updatedData.rating.count != undefined){
            if(existingProduct.rating.count != undefined){ //json que está enviando os dados têm níveis
                existingProduct.rating.count++; //se tiver um existingProduct vai acrescentar mais 1
            }else{
                existingProduct.rating.count= updatedData.rating.count; //coloca o valor que recebeu caso não tinha antes
            }
        }

        productsData[productIndex] = existingProduct;

        return filesystem
          .writeFile(
            productFilePath,
            JSON.stringify(productsData, null, 2),
            "utf-8"
          )
          .then(() => {
            return existingProduct;
          })
          .error((error) => {
            throw new Error("Unable to update product");
          });
      } else {
        throw new Error("Unable to find product");
      }
    })

    .catch((error) => {
      throw new Error("Unable to get products");
    });
};


const deleteProducts= (productId) =>{
  return getProducts((productsData)=>{
    const productIndex= productsData.findIndex(
      //procura o index dentro do data
      product => product.id === parseInt(productId)
      )

      if(productIndex != -1){
        const updatedProductsData= productsData.filter(
          product => product.id !== parseInt(productId)
        )

        const deletedProduct= productsData [productIndex];
        return filesystem.writeFile(productFilePath, JSON.stringify(updatedProductsData, null, 2), 'utf-8')
        .then(()=>{
          return deletedProduct

        })
        .catch((error)=>{
          throw new Error ("Unable to delete product")
        })

      }else{
        throw new Error ("Product not found")
      }
      
  })
  .then(

  )
  .catch((error)=>{
    throw new Error('Unable to get products')

  })
}


const addProducts= (newProductData)=>{
  return getProducts()
  .then((productsData)=>{
    //Lógica para encontrar o maior id na lista de produtos
    let maxProductId= -1;
    productsData.forEach(product=>{
      if(product.id > maxProductId){

        maxProductId= product.id;
      }
    })
    const newProductId= ++maxProductId;
    const newProductWithId= Object.assign({id: newProductId}, newProductData) //insere propriedade dentro do objeto
    productsData.push(newProductWithId)

    return filesystem.writeFile(productFilePath, JSON.stringify(productsData, null, 2), "utf-8")
    .then(()=>{
      return newProductWithId;
    })
    .catch((error)=>{
      throw new Error ("Unable to add new product")
    })

  })
  .catch((error)=>{
   console.error("Unable to read product file" + error) //console.error lança o erro no back e não na rota
  })
}


module.exports = {
  getProducts,
  getProductById,
  searchProductByName,
  updateProduct,
  deleteProducts,
  addProducts
};

// processamento, procura de produtos
