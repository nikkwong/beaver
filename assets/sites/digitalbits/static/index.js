'use strict';
// IO
!function(f,_){"use strict";if("IntersectionObserver"in f&&"IntersectionObserverEntry"in f&&"intersectionRatio"in f.IntersectionObserverEntry.prototype)"isIntersecting"in f.IntersectionObserverEntry.prototype||Object.defineProperty(f.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return 0<this.intersectionRatio}});else{var e=[];t.prototype.THROTTLE_TIMEOUT=100,t.prototype.POLL_INTERVAL=null,t.prototype.USE_MUTATION_OBSERVER=!0,t.prototype.observe=function(e){if(!this._observationTargets.some(function(t){return t.element==e})){if(!e||1!=e.nodeType)throw new Error("target must be an Element");this._registerInstance(),this._observationTargets.push({element:e,entry:null}),this._monitorIntersections(),this._checkForIntersections()}},t.prototype.unobserve=function(e){this._observationTargets=this._observationTargets.filter(function(t){return t.element!=e}),this._observationTargets.length||(this._unmonitorIntersections(),this._unregisterInstance())},t.prototype.disconnect=function(){this._observationTargets=[],this._unmonitorIntersections(),this._unregisterInstance()},t.prototype.takeRecords=function(){var t=this._queuedEntries.slice();return this._queuedEntries=[],t},t.prototype._initThresholds=function(t){var e=t||[0];return Array.isArray(e)||(e=[e]),e.sort().filter(function(t,e,n){if("number"!=typeof t||isNaN(t)||t<0||1<t)throw new Error("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]})},t.prototype._parseRootMargin=function(t){var e=(t||"0px").split(/\s+/).map(function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new Error("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}});return e[1]=e[1]||e[0],e[2]=e[2]||e[0],e[3]=e[3]||e[1],e},t.prototype._monitorIntersections=function(){this._monitoringIntersections||(this._monitoringIntersections=!0,this.POLL_INTERVAL?this._monitoringInterval=setInterval(this._checkForIntersections,this.POLL_INTERVAL):(n(f,"resize",this._checkForIntersections,!0),n(_,"scroll",this._checkForIntersections,!0),this.USE_MUTATION_OBSERVER&&"MutationObserver"in f&&(this._domObserver=new MutationObserver(this._checkForIntersections),this._domObserver.observe(_,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},t.prototype._unmonitorIntersections=function(){this._monitoringIntersections&&(this._monitoringIntersections=!1,clearInterval(this._monitoringInterval),this._monitoringInterval=null,o(f,"resize",this._checkForIntersections,!0),o(_,"scroll",this._checkForIntersections,!0),this._domObserver&&(this._domObserver.disconnect(),this._domObserver=null))},t.prototype._checkForIntersections=function(){var h=this._rootIsInDom(),c=h?this._getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this._observationTargets.forEach(function(t){var e=t.element,n=m(e),o=this._rootContainsTarget(e),i=t.entry,r=h&&o&&this._computeTargetAndRootIntersection(e,c),s=t.entry=new a({time:f.performance&&performance.now&&performance.now(),target:e,boundingClientRect:n,rootBounds:c,intersectionRect:r});i?h&&o?this._hasCrossedThreshold(i,s)&&this._queuedEntries.push(s):i&&i.isIntersecting&&this._queuedEntries.push(s):this._queuedEntries.push(s)},this),this._queuedEntries.length&&this._callback(this.takeRecords(),this)},t.prototype._computeTargetAndRootIntersection=function(t,e){if("none"!=f.getComputedStyle(t).display){for(var n,o,i,r,s,h,c,a,u=m(t),l=v(t),p=!1;!p;){var d=null,g=1==l.nodeType?f.getComputedStyle(l):{};if("none"==g.display)return;if(l==this.root||l==_?(p=!0,d=e):l!=_.body&&l!=_.documentElement&&"visible"!=g.overflow&&(d=m(l)),d&&(n=d,o=u,void 0,i=Math.max(n.top,o.top),r=Math.min(n.bottom,o.bottom),s=Math.max(n.left,o.left),h=Math.min(n.right,o.right),a=r-i,!(u=0<=(c=h-s)&&0<=a&&{top:i,bottom:r,left:s,right:h,width:c,height:a})))break;l=v(l)}return u}},t.prototype._getRootRect=function(){var t;if(this.root)t=m(this.root);else{var e=_.documentElement,n=_.body;t={top:0,left:0,right:e.clientWidth||n.clientWidth,width:e.clientWidth||n.clientWidth,bottom:e.clientHeight||n.clientHeight,height:e.clientHeight||n.clientHeight}}return this._expandRectByRootMargin(t)},t.prototype._expandRectByRootMargin=function(n){var t=this._rootMarginValues.map(function(t,e){return"px"==t.unit?t.value:t.value*(e%2?n.width:n.height)/100}),e={top:n.top-t[0],right:n.right+t[1],bottom:n.bottom+t[2],left:n.left-t[3]};return e.width=e.right-e.left,e.height=e.bottom-e.top,e},t.prototype._hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,o=e.isIntersecting?e.intersectionRatio||0:-1;if(n!==o)for(var i=0;i<this.thresholds.length;i++){var r=this.thresholds[i];if(r==n||r==o||r<n!=r<o)return!0}},t.prototype._rootIsInDom=function(){return!this.root||i(_,this.root)},t.prototype._rootContainsTarget=function(t){return i(this.root||_,t)},t.prototype._registerInstance=function(){e.indexOf(this)<0&&e.push(this)},t.prototype._unregisterInstance=function(){var t=e.indexOf(this);-1!=t&&e.splice(t,1)},f.IntersectionObserver=t,f.IntersectionObserverEntry=a}function a(t){this.time=t.time,this.target=t.target,this.rootBounds=t.rootBounds,this.boundingClientRect=t.boundingClientRect,this.intersectionRect=t.intersectionRect||{top:0,bottom:0,left:0,right:0,width:0,height:0},this.isIntersecting=!!t.intersectionRect;var e=this.boundingClientRect,n=e.width*e.height,o=this.intersectionRect,i=o.width*o.height;this.intersectionRatio=n?Number((i/n).toFixed(4)):this.isIntersecting?1:0}function t(t,e){var n,o,i,r=e||{};if("function"!=typeof t)throw new Error("callback must be a function");if(r.root&&1!=r.root.nodeType)throw new Error("root must be an Element");this._checkForIntersections=(n=this._checkForIntersections.bind(this),o=this.THROTTLE_TIMEOUT,i=null,function(){i||(i=setTimeout(function(){n(),i=null},o))}),this._callback=t,this._observationTargets=[],this._queuedEntries=[],this._rootMarginValues=this._parseRootMargin(r.rootMargin),this.thresholds=this._initThresholds(r.threshold),this.root=r.root||null,this.rootMargin=this._rootMarginValues.map(function(t){return t.value+t.unit}).join(" ")}function n(t,e,n,o){"function"==typeof t.addEventListener?t.addEventListener(e,n,o||!1):"function"==typeof t.attachEvent&&t.attachEvent("on"+e,n)}function o(t,e,n,o){"function"==typeof t.removeEventListener?t.removeEventListener(e,n,o||!1):"function"==typeof t.detatchEvent&&t.detatchEvent("on"+e,n)}function m(t){var e;try{e=t.getBoundingClientRect()}catch(t){}return e?(e.width&&e.height||(e={top:e.top,right:e.right,bottom:e.bottom,left:e.left,width:e.right-e.left,height:e.bottom-e.top}),e):{top:0,bottom:0,left:0,right:0,width:0,height:0}}function i(t,e){for(var n=e;n;){if(n==t)return!0;n=v(n)}return!1}function v(t){var e=t.parentNode;return e&&11==e.nodeType&&e.host?e.host:e&&e.assignedSlot?e.assignedSlot.parentNode:e}}(window,document);

// dom stuff
window.addEventListener('DOMContentLoaded', function () {

    var isSafari = navigator.vendor && navigator.vendor.indexOf('Apple') > -1 &&
               navigator.userAgent && !navigator.userAgent.match('CriOS') &&
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
            if (el.dataset.clickable) {
                var index = parseInt(parent.dataset.index) + parseInt(el.dataset.clickable)
                if (l <= index) index = 0
            } else
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

    // DigitalBits Specific

    var main = document.querySelector('main'), mobile = window.outerWidth <= 768;

    setTimeout(function () {

        main.dataset.step = 1
        setTimeout(function () {

            main.dataset.step = 2

        }, mobile ? 0 : 5000)

    }, 0);
    
    var descdata = document.querySelector('#desc-svg-wrap'), papersdata = document.querySelector('#papers-art');
    ['#hero', '#desc', '#papers', 'footer'].forEach(function(name) {

        var el = document.querySelector(name)
        var observer = new IntersectionObserver(function(entries) {
  
          entries.forEach(function (entry) {

              el.dataset.visible = entry.isIntersecting
              if (entry.isIntersecting && name == '#desc' && descdata.dataset.state == 0)
                setTimeout(function () {
                    descdata.dataset.state = 1
                    setTimeout(function () {
                        descdata.dataset.state = 2
                    }, 1000)
                }, 1000)
              if (entry.isIntersecting && name == '#papers' && papersdata.dataset.state == 0)
                setTimeout(function () {
                    papersdata.dataset.state = 1
                    setTimeout(function () {
                        papersdata.dataset.state = 2
                    }, 1000)
                }, 1000)

          })
        }, {
          rootMargin: '0px',
          threshold: .2
        });

        observer.observe(el)

    })

})

function goToSlide(parentId, index, slideBy) {

    var parent = document.querySelector(parentId)
    parent.dataset.index = index
    Array.prototype.slice.call(parent.querySelectorAll(parentId + ' .scrollable')).forEach(function (el) {
        
        // var slideAmount = slideBy ? : index;
        
        var width = el.getBoundingClientRect().width
        el.scrollLeft = (index * width)

    })

}


var _doResize = function () {

}

window.addEventListener('resize', _doResize)