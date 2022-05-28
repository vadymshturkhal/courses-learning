'use strict';

// eslint-disable-next-line no-unused-vars
const { Pool, Client } = require('pg');

const CREDENTIAL = {
  user: 'vshturkhal',
  host: 'localhost',
  database: 'express_db',
  password: '1',
  port: 5432,
};

// eslint-disable-next-line no-unused-vars
const QUERIES = {
  1: 'SELECT * FROM courses',
  2: `CREATE TABLE courses (
    id serial PRIMARY KEY,
    price SMALLINT,
    title VARCHAR ( 50 ) UNIQUE NOT NULL,
    img_url VARCHAR ( 50 ) NOT NULL
  )`,
  3: `
  INSERT INTO courses (price, title, img_url)
  VALUES (0, 'math', 'url')`,
  4: `
  ALTER TABLE courses 
  ADD COLUMN course_id VARCHAR (50);`,
  5: `
  SELECT title
  FROM courses
  WHERE course_id='7c9c3bf0-b8e5-4d90-9fac-6ab37e15ee46'`,
  6: `
  ALTER TABLE courses
  ALTER COLUMN img_url
  TYPE text`,
  7: `
  UPDATE courses
  SET img_url='https://spaceplace.nasa.gov/templates/featured/sun/all-about-the-sun300.jpg'
  WHERE id=1`,
  8: `UPDATE courses
  SET course_id='ba388035-7b10-4b59-a4aa-96cc651eaf2e'
  WHERE id=1`,
  9: `UPDATE courses
  SET img_url='https://images.unsplash.com/photo-1589675192397-1550ff0f7c12?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTF8fHxlbnwwfHx8fA%3D%3D&w=1000&q=80'
  WHERE id=2`,
  10: `
  SELECT course_id
  FROM courses
  WHERE course_id='1'`,
  11: `
  CREATE TABLE carts (
    id serial PRIMARY KEY,
    quantity smallint NOT NULL,
    course_id text NOT NULL
  )`,
  12: `CREATE TABLE carts (
    course_id uuid DEFAULT uuid_generate_v4(),
    course_quantity smallint NOT NULL
);`,
};

// sendQueryToBase(QUERIES[12]);

async function sendQueryToBase(query, cred = CREDENTIAL) {
  const pool = new Pool(cred);

  const response = await pool.query(query).catch((err) => {
    console.log(err.message);
    process.exit(1);
  });
  // console.log(response.rows);
  await pool.end();

  return response.rows;
}

module.exports = sendQueryToBase;
