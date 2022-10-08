const express = require('express');
const { signin, signup } = require('../controllers/Auth');
const { jobsAll, jobsSearch, jobsId } = require('../controllers/Jobs');
const { checkDuplicateUsername, verifyToken } = require("../middlewares/authJWT");

const router = express.Router();

router.post('/auth/signin/', signin);
router.post('/auth/signup/', [ checkDuplicateUsername ], signup);
// router.post('/auth/signup/', signup);

// router.get('/jobs', jobsAll);
// router.post('/jobs/', jobsSearch);
// router.get('/jobs/:id', jobsId);
router.get('/jobs', [ verifyToken ], jobsAll);
router.post('/jobs/', [ verifyToken ], jobsSearch);
router.get('/jobs/:id', [ verifyToken ], jobsId);

module.exports = router;