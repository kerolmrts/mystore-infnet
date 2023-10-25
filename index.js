const express = require('express');
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');
const app = express();
const port = 3000;
const redirectMiddleware= require('./middlewares/redirectMiddleware');
const logMiddleware = require('./middlewares/logMiddleware');
const rateLimit = require('./middlewares/rateLimitMiddleware');


app.use(express.json());
//para que o projeto possa receber/ler arquivos json

app.use(cors());
//obs instalar o "npm i cors"
//função de segurança para poder definir a origem do tráfego que irá consumir sua API
//A biblioteca nos permite aceitar requisições de qualquer origem
//manipula quem pode ter acesso a aplicação

app.use(redirectMiddleware);
//obs: observar que o middleware precisa vir antes do routes e há hierarquia entre os middlewares
app.use(logMiddleware);
app.use(rateLimit);
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