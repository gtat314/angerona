var InputBoxIcons = {
    'default': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><defs/><path d='M23 20.2L14.8 12 23 3.8 20.2 1 12 9.2 3.8 1 1 3.8 9.2 12 1 20.2 3.8 23l8.2-8.2 8.2 8.2z'/></svg>",
    'loading': "<svg class='animateRotation' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='m4.26 18.32-1.42 1.42a11.94 11.94 0 0 1 0-15.48l1.42 1.42a9.96 9.96 0 0 0 0 12.64zM22 12c0 2.4-.85 4.6-2.26 6.32l1.42 1.42a11.94 11.94 0 0 0 0-15.48l-1.42 1.42A9.96 9.96 0 0 1 22 12zM5.68 4.26a9.95 9.95 0 0 1 12.64 0l1.42-1.42a11.94 11.94 0 0 0-15.48 0l1.42 1.42zm12.64 15.48a9.95 9.95 0 0 1-12.64 0l-1.42 1.42a11.94 11.94 0 0 0 15.48 0l-1.42-1.42z'/></svg>",
    'success': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='M20.29 2 9 13.57 3.71 8.56 0 12.27 9 21 24 5.71z'/></svg>",
    'warning': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='#FF4747' d='M12 1 0 23h24L12 1zm-1 8h2v7h-2V9zm1 11.3a1.3 1.3 0 1 1 0-2.6 1.3 1.3 0 0 1 0 2.6z'/></svg>"
};




/**
 * 
 * @param {Object}                                       schema
 * @param {HTMLElement|CSSRule}                          schema.parent
 * @param {String}                                      [schema.uppercase] eg: 'el-GR'
 * @param {String}                                      [schema.pretext]
 * @param {String}                                      [schema.name]
 * @param {'text'|'email'}                              [schema.type]
 * @param {HTMLSourceElement}                           [schema.title]
 * @param {Boolean}                                     [schema.htmlReady]
 * @param {Boolean}                                     [schema.trimOnPaste]
 * @param {Boolean}                                     [schema.forceIcon]
 * @param {Boolean}                                     [schema.noIcon]
 * @param {String}                                      [schema.form]
 * @param {String}                                      [schema.value]
 * @param {Number}                                      [schema.tabindex]
 * @param {String}                                      [schema.placeholder]
 * @param {SVGElement}                                  [schema.iconDefault]
 * @param {SVGElement}                                  [schema.iconLoading]
 * @param {SVGElement}                                  [schema.iconSuccess]
 * @param {SVGElement}                                  [schema.iconWarning]
 * @param {Boolean}                                     [schema.autocomplete=false]
 * @param {Boolean}                                     [schema.autofocus=false]
 * @param {Boolean}                                     [schema.spellcheck=false]
 * @param {Boolean}                                     [schema.disabled=false]
 * @param {Boolean}                                     [schema.selectoonfocus=false]
 * @param {Number}                                      [schema.inputDelay]
 * @param {Function}                                    [schema.onInputDelayed]
 * @param {Function}                                    [schema.onFocusout]
 * @param {Function}                                    [schema.onInput]
 * @param {Function}                                    [schema.onPaste]
 * @param {Object[]}                                    [schema.eventListeners]
 * @param {'input'|'inputDelayed'|'focusout'|'paste'}    schema.eventListeners[].type
 * @param {Function}                                     schema.eventListeners[].listener
 * @param {Number}                                       schema.eventListeners[].delay=1000
 */
