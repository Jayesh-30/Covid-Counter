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
            this.parseProvince();
            

            this.slug = slug;
        } catch (error) {
            console.log(error);
        }
    }
    
    parseProvince() {
        const provinces = [];

        let province;
        this.country.forEach((cur) => {
            province = cur.Province;
            // province must not be empty and it must not be present in provinces before
            if(province !== '' && provinces.indexOf(province) === -1)
            provinces.push(province);
        });
        
        this.provinces = provinces;
    }
    
    parseDate() {
        this.country.forEach((cur) => (cur.Date = getDate(formatDate(cur.Date))));


        const dates = [];
        let date;

        this.country.forEach((cur) => {
            date = cur.Date;
            if(dates.indexOf(date) === -1)
                dates.push(date);
        });

        this.dates = dates;
    }
}
