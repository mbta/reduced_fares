const faker = require('faker');

const generateRandomYouthPassBirthdate = () => {
    const month = faker.datatype.number({
        'min': 1,
        'max': 12
    });
    const day = faker.datatype.number({
        'min': 1,
        'max': 28
    });
    const year = faker.datatype.number({
        'min': 1997,
        'max': 2003
    });
    
    return `${month}/${day}/${year}`
}

module.exports = { generateRandomYouthPassBirthdate }
