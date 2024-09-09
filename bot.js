export {Bot};
import {PENDING} from './utils.js';
import {sleep} from './utils.js';


/**
 * Represents a bot in the system
 * @class
 */
class Bot {
    constructor () {
        /**
         * The order that the bot is processing
         * @type {Order}
         */
        this.processingOrder = undefined;
        /**
         * The status of the bot
         * @type {boolean}
         */
        this.alive = true;
    }

    /**
     * A function that makes the bot work
     * @param {Object} state - The state of the system
     * @returns {Promise<void>}
     */
    async work(state) {
        while (this.alive) {
            if (state.pendingOrders.filter(order => order.status === PENDING).length > 0) {
                this.processOrder(state);
                await sleep(10000);
                if (this.alive) {
                    this.completeOrder(state);
                }
            }
            await sleep(500);
        }
    }

    /**
     * A function that process the order
     * @param {Object} state - The state of the system
     */
    processOrder(state) {
        for (let order of state.pendingOrders) {
            if (order.status === PENDING) {
                order.processing();
                this.processingOrder = order;
                break;
            }
        }
    }

    /**
     * @param {Object} state - The state of the system
     */
    destroyed(state) {
        this.alive = false;
        for (let order of state.pendingOrders) {
            if (order.id === this.processingOrder.id) {
                order.pending();
            }
        }
    }

    /**
     * @param {Object} state - The state of the system
     */
    completeOrder(state) {
        let index = state.pendingOrders.indexOf(this.processingOrder);
        state.pendingOrders.splice(index, 1);
        state.completedOrders.push(this.processingOrder);
        this.processingOrder.complete();
        this.processingOrder = undefined;
    }
}