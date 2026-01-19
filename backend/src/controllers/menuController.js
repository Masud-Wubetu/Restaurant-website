const MenuItem = require('../models/MenuItem');

exports.createItem = async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json(item);
};

exports.getMenu = async (req, res) => {
  const menu = await MenuItem.find({ isAvailable: true });
  res.json(menu);
};

exports.updateItem = async (req, res) => {
  const item = await MenuItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(item);
};

exports.deleteItem = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item deleted' });
};
