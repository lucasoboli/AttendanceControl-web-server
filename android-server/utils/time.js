const request = require('request-promise-native');

const getTime = async (url) => {
    const response = await request({url});
    const {unixtime} = JSON.parse(response);
    return unixtime;
}

module.exports = {getTime};