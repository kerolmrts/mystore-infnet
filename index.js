const express = require('express');
const app = express();
const port = 3000;
const categoryRoutes = require('./routes/categoryRoutes')

app.get('/', (req, res) => {
    res.send('Hello, World')
    //redirecionamento 
    // 'entrar na rota / + req (valores da requisição) + res (o que vamos responder com a aplicação)
    //send vai enviar para o usuário
   
})
app.get('/categories',  categoryRoutes)
//quando entrar em /categorias, é redirecionado para categoryController

app.listen(port, ()=>{
    console.log('Server is running on http://localhost:'+ port)
})