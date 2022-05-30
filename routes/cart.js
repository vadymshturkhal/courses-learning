'use strict';

const { Router } = require('express');
const Cart = require('../models/cart');
const Course = require('../models/course');

const router = Router();

router.post('/cart/add', async (req, res) => {
  const courseId = req.body.course_id;
  const course = await Course.getById(courseId);
  await Cart.add(course);
});

router.get('/cart', async (req, res) => {
  const cart = await Cart.fetch();
  const totalCartPrice = await Cart.fetchTotalPrice();
  res.render('cart', {
    title: 'Cart',
    isCart: true,
    price: totalCartPrice,
    cart,
  });
});

router.delete('/cart/remove/:id', async (req, res) => {
  const cart = await Cart.remove(req.params.id);
  const totalCartPrice = await Cart.fetchTotalPrice();
  const data = {
    price: totalCartPrice,
    courses: cart,
  };
  return res.json(data);
});

module.exports = router;
