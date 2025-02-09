const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); 

// in-memory-database
const superheroes = [];
let id = 1;


app.get('/', (req, res) => {
  res.send('Here we areeeee !!Humble Superhero API!!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});




//ENDPOINTS
//Add a new superhero
app.post('/superheroes', (req, res) => {
  const { name, superpower, humilityScore } = req.body;

  //validation
  if (!name || !superpower || humilityScore === undefined) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  if (typeof humilityScore !== 'number' || humilityScore < 1 || humilityScore > 10) {
    return res.status(400).json({ error: 'Humility score must be a number between 1 and 10' });
  }

  const superhero = { id: id++, name, superpower, humilityScore };
  superheroes.push(superhero);
  res.status(201).json(superhero);
});

//Fetch the list of superheroes sorted by humility score
app.get('/superheroes', (req, res) => {
  const sortedHeroes = superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  res.json(sortedHeroes);
});
