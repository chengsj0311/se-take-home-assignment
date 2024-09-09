import { System } from './system.js';
import { render } from './utils.js';

// Main System logic
document.addEventListener('DOMContentLoaded', () => {
    const system = new System();

    // Render the system per 50ms
    setInterval(() => render(system.state), 50);

    document.getElementById('normal-order-btn').addEventListener('click', system.normalOrder.bind(system));
    document.getElementById('vip-order-btn').addEventListener('click', system.vipOrder.bind(system));
    document.getElementById('add-bot-btn').addEventListener('click', system.addBot.bind(system));
    document.getElementById('delete-bot-btn').addEventListener('click', system.deleteBot.bind(system));

});