import { elements, formatNumber } from './base';

export const toggleLikeBtn = (isLiked) => {
    const iconString = isLiked ? 'heart' : 'heart-outline';
    document.querySelector('.like__icon').setAttribute('name', iconString);
};

export const toggleLikeMenu = (numLikes) => {
    elements.likesMenu.style.visibility = numLikes > 0 ? 'visible' : 'hidden';
};

export const renderLike = (like) => {
    const markup = `
    <li>
        <a href="#${like.slug}" class="likes__link">
            <div class="likes__data">
                <h4 class="likes__name">${like.Country}</h4>
                <p class="likes__cases">Total Cases : ${formatNumber(like.TotalConfirmed)}</p>
            </div>
        </a>
    </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
};

export const deleteLike = (slug) => {
    const el = document.querySelector(`.likes__link[href*="${slug}"]`).parentElement;
    if (el) el.parentElement.removeChild(el);
};
