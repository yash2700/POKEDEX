export default function convertData(obj){
    const {name,types,sprites,abilities}=obj;
    const data={
        name,
        types,
        sprites,
        abilities
    }
    return data;

}