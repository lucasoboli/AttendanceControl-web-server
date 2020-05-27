const request = require('request-promise-native');

async function getTime (url) {
    const response = await request({url});
    const {unixtime} = JSON.parse(response);
    return unixtime;
}

module.exports = {getTime};