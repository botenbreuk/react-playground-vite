import express from 'express';

const router = express.Router();

const pokemon = [
  { id: 1, name: 'Bulbasaur' },
  { id: 2, name: 'Charmander' },
  { id: 3, name: 'Squirtle' }
];

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now());
  next();
});

// define the home page route
router.get('/', (req, res) => {
  res.send({ data: pokemon });
});

// define the about route
router.get('/:id', (req, res) => {
  const { id } = req.params;

  const current = pokemon.filter(value => value.id === parseInt(id))[0];

  if (current) {
    res.send(current);
  } else {
    res.status(404).send('Sorry, cant find that');
  }
});

export const pokemonRoute = router;
