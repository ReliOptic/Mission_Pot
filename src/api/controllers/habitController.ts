import { Request, Response, NextFunction } from 'express';
import { habitService } from '../../services/habitService';
import { ApiResponse } from '../../types/index';

/**
 * Controller layer for handling HTTP requests
 */
export class HabitController {
  /**
   * GET /api/habits
   */
  async getHabits(req: Request, res: Response, next: NextFunction) {
    try {
      const habits = await habitService.getHabits();
      const response: ApiResponse<any> = {
        success: true,
        data: habits,
        timestamp: new Date().toISOString(),
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/lobby
   */
  async getLobby(req: Request, res: Response, next: NextFunction) {
    try {
      const lobbyData = await habitService.getLobbyData();
      const response: ApiResponse<any> = {
        success: true,
        data: lobbyData,
        timestamp: new Date().toISOString(),
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * GET /api/rankings
   */
  async getRankings(req: Request, res: Response, next: NextFunction) {
    try {
      const rankings = await habitService.getRankings();
      const response: ApiResponse<any> = {
        success: true,
        data: rankings,
        timestamp: new Date().toISOString(),
      };
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}

export const habitController = new HabitController();
