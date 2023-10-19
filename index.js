const express = require('express');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();
const port = 3000;

app.use(express.json());
//para que o projeto possa receber/ler arquivos json

app.get('/', (req, res) => {
    res.send('Welcome to API E-commerce from Infnet');
    //redirecionamento 
    // 'entrar na rota / + req (valores da requisição) + res (o que vamos responder com a aplicação)
    //send vai enviar para o usuário

   
})
// app.get('/categories',  categoryRoutes)
//quando entrar em /categorias, é redirecionado para categoryController
app.use('/categories',  categoryRoutes);
//consegue realizar qualquer tipo de requisição
app.use('/products', productRoutes)

app.listen(port, ()=>{
    console.log('Server is running on http://localhost:'+ port)
})