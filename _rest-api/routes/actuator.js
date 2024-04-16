import express from 'express';
import pjson from '../package.json' assert { type: 'json' };

const router = express.Router();

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/info', (req, res) => {
  res.send({ version: pjson.version });
});

export const actuatorRoute = router;
