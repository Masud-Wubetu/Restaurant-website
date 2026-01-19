const express = require('express');
const { protect, adminOnly } = require('../middleware/authMiddleware');
const {
  createItem,
  getMenu,
  updateItem,
  deleteItem
} = require('../controllers/menuController');

const router = express.Router();

router.get('/', getMenu);
router.post('/', protect, adminOnly, createItem);
router.put('/:id', protect, adminOnly, updateItem);
router.delete('/:id', protect, adminOnly, deleteItem);

module.exports = router;
