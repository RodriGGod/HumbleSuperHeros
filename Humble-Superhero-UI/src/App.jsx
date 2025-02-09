import { useState, useEffect } from "react";
import { getSuperheroes, addSuperhero } from "./services/superhero";
import './App.css';

function App() {
  const [superheroes, setSuperheroes] = useState([]);
  const [form, setForm] = useState({ name: "", superpower: "", humilityScore: "" });

  // Cargar superhéroes al inicio
  useEffect(() => {
    fetchSuperheroes();
  }, []);

  const fetchSuperheroes = async () => {
    try {
      const data = await getSuperheroes();
      setSuperheroes(data);
    } catch (error) {
      console.error("Error fetching superheroes:", error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      await addSuperhero({ ...form, humilityScore: Number(form.humilityScore) });
      fetchSuperheroes();
      setForm({ name: "", superpower: "", humilityScore: "" });

    } catch (error) {
      console.error("Error adding hero:", error);
    }
  };

  return (
    <div className="App">
      <h1>Humble Superheroes</h1>

      <h2>Add a new hero</h2>
      <form onSubmit={handleSubmit} className="form">
        <label>
          Name:
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          Superpower:
          <input type="text" name="superpower" placeholder="Superpower" value={form.superpower} onChange={handleChange} required />
        </label>
        <label>
          Humility Score: <b>{form.humilityScore}</b>
          <input
            type="range"
            name="humilityScore"
            min="1"
            max="10"
            value={form.humilityScore}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Add hero</button>
      </form>

      <h2>Superheroes List</h2>
      <ul>
        {superheroes.map((hero) => (
          <li key={hero.id}>
            <b>{hero.name}</b> - {hero.superpower} (Humility: {hero.humilityScore})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
