const fs = require('fs');

function initializeSeats() {
    const numberOfSeats = 10;

    const names = getObraNames();
    names.forEach(element => {
        const seatsArray = [];
        for (let seatNumber = 1; seatNumber <= numberOfSeats; seatNumber++) {
            const seatObj = {
                seatNumber: seatNumber,
                isReserved: false,
                seatOwner: null
            };
            seatsArray.push(seatObj);
        }

        fs.writeFileSync(`data/${element}reservedSeats.json`, JSON.stringify(seatsArray, null, 2));
    });
}

function getObraNames() {
    const data = fs.readFileSync('data/obras.json');
    const jsonData = JSON.parse(data);
    const names = jsonData.map(obra => obra.nameForUrl);
    return names;
}

module.exports = { initializeSeats };
