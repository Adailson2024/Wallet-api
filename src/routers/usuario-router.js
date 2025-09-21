import { Router } from 'express';
import { signIn, signUp } from '../controllers/usuarios-controllers.js';
import { usuarioSchema,usuarioLoginSchema } from '../schemas/usuarios-schemas.js';
import { validarSchema } from '../middleswares/schema-middles.js';
const authRouter = Router();
authRouter.post("/sign-up",validarSchema(usuarioSchema),signUp);
authRouter.post("/sign-in",validarSchema(usuarioLoginSchema),signIn);

export default authRouter;