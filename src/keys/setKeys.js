const { saveSecret } = require('../aws/ssm');
const keys = require('./keys');

const setKeys = async () => {
    try {
        const devPort = process.env.PORT;
        const clientHost = process.env.CLIENT_HOST;
        await saveSecret('clientPort', devPort);
        await saveSecret('clientHost', clientHost);
    } catch (err) {
        console.log(err);
    }
};

module.exports = { setKeys };