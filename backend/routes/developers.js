const express = require('express');
const router = express.Router();
const {
  createDeveloper,
  getAllDevelopers
} = require('../controllers/developerController');
router.post('/', createDeveloper);
router.get('/', getAllDevelopers);
module.exports = router;