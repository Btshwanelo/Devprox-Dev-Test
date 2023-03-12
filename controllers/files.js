const fs = require('fs');
const { names, surnames } = require('../constants/data');


const createFile = async (req, res) => {
  const {numOfVariation = 100} = req.body
  
  const writeStream = fs.createWriteStream('output/output.csv');
  writeStream.write(`"Id", "Name", "Surname", "Initials", "Age", "DateOfBirth" \n`);
  
    function getAge(dateString) {
      const today = new Date();
      const parts = dateString.split('/');
      const year = parseInt(parts[2], 10);

      let age = today.getFullYear() - year;
      return age;
    }

    function getRandomDateOfBirth() {
      const now = new Date();
      const minAge = 18;
      const maxAge = 50;
      const year = now.getFullYear() - Math.floor(Math.random() * (maxAge - minAge + 1)) - minAge;
      const month = Math.floor(Math.random() * 12) + 1;
      const daysInMonth = new Date(year, month, 0).getDate(); // get number of days in month
      const day = Math.floor(Math.random() * daysInMonth) + 1;
      const dateString = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
      return dateString;
    }

    function getRandomFromArray(array) {
      const randomIndex = Math.floor(Math.random() * array.length);
      return array[randomIndex];
    }


    for( let i = 1; i <numOfVariation+1; i++){

      const dateOfBirth = getRandomDateOfBirth();
      const name = getRandomFromArray(names);
      const surname = getRandomFromArray(surnames);
      const initials = name[0];
      const age = getAge(dateOfBirth);

      const overWatermark = writeStream.write(`${i},${name},${surname}, ${initials}, ${age},${dateOfBirth} \n`);

      if(!overWatermark){
        await new Promise((resolve) => 
        writeStream.once('drain', resolve)
        );
      }
    }
    
    writeStream.end()

  res.status(200).json({ msg: 'success' });
};

module.exports = {
  createFile,
}