import axios from 'axios';

export default class Init {
    constructor() {
        this.query = 'https://api.covid19api.com/summary';
    }

    async getSummary() {
        try {
            const result = await axios(this.query);

            // Result
            this.countries = result.data.Countries;

            // Lowercase of Country
            this.countries.forEach(cur => cur.Country = cur.Country.toLowerCase());

            this.global = result.data.Global;
        } catch (error) {
            console.log(error);
        }
    }
}
