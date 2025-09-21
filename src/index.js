import express,{json} from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import authRouter from './routers/usuario-router.js';
import transacoesRouter from './routers/transacoes-router.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(json());

app.get('/', (req, res) => {
  res.send('Bem-vindo ao meu servidor Express!');
});

app.use(authRouter);
app.use(transacoesRouter);

const porta=process.env.PORTA;
app.listen(porta, () => {
  console.log(`Servidor está rodando liso na porta ${porta}`);
});
