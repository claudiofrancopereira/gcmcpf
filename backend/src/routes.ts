import { Router } from 'express';

import CPFController from './controllers/CPFController';
import AbordagemController from './controllers/AbordagemController';

const routes = Router()

routes.post('/cpf', CPFController.create);
routes.get('/cpf', CPFController.index);
routes.get('/cpf/:id', CPFController.show);

routes.post('/abordagem', AbordagemController.create)

export default routes;
