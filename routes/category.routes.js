import express from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById } from '../controllers/category.controller.js';

const router = express.Router();

router.post('/add', createCategory);
router.get('/getall', getAllCategories);
router.get('/get/:id', getCategoryById);
router.put('/update/:id', updateCategoryById);
router.delete('/delete/:id', deleteCategoryById);

export default router;
