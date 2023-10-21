module.exports= (req, res, next)=>{
    // console.log('Passou pelo middleware')
    if(req.url === '/produtos'){
        console.log('Redirect enabled')
    return res.redirect(301, '/products')
    }
    next();
}

//Middlewares interceptam uma solicitação
//parâmetro next: destino
//precisa ser declarado no ponto de entrada da aplicação (index)
//este é um middleware personalizado (há tb o importado, o nativo etc)
//No caso de /produtos e /products - é para caso de API bilíngue, para não ter que refazer a rota. O middleware intercepta e redireciona

