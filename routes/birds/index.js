
const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

router.use('/:birdId', (req, _res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
}, (req, _res, next) => {
  console.log('Request Type:', req.method);
  next();
});

router.get('/', (_req, res) => {
  const birds = [
    { name: 'Eagle', size: 'Big' },
    { name: 'Hawk', size: 'Big' },
    { name: 'Parrot', size: 'Small' },
  ];
  // eslint-disable-next-line array-callback-return
  birds.map((bird) => {
    const { name } = bird;
    const { size } = bird;
    console.log(`${size} ${name}`);
  });
  res.status(200).send(birds);
});

router.get('/:birdId', (req, res) => {
  const bird = { id: req.params.birdId };
  res.status(200).send(`Get Bird object with the ID of ${bird.id}`);
  console.log(bird.id);
});

router.post('/', (_req, res) => {
  const data = {
    name: 'Eagle',
    size: 'Extra Big',
  };
  res.status(201).send(data);
});

router.put('/:birdId', (req, res) => {
  const bird = {
    id: req.params.birdId,
    name: 'Eagle',
    size: 'Extra Big',
  };
  res.status(204).send(`Update Bird object with the ID of ${bird}`, bird);
});

router.delete('/:birdId', (req, res) => {
  const bird = { id: req.params.birdId };
  res.status(202).send(`Delete Bird object with the ID of ${bird.id}`);
});

module.exports = router;
