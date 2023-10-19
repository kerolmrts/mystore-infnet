const filesystem = require("fs").promises;
//para que, por padrão, receba os dados do FS como promise
const path = require("path");

const categoriesFilePath = path.join(__dirname, "../data/categories.json");

const getCategories = () => {
  //função para fazer a leitura dos dados
  return filesystem
      .readFile(categoriesFilePath, "utf-8")
      //Opcional: Pode passar a codificação, isto é, o segundo parâmetro para definir que será lido com a codificação de 'utf-8'
      .then((categoriesData) => JSON.parse(categoriesData))
      //caso positivo: variável que vai receber os dados, mas codificado em JSON
      .catch((error) => {
        throw new Error("Couldn't read file"); //para a execução e joga o erro na tela
      });
 };

const createCategory=(newCategory) =>{
return getCategories()
.then((categoriesData)=>{
  categoriesData.push({name: newCategory.name});

//inserir categorias dentro de um Json
// para criar, é preciso ter recebido alguma info
//newCategory é um parâmetro das infos recebidas
// getCategories(promise) vai tentar obter as categorias e daí irá inserir uma nova categoria
//.name atributo
// se positivo, vai pegar os dados e escrever o arquivo:
return filesystem.writeFile(categoriesFilePath, JSON.stringify(categoriesData))
//parâmetro 1: endereço de onde está o arquivo (no nosso caso, nós criamos o endereço)
// parâmetro 2: o que será escrito, mas primeiro irá codificar o arquivo
})
.catch((error)=>{
  throw new Error ('Category not created')

})
}

module.exports={
    getCategories,
    createCategory
};
