const MenuItem = require('./models/MenuItem');

exports.createItem = async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json(item);
};
