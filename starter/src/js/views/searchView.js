import { elements, formatNumber, currentDate } from './base';
import * as buttonView from './buttonView';

export const getInput = () => elements.searchInput.value.toLowerCase();

export const clearInput = () => (elements.searchInput.value = '');

export const clearResults = () => (elements.country.innerHTML = '');

export const renderCountry = (country, slug, dates, date = dates[dates.length - 1]) => {
    clearResults();

    let current, index;
    // Date will be always given

    index = country.findIndex((cur) => cur.Date == date);

    // At this moment index is available to us
    current = country[index];

    console.log(current);

    const markup = `
                <figure class="country__fig">
                    <img src="img/compass.jpg" alt="Compass" class="country__img">

                    <div class="country__heading">
                        <h3 class="country__name">${current.Country}</h3>
                    </div>
                    <button class="country__like">
                        <ion-icon name="heart-outline" class="like__icon"></ion-icon>
                    </button>
                </figure>
                
                <div class="country__summary">
                    <ul class="country__summary--list">

                        <li class="country__summary--item">
                            <ion-icon name="map-sharp" class="list__icon list__icon--code"></ion-icon>
                            <p>Country Code : ${current.CountryCode}</p>
                        </li>
                        <li class="country__summary--item">
                            <ion-icon name="document-text-sharp" class="list__icon list__icon--slug"></ion-icon>
                            <p>Slug : ${slug}</p>
                        </li>
                        <li class="country__summary--item">
                            <ion-icon name="briefcase-sharp" class="list__icon list__icon--total"></ion-icon>
                            <p>Confirmed Cases : ${formatNumber(current.Confirmed)}</p>
                        </li>
                        <li class="country__summary--item">
                            <ion-icon name="heart-dislike-sharp" class=" list__icon list__icon--death"></ion-icon>
                            <p>Deaths : ${formatNumber(current.Deaths)}</p>
                        </li>
                        <li class="country__summary--item">
                            <ion-icon name="bandage-sharp" class="list__icon list__icon--recover"></ion-icon>
                            <p>Recovered : ${formatNumber(current.Recovered)}</p>
                        </li>
                        <li class="country__summary--item">
                            <ion-icon name="pulse-sharp" class="list__icon list__icon--active"></ion-icon>
                            <p>Active : ${formatNumber(current.Active)}</p>
                        </li>
                    </ul>
                </div>

                <div class="country__date">
                    <ion-icon name="stopwatch-sharp" class=" list__icon list__icon--date"></ion-icon>
                    <p>Date : ${current.Date}</p>

                    <div class="buttons__date">
                            ${buttonView.renderDateButtons(country, dates, date)}
                    </div>
                </div>

                <div class="country__graph">
                <ion-icon name="stats-chart-sharp" class="list__icon list__icon--graph"></ion-icon>
                <p>View Graph</p>

                <div class="buttons__graph">
                    <button class="button__graph">
                        <ion-icon name="pie-chart-sharp" class="graph__icon"></ion-icon>
                        <span>Show Graph</span>
                        <ion-icon name="pie-chart-sharp" class="graph__icon"></ion-icon>
                    </button>
                </div>
            </div>
    `;

    elements.country.insertAdjacentHTML('afterbegin', markup);
};

export const getSlug = (countries, countryName) => {
    const ele = countries.find((country) => country.Country === countryName);
    if (ele) return ele.Slug;
};
