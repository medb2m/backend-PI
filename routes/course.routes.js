import express from 'express';
import { createCourse, getAllCourses, getCourseById, updateCourseById, deleteCourseById, enrollInCourse, getCourseCreator } from '../controllers/course.controller.js';
import authorize from '../_middleware/authorize.js'
import Role from '../_helpers/role.js'

const router = express.Router();

router.post('/add', authorize(), createCourse);
router.get('/', getAllCourses);
router.get('/get/:id', getCourseById);
router.put('/update/:id', authorize(), updateCourseById);
router.delete('/delete/:id', authorize(Role.Admin), deleteCourseById);
router.get('/creator/:id', getCourseCreator);
router.post('/enroll/:id', authorize(), enrollInCourse);

export default router;