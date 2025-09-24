import { Router } from 'express';
import { validarToken } from '../middlewares/usuarios-middles.js';
import { deletarTransacoes, getTransacoes, getTransacoesPorId, criarTransacoes, alterarTransacoes } from '../controllers//transacoes-controllers.js';
import { transactionSchema } from '../schemas/transaction-schemas.js';
import { validarSchema } from '../middlewares/schema-middles.js';
const transacoesRouter = Router();
transacoesRouter.use(validarToken);
transacoesRouter.get('/transaction', getTransacoes);
transacoesRouter.get('/transaction/:id',getTransacoesPorId);
transacoesRouter.post('/transaction',validarSchema(transactionSchema),criarTransacoes);
transacoesRouter.delete("/transaction/:id", deletarTransacoes);
transacoesRouter.put("/transaction/:id",validarSchema(transactionSchema), alterarTransacoes);

export default transacoesRouter;