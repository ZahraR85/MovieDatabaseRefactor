import {renderDetailsView, renderMovieAdditionalDetails} from '../ui.js';
import {fetchMovies} from '../network.js';

/**
 * a class for the movies
 */
export class Movie {
    // private vars
    // #id = 0;    // the id of the movie ! we'll take it from the data object
    #data = {};  // for storing the fetched data object
    #details = {}; // for storing the fetched detail object
    #mainInstance = {}; // the main instance for event handlers

    //constructor method
    constructor(movieObject) {
        // build a new Movie based on the dataObject
        this.data = movieObject || {};
        this.data.commentsList = this.data.commentsList || [];
    }

    // getters & setters
    set mainInstance(val) {
        this.#mainInstance = val;
    }

    get mainInstance() {
        return this.#mainInstance;
    }

    set id(val) {
        this.#data.id = val;
    }

    get id() {
        return this.#data.id;
    }

    set data(val) {
        this.#data = val;
    }

    get data() {
        return this.#data;
    }

    set details(val) {
        this.#details = val;
    }

    get details() {
        return this.#details;
    }

    async fetchMovieDetails() {
        this.details = await fetchMovies(this, 'id', this.data.id);
    }

    populateMovieDetails(details) {
        this.details = details;
        // add more details
        const detailsContainer = document.querySelector('#additionalMovieDetails');
        detailsContainer.innerHTML = '';

        const out = renderMovieAdditionalDetails(details);

        detailsContainer.appendChild(out);
    }

    /**
     * renders the output
     * @param {String} pathToImages
     * @returns {Element} the element to be displayed
     */
    renderView(pathToImages) {
        this.fetchMovieDetails();
        return renderDetailsView(this, pathToImages);
    }

    get commentsList() {
        return this.data.commentsList;
    }

    set commentsList(arr) {
        this.data.commentsList = arr;
    }

    addComment(text) {
        const commentObj = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            text: text,
        };
        this.data.commentsList.unshift(commentObj);
    }

    removeCommentById(id) {
        this.data.commentsList = this.data.commentsList.filter((comment) => comment.id !== id);
    }
}