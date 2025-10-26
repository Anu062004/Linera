import { Router } from 'express';
import { AppController } from '../controllers/appController';

const router = Router();
const appController = new AppController();

// Deploy a new micro-app
router.post('/deploy', (req, res, next) => {
  appController.deployApp(req, res, next);
});

// Execute an action on a micro-app
router.post('/execute', (req, res, next) => {
  appController.executeAction(req, res, next);
});

// Get state of a specific app
router.get('/apps/:appId/state', (req, res, next) => {
  appController.getAppState(req, res, next);
});

// Get all deployed apps
router.get('/apps', (req, res, next) => {
  appController.getAllApps(req, res, next);
});

// Get cross-chain messages
router.get('/messages', (req, res, next) => {
  appController.getCrossChainMessages(req, res, next);
});

export { router as appRoutes };
