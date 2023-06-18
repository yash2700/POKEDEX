import axios from "axios"

export default async function getIds(){
   const data = await axios.get("https://pokeapi.co/api/v2/pokemon/?limit=2000")
    .then((Response)=>Response.data.results);
    const ids=[];
    data.forEach((item)=>{
        ids.push(item.url.split("/")[6]);
    })
    return ids;

}