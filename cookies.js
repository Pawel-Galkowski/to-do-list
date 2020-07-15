// function setCookie(key, value, expiry) {
//     let values = Object.assign({}, value);
//     var expires = new Date();
//     expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
//     document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
// } 

function setCookie(name, value) {
    var cookie = [name, '=', JSON.stringify(value), '; domain=.', window.location.host.toString(), '; path=/;'].join('');
    document.cookie = cookie;
}

function getCookie(name) {
    var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
    result && (result = JSON.parse(result[1]));
    return result;
}

// function getCookie(key) {
//     // var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
//    // return keyValue ? keyValue[2] : null;
//     return unescape(document.cookie);
// }

//remove cookie
// function eraseCookie(key) {
//     var keyValue = getCookie(key);
//     setCookie(key, keyValue, '-1');
// }

function cookieElements() {
  let elements = document.getElementById("todo-list-root").childNodes;
  setCookie("task-list", elements);
  let match = getCookie("task-list");
  console.log(match);
}

//---------------OLD CODE----------------------//

// //set cookies
// function setCookie(cname, cvalue, exdays) {
//     var d = new Date();
//     d.setTime(d.getTime() + (exdays*24*60*60*30));
//     var expires = "expires="+ d.toUTCString();
//     document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// }

// //get cookies
// function getCookie(cname) {
//     var name = cname + "=";
//     var decodedCookie = decodeURIComponent(document.cookie);
//     var ca = decodedCookie.split(';');
//     for (var i = 0; i <ca.length; i++) {
//         var c = ca[i];
//         while (c.charAt(0) == ' ') {
//             c = c.substring(1);
//         }
//         if (c.indexOf(name) == 0) {
//             return c.substring(name.length, c.length);
//         }
//     }
//     return ca;
// }

// //check cookies
// function checkCookie() {
//     var usercookie = getCookie("task-list");
//     if (usercookie === "") {
//         setCookie("task-list", "", 30);
//     } else {
//         document.getElementById("todo-list-root").innerHTML = usercookie;
//     }
// }

// function cookieElements(){
//     let elements = document.getElementById("todo-list-root").childNodes;
//     setCookie("task-list", elements, 30);
// }
