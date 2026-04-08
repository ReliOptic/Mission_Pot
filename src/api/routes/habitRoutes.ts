import { Router } from 'express';
import { habitController } from '../controllers/habitController';

const router = Router();

/**
 * Habit related routes
 */
router.get('/habits', habitController.getHabits);
router.get('/lobby', habitController.getLobby);
router.get('/rankings', habitController.getRankings);

export default router;
