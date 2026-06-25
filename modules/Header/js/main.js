var HeaderIcons = {
    'search': "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='m23.8 21.65-6.2-6.2A9.74 9.74 0 1 0 0 9.73a9.74 9.74 0 0 0 15.22 8.02L21.45 24l2.36-2.35zM2.86 9.73a6.88 6.88 0 1 1 13.77.02 6.88 6.88 0 0 1-13.77-.02z'/></svg>",
    'left': "<svg class='rotate180' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path d='m5 3 3-3 12 12L8 24l-3-3 9-9z'/></svg>"
};




/**
 * 
 * @param {Object}                   schema
 * @param {HTMLElement|CSSRule}     [schema.parent]
 * @param {Object}                   schema.main
 * @param {HTMLSourceElement}        schema.main.title
 * @param {HTMLSourceElement}       [schema.main.subtitle]
 * @param {Array}                   [schema.main.classes]
 * @param {SVGElement}              [schema.back]
 * @param {Object}                  [schema.left]
 * @param {URL}                      schema.left.link
 * @param {HTMLSourceElement}       [schema.left.title]
 * @param {SVGElement}              [schema.left.icon]
 * @param {HTMLSourceElement}       [schema.left.subtitle]
 * @param {Object}                  [schema.search]
 * @param {SVGElement}              [schema.search.icon]
 * @param {String}                  [schema.search.placeholder]
 * @param {Object}                  [schema.action]
 * @param {HTMLSourceElement}        schema.action.title
 * @param {Object}                  [schema.tag]
 * @param {String}                  [schema.tag.title]
 * @param {String}                  [schema.tag.separator]
 * @param {String}                  [schema.tag.site]
 * @param {Array}                   [schema.action.classes]
 * @param {SVGElement}              [schema.action.icon]
 * @param {Function}                [schema.action.onClick]
 * @param {Object[]}                [schema.action.eventListeners]
 * @param {String}                   schema.action.eventListeners[].type
 * @param {Function}                 schema.action.eventListeners[].listener
 */
