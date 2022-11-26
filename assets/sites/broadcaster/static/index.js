'use strict';

// Do this as parsed.

// document.querySelector('#hero-content')

// dom stuff
window.addEventListener('DOMContentLoaded', function() {

    var menu = document.getElementById('mobile-menu'), menubtn = document.getElementById('menu')

    menubtn.addEventListener('click', function () {

        console.log(menu.dataset.open)
        menu.dataset.open = menu.dataset.open === 'false' ? 'true' : 'false';
 
    })

    window.addEventListener('click', function (ev) {

        if (menubtn.contains(ev.target)) return 

        if (menu.dataset.open === 'true')
            menu.dataset.open = 'false';

    })

    var _close = function (el) {

        el.classList.add('hidden')
        document.documentElement.classList.remove('noscroll')
        
    }
    
    var _open = function (el) {
        
        el.classList.remove('hidden')
        document.documentElement.classList.add('noscroll')

    }

    Array.prototype.slice.call(document.querySelectorAll('[data-modal-button]')).forEach(function (el) {

        el.addEventListener('click', function(ev) {


            if (!el.dataset.modalButton) throw new Error('closed button that didn\'t have close data-open attr')
            var openEl = document.querySelector(el.dataset.modalButton)
            if (!openEl) throw new Error('no closable element found. selector in data-open is not valid')
            _open(openEl)
            
        })

    })
    
    Array.prototype.slice.call(document.querySelectorAll('.modal-close-btn')).forEach(function(el) {
        
        el.addEventListener('click', function(ev) {

            if (!el.dataset.close) throw new Error('closed button that didn\'t have close data-close attr')
            var closeEl = document.querySelector(el.dataset.close)
            if (!closeEl) throw new Error('no closable element found. selector in data-close is not valid')
            _close(closeEl)

        })

    })

    Array.prototype.slice.call(document.querySelectorAll('.modal')).forEach(function (el) {

        el.addEventListener('click', function (ev) {

            if (ev.target === el) 
                _close(el)

        })

    })

    document.querySelector('#register-btn').addEventListener('click', function(ev) {

        _close(document.querySelector('#register-modal'))
        document.querySelector('#confirmation').classList.remove('hidden')
        // return false;

    })
    document.querySelector('#confirmation .icon-x').addEventListener('click', function (ev) {

        document.querySelector('#confirmation').classList.add('hidden')

    })

    if (window.location.pathname == '/thank-you')
        document.querySelector('#confirmation').classList.remove('hidden')

})