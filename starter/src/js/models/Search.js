import axios from 'axios';

import { formatDate, getDate } from '../views/base';

export default class Search {
    constructor() {
        this.query = `https://api.covid19api.com/live/country/`;
    }
    async getResult(slug) {
        try {
            const result = await axios(`${this.query}${slug}`);
            this.country = result.data;

            // Format Date
            this.parseDate();
            // Format Province
            if (this.parseProvince()) this.parseCountry();

            this.slug = slug;
        } catch (error) {
            console.log(error);
        }
    }

    parseCountry() {
        
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
        console.log(dates);
    }
}