function Header ( schema ) {

    /**
     * 
     * @property
     * @private
     */
    this._schema = schema;

    /**
     * 
     * @property
     * @private
     */
    this._mainTitleElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._mainSubtitleElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._leftTitleElem = null;

    /**
     * 
     * @property
     * @private
     */
    this._leftSubtitleElem = null;




    var iconSearchSrc = HeaderIcons[ 'search' ];
    var iconLeftSrc = HeaderIcons[ 'left' ];

    var headerElem = null;

    if ( this._schema.hasOwnProperty( 'parent' ) ) {

        if ( typeof this._schema.parent === 'object' ) {

            headerElem = schema.parent;

        } else if ( typeof this._schema.parent === 'string' ) {

            headerElem = document.querySelector( schema.parent );

        }

    } else {

        headerElem = document.querySelector( 'header' );

    }

    var fragment = document.createDocumentFragment();

    if ( this._schema.hasOwnProperty( 'left' ) ) {

        if ( this._schema.left.hasOwnProperty( 'icon' ) ) {

            iconLeftSrc = this._schema.left.icon;

        }

        var leftElem = document.createElement( 'A' );
        leftElem.classList.add( 'leftMain' );
        leftElem.setAttribute( 'href', this._schema.left.link );
        headerElem.appendChild( leftElem );

        var iconElem = document.createElement( 'SPAN' );
        iconElem.classList.add( 'icon' );
        iconElem.innerHTML = iconLeftSrc;
        leftElem.appendChild( iconElem );

        var textElem = document.createElement( 'DIV' );
        textElem.classList.add( 'text' );
        leftElem.appendChild( textElem );

        if ( this._schema.left.hasOwnProperty( 'title' ) ) {

            this._leftTitleElem = document.createElement( 'P' );
            this._leftTitleElem.classList.add( 'title' );
            this._leftTitleElem.innerHTML = this._schema.left.title;
            textElem.appendChild( this._leftTitleElem );

        }

        if ( this._schema.left.hasOwnProperty( 'subtitle' ) ) {

            this._leftSubtitleElem = document.createElement( 'SAMP' );
            this._leftSubtitleElem.classList.add( 'subtitle' );
            this._leftSubtitleElem.innerHTML = this._schema.left.subtitle;
            textElem.appendChild( this._leftSubtitleElem );

        }

    }

    if ( this._schema.hasOwnProperty( 'back' ) ) {

        var backElem = document.createElement( 'DIV' );
        backElem.classList.add( 'left' );
        headerElem.appendChild( backElem );

        var iconElem = document.createElement( 'SPAN' );
        iconElem.classList.add( 'icon' );
        iconElem.innerHTML = this._schema.back;
        backElem.appendChild( iconElem );

        iconElem.addEventListener( 'click', this._evt_click_iconElem.bind( this ) );

    }

    if ( this._schema.hasOwnProperty( 'main' ) ) {

        var mainElem = document.createElement( 'DIV' );
        mainElem.classList.add( 'main' );
        headerElem.appendChild( mainElem );

        if ( this._schema.main.hasOwnProperty( 'classes' ) ) {

            for ( var q = 0 ; q < this._schema.main.classes.length ; q++ ) {

                mainElem.classList.add( this._schema.main.classes[ q ] );

            }

        }

        this._mainTitleElem = document.createElement( 'P' );
        this._mainTitleElem.classList.add( 'title' );
        this._mainTitleElem.innerHTML = this._schema.main.title;
        mainElem.appendChild( this._mainTitleElem );

        if ( this._schema.main.hasOwnProperty( 'subtitle' ) ) {

            this._mainSubtitleElem = document.createElement( 'SAMP' );
            this._mainSubtitleElem.classList.add( 'subtitle' );
            this._mainSubtitleElem.innerHTML = this._schema.main.subtitle;
            mainElem.appendChild( this._mainSubtitleElem );
    
        }

    }

    if ( this._schema.hasOwnProperty( 'search' ) ) {

        if ( this._schema.search.hasOwnProperty( 'icon' ) ) {

            iconSearchSrc = this._schema.search.icon;

        }

        var searchElem = document.createElement( 'DIV' );
        searchElem.classList.add( 'search' );
        headerElem.appendChild( searchElem );

        var searchInputElem = document.createElement( 'INPUT' );
        searchInputElem.classList.add( 'input' );

        if ( this._schema.search.hasOwnProperty( 'placeholder' ) ) {

            searchInputElem.setAttribute( 'placeholder', this._schema.search.placeholder );

        }

        searchElem.appendChild( searchInputElem );

        var searchIconElem = document.createElement( 'SPAN' );
        searchIconElem.classList.add( 'icon' );
        searchIconElem.innerHTML = iconSearchSrc;
        searchElem.appendChild( searchIconElem );

    }

    if ( this._schema.hasOwnProperty( 'action' ) ) {

        var actionElem = document.createElement( 'DIV' );
        actionElem.classList.add( 'action' );
        headerElem.appendChild( actionElem );

        if ( this._schema.action.hasOwnProperty( 'classes' ) ) {

            for ( var q = 0 ; q < this._schema.action.classes.length ; q++ ) {

                actionElem.classList.add( this._schema.action.classes[ q ] );

            }

        }

        if ( this._schema.action.hasOwnProperty( 'icon' ) ) {

            var actionIconElem = document.createElement( 'SPAN' );
            actionIconElem.classList.add( 'icon' );
            actionIconElem.innerHTML = this._schema.action.icon;
            actionElem.appendChild( actionIconElem );

        }

        var actionTitleElem = document.createElement( 'P' );
        actionTitleElem.classList.add( 'title' );
        actionTitleElem.innerHTML = this._schema.action.title;
        actionElem.appendChild( actionTitleElem );

        if ( this._schema.action.hasOwnProperty( 'eventListeners' ) ) {

            for ( var w = 0 ; w < this._schema.action.eventListeners.length ; w++ ) {

                actionElem.addEventListener(
                    this._schema.action.eventListeners[ w ].type,
                    this._schema.action.eventListeners[ w ].listener
                );

            }

        }

        if ( this._schema.action.hasOwnProperty( 'onClick' ) ) {

            actionElem.addEventListener( 'click', this._schema.action.onClick );

        }

    }

    if ( this._schema.hasOwnProperty( 'subnav' ) ) {

        var subnavElem = document.createElement( 'DIV' );
        subnavElem.classList.add( 'subnav' );
        headerElem.appendChild( subnavElem );

        if ( this._schema.subnav.hasOwnProperty( 'classes' ) ) {

            for ( var w = 0 ; w < this._schema.subnav.classes.length ; w++ ) {

                subnavElem.classList.add( this._schema.subnav.classes[ w ] );

            }

        }

        for ( var e = 0 ; e < this._schema.subnav.buttons.length ; e++ ) {

            var buttonElem = document.createElement( 'A' );
            buttonElem.classList.add( 'subnavTitle' );
            buttonElem.innerHTML = this._schema.subnav.buttons[ e ].title;
            buttonElem.setAttribute( 'href', this._schema.subnav.buttons[ e ].link );
            subnavElem.appendChild( buttonElem );

            if ( this._schema.subnav.buttons[ e ].link === window.location.pathname ) {

                buttonElem.classList.add( 'active' );

            }

        }

    }

    headerElem.appendChild( fragment );

    if ( this._schema.hasOwnProperty( 'tag' ) ) {

        var titleToTag;

        if ( this._schema.tag.hasOwnProperty( 'title' ) ) {

            titleToTag = this._schema.tag.title;

        } else {

            titleToTag = this._schema.main.title;

        }

        if ( this._schema.tag.hasOwnProperty( 'site' ) ) {

            if ( this._schema.tag.hasOwnProperty( 'separator' ) ) {

                titleToTag = titleToTag + ' ' + this._schema.tag.separator;

            } else {

                titleToTag = titleToTag + ' |';

            }

            titleToTag = titleToTag + ' ' + this._schema.tag.site;

        }

        document.title = titleToTag;

    }

    if ( document.querySelector( 'header .subnav a.active' ) ) {

        document.querySelector( 'header .subnav a.active' ).scrollIntoView( true );

    }

};

/**
 * 
 * @param {String} title 
 */
Header.prototype.setMainTitle = function( title ) {

    this._mainTitleElem.innerHTML = title;

};

/**
 * 
 * @param {String} subtitle 
 */
Header.prototype.setMainSubtitle = function( subtitle ) {

    this._mainSubtitleElem.innerHTML = subtitle;

};

/**
 * 
 * @param {String} title 
 */
Header.prototype.setLeftTitle = function( title ) {

    this._leftTitleElem.innerHTML = title;

    this._schema.left.title = title;

};

/**
 * 
 * @param {String} subtitle 
 */
Header.prototype.setLeftSubtitle = function( subtitle ) {

    this._leftSubtitleElem.innerHTML = subtitle;

    this._schema.left.subtitle = subtitle;

};




/**
 * 
 * @private
 */
Header.prototype._evt_click_iconElem = function() {

    window.parent.postMessage( 'clickHeaderBack' );

    if ( document.referrer ) {

        location.href = document.referrer;

    } else {

        history.back();

    }

};