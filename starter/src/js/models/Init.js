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

            // Parse countries
            this.parseCountries();

            this.global = result.data.Global;
        } catch (error) {
            console.log(error);
        }
    }

    parseCountries(){           
        // Lowercase of Country and storing it to autocomplete
        this.countries.forEach(cur => cur.Country = cur.Country.toLowerCase());

        // Filliing it
        const autocomplete = [];
        this.countries.forEach(cur => autocomplete.push(cur.Country));
        this.autocomplete = autocomplete;
    }
}
