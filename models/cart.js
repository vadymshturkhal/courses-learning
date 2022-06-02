'use strict';

const { CartQuery } = require('../mediator');

// FIXME need to isolate for all users

class Cart {
  static async add(course) {
    await CartQuery.addCourseById(course.course_id);
  }

  static async remove(id) {
    await CartQuery.removeCourseById(id);
    return await CartQuery.getAllCourses();
  }

  static async fetch() {
    const allCoursesInCart = await CartQuery.getAllCourses();
    return allCoursesInCart;
  }

  static async fetchTotalPrice() {
    const totalPrice = await CartQuery.getTotalPrice();
    return totalPrice;
  }
}

module.exports = Cart;
