'use strict';

// FIXME bug with quotes when add the course
const { Pool } = require('pg');

const CREDENTIAL = {
  user: 'courses_major',
  host: 'localhost',
  database: 'express_db',
  password: '1',
  port: 5432,
};

class SQLMaster {
  static async sendQuery(query, values, cred = CREDENTIAL) {
    const pool = new Pool(cred);

    const response = await pool
      .query(query, values)
      .catch((err) => {
        console.log("Can't connect to database,", err.message);
        process.exit(1);
      });

    await pool.end();
    return response.rows;
  }
}

class CourseQuery {
  static async add(title, price, imgUrl) {
    const forAddCourse = `
      INSERT INTO courses (title, price, img_url)
      VALUES ($1, $2, $3)
    `;

    const values = [title, price, imgUrl];

    await SQLMaster.sendQuery(forAddCourse, values).catch((err) => {
      console.log("Can't add new course,", err.message);
      process.exit(1);
    });
  }

  static async getAll() {
    const forGetAll = `
      SELECT price, title, img_url, course_id 
      FROM courses`;

    const allCourses = await SQLMaster.sendQuery(forGetAll);
    return allCourses;
  }

  static async getById(id) {
    const forGet = `
      SELECT price, title, img_url, course_id
      FROM courses
      WHERE course_id=$1`;

    const value = [id];

    const course = await SQLMaster.sendQuery(forGet, value);
    return course[0];
  }

  static async edit(course) {
    const forEditTheCourse = `
      UPDATE courses
      SET title=$1,
          price=$2,
          img_url=$3
      WHERE course_id=$4`;

    const values = [
      course.title,
      course.price,
      course.img_url,
      course.course_id,
    ];

    await SQLMaster.sendQuery(forEditTheCourse, values).catch((err) => {
      console.log("Can't edit the course,", err.message);
      process.exit(1);
    });
  }
}

class CartQuery {
  static async addCourseById(courseId) {
    const courseFromCart = await CartQuery.#getCourseFromCartById(courseId);

    if (courseFromCart.length === 0) {
      await CartQuery.#addNewCourseToCartById(courseId);
      return;
    }

    const coursesQuantity = courseFromCart[0].course_quantity;
    await CartQuery.#updateCourseById(courseId, coursesQuantity + 1);
  }

  static async getAllCourses() {
    const forGetAllCourses = `
      SELECT course_quantity, title, carts.price, course_id
      FROM carts
      INNER JOIN courses 
      USING (course_id);
    `;

    const allCourses = await SQLMaster.sendQuery(forGetAllCourses).catch(
      (err) => {
        console.log("Can't get all courses from cart", err.message);
        process.exit(1);
      }
    );

    return allCourses;
  }

  static async getTotalPrice() {
    const forPrice = `
      SELECT SUM(price)
      FROM carts
    `;

    const totalPrice = await SQLMaster.sendQuery(forPrice).catch((err) => {
      console.log("Can't get cart total price,", err.message);
      process.exit(1);
    });

    return totalPrice[0].sum;
  }

  static async removeCourseById(courseId) {
    const forRemove = `
      DELETE FROM carts
      WHERE course_id=$1
    `;

    const value = [courseId];

    await SQLMaster.sendQuery(forRemove, value).catch((err) => {
      console.log("Can't remove course from cart,", err.message);
      process.exit(1);
    });
  }

  static async #getCourseFromCartById(courseId) {
    const forFetch = `
      SELECT course_quantity, price
      FROM carts
      WHERE course_id=$1
    `;

    const value = [courseId];

    const course = await SQLMaster.sendQuery(forFetch, value).catch((err) => {
      console.log("Can't get the course by id,", err.message);
      process.exit(1);
    });

    return course;
  }

  static async #addNewCourseToCartById(courseId) {
    const forAddNewCourse = `
      INSERT INTO carts(course_id, course_quantity, price)
      VALUES(
        $1, 
        1, 
        (SELECT price
          FROM courses
          WHERE course_id=$1)
        )`;

    const value = [courseId];

    await SQLMaster.sendQuery(forAddNewCourse, value).catch((err) => {
      console.log("Can't add the new course,", err.message);
      process.exit(1);
    });
  }

  static async #updateCourseById(courseId, quantity) {
    const forUpdate = `
      UPDATE carts
      SET 
        course_quantity=$1,
        price=(
          SELECT courses.price
          FROM courses
          WHERE course_id = $2) * $1
      WHERE course_id=$2
    `;

    const values = [quantity, courseId];

    await SQLMaster.sendQuery(forUpdate, values).catch((err) => {
      console.log("Can't update the course,", err.message);
      process.exit(1);
    });
  }
}

module.exports = {
  CourseQuery,
  CartQuery,
};
