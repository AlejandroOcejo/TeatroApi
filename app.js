const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
const { initializeSeats } = require('./initSeats');
let route = '/obrasJson'
initializeSeats(route);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
const users = [];

function getObraContent(nameForUrl, callback) {
    fs.readFile('data/obras.json', 'utf8', (error, data) => {
        if (error) {
            console.log('Error reading JSON file:', error);
            callback(error, null);
            return;
        }

        const obras = JSON.parse(data);
        const obra = obras.find(obra => obra.nameForUrl === nameForUrl);

        if (!obra) {
            console.log('Obra not found');
            callback({ message: 'Obra not found' }, null);
        } else {
            callback(null, obra);
        }
    });
}

app.get('/obra/:nameForUrl', (req, res) => {
    const obraName = req.params.nameForUrl;

    getObraContent(obraName, (error, obraContent) => {
        if (error) {
            res.status(500).send('Internal Server Error');
        } else {
            res.render('obras.ejs', { obraContent });
        }
    });
});


app.get('/', (req, res) => {
    fs.readFile('views/index.html', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading HTML file:', error);
            return;
        }
        res.send(data);
    });
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
app.get('/login', (req, res) => {
    fs.readFile('views/login.html', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading HTML file:', error);
            return;
        }
        res.send(data);
    });
});


app.get('/obrasJson', (req, res) => {
    fs.readFile('data/obras.json', 'utf8', (error, data) => {
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
app.get('/catalogue', (req, res) => {
    fs.readFile('views/catalogo.html', 'utf8', (error, data) => {
        if (error) {
            console.error('Error reading HTML file:', error);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.send(data);
    });
});


app.get('/reservedSeats', (req, res) => {

    const obra = req.query.obra;
    const filePath = `data/${obra}reservedSeats.json`;

    fs.readFile(filePath, 'utf8', (error, data) => {
        res.setHeader('Content-Type', 'application/json');
        if (error) {
            console.log('Error reading HTML file:', error);
            return;
        }
        res.send(data);
    });
});



app.post('/updateReservedSeats', (req, res) => {
    const obra = req.body.obra;
    const updatedData = req.body.data;

    fs.writeFile(`data/${obra}reservedSeats.json`, JSON.stringify(updatedData, null, 2), (error) => {
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
function getUsersFromFile() {
    try {
        const data = fs.readFileSync('data/users.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.log('Error reading users.json file:', error);
        return [];
    }
}

function validateUser(email, password) {
    const users = getUsersFromFile();
    console.log('All users:', users);
    const foundUser = users.find(user => user.email === email && user.password === password);
    console.log('Found user:', foundUser);
    return foundUser;
}

app.get('/loadUser', (req, res) => {
    let { email, password } = req.query;


    console.log('Received email:', email);
    console.log('Received password:', password);

    email = decodeURIComponent(email);
    password = decodeURIComponent(password);
    const foundUser = validateUser(email, password);

    if (foundUser) {
        res.redirect(`/`);
    } else {
        res.redirect('/login')

    }
});
app.use(function (req, res, next) {
    res.status(404).send('Sorry, cant find that!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

