import express from 'express';
import * as quizController from '../controllers/quiz.controller.js';

const router = express.Router();

// Create a new quiz
router.post('/', quizController.createQuiz);

// Get all quizzes
router.get('/', quizController.getAllQuizzes);

// Get a single quiz by id
router.get('/:id', quizController.getQuizById);

// Update a quiz by id
router.put('/:id', quizController.updateQuizById);

// Delete a quiz by id
router.delete('/:id', quizController.deleteQuizById);

export default router;
