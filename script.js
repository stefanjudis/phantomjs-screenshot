/*
 * phantomjs-screenshot
 * https://github.com/stefan/phantomjs-screenshot
 *
 * Copyright (c) 2013 stefan judis
 * Licensed under the MIT license.
 */

var system        = require( 'system' ),
    webpage       = require( 'webpage' ),
    page          = webpage.create(),
    url           = system.args[ 1 ] || 'http://4waisenkinder',
    path          = system.args[ 2 ] || './',
    width         = +system.args[ 3 ] || 1000,
    height        = +system.args[ 4 ] || 1200;


page.onError = function ( msg ) {
    system.stderr.writeLine( 'ERROR:' + msg );
};

page.onConsoleMessage = function( msg, lineNum, sourceId ) {
    system.stdout.writeLine( 'CONSOLE: ' + msg, lineNum, sourceId );
};

page.viewportSize = {
    height : height,
    width  : width
};

page.clipRect = {
  height : height,
  width  : width
};

page.open( url, function( status ) {
  console.log( 'Opened url with status: ' + status );

  window.setTimeout( function() {
    var imgPath = path +
                    'img/' +
                    url.replace( /(http:\/\/|https:\/\/)/, '').replace( /\//g, '-') +
                    '-' + width + 'x' + height +
                    '.png';

    console.log( 'Rendering ' + imgPath );
    page.render( imgPath );

    phantom.exit();
  }, 500 );
} );
