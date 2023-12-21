/**
 * Service for handling questions-related API calls.
 * @module questionService
 */

import { getToken } from "../Utils/localStorageUtils";
import http from "../http-common";

/**
 * Get all questions from the server.
 * @function
 * @returns {Promise<object[]>} - Promise that resolves to an array of questions.
 */
const getQuestions = () =>{
    return http.get(`/questions`, {
        headers: {
            Authorization: `Bearer ${getToken()}`
        }
    });
}

const QuestionService = {
    getQuestions,
}

export default QuestionService;