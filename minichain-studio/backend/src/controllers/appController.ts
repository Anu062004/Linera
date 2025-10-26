import { Request, Response, NextFunction } from 'express';
import { LineraService } from '../services/lineraService';
import { MicroApp } from '../types';
import { createError } from '../utils/errorHandler';
import { v4 as uuidv4 } from 'uuid';

const lineraService = new LineraService();

export class AppController {
  async deployApp(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, type } = req.body;

      if (!name || !type) {
        throw createError('Name and type are required', 400);
      }

      if (!['counter', 'poll', 'tip_jar'].includes(type)) {
        throw createError('Invalid app type', 400);
      }

      // Create new chain
      const chain = await lineraService.createChain();
      
      // Deploy app to chain
      const app = await lineraService.deployApp(chain.chainId, type, name);

      // Create MicroApp object for frontend
      const microApp: MicroApp = {
        id: app.appId,
        name,
        type: type as 'counter' | 'poll' | 'tip_jar',
        chainId: chain.chainId,
        state: app.state,
        createdAt: new Date().toISOString()
      };

      res.status(201).json({
        success: true,
        data: microApp,
        message: 'App deployed successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async executeAction(req: Request, res: Response, next: NextFunction) {
    try {
      const { appId, action, params } = req.body;

      if (!appId || !action) {
        throw createError('AppId and action are required', 400);
      }

      const result = await lineraService.executeAction(appId, action, params);

      res.json({
        success: true,
        data: result,
        message: 'Action executed successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async getAppState(req: Request, res: Response, next: NextFunction) {
    try {
      const { appId } = req.params;

      if (!appId) {
        throw createError('AppId is required', 400);
      }

      const state = await lineraService.getAppState(appId);

      res.json({
        success: true,
        data: { state },
        message: 'App state retrieved successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllApps(req: Request, res: Response, next: NextFunction) {
    try {
      const apps = await lineraService.getAllApps();
      
      // Convert to MicroApp format
      const microApps: MicroApp[] = apps.map(app => ({
        id: app.appId,
        name: `App ${app.appId.slice(-8)}`, // Generate name from app ID
        type: this.determineAppType(app.state),
        chainId: app.chainId,
        state: app.state,
        createdAt: new Date().toISOString()
      }));

      res.json({
        success: true,
        data: microApps,
        message: 'Apps retrieved successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  async getCrossChainMessages(req: Request, res: Response, next: NextFunction) {
    try {
      const messages = await lineraService.getCrossChainMessages();

      res.json({
        success: true,
        data: messages,
        message: 'Cross-chain messages retrieved successfully'
      });
    } catch (error) {
      next(error);
    }
  }

  private determineAppType(state: any): 'counter' | 'poll' | 'tip_jar' {
    if (state.value !== undefined) {
      return 'counter';
    } else if (state.options !== undefined) {
      return 'poll';
    } else if (state.balance !== undefined) {
      return 'tip_jar';
    } else {
      return 'counter'; // Default fallback
    }
  }
}
