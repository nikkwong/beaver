/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
    System.config({
        paths: {
            // paths serve as alias 
            // express
            // 'npm:': '/public/node_modules/'
            // builder
            'npm:': './node_modules/'
        },

        map: {

            // for express
            // 'app': '/public/app',
            // 'models': '/public/models',

            // for builder
            'app': '/dist/client/app',
            'models': '/dist/src/models',

            'hashids': 'npm:hashids/dist/hashids.min.js',
            'ngx-tooltip': 'npm:ngx-tooltip',
            'ng2-validation': 'npm:ng2-validation',
            'ng2-charts': 'npm:ng2-charts',
            'angular2-color-picker': 'npm:angular2-color-picker',
            'charts.js': 'npm:chart.js',
            'dragula': 'npm:dragula',
            'moment': 'npm:moment',
            'system': 'npm:systemjs/dist/system.js',
            'ng2-dragula': 'npm:ng2-dragula',
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            'rxjs': 'npm:rxjs',
            'socket.io-client': 'npm:socket.io-client',
            'node-uuid': 'npm:node-uuid',
            '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
            '@angular/flex-layout': 'npm:@angular/flex-layout/bundles/flex-layout.umd.js',
            'angular2-in-memory-web-api': 'npm:angular2-in-memory-web-api',
            '@ng-bootstrap/ng-bootstrap': 'npm:@ng-bootstrap/ng-bootstrap/bundles/ng-bootstrap.js'
            // 'ng-semantic': 'npm:ng-semantic'
        },
        // packages tells the System loader how to load when no filename and/or no extension
        'packages': {
                "ngx-tooltip": { "main": "index.js", "defaultExtension": "js" },
            'models': {
                defaultExtension: 'js',
            },
            'angular2-color-picker': {
                main: './index',
                defaultExtension: 'js'
            },
            'moment': {
                main: './moment.js',
                defaultExtension: 'js'
            },
            'ng2-validation': {
                main: './bundles/ng2-validation.umd.js',
                defaultExtension: 'js'
            },
            'chart.js': {
                main: './src/charts.js',
                defaultExtension: 'js'
            },
            'ng2-charts': {
                defaultExtension: 'js'
            },
            'dragula': {
                main: './dist/dragula.js',
                defaultExtension: 'js'
            },
            'ng2-dragula': {
                defaultExtension: 'js'
            },
            'app': {
                main: './main.js',
                defaultExtension: 'js'
            },
            'rxjs': {
                defaultExtension: 'js'
            },
            'socket.io-client': {
                defaultExtension: 'js',
                main: './dist/socket.io'
            },
            'angular2-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'ng-semantic': {
                main: './ng-semantic.js',
                defaultExtension: 'js'
            },
            'node-uuid': {
                main: './uuid.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);