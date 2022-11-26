// NOTE This wont work with node.js because node aliases paths to /public but for the system builder we're just going straight to /node_modules for hashids.
(function (global) {
    System.config({
        paths: {
            // paths serve as alias  
            'npm:': './node_modules/'
        },
        map: {
            'hashids': 'npm:hashids',
            'models': '/public/models',
            'scripts': '/public/assets/scripts',
            'node-uuid': 'npm:node-uuid'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        'packages': {
            'hashids': {
                main: 'dist/hashids.min.js',
                defaultExtension: 'js'
            },
            'models': {
                defaultExtension: 'js'
            },
            'node-uuid': {
                main: './uuid.js',
                defaultExtension: 'js'
            }
        }
    });
    // System.defaultJSExtensions = true;
})(this);