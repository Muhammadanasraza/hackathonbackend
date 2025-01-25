import express from 'express';
import { createUser, updateUser, deleteUser, getUser }  from '../Controllers/users.controller.js';

const router = express.Router();
// POST /api/users - Admin can create a new user
router.post('/', createUser);

// PUT /api/users/:id - Admin can update user details
router.put('/:id', updateUser);

// DELETE /api/users/:id - Admin can delete a user
router.delete('/users/:id', deleteUser);

// GET /api/users/:id - Admin can get user details
router.get('/available', getUser);

export default router;
