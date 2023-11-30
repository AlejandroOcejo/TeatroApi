const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const { initializeSeats } = require('./initSeats');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
/* const seatInit = require("./initSeats.js");
app.use("/initSeat", seatInit); */


const users = [];
const seatsData = initializeSeats();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/register', (req, res) => {
    fs.readFile('views/register.html', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading HTML file:', error);
            return;
        }
        res.send(data);
    });
});

app.get('/reserve', (req, res) => {
    fs.readFile('views/reserve.html', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading HTML file:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
});

app.get('/reservedSeats', (req, res) => {
    fs.readFile('data/reservedSeats.json', 'utf8', (error, data) => {
        res.setHeader('Content-Type', 'application/json');
        if (error) {
            console.log('Error reading HTML file:', error);
            return;
        }
        res.send(data);
    });
});

app.post('/updateReservedSeats', (req, res) => {
    const updatedData = req.body;

    fs.writeFile('data/reservedSeats.json', JSON.stringify(updatedData, null, 2), (error) => {
        if (error) {
            console.log('Error updating reservedSeats.json:', error);
            return;
        }
        console.log('Reserved seats data updated successfully!');
    });
});

let id = 0;

app.post('/saveUser', (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    const user = {
        id: id + 1,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    users.push(user);

    var json = JSON.stringify(users);
    fs.writeFile('data/users.json', json, (error) => {
        if (error) {
            console.error('Error writing to users.json:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('User saved successfully!');
        console.log('All Users:', users);
        res.send('User saved successfully!');
    });
});

app.use(function (req, res, next) {
    res.status(404).send('Sorry, can\'t find that!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

