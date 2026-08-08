/**
 * 
 * @param {Object}                   schema
 * @param {HTMLElement|CSSRule}      schema.parent
 * @param {HTMLSourceElement}        schema.title
 * @param {'text'|'number'}         [schema.type]
 * @param {String}                  [schema.form]
 * @param {Number}                  [schema.fields]
 * @param {Boolean}                 [schema.htmlReady]
 * @param {Boolean}                 [schema.autofocus]
 */
function PinBox( schema ) {




    /**
     * @property
     * @private
     * @type {Array}
     */
    this._inputFields = [];

    /**
     * @property
     * @private
     * @type {HTMLElement}
     */
    this._parentElem = null;

    /**
     * @property
     * @private
     * @type {HTMLElement}
     */
    this._titleSpanElem = null;

    /**
     * @property
     * @private
     * @type {HTMLElement}
     */
    this._sampElem = null;

    /**
     * @property
     * @private
     * @type {Number}
     */
    this._fieldsNum = null;

    /**
     * @property
     * @private
     * @type {Boolean}
     */
    this._autofocus = false;

    /**
     * @property
     * @private
     * @type {CallableFunction}
     */
    this._handleClickParentElem = this._evt_click_parentElem.bind( this );

    /**
     * @property
     * @private
     * @type {CallableFunction}
     */
    this._handleDblclickParentElem = this._evt_click_parentElem.bind( this );

    /**
     * @property
     * @private
     * @type {CallableFunction}
     */
    this._handleInputInputField = this._evt_input_inputField.bind( this );

    /**
     * @property
     * @private
     * @type {CallableFunction}
     */
    this._handleKeydownInputField = this._evt_keydown_inputField.bind( this );




    if ( typeof schema.parent === 'object' ) {

        this._parentElem = schema.parent;

    } else if ( typeof schema.parent === 'string' ) {

        this._parentElem = document.querySelector( schema.parent );

    }

    if ( schema.hasOwnProperty( 'autofocus' ) && schema.autofocus === true ) {

        this._autofocus = true;

    }

    if ( schema.hasOwnProperty( 'htmlReady' ) && schema.htmlReady === true ) {

        this._createFromHTML();

    } else {

        this._createFromSchema( schema );

    }

    this._parentElem.addEventListener( 'click', this._handleClickParentElem );
    this._parentElem.addEventListener( 'dblclick', this._handleDblclickParentElem );

    if ( this._autofocus === true ) {

        this._inputFields[ 0 ].focus();

    }

};




PinBox.prototype.getValue = function() {

    var valueToRet = '';

    for ( var i = 0 ; i < this._fieldsNum ; i++ ) {

        valueToRet = valueToRet + this._inputFields[ i ].value;

    }

    return valueToRet;

};

PinBox.prototype.setValue = function( valueToInsert ) {

    for ( var q = 0 ; q < this._fieldsNum ; q++ ) {

        this._inputFields[ q ].value = '';

    }

    var convertToString = String( valueToInsert );

    var arrayFromValue = convertToString.split( '' );

    for ( var i = 0 ; i < this._fieldsNum ; i++ ) {

        if ( arrayFromValue.hasOwnProperty( i ) && arrayFromValue[ i ] !== undefined ) {

            this._inputFields[ i ].value = arrayFromValue[ i ];

        } else {

            this._inputFields[ i ].focus();

            return false;

        }

    }

    this._inputFields[ this._fieldsNum - 1 ].focus();

};

PinBox.prototype.setError = function( errorMessage ) {

    this._parentElem.classList.add( 'error' );
    this._sampElem.textContent = errorMessage;

};

PinBox.prototype.clearError = function() {

    this._parentElem.classList.remove( 'error' );
    this._sampElem.textContent = '';

};

PinBox.prototype.focus = function() {

    this._evt_click_parentElem();

};




