var HeaderIcons = {
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
 * @param {Object}                  [schema.tag]
 * @param {String}                  [schema.tag.title]
 * @param {String}                  [schema.tag.separator]
 * @param {String}                  [schema.tag.site]
 */
function Header ( schema ) {

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




    let iconLeftSrc     = HeaderIcons[ 'left' ];
    let headerElem      = null;

    if ( schema.hasOwnProperty( 'parent' ) ) {

        if ( typeof schema.parent === 'object' ) {

            headerElem = schema.parent;

        } else if ( typeof schema.parent === 'string' ) {

            headerElem = document.querySelector( schema.parent );

        }

    } else {

        headerElem = document.querySelector( 'header' );

    }

    let fragment = document.createDocumentFragment();

    if ( schema.hasOwnProperty( 'left' ) ) {

        if ( schema.left.hasOwnProperty( 'icon' ) ) {

            iconLeftSrc = schema.left.icon;

        }

        const leftElem = document.createElement( 'A' );
        leftElem.classList.add( 'leftMain' );
        leftElem.setAttribute( 'href', schema.left.link );
        fragment.appendChild( leftElem );

        const iconElem = document.createElement( 'SPAN' );
        iconElem.classList.add( 'icon' );
        iconElem.innerHTML = iconLeftSrc;
        leftElem.appendChild( iconElem );

        const textElem = document.createElement( 'DIV' );
        textElem.classList.add( 'text' );
        leftElem.appendChild( textElem );

        if ( schema.left.hasOwnProperty( 'title' ) ) {

            this._leftTitleElem = document.createElement( 'P' );
            this._leftTitleElem.classList.add( 'title' );
            this._leftTitleElem.innerHTML = schema.left.title;
            textElem.appendChild( this._leftTitleElem );

        }

        if ( schema.left.hasOwnProperty( 'subtitle' ) ) {

            this._leftSubtitleElem = document.createElement( 'SAMP' );
            this._leftSubtitleElem.classList.add( 'subtitle' );
            this._leftSubtitleElem.innerHTML = schema.left.subtitle;
            textElem.appendChild( this._leftSubtitleElem );

        }

    }

    if ( schema.hasOwnProperty( 'back' ) ) {

        const backElem = document.createElement( 'DIV' );
        backElem.classList.add( 'left' );
        fragment.appendChild( backElem );

        const iconElem = document.createElement( 'SPAN' );
        iconElem.classList.add( 'icon' );
        iconElem.innerHTML = schema.back;
        backElem.appendChild( iconElem );

        iconElem.addEventListener( 'click', this._evt_click_iconElem.bind( this ) );

    }

    if ( schema.hasOwnProperty( 'main' ) ) {

        const mainElem = document.createElement( 'DIV' );
        mainElem.classList.add( 'main' );
        fragment.appendChild( mainElem );

        if ( schema.main.hasOwnProperty( 'classes' ) ) {

            for ( const classStr of schema.main.classes ) {

                mainElem.classList.add( classStr );

            }

        }

        this._mainTitleElem = document.createElement( 'P' );
        this._mainTitleElem.classList.add( 'title' );
        this._mainTitleElem.innerHTML = schema.main.title;
        mainElem.appendChild( this._mainTitleElem );

        if ( schema.main.hasOwnProperty( 'subtitle' ) ) {

            this._mainSubtitleElem = document.createElement( 'SAMP' );
            this._mainSubtitleElem.classList.add( 'subtitle' );
            this._mainSubtitleElem.innerHTML = schema.main.subtitle;
            mainElem.appendChild( this._mainSubtitleElem );
    
        }

    }

    headerElem.appendChild( fragment );

    if ( schema.hasOwnProperty( 'tag' ) ) {

        let titleToTag;

        if ( schema.tag.hasOwnProperty( 'title' ) ) {

            titleToTag = schema.tag.title;

        } else {

            titleToTag = schema.main.title;

        }

        if ( schema.tag.hasOwnProperty( 'site' ) ) {

            if ( schema.tag.hasOwnProperty( 'separator' ) ) {

                titleToTag = titleToTag + ' ' + schema.tag.separator;

            } else {

                titleToTag = titleToTag + ' |';

            }

            titleToTag = titleToTag + ' ' + schema.tag.site;

        }

        document.title = titleToTag;

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

};

/**
 * 
 * @param {String} subtitle 
 */
Header.prototype.setLeftSubtitle = function( subtitle ) {

    this._leftSubtitleElem.innerHTML = subtitle;

};




/**
 * 
 * @private
 */
Header.prototype._evt_click_iconElem = function() {

    window.parent.postMessage( 'clickHeaderBack', '*' );

    if ( document.referrer ) {

        location.href = document.referrer;

    } else {

        history.back();

    }

};