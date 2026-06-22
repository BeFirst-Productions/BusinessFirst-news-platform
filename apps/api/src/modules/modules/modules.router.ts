import { Router } from 'express';
import { ModulesController } from './modules.controller';
import { AuthMiddleware } from '../../middleware/auth.middleware';
import { ValidationMiddleware } from '../../middleware/validation.middleware';
import { createModuleSchema, updateModuleSchema } from './modules.validation';

const router:Router = Router();

// All routes require SUPERADMIN authentication
router.use(AuthMiddleware.authenticate);
router.use(AuthMiddleware.authorize('SUPERADMIN'));

router.get('/', ModulesController.getAllModules);
router.get('/:id', ModulesController.getModuleById);
router.post('/', ValidationMiddleware.validate(createModuleSchema), ModulesController.createModule);
router.put('/:id', ValidationMiddleware.validate(updateModuleSchema), ModulesController.updateModule);
router.delete('/:id', ModulesController.deleteModule);

export { router as modulesRouter };