function InputBox( schema ) {

    /**
     * 
     * @property
     * @private
     */
    this._disabled = false;

    /**
     * 
     * @property
     * @private
     */
    this._selectoonfocus = false;

    /**
     * 
     * @property
     * @private
     */
    this._iconElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._parentElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._titleSpanElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._sampElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._inputElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._onInputCallback = null;

    /**
     * 
     * @property
     * @private
     */
    this._onInputDelayedCallback = null;

    /**
     * 
     * @property
     * @private
     */
    this._inputDelay = null;

    /**
     * 
     * @property
     * @private
     */
    this._inputDelayTimer = null;

    /**
     * 
     * @property
     * @private
     */
    this._onFocusoutCallback = null;

    /**
     * 
     * @property
     * @private
     */
    this._onKeydownCallback = null;

    /**
     * 
     * @property
     * @private
     */
    this._onPasteCallback = null;

    /**
     * 
     * @property
     * @private
     * @var Boolean
     */
    this._trimOnPaste = null;

    /**
     * @property
     * @private
     * @var {String|null}
     */
    this._pretext = null;

    /**
     * 
     * @property
     * @private
     */
    this._iconDefaultSrc = InputBoxIcons[ 'default' ];

    /**
     * 
     * @property
     * @private
     */
    this._iconLoadingSrc = InputBoxIcons[ 'loading' ];

    /**
     * 
     * @property
     * @private
     */
    this._iconSuccessSrc = InputBoxIcons[ 'success' ];

    /**
     * 
     * @property
     * @private
     */
    this._iconWarningSrc = InputBoxIcons[ 'warning' ];

    /**
     * 
     * @property
     * @private
     */
    this._forceIcon = false;

    /**
     * 
     * @property
     * @private
     */
    this._type = 'text';

    /**
     * 
     * @property
     * @private
     */
    this._inputId = null;

    /**
     * @property
     * @private
     */
    this._inputName = null;

    /**
     * @property
     * @private
     * @type {String|false}
     */
    this._uppercase = false;

    /**
     * @property
     * @private
     * @type {CallableFunction}
     */
    this._handleInputInputElem = this._evt_input_inputElem.bind( this );

    /**
     * @property
     * @private
     * @type {CallableFunction}
     */
    this._handleFocusoutInputElem = this._evt_focusout_inputElem.bind( this );

    /**
     * @property
     * @private
     * @type {CallableFunction}
     */
    this._handleKeydownInputElem = this._evt_keydown_inputElem.bind( this );

    /**
     * @property
     * @private
     * @type {CallableFunction}
     */
    this._handlePasteInputElem = this._evt_paste_inputElem.bind( this );

    /**
     * @property
     * @private
     * @type {CallableFunction}
     */
    this._handleClickIconElem = this._evt_click_iconElem.bind( this );

    /**
     * @property
     * @private
     * @type {CallableFunction}
     */
    this._handleClickParentElem = this._evt_click_parentElem.bind( this );




    if ( typeof schema.parent === 'object' ) {

        this._parentElem = schema.parent;

    } else if ( typeof schema.parent === 'string' ) {

        this._parentElem = document.querySelector( schema.parent );
        this._inputId = 'inputbox_' + schema.parent.replace( '.', '' );

    }

    var autofocus = false;

    if ( schema.hasOwnProperty( 'uppercase' ) ) {

        this._uppercase = schema.uppercase;

    }

    if ( schema.hasOwnProperty( 'trimOnPaste' ) ) {

        this._trimOnPaste = schema.trimOnPaste;

    }

    if ( schema.hasOwnProperty( 'type' ) ) {

        this._type = schema.type;

    }

    if ( schema.hasOwnProperty( 'pretext' ) ) {

        this._pretext = schema.pretext;

    }

    if ( schema.hasOwnProperty( 'autofocus' ) ) {

        autofocus = schema.autofocus;

    }
    
    if ( schema.hasOwnProperty( 'name' ) ) {

        this._inputName = schema.name;

    }
    
    if ( schema.hasOwnProperty( 'iconDefault' ) ) {

        this._iconDefaultSrc = schema.iconDefault;

    }

    if ( schema.hasOwnProperty( 'iconLoading' ) ) {

        this._iconLoadingSrc = schema.iconLoading;

    }

    if ( schema.hasOwnProperty( 'iconSuccess' ) ) {

        this._iconSuccessSrc = schema.iconSuccess;

    }

    if ( schema.hasOwnProperty( 'iconWarning' ) ) {

        this._iconWarningSrc = schema.iconWarning;

    }

    if ( schema.hasOwnProperty( 'selectoonfocus' ) ) {

        this._selectoonfocus = schema.selectoonfocus;

    }

    if ( schema.hasOwnProperty( 'disabled' ) ) {

        this._disabled = schema.disabled;

    }

    if ( schema.hasOwnProperty( 'htmlReady' ) && schema.htmlReady === true ) {

        this._createFromHTML();

    } else {

        this._createFromSchema( schema );

    }

    if ( this._inputElem !== null ) {

        this._inputElem.addEventListener( 'input',      this._handleInputInputElem );
        this._inputElem.addEventListener( 'focusout',   this._handleFocusoutInputElem );
        this._inputElem.addEventListener( 'keydown',    this._handleKeydownInputElem );
        this._inputElem.addEventListener( 'paste',      this._handlePasteInputElem );

    }

    if ( this._iconElem !== null ) {

        this._iconElem.addEventListener( 'click', this._handleClickIconElem );

    }

    this._parentElem.addEventListener( 'click', this._handleClickParentElem );

    if ( schema.hasOwnProperty( 'eventListeners' ) ) {

        for ( var i = 0 ; i < schema.eventListeners.length ; i++ ) {

            if ( schema.eventListeners[ i ].type === 'input' ) {

                this._onInputCallback = schema.eventListeners[ i ].listener;

            }

            if ( schema.eventListeners[ i ].type === 'focusout' ) {

                this._onFocusoutCallback = schema.eventListeners[ i ].listener;

            }

            if ( schema.eventListeners[ i ].type === 'keydown' ) {

                this._onKeydownCallback = schema.eventListeners[ i ].listener;

            }

            if ( schema.eventListeners[ i ].type === 'paste' ) {

                this._onPasteCallback = schema.eventListeners[ i ].listener;

            }

            if ( schema.eventListeners[ i ].type === 'inputDelayed' ) {

                this._onInputDelayedCallback = schema.eventListeners[ i ].listener;

                if ( schema.eventListeners[ i ].hasOwnProperty( 'delay' ) ) {

                    this._inputDelay = this.schema.eventListeners[ i ].delay;

                } else {

                    this._inputDelay = 1000;

                }

            }

        }

    }

    if ( schema.hasOwnProperty( 'inputDelay' ) ) {

        this._inputDelay = schema.inputDelay;

    }

    if ( schema.hasOwnProperty( 'onInputDelayed' ) ) {

        this._onInputDelayedCallback = schema.onInputDelayed;

    }

    if ( schema.hasOwnProperty( 'onFocusout' ) ) {

        this._onFocusoutCallback = schema.onFocusout;

    }

    if ( schema.hasOwnProperty( 'onInput' ) ) {

        this._onInputCallback = schema.onInput;

    }

    if ( schema.hasOwnProperty( 'onPaste' ) ) {

        this._onPasteCallback = schema.onPaste;

    }

    if ( autofocus === true ) {

        this._inputElem.setAttribute( 'autofocus', true );
        this._inputElem.focus();

    }

};

