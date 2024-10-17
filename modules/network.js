// modules/network.js

import { initialData } from "./initialData";

/**
 * the initial fetch from TMDB (retrieves the first page of results based on the initial path)
 */
export const fetchInitial = (caller) => {
  const url = caller.initialCall + "&api_key=" + caller.apiKey;

  console.log("initialData=", initialData);

  console.info(`starting to load initial data from ${url}`);

  const results = fetch(url)
    // when wee get a response from TMDB pass the results on (make a JSON object out of it before)
    .then((response) => response.json())
    // and then use the response data to to what we need
    .then((response) => {
      console.info("finished loading initial data");

      // populate the  MovieList (the actual array of movies is stored in 'results')
      caller.populateMovieList(response.results);

      return response.results;
    })
    // and show errors if encounteered
    .catch((err) => console.error(err));
};

export const fetchMovieDetails = (caller, id) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=153a09fbeef547fb0435feeeb75d0140&append_to_response=credits`;
  const results = fetch(url)
    .then((response) => response.json())
    .then((response) => {
      //console.info('finished loading getMovieDetails')
      console.log("network.js: fetchMovieDetails -> ", response);

      caller.populateMovieDetails(response);
      return response;
    })
    // and show errors if encounteered
    .catch((err) => console.error(err));
  //return data;
};

// TODO: make a url-builder for fetch
export const buildUrl = (scope, data) => {
  let retUrl = initialData.tmdbUrl;
  // add the language & the adult tag
  retUrl += `language=${initialData.language}&include_adult=${initialData.include_adult}`;

  // decide what to to
  switch (scope) {
    case "single":
      // add the movie ID
      retUrl += data.id;
      // add some available options we need
      retUrl += "&append_to_response=credits";
      break;
    case "search":
      const searchTerm = encodeURI(data.searchTerm);
      //const url = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&include_adult=false&language=en-US&page=1&api_key=${this.apiKey}`;
      break;
    default:
      // initialCall : 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', // the url params to call first
      retUrl = initialData.initialCall;
  }
  // add the api key
  return (retUrl += `&api_key=${initialData.apiKey}`);
};

export const fetchDataByUrl = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response;
    })
    .catch((e) => console.error(e));
};
