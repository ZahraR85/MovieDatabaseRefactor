import {renderFavoritesListView} from '../ui.js';
import {saveListToLocalStorage, getListFromLocalStorage, addToStorage, checkInStorage} from '../storage.js';
import {MovieList} from './MovieList.js';
import {Movie} from './Movie.js';

/**
 * a list for the favorite movies
 */
export class MovieFavoritesList extends MovieList {
    #localStorageName = '';

    constructor() {
        // initiate the super class (MovieList), so this has everything from there
        super();
    }

    // getters & setters
    set localStorageName(val) {
        this.#localStorageName = val;
    }

    get localStorageName() {
        return this.#localStorageName;
    }

    /**
     * adds a movie to the list (overwrites the corresponding MovieList method)
     * @param {Movie} movie the movie to add
     */
    addMovie(movie, save = true) {
        if (save) {
            if (!checkInStorage(movie, this.localStorageName)) {
                this.list.push(movie);
                addToStorage(movie, this.localStorageName);
            } else {
                alert('movie already added to favorites');
            }
        } else {
            this.list.push(movie);
        }
    }

    removeMovie(movie) {
        this.list = this.list.filter((item) => item.id !== movie.data.id);
        this.saveListToLocalStorage(this.list);
    }

    /**
     * saves an array of movie (objects) to the local storage
     * @param {Array} arr the array to save
     */
    saveListToLocalStorage(arr) {
        const arrToSave = arr.map((movie) => movie.data);
        saveListToLocalStorage(this.localStorageName, arrToSave);
    }

    /**
     * @returns an array of movie (objects) from the local storage
     */
    getListFromLocalStorage() {
        return getListFromLocalStorage(this.localStorageName);
    }

    /**
     * renders the output (overwrites the method of the MovieList)
     * @returns {Element} the element to be displayed
     */
    renderView() {
        return renderFavoritesListView(this);
    }
}
