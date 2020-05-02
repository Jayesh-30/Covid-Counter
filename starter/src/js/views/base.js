export const elements = {
    countriesList: document.querySelector('.countries__list'),
    pageOf: document.querySelector('.page__of'),
    countriesBtn: document.querySelector('.countries__button'),
    searchForm: document.querySelector('.search__form'),
    searchInput: document.querySelector('.search__form-field'),
    country: document.querySelector('.country'),
};
export const sortingDescending = (A, B) => B.TotalConfirmed - A.TotalConfirmed;

export const clearLoader = () => {
    const ele = document.querySelector('.loader');
    if (ele) ele.parentElement.removeChild(ele);
};

export const renderLoader = (parent) => {
    const markup = `
        <div class="loader">
            <ion-icon name="reload-circle" class="loader__icon"></ion-icon>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', markup);
};

export const formatNumber = (num) => {
    num = num.toLocaleString();
    return num;
};

export const formatDate = (dateString) => {
    const newDate = dateString.replace('T00:00:00Z','');
    const [year, month, day] = newDate.split('-');
    return {day,month,year};
};

export const getDate = (dateObj) => {
    return `${dateObj.day}/${dateObj.month}/${dateObj.year}`;
}

export const capitalize = (str) => `${str.charAt(0).toUpperCase()}${str.slice(1, str.length)}`;
