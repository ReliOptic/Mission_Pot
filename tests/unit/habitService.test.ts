import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HabitService } from '../../src/services/habitService';
import { habitRepository } from '../../src/repositories/habitRepository';

vi.mock('../../src/repositories/habitRepository', () => ({
  habitRepository: {
    getAllHabits: vi.fn(),
    getStakeholders: vi.fn(),
    getRankings: vi.fn(),
  },
}));

describe('HabitService', () => {
  let habitService: HabitService;

  beforeEach(() => {
    habitService = new HabitService();
    vi.clearAllMocks();
  });

  it('should fetch all habits', async () => {
    const mockHabits = [{ id: '1', title: 'Test Habit' }];
    vi.mocked(habitRepository.getAllHabits).mockResolvedValue(mockHabits as any);

    const result = await habitService.getHabits();
    expect(result).toEqual(mockHabits);
    expect(habitRepository.getAllHabits).toHaveBeenCalledTimes(1);
  });

  it('should calculate group health correctly', async () => {
    const mockStakeholders = [
      { id: '1', status: 'VERIFIED' },
      { id: '2', status: 'PENDING' },
      { id: '3', status: 'VERIFIED' },
      { id: '4', status: 'FAILED' },
    ];
    vi.mocked(habitRepository.getStakeholders).mockResolvedValue(mockStakeholders as any);

    const result = await habitService.getLobbyData();
    
    // 2 verified out of 4 = 50%
    expect(result.groupHealth).toBe(50);
    expect(result.stakeholders).toEqual(mockStakeholders);
  });
});
