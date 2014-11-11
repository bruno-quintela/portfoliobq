'use strict';
// JSHint Global exceptions
/**global Modernizr:false **/
/**
 * Usefull Polyfills
 * requires: Modernizr for feature detection
 **/
/**
 * requestAnimationFrame detection and polyfill
 **/

//Threejs already have it
/*window.requestAnimationFrame = Modernizr.prefixed('requestAnimationFrame', window) || function(callback) {
    window.setTimeout(callback, 1000 / 60);
};*/