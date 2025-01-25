import express from 'express';

import { createTask,getAllTasks, getTaskById,updateTask,deleteTask} from '../Controllers/tasks.controller.js';
const router = express.Router();

// Routes
router.post('/', createTask); // Create Task
router.get('/available', getAllTasks); // Get All Tasks
router.get('/:id', getTaskById); // Get Task by ID
router.put('/:id', updateTask); // Update Task
router.delete('/:id', deleteTask); // Delete Task

export default router;
