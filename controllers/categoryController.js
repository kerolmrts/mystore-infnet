const filesystem = require("fs").promises;
//para que, por padrão, receba os dados do FS como promise
const path = require("path");

const categoriesFilePath = path.join(__dirname, "../data/categories.json");

const getCategories = () => {
  //função para fazer a leitura dos dados
  return (
    filesystem
      .readFile(categoriesFilePath, "utf-8")
      //Opcional: Pode passar a codificação, isto é, o segundo parâmetro para definir que será lido com a codificação de 'utf-8'
      .then((categoriesData) => JSON.parse(categoriesData))
      //caso positivo: variável que vai receber os dados, mas codificado em JSON
      .catch((error) => {
        throw new Error("Couldn't read file"); //para a execução e joga o erro na tela
      })
  );
};

module.exports={
    getCategories
};
