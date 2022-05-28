'use strict';

const { Router } = require('express');
const Course = require('../models/course');

const router = Router();

router.get('/courses', async (req, res) => {
  const allCourses = await Course.getAllCourses();
  res.render('courses', {
    title: 'Courses',
    isCourses: true,
    allCourses,
  });
});

router.get('/courses/:course_id', async (req, res) => {
  const courseId = req.params.course_id;
  const course = await Course.getById(courseId);
  res.render('particular_course', {
    layout: 'main',
    title: `Course ${course.title}`,
    course,
  });
});

router.get('/courses/:course_id/edit', async (req, res) => {
  if (!req.query.allow) return res.redirect('/');

  const courseId = req.params.course_id;
  const course = await Course.getById(courseId);
  res.render('course_edit', {
    layout: 'main',
    title: `Edit ${course.title}`,
    course,
  });
});

router.post('/courses/edit', async (req, res) => {
  const course = req.body;
  res.redirect('/courses');
  await Course.edit(course);
});

module.exports = router;
