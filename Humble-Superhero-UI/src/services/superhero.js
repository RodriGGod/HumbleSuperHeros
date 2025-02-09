import axios from "axios";

const url = "http://localhost:3000/superheroes";

//get heroes
export const getSuperheroes = async () => {
  const response = await axios.get(url);
  return response.data;
};

//add hero
export const addSuperhero = async (superhero) => {
  const response = await axios.post(url, superhero);
  return response.data;
};
