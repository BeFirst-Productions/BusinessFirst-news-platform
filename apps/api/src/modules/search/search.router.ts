import { Router } from 'express';
import { SearchController } from './search.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';

const router: Router = Router();

// Protect search under authentication
router.use(AuthMiddleware.authenticate);

router.get('/global', SearchController.globalSearch);

export { router as searchRouter };
