const fs = require('fs');

function initializeSeats() {
    const seatsArray = [];
    const numberOfSeats = 48;

    for (let seatNumber = 1; seatNumber <= numberOfSeats; seatNumber++) {
        const seatObj = {
            seatNumber: seatNumber,
            isReserved: false,
            seatOwner: null
        };

        seatsArray.push(seatObj);
    }

    fs.writeFileSync('data/reservedSeats.json',
        JSON.stringify(seatsArray, null, 2));

    console.log('Seats data initialized and written to reservedSeats.json');
    return seatsArray;
}

module.exports = { initializeSeats };
