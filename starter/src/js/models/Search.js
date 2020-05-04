import axios from 'axios';

import { formatDate, getDate } from '../views/base';

export default class Search {
    constructor() {
        // Production
        // this.query = `https://api.covid19api.com/live/country/`;
        // Testing
        this.query = `http://localhost:5000/country/`;
    }
    async getResult(slug) {
        try {
            const { data } = await axios(`${this.query}${slug}`);

            if (data != 'Data Not Available') {
                this.country = data;

                // Format Date
                this.parseDate();
                // Format Province
                this.parseProvince();       
                console.log('Original');
                console.log(this.country);
                // Format Country
                this.parseCountry();
                console.log('Prased');
                console.log(this.country);

                this.slug = slug;
            }
        } catch (error) {
            console.log(error);
        }
    }

    parseCountry() {
        if (!this.provinces) {
            const newCountry = [];
            this.country.forEach((cur) => {
                const { Country, CountryCode, Active, Confirmed, Recovered, Deaths, Date, Lat, Lon } = cur;
                newCountry.push({
                    Country,
                    CountryCode,
                    Active,
                    Confirmed,
                    Recovered,
                    Deaths,
                    Date,
                    Lat,
                    Lon,
                });
            });

            this.country = newCountry;
        } else {
            const newCountry = [];

            const { Country, CountryCode } = this.country[this.country.length - 1];

            this.dates.forEach((date) => {
                let Active = 0;
                let Confirmed = 0;
                let Recovered = 0;
                let Deaths = 0;

                this.country.forEach((cur) => {
                    if (cur.Date === date && cur.Province !== '' && cur.Province !== 'Global') {
                        Active += cur.Active;
                        Confirmed += cur.Confirmed;
                        Recovered += cur.Recovered;
                        Deaths += cur.Deaths;
                    }
                });

                newCountry.push({
                    Country,
                    CountryCode,
                    Active,
                    Confirmed,
                    Recovered,
                    Deaths,
                    Date: date,
                });
            });

            this.country = newCountry;
        }
    }

    parseProvince() {
        let provinces = false;

        this.country.forEach((cur) => {
            const province = cur.Province;
            // Provinces are present
            if (province !== '') provinces = true;
        });

        this.provinces = provinces;
        return this.provinces;
    }

    parseDate() {
        // Formatting Date to dd/mm/yyyy
        this.country.forEach((cur) => (cur.Date = getDate(formatDate(cur.Date))));

        const dates = [];
        let date;

        // Removing duplicate value and parsing only unique value
        this.country.forEach((cur) => {
            date = cur.Date;
            if (dates.indexOf(date) === -1) dates.push(date);
        });

        this.dates = dates;
    }
}
