export default  function convertWeight(kilograms) {
    // Convert kilograms to pounds
    const pounds = (kilograms * 2.20462).toFixed(1);
  
    // Create the formatted string
    const formattedWeight = `${pounds}lbs (${kilograms.toFixed(1)}kg)`;
  
    return formattedWeight;
  }