import Quiz from '../models/quiz.model.js';

// Create a new quiz
export const createQuiz = async (req, res) => {
  const quiz = new Quiz(req.body);
  await quiz.save();
  res.status(201).json(quiz);
};

// Get all quizzes
export const getAllQuizzes = async (req, res) => {
  const quizzes = await Quiz.find().populate('course');
  res.json(quizzes);
};

// Get a single quiz by id
export const getQuizById = async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).populate('course');
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  res.json(quiz);
};

// Update a quiz by id
export const updateQuizById = async (req, res) => {
  const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  res.json(quiz);
};

// Delete a quiz by id
export const deleteQuizById = async (req, res) => {
  const quiz = await Quiz.findByIdAndDelete(req.params.id);
  if (!quiz) {
    return res.status(404).json({ message: 'Quiz not found' });
  }
  res.json({ message: 'Quiz deleted' });
};
