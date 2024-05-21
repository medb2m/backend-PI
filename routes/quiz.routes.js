import express from 'express';
import { createQuiz, getAllQuizzes, getQuizById, updateQuizById, deleteQuizById, takeQuiz, getQuizbyCourseID} from '../controllers/quiz.controller.js';
import authorize from '../_middleware/authorize.js';
import Role from '../_helpers/role.js';
import checkEnrollment from '../_middleware/checkEnrollement.js';

const router = express.Router();

router.post('/add/:courseId', authorize(), createQuiz);
router.get('/', getAllQuizzes);
router.get('/:id', authorize(), getQuizById);
router.get('/:courseId', authorize(), getQuizbyCourseID);
router.put('/:id', authorize(Role.User), updateQuizById);
router.delete('/:id', authorize(Role.User), deleteQuizById);
router.post('/take/:courseId', authorize(), checkEnrollment,takeQuiz);

export default router;
