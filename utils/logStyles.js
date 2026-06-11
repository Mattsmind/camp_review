const colors = require('colors');

colors.setTheme({
    labelBox: ['blue', 'bold'],
    label: ['green', 'bold'],
    arrow: ['brightCyan'],
});

function getTimestamp() {
    const timeFormat = new Date().toLocaleString('en-US', {
        weekday: 'short', 
        day: '2-digit',   
        month: 'short',   
        hour: '2-digit',  
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
    });
    return timeFormat.replace(/,/g, '');
}

module.exports = { getTimestamp };