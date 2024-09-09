export {Order};
import {LOW, PENDING, PROCESSING, COMPLETED, priorityToString} from './utils.js';

/**
 * Represents a normal order in the system
 * @class
 */
class Order {
    constructor(id) {
        /**
         * The id of the order
         * @type {number}
         */
        this.id = id;
        /**
         * The priority of the order
         * @type {number}
         */
        this.priority = LOW;
        /**
         * The status of the order
         * @type {number}
         */
        this.status = PENDING;
    }

    /**
     * A function that convert the order to a string
     * @returns {string}
     */
    toString() {
        let orderLevel = priorityToString(this.priority);
        return `${orderLevel}Order - ${this.id}`;
    }

    /**
     * A function that mark the order as completed
     */
    complete() {
        this.status = COMPLETED;
    }

    /**
     * A function that mark the order as pending
     */
    pending() {
        this.status = PENDING;
    }

    /**
     * A function that mark the order as processing
     */
    processing() {
        this.status = PROCESSING;
    }
}