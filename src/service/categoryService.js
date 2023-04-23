const router = require('express').Router();
const fs = require('fs');

router.get('', (req, res, next) => {
  fs.readFile('./productData.json', 'utf-8', (err, data) => {
    res.status(200).json({
      category: JSON.parse(data),
    });
  });
});

module.exports = router;