PinBox.prototype._createFromSchema = function( schema ) {

    this._fieldsNum = parseInt( schema.fields );

    var fragment = document.createDocumentFragment();

    var titleElem = document.createElement( 'DIV' );
    titleElem.classList.add( 'title' );
    fragment.appendChild( titleElem );

    this._titleSpanElem = document.createElement( 'LABEL' );
    this._titleSpanElem.innerHTML = schema.title;
    this._titleSpanElem.classList.add( 'titleElem' );
    titleElem.appendChild( this._titleSpanElem );

    this._sampElem = document.createElement( 'SAMP' );
    this._sampElem.classList.add( 'errorElem' );
    titleElem.appendChild( this._sampElem );

    var bodyElem = document.createElement( 'DIV' );
    bodyElem.classList.add( 'body' );
    fragment.appendChild( bodyElem );

    let fieldType = 'text';

    if ( schema.hasOwnProperty( 'type' ) ) {

        fieldType = schema.type;

    }

    for ( var i = 0 ; i < this._fieldsNum ; i++ ) {

        var inputField = document.createElement( 'INPUT' );
        inputField.setAttribute( 'type', fieldType );
        inputField.setAttribute( 'maxlength', '1' );
        inputField.setAttribute( 'data-num', i+1 );
        bodyElem.appendChild( inputField );

        if ( fieldType === 'number' ) {

            inputField.setAttribute( 'inputmode', 'numeric' );
            inputField.setAttribute( 'pattern', '[0-9]*' );

        }

        inputField.addEventListener( 'input', this._handleInputInputField );
        inputField.addEventListener( 'keydown', this._handleKeydownInputField );

        this._inputFields.push( inputField );

    }

    if ( schema.hasOwnProperty( 'form' ) === true ) {

        this._inputFields[ this._fieldsNum - 1 ].setAttribute( 'form', schema.form );

    }

    this._parentElem.appendChild( fragment );

};

PinBox.prototype._createFromHTML = function() {

    this._titleSpanElem = this._parentElem.querySelector( 'titleElem' );
    this._sampElem      = this._parentElem.querySelector( '.errorElem' );
    this._inputFields   = this._parentElem.querySelectorAll( 'input' );
    this._fieldsNum     = this._inputFields.length;

    for ( var i = 0 ; i < this._fieldsNum ; i++ ) {

        this._inputFields[ i ].addEventListener( 'input', this._handleInputInputField );
        this._inputFields[ i ].addEventListener( 'keydown', this._handleKeydownInputField );

    }

};

PinBox.prototype._evt_click_parentElem = function( evt ) {

    if ( typeof evt !== 'undefined' ) {

        evt.preventDefault();

    }

    var foundEmptyFlag = false;

    for ( var i = 0 ; i < this._fieldsNum ; i++ ) {

        if ( this._inputFields[ i ].value === '' ) {

            foundEmptyFlag = true;

            this._inputFields[ i ].focus();

            break;

        }

    }

    if ( foundEmptyFlag === false ) {

        this._inputFields[ this._fieldsNum - 1 ].focus();

    }

};

PinBox.prototype._evt_input_inputField = function( evt ) {

    var currentNum = parseInt( evt.currentTarget.getAttribute( 'data-num' ) );

    if ( currentNum < this._fieldsNum ) {

        this._inputFields[ currentNum ].focus();

    }

};

PinBox.prototype._evt_keydown_inputField = function( evt ) {

    this.clearError();

    if ( evt.key === "Backspace" ) {

        evt.preventDefault();

        var currentNum = parseInt( evt.currentTarget.getAttribute( 'data-num' ) );

        if ( this._inputFields[ currentNum - 1 ].value !== '' ) {

            this._inputFields[ currentNum - 1 ].value = '';

            if ( currentNum > 1 ) {

                this._inputFields[ currentNum - 2 ].focus();

            }

        } else {

            this._inputFields[ currentNum - 2 ].value = '';

            this._inputFields[ currentNum - 2 ].focus();

        }

    }

};