export {LOW, HIGH, PENDING, PROCESSING, COMPLETED, priorityToString, sleep, updateList, render};

const LOW = 0;
const HIGH = 999;
const PENDING = 20;
const PROCESSING = 30;
const COMPLETED = 40;

/**
 * A function that convert the priority to a string
 * @param {number} priority - The priority of the order
 * @returns {string}
 */
const priorityToString = (priority) => {
    return priority === LOW ? "" : "VIP ";
}

/**
 * A function that make the program sleep for a while
 * @param {number} ms - The time to sleep in milliseconds
 * @returns {Promise<void>}
 * source: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
 */
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * A function that update the list
 * @param {string} id - The id of the list
 * @param {Array<Order>} iterable - The list of orders
 */
const updateList = (id, iterable) => {
    const toUpdate = document.getElementById(id);
    toUpdate.innerHTML = "";
    iterable.forEach(item => {
        const list = document.createElement('ul');
        list.textContent = item.toString();
        list.style.color = item.status === PROCESSING ? "rgb(255, 0, 0)" : "rgb(0, 0, 0)";
        toUpdate.appendChild(list);
    });
}

/**
 * A function that render the state of system in the HTML file
 * @param {Object} state - The state of the system
 */
const render = (state) => {
    updateList("pending-order-container", state.pendingOrders);
    updateList("completed-order-container", state.completedOrders);

    const bots = document.getElementById("bot-number-info");
    bots.textContent  = `Number of bots: ${state.bots.length}`;
}