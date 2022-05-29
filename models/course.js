'use strict';

const { CourseQuery } = require('../mediator');

// FIXME add delete()
class Course {
  constructor(title, price, imgUrl) {
    this.title = title;
    this.price = price;
    this.imgUrl = imgUrl;
  }

  static async add(title, price, imgUrl) {
    await CourseQuery.add(title, price, imgUrl);
  }

  static async getAllCourses() {
    const allCourses = await CourseQuery.getAll();
    return allCourses;
  }

  static async getById(id) {
    const course = await CourseQuery.getById(id);
    return course;
  }

  static async edit(course) {
    await CourseQuery.edit(course);
  }

  static async deleteById(id) {
    await CourseQuery.deleteById(id);
  }
}

module.exports = Course;
