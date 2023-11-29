const express = require('express');
const router = express.Router();
const fs = require('fs');

router.post('/initSeats', (req, res) => {
    const seatsArray = [];

    const numberOfSeats = 25;

    for (let seatNumber = 1; seatNumber <= numberOfSeats; seatNumber++) {
        const seatObj = {
            seatNumber: seatNumber,
            isReserved: false,
            seatOwner: null
        };

        seatsArray.push(seatObj);
    }

    fs.writeFile('data/reservedSeats.json', JSON.stringify(seatsArray, null, 2), (error) => {
        if (error) {
            console.error('Error initializing seats:', error);
            res.status(500).send('Internal Server Error');
            return;
        }

        console.log('Seats data initialized and written to reservedSeats.json');
        res.send('Seats data initialized successfully!');
    });
});

module.exports = router;