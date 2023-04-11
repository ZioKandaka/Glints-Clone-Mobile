const bcrypt = require('bcrypt');

function currency(price) {
    const formatter = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });
    return formatter.format(price)
}

module.exports = currency