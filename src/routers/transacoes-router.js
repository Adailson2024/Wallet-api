import { Router } from 'express';
import { validarToken } from '../middleswares/usuarios-middles.js';
import { deletarTransacoes, getTransacoes, getTransacoesPorId, criarTransacoes, alterarTransacoes } from '../controllers//transacoes-controllers.js';
import { transacaoSchema } from '../schemas/transacoes-schemas.js';
import { validarSchema } from '../middleswares/schema-middles.js';
const transacoesRouter = Router();
transacoesRouter.use(validarToken);
transacoesRouter.get('/transacoes', getTransacoes);
transacoesRouter.get('/transacoes/:id',getTransacoesPorId);
transacoesRouter.post('/transacoes',validarSchema(transacaoSchema),criarTransacoes);
transacoesRouter.delete("/transacoes/:id", deletarTransacoes);
transacoesRouter.put("/transacoes/:id",validarSchema(transacaoSchema), alterarTransacoes);

export default transacoesRouter;