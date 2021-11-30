let APIURL = '';


switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'NAMEOFAPP.herokuapp.com':
        APIURL = 'https://NAMEOFAPP.herokuapp.com'
}

export default APIURL;