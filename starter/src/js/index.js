// Controller
import { elements, sortingDescending, renderLoader, clearLoader,currentDate } from './views/base';

import Init from './models/Init';
import Search from './models/Search';
import * as initView from './views/initView';
import * as searchView from './views/searchView';

// Global Data
const state = {};
// Testing
window.state = state;

// init Controller
const controlInit = async () => {
    // Creating new init object
    state.init = new Init();

    // Prepare Loader
    renderLoader(elements.countriesList);

    try {
        // Getting result from API
        await state.init.getSummary();

        // Sorting result on bases of total cases
        state.init.countries.sort(sortingDescending);

        // console.log(state.init.countries);

        // Prepare UI for result
        clearLoader();
        initView.clearResults();

        // Render result on UI
        initView.renderResults(state.init.countries);
    } catch (error) {
        console.log(error);
    }
};

// Search Controller
const controlSearch = async () => {
    const slug = window.location.hash.replace('#', '');
    if (slug) {
        // Creating an new Search if it is not present
        if (!state.search) state.search = new Search();

        // Prepare Loader
        searchView.clearResults();
        renderLoader(elements.country);

        try {
            // Getting result from API
            await state.search.getResult(slug);

            console.log(state.search.country);

            // Render to UI
            searchView.renderCountry(state.search.country, state.search.slug,state.search.dates, state.search.provinces);

            // Highlight Selected
            initView.highlightSelected(slug);

            // Prepare UI for result
            clearLoader();

             // Control event of Province   

        } catch (error) {
            console.log(error);
        }
    }
};

// Control Page Button
const controlPageButton = (event) => {
    const btn = event.target.closest('.button__page');
    if (btn) {
        const newPage = +btn.dataset.goto;
        // Prepare UI for the Result
        initView.clearResults();

        // Render result on Ui
        initView.renderResults(state.init.countries, newPage);
    }
};

// Control Query
const controlQuery = () => {
    // Getting input
    const countryName = searchView.getInput();

    if (countryName) {
        const countrySlug = searchView.getSlug(state.init.countries, countryName);

        if (countrySlug) {
            // Prepare UI
            searchView.clearInput();

            // Setting location hash and it will call controlSearch automatically
            window.location.hash = `#${countrySlug}`;
        } else {
            alert('Query is invalid');
        }
    }
};

// Control Country
const controlCountry = (event) => {
    // Date Change button
    if (event.target.matches('.button__date,.button__date *')) {
        const date = event.target.closest('.button__date').dataset.date;
        console.log('Date Changed');
        searchView.renderCountry(state.search.country, state.search.slug,state.search.dates, state.search.provinces,date);
    }
    // Like Button 
};

// Adding all the events
const eventHandler = () => {
    // Control Search Form
    elements.searchForm.addEventListener('submit', controlQuery);

    // Control event of hashchange and load
    ['hashchange', 'load'].forEach((event) => {
        window.addEventListener(event, controlSearch);
    });

    // Control event of Pagination
    elements.countriesBtn.addEventListener('click', controlPageButton);

    // Control event of Country
    elements.country.addEventListener('click', controlCountry);
};

// Initialization of app
const init = () => {
    console.log('Application has been started');
    controlInit();
    eventHandler();
};
init();
