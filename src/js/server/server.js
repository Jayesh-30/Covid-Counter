const express = require('express');
const fs = require('fs');
const url = require('url');
const cors = require('cors');

const app = express();
app.use(cors());

const data = fs.readFileSync(`${__dirname}/data/countries.json`, 'utf-8');
app.get('/summary', (req, res) => {
    res.writeHead(200, {
        'Content-type': 'application/json',
    });
    res.end(data);
});

// Countries

app.get('/country/*', (req, res) => {
    const reqUrl = url.parse(req.url, true);
    const reqCountry = reqUrl.pathname.split('/').pop();

    const available = [
        'brazil',
        'canada',
        'china',
        'france',
        'germany',
        'india',
        'italy',
        'russia',
        'spain',
        'turkey',
        'united-kingdom',
        'united-states',
    ];
    if (available.indexOf(reqCountry) != -1) {
        fs.readFile(`${__dirname}/data/country/${reqCountry}.json`, 'utf-8', (err, countryData) => {
            res.writeHead(200, {
                'Content-type': 'application/json',
            });
            res.end(countryData);
        });
    } else res.end('Data Not Available');
});

app.listen(5000, () => {
    console.log('Listening on http://localhost:5000');
});
