// Controller
import { elements, sortingDescending, renderLoader, clearLoader } from './views/base';

import Init from './models/Init';
import Search from './models/Search';
import Autocomplete from './models/Autocomplete';
import Likes from './models/Likes';
import * as initView from './views/initView';
import * as searchView from './views/searchView';
import * as graphView from './views/graphView';
import * as likesView from './views/likesView';

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

        // Autocomplete
        Autocomplete(state.init.autocomplete);

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
    console.log(slug);
    if (slug) {
        // Creating an new Search if it is not present
        if (!state.search) state.search = new Search();

        // Prepare Loader
        searchView.clearResults();
        graphView.changeLight();
        renderLoader(elements.country);

        try {
            // Getting result from API
            await state.search.getResult(slug);

            if (state.search.country) {
                // Render to UI
                searchView.renderCountry(
                    state.search.country,
                    state.search.slug,
                    state.likes.isLiked(state.search.slug),
                    state.search.dates
                );
                // Highlight Selected
                initView.highlightSelected(slug);

                // Prepare UI for result
                clearLoader();

                // Control event of Province
            }
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
const controlQuery = (event) => {
    // Getting input
    event.preventDefault();
    const countryName = searchView.getInput();

    // Prepare Ui for changes
    searchView.clearList();
    
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

// Control Date
const controlDate = (event) => {
    const date = event.target.closest('.button__date').dataset.date;
    searchView.renderCountry(
        state.search.country,
        state.search.slug,
        state.likes.isLiked(state.search.slug),
        state.search.dates,
        date
    );
};

// Control Graph
const controlGraph = (event) => {
    // Prepare UI for changes
    searchView.clearResults();
    graphView.changeDark();

    // Render Results
    graphView.renderResults(state.search.country, state.search.dates);
};

// Control Like
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentSlug = state.search.slug;

    // User has not yet liked current country
    if (!state.likes.isLiked(currentSlug)) {
        // Add like to state
        const newLike = state.likes.addLike(state.init.countries, state.search.slug);
        // Toggle like button
        likesView.toggleLikeBtn(true);
        // Add like to UI List
        likesView.renderLike(newLike);
        // User has liked current country
    } else {
        // Remove like to state
        state.likes.deleteLike(state.search.slug);
        // Toggle like button
        likesView.toggleLikeBtn(false);
        // Remove like to UI List
        likesView.deleteLike(state.search.slug);
    }
    console.log(state.likes);
    likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// Control Country
const controlCountry = (event) => {
    // Date Change button
    if (event.target.matches('.button__date,.button__date *')) controlDate(event);

    // Like Button
    if (event.target.matches('.country__like,.country__like *')) controlLike();

    // Graph Button
    if (event.target.matches('.button__graph,.button__graph *')) controlGraph(event);

    // Go Back
    if (event.target.matches('.button__go-back,.button__go-back *')) {
        graphView.changeLight();
        searchView.renderCountry(
            state.search.country,
            state.search.slug,
            state.likes.isLiked(state.search.slug),
            state.search.dates
        );
    }
};

// Persistance of likes
window.addEventListener('load', () => {
    state.likes = new Likes();
    // Restore likes
    state.likes.readStorage();
    // Toggle button
    likesView.toggleLikeMenu(state.likes.getNumLikes());

    // Render all like in UI
    state.likes.likes.forEach( like => likesView.renderLike(like));
});

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

// Testing
// window.state = state;