InputBox.prototype.disable = function() {

    this._disabled = true;

    this._inputElem.setAttribute( 'disabled', true );

};

InputBox.prototype.enable = function() {

    this._disabled = false;

    this._inputElem.setAttribute( 'disabled', false );

};

/**
 * 
 * @param {String} errorMessage 
 */
InputBox.prototype.setError = function( errorMessage ) {

    this._parentElem.classList.add( 'error' );
    this._sampElem.textContent = errorMessage;

    this._parentElem.classList.add( 'errorTemp' );
    this._iconElem.innerHTML = this._iconWarningSrc;

    setTimeout( function(){

        this._parentElem.classList.remove( 'errorTemp' );
        this._iconElem.innerHTML = this._iconDefaultSrc;

    }.bind( this ), 3000 );

};

/**
 * 
 * @param {String} value 
 */
InputBox.prototype.setValue = function( value ) {

    var valueNice = '';

    if ( typeof value !== 'undefined' ) {

        valueNice = value;

    }

    this._inputElem.value = valueNice;

    if ( this._inputElem.value !== '' ) {

        this._iconElem.classList.add( 'active' );
        this._parentElem.classList.remove( 'error' );

    } else {

        if ( this._forceIcon !== true ) {

            this._iconElem.classList.remove( 'active' );

        }

    }

};

/**
 * 
 */
InputBox.prototype.clearError = function() {

    this._parentElem.classList.remove( 'error' );
    this._sampElem.textContent = '';
    this._iconElem.innerHTML = this._iconDefaultSrc;

};

/**
 * 
 * @returns {String|HTMLElement}
 */
InputBox.prototype.getValue = function() {

    if ( this._inputElem !== null ) {

        if ( this._uppercase !== false ) {

            return this._inputElem.value.toLocaleUpperCase( this._uppercase ).normalize('NFC').replace(/[\u0300-\u036f]/g, "");

        }

        return this._inputElem.value;

    }

};

/**
 * 
 * @param {SVGElement} iconClass 
 */
InputBox.prototype.setIcon = function( iconClass ) {

    this._iconElem.className = 'icon';

    if ( this._inputElem.value !== "" ) {

        this._iconElem.classList.add( 'active' );

    } else {

        if ( this._forceIcon === true ) {

            this._iconElem.classList.add( 'active' );

        }

    }

    this._iconElem.innerHTML = iconClass;

};

/**
 * 
 */
