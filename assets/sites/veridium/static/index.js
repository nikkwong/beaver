'use strict';
// dom stuff
window.addEventListener('DOMContentLoaded', function () {
    
    var isSafari = (navigator.vendor && navigator.vendor.indexOf('Apple') > -1 ||
               (navigator.userAgent && navigator.userAgent.match('CriOS'))) &&
               !navigator.userAgent.match('FxiOS');

    if (isSafari) {
        var s = document.createElement('style')
        s.innerHTML = `[filter]{filter: none!important}[style*='filter:'] {filter: none!important};`
        document.head.append(s)
    }

    _doResize()

    var main = document.querySelector('main')

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

    var mobileTrigger = document.querySelector('#mobile-trigger')

    mobileTrigger.addEventListener('click', function (ev) {
        
        var open = main.dataset.showNav
        main.dataset.showNav = open === 'true' ? false : true

    })
    window.addEventListener('click', function (ev) {

        var mobileTrigger = document.querySelector('#mobile-trigger')
        if (mobileTrigger.contains(ev.target)) return 
        
        main.dataset.showNav = 'false'

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

    Array.prototype.slice.call(document.querySelectorAll('.arrow-right, [data-clickable]')).forEach(function (el) {

        el.addEventListener('click', function (_el) {

            var parent = el.closest('.parent-slider')
            var l = Array.prototype.slice.call(parent.querySelector('.scrollable').children).length
            if (el.dataset.clickable)
                return goToPos('#' + parent.id, parseInt(parent.dataset.index) + parseInt(el.dataset.clickable))
                // var index = parseInt(parent.dataset.index) + parseInt(el.dataset.clickable)
            else
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

function goToPos(parentId, index, slideToNext) {

    var parent = document.querySelector(parentId)
    Array.prototype.slice.call(parent.querySelectorAll(parentId + ' .scrollable')).forEach(function (el) {
        
        var child = el.children[index]
        if (!child) return; 
        
        el.scrollLeft = child.offsetLeft
        parent.dataset.index = index

    })

}


function goToSlide(parentId, index, slideToNext) {

    var parent = document.querySelector(parentId)
    parent.dataset.index = index
    Array.prototype.slice.call(parent.querySelectorAll(parentId + ' .scrollable')).forEach(function (el) {
        
        // var slideAmount = slideBy ? : index;
        
        var width = el.getBoundingClientRect().width
        el.scrollLeft = (index * width)

    })

}

Array.prototype.slice.call(document.querySelectorAll('#hero, #ecosystem')).forEach(function (el) {

    (function (_el) {
        var observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(function(entry) {
                console.log(entry)
                // if (entry.intersectionRatio > 0)
                _el.dataset.visible = entry.intersectionRatio > 0
            });
        }, {});
        observer.observe(_el,  { attributes: true, childList: true });
    })(el)

})


var _doResize = function () {

}

window.addEventListener('resize', _doResize)