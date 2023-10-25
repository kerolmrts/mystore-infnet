const filesystem = require("fs");
const path = require("path");

//utiliza o FS pq vai manipular um JSON
//Path pq vai utilizar caminhos para a requisição
//obs: criar arquivo json no data
const logMiddleware = (req, res, next) => {
    const newLog ={
        timestamp: new Date(),
        method: req.method,
        url: req.url,
        params: req.params,
        ip: req.ip
    }


  const logFilePath = path.join(__dirname, "../data/logs.json");

  let existingLogs = []; // ou vai pegar os logs existentes e mudar ou vai entrar mais um log lá dentro

  try {
    existingLogs = JSON.parse(filesystem.readFileSync(logFilePath)) //lê o arquivo e transforma em JSON - se não tiver, vai para o catch
  } catch (error) {
    existingLogs = [];
  }

  existingLogs.push(newLog);
  //se já tinha um log, vai acrescentar, se não tiver, vai criar o primeiro

  filesystem.writeFileSync(logFilePath, JSON.stringify(existingLogs, null, 2));
  //parâmetro 1: mandar o endereço, path; parâmetro 2: mandar os dados que quer gravar no caminho

  next();
};

module.exports = logMiddleware;
