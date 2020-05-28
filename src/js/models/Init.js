import axios from 'axios';

export default class Init {
    constructor() {
        // Production
        this.query =
            window.location.hostname === 'localhost'
                ? 'http://localhost:5000/summary'
                : 'https://api.covid19api.com/summary'; 
    }

    async getSummary() {
        try {
            const result = await axios(this.query);

            // Result
            this.countries = result.data.Countries;

            // Parse countries
            this.parseCountries();

            // console.log(this.countries);

            this.global = result.data.Global;
        } catch (error) {
            console.log(error);
        }
    }

    parseCountries() {
        // Lowercase of Country and storing it to autocomplete
        this.countries.forEach((cur) => (cur.Country = cur.Country.toLowerCase()));

        // Filliing it
        const autocomplete = [];
        this.countries.forEach((cur) => autocomplete.push(cur.Country));
        this.autocomplete = autocomplete;
    }
}
