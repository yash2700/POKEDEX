export default function convertHeight(decimeters) {
    // Convert decimeters to inches and centimeters
    const inches = Math.floor(decimeters*10 / 2.54);
    const feet = Math.floor(inches / 12);
    const remainingInches = inches % 12;
    const centimeters = Math.round(decimeters * 10);
  
    // Create the formatted string
    const formattedHeight = `${feet}'${remainingInches}'' (${centimeters}cm)`;
  
    return formattedHeight;
  }