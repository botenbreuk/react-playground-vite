import express from 'express';

const router = express.Router();

const users = [{ name: 'Piet', username: 'pietje' }];

router.get('/username-exists', (req, res) => {
  const { username } = req.query;

  const current = users.filter(value => value.username === username)[0];

  res.send(!!current);
});

export const userRoute = router;
