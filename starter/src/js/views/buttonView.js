import { elements } from './base';

// type - prev or next
const createPageButton = (page, type) => `
        <button class="button__page button__page--${type}" data-goto = "${type === 'prev' ? page - 1 : ''}${
    type === 'next' ? page + 1 : ''
}">
            <ion-icon name="caret-${type === 'prev' ? 'back' : ''}${
    type === 'next' ? 'forward' : ''
}" class="page__icon"></ion-icon>
        </button>`;

const createpageOf = (page, totalPage) => `<p class = "page__of">Page ${page} of ${totalPage}</p>`;

export const renderPageButtons = (total, page, resPerPage) => {
    const totalPage = Math.ceil(total / resPerPage);

    let markup;
    // Creating and Rendering buttons
    if (total > 1) {
        // We need page button

        // Only next buttons
        if (page === 1) markup = createPageButton(page, 'next');
        // Only prev buttons
        else if (page === totalPage) markup = createPageButton(page, 'prev');
        // Nedd both buttons
        else markup = `${createPageButton(page, 'prev')} ${createPageButton(page, 'next')}`;
    }

    markup += createpageOf(page, totalPage);

    if (markup) elements.countriesBtn.insertAdjacentHTML('afterbegin', markup);
};

export const createDatePrevButton = (dates,date) =>
    `<button class="button__date button__date--prev" data-date  = ${dates[dates.indexOf(date)-1]}>
            <span>Yesterday</span>
            <ion-icon name="chevron-back-circle-outline" class="date__icon"></ion-icon>
        </button>`;

export const createDateNextButton = (dates,date) =>
    `<button class="button__date button__date--next" data-date  = ${dates[dates.indexOf(date)+1]}>
        <span>Tomorrow</span>
        <ion-icon name="chevron-forward-circle-outline" class="date__icon"></ion-icon>
    </button>`;

export const renderDateButtons = (country, dates, date) => {
    let markup = '';
    if (dates.length > 0) {
        // Only next buttons
        if (date === dates[0]) {
            markup = createDateNextButton(dates,date);
        }
        else
        // Only prev buttons
        if(date === dates[dates.length-1])
        {
            markup = createDatePrevButton(dates,date);
        }
        else
        {
            markup = `${createDatePrevButton(dates,date)}${createDateNextButton(dates,date)}`;
        }
    }
    return markup;
};
