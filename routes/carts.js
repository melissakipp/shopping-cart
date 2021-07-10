const express = require('express');

const router = express.Router();

// Recieve a post request to add an item to a cart


// Receive a GET request to show all items in cart
router.post('/cart/products', (req, res) => {
  console.log(req.body.productId);

  res.send('Product added to cart')
});

// Receive a post request to delete an item from a cart


module.exports = router;