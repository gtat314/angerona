/// <reference path="../modules/Body/js/main.js" />
/// <reference path="../modules/InputBox/js/main.js" />
/// <reference path="../modules/Main/js/main.js" />
/// <reference path="../modules/Header/js/main.js" />
/// <reference path="../modules/PinBox/js/main.js" />
/// <reference path="./library.js" />




function init() {

    const pin = sessionStorage.getItem( 'pin' );

    if ( pin === null ) {

        window.location.href = '/login.html';

    }

};




init();