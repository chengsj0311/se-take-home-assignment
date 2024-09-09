export {System};
import {Bot} from './bot.js';
import {Order} from './order.js';
import {VIPOrder} from './vipOrder.js';
import {HIGH} from './utils.js';

/**
 * Class that represent the system 
 * @class
 */
class System {
    constructor() {
        /**
         * The state of the system
         * @type {Object}
         * @property {Array<Bot>} bots - The bots in the system
         * @property {Array<Order>} pendingOrders - The pending orders in the system
         * @property {Array<Order>} processingOrders - The processing orders in the system
         * @property {Array<Order>} completedOrders - The completed orders in the system
         */
        this.state = {
            bots: [],
            pendingOrders: [],
            processingOrders: [],
            completedOrders: []
        }
        
        /**
         * The order id
         * @type {number}
         */
        this.orderId = 0;
    }

    /** A function that increase the order id */
    increaseOrderId() {
        this.orderId += 1;
    }

    /** A function that add bots to the system */
    addBot() {
        let bot = new Bot();
        this.state.bots.push(bot);
        bot.work(this.state);
    }

    /** A function that destroy newest bots in the system */
    deleteBot() {
        if (this.state.bots.length > 0) {
            let bot = this.state.bots.pop();
            bot.destroyed(this.state);
        }
    }

    /** A function that add normal customer order into the system */
    normalOrder() {
        this.increaseOrderId();
        this.state.pendingOrders.push(new Order(this.orderId));
    }

    /** A fucntion that add VIP customer order into the system */
    vipOrder() {
        this.increaseOrderId();
        let index = 0;
        for (index = 0; index < this.state.pendingOrders.length; index++) {
            if (HIGH > this.state.pendingOrders[index].priority) {
                break;
            }
        }
        this.state.pendingOrders.splice(index, 0, new VIPOrder(this.orderId));
    }
}