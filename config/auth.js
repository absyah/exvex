// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '837558732934300', //'374111722736499', // your App ID
        'clientSecret'  : '76034c7ede0e036ec2eb2c825d1cf797', // '75929c20793a1f8228d8141d463f38d3', // your App Secret
        'callbackURL'   : 'http://exvex.nodejitsu.com/auth/facebook/callback' // 'http://localhost:8080/auth/facebook/callback'
    },

    'twitterAuth' : {
        'consumerKey'     : 'your-consumer-key-here',
        'consumerSecret'  : 'your-client-secret-here',
        'callbackURL'     : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'    : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};
