/* eslint-disable default-case */
let APIURL = "";

switch(window.location.hostname) {
    case "localhost" || "127.0.0.1": 
        APIURL = "http://localhost:3000"
        break;
    case "dd-client.herokuapp.com":
        APIURL = "https://dd-server.herokuapp.com"
}

export default APIURL;