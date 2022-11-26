'use strict';
// dom stuff
window.addEventListener('DOMContentLoaded', function () {

    _doResize()

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

    if (window.location.pathname == '/thank-you')
        document.querySelector('#confirmation').classList.remove('hidden')

    Array.prototype.slice.call(document.querySelectorAll('.arrow-left')).forEach(function (el) {

        el.addEventListener('click', function (_el) {

            var parent = el.closest('.parent-slider')
            var l = Array.prototype.slice.call(parent.querySelector('.scrollable').children).length
            var index = parent.dataset.index === '0' ? l - 1 : (parseInt(parent.dataset.index) - 1);
            goToSlide('#' + parent.id, index)

        })

    })

    Array.prototype.slice.call(document.querySelectorAll('.arrow-right')).forEach(function (el) {

        el.addEventListener('click', function (_el) {

            var parent = el.closest('.parent-slider')
            var l = Array.prototype.slice.call(parent.querySelector('.scrollable').children).length
            var index = parent.dataset.index.toString() === (l - 1).toString() ? 0 : (parseInt(parent.dataset.index) + 1);
            goToSlide('#' + parent.id, index)

        })

    })

    Array.prototype.slice.call(document.querySelectorAll('.clickables')).forEach(function(el) {

        var parent = el.closest('.parent-slider')
        Array.prototype.slice.call(el.children).forEach(function(_el, index) {

            _el.addEventListener('click', function(ev) {

                goToSlide('#' + parent.id, index)

            })
            
        })

    })

})

function goToSlide(parentId, index) {

    var parent = document.querySelector(parentId)
    parent.dataset.index = index
    Array.prototype.slice.call(parent.querySelectorAll(parentId + ' .scrollable')).forEach(function (el) {

        var width = el.getBoundingClientRect().width
        el.scrollLeft = (index * width)

    })

}

var _doResize = function () {

    // var width = window.outerWidth, windowNode = document.body.parentNode
    // if (width > 1440) {

    //     var ratio = 1 + ((width - 1440) / 1440)
    //     windowNode.style.transform = `scale(${ratio})`

    // } else {

    //     windowNode.style.transform = 'initial'

    // }

}

window.addEventListener('resize', _doResize)