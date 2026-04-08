import { habitRepository } from '../repositories/habitRepository';
import { Habit, Stakeholder, Ranking } from '../types/index';
import logger from '../utils/logger';

/**
 * Service layer for business logic
 */
export class HabitService {
  /**
   * Retrieves and processes habits
   */
  async getHabits(): Promise<Habit[]> {
    logger.info('Fetching habits from service layer');
    return await habitRepository.getAllHabits();
  }

  /**
   * Retrieves stakeholders and calculates group health
   */
  async getLobbyData(): Promise<{ stakeholders: Stakeholder[]; groupHealth: number }> {
    logger.info('Fetching lobby data');
    const stakeholders = await habitRepository.getStakeholders();
    
    // Business logic: Calculate group health based on verified status
    const verifiedCount = stakeholders.filter(s => s.status === 'VERIFIED').length;
    const groupHealth = Math.round((verifiedCount / stakeholders.length) * 100);

    return { stakeholders, groupHealth };
  }

  /**
   * Retrieves rankings
   */
  async getRankings(): Promise<Ranking[]> {
    logger.info('Fetching rankings');
    return await habitRepository.getRankings();
  }
}

export const habitService = new HabitService();
