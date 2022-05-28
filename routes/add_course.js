'use strict';

const { Router } = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/add_course', (req, res) => {
  res.render('add_course', {
    title: 'Add Course',
    isAddCourse: true,
  });
});

router.post('/add_course', async (req, res) => {
  res.redirect('/courses');
  await Course.add(...Object.values(req.body));
});

module.exports = router;
