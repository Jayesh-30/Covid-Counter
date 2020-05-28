import { elements } from '../views/base';
import autoComplete from '../vendor/autoComplete';

export default autocomplete => {
    // Auto complete of input
    new autoComplete({
        data: {
            src: autocomplete, // Array of Objects,String
            key: [''], // Keys of Object
            cache: true, // Static Data
        },
        sort: (a, b) => {
            // Sort rendered results ascendingly
            if (a.match < b.match) return -1;
            if (a.match > b.match) return 1;
            return 0;
        },
        placeHolder: "Type Country's Name", // Place Holder text
        selector: () => elements.searchInput, // Input field selector
        threshold: 1, // Min. Chars length to start Engine
        debounce: 100, // Post duration for engine to start
        searchEngine: 'strict', // Search Engine type/mode
        resultsList: {
            // Rendered results list object
            render: true,
            container: source => {
                source.setAttribute('class', 'search__list');
            },
            destination: elements.searchInput,
            position: 'afterend',
            element: 'ul',
        },
        maxResults: 5, // Max. number of rendered results
        highlight: true, // Highlight matching results
        resultItem: {
            // Rendered result item
            content: (data, source) => {
                source.innerHTML = data.match;
            },
            element: 'li',
        },
        noResults: () => {
            // Action script on noResults
            const result = document.createElement('li');
            result.setAttribute('class', 'no_result');
            result.setAttribute('tabindex', '1');
            result.innerHTML = 'No Results';
            document.querySelector('.search__list').appendChild(result);
        },
        onSelection: data => {
            elements.searchInput.value = data.selection.value;
            // elements.searchForm.submit();
        },
    });
};