InputBox.prototype.resetIcon = function() {

    this._iconElem.className = 'icon';

    if ( this._inputElem.value === "" ) {

        if ( this._forceIcon !== true ) {

            this._iconElem.classList.remove( 'active' );

        }

        setTimeout(function(){

            this._iconElem.innerHTML = this._iconDefaultSrc;

        }.bind( this ), 150);

    } else {

        this._iconElem.innerHTML = this._iconDefaultSrc;

        this._iconElem.classList.add( 'active' );

    }

};

/**
 * 
 */
InputBox.prototype.loading = function() {

    this._iconElem.innerHTML = this._iconLoadingSrc;

};

/**
 * 
 */
InputBox.prototype.removeLoading = function() {

    this._iconElem.innerHTML = this._iconDefaultSrc;

};

/**
 * 
 */
InputBox.prototype.success = function() {

    this._parentElem.classList.add( 'success' );
    this._iconElem.innerHTML = this._iconSuccessSrc;

    setTimeout( function(){

        this._parentElem.classList.remove( 'success' );
        this._iconElem.innerHTML = this._iconDefaultSrc;

    }.bind( this ), 3000 );

};

/**
 * 
 */
InputBox.prototype.focus = function() {

    this._inputElem.focus();

};

/**
 * 
 * @param {String} title 
 */
InputBox.prototype.setTitle = function( title ) {

    this._titleSpanElem.innerHTML = title;

};

/**
 * 
 */
InputBox.prototype.isValidEmail = function() {

    var emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    return emailRegex.test( this._inputElem.value );


};

/**
 * 
 * @returns {Boolean}
 */
InputBox.prototype.isValidInt = function() {

    var value = parseInt( this._inputElem.value );

    if ( value != this._inputElem.value ) {

        return false;

    }

    if ( isNaN( this._inputElem.value ) === true ) {

        return false;

    }

    if ( Number.isInteger( value ) === true ) {

        return true;
        
    } else {

        return false;

    }

};

/**
 * @method
 * @public
 * @returns {Boolean}
 */
InputBox.prototype.isPositiveInteger = function() {

    var regex = /^[0-9]+$/;

    if ( regex.test( this._inputElem.value ) ) {

        var number = Number( this._inputElem.value );

        if ( Number.isInteger( number ) && number > 0 ) {

            return true;

        } else {

            return false;

        }

    } else {

        return false;

    }

};

/**
 * 
 * @returns {String|null}
 */
InputBox.prototype.getName = function() {

    return this._inputName;

}

/**
 * @method
 * @public
 * @returns {Boolean}
 */
InputBox.prototype.isNumeric = function() {

    var str = this._inputElem.value.trim();

    if ( str === "" ) {

        return false;

    }

    var num = Number( str );

    if ( typeof num === 'number' && isFinite( num ) ) {

        return true;

    } else {

        return false;
        
    }

};




/**
 * 
 * @private
 * @param {Event} evt 
 * @returns {Boolean}
 */
InputBox.prototype._evt_click_iconElem = function( evt ) {

    if ( this._disabled === true ) {

        return false;

    }

    if ( this._iconElem.classList.contains( 'active' ) === true ) {

        if ( this._forceIcon !== true ) {

            this._iconElem.classList.remove( 'active' );

        }


        this._inputElem.value = '';
        this._parentElem.classList.remove( 'error' );

    }

    this._inputElem.focus();

    if ( this._onInputCallback !== null ) {

        this._onInputCallback( evt );

    }

    if ( this._onInputDelayedCallback !== null ) {

        this._onInputDelayedCallback( evt );

    }

    return true;

};

/**
 * 
 * @private
 * @param {Event} evt 
 */
InputBox.prototype._evt_focusout_inputElem = function( evt ) {

    if ( this._onFocusoutCallback !== null ) {

        this._onFocusoutCallback( evt, this );

    }

};

/**
 * 
 * @private
 * @param {Event} evt 
 */
InputBox.prototype._evt_keydown_inputElem = function( evt ) {

    if ( this._onKeydownCallback !== null ) {

        this._onKeydownCallback( evt );

    }

};

/**
 * 
 * @private
 * @param {Event} evt 
 */
InputBox.prototype._evt_input_inputElem = function( evt ) {

    if ( this._inputElem.value !== '' ) {

        this._iconElem.classList.add( 'active' );
        this._parentElem.classList.remove( 'error' );

    } else {

        if ( this._forceIcon !== true ) {

            this._iconElem.classList.remove( 'active' );

        }

    }

    if ( this._onInputCallback !== null ) {

        this._onInputCallback( evt );

    }

    if ( this._onInputDelayedCallback !== null ) {

        clearTimeout( this._inputDelayTimer );

        this._inputDelayTimer = setTimeout( function(){

            this._onInputDelayedCallback( evt );

        }.bind( this ), this._inputDelay );

    }

};

