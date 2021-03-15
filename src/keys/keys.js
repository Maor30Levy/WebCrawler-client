const { getSecret } = require('../aws/ssm');
const keys = {};
const getKeys = async () => {
    try {
        keys.port = await getSecret('clientPort');
        keys.serverHost = await getSecret('serverHost');
        return keys
    } catch (err) {
        console.log(err)
    }
};

getKeys();

module.exports = keys;