'use strict';
// dom stuff
window.addEventListener('DOMContentLoaded', function () {

    var _close = function (el) {

        el.classList.add('hidden')
        document.documentElement.classList.remove('noscroll')

    }

    var _open = function (el) {

        el.classList.remove('hidden')
        document.documentElement.classList.add('noscroll')

    }

    Array.prototype.slice.call(document.querySelectorAll('[data-modal-button]')).forEach(function (el) {

        el.addEventListener('click', function (ev) {


            if (!el.dataset.modalButton) throw new Error('closed button that didn\'t have close data-open attr')
            var openEl = document.querySelector(el.dataset.modalButton)
            if (!openEl) throw new Error('no closable element found. selector in data-open is not valid')
            _open(openEl)

        })

    })

    Array.prototype.slice.call(document.querySelectorAll('.modal-close-btn')).forEach(function (el) {

        el.addEventListener('click', function (ev) {

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

    document.querySelector('#contact-btn').addEventListener('click', function (ev) {

        _close(document.querySelector('#contact-modal'))
        document.querySelector('#confirmation').classList.remove('hidden')

    })
    document.querySelector('#confirmation .icon-x').addEventListener('click', function (ev) {

        document.querySelector('#confirmation').classList.add('hidden')

    })

    var mobileTrigger = document.querySelector('#mobile-trigger')

    mobileTrigger.addEventListener('click', function (ev) {

        var open = document.body.dataset.open
        document.body.dataset.open = open === 'true' ? false : true

    })
    window.addEventListener('click', function (ev) {

        var mobileMenu = document.querySelector('#mobile-menu')
        if (!mobileMenu.contains(ev.target) && ev.target.contains(mobileTrigger)) document.body.dataset.open = 'false'

    })

    Array.prototype.slice.call(document.querySelectorAll('.juni-course-expander')).forEach(function (el) {

        el.addEventListener('click', function (ev) {

            var clicked = el.closest('.juni-course')
            Array.prototype.slice.call(document.querySelectorAll('.juni-course')).forEach(function (el) {

                if (el !== clicked)
                    el.classList.remove('active')

            })
            el.closest('.juni-course').classList.toggle('active')

        })

    })

    Array.prototype.slice.call(document.querySelectorAll('.juni-course-explorer a')).forEach(function (el) {

        el.addEventListener('click', function () {
            Array.prototype.slice.call(document.querySelectorAll('.juni-course')).forEach(function (el) {

                el.classList.remove('active')

            })
        })

    })

    Array.prototype.slice.call(document.querySelectorAll('.curriculum-link')).forEach(function (el) {

        var title = el.dataset.title

        el.addEventListener('click', function (ev) {


            if (!el.dataset.modalButton) throw new Error('closed button that didn\'t have close data-open attr')
            var openEl = document.querySelector(el.dataset.modalButton)
            if (!openEl) throw new Error('no closable element found. selector in data-open is not valid')
            document.querySelector('#course-modal-title').innerText = title
            _open(openEl)

        })


    })

    if (window.location.pathname == '/thank-you')

        document.querySelector('#confirmation').classList.remove('hidden')

})