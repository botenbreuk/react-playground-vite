import express from 'express';
import { actuatorRoute } from '../routes/actuator.js';
import { pokemonRoute } from '../routes/pokemon.js';
import { userRoute } from '../routes/users.js';

const app = express();
var router = express.Router();

router.use('/pokemon', pokemonRoute);
router.use('/actuator', actuatorRoute);
router.use('/users', userRoute);

app.use('/api', router);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = 8080;

app.listen(port, () => {
  console.log(`Server url: http://localhost:${port}/api`);
});

app.get('/api/status', (request, response) => {
  const status = {
    status: 'Running api'
  };

  response.send(status);
});
