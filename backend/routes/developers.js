const express = require('express');
const router = express.Router();
const {
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
  getDeveloperById,
  getAllDevelopers
} = require('../controllers/developerController');

const auth=require('../middleware/auth')
const {upload} = require('../config/cloudinary');

router.use(auth)

router.get('/',getAllDevelopers);
router.get('/:id',getDeveloperById);
router.post('/',upload.single('photo'),createDeveloper);
router.put('/:id', upload.single('photo'),updateDeveloper)
router.delete('/:id', deleteDeveloper);

module.exports = router;