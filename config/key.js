//figure out which credentials to return
if (process.env.NODE_ENV === 'production') {
    //in prod
    module.exports = require('./prod');
} else {
    //in dev
    module.exports = require('./dev');
}
