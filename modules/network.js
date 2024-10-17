// modules/network.js

import {initialData} from './initialData.js';

/**
 * the initial fetch from TMDB (retrieves the first page of results based on the initial path)
 */
export const fetchMovies = async (caller, mode, searchQuery = '', id = 0) => {
    try {

        let query = '';
        if (mode === 'initial') query = initialData.initialCall + '&api_key=' + initialData.apiKey;
        else if (mode === 'id') query = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=153a09fbeef547fb0435feeeb75d0140&append_to_response=credits`;
        else if (mode === 'search') query = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1&api_key=${initialData.apiKey}`;

        const response = await fetch(query);
        const data = await response.json();

        if (mode === 'initial') {
            caller.populateMovieList(data.results);
            return data.results;
        } else if (mode === 'id') {
            caller.populateMovieDetails(data);
            return data;
        } else if (mode === 'search') {
            await caller.showSearchResults(data.results, query);
        }

    } catch (error) {
        console.error(error);
    }
};