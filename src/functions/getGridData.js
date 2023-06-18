import axios from "axios";
import convertData from "./convertData";

export default async function getGridData(offset) {
  const data = await axios
    .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=10`)
    .then((response) => response.data.results);

  const resultData = [];

  for (const item of data) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${item.name}/`);
    const resp = response.data;
    const response1=await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${item.name}`).then(j=>j.data);
    const result=convertData(resp);
    result.egg_groups=response1.egg_groups;
    result.habitat=response1.habitat;
    resultData.push(result)
  }

  return resultData;
}
