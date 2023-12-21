/**
 * HTTP client configuration for making API requests using axios.
 * @module http-common
 * @type {object}
 * @property {object} baseURL - The base URL for API requests.
 * @property {object} headers - Default headers for API requests.
 */
import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:3001",
    headers: {
        "Content-Type": "application/json" // Fixed content type
    }
});