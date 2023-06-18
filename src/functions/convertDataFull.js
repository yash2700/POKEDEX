import axios from "axios";

export default async function convertDataFull(name){
        const resultData={};
        var data=await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${name}`).then(i=>i.data);
        resultData.egg_group=data.egg_groups;
        resultData.color=data.color;
        const genderRate = data.gender_rate;
      let gender = {};

      if (genderRate === -1) {
        gender = {
          male: 0,
          female: 0,
          genderless: true
        };
      } else if (genderRate === 0) {
        gender = {
          male: 0,
          female: 100,
          genderless: false
        };
      } else if (genderRate === 8) {
        gender = {
          male: 100,
          female: 0,
          genderless: false
        };
      } else {
        const femaleRatio = 12.5 * genderRate;
        gender = {
          male: 100 - femaleRatio,
          female: femaleRatio,
          genderless: false
        };
      }
      resultData.gender=gender;

        resultData.desc=data.flavor_text_entries[6];
        var data=await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`).then(i=>i.data);
        resultData.height=data.height;
        resultData.weight=data.weight;
        resultData.abilities=data.abilities;
        resultData.name=name;
        resultData.id=data.id;
        resultData.moves=data.moves;
        resultData.img=data.sprites.other.dream_world.front_default;
        resultData.types=data.types;
        resultData.stats=data.stats;
        return resultData;
}