/**
 * 
 * @private
 * @param {Event} evt 
 */
InputBox.prototype._evt_paste_inputElem = function( evt ) {

    if ( this._trimOnPaste === true ) {

        evt.preventDefault();

        var pastedText = '';
    
        if ( evt.clipboardData && evt.clipboardData.getData ) {

            pastedText = evt.clipboardData.getData( 'text/plain' );

        } else if ( window.clipboardData && window.clipboardData.getData ) {

            pastedText = window.clipboardData.getData( 'Text' );

        }

        this.setValue( pastedText.trim() );

    }

    if ( this._onPasteCallback !== null ) {

        this._onPasteCallback( evt, this );

    }

};

/**
 * 
 * @private
 */
InputBox.prototype._evt_click_parentElem = function() {

    if ( this._inputElem !== null ) {

        this._inputElem.focus();

    }

    if ( this._selectoonfocus === true ) {

        this._inputElem.select();

    }

};

/**
 * 
 * @private
 * @method
 */
InputBox.prototype._createFromHTML = function() {

    this._titleSpanElem = this._parentElem.querySelector( '.titleElem' );
    this._sampElem      = this._parentElem.querySelector( '.errorElem' );
    this._inputElem     = this._parentElem.querySelector( 'input' );
    this._iconElem      = this._parentElem.querySelector( '.icon' );

    if ( this._inputElem.hasAttribute( 'name' ) ) {

        this._inputName = this._inputElem.getAttribute( 'name' );

    }

};

/**
 * 
 * @private
 * @method
 * @param {Object} schema 
 */
InputBox.prototype._createFromSchema = function( schema ) {

    var spellcheck      = false;
    var autocomplete    = false;

    if ( schema.hasOwnProperty( 'spellcheck' ) ) {

        spellcheck = schema.spellcheck;

    }

    if ( schema.hasOwnProperty( 'autocomplete' ) ) {

        autocomplete = schema.autocomplete;

    }

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

    if ( this._pretext !== null ) {

        var pretextElem = document.createElement( 'P' );
        pretextElem.textContent = this._pretext;
        bodyElem.appendChild( pretextElem );

    }

    this._inputElem = document.createElement( 'INPUT' );
    this._inputElem.classList.add( 'input' );
    this._inputElem.setAttribute( 'type', this._type );
    this._inputElem.spellcheck = spellcheck;
    bodyElem.appendChild( this._inputElem );

    if ( this._inputId !== null ) {

        this._titleSpanElem.setAttribute( 'for', this._inputId );
        this._inputElem.id = this._inputId;

    }

    if ( this._inputName !== null ) {

        this._inputElem.setAttribute( 'name', this._inputName );

    }

    if ( autocomplete === true ) {

        this._inputElem.autocomplete = 'on';

    }

    if ( schema.hasOwnProperty( 'tabindex' ) === true ) {

        this._inputElem.setAttribute( 'tabindex', schema.tabindex );

    }

    if ( schema.hasOwnProperty( 'placeholder' ) === true ) {

        this._inputElem.setAttribute( 'placeholder', schema.placeholder );

    }

    if ( schema.hasOwnProperty( 'form' ) === true ) {

        this._inputElem.setAttribute( 'form', schema.form );

    }

    this._iconElem = document.createElement( 'SPAN' );
    this._iconElem.classList.add( 'icon' );
    this._iconElem.innerHTML = this._iconDefaultSrc;
    bodyElem.appendChild( this._iconElem );

    if ( schema.hasOwnProperty( 'forceIcon' ) ) {

        if ( schema.forceIcon === true ) {

            this._forceIcon = true;
            this._iconElem.classList.add( 'active' );
            this._parentElem.classList.add( 'mod_forceIcon' );

        }

    }

    if ( schema.hasOwnProperty( 'noIcon' ) === true ) {

        this._iconElem.style.display = 'none';

    }

    if ( schema.hasOwnProperty( 'value' ) ) {

        this.setValue( schema.value );

    }

    if ( this._disabled === true ) {

        this._inputElem.setAttribute( 'disabled', true );

    }

    this._parentElem.appendChild( fragment );

    if ( this._uppercase !== false ) {

        this._parentElem.classList.add( 'mod_uppercase' );

    }

};