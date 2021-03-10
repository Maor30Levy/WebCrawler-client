const {saveSecret} = require('../aws/ssm');
const keys = require('./keys');

const setKeys = async ()=>{
    try{
        const devPort = process.env.PORT;
        const serverHost = process.env.SERVER_HOST;
        await saveSecret('clientPort',devPort);
        await saveSecret('serverHost',serverHost);
    }catch(err){
        console.log(err);
    }
};

module.exports = {setKeys};