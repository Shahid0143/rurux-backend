
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Routes for subjects management
router.get('/subjects', adminController.getSubjects);
router.post('/subjects', adminController.createSubject);
router.put('/subjects/:id', adminController.updateSubject);
router.delete('/subjects/:id', adminController.deleteSubject);

router.put('/stream/update', adminController.updateStream);
router.delete('/stream/delete', adminController.deleteStream);
router.post('/stream/add', adminController.addSubjectToStream);

router.put('/subjects/update', adminController.updateSubjects);
router.delete('/subjects/delete', adminController.deleteSubjects);

router.post('/marks', adminController.addMarks);
router.put('/marks/update', adminController.updateMarks);
router.delete('/marks/delete', adminController.deleteMarks);

router.get('/studentList', adminController.getStudentList);

module.exports = router;
