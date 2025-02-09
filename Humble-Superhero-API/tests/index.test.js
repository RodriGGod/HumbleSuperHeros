const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

//in-memory-database test
const superheroes = [];
let id = 1;


app.post('/superheroes', (req, res) => {
  const { name, superpower, humilityScore } = req.body;
  if (!name || !superpower || humilityScore === undefined || humilityScore < 1 || humilityScore > 10) {
    return res.status(400).json({ error: 'Invalid input' });
  }
  const superhero = { id: id++, name, superpower, humilityScore };
  superheroes.push(superhero);
  res.status(201).json(superhero);
});

app.get('/superheroes', (req, res) => {
  res.json(superheroes.sort((a, b) => b.humilityScore - a.humilityScore));
});





describe('Superheroes API', () => {

  it('should add a superhero and return it', async () => {
    const res = await request(app).post('/superheroes').send({
      name: 'Batman',
      superpower: 'filthy rich',
      humilityScore: 4,
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe('Batman');
  });

  it('should return superheroes sorted by humilityScore', async () => {
    await request(app).post('/superheroes').send({
      name: 'Arrow',
      superpower: 'archery',
      humilityScore: 10,
    });

    const res = await request(app).get('/superheroes');
    expect(res.statusCode).toEqual(200);
    expect(res.body[0].name).toBe('Arrow'); 
  });
});
