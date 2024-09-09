export {VIPOrder};
import {Order} from './order.js';
import {HIGH} from './utils.js';

/**
 * Represents a VIP order in the system
 * @class
 */
class VIPOrder extends Order {
    constructor(id) {
        super(id);
        /**
         * The priority of the order
         * @type {number}
         */
        this.priority = HIGH;
    }
}