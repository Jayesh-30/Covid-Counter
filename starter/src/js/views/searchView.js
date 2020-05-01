import { elements, formatNumber, currentDate } from './base';
import * as buttonView from './buttonView';

export const getInput = () => elements.searchInput.value.toLowerCase();

export const clearInput = () => (elements.searchInput.value = '');

export const clearResults = () => (elements.country.innerHTML = '');

const addProvinces = (provinces,province) => {
    let select = document.querySelector('.province__select');
    let option;

    // Select will not add more if there is already present
    provinces.forEach((cur) => {
        option = document.createElement('option');

        option.value = cur;
        option.text = cur;
        select.add(option);
    });

    select.value = province; 
};

export const renderCountry = (country, slug, dates, provinces, date = currentDate(), province = '') => {
    clearResults();

    let current, index;
    // Date and Province will be given always

    // If province is not given then global
    if (province == '') {
        // Finding Global
        index = country.findIndex((cur) => cur.Date == date && cur.Province == province);
        province = 'Global';
        // Global Data is unavailable
        if (index == -1) {
            let newProvince;
            let max = -1;
            country.forEach((cur) => {
                if (cur.Date == date && cur.Confirmed > max) {
                    newProvince = cur.Province;
                    max = cur.Confirmed;
                }
            });
            province = newProvince;
            index = country.findIndex((cur) => cur.Date == date && cur.Province == province);
        }
        else {
            provinces.unshift('Global');
        }
    }
    // If province is given
    else {
        index = country.findIndex((cur) => cur.Date == date && cur.Province == province);
    }

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

                <div class="country__province ${provinces.length > 0 ? '' : 'non-province'}">
                    <ion-icon name="pricetag-sharp" class="list__icon list__icon--pro"></ion-icon>
                    <p>Province : ${current.Province}</p>

                    <select class="province__select">
                        
                     </select>
                </div>
    `;

    elements.country.insertAdjacentHTML('afterbegin', markup);

    // Adding Provinces
    if (provinces.length > 0) addProvinces(provinces,province);
};

export const getSlug = (countries, countryName) => {
    const ele = countries.find((country) => country.Country === countryName);
    if (ele) return ele.Slug;
};
