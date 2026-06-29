/// <reference path="../modules/Body/js/main.js" />
/// <reference path="../modules/InputBox/js/main.js" />
/// <reference path="../modules/Main/js/main.js" />
/// <reference path="../modules/Header/js/main.js" />
/// <reference path="../modules/PinBox/js/main.js" />
/// <reference path="./library.js" />




const AppState = {
    'modules': {
        'header': new Header({
            'main': {
                'title': 'Login'
            }
        }),
        'pinField': new PinBox({
            'parent': '.js_pin',
            'fields': 4,
            'title': 'Pin',
            'autofocus': true,
            'type': 'number'
        })
    }
};