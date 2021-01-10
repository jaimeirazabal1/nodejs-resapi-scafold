import {Router} from 'express';

import * as productsCtrl from '../controllers/products.controller';

import { authJwt } from '../middlewares';

const router = Router();

router.post('/', [authJwt.verifyToken, authJwt.isModerator], productsCtrl.createProduct);

router.get('/',productsCtrl.getProducts);

router.get('/:productId',productsCtrl.getProductById);

router.put('/:productId', authJwt.verifyToken, productsCtrl.updateProductById);

router.delete('/:productId', authJwt.verifyToken, productsCtrl.deleteProductById);

export default router;