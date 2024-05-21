    import Course from '../models/course.model.js';

    // Create a new course
    export const createCourse = async (req, res) => {
        try {
          const { title, description, price } = req.body;
          const creatorId = req.user._id;
      
          const course = new Course({ title, description, price, creator: creatorId });
          await course.save();
          res.status(201).json(course);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
    };

    export const enrollUserToCourse = async (req, res) => {
        try {
          const courseId = req.params.id;
          const { userId } = req.user._id;
      
          // Vérifiez si le cours existe
          const course = await Course.findById(courseId);
          if (!course) {
            return res.status(404).json({ message: 'Course not found' });
          }
      
          // Ajoutez l'utilisateur à la liste des enregistrements du cours
          course.enrolls.push(userId);
          await course.save();
      
          res.json(course);
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
      };
     
      
      
      

    // Get all courses
    export const getAllCourses = async (req, res) => {
    const courses = await Course.find().populate('creator').populate('videos')
    res.json(courses);
    };

    // Get a single course by id
    export const getCourseById = async (req, res) => {
    const course = await Course.findById(req.params.id).populate('creator').populate('videos').populate('students').populate('category');
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
    };

    // Update a course by id
    export const updateCourseById = async (req, res) => {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    res.json(course);
    };

    // Delete a course by id
    export const deleteCourseById = async (req, res) => {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
        return res.status(404).json({ message: 'Course not found' });
    }
    res.json({ message: 'Course deleted' });
    };

    export const enrollInCourse = async (req, res) => {
      try {
          const courseId = req.params.id;
          const userId = req.user.id;
  
          // Vérifiez si le cours existe
          const course = await Course.findById(courseId);
          if (!course) {
              return res.status(404).json({ message: 'Course not found' });
          }
  
          // Vérifiez si l'utilisateur est déjà inscrit
          if (course.enrolls.includes(userId)) {
              return res.status(400).json({ message: 'User already enrolled in this course' });
          }
  
          // Ajoutez l'utilisateur à la liste des inscrits
          course.enrolls.push(userId);
          await course.save();
  
          res.status(200).json({ message: 'User enrolled in course successfully' });
      } catch (error) {
          res.status(500).json({ message: 'Error enrolling in course', error: error.message });
      }
  }