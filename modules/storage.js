// modules/storage.js

/**
 * saves an array of movie (objects) to the local storage
 * @param {String} localStorageName the name of the local storage
 * @param {Array} arr the array to save
 */
export const saveListToLocalStorage = (localStorageName, arr) => {
    localStorage.setItem(localStorageName, JSON.stringify(arr));
};

/**
 * gets data from local storage
 * @param {String} localStorageName the name of the local storage
 * @returns {Array} an array of movie (objects) from the local storage
 */
export const getListFromLocalStorage = (localStorageName = 'movieFavs') => {
    return JSON.parse(localStorage.getItem(localStorageName)) || [];
};

/**
 * adds a movie to the local storage
 * @param {String} localStorageName the name of the local storage
 * @param {Movie} movie the movie to add
 */
export const addToStorage = (movie, localStorageName = 'movieFavs') => {
    const list = JSON.parse(localStorage.getItem(localStorageName)) || [];
    list.push(movie.data);
    localStorage.setItem(localStorageName, JSON.stringify(list));
};

/**
 * removes a movie to the local storage
 * @param {String} localStorageName the name of the local storage
 * @param {Movie} movie the movie to remove
 */
export const removeFromStorage = (movie, localStorageName = 'movieFavs') => {
    const list = JSON.parse(localStorage.getItem(localStorageName)) || [];
    const newList = list.filter((item) => item.id !== movie.data.id);
    localStorage.setItem(localStorageName, JSON.stringify(newList));
};

/**
 * checks if movie is already in local storage
 * @param {String} localStorageName the name of the local storage
 * @param {Movie} movie the movie to search for
 * @returns {Boolean}
 */
export const checkInStorage = (movie, localStorageName = 'movieFavs') => {
    const list = JSON.parse(localStorage.getItem(localStorageName)) || [];
    return list.some((item) => item.id === movie.data.id);
};