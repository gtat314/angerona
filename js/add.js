/// <reference path="../modules/Body/js/main.js" />
/// <reference path="../modules/InputBox/js/main.js" />
/// <reference path="../modules/Main/js/main.js" />
/// <reference path="../modules/Header/js/main.js" />
/// <reference path="../modules/PinBox/js/main.js" />
/// <reference path="./library.js" />




const AppState = {
    'modules': {
        'header': new Header({
            'left': {
                'icon': SvgIcons[ 'left' ],
                'link': '/'
            },
            'main': {
                'title': 'Add New'
            }
        }),
        'nameField': new InputBox({
            'parent': '.js_name',
            'autofocus': true,
            'form': 'js_form',
            'tabindex': 1,
            'title': 'Name'
        }),
        'valueField': new InputBox({
            'parent': '.js_value',
            'autofocus': true,
            'form': 'js_form',
            'tabindex': 2,
            'title': 'Value'
        })
    }
};