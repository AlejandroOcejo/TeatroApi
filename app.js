const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

const users = [];

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/register', (req, res) => {
    fs.readFile('register.html', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading HTML file:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
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
    fs.writeFile('users.json', json, (error) => {
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
