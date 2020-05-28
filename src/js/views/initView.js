import { elements, formatNumber } from './base';
import * as buttonView from './buttonView';

export const clearResults = () => {
    elements.countriesList.innerHTML = '';
    elements.countriesBtn.innerHTML = '';
};

export const highlightSelected = (id) => {
    // Remove class from all elements
    const resultArr = Array.from(document.querySelectorAll('.countries__link'));
    resultArr.forEach((cur) => {
        cur.classList.remove('countries__link--active');
    });

    const resultLink = document.querySelector(`.countries__link[href*="${id}"]`);
    if(resultLink)
        resultLink.classList.add('countries__link--active');
};

const createResult = (country) =>
    `<li>
    <a class="countries__link" href="#${country.Slug}">
        <div class="countries__data">
            <h4 class="countries__name">${country.Country}</h4>
            <p class="countries__cases">Total Cases : ${formatNumber(country.TotalConfirmed)}</p>
        </div>
    </a>
    </li>`;

export const renderResults = (countries, page = 1, resPerPage = 10) => {
    // countries
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    const totalLength = countries.length;
    // Creating star and end points
    countries = countries.slice(start, end);

    // Creating markup for list
    const markup = countries.map((country) => createResult(country)).join(' ');
    // Rendering markup on UI
    elements.countriesList.insertAdjacentHTML('beforeend', markup);

    // Creating and Rendering Pagination button
    buttonView.renderPageButtons(totalLength, page, resPerPage);
};
