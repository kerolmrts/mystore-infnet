const requestCountByIP = {};

const rateLimit = (req, res, next) => {
  const clientIP = req.ip;
  if (requestCountByIP[clientIP]) {
    //criar um Array que vai ter um IP do cliente
    if (requestCountByIP[clientIP] > 5){ //se for maior q 5 - atingiu o limite
      return res.status(429).json({
        error: "You have reached the limit of requests",
      });
    }
    requestCountByIP[clientIP]++; //incrementa + 1
  } else{
    requestCountByIP[clientIP]= 1; //se for a primeira visita, vai colocar 1
    setTimeout(() =>{
        delete requestCountByIP[clientIP]
     }, 30000) //30 milissegundos 
  }
  next();
};

module.exports = rateLimit;
