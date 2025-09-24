import { Router } from 'express';
import { validarToken } from '../middlewares/usuarios-middles.js';
import { deletarTransacoes, getTransacoes, getTransacoesPorId, criarTransacoes, alterarTransacoes } from '../controllers//transacoes-controllers.js';
import { transactionSchema } from '../schemas/transaction-schemas.js';
import { validarSchema } from '../middlewares/schema-middles.js';
const transacoesRouter = Router();
transacoesRouter.use(validarToken);
transacoesRouter.get('/transactions', getTransacoes);
transacoesRouter.get('/transactions/:id',getTransacoesPorId);
transacoesRouter.post('/transactions',validarSchema(transactionSchema),criarTransacoes);
transacoesRouter.delete("/transactions/:id", deletarTransacoes);
transacoesRouter.put("/transactions/:id",validarSchema(transactionSchema), alterarTransacoes);

export default transacoesRouter;