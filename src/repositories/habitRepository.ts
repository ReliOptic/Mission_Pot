import { Habit, Stakeholder, Ranking } from '../types/index';
import { HABITS, STAKEHOLDERS, RANKINGS } from '../constants';

/**
 * Repository layer for data access. 
 * Currently uses mock data, but structured for future database integration.
 */
export class HabitRepository {
  /**
   * Fetches all available habits
   */
  async getAllHabits(): Promise<Habit[]> {
    return HABITS;
  }

  /**
   * Fetches all stakeholders for the current lobby
   */
  async getStakeholders(): Promise<Stakeholder[]> {
    return STAKEHOLDERS;
  }

  /**
   * Fetches weekly rankings
   */
  async getRankings(): Promise<Ranking[]> {
    return RANKINGS;
  }
}

export const habitRepository = new HabitRepository();
