/**
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
(function (window, document) {
    'use strict';
    // Exits early if all IntersectionObserver and IntersectionObserverEntry
    // features are natively supported.
    if ('IntersectionObserver' in window &&
        'IntersectionObserverEntry' in window &&
        'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
        return;
    }
    /**
     * An IntersectionObserver registry. This registry exists to hold a strong
     * reference to IntersectionObserver instances currently observering a target
     * element. Without this registry, instances without another reference may be
     * garbage collected.
     */
    var registry = [];
    /**
     * Creates the global IntersectionObserverEntry constructor.
     * https://wicg.github.io/IntersectionObserver/#intersection-observer-entry
     * @param {Object} entry A dictionary of instance properties.
     * @constructor
     */
    function IntersectionObserverEntry(entry) {
        this.time = entry.time;
        this.target = entry.target;
        this.rootBounds = entry.rootBounds;
        this.boundingClientRect = entry.boundingClientRect;
        this.intersectionRect = entry.intersectionRect || getEmptyRect();
        this.isIntersecting = !!entry.intersectionRect;
        // Calculates the intersection ratio.
        var targetRect = this.boundingClientRect;
        var targetArea = targetRect.width * targetRect.height;
        var intersectionRect = this.intersectionRect;
        var intersectionArea = intersectionRect.width * intersectionRect.height;
        // Sets intersection ratio.
        if (targetArea) {
            this.intersectionRatio = intersectionArea / targetArea;
        }
        else {
            // If area is zero and is intersecting, sets to 1, otherwise to 0
            this.intersectionRatio = this.isIntersecting ? 1 : 0;
        }
    }
    /**
     * Creates the global IntersectionObserver constructor.
     * https://wicg.github.io/IntersectionObserver/#intersection-observer-interface
     * @param {Function} callback The function to be invoked after intersection
     *     changes have queued. The function is not invoked if the queue has
     *     been emptied by calling the `takeRecords` method.
     * @param {Object=} opt_options Optional configuration options.
     * @constructor
     */
    function IntersectionObserver(callback, opt_options) {
        var options = opt_options || {};
        if (typeof callback != 'function') {
            throw new Error('callback must be a function');
        }
        if (options.root && options.root.nodeType != 1) {
            throw new Error('root must be an Element');
        }
        // Binds and throttles `this._checkForIntersections`.
        this._checkForIntersections = throttle(this._checkForIntersections.bind(this), this.THROTTLE_TIMEOUT);
        // Private properties.
        this._callback = callback;
        this._observationTargets = [];
        this._queuedEntries = [];
        this._rootMarginValues = this._parseRootMargin(options.rootMargin);
        // Public properties.
        this.thresholds = this._initThresholds(options.threshold);
        this.root = options.root || null;
        this.rootMargin = this._rootMarginValues.map(function (margin) {
            return margin.value + margin.unit;
        }).join(' ');
    }
    /**
     * The minimum interval within which the document will be checked for
     * intersection changes.
     */
    IntersectionObserver.prototype.THROTTLE_TIMEOUT = 100;
    /**
     * The frequency in which the polyfill polls for intersection changes.
     * this can be updated on a per instance basis and must be set prior to
     * calling `observe` on the first target.
     */
    IntersectionObserver.prototype.POLL_INTERVAL = null;
    /**
     * Starts observing a target element for intersection changes based on
     * the thresholds values.
     * @param {Element} target The DOM element to observe.
     */
    IntersectionObserver.prototype.observe = function (target) {
        // If the target is already being observed, do nothing.
        if (this._observationTargets.some(function (item) {
            return item.element == target;
        })) {
            return;
        }
        if (!(target && target.nodeType == 1)) {
            throw new Error('target must be an Element');
        }
        this._registerInstance();
        this._observationTargets.push({ element: target, entry: null });
        this._monitorIntersections();
    };
    /**
     * Stops observing a target element for intersection changes.
     * @param {Element} target The DOM element to observe.
     */
    IntersectionObserver.prototype.unobserve = function (target) {
        this._observationTargets =
            this._observationTargets.filter(function (item) {
                return item.element != target;
            });
        if (!this._observationTargets.length) {
            this._unmonitorIntersections();
            this._unregisterInstance();
        }
    };
    /**
     * Stops observing all target elements for intersection changes.
     */
    IntersectionObserver.prototype.disconnect = function () {
        this._observationTargets = [];
        this._unmonitorIntersections();
        this._unregisterInstance();
    };
    /**
     * Returns any queue entries that have not yet been reported to the
     * callback and clears the queue. This can be used in conjunction with the
     * callback to obtain the absolute most up-to-date intersection information.
     * @return {Array} The currently queued entries.
     */
    IntersectionObserver.prototype.takeRecords = function () {
        var records = this._queuedEntries.slice();
        this._queuedEntries = [];
        return records;
    };
    /**
     * Accepts the threshold value from the user configuration object and
     * returns a sorted array of unique threshold values. If a value is not
     * between 0 and 1 and error is thrown.
     * @private
     * @param {Array|number=} opt_threshold An optional threshold value or
     *     a list of threshold values, defaulting to [0].
     * @return {Array} A sorted list of unique and valid threshold values.
     */
    IntersectionObserver.prototype._initThresholds = function (opt_threshold) {
        var threshold = opt_threshold || [0];
        if (!Array.isArray(threshold))
            threshold = [threshold];
        return threshold.sort().filter(function (t, i, a) {
            if (typeof t != 'number' || isNaN(t) || t < 0 || t > 1) {
                throw new Error('threshold must be a number between 0 and 1 inclusively');
            }
            return t !== a[i - 1];
        });
    };
    /**
     * Accepts the rootMargin value from the user configuration object
     * and returns an array of the four margin values as an object containing
     * the value and unit properties. If any of the values are not properly
     * formatted or use a unit other than px or %, and error is thrown.
     * @private
     * @param {string=} opt_rootMargin An optional rootMargin value,
     *     defaulting to '0px'.
     * @return {Array<Object>} An array of margin objects with the keys
     *     value and unit.
     */
    IntersectionObserver.prototype._parseRootMargin = function (opt_rootMargin) {
        var marginString = opt_rootMargin || '0px';
        var margins = marginString.split(/\s+/).map(function (margin) {
            var parts = /^(-?\d*\.?\d+)(px|%)$/.exec(margin);
            if (!parts) {
                throw new Error('rootMargin must be specified in pixels or percent');
            }
            return { value: parseFloat(parts[1]), unit: parts[2] };
        });
        // Handles shorthand.
        margins[1] = margins[1] || margins[0];
        margins[2] = margins[2] || margins[0];
        margins[3] = margins[3] || margins[1];
        return margins;
    };
    /**
     * Starts polling for intersection changes if the polling is not already
     * happening, and if the page's visibilty state is visible.
     * @private
     */
    IntersectionObserver.prototype._monitorIntersections = function () {
        if (!this._monitoringIntersections) {
            this._monitoringIntersections = true;
            this._checkForIntersections();
            // If a poll interval is set, use polling instead of listening to
            // resize and scroll events or DOM mutations.
            if (this.POLL_INTERVAL) {
                this._monitoringInterval = setInterval(this._checkForIntersections, this.POLL_INTERVAL);
            }
            else {
                addEvent(window, 'resize', this._checkForIntersections, true);
                addEvent(document, 'scroll', this._checkForIntersections, true);
                if ('MutationObserver' in window) {
                    this._domObserver = new MutationObserver(this._checkForIntersections);
                    this._domObserver.observe(document, {
                        attributes: true,
                        childList: true,
                        characterData: true,
                        subtree: true
                    });
                }
            }
        }
    };
    /**
     * Stops polling for intersection changes.
     * @private
     */
    IntersectionObserver.prototype._unmonitorIntersections = function () {
        if (this._monitoringIntersections) {
            this._monitoringIntersections = false;
            clearInterval(this._monitoringInterval);
            this._monitoringInterval = null;
            removeEvent(window, 'resize', this._checkForIntersections, true);
            removeEvent(document, 'scroll', this._checkForIntersections, true);
            if (this._domObserver) {
                this._domObserver.disconnect();
                this._domObserver = null;
            }
        }
    };
    /**
     * Scans each observation target for intersection changes and adds them
     * to the internal entries queue. If new entries are found, it
     * schedules the callback to be invoked.
     * @private
     */
    IntersectionObserver.prototype._checkForIntersections = function () {
        var rootIsInDom = this._rootIsInDom();
        var rootRect = rootIsInDom ? this._getRootRect() : getEmptyRect();
        this._observationTargets.forEach(function (item) {
            var target = item.element;
            var targetRect = getBoundingClientRect(target);
            var rootContainsTarget = this._rootContainsTarget(target);
            var oldEntry = item.entry;
            var intersectionRect = rootIsInDom && rootContainsTarget &&
                this._computeTargetAndRootIntersection(target, rootRect);
            var newEntry = item.entry = new IntersectionObserverEntry({
                time: now(),
                target: target,
                boundingClientRect: targetRect,
                rootBounds: rootRect,
                intersectionRect: intersectionRect
            });
            if (!oldEntry) {
                this._queuedEntries.push(newEntry);
            }
            else if (rootIsInDom && rootContainsTarget) {
                // If the new entry intersection ratio has crossed any of the
                // thresholds, add a new entry.
                if (this._hasCrossedThreshold(oldEntry, newEntry)) {
                    this._queuedEntries.push(newEntry);
                }
            }
            else {
                // If the root is not in the DOM or target is not contained within
                // root but the previous entry for this target had an intersection,
                // add a new record indicating removal.
                if (oldEntry && oldEntry.isIntersecting) {
                    this._queuedEntries.push(newEntry);
                }
            }
        }, this);
        if (this._queuedEntries.length) {
            this._callback(this.takeRecords(), this);
        }
    };
    /**
     * Accepts a target and root rect computes the intersection between then
     * following the algorithm in the spec.
     * TODO(philipwalton): at this time clip-path is not considered.
     * https://wicg.github.io/IntersectionObserver/#calculate-intersection-rect-algo
     * @param {Element} target The target DOM element
     * @param {Object} rootRect The bounding rect of the root after being
     *     expanded by the rootMargin value.
     * @return {?Object} The final intersection rect object or undefined if no
     *     intersection is found.
     * @private
     */
    IntersectionObserver.prototype._computeTargetAndRootIntersection =
        function (target, rootRect) {
            // If the element isn't displayed, an intersection can't happen.
            if (window.getComputedStyle(target).display == 'none')
                return;
            var targetRect = getBoundingClientRect(target);
            var intersectionRect = targetRect;
            var parent = target.parentNode;
            var atRoot = false;
            while (!atRoot) {
                var parentRect = null;
                // If we're at the root element, set parentRect to the already
                // calculated rootRect. And since <body> and <html> cannot be clipped
                // to a rect that's not also the document rect, consider them root too.
                if (parent == this.root ||
                    parent == document.body ||
                    parent == document.documentElement ||
                    parent.nodeType != 1) {
                    atRoot = true;
                    parentRect = rootRect;
                }
                else {
                    if (window.getComputedStyle(parent).overflow != 'visible') {
                        parentRect = getBoundingClientRect(parent);
                    }
                }
                // If either of the above conditionals set a new parentRect,
                // calculate new intersection data.
                if (parentRect) {
                    intersectionRect = computeRectIntersection(parentRect, intersectionRect);
                    if (!intersectionRect)
                        break;
                }
                parent = parent.parentNode;
            }
            return intersectionRect;
        };
    /**
     * Returns the root rect after being expanded by the rootMargin value.
     * @return {Object} The expanded root rect.
     * @private
     */
    IntersectionObserver.prototype._getRootRect = function () {
        var rootRect;
        if (this.root) {
            rootRect = getBoundingClientRect(this.root);
        }
        else {
            // Use <html>/<body> instead of window since scroll bars affect size.
            var html = document.documentElement;
            var body = document.body;
            rootRect = {
                top: 0,
                left: 0,
                right: html.clientWidth || body.clientWidth,
                width: html.clientWidth || body.clientWidth,
                bottom: html.clientHeight || body.clientHeight,
                height: html.clientHeight || body.clientHeight
            };
        }
        return this._expandRectByRootMargin(rootRect);
    };
    /**
     * Accepts a rect and expands it by the rootMargin value.
     * @param {Object} rect The rect object to expand.
     * @return {Object} The expanded rect.
     * @private
     */
    IntersectionObserver.prototype._expandRectByRootMargin = function (rect) {
        var margins = this._rootMarginValues.map(function (margin, i) {
            return margin.unit == 'px' ? margin.value :
                margin.value * (i % 2 ? rect.width : rect.height) / 100;
        });
        var newRect = {
            top: rect.top - margins[0],
            right: rect.right + margins[1],
            bottom: rect.bottom + margins[2],
            left: rect.left - margins[3]
        };
        newRect.width = newRect.right - newRect.left;
        newRect.height = newRect.bottom - newRect.top;
        return newRect;
    };
    /**
     * Accepts an old and new entry and returns true if at least one of the
     * threshold values has been crossed.
     * @param {?IntersectionObserverEntry} oldEntry The previous entry for a
     *    particular target element or null if no previous entry exists.
     * @param {IntersectionObserverEntry} newEntry The current entry for a
     *    particular target element.
     * @return {boolean} Returns true if a any threshold has been crossed.
     * @private
     */
    IntersectionObserver.prototype._hasCrossedThreshold =
        function (oldEntry, newEntry) {
            // To make comparing easier, an entry that has a ratio of 0
            // but does not actually intersect is given a value of -1
            var oldRatio = oldEntry && oldEntry.isIntersecting ?
                oldEntry.intersectionRatio || 0 : -1;
            var newRatio = newEntry.isIntersecting ?
                newEntry.intersectionRatio || 0 : -1;
            // Ignore unchanged ratios
            if (oldRatio === newRatio)
                return;
            for (var i = 0; i < this.thresholds.length; i++) {
                var threshold = this.thresholds[i];
                // Return true if an entry matches a threshold or if the new ratio
                // and the old ratio are on the opposite sides of a threshold.
                if (threshold == oldRatio || threshold == newRatio ||
                    threshold < oldRatio !== threshold < newRatio) {
                    return true;
                }
            }
        };
    /**
     * Returns whether or not the root element is an element and is in the DOM.
     * @return {boolean} True if the root element is an element and is in the DOM.
     * @private
     */
    IntersectionObserver.prototype._rootIsInDom = function () {
        return !this.root || containsDeep(document, this.root);
    };
    /**
     * Returns whether or not the target element is a child of root.
     * @param {Element} target The target element to check.
     * @return {boolean} True if the target element is a child of root.
     * @private
     */
    IntersectionObserver.prototype._rootContainsTarget = function (target) {
        return containsDeep(this.root || document, target);
    };
    /**
     * Adds the instance to the global IntersectionObserver registry if it isn't
     * already present.
     * @private
     */
    IntersectionObserver.prototype._registerInstance = function () {
        if (registry.indexOf(this) < 0) {
            registry.push(this);
        }
    };
    /**
     * Removes the instance from the global IntersectionObserver registry.
     * @private
     */
    IntersectionObserver.prototype._unregisterInstance = function () {
        var index = registry.indexOf(this);
        if (index != -1)
            registry.splice(index, 1);
    };
    /**
     * Returns the result of the performance.now() method or null in browsers
     * that don't support the API.
     * @return {number} The elapsed time since the page was requested.
     */
    function now() {
        return window.performance && performance.now && performance.now();
    }
    /**
     * Throttles a function and delays its executiong, so it's only called at most
     * once within a given time period.
     * @param {Function} fn The function to throttle.
     * @param {number} timeout The amount of time that must pass before the
     *     function can be called again.
     * @return {Function} The throttled function.
     */
    function throttle(fn, timeout) {
        var timer = null;
        return function () {
            if (!timer) {
                timer = setTimeout(function () {
                    fn();
                    timer = null;
                }, timeout);
            }
        };
    }
    /**
     * Adds an event handler to a DOM node ensuring cross-browser compatibility.
     * @param {Node} node The DOM node to add the event handler to.
     * @param {string} event The event name.
     * @param {Function} fn The event handler to add.
     * @param {boolean} opt_useCapture Optionally adds the even to the capture
     *     phase. Note: this only works in modern browsers.
     */
    function addEvent(node, event, fn, opt_useCapture) {
        if (typeof node.addEventListener == 'function') {
            node.addEventListener(event, fn, opt_useCapture || false);
        }
        else if (typeof node.attachEvent == 'function') {
            node.attachEvent('on' + event, fn);
        }
    }
    /**
     * Removes a previously added event handler from a DOM node.
     * @param {Node} node The DOM node to remove the event handler from.
     * @param {string} event The event name.
     * @param {Function} fn The event handler to remove.
     * @param {boolean} opt_useCapture If the event handler was added with this
     *     flag set to true, it should be set to true here in order to remove it.
     */
    function removeEvent(node, event, fn, opt_useCapture) {
        if (typeof node.removeEventListener == 'function') {
            node.removeEventListener(event, fn, opt_useCapture || false);
        }
        else if (typeof node.detatchEvent == 'function') {
            node.detatchEvent('on' + event, fn);
        }
    }
    /**
     * Returns the intersection between two rect objects.
     * @param {Object} rect1 The first rect.
     * @param {Object} rect2 The second rect.
     * @return {?Object} The intersection rect or undefined if no intersection
     *     is found.
     */
    function computeRectIntersection(rect1, rect2) {
        var top = Math.max(rect1.top, rect2.top);
        var bottom = Math.min(rect1.bottom, rect2.bottom);
        var left = Math.max(rect1.left, rect2.left);
        var right = Math.min(rect1.right, rect2.right);
        var width = right - left;
        var height = bottom - top;
        return (width >= 0 && height >= 0) && {
            top: top,
            bottom: bottom,
            left: left,
            right: right,
            width: width,
            height: height
        };
    }
    /**
     * Shims the native getBoundingClientRect for compatibility with older IE.
     * @param {Element} el The element whose bounding rect to get.
     * @return {Object} The (possibly shimmed) rect of the element.
     */
    function getBoundingClientRect(el) {
        var rect;
        try {
            rect = el.getBoundingClientRect();
        }
        catch (e) { }
        if (!rect) {
            return getEmptyRect();
        }
        // Older IE
        if (!rect.width || !rect.height) {
            rect = {
                top: rect.top,
                right: rect.right,
                bottom: rect.bottom,
                left: rect.left,
                width: rect.right - rect.left,
                height: rect.bottom - rect.top
            };
        }
        return rect;
    }
    /**
     * Returns an empty rect object. An empty rect is returned when an element
     * is not in the DOM.
     * @return {Object} The empty rect.
     */
    function getEmptyRect() {
        return {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            width: 0,
            height: 0
        };
    }
    /**
     * Checks to see if a parent element contains a child elemnt (including inside
     * shadow DOM).
     * @param {Node} parent The parent element.
     * @param {Node} child The child element.
     * @return {boolean} True if the parent node contains the child node.
     */
    function containsDeep(parent, child) {
        var node = child;
        while (node) {
            // Check if the node is a shadow root, if it is get the host.
            if (node.nodeType == 11 && node.host) {
                node = node.host;
            }
            if (node == parent)
                return true;
            // Traverse upwards in the DOM.
            node = node.parentNode;
        }
        return false;
    }
    // Exposes the constructors globally.
    window.IntersectionObserver = IntersectionObserver;
    window.IntersectionObserverEntry = IntersectionObserverEntry;
}(window, document));
/**!
 * @fileOverview Kickass library to create and place poppers near their reference elements.
 * @version 1.10.8
 * @license
 * Copyright (c) 2016 Federico Zivolo and contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.Popper = factory());
}(this, (function () {
    'use strict';
    var nativeHints = ['native code', '[object MutationObserverConstructor]'];
    /**
     * Determine if a function is implemented natively (as opposed to a polyfill).
     * @method
     * @memberof Popper.Utils
     * @argument {Function | undefined} fn the function to check
     * @returns {Boolean}
     */
    var isNative = (function (fn) {
        return nativeHints.some(function (hint) {
            return (fn || '').toString().indexOf(hint) > -1;
        });
    });
    var isBrowser = typeof window !== 'undefined';
    var longerTimeoutBrowsers = ['Edge', 'Trident', 'Firefox'];
    var timeoutDuration = 0;
    for (var i = 0; i < longerTimeoutBrowsers.length; i += 1) {
        if (isBrowser && navigator.userAgent.indexOf(longerTimeoutBrowsers[i]) >= 0) {
            timeoutDuration = 1;
            break;
        }
    }
    function microtaskDebounce(fn) {
        var scheduled = false;
        var i = 0;
        var elem = document.createElement('span');
        // MutationObserver provides a mechanism for scheduling microtasks, which
        // are scheduled *before* the next task. This gives us a way to debounce
        // a function but ensure it's called *before* the next paint.
        var observer = new MutationObserver(function () {
            fn();
            scheduled = false;
        });
        observer.observe(elem, { attributes: true });
        return function () {
            if (!scheduled) {
                scheduled = true;
                elem.setAttribute('x-index', i);
                i = i + 1; // don't use compund (+=) because it doesn't get optimized in V8
            }
        };
    }
    function taskDebounce(fn) {
        var scheduled = false;
        return function () {
            if (!scheduled) {
                scheduled = true;
                setTimeout(function () {
                    scheduled = false;
                    fn();
                }, timeoutDuration);
            }
        };
    }
    // It's common for MutationObserver polyfills to be seen in the wild, however
    // these rely on Mutation Events which only occur when an element is connected
    // to the DOM. The algorithm used in this module does not use a connected element,
    // and so we must ensure that a *native* MutationObserver is available.
    var supportsNativeMutationObserver = isBrowser && isNative(window.MutationObserver);
    /**
    * Create a debounced version of a method, that's asynchronously deferred
    * but called in the minimum time possible.
    *
    * @method
    * @memberof Popper.Utils
    * @argument {Function} fn
    * @returns {Function}
    */
    var debounce = supportsNativeMutationObserver ? microtaskDebounce : taskDebounce;
    /**
     * Check if the given variable is a function
     * @method
     * @memberof Popper.Utils
     * @argument {Any} functionToCheck - variable to check
     * @returns {Boolean} answer to: is a function?
     */
    function isFunction(functionToCheck) {
        var getType = {};
        return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    }
    /**
     * Get CSS computed property of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Eement} element
     * @argument {String} property
     */
    function getStyleComputedProperty(element, property) {
        if (element.nodeType !== 1) {
            return [];
        }
        // NOTE: 1 DOM access here
        var css = window.getComputedStyle(element, null);
        return property ? css[property] : css;
    }
    /**
     * Returns the parentNode or the host of the element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} parent
     */
    function getParentNode(element) {
        if (element.nodeName === 'HTML') {
            return element;
        }
        return element.parentNode || element.host;
    }
    /**
     * Returns the scrolling parent of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} scroll parent
     */
    function getScrollParent(element) {
        // Return body, `getScroll` will take care to get the correct `scrollTop` from it
        if (!element || ['HTML', 'BODY', '#document'].indexOf(element.nodeName) !== -1) {
            return window.document.body;
        }
        // Firefox want us to check `-x` and `-y` variations as well
        var _getStyleComputedProp = getStyleComputedProperty(element), overflow = _getStyleComputedProp.overflow, overflowX = _getStyleComputedProp.overflowX, overflowY = _getStyleComputedProp.overflowY;
        if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
            return element;
        }
        return getScrollParent(getParentNode(element));
    }
    function isOffsetContainer(element) {
        var nodeName = element.nodeName;
        if (nodeName === 'BODY') {
            return false;
        }
        return nodeName === 'HTML' || element.firstElementChild.offsetParent === element;
    }
    /**
     * Finds the root node (document, shadowDOM root) of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} node
     * @returns {Element} root node
     */
    function getRoot(node) {
        if (node.parentNode !== null) {
            return getRoot(node.parentNode);
        }
        return node;
    }
    /**
     * Returns the offset parent of the given element
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Element} offset parent
     */
    function getOffsetParent(element) {
        // NOTE: 1 DOM access here
        var offsetParent = element && element.offsetParent;
        var nodeName = offsetParent && offsetParent.nodeName;
        if (!nodeName || nodeName === 'BODY' || nodeName === 'HTML') {
            return window.document.documentElement;
        }
        return offsetParent;
    }
    /**
     * Finds the offset parent common to the two provided nodes
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element1
     * @argument {Element} element2
     * @returns {Element} common offset parent
     */
    function findCommonOffsetParent(element1, element2) {
        // This check is needed to avoid errors in case one of the elements isn't defined for any reason
        if (!element1 || !element1.nodeType || !element2 || !element2.nodeType) {
            return window.document.documentElement;
        }
        // Here we make sure to give as "start" the element that comes first in the DOM
        var order = element1.compareDocumentPosition(element2) & Node.DOCUMENT_POSITION_FOLLOWING;
        var start = order ? element1 : element2;
        var end = order ? element2 : element1;
        // Get common ancestor container
        var range = document.createRange();
        range.setStart(start, 0);
        range.setEnd(end, 0);
        var commonAncestorContainer = range.commonAncestorContainer;
        // Both nodes are inside #document
        if (element1 !== commonAncestorContainer && element2 !== commonAncestorContainer || start.contains(end)) {
            if (isOffsetContainer(commonAncestorContainer)) {
                return commonAncestorContainer;
            }
            return getOffsetParent(commonAncestorContainer);
        }
        // one of the nodes is inside shadowDOM, find which one
        var element1root = getRoot(element1);
        if (element1root.host) {
            return findCommonOffsetParent(element1root.host, element2);
        }
        else {
            return findCommonOffsetParent(element1, getRoot(element2).host);
        }
    }
    /**
     * Gets the scroll value of the given element in the given side (top and left)
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @argument {String} side `top` or `left`
     * @returns {number} amount of scrolled pixels
     */
    function getScroll(element) {
        var side = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'top';
        var upperSide = side === 'top' ? 'scrollTop' : 'scrollLeft';
        var nodeName = element.nodeName;
        if (nodeName === 'BODY' || nodeName === 'HTML') {
            var html = window.document.documentElement;
            var scrollingElement = window.document.scrollingElement || html;
            return scrollingElement[upperSide];
        }
        return element[upperSide];
    }
    /*
     * Sum or subtract the element scroll values (left and top) from a given rect object
     * @method
     * @memberof Popper.Utils
     * @param {Object} rect - Rect object you want to change
     * @param {HTMLElement} element - The element from the function reads the scroll values
     * @param {Boolean} subtract - set to true if you want to subtract the scroll values
     * @return {Object} rect - The modifier rect object
     */
    function includeScroll(rect, element) {
        var subtract = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var scrollTop = getScroll(element, 'top');
        var scrollLeft = getScroll(element, 'left');
        var modifier = subtract ? -1 : 1;
        rect.top += scrollTop * modifier;
        rect.bottom += scrollTop * modifier;
        rect.left += scrollLeft * modifier;
        rect.right += scrollLeft * modifier;
        return rect;
    }
    /*
     * Helper to detect borders of a given element
     * @method
     * @memberof Popper.Utils
     * @param {CSSStyleDeclaration} styles
     * Result of `getStyleComputedProperty` on the given element
     * @param {String} axis - `x` or `y`
     * @return {number} borders - The borders size of the given axis
     */
    function getBordersSize(styles, axis) {
        var sideA = axis === 'x' ? 'Left' : 'Top';
        var sideB = sideA === 'Left' ? 'Right' : 'Bottom';
        return +styles['border' + sideA + 'Width'].split('px')[0] + +styles['border' + sideB + 'Width'].split('px')[0];
    }
    /**
     * Tells if you are running Internet Explorer 10
     * @method
     * @memberof Popper.Utils
     * @returns {Boolean} isIE10
     */
    var isIE10 = undefined;
    var isIE10$1 = function () {
        if (isIE10 === undefined) {
            isIE10 = navigator.appVersion.indexOf('MSIE 10') !== -1;
        }
        return isIE10;
    };
    function getSize(axis, body, html, computedStyle) {
        return Math.max(body['offset' + axis], html['client' + axis], html['offset' + axis], isIE10$1() ? html['offset' + axis] + computedStyle['margin' + (axis === 'Height' ? 'Top' : 'Left')] + computedStyle['margin' + (axis === 'Height' ? 'Bottom' : 'Right')] : 0);
    }
    function getWindowSizes() {
        var body = window.document.body;
        var html = window.document.documentElement;
        var computedStyle = isIE10$1() && window.getComputedStyle(html);
        return {
            height: getSize('Height', body, html, computedStyle),
            width: getSize('Width', body, html, computedStyle)
        };
    }
    var classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    };
    var createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor)
                    descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }
        return function (Constructor, protoProps, staticProps) {
            if (protoProps)
                defineProperties(Constructor.prototype, protoProps);
            if (staticProps)
                defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();
    var defineProperty = function (obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        }
        else {
            obj[key] = value;
        }
        return obj;
    };
    var _extends = Object.assign || function (target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    /**
     * Given element offsets, generate an output similar to getBoundingClientRect
     * @method
     * @memberof Popper.Utils
     * @argument {Object} offsets
     * @returns {Object} ClientRect like output
     */
    function getClientRect(offsets) {
        return _extends({}, offsets, {
            right: offsets.left + offsets.width,
            bottom: offsets.top + offsets.height
        });
    }
    /**
     * Get bounding client rect of given element
     * @method
     * @memberof Popper.Utils
     * @param {HTMLElement} element
     * @return {Object} client rect
     */
    function getBoundingClientRect(element) {
        var rect = {};
        // IE10 10 FIX: Please, don't ask, the element isn't
        // considered in DOM in some circumstances...
        // This isn't reproducible in IE10 compatibility mode of IE11
        if (isIE10$1()) {
            try {
                rect = element.getBoundingClientRect();
                var scrollTop = getScroll(element, 'top');
                var scrollLeft = getScroll(element, 'left');
                rect.top += scrollTop;
                rect.left += scrollLeft;
                rect.bottom += scrollTop;
                rect.right += scrollLeft;
            }
            catch (err) { }
        }
        else {
            rect = element.getBoundingClientRect();
        }
        var result = {
            left: rect.left,
            top: rect.top,
            width: rect.right - rect.left,
            height: rect.bottom - rect.top
        };
        // subtract scrollbar size from sizes
        var sizes = element.nodeName === 'HTML' ? getWindowSizes() : {};
        var width = sizes.width || element.clientWidth || result.right - result.left;
        var height = sizes.height || element.clientHeight || result.bottom - result.top;
        var horizScrollbar = element.offsetWidth - width;
        var vertScrollbar = element.offsetHeight - height;
        // if an hypothetical scrollbar is detected, we must be sure it's not a `border`
        // we make this check conditional for performance reasons
        if (horizScrollbar || vertScrollbar) {
            var styles = getStyleComputedProperty(element);
            horizScrollbar -= getBordersSize(styles, 'x');
            vertScrollbar -= getBordersSize(styles, 'y');
            result.width -= horizScrollbar;
            result.height -= vertScrollbar;
        }
        return getClientRect(result);
    }
    function getOffsetRectRelativeToArbitraryNode(children, parent) {
        var isIE10 = isIE10$1();
        var isHTML = parent.nodeName === 'HTML';
        var childrenRect = getBoundingClientRect(children);
        var parentRect = getBoundingClientRect(parent);
        var scrollParent = getScrollParent(children);
        var styles = getStyleComputedProperty(parent);
        var borderTopWidth = +styles.borderTopWidth.split('px')[0];
        var borderLeftWidth = +styles.borderLeftWidth.split('px')[0];
        var offsets = getClientRect({
            top: childrenRect.top - parentRect.top - borderTopWidth,
            left: childrenRect.left - parentRect.left - borderLeftWidth,
            width: childrenRect.width,
            height: childrenRect.height
        });
        offsets.marginTop = 0;
        offsets.marginLeft = 0;
        // Subtract margins of documentElement in case it's being used as parent
        // we do this only on HTML because it's the only element that behaves
        // differently when margins are applied to it. The margins are included in
        // the box of the documentElement, in the other cases not.
        if (!isIE10 && isHTML) {
            var marginTop = +styles.marginTop.split('px')[0];
            var marginLeft = +styles.marginLeft.split('px')[0];
            offsets.top -= borderTopWidth - marginTop;
            offsets.bottom -= borderTopWidth - marginTop;
            offsets.left -= borderLeftWidth - marginLeft;
            offsets.right -= borderLeftWidth - marginLeft;
            // Attach marginTop and marginLeft because in some circumstances we may need them
            offsets.marginTop = marginTop;
            offsets.marginLeft = marginLeft;
        }
        if (isIE10 ? parent.contains(scrollParent) : parent === scrollParent && scrollParent.nodeName !== 'BODY') {
            offsets = includeScroll(offsets, parent);
        }
        return offsets;
    }
    function getViewportOffsetRectRelativeToArtbitraryNode(element) {
        var html = window.document.documentElement;
        var relativeOffset = getOffsetRectRelativeToArbitraryNode(element, html);
        var width = Math.max(html.clientWidth, window.innerWidth || 0);
        var height = Math.max(html.clientHeight, window.innerHeight || 0);
        var scrollTop = getScroll(html);
        var scrollLeft = getScroll(html, 'left');
        var offset = {
            top: scrollTop - relativeOffset.top + relativeOffset.marginTop,
            left: scrollLeft - relativeOffset.left + relativeOffset.marginLeft,
            width: width,
            height: height
        };
        return getClientRect(offset);
    }
    /**
     * Check if the given element is fixed or is inside a fixed parent
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @argument {Element} customContainer
     * @returns {Boolean} answer to "isFixed?"
     */
    function isFixed(element) {
        var nodeName = element.nodeName;
        if (nodeName === 'BODY' || nodeName === 'HTML') {
            return false;
        }
        if (getStyleComputedProperty(element, 'position') === 'fixed') {
            return true;
        }
        return isFixed(getParentNode(element));
    }
    /**
     * Computed the boundaries limits and return them
     * @method
     * @memberof Popper.Utils
     * @param {HTMLElement} popper
     * @param {HTMLElement} reference
     * @param {number} padding
     * @param {HTMLElement} boundariesElement - Element used to define the boundaries
     * @returns {Object} Coordinates of the boundaries
     */
    function getBoundaries(popper, reference, padding, boundariesElement) {
        // NOTE: 1 DOM access here
        var boundaries = { top: 0, left: 0 };
        var offsetParent = findCommonOffsetParent(popper, reference);
        // Handle viewport case
        if (boundariesElement === 'viewport') {
            boundaries = getViewportOffsetRectRelativeToArtbitraryNode(offsetParent);
        }
        else {
            // Handle other cases based on DOM element used as boundaries
            var boundariesNode = void 0;
            if (boundariesElement === 'scrollParent') {
                boundariesNode = getScrollParent(getParentNode(popper));
                if (boundariesNode.nodeName === 'BODY') {
                    boundariesNode = window.document.documentElement;
                }
            }
            else if (boundariesElement === 'window') {
                boundariesNode = window.document.documentElement;
            }
            else {
                boundariesNode = boundariesElement;
            }
            var offsets = getOffsetRectRelativeToArbitraryNode(boundariesNode, offsetParent);
            // In case of HTML, we need a different computation
            if (boundariesNode.nodeName === 'HTML' && !isFixed(offsetParent)) {
                var _getWindowSizes = getWindowSizes(), height = _getWindowSizes.height, width = _getWindowSizes.width;
                boundaries.top += offsets.top - offsets.marginTop;
                boundaries.bottom = height + offsets.top;
                boundaries.left += offsets.left - offsets.marginLeft;
                boundaries.right = width + offsets.left;
            }
            else {
                // for all the other DOM elements, this one is good
                boundaries = offsets;
            }
        }
        // Add paddings
        boundaries.left += padding;
        boundaries.top += padding;
        boundaries.right -= padding;
        boundaries.bottom -= padding;
        return boundaries;
    }
    function getArea(_ref) {
        var width = _ref.width, height = _ref.height;
        return width * height;
    }
    /**
     * Utility used to transform the `auto` placement to the placement with more
     * available space.
     * @method
     * @memberof Popper.Utils
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function computeAutoPlacement(placement, refRect, popper, reference, boundariesElement) {
        var padding = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
        if (placement.indexOf('auto') === -1) {
            return placement;
        }
        var boundaries = getBoundaries(popper, reference, padding, boundariesElement);
        var rects = {
            top: {
                width: boundaries.width,
                height: refRect.top - boundaries.top
            },
            right: {
                width: boundaries.right - refRect.right,
                height: boundaries.height
            },
            bottom: {
                width: boundaries.width,
                height: boundaries.bottom - refRect.bottom
            },
            left: {
                width: refRect.left - boundaries.left,
                height: boundaries.height
            }
        };
        var sortedAreas = Object.keys(rects).map(function (key) {
            return _extends({
                key: key
            }, rects[key], {
                area: getArea(rects[key])
            });
        }).sort(function (a, b) {
            return b.area - a.area;
        });
        var filteredAreas = sortedAreas.filter(function (_ref2) {
            var width = _ref2.width, height = _ref2.height;
            return width >= popper.clientWidth && height >= popper.clientHeight;
        });
        var computedPlacement = filteredAreas.length > 0 ? filteredAreas[0].key : sortedAreas[0].key;
        var variation = placement.split('-')[1];
        return computedPlacement + (variation ? '-' + variation : '');
    }
    /**
     * Get offsets to the reference element
     * @method
     * @memberof Popper.Utils
     * @param {Object} state
     * @param {Element} popper - the popper element
     * @param {Element} reference - the reference element (the popper will be relative to this)
     * @returns {Object} An object containing the offsets which will be applied to the popper
     */
    function getReferenceOffsets(state, popper, reference) {
        var commonOffsetParent = findCommonOffsetParent(popper, reference);
        return getOffsetRectRelativeToArbitraryNode(reference, commonOffsetParent);
    }
    /**
     * Get the outer sizes of the given element (offset size + margins)
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element
     * @returns {Object} object containing width and height properties
     */
    function getOuterSizes(element) {
        var styles = window.getComputedStyle(element);
        var x = parseFloat(styles.marginTop) + parseFloat(styles.marginBottom);
        var y = parseFloat(styles.marginLeft) + parseFloat(styles.marginRight);
        var result = {
            width: element.offsetWidth + y,
            height: element.offsetHeight + x
        };
        return result;
    }
    /**
     * Get the opposite placement of the given one
     * @method
     * @memberof Popper.Utils
     * @argument {String} placement
     * @returns {String} flipped placement
     */
    function getOppositePlacement(placement) {
        var hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
        return placement.replace(/left|right|bottom|top/g, function (matched) {
            return hash[matched];
        });
    }
    /**
     * Get offsets to the popper
     * @method
     * @memberof Popper.Utils
     * @param {Object} position - CSS position the Popper will get applied
     * @param {HTMLElement} popper - the popper element
     * @param {Object} referenceOffsets - the reference offsets (the popper will be relative to this)
     * @param {String} placement - one of the valid placement options
     * @returns {Object} popperOffsets - An object containing the offsets which will be applied to the popper
     */
    function getPopperOffsets(popper, referenceOffsets, placement) {
        placement = placement.split('-')[0];
        // Get popper node sizes
        var popperRect = getOuterSizes(popper);
        // Add position, width and height to our offsets object
        var popperOffsets = {
            width: popperRect.width,
            height: popperRect.height
        };
        // depending by the popper placement we have to compute its offsets slightly differently
        var isHoriz = ['right', 'left'].indexOf(placement) !== -1;
        var mainSide = isHoriz ? 'top' : 'left';
        var secondarySide = isHoriz ? 'left' : 'top';
        var measurement = isHoriz ? 'height' : 'width';
        var secondaryMeasurement = !isHoriz ? 'height' : 'width';
        popperOffsets[mainSide] = referenceOffsets[mainSide] + referenceOffsets[measurement] / 2 - popperRect[measurement] / 2;
        if (placement === secondarySide) {
            popperOffsets[secondarySide] = referenceOffsets[secondarySide] - popperRect[secondaryMeasurement];
        }
        else {
            popperOffsets[secondarySide] = referenceOffsets[getOppositePlacement(secondarySide)];
        }
        return popperOffsets;
    }
    /**
     * Mimics the `find` method of Array
     * @method
     * @memberof Popper.Utils
     * @argument {Array} arr
     * @argument prop
     * @argument value
     * @returns index or -1
     */
    function find(arr, check) {
        // use native find if supported
        if (Array.prototype.find) {
            return arr.find(check);
        }
        // use `filter` to obtain the same behavior of `find`
        return arr.filter(check)[0];
    }
    /**
     * Return the index of the matching object
     * @method
     * @memberof Popper.Utils
     * @argument {Array} arr
     * @argument prop
     * @argument value
     * @returns index or -1
     */
    function findIndex(arr, prop, value) {
        // use native findIndex if supported
        if (Array.prototype.findIndex) {
            return arr.findIndex(function (cur) {
                return cur[prop] === value;
            });
        }
        // use `find` + `indexOf` if `findIndex` isn't supported
        var match = find(arr, function (obj) {
            return obj[prop] === value;
        });
        return arr.indexOf(match);
    }
    /**
     * Loop trough the list of modifiers and run them in order,
     * each of them will then edit the data object.
     * @method
     * @memberof Popper.Utils
     * @param {dataObject} data
     * @param {Array} modifiers
     * @param {String} ends - Optional modifier name used as stopper
     * @returns {dataObject}
     */
    function runModifiers(modifiers, data, ends) {
        var modifiersToRun = ends === undefined ? modifiers : modifiers.slice(0, findIndex(modifiers, 'name', ends));
        modifiersToRun.forEach(function (modifier) {
            if (modifier["function"]) {
                console.warn('`modifier.function` is deprecated, use `modifier.fn`!');
            }
            var fn = modifier["function"] || modifier.fn;
            if (modifier.enabled && isFunction(fn)) {
                // Add properties to offsets to make them a complete clientRect object
                // we do this before each modifier to make sure the previous one doesn't
                // mess with these values
                data.offsets.popper = getClientRect(data.offsets.popper);
                data.offsets.reference = getClientRect(data.offsets.reference);
                data = fn(data, modifier);
            }
        });
        return data;
    }
    /**
     * Updates the position of the popper, computing the new offsets and applying
     * the new style.<br />
     * Prefer `scheduleUpdate` over `update` because of performance reasons.
     * @method
     * @memberof Popper
     */
    function update() {
        // if popper is destroyed, don't perform any further update
        if (this.state.isDestroyed) {
            return;
        }
        var data = {
            instance: this,
            styles: {},
            attributes: {},
            flipped: false,
            offsets: {}
        };
        // compute reference element offsets
        data.offsets.reference = getReferenceOffsets(this.state, this.popper, this.reference);
        // compute auto placement, store placement inside the data object,
        // modifiers will be able to edit `placement` if needed
        // and refer to originalPlacement to know the original value
        data.placement = computeAutoPlacement(this.options.placement, data.offsets.reference, this.popper, this.reference, this.options.modifiers.flip.boundariesElement, this.options.modifiers.flip.padding);
        // store the computed placement inside `originalPlacement`
        data.originalPlacement = data.placement;
        // compute the popper offsets
        data.offsets.popper = getPopperOffsets(this.popper, data.offsets.reference, data.placement);
        data.offsets.popper.position = 'absolute';
        // run the modifiers
        data = runModifiers(this.modifiers, data);
        // the first `update` will call `onCreate` callback
        // the other ones will call `onUpdate` callback
        if (!this.state.isCreated) {
            this.state.isCreated = true;
            this.options.onCreate(data);
        }
        else {
            this.options.onUpdate(data);
        }
    }
    /**
     * Helper used to know if the given modifier is enabled.
     * @method
     * @memberof Popper.Utils
     * @returns {Boolean}
     */
    function isModifierEnabled(modifiers, modifierName) {
        return modifiers.some(function (_ref) {
            var name = _ref.name, enabled = _ref.enabled;
            return enabled && name === modifierName;
        });
    }
    /**
     * Get the prefixed supported property name
     * @method
     * @memberof Popper.Utils
     * @argument {String} property (camelCase)
     * @returns {String} prefixed property (camelCase)
     */
    function getSupportedPropertyName(property) {
        var prefixes = [false, 'ms', 'webkit', 'moz', 'o'];
        var upperProp = property.charAt(0).toUpperCase() + property.slice(1);
        for (var i = 0; i < prefixes.length - 1; i++) {
            var prefix = prefixes[i];
            var toCheck = prefix ? '' + prefix + upperProp : property;
            if (typeof window.document.body.style[toCheck] !== 'undefined') {
                return toCheck;
            }
        }
        return null;
    }
    /**
     * Destroy the popper
     * @method
     * @memberof Popper
     */
    function destroy() {
        this.state.isDestroyed = true;
        // touch DOM only if `applyStyle` modifier is enabled
        if (isModifierEnabled(this.modifiers, 'applyStyle')) {
            this.popper.removeAttribute('x-placement');
            this.popper.style.left = '';
            this.popper.style.position = '';
            this.popper.style.top = '';
            this.popper.style[getSupportedPropertyName('transform')] = '';
        }
        this.disableEventListeners();
        // remove the popper if user explicity asked for the deletion on destroy
        // do not use `remove` because IE11 doesn't support it
        if (this.options.removeOnDestroy) {
            this.popper.parentNode.removeChild(this.popper);
        }
        return this;
    }
    function attachToScrollParents(scrollParent, event, callback, scrollParents) {
        var isBody = scrollParent.nodeName === 'BODY';
        var target = isBody ? window : scrollParent;
        target.addEventListener(event, callback, { passive: true });
        if (!isBody) {
            attachToScrollParents(getScrollParent(target.parentNode), event, callback, scrollParents);
        }
        scrollParents.push(target);
    }
    /**
     * Setup needed event listeners used to update the popper position
     * @method
     * @memberof Popper.Utils
     * @private
     */
    function setupEventListeners(reference, options, state, updateBound) {
        // Resize event listener on window
        state.updateBound = updateBound;
        window.addEventListener('resize', state.updateBound, { passive: true });
        // Scroll event listener on scroll parents
        var scrollElement = getScrollParent(reference);
        attachToScrollParents(scrollElement, 'scroll', state.updateBound, state.scrollParents);
        state.scrollElement = scrollElement;
        state.eventsEnabled = true;
        return state;
    }
    /**
     * It will add resize/scroll events and start recalculating
     * position of the popper element when they are triggered.
     * @method
     * @memberof Popper
     */
    function enableEventListeners() {
        if (!this.state.eventsEnabled) {
            this.state = setupEventListeners(this.reference, this.options, this.state, this.scheduleUpdate);
        }
    }
    /**
     * Remove event listeners used to update the popper position
     * @method
     * @memberof Popper.Utils
     * @private
     */
    function removeEventListeners(reference, state) {
        // Remove resize event listener on window
        window.removeEventListener('resize', state.updateBound);
        // Remove scroll event listener on scroll parents
        state.scrollParents.forEach(function (target) {
            target.removeEventListener('scroll', state.updateBound);
        });
        // Reset state
        state.updateBound = null;
        state.scrollParents = [];
        state.scrollElement = null;
        state.eventsEnabled = false;
        return state;
    }
    /**
     * It will remove resize/scroll events and won't recalculate popper position
     * when they are triggered. It also won't trigger onUpdate callback anymore,
     * unless you call `update` method manually.
     * @method
     * @memberof Popper
     */
    function disableEventListeners() {
        if (this.state.eventsEnabled) {
            window.cancelAnimationFrame(this.scheduleUpdate);
            this.state = removeEventListeners(this.reference, this.state);
        }
    }
    /**
     * Tells if a given input is a number
     * @method
     * @memberof Popper.Utils
     * @param {*} input to check
     * @return {Boolean}
     */
    function isNumeric(n) {
        return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
    }
    /**
     * Set the style to the given popper
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element - Element to apply the style to
     * @argument {Object} styles
     * Object with a list of properties and values which will be applied to the element
     */
    function setStyles(element, styles) {
        Object.keys(styles).forEach(function (prop) {
            var unit = '';
            // add unit if the value is numeric and is one of the following
            if (['width', 'height', 'top', 'right', 'bottom', 'left'].indexOf(prop) !== -1 && isNumeric(styles[prop])) {
                unit = 'px';
            }
            element.style[prop] = styles[prop] + unit;
        });
    }
    /**
     * Set the attributes to the given popper
     * @method
     * @memberof Popper.Utils
     * @argument {Element} element - Element to apply the attributes to
     * @argument {Object} styles
     * Object with a list of properties and values which will be applied to the element
     */
    function setAttributes(element, attributes) {
        Object.keys(attributes).forEach(function (prop) {
            var value = attributes[prop];
            if (value !== false) {
                element.setAttribute(prop, attributes[prop]);
            }
            else {
                element.removeAttribute(prop);
            }
        });
    }
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} data.styles - List of style properties - values to apply to popper element
     * @argument {Object} data.attributes - List of attribute properties - values to apply to popper element
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The same data object
     */
    function applyStyle(data) {
        // any property present in `data.styles` will be applied to the popper,
        // in this way we can make the 3rd party modifiers add custom styles to it
        // Be aware, modifiers could override the properties defined in the previous
        // lines of this modifier!
        setStyles(data.instance.popper, data.styles);
        // any property present in `data.attributes` will be applied to the popper,
        // they will be set as HTML attributes of the element
        setAttributes(data.instance.popper, data.attributes);
        // if the arrow style has been computed, apply the arrow style
        if (data.offsets.arrow) {
            setStyles(data.arrowElement, data.offsets.arrow);
        }
        return data;
    }
    /**
     * Set the x-placement attribute before everything else because it could be used
     * to add margins to the popper margins needs to be calculated to get the
     * correct popper offsets.
     * @method
     * @memberof Popper.modifiers
     * @param {HTMLElement} reference - The reference element used to position the popper
     * @param {HTMLElement} popper - The HTML element used as popper.
     * @param {Object} options - Popper.js options
     */
    function applyStyleOnLoad(reference, popper, options, modifierOptions, state) {
        // compute reference element offsets
        var referenceOffsets = getReferenceOffsets(state, popper, reference);
        // compute auto placement, store placement inside the data object,
        // modifiers will be able to edit `placement` if needed
        // and refer to originalPlacement to know the original value
        var placement = computeAutoPlacement(options.placement, referenceOffsets, popper, reference, options.modifiers.flip.boundariesElement, options.modifiers.flip.padding);
        popper.setAttribute('x-placement', placement);
        // Apply `position` to popper before anything else because
        // without the position applied we can't guarantee correct computations
        setStyles(popper, { position: 'absolute' });
        return options;
    }
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function computeStyle(data, options) {
        var x = options.x, y = options.y;
        var popper = data.offsets.popper;
        // Remove this legacy support in Popper.js v2
        var legacyGpuAccelerationOption = find(data.instance.modifiers, function (modifier) {
            return modifier.name === 'applyStyle';
        }).gpuAcceleration;
        if (legacyGpuAccelerationOption !== undefined) {
            console.warn('WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!');
        }
        var gpuAcceleration = legacyGpuAccelerationOption !== undefined ? legacyGpuAccelerationOption : options.gpuAcceleration;
        var offsetParent = getOffsetParent(data.instance.popper);
        var offsetParentRect = getBoundingClientRect(offsetParent);
        // Styles
        var styles = {
            position: popper.position
        };
        // floor sides to avoid blurry text
        var offsets = {
            left: Math.floor(popper.left),
            top: Math.floor(popper.top),
            bottom: Math.floor(popper.bottom),
            right: Math.floor(popper.right)
        };
        var sideA = x === 'bottom' ? 'top' : 'bottom';
        var sideB = y === 'right' ? 'left' : 'right';
        // if gpuAcceleration is set to `true` and transform is supported,
        //  we use `translate3d` to apply the position to the popper we
        // automatically use the supported prefixed version if needed
        var prefixedProperty = getSupportedPropertyName('transform');
        // now, let's make a step back and look at this code closely (wtf?)
        // If the content of the popper grows once it's been positioned, it
        // may happen that the popper gets misplaced because of the new content
        // overflowing its reference element
        // To avoid this problem, we provide two options (x and y), which allow
        // the consumer to define the offset origin.
        // If we position a popper on top of a reference element, we can set
        // `x` to `top` to make the popper grow towards its top instead of
        // its bottom.
        var left = void 0, top = void 0;
        if (sideA === 'bottom') {
            top = -offsetParentRect.height + offsets.bottom;
        }
        else {
            top = offsets.top;
        }
        if (sideB === 'right') {
            left = -offsetParentRect.width + offsets.right;
        }
        else {
            left = offsets.left;
        }
        if (gpuAcceleration && prefixedProperty) {
            styles[prefixedProperty] = 'translate3d(' + left + 'px, ' + top + 'px, 0)';
            styles[sideA] = 0;
            styles[sideB] = 0;
            styles.willChange = 'transform';
        }
        else {
            // othwerise, we use the standard `top`, `left`, `bottom` and `right` properties
            var invertTop = sideA === 'bottom' ? -1 : 1;
            var invertLeft = sideB === 'right' ? -1 : 1;
            styles[sideA] = top * invertTop;
            styles[sideB] = left * invertLeft;
            styles.willChange = sideA + ', ' + sideB;
        }
        // Attributes
        var attributes = {
            'x-placement': data.placement
        };
        // Update attributes and styles of `data`
        data.attributes = _extends({}, attributes, data.attributes);
        data.styles = _extends({}, styles, data.styles);
        return data;
    }
    /**
     * Helper used to know if the given modifier depends from another one.<br />
     * It checks if the needed modifier is listed and enabled.
     * @method
     * @memberof Popper.Utils
     * @param {Array} modifiers - list of modifiers
     * @param {String} requestingName - name of requesting modifier
     * @param {String} requestedName - name of requested modifier
     * @returns {Boolean}
     */
    function isModifierRequired(modifiers, requestingName, requestedName) {
        var requesting = find(modifiers, function (_ref) {
            var name = _ref.name;
            return name === requestingName;
        });
        var isRequired = !!requesting && modifiers.some(function (modifier) {
            return modifier.name === requestedName && modifier.enabled && modifier.order < requesting.order;
        });
        if (!isRequired) {
            var _requesting = '`' + requestingName + '`';
            var requested = '`' + requestedName + '`';
            console.warn(requested + ' modifier is required by ' + _requesting + ' modifier in order to work, be sure to include it before ' + _requesting + '!');
        }
        return isRequired;
    }
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function arrow(data, options) {
        // arrow depends on keepTogether in order to work
        if (!isModifierRequired(data.instance.modifiers, 'arrow', 'keepTogether')) {
            return data;
        }
        var arrowElement = options.element;
        // if arrowElement is a string, suppose it's a CSS selector
        if (typeof arrowElement === 'string') {
            arrowElement = data.instance.popper.querySelector(arrowElement);
            // if arrowElement is not found, don't run the modifier
            if (!arrowElement) {
                return data;
            }
        }
        else {
            // if the arrowElement isn't a query selector we must check that the
            // provided DOM node is child of its popper node
            if (!data.instance.popper.contains(arrowElement)) {
                console.warn('WARNING: `arrow.element` must be child of its popper element!');
                return data;
            }
        }
        var placement = data.placement.split('-')[0];
        var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
        var isVertical = ['left', 'right'].indexOf(placement) !== -1;
        var len = isVertical ? 'height' : 'width';
        var side = isVertical ? 'top' : 'left';
        var altSide = isVertical ? 'left' : 'top';
        var opSide = isVertical ? 'bottom' : 'right';
        var arrowElementSize = getOuterSizes(arrowElement)[len];
        //
        // extends keepTogether behavior making sure the popper and its reference have enough pixels in conjuction
        //
        // top/left side
        if (reference[opSide] - arrowElementSize < popper[side]) {
            data.offsets.popper[side] -= popper[side] - (reference[opSide] - arrowElementSize);
        }
        // bottom/right side
        if (reference[side] + arrowElementSize > popper[opSide]) {
            data.offsets.popper[side] += reference[side] + arrowElementSize - popper[opSide];
        }
        // compute center of the popper
        var center = reference[side] + reference[len] / 2 - arrowElementSize / 2;
        // Compute the sideValue using the updated popper offsets
        var sideValue = center - getClientRect(data.offsets.popper)[side];
        // prevent arrowElement from being placed not contiguously to its popper
        sideValue = Math.max(Math.min(popper[len] - arrowElementSize, sideValue), 0);
        data.arrowElement = arrowElement;
        data.offsets.arrow = {};
        data.offsets.arrow[side] = Math.round(sideValue);
        data.offsets.arrow[altSide] = ''; // make sure to unset any eventual altSide value from the DOM node
        return data;
    }
    /**
     * Get the opposite placement variation of the given one
     * @method
     * @memberof Popper.Utils
     * @argument {String} placement variation
     * @returns {String} flipped placement variation
     */
    function getOppositeVariation(variation) {
        if (variation === 'end') {
            return 'start';
        }
        else if (variation === 'start') {
            return 'end';
        }
        return variation;
    }
    /**
     * List of accepted placements to use as values of the `placement` option.<br />
     * Valid placements are:
     * - `auto`
     * - `top`
     * - `right`
     * - `bottom`
     * - `left`
     *
     * Each placement can have a variation from this list:
     * - `-start`
     * - `-end`
     *
     * Variations are interpreted easily if you think of them as the left to right
     * written languages. Horizontally (`top` and `bottom`), `start` is left and `end`
     * is right.<br />
     * Vertically (`left` and `right`), `start` is top and `end` is bottom.
     *
     * Some valid examples are:
     * - `top-end` (on top of reference, right aligned)
     * - `right-start` (on right of reference, top aligned)
     * - `bottom` (on bottom, centered)
     * - `auto-right` (on the side with more space available, alignment depends by placement)
     *
     * @static
     * @type {Array}
     * @enum {String}
     * @readonly
     * @method placements
     * @memberof Popper
     */
    var placements = ['auto-start', 'auto', 'auto-end', 'top-start', 'top', 'top-end', 'right-start', 'right', 'right-end', 'bottom-end', 'bottom', 'bottom-start', 'left-end', 'left', 'left-start'];
    // Get rid of `auto` `auto-start` and `auto-end`
    var validPlacements = placements.slice(3);
    /**
     * Given an initial placement, returns all the subsequent placements
     * clockwise (or counter-clockwise).
     *
     * @method
     * @memberof Popper.Utils
     * @argument {String} placement - A valid placement (it accepts variations)
     * @argument {Boolean} counter - Set to true to walk the placements counterclockwise
     * @returns {Array} placements including their variations
     */
    function clockwise(placement) {
        var counter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var index = validPlacements.indexOf(placement);
        var arr = validPlacements.slice(index + 1).concat(validPlacements.slice(0, index));
        return counter ? arr.reverse() : arr;
    }
    var BEHAVIORS = {
        FLIP: 'flip',
        CLOCKWISE: 'clockwise',
        COUNTERCLOCKWISE: 'counterclockwise'
    };
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function flip(data, options) {
        // if `inner` modifier is enabled, we can't use the `flip` modifier
        if (isModifierEnabled(data.instance.modifiers, 'inner')) {
            return data;
        }
        if (data.flipped && data.placement === data.originalPlacement) {
            // seems like flip is trying to loop, probably there's not enough space on any of the flippable sides
            return data;
        }
        var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, options.boundariesElement);
        var placement = data.placement.split('-')[0];
        var placementOpposite = getOppositePlacement(placement);
        var variation = data.placement.split('-')[1] || '';
        var flipOrder = [];
        switch (options.behavior) {
            case BEHAVIORS.FLIP:
                flipOrder = [placement, placementOpposite];
                break;
            case BEHAVIORS.CLOCKWISE:
                flipOrder = clockwise(placement);
                break;
            case BEHAVIORS.COUNTERCLOCKWISE:
                flipOrder = clockwise(placement, true);
                break;
            default:
                flipOrder = options.behavior;
        }
        flipOrder.forEach(function (step, index) {
            if (placement !== step || flipOrder.length === index + 1) {
                return data;
            }
            placement = data.placement.split('-')[0];
            placementOpposite = getOppositePlacement(placement);
            var popperOffsets = data.offsets.popper;
            var refOffsets = data.offsets.reference;
            // using floor because the reference offsets may contain decimals we are not going to consider here
            var floor = Math.floor;
            var overlapsRef = placement === 'left' && floor(popperOffsets.right) > floor(refOffsets.left) || placement === 'right' && floor(popperOffsets.left) < floor(refOffsets.right) || placement === 'top' && floor(popperOffsets.bottom) > floor(refOffsets.top) || placement === 'bottom' && floor(popperOffsets.top) < floor(refOffsets.bottom);
            var overflowsLeft = floor(popperOffsets.left) < floor(boundaries.left);
            var overflowsRight = floor(popperOffsets.right) > floor(boundaries.right);
            var overflowsTop = floor(popperOffsets.top) < floor(boundaries.top);
            var overflowsBottom = floor(popperOffsets.bottom) > floor(boundaries.bottom);
            var overflowsBoundaries = placement === 'left' && overflowsLeft || placement === 'right' && overflowsRight || placement === 'top' && overflowsTop || placement === 'bottom' && overflowsBottom;
            // flip the variation if required
            var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
            var flippedVariation = !!options.flipVariations && (isVertical && variation === 'start' && overflowsLeft || isVertical && variation === 'end' && overflowsRight || !isVertical && variation === 'start' && overflowsTop || !isVertical && variation === 'end' && overflowsBottom);
            if (overlapsRef || overflowsBoundaries || flippedVariation) {
                // this boolean to detect any flip loop
                data.flipped = true;
                if (overlapsRef || overflowsBoundaries) {
                    placement = flipOrder[index + 1];
                }
                if (flippedVariation) {
                    variation = getOppositeVariation(variation);
                }
                data.placement = placement + (variation ? '-' + variation : '');
                // this object contains `position`, we want to preserve it along with
                // any additional property we may add in the future
                data.offsets.popper = _extends({}, data.offsets.popper, getPopperOffsets(data.instance.popper, data.offsets.reference, data.placement));
                data = runModifiers(data.instance.modifiers, data, 'flip');
            }
        });
        return data;
    }
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function keepTogether(data) {
        var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
        var placement = data.placement.split('-')[0];
        var floor = Math.floor;
        var isVertical = ['top', 'bottom'].indexOf(placement) !== -1;
        var side = isVertical ? 'right' : 'bottom';
        var opSide = isVertical ? 'left' : 'top';
        var measurement = isVertical ? 'width' : 'height';
        if (popper[side] < floor(reference[opSide])) {
            data.offsets.popper[opSide] = floor(reference[opSide]) - popper[measurement];
        }
        if (popper[opSide] > floor(reference[side])) {
            data.offsets.popper[opSide] = floor(reference[side]);
        }
        return data;
    }
    /**
     * Converts a string containing value + unit into a px value number
     * @function
     * @memberof {modifiers~offset}
     * @private
     * @argument {String} str - Value + unit string
     * @argument {String} measurement - `height` or `width`
     * @argument {Object} popperOffsets
     * @argument {Object} referenceOffsets
     * @returns {Number|String}
     * Value in pixels, or original string if no values were extracted
     */
    function toValue(str, measurement, popperOffsets, referenceOffsets) {
        // separate value from unit
        var split = str.match(/((?:\-|\+)?\d*\.?\d*)(.*)/);
        var value = +split[1];
        var unit = split[2];
        // If it's not a number it's an operator, I guess
        if (!value) {
            return str;
        }
        if (unit.indexOf('%') === 0) {
            var element = void 0;
            switch (unit) {
                case '%p':
                    element = popperOffsets;
                    break;
                case '%':
                case '%r':
                default:
                    element = referenceOffsets;
            }
            var rect = getClientRect(element);
            return rect[measurement] / 100 * value;
        }
        else if (unit === 'vh' || unit === 'vw') {
            // if is a vh or vw, we calculate the size based on the viewport
            var size = void 0;
            if (unit === 'vh') {
                size = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
            }
            else {
                size = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
            }
            return size / 100 * value;
        }
        else {
            // if is an explicit pixel unit, we get rid of the unit and keep the value
            // if is an implicit unit, it's px, and we return just the value
            return value;
        }
    }
    /**
     * Parse an `offset` string to extrapolate `x` and `y` numeric offsets.
     * @function
     * @memberof {modifiers~offset}
     * @private
     * @argument {String} offset
     * @argument {Object} popperOffsets
     * @argument {Object} referenceOffsets
     * @argument {String} basePlacement
     * @returns {Array} a two cells array with x and y offsets in numbers
     */
    function parseOffset(offset, popperOffsets, referenceOffsets, basePlacement) {
        var offsets = [0, 0];
        // Use height if placement is left or right and index is 0 otherwise use width
        // in this way the first offset will use an axis and the second one
        // will use the other one
        var useHeight = ['right', 'left'].indexOf(basePlacement) !== -1;
        // Split the offset string to obtain a list of values and operands
        // The regex addresses values with the plus or minus sign in front (+10, -20, etc)
        var fragments = offset.split(/(\+|\-)/).map(function (frag) {
            return frag.trim();
        });
        // Detect if the offset string contains a pair of values or a single one
        // they could be separated by comma or space
        var divider = fragments.indexOf(find(fragments, function (frag) {
            return frag.search(/,|\s/) !== -1;
        }));
        if (fragments[divider] && fragments[divider].indexOf(',') === -1) {
            console.warn('Offsets separated by white space(s) are deprecated, use a comma (,) instead.');
        }
        // If divider is found, we divide the list of values and operands to divide
        // them by ofset X and Y.
        var splitRegex = /\s*,\s*|\s+/;
        var ops = divider !== -1 ? [fragments.slice(0, divider).concat([fragments[divider].split(splitRegex)[0]]), [fragments[divider].split(splitRegex)[1]].concat(fragments.slice(divider + 1))] : [fragments];
        // Convert the values with units to absolute pixels to allow our computations
        ops = ops.map(function (op, index) {
            // Most of the units rely on the orientation of the popper
            var measurement = (index === 1 ? !useHeight : useHeight) ? 'height' : 'width';
            var mergeWithPrevious = false;
            return op
                .reduce(function (a, b) {
                if (a[a.length - 1] === '' && ['+', '-'].indexOf(b) !== -1) {
                    a[a.length - 1] = b;
                    mergeWithPrevious = true;
                    return a;
                }
                else if (mergeWithPrevious) {
                    a[a.length - 1] += b;
                    mergeWithPrevious = false;
                    return a;
                }
                else {
                    return a.concat(b);
                }
            }, [])
                .map(function (str) {
                return toValue(str, measurement, popperOffsets, referenceOffsets);
            });
        });
        // Loop trough the offsets arrays and execute the operations
        ops.forEach(function (op, index) {
            op.forEach(function (frag, index2) {
                if (isNumeric(frag)) {
                    offsets[index] += frag * (op[index2 - 1] === '-' ? -1 : 1);
                }
            });
        });
        return offsets;
    }
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @argument {Number|String} options.offset=0
     * The offset value as described in the modifier description
     * @returns {Object} The data object, properly modified
     */
    function offset(data, _ref) {
        var offset = _ref.offset;
        var placement = data.placement, _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
        var basePlacement = placement.split('-')[0];
        var offsets = void 0;
        if (isNumeric(+offset)) {
            offsets = [+offset, 0];
        }
        else {
            offsets = parseOffset(offset, popper, reference, basePlacement);
        }
        if (basePlacement === 'left') {
            popper.top += offsets[0];
            popper.left -= offsets[1];
        }
        else if (basePlacement === 'right') {
            popper.top += offsets[0];
            popper.left += offsets[1];
        }
        else if (basePlacement === 'top') {
            popper.left += offsets[0];
            popper.top -= offsets[1];
        }
        else if (basePlacement === 'bottom') {
            popper.left += offsets[0];
            popper.top += offsets[1];
        }
        data.popper = popper;
        return data;
    }
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function preventOverflow(data, options) {
        var boundariesElement = options.boundariesElement || getOffsetParent(data.instance.popper);
        // If offsetParent is the reference element, we really want to
        // go one step up and use the next offsetParent as reference to
        // avoid to make this modifier completely useless and look like broken
        if (data.instance.reference === boundariesElement) {
            boundariesElement = getOffsetParent(boundariesElement);
        }
        var boundaries = getBoundaries(data.instance.popper, data.instance.reference, options.padding, boundariesElement);
        options.boundaries = boundaries;
        var order = options.priority;
        var popper = data.offsets.popper;
        var check = {
            primary: function primary(placement) {
                var value = popper[placement];
                if (popper[placement] < boundaries[placement] && !options.escapeWithReference) {
                    value = Math.max(popper[placement], boundaries[placement]);
                }
                return defineProperty({}, placement, value);
            },
            secondary: function secondary(placement) {
                var mainSide = placement === 'right' ? 'left' : 'top';
                var value = popper[mainSide];
                if (popper[placement] > boundaries[placement] && !options.escapeWithReference) {
                    value = Math.min(popper[mainSide], boundaries[placement] - (placement === 'right' ? popper.width : popper.height));
                }
                return defineProperty({}, mainSide, value);
            }
        };
        order.forEach(function (placement) {
            var side = ['left', 'top'].indexOf(placement) !== -1 ? 'primary' : 'secondary';
            popper = _extends({}, popper, check[side](placement));
        });
        data.offsets.popper = popper;
        return data;
    }
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function shift(data) {
        var placement = data.placement;
        var basePlacement = placement.split('-')[0];
        var shiftvariation = placement.split('-')[1];
        // if shift shiftvariation is specified, run the modifier
        if (shiftvariation) {
            var _data$offsets = data.offsets, reference = _data$offsets.reference, popper = _data$offsets.popper;
            var isVertical = ['bottom', 'top'].indexOf(basePlacement) !== -1;
            var side = isVertical ? 'left' : 'top';
            var measurement = isVertical ? 'width' : 'height';
            var shiftOffsets = {
                start: defineProperty({}, side, reference[side]),
                end: defineProperty({}, side, reference[side] + reference[measurement] - popper[measurement])
            };
            data.offsets.popper = _extends({}, popper, shiftOffsets[shiftvariation]);
        }
        return data;
    }
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by update method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function hide(data) {
        if (!isModifierRequired(data.instance.modifiers, 'hide', 'preventOverflow')) {
            return data;
        }
        var refRect = data.offsets.reference;
        var bound = find(data.instance.modifiers, function (modifier) {
            return modifier.name === 'preventOverflow';
        }).boundaries;
        if (refRect.bottom < bound.top || refRect.left > bound.right || refRect.top > bound.bottom || refRect.right < bound.left) {
            // Avoid unnecessary DOM access if visibility hasn't changed
            if (data.hide === true) {
                return data;
            }
            data.hide = true;
            data.attributes['x-out-of-boundaries'] = '';
        }
        else {
            // Avoid unnecessary DOM access if visibility hasn't changed
            if (data.hide === false) {
                return data;
            }
            data.hide = false;
            data.attributes['x-out-of-boundaries'] = false;
        }
        return data;
    }
    /**
     * @function
     * @memberof Modifiers
     * @argument {Object} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {Object} The data object, properly modified
     */
    function inner(data) {
        var placement = data.placement;
        var basePlacement = placement.split('-')[0];
        var _data$offsets = data.offsets, popper = _data$offsets.popper, reference = _data$offsets.reference;
        var isHoriz = ['left', 'right'].indexOf(basePlacement) !== -1;
        var subtractLength = ['top', 'left'].indexOf(basePlacement) === -1;
        popper[isHoriz ? 'left' : 'top'] = reference[placement] - (subtractLength ? popper[isHoriz ? 'width' : 'height'] : 0);
        data.placement = getOppositePlacement(placement);
        data.offsets.popper = getClientRect(popper);
        return data;
    }
    /**
     * Modifier function, each modifier can have a function of this type assigned
     * to its `fn` property.<br />
     * These functions will be called on each update, this means that you must
     * make sure they are performant enough to avoid performance bottlenecks.
     *
     * @function ModifierFn
     * @argument {dataObject} data - The data object generated by `update` method
     * @argument {Object} options - Modifiers configuration and options
     * @returns {dataObject} The data object, properly modified
     */
    /**
     * Modifiers are plugins used to alter the behavior of your poppers.<br />
     * Popper.js uses a set of 9 modifiers to provide all the basic functionalities
     * needed by the library.
     *
     * Usually you don't want to override the `order`, `fn` and `onLoad` props.
     * All the other properties are configurations that could be tweaked.
     * @namespace modifiers
     */
    var modifiers = {
        /**
         * Modifier used to shift the popper on the start or end of its reference
         * element.<br />
         * It will read the variation of the `placement` property.<br />
         * It can be one either `-end` or `-start`.
         * @memberof modifiers
         * @inner
         */
        shift: {
            /** @prop {number} order=100 - Index used to define the order of execution */
            order: 100,
            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,
            /** @prop {ModifierFn} */
            fn: shift
        },
        /**
         * The `offset` modifier can shift your popper on both its axis.
         *
         * It accepts the following units:
         * - `px` or unitless, interpreted as pixels
         * - `%` or `%r`, percentage relative to the length of the reference element
         * - `%p`, percentage relative to the length of the popper element
         * - `vw`, CSS viewport width unit
         * - `vh`, CSS viewport height unit
         *
         * For length is intended the main axis relative to the placement of the popper.<br />
         * This means that if the placement is `top` or `bottom`, the length will be the
         * `width`. In case of `left` or `right`, it will be the height.
         *
         * You can provide a single value (as `Number` or `String`), or a pair of values
         * as `String` divided by a comma or one (or more) white spaces.<br />
         * The latter is a deprecated method because it leads to confusion and will be
         * removed in v2.<br />
         * Additionally, it accepts additions and subtractions between different units.
         * Note that multiplications and divisions aren't supported.
         *
         * Valid examples are:
         * ```
         * 10
         * '10%'
         * '10, 10'
         * '10%, 10'
         * '10 + 10%'
         * '10 - 5vh + 3%'
         * '-10px + 5vh, 5px - 6%'
         * ```
         *
         * @memberof modifiers
         * @inner
         */
        offset: {
            /** @prop {number} order=200 - Index used to define the order of execution */
            order: 200,
            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,
            /** @prop {ModifierFn} */
            fn: offset,
            /** @prop {Number|String} offset=0
             * The offset value as described in the modifier description
             */
            offset: 0
        },
        /**
         * Modifier used to prevent the popper from being positioned outside the boundary.
         *
         * An scenario exists where the reference itself is not within the boundaries.<br />
         * We can say it has "escaped the boundaries" — or just "escaped".<br />
         * In this case we need to decide whether the popper should either:
         *
         * - detach from the reference and remain "trapped" in the boundaries, or
         * - if it should ignore the boundary and "escape with its reference"
         *
         * When `escapeWithReference` is set to`true` and reference is completely
         * outside its boundaries, the popper will overflow (or completely leave)
         * the boundaries in order to remain attached to the edge of the reference.
         *
         * @memberof modifiers
         * @inner
         */
        preventOverflow: {
            /** @prop {number} order=300 - Index used to define the order of execution */
            order: 300,
            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,
            /** @prop {ModifierFn} */
            fn: preventOverflow,
            /**
             * @prop {Array} [priority=['left','right','top','bottom']]
             * Popper will try to prevent overflow following these priorities by default,
             * then, it could overflow on the left and on top of the `boundariesElement`
             */
            priority: ['left', 'right', 'top', 'bottom'],
            /**
             * @prop {number} padding=5
             * Amount of pixel used to define a minimum distance between the boundaries
             * and the popper this makes sure the popper has always a little padding
             * between the edges of its container
             */
            padding: 5,
            /**
             * @prop {String|HTMLElement} boundariesElement='scrollParent'
             * Boundaries used by the modifier, can be `scrollParent`, `window`,
             * `viewport` or any DOM element.
             */
            boundariesElement: 'scrollParent'
        },
        /**
         * Modifier used to make sure the reference and its popper stay near eachothers
         * without leaving any gap between the two. Expecially useful when the arrow is
         * enabled and you want to assure it to point to its reference element.
         * It cares only about the first axis, you can still have poppers with margin
         * between the popper and its reference element.
         * @memberof modifiers
         * @inner
         */
        keepTogether: {
            /** @prop {number} order=400 - Index used to define the order of execution */
            order: 400,
            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,
            /** @prop {ModifierFn} */
            fn: keepTogether
        },
        /**
         * This modifier is used to move the `arrowElement` of the popper to make
         * sure it is positioned between the reference element and its popper element.
         * It will read the outer size of the `arrowElement` node to detect how many
         * pixels of conjuction are needed.
         *
         * It has no effect if no `arrowElement` is provided.
         * @memberof modifiers
         * @inner
         */
        arrow: {
            /** @prop {number} order=500 - Index used to define the order of execution */
            order: 500,
            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,
            /** @prop {ModifierFn} */
            fn: arrow,
            /** @prop {String|HTMLElement} element='[x-arrow]' - Selector or node used as arrow */
            element: '[x-arrow]'
        },
        /**
         * Modifier used to flip the popper's placement when it starts to overlap its
         * reference element.
         *
         * Requires the `preventOverflow` modifier before it in order to work.
         *
         * **NOTE:** this modifier will interrupt the current update cycle and will
         * restart it if it detects the need to flip the placement.
         * @memberof modifiers
         * @inner
         */
        flip: {
            /** @prop {number} order=600 - Index used to define the order of execution */
            order: 600,
            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,
            /** @prop {ModifierFn} */
            fn: flip,
            /**
             * @prop {String|Array} behavior='flip'
             * The behavior used to change the popper's placement. It can be one of
             * `flip`, `clockwise`, `counterclockwise` or an array with a list of valid
             * placements (with optional variations).
             */
            behavior: 'flip',
            /**
             * @prop {number} padding=5
             * The popper will flip if it hits the edges of the `boundariesElement`
             */
            padding: 5,
            /**
             * @prop {String|HTMLElement} boundariesElement='viewport'
             * The element which will define the boundaries of the popper position,
             * the popper will never be placed outside of the defined boundaries
             * (except if keepTogether is enabled)
             */
            boundariesElement: 'viewport'
        },
        /**
         * Modifier used to make the popper flow toward the inner of the reference element.
         * By default, when this modifier is disabled, the popper will be placed outside
         * the reference element.
         * @memberof modifiers
         * @inner
         */
        inner: {
            /** @prop {number} order=700 - Index used to define the order of execution */
            order: 700,
            /** @prop {Boolean} enabled=false - Whether the modifier is enabled or not */
            enabled: false,
            /** @prop {ModifierFn} */
            fn: inner
        },
        /**
         * Modifier used to hide the popper when its reference element is outside of the
         * popper boundaries. It will set a `x-out-of-boundaries` attribute which can
         * be used to hide with a CSS selector the popper when its reference is
         * out of boundaries.
         *
         * Requires the `preventOverflow` modifier before it in order to work.
         * @memberof modifiers
         * @inner
         */
        hide: {
            /** @prop {number} order=800 - Index used to define the order of execution */
            order: 800,
            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,
            /** @prop {ModifierFn} */
            fn: hide
        },
        /**
         * Computes the style that will be applied to the popper element to gets
         * properly positioned.
         *
         * Note that this modifier will not touch the DOM, it just prepares the styles
         * so that `applyStyle` modifier can apply it. This separation is useful
         * in case you need to replace `applyStyle` with a custom implementation.
         *
         * This modifier has `850` as `order` value to maintain backward compatibility
         * with previous versions of Popper.js. Expect the modifiers ordering method
         * to change in future major versions of the library.
         *
         * @memberof modifiers
         * @inner
         */
        computeStyle: {
            /** @prop {number} order=850 - Index used to define the order of execution */
            order: 850,
            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,
            /** @prop {ModifierFn} */
            fn: computeStyle,
            /**
             * @prop {Boolean} gpuAcceleration=true
             * If true, it uses the CSS 3d transformation to position the popper.
             * Otherwise, it will use the `top` and `left` properties.
             */
            gpuAcceleration: true,
            /**
             * @prop {string} [x='bottom']
             * Where to anchor the X axis (`bottom` or `top`). AKA X offset origin.
             * Change this if your popper should grow in a direction different from `bottom`
             */
            x: 'bottom',
            /**
             * @prop {string} [x='left']
             * Where to anchor the Y axis (`left` or `right`). AKA Y offset origin.
             * Change this if your popper should grow in a direction different from `right`
             */
            y: 'right'
        },
        /**
         * Applies the computed styles to the popper element.
         *
         * All the DOM manipulations are limited to this modifier. This is useful in case
         * you want to integrate Popper.js inside a framework or view library and you
         * want to delegate all the DOM manipulations to it.
         *
         * Note that if you disable this modifier, you must make sure the popper element
         * has its position set to `absolute` before Popper.js can do its work!
         *
         * Just disable this modifier and define you own to achieve the desired effect.
         *
         * @memberof modifiers
         * @inner
         */
        applyStyle: {
            /** @prop {number} order=900 - Index used to define the order of execution */
            order: 900,
            /** @prop {Boolean} enabled=true - Whether the modifier is enabled or not */
            enabled: true,
            /** @prop {ModifierFn} */
            fn: applyStyle,
            /** @prop {Function} */
            onLoad: applyStyleOnLoad,
            /**
             * @deprecated since version 1.10.0, the property moved to `computeStyle` modifier
             * @prop {Boolean} gpuAcceleration=true
             * If true, it uses the CSS 3d transformation to position the popper.
             * Otherwise, it will use the `top` and `left` properties.
             */
            gpuAcceleration: undefined
        }
    };
    /**
     * The `dataObject` is an object containing all the informations used by Popper.js
     * this object get passed to modifiers and to the `onCreate` and `onUpdate` callbacks.
     * @name dataObject
     * @property {Object} data.instance The Popper.js instance
     * @property {String} data.placement Placement applied to popper
     * @property {String} data.originalPlacement Placement originally defined on init
     * @property {Boolean} data.flipped True if popper has been flipped by flip modifier
     * @property {Boolean} data.hide True if the reference element is out of boundaries, useful to know when to hide the popper.
     * @property {HTMLElement} data.arrowElement Node used as arrow by arrow modifier
     * @property {Object} data.styles Any CSS property defined here will be applied to the popper, it expects the JavaScript nomenclature (eg. `marginBottom`)
     * @property {Object} data.boundaries Offsets of the popper boundaries
     * @property {Object} data.offsets The measurements of popper, reference and arrow elements.
     * @property {Object} data.offsets.popper `top`, `left`, `width`, `height` values
     * @property {Object} data.offsets.reference `top`, `left`, `width`, `height` values
     * @property {Object} data.offsets.arrow] `top` and `left` offsets, only one of them will be different from 0
     */
    /**
     * Default options provided to Popper.js constructor.<br />
     * These can be overriden using the `options` argument of Popper.js.<br />
     * To override an option, simply pass as 3rd argument an object with the same
     * structure of this object, example:
     * ```
     * new Popper(ref, pop, {
     *   modifiers: {
     *     preventOverflow: { enabled: false }
     *   }
     * })
     * ```
     * @type {Object}
     * @static
     * @memberof Popper
     */
    var Defaults = {
        /**
         * Popper's placement
         * @prop {Popper.placements} placement='bottom'
         */
        placement: 'bottom',
        /**
         * Whether events (resize, scroll) are initially enabled
         * @prop {Boolean} eventsEnabled=true
         */
        eventsEnabled: true,
        /**
         * Set to true if you want to automatically remove the popper when
         * you call the `destroy` method.
         * @prop {Boolean} removeOnDestroy=false
         */
        removeOnDestroy: false,
        /**
         * Callback called when the popper is created.<br />
         * By default, is set to no-op.<br />
         * Access Popper.js instance with `data.instance`.
         * @prop {onCreate}
         */
        onCreate: function onCreate() { },
        /**
         * Callback called when the popper is updated, this callback is not called
         * on the initialization/creation of the popper, but only on subsequent
         * updates.<br />
         * By default, is set to no-op.<br />
         * Access Popper.js instance with `data.instance`.
         * @prop {onUpdate}
         */
        onUpdate: function onUpdate() { },
        /**
         * List of modifiers used to modify the offsets before they are applied to the popper.
         * They provide most of the functionalities of Popper.js
         * @prop {modifiers}
         */
        modifiers: modifiers
    };
    /**
     * @callback onCreate
     * @param {dataObject} data
     */
    /**
     * @callback onUpdate
     * @param {dataObject} data
     */
    // Utils
    // Methods
    var Popper = function () {
        /**
         * Create a new Popper.js instance
         * @class Popper
         * @param {HTMLElement|referenceObject} reference - The reference element used to position the popper
         * @param {HTMLElement} popper - The HTML element used as popper.
         * @param {Object} options - Your custom options to override the ones defined in [Defaults](#defaults)
         * @return {Object} instance - The generated Popper.js instance
         */
        function Popper(reference, popper) {
            var _this = this;
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            classCallCheck(this, Popper);
            this.scheduleUpdate = function () {
                return requestAnimationFrame(_this.update);
            };
            // make update() debounced, so that it only runs at most once-per-tick
            this.update = debounce(this.update.bind(this));
            // with {} we create a new object with the options inside it
            this.options = _extends({}, Popper.Defaults, options);
            // init state
            this.state = {
                isDestroyed: false,
                isCreated: false,
                scrollParents: []
            };
            // get reference and popper elements (allow jQuery wrappers)
            this.reference = reference.jquery ? reference[0] : reference;
            this.popper = popper.jquery ? popper[0] : popper;
            // Deep merge modifiers options
            this.options.modifiers = {};
            Object.keys(_extends({}, Popper.Defaults.modifiers, options.modifiers)).forEach(function (name) {
                _this.options.modifiers[name] = _extends({}, Popper.Defaults.modifiers[name] || {}, options.modifiers ? options.modifiers[name] : {});
            });
            // Refactoring modifiers' list (Object => Array)
            this.modifiers = Object.keys(this.options.modifiers).map(function (name) {
                return _extends({
                    name: name
                }, _this.options.modifiers[name]);
            })
                .sort(function (a, b) {
                return a.order - b.order;
            });
            // modifiers have the ability to execute arbitrary code when Popper.js get inited
            // such code is executed in the same order of its modifier
            // they could add new properties to their options configuration
            // BE AWARE: don't add options to `options.modifiers.name` but to `modifierOptions`!
            this.modifiers.forEach(function (modifierOptions) {
                if (modifierOptions.enabled && isFunction(modifierOptions.onLoad)) {
                    modifierOptions.onLoad(_this.reference, _this.popper, _this.options, modifierOptions, _this.state);
                }
            });
            // fire the first update to position the popper in the right place
            this.update();
            var eventsEnabled = this.options.eventsEnabled;
            if (eventsEnabled) {
                // setup event listeners, they will take care of update the position in specific situations
                this.enableEventListeners();
            }
            this.state.eventsEnabled = eventsEnabled;
        }
        // We can't use class properties because they don't get listed in the
        // class prototype and break stuff like Sinon stubs
        createClass(Popper, [{
                key: 'update',
                value: function update$$1() {
                    return update.call(this);
                }
            }, {
                key: 'destroy',
                value: function destroy$$1() {
                    return destroy.call(this);
                }
            }, {
                key: 'enableEventListeners',
                value: function enableEventListeners$$1() {
                    return enableEventListeners.call(this);
                }
            }, {
                key: 'disableEventListeners',
                value: function disableEventListeners$$1() {
                    return disableEventListeners.call(this);
                }
                /**
                 * Schedule an update, it will run on the next UI update available
                 * @method scheduleUpdate
                 * @memberof Popper
                 */
                /**
                 * Collection of utilities useful when writing custom modifiers.
                 * Starting from version 1.7, this method is available only if you
                 * include `popper-utils.js` before `popper.js`.
                 *
                 * **DEPRECATION**: This way to access PopperUtils is deprecated
                 * and will be removed in v2! Use the PopperUtils module directly instead.
                 * Due to the high instability of the methods contained in Utils, we can't
                 * guarantee them to follow semver. Use them at your own risk!
                 * @static
                 * @private
                 * @type {Object}
                 * @deprecated since version 1.8
                 * @member Utils
                 * @memberof Popper
                 */
            }]);
        return Popper;
    }();
    /**
     * The `referenceObject` is an object that provides an interface compatible with Popper.js
     * and lets you use it as replacement of a real DOM node.<br />
     * You can use this method to position a popper relatively to a set of coordinates
     * in case you don't have a DOM node to use as reference.
     *
     * ```
     * new Popper(referenceObject, popperNode);
     * ```
     *
     * NB: This feature isn't supported in Internet Explorer 10
     * @name referenceObject
     * @property {Function} data.getBoundingClientRect
     * A function that returns a set of coordinates compatible with the native `getBoundingClientRect` method.
     * @property {number} data.clientWidth
     * An ES6 getter that will return the width of the virtual reference element.
     * @property {number} data.clientHeight
     * An ES6 getter that will return the height of the virtual reference element.
     */
    Popper.Utils = (typeof window !== 'undefined' ? window : global).PopperUtils;
    Popper.placements = placements;
    Popper.Defaults = Defaults;
    return Popper;
})));
(function () {
    (function (arr) {
        arr.forEach(function (item) {
            if (item.hasOwnProperty('prepend')) {
                return;
            }
            Object.defineProperty(item, 'prepend', {
                configurable: true,
                enumerable: true,
                writable: true,
                value: function prepend() {
                    var argArr = Array.prototype.slice.call(arguments), docFrag = document.createDocumentFragment();
                    argArr.forEach(function (argItem) {
                        var isNode = argItem instanceof Node;
                        docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                    });
                    this.insertBefore(docFrag, this.firstChild);
                }
            });
        });
    })([Element.prototype, Document.prototype, DocumentFragment.prototype]);
    function setVisibleTimeout(callback, delay) {
        var id = null, t = 0, prefix = '';
        'o webkit moz ms'.replace(/\S+/g, function (p) {
            if ((p + 'Hidden') in document) {
                prefix = p;
            }
        });
        function onVisibilityChange(event) {
            var now = +new Date(); // event.timeStamp is buggy in FF 10 (in microseconds)
            if (document[prefix ? prefix + 'Hidden' : 'hidden']) {
                if (id !== null) {
                    delay = Math.max(0, delay - Math.max(0, now - t)); // defense from now < t if clock jump occured
                    clearTimeout(id);
                    id = null;
                }
            }
            else {
                if (id === null) {
                    t = now;
                    id = setTimeout(function () {
                        id = null;
                        document.removeEventListener(prefix + 'visibilitychange', onVisibilityChange, false);
                        setTimeout(callback, 0);
                    }, delay);
                }
            }
        }
        document.addEventListener(prefix + 'visibilitychange', onVisibilityChange, false);
        onVisibilityChange({ timeStamp: +new Date() });
        return (function () {
            document.removeEventListener(prefix + 'visibilitychange', onVisibilityChange, false);
            if (id !== null) {
                clearTimeout(id);
                id = null;
            }
        });
    }
    /**
     * @description Ways to initiate a Formatic Element:
     *
     * <div class="formatic-plugin" data-id="SURVEY_ID"></div> // and then wait for this script to load
     *
     */
    var Asq = (function () {
        function Asq(config) {
            this.config = config;
            this.timeouts = [];
            this.hasMessages = false;
            if (!this.storageItemForRuleInstance)
                this.setStorageItemForRuleInstance({
                    isWidget: this.config.type.toLowerCase() === 'widget' ? true : false,
                    path: window.location.pathname,
                    id: config.id,
                    uid: config.uid
                });
        }
        Asq.prototype.setInitData = function (data) {
            if (this.config.type === 'inline')
                this.fmIFrame.style.backgroundColor = data.bg;
        };
        Asq.prototype.setMobile = function (isMobile) {
            this.fmIFrame.contentWindow.postMessage({
                mobile: isMobile
            }, '*');
        };
        Asq.prototype.setFs = function (isFs) {
            if (isFs && !Asq.isFs) {
                var html = document.documentElement.style.overflow || 'initial', body = document.body.style.overflow || 'initial';
                document.documentElement.dataset._ov = html;
                document.body.dataset._ov = body;
            }
            document.body.style.cssText += isFs ? 'overflow: hidden;' : "overflow: " + document.body.dataset._ov;
            document.documentElement.style.cssText += isFs ? 'overflow: hidden;' : "overflow: " + document.documentElement.dataset._ov;
            Asq.isFs = isFs;
        };
        ;
        Object.defineProperty(Asq.prototype, "hidden", {
            get: function () {
                return typeof this.storageItemForRuleInstance.isHidden !== 'undefined' ?
                    !!this.storageItemForRuleInstance.isHidden : false;
            },
            enumerable: true,
            configurable: true
        });
        Asq.prototype.setHidden = function (isHidden, noBubbling) {
            if (this.config.type !== 'context' &&
                this.config.type !== 'contextual')
                return;
            this.pluginEl.classList[isHidden ? 'add' : 'remove']('isHidden');
            this.setStorageItemForRuleInstance({ 'isHidden': isHidden });
            if (!noBubbling)
                this.fmIFrame.contentWindow.postMessage({
                    isHidden: isHidden ? true : false
                }, '*');
        };
        Asq.prototype.setActive = function (v, noBubbling) {
            var _this = this;
            this.isInside = true;
            var listnr = function (ev) {
                _this.setActive(false);
                ['touchstart', 'mousedown', 'scroll'].forEach(function (ev) {
                    _this.pluginEl.removeEventListener('mouseenter', isInsideT);
                    _this.pluginEl.removeEventListener('mouseleave', isInsideF);
                    document.removeEventListener(ev, listnr);
                });
            };
            this._expanded = v;
            if (!v)
                this.pluginEl.classList.remove('isActive');
            else {
                this.fmIFrame.contentWindow.postMessage({
                    fs: Asq.isMobile ? true : false
                }, '*');
                if (!Asq.isMobile) {
                    this.pluginEl.classList.add('isActive');
                }
                else {
                    this.pluginEl.classList.add('preExpanding');
                    // reflow
                    this.pluginEl.getBoundingClientRect();
                    this.pluginEl.classList.add('isExpanding');
                    // reflow
                    // getComputedStyle(this.pluginEl).
                    this.pluginEl.getBoundingClientRect();
                    var te_1 = function () {
                        _this.pluginEl.classList.remove('isExpanding');
                        _this.pluginEl.classList.remove('preExpanding');
                        _this.pluginEl.removeEventListener('transitionend', te_1);
                    };
                    this.pluginEl.addEventListener('transitionend', te_1);
                    this.pluginEl.classList.add('isActive');
                }
            }
            if (!noBubbling)
                this.fmIFrame.contentWindow.postMessage({
                    expanded: v ? true : false
                }, '*');
            if (!v ||
                this.config.type !== 'inline')
                return;
            // listnrs. only relevant for non inline.
            var isInsideT = function () {
                _this.isInside = true;
            };
            this.pluginEl.addEventListener('mouseenter', isInsideT);
            var isInsideF = function () {
                _this.isInside = false;
            };
            this.pluginEl.addEventListener('mouseleave', isInsideF);
            ['touchstart', 'mousedown'].forEach(function (ev) { return document.addEventListener(ev, listnr); });
            this.intV = setInterval(function () {
                if (_this.isInside)
                    return;
                clearInterval(_this.intV);
                _this.setActive(false);
                ['touchstart', 'mousedown', 'scroll'].forEach(function (ev) { return document.removeEventListener(ev, listnr); });
            }, 1000);
            // parent = this.pluginEl.parentNode;
            // do {
            //   if (v) { // is expanded.
            //     const z = getComputedStyle(parent).zIndex;
            //     parent.dataset.asqZ = z// save it.
            //     parent.style.zIndex = 2147483646;
            //   } else {
            //     const z = parent.dataset.asqZ || 0;
            //     parent.style.zIndex = z;
            //   }
            //   // if (!parent.parentNode)
            //   //   parent.style.zIndex = 2147483646;
            //   parent = parent.parentNode;
            // } while (parent !== document.body)
        };
        Object.defineProperty(Asq.prototype, "expanded", {
            get: function () {
                return this._expanded;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Asq, "isMobile", {
            get: function () {
                return window.outerWidth <= 500;
            },
            enumerable: true,
            configurable: true
        });
        Asq.prototype.init = function () {
            var _this = this;
            return new Promise(function (resolve, reject) {
                _this._init().then(function () {
                    _this.setMobile(Asq.isMobile);
                    // ['touchstart', 'mouseenter'].forEach(ev => this.pluginEl.addEventListener(ev, () => {
                    //   if (this.config.type !== 'contextual')
                    //     this.onSurveyActive();
                    // }));
                    resolve();
                });
            });
        };
        Asq.prototype.setTitle = function () {
        };
        Object.defineProperty(Asq.prototype, "storageItemForRuleInstance", {
            // _open: boolean;
            get: function () {
                return Asq.getStorageObj()[this.config.uid];
            },
            enumerable: true,
            configurable: true
        });
        Asq.prototype.setStorageItemForRuleInstance = function (value) {
            var newObj = Object.assign({}, this.storageItemForRuleInstance, value);
            Asq.setStorageItem(this.config.uid, newObj);
        };
        Object.defineProperty(Asq.prototype, "isLoading", {
            set: function (b) {
                console.log('Loading');
                if (!b) {
                    this.loadScreen.style.display = 'none';
                    this.loadScreen.style.opacity = '0';
                }
                else {
                    this.loadScreen.style.display = 'block';
                    this.loadScreen.style.opacity = '1';
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @description Only used by 'inline' currently
         * @param height number
         */
        Asq.prototype.setHeight = function (height) { };
        /**
         * @description Begins the conversation, skipping the welcome screen.
         */
        Asq.prototype.startSurveying = function () {
            // Iframe could be detached at this point, if the user killed this b4 this event was called
            // (since it can be called from a timeout).
            this.started = true;
            if (!this.fmIFrame.contentWindow)
                return this.teardown();
            this.fmIFrame.contentWindow.postMessage({
                start: true
            }, '*');
        };
        ;
        Asq.prototype.attach = function () {
            var _this = this;
            this.pluginEl.classList.remove('displayNone');
            setVisibleTimeout(function () {
                _this.pluginEl.classList.remove('detached');
            }, 0);
        };
        Asq.prototype.onSurveyActive = function () {
            if (!this.expanded)
                this.setActive(true);
        };
        //—————————————————————————————————————————————
        //
        //
        // Event handlers
        //
        //
        //—————————————————————————————————————————————
        Asq.prototype.createClickHandler = function () {
            var _this = this;
            var el = document.getElementById(this.config.eventData.charAt(0) === '#' ? this.config.eventData.slice(1) : this.config.eventData);
            if (!el)
                throw new Error('Did not find an ID for element name passed to config.showData => ' + this.config.eventData);
            // if (typeof parseInt(<string>config.showData) !== 'number') throw new Error('Argument provided to showData is not a number');
            var clickEventHandler = function () {
                _this.attach();
                _this.setHidden(!_this.hidden);
                // this.fmIFrame.contentWindow.postMessage({
                //   isHidden: this.isHidden
                // }, '*');
                if (!_this.started)
                    _this.setHiddenToFalseAndStartSurveying(true);
            };
            el.addEventListener('click', clickEventHandler);
        };
        Asq.prototype.createHoverHandler = function () {
            var _this = this;
            var hoverEventHandler = function () {
                _this.setHiddenToFalseAndStartSurveying();
                _this.config.parent.removeEventListener('mouseover', hoverEventHandler);
            };
            this.config.parent.addEventListener('mouseover', hoverEventHandler);
        };
        Asq.prototype.createTimeoutHandler = function () {
            var _this = this;
            if (isNaN(this.config.eventData))
                throw new Error('Did not pass a number to data-load-data=""');
            this.timeouts.push(setVisibleTimeout(function () {
                _this.setHiddenToFalseAndStartSurveying();
            }, parseInt(this.config.eventData + '000')));
        };
        /**
         * @description
         * @param c.showData {string | number | null} — the number of px scrolled before the element shows. if
         * the value passed in is not the string version of a number, we will attach an event that will
         * make the survey show up when the element is scrolled into view.
         */
        Asq.prototype.waitForIntersection = function () {
            var _this = this;
            var observer = new IntersectionObserver(function (item) {
                if (!item[0].isIntersecting)
                    return;
                _this.setHiddenToFalseAndStartSurveying();
                observer.unobserve(_this.config.parent);
            }, { threshold: .5 });
            observer.observe(this.config.parent);
        };
        /**
         * @description An event has occurred.
         */
        Asq.prototype.setHiddenToFalseAndStartSurveying = function (noDelay) {
            var _this = this;
            this.attach();
            // let it sink in.
            setVisibleTimeout(function () {
                _this.setHidden(false);
                if (!_this.config.showWelcomeScreen)
                    _this.startSurveying();
            }, noDelay ? 0 : 1000);
        };
        /**
         * @description Make the call to get data.
         * Mark this survey as having been loaded.
         */
        Asq.prototype.load = function (setHiddenToFalseByDefault) {
            var _this = this;
            var cleanse = function (config) { var k = {}; Object.keys(config).forEach(function (key) { return k[key] = key !== 'parent' && key !== 'configs' ? config[key] : null; }); return k; };
            this.isLoading = true;
            return new Promise(function (resolve, reject) {
                _this.fmIFrame.src = Asq.origin + _this.config.id;
                _this.fmIFrame.onload = function () {
                    if (!_this.fmIFrame.contentWindow)
                        throw new Error('Did not receive a valid HTML response. Did you pass the correct surveyId?');
                    var k = cleanse(_this.config);
                    // this wont always be the global config.
                    if (!k.platform)
                        k = Object.assign({}, k, cleanse(_this.config));
                    _this.fmIFrame.contentWindow.postMessage({
                        id: k.id,
                        uid: k.uid,
                        config: Object.assign({}, k, { isHidden: typeof setHiddenToFalseByDefault !== 'undefined' ? false : (_this.storageItemForRuleInstance.isHidden || false) })
                    }, '*');
                    _this.isLoading = false;
                    resolve();
                };
            });
        };
        Asq.prototype.teardown = function () {
            if (this.obs)
                this.obs.disconnect();
            if (this.popper)
                this.popper.destroy();
            this.config.parent.remove();
            this.pluginEl.remove();
            this.timeouts.forEach(function (timeout) { return clearTimeout(timeout); });
            Asq.surveyInstances.splice(Asq.surveyInstances.map(function (s) { return s.config.uid; }).indexOf(this.config.uid), 1);
        };
        Asq.prototype.incrementUnreadCount = function (id) {
        };
        /**
         * @description we received a message from the server.
         */
        Asq.prototype.messageReceived = function (message) {
            // if (message.type === 'widget')
            //     this.incrementUnreadCount(message.id);
        };
        /**
         * @description we received a message from the user.
         */
        /**
         * @override
         */
        Asq.prototype.responseReceived = function () {
            this.setActive(true);
        };
        Asq.prototype.createIFrame = function (div, id) {
            // Chrome has issues with iFrame styles so we need to make sure they are wrapped.
            var fmIFrame = document.createElement('iframe');
            fmIFrame.setAttribute('scrolling', 'no');
            fmIFrame.setAttribute('allowTransparency', 'true');
            fmIFrame.dataset.id = id;
            div.appendChild(fmIFrame);
            return div;
        };
        Asq.prototype.createListItem = function (config) {
            var div = document.createElement('div');
            div.classList.add('fm-list-item');
            div.innerHTML = config.id;
            div.dataset.id = config.id;
            div.addEventListener('click', function (ev) {
                Asq.widgetList.classList.add('fm-hide');
                var el = Asq.widgetList.querySelector("[data-id=\"" + ev.target.dataset.id + "\"]");
                if (!el)
                    throw new Error('Cant find element');
                el.classList.remove('fm-hide');
            });
            return div;
        };
        Asq.prototype.addEventHandlers = function (event) {
            // At this point elements have been styled and frames have been attached. Now let's add our event listener.
            switch (event || this.config.event) {
                case 'click':
                    this.createClickHandler();
                    break;
                case 'hover':
                    this.createHoverHandler();
                    break;
                case 'onload':
                    this.setHiddenToFalseAndStartSurveying();
                    break;
                case 'scroll':
                    this.waitForIntersection();
                    break;
                case 'timeout':
                    this.createTimeoutHandler();
                    break;
            }
        };
        Asq.getStorageObj = function () {
            var configStr = window.localStorage.getItem('__asq__client__storage__item__');
            var config;
            try {
                config = JSON.parse(configStr) || {};
            }
            catch (e) {
                throw new Error("Could not load the client data.");
            }
            ;
            return config;
        };
        ;
        Asq.setStorageItem = function (key, value) {
            var obj = Asq.getStorageObj();
            var config;
            obj[key] = value;
            try {
                config = JSON.stringify(obj) || JSON.stringify({});
            }
            catch (e) {
                throw new Error("Could not load the client data.");
            }
            ;
            window.localStorage.setItem('__asq__client__storage__item__', config);
        };
        ;
        /**
         * @description We do a few things here.
         * The most important thing to do is to save session data.
         *
         */
        Asq.onLibraryLoad = function () {
            // if (window.location.host === 'localhost:1337' || window.location.host === 'app.localhost.io:1337')
            //     Asq.origin = 'http://localhost:1337/';
            var storage = Asq.getStorageObj();
            var data = {
                t: new Date().getTime(),
                path: window.location.pathname
            };
            var session = storage.session || [];
            session.push(data);
            Asq.setStorageItem('session', session);
            window.addEventListener("message", function (event) {
                if (typeof event !== 'object' || !event.data)
                    return;
                if (!event.data || !event.data.id && !event.data.uid)
                    return;
                if (event.data.uid === 'blank')
                    return console.log('Survey for a test!');
                var survey;
                if (event.data.uid) {
                    survey = Asq.surveyInstances[Asq.surveyInstances.map(function (survey) { return parseInt(survey.config.uid); }).indexOf(parseInt(event.data.uid))];
                    if (!survey)
                        throw new Error('Something went terribly wrong');
                }
                if (event.data.name === 'click')
                    survey.onSurveyActive();
                if (event.data.name === 'start')
                    console.log();
                if (event.data.name === 'initData')
                    survey.setInitData(event.data.value);
                if (event.data.name === 'message')
                    survey.messageReceived(event.data.value);
                if (event.data.name === 'menu')
                    survey.changeScreenState();
                if (event.data.name === 'fs')
                    survey.setFs(event.data.value);
                /**
                 * @description User clicked or typed
                 */
                if (event.data.name === 'response')
                    survey.responseReceived(event.data.value);
                /**
                 * @description Clicks on back button will cause the state to change here.
                 */
                if (event.data.name === 'grow')
                    survey.setHeight(event.data.value);
                /**
                 * @description Expands the widget when a response is received
                 * if the viewport is mobile.
                 */
                if (event.data.name === 'surveyName')
                    survey.setTitle(event.data.value);
                if (event.data.name === 'isHidden')
                    survey.setHidden(!!event.data.value, true);
                if (event.data.name === 'expanded')
                    survey.setActive(!!event.data.value, true);
            }, false);
            var styles = document.createElement('style');
            styles.innerHTML = "\n            div#orbs {\n            }\n            div#orbs:after {\n                position: absolute;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                z-index: -1;\n                content: '';\n                border-radius: 100%;\n                animation: scaleUp 2s linear infinite;\n            }\n            @keyframes scaleUp {\n                0% {\n                    opacity: 1;\n                background: #a1f7f0;\n                transform: scale(0);\n                }\n                100% {\n                background: rgba(161, 247, 240, 0); \n                transform: scale(4);\n                }\n            }\n            @-webkit-keyframes fm-rotating {\n                from {\n                    transform: rotate(0deg)\n                }\n                to {\n                    transform: rotate(-360deg)\n                }\n            }\n            @keyframes fm-rotating {\n                from { \n                    transform: rotate(0deg)\n                }\n                to {\n                    transform: rotate(-360deg)\n                }\n            }\n            #fm-widget { \n                right: 0;\n                bottom: 0px;\n                height: 0;\n                z-index: 2147483647;\n                position: fixed;\n                margin: 0;\n                transition: all .5s linear;\n            }\n            #fm-widget.isHidden {\n              width: 200px!important;\n            }\n            #fm-widget.fm-widget-desktop, #fm-widget.fm-widget-desktop.isUntouched { \n                width: 400px;\n            }\n            #fm-widget.fm-widget-mobile, #fm-widget.fm-widget-mobile.isUntouched  {\n                width: 100vw;\n            }\n            #fm-widget.isHidden.isUntouched .fm-plugin {\n                opacity: 0;\n                transform: translateY(25px);\n                visibility: hidden\n            }\n            #fm-widget .fm-plugin { \n                height: 100%;\n                bottom: 0;\n                transition: transform .5s, opacity .5s, visibility .5s, height .5s linear, bottom .5s linear;\n            }\n            .fm-plugin.isExpanding {\n              transition: opacity .5s linear, visibility .5s linear!important;\n            }\n            .fm-plugin.preExpanding {\n              visibility: hidden;\n              opacity: 0;\n            }\n            .fm-plugin.isActive {\n              opacity: 1!important;\n              visibility: visible!important;\n            }\n            #fm-widget.isActive { \n                top: 0px;\n                left: 0px;\n                right: 0px;\n                bottom: 0px;\n                height: 100%!important;\n                width: 100%  \n            }\n            #fm-widget.isActive .fm-plugin {\n                height: 100%!important;\n                bottom: 0!important;\n            }\n            #fm-widget .fm-trigger-wrap {\n                height: 65px;\n                width: 65px\n            }\n            #fm-widget #fm-widget-list {\n                margin-top: 25px;\n                height: calc(100% - 35px);\n                display: block;\n                background: white;\n                right: 10px;\n                position: absolute;\n                bottom: 10px;\n                width: calc(100% - 20px);\n                border-radius: 10px;\n                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2)\n            }\n            #fm-widget #fm-widget-list.isHidden {\n                opacity: 0;\n                transform: translateY(25px);\n                visibility: hidden\n            }\n            #fm-widget #fm-widget-list #fm-widget-list-header {\n                box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.2);\n                z-index: 10;\n                border-radius: 5px 5px 0 0;\n                color: white;\n                font-weight: 400;\n                height: 50px;\n                display: block;\n                background: linear-gradient(135deg, #0077fa, #0f5db3);\n                padding: 1em;\n                height: 50px;\n                box-sizing: border-box\n            }\n            #fm-widget #fm-widget-list .fm-list-item {\n                width: 100% !important;\n                display: block !important;\n                box-sizing: border-box;\n                cursor: pointer;\n                border-bottom: 1px solid #dbe1e5\n            }\n            #fm-widget #fm-widgets {\n                height: 100%\n            }\n            .fm-plugin iframe {\n                height:100%;\n                border:0;\n                width: 1px;\n                min-width: 100%;\n            }\n            .fm-plugin {\n                all: initial;\n                position: relative;\n                opacity: 1;\n                display: block;\n                visibility: visible;\n                transition: height .5s linear;\n                transform: translateY(0);\n                z-index: 2147483647\n            }\n            body.asqDrawerShow:after {\n                background: rgba(0, 0, 0, 0.6);\n                opacity: 1;\n                visibility: visible;\n            }\n            body:after {\n                position: fixed;\n                top: 0;\n                left: 0;\n                right: 0;\n                bottom: 0;\n                content: '';\n                z-index: 2147483646;\n                visibility: hidden;\n                opacity: 0;\n                transition: visibility .2s linear, background-color .2s linear, opacity .2s linear;\n            }\n            .fm-plugin.asq-drawer {\n              height: 100%;\n              top: 0;\n              width: 300px;\n              display: block;\n              position: fixed;\n              transition: right .2s linear;\n              right: 0;\n            }\n            .fm-plugin.asq-drawer.isHidden {\n              right: calc(0% - 300px);\n            }\n            /* .fm-plugin.asq-inline.isActive {\n              box-shadow: 0 10px 170px -20px #dbe1e5;\n              padding: 10%;\n              left: -10%;\n              top: -10%;\n              border-radius: 30px;\n            } */\n            .fm-plugin.asq-inline {\n                min-height: 50px;\n                height: 100%;\n                width: 100%;\n                left: 0;\n                top: 0;\n                padding: 0;\n                border-radius: 0px;\n                box-shadow: 0 10px 170px -20px rgba(0,0,0,0);\n                transition: width .5s linear, top .5s linear, left .5s linear, box-shadow .5s linear, padding .5s linear, border-radius .5s linear;\n            }\n            /*.fm-plugin.isHidden {\n                opacity: 0;\n            }*/\n            .fm-plugin .fm-rotating {\n                animation: fm-rotating 3s linear infinite\n            }\n            .fm-plugin * {\n                all: unset;\n                font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", \"Roboto\", \"Oxygen\", \"Ubuntu\", \"Cantarell\", \"Fira Sans\", \"Droid Sans\", \"Helvetica Neue\", sans-serif\n            }\n            .fm-plugin.fm-context.top .fm-context-inner {\n                box-shadow: 0 20px 110px -20px rgba(0, 0, 0, 0.7);\n            } \n            .fm-plugin.fm-context {\n                width: 300px;\n                height: 1px;\n                border-radius: 10px;\n                // transition: height .5s linear, opacity .5s linear, width .5s linear, bottom .5s linear, right .5s linear; \n            }\n            .fm-plugin.fm-context .fm-context-inner {\n                height: 1px;\n                display: block;\n                /* for bottom positioning only */\n                position: relative;\n                border-radius: 15px;\n                box-shadow:  0 50px 110px -20px rgba(0, 0, 0, 0.7);\n                transition: opacity .5s linear, bottom .5s linear, transform .5s linear, visibility .5s linear, height .5s linear; \n                opacity: 1;\n                overflow: hidden;\n                visibility: visible;  \n            }\n            .fm-plugin.fm-context .fm-context-inner.vertical-center {\n                position: relative;\n                transform: translate(0, -50%);\n            }\n            .fm-plugin.fm-context.isHidden .fm-context-inner {\n                opacity: 0;\n                transform: translateY(25px);\n                visibility: hidden;\n            }\n            .fm-plugin.fm-context.isHidden .fm-context-inner.vertical-center {\n                opacity: 0;\n                transform: translate(0, -50% + 25px);\n                visibility: hidden;\n            }\n            .fm-plugin.displayNone, asq-attention.displayNone {\n                display: none;\n            }\n            .asq-attention.detached {\n                opacity: 0!important;\n                visibility: hidden!important;\n            }\n            .asq-attention {\n                opacity: 1;\n                visibility: visible;\n                transition: opacity .5s linear, visibility .5s linear;\n            }\n            .asq-attention.right {\n                top: calc(50% - 7px);\n                left: calc(0% - 7px);\n            }\n            .asq-attention.left {\n                top: calc(50% - 7px);\n                right: calc(0% - 7px);\n            }\n            .asq-attention.bottom {\n                left: calc(50% - 7px);\n                top: -7px;\n            }\n            .asq-attention.top {\n                left: calc(50% - 7px);\n                bottom: -7px;\n            }\n            /*.fm-plugin.fm-context.isHidden .asq-attention-outer-dot, .fm-plugin.fm-context.isHidden .asq-attention-inner-dot, .fm-plugin.fm-context.isHidden .asq-attention-inner-dot:after {*/\n            .asq-attention-outer-dot, .asq-attention-inner-dot, .asq-attention-inner-dot:after {\n                all: unset;\n                -webkit-animation: asq-attention-pulse 1.5s linear infinite;\n                -moz-animation: asq-attention-pulse 1.5s linear infinite; \n                -o-animation: asq-attention-pulse 1.5s linear infinite;\n                animation: asq-attention-pulse 1.5s linear infinite\n            }\n            .fm-plugin path {\n                d: path(\"M 384 128 c 0 -70.692 57.308 -128 128 -128 s 128 57.308 128 128 c 0 70.692 -57.308 128 -128 128 s -128 -57.308 -128 -128 Z M 790.994 512 c 0 0 0 0 0 0 c 0 -57.993 47.013 -105.006 105.006 -105.006 s 105.006 47.013 105.006 105.006 c 0 0 0 0 0 0 c 0 57.993 -47.013 105.006 -105.006 105.006 s -105.006 -47.013 -105.006 -105.006 Z M 688.424 783.53 c 0 -52.526 42.58 -95.106 95.106 -95.106 s 95.106 42.58 95.106 95.106 c 0 52.526 -42.58 95.106 -95.106 95.106 s -95.106 -42.58 -95.106 -95.106 Z M 425.862 896 c 0 -47.573 38.565 -86.138 86.138 -86.138 s 86.138 38.565 86.138 86.138 c 0 47.573 -38.565 86.138 -86.138 86.138 s -86.138 -38.565 -86.138 -86.138 Z M 162.454 783.53 c 0 -43.088 34.93 -78.018 78.018 -78.018 s 78.018 34.93 78.018 78.018 c 0 43.088 -34.93 78.018 -78.018 78.018 s -78.018 -34.93 -78.018 -78.018 Z M 57.338 512 c 0 -39.026 31.636 -70.662 70.662 -70.662 s 70.662 31.636 70.662 70.662 c 0 39.026 -31.636 70.662 -70.662 70.662 s -70.662 -31.636 -70.662 -70.662 Z M 176.472 240.472 c 0 0 0 0 0 0 c 0 -35.346 28.654 -64 64 -64 s 64 28.654 64 64 c 0 0 0 0 0 0 c 0 35.346 -28.654 64 -64 64 s -64 -28.654 -64 -64 Z M 899.464 240.472 c 0 64.024 -51.906 115.934 -115.936 115.934 c -64.024 0 -115.936 -51.91 -115.936 -115.934 c 0 -64.032 51.912 -115.934 115.936 -115.934 c 64.03 0 115.936 51.902 115.936 115.934 Z\") !important\n            }\n            [data-type=inline] {\n                height: 100%\n            }\n            [data-type=inline]>.fm-plugin {\n                height: 100%\n            }\n            .fm-trigger-wrap {\n                cursor: pointer;\n                position: fixed;\n                z-index: 1000;\n                bottom: 20px;\n                right: 20px\n            }\n            .fm-trigger-wrap.fm-context-trigger {\n                width: 20px;\n                height: 20px;\n                position: absolute\n            }\n            .fm-notifications {\n                display: none;\n                position: absolute;\n                top: 0;\n                left: 0;\n                height: 15px;\n                width: 15px;\n                background: #fc6666;\n                z-index: 101;\n                border-radius: 100%;\n                font-size: 10px;\n                text-align: center;\n                line-height: 14px;\n                color: white\n            }\n            .fm-trigger-frame {\n                border: 0;\n                width: 100%;\n                height: 100%;\n                border-radius: 50%;\n                display: block;\n                box-shadow: 0 3px 7px rgba(0, 0, 0, 0.15804)\n            }\n            style {\n                display: none !important\n            }\n            @media (max-width: 600px) {\n                .fm-trigger-wrap {\n                    bottom: 10px;\n                    right: 10px\n                }\n                .fm-plugin.asq-inline.isExpanding, .fm-plugin.fm-context.isExpanding {\n                    width: 100%;\n                    height: 100%;\n                    top: 0;\n                    left: 0;\n                    right: 0;\n                    bottom: 0;\n                    padding: 0;\n                    position: fixed!important;\n                    transform: initial!important;\n                }\n                .fm-plugin.asq-inline.isActive, .fm-plugin.fm-context.isActive {\n                    width: 100%;\n                    height: 100%;\n                    top: 0;\n                    left: 0;\n                    right: 0;\n                    bottom: 0;\n                    padding: 0;\n                    position: fixed;\n                    background: white;\n                    border-radius: 0;\n                }\n                .fm-plugin.fm-context.isActive .fm-context-inner {\n                  height: 100%!important;\n                  transform: initial!important;\n                  border-radius: 0;\n                }\n                .fm-plugin.fm-context.isActive {\n                  transform: initial!important;\n                  will-change: initial!important;\n                  position: fixed!important;\n                  z-index: 2147483647;\n                  height: 100% !important; \n                  width: 100% !important;\n              }\n            }\n\n            .asq-attention {\n                display: block;\n                position: absolute;\n                width: 12px;\n                height: 12px;\n                cursor: pointer;\n            }\n\n            .asq-attention:hover:after {\n                background-color: #0095ff\n            }\n\n            .asq-attention:after {\n                content: \"\";\n                background-color: #3af;\n                width: 100%;\n                height: 100%;\n                border-radius: 50%;\n                position: absolute;\n                display: block;\n                top: 1px;\n                left: 1px\n            }\n\n            .asq-attention .asq-attention-outer-dot {\n                margin: 1px;\n                display: block;\n                text-align: center;\n                opacity: 1;\n                background-color: rgba(0, 149, 255, 0.4);\n                width: 100%;\n                height: 100%;\n                border-radius: 50%;\n            }\n\n            .asq-attention .asq-attention-inner-dot {\n                background-position: absolute;\n                display: block;\n                text-align: center;\n                opacity: 1;\n                background-color: rgba(0, 149, 255, 0.4);\n                width: 100%;\n                height: 100%;\n                border-radius: 50%;\n            }\n\n            .asq-attention .asq-attention-inner-dot:after {\n                content: \"\";\n                background-position: absolute;\n                display: block;\n                text-align: center;\n                opacity: 1;\n                background-color: rgba(0, 149, 255, 0.4);\n                width: 100%;\n                height: 100%;\n                border-radius: 50%;\n            }\n            @-webkit-keyframes asq-attention-pulse {\n                0% {\n                    transform: scale(1);\n                    opacity: .75\n                }\n                25% {\n                    transform: scale(1);\n                    opacity: .75\n                }\n                100% {\n                    transform: scale(2.5);\n                    opacity: 0\n                }\n            }\n\n            @keyframes asq-attention-pulse {\n                0% {\n                    transform: scale(1);\n                    opacity: .75\n                }\n                25% {\n                    transform: scale(1);\n                    opacity: .75\n                }\n                100% {\n                    transform: scale(2.5);\n                    opacity: 0\n                }\n            }\n\n            @-moz-keyframes asq-attention-pulse {\n                0% {\n                    transform: scale(1);\n                    opacity: .75\n                }\n                25% {\n                    transform: scale(1);\n                    opacity: .75 \n                }\n                100% {\n                    transform: scale(2.5);\n                    opacity: 0\n                }\n            } \n\n            @-o-keyframes asq-attention-pulse { \n                0% {\n                    transform: scale(1);\n                    opacity: .75\n                }\n                25% {\n                    transform: scale(1);\n                    opacity: .75\n                }\n                100% {\n                    transform: scale(2.5);\n                    opacity: 0\n                }\n            }\n            ";
            document.body.appendChild(styles);
            Asq.widgetParentEl = document.createElement('figure');
            Asq.widgetParentEl.id = Asq.widgetId;
            Asq.widgetParentEl.classList.add('isHidden', 'isUntouched');
            Asq.widgetParentEl.innerHTML = Asq.loaderTmp;
            document.body.appendChild(Asq.widgetParentEl);
            Asq.widgetList = document.createElement('div');
            Asq.widgetList.id = 'fm-widget-list';
            Asq.widgetList.classList.add('isHidden');
            Asq.widgetList.innerHTML = '<div id="fm-widget-list-header"><p>Conversations</p></div>';
            // Asq.widgetChildEl = Asq.createPluginEl();
            Asq.widgetChildEl = document.createElement('div');
            Asq.widgetChildEl.classList.add('fm-plugin');
            Asq.widgetLoadScreen = Asq.widgetParentEl.querySelector('.fm-load-screen');
            Asq.widgetParentEl.appendChild(Asq.widgetList);
            Asq.widgetParentEl.appendChild(Asq.widgetChildEl);
            Asq.widgetParentEl.style.bottom = "-" + (Asq.widgetParentEl.getBoundingClientRect().height - 75) + "px";
            window.addEventListener('resize', Asq.resize);
            return Promise.resolve();
            // return new Promise((resolve, reject) => {
            //     var xobj = new XMLHttpRequest();
            //     xobj.overrideMimeType("application/json");
            //     xobj.open('GET', Asq.origin + Asq.accountWidgetConfig + '?id=' + window.__fmId__, true);
            //     xobj.onreadystatechange = function () {
            //         if (xobj.readyState == 4 && xobj.status == "200") {
            //             try {
            //                 var k = JSON.parse(xobj.responseText);
            //             } catch (e) {
            //                 return reject(e);
            //             }
            //             resolve(k.data);
            //         }
            //     }
            //     xobj.send(null);
            // });
        };
        /**
         * TODO: If the type is inline, we should load it, but we need to make sure it passes the qualifiers test.
         * TODO: If its context, load it and it also wont by default pass the qualifiers test.
         * @param qualifiers
         */
        Asq.init = function (el) {
            // The element has since been detached, before window.onLoad was fired.
            if (!document.body.contains(el))
                return;
            // if (qualifiers.map(q => q.type === 'widget').filter(t => t).length > 0) {// TODO: if the widget has not been init we should initially hide it.
            // }
            // const r = new RegExp('^[\/\ ]*$');
            // const thisPath = window.location.pathname.split('/');
            // thisPath.shift(); // "/", "/path/path2"
            // let filteredQualifiers = qualifiers.filter((qualifier) => {
            //     if (qualifier.type === 'inline' || qualifier.type === 'contextual') return;
            //     const qualifierPathComponents = qualifier.path.split('/');  // "/", "/path", "/path/path2", "*", "/path/*" 
            //     if (r.test(qualifierPathComponents[0])) qualifierPathComponents.shift();
            //     if (r.test(qualifierPathComponents[qualifierPathComponents.length - 1])) qualifierPathComponents.pop();
            //     if (qualifierPathComponents.length === 1 && qualifierPathComponents[0] === '*') return true; // "*"
            //     for (let i = 0; i < qualifierPathComponents.length; i++) {
            //         if (qualifierPathComponents[i] !== '*' && (qualifierPathComponents[i] !== thisPath[i])) return false; // This qualifier is not a match, and does not match a wildcard.
            //         if (qualifierPathComponents.length === (i + 1) && // This is the last qualifier
            //             qualifierPathComponents[i] === thisPath[i] && thisPath.length === (i + 1) || // Last qualifier for both 
            //             qualifierPathComponents[i] === '*')
            //             return true;
            //         continue;
            //     }
            // });
            // Array.prototype.slice.call(document.getElementsByClassName('__asq__inline__plugin__')).forEach((el: HTMLElement) => {
            //     const data = <any>el.dataset;
            //     if (!data.event || !data.id || !data.type)
            //         throw new Error('You didnt pass the correct parameters to the data- attributes on an __asq__inline__plugin__ element');
            // filteredQualifiers.push({
            //     id: data.id,
            //     uid: parseInt(data.uid),
            //     parent: el,
            //     minHeight: parseInt(data.minHeight) || 0,
            //     maxHeight: parseInt(data.minHeight) || null,
            //     showWelcomeScreen: data.showWelcomeScreen === 'true' ? true : false,
            //     event: data.event,
            //     eventData: data.eventData,
            //     type: data.type,
            //     meta: null
            // });
            // });
            // But we must remove duplicates of widget surveys, since there can only be one.
            // We'll just pick the first. TODO: Make sure that a single path can't have more than one in widget survey in client app.
            // filteredQualifiers = filteredQualifiers
            //     .filter((qualifier, index) => qualifier.type === 'widget' ? index === filteredQualifiers.map(q => q.type).indexOf(qualifier.type) : true);
            // Now we have the surveys for this page.
            // return Promise.all(filteredQualifiers.map(qualifier =>
            // Add removal
            // We do this here for a few reasons, first of all we need a `figure` to be the parent because 
            // Iframes dont receive Intersection events (chrome bug?) also it's OK to have the figure in the 
            // widget instead of the iframe.
            parentEl = document.createElement('figure');
            parentEl.style.height = '1px';
            parentEl.style.width = '1px'; // Popper needs to show up on the screen.
            el.parentNode.replaceChild(parentEl, el);
            el.style.cssText.split(';').map(function (str) { return str.split(':'); })
                .filter(function (arr) { return arr.length > 1; })
                .filter(function (arr) { return !(arr[0].trim() === 'display' && arr[1].trim() === 'none'); })
                .forEach(function (props) { return parentEl.style[props[0].trim()] = props[1].trim(); });
            var data = el.dataset;
            if (data.disable === 'desktop' && !Asq.isMobile ||
                data.disable === 'mobile' && Asq.isMobile)
                return;
            return new Promise(function (resolve, reject) {
                var ctor;
                switch (data.type) {
                    case 'drawer':
                        ctor = AsqDrawer;
                        break;
                    case 'widget':
                        ctor = AsqWidget;
                        break;
                    case 'context':
                    case 'contextual':
                        ctor = AsqCtx;
                        break;
                    case 'inline':
                        ctor = AsqInline;
                        break;
                    default: ctor = AsqInline;
                }
                ;
                var survey = new ctor({
                    type: data.type,
                    id: data.id,
                    uid: data.uid,
                    parent: parentEl,
                    position: data.position,
                    maxHeight: data.maxHeight,
                    minHeight: data.minHeight,
                    maxWidth: data.maxWidth,
                    showWelcomeScreen: data.showWelcomeScreen === 'true' ? true : false,
                    event: data.event,
                    eventData: data.eventData
                });
                if (Asq.surveyInstances.map(function (s) { return s.config.uid; }).indexOf(survey.config.uid) === -1)
                    Asq.surveyInstances.push(survey);
                survey.init()
                    .then(function (result) { return resolve(result); })["catch"](function (err) { return reject(err); });
            });
            // ));
        };
        ;
        Asq.resize = function () {
            Asq.surveyInstances.forEach(function (s) { return s.setMobile(Asq.isMobile); });
        };
        return Asq;
    }());
    Asq.widgetExpanded = false;
    Asq.loaderTmp = "<div class=\"fm-load-screen\" style=\"display:none\">\n        <svg version=\"1.1\" style=\"top: calc(50% - 15px);position: absolute;left: calc(50% - 15px);fill: #dbe1e5;\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"30\" height=\"30\" viewBox=\"0 0 1024 1024\" class=\"fm-rotating\">\n        <g id=\"icomoon-ignore\">\n        </g>\n        <path d=\"M384 128c0-70.692 57.308-128 128-128s128 57.308 128 128c0 70.692-57.308 128-128 128s-128-57.308-128-128zM790.994 512c0 0 0 0 0 0 0-57.993 47.013-105.006 105.006-105.006s105.006 47.013 105.006 105.006c0 0 0 0 0 0 0 57.993-47.013 105.006-105.006 105.006s-105.006-47.013-105.006-105.006zM688.424 783.53c0-52.526 42.58-95.106 95.106-95.106s95.106 42.58 95.106 95.106c0 52.526-42.58 95.106-95.106 95.106s-95.106-42.58-95.106-95.106zM425.862 896c0-47.573 38.565-86.138 86.138-86.138s86.138 38.565 86.138 86.138c0 47.573-38.565 86.138-86.138 86.138s-86.138-38.565-86.138-86.138zM162.454 783.53c0-43.088 34.93-78.018 78.018-78.018s78.018 34.93 78.018 78.018c0 43.088-34.93 78.018-78.018 78.018s-78.018-34.93-78.018-78.018zM57.338 512c0-39.026 31.636-70.662 70.662-70.662s70.662 31.636 70.662 70.662c0 39.026-31.636 70.662-70.662 70.662s-70.662-31.636-70.662-70.662zM176.472 240.472c0 0 0 0 0 0 0-35.346 28.654-64 64-64s64 28.654 64 64c0 0 0 0 0 0 0 35.346-28.654 64-64 64s-64-28.654-64-64zM899.464 240.472c0 64.024-51.906 115.934-115.936 115.934-64.024 0-115.936-51.91-115.936-115.934 0-64.032 51.912-115.934 115.936-115.934 64.030 0 115.936 51.902 115.936 115.934z\"></path>\n        </svg> \n        </div>";
    Asq.notificationIndicator = "background: #e21d1d;border-radius: 100%;font-size: 10px;color: white;height: 15px;text-align: center;width: 15px;display: inline-block;margin-right: 1em;line-height: 16px;font-weight: 800;transform: translateY(-1px);";
    // The items themselves
    Asq.surveyInstances = [];
    // static widgetLoadScreen: HTMLElement;
    // static set widgetLoading(b: boolean) {
    //   console.log('Loading');
    //   if (!b) {
    //     // setTimeout(() => {
    //     Asq.widgetLoadScreen.style.display = 'none';
    //     // }, 1000);
    //     Asq.widgetLoadScreen.style.opacity = '0';
    //   } else {
    //     Asq.widgetLoadScreen.style.display = 'block';
    //     Asq.widgetLoadScreen.style.opacity = '1';
    //   }
    // };
    Asq.widgetId = 'fm-widget';
    Asq.origin = 'https://www.asq.ai/';
    Asq.accountWidgetConfig = 'api/account/plugins';
    var AsqDrawer = (function (_super) {
        __extends(AsqDrawer, _super);
        // scrollListener = (e) => {
        //   if (!e.srcElement || !e.srcElement.activeElement) return;
        //   if (!this.pluginEl.contains(e.srcElement.activeElement)) {
        //     window.removeEventListener('scroll', this.scrollListener);
        //     this.isHidden = true;
        //   }
        // }
        function AsqDrawer(c) {
            return _super.call(this, c) || this;
        }
        AsqDrawer.prototype._init = function () {
            var _this = this;
            // this.config.parent.style.transition = 'height .5s linear';
            this.config.parent.style.width = '100%';
            this.pluginEl = document.createElement('div');
            this.pluginEl.classList.add('asq-drawer', 'fm-plugin', 'isHidden');
            this.pluginEl.innerHTML = Asq.loaderTmp;
            this.loadScreen = this.pluginEl.querySelector('.fm-load-screen');
            this.innerPluginEl = document.createElement('div');
            this.innerPluginEl.classList.add('asq-drawer-inner');
            this.createIFrame(this.innerPluginEl, this.config.id);
            this.pluginEl.appendChild(this.innerPluginEl);
            this.fmIFrame = this.innerPluginEl.querySelector('iframe');
            // We want to keep it outside so it doesn't negatively interact with DOM.
            document.body.appendChild(this.pluginEl);
            // Bad code alert.
            // We need the config object to be sent in to have
            // is hidden false.
            return this.load(true).then(function () {
                // For the drawer, if it's not explicitly hidden then we want to hide it.
                // We do this AFTER the load event because the config object is posted to the iFrame,
                // and if isHidden is true the __asq__ script will use it's setter to postMessage
                // back to this window that the state for isHidden has been changed in its window
                // effectively doubling this setter.
                // if (!this.isHidden)
                //   this.isHidden = true;
                _this.addEventHandlers();
            });
        };
        return AsqDrawer;
    }(Asq));
    var AsqCtx = (function (_super) {
        __extends(AsqCtx, _super);
        function AsqCtx(c) {
            var _this = _super.call(this, c) || this;
            _this.loops = [];
            return _this;
        }
        // We need to override this bc it needs to get the attentionEl and change it's display state too!
        AsqCtx.prototype.attach = function () {
            var _this = this;
            this.pluginEl.classList.remove('displayNone');
            this.attention.classList.remove('displayNone');
            setVisibleTimeout(function () {
                _this.pluginEl.classList.remove('detached');
                _this.attention.classList.remove('detached');
            }, 0);
        };
        AsqCtx.prototype.changeScreenState = function () {
        };
        AsqCtx.prototype.calculateFrameYDelta = function (h) {
            var hM = h / 2;
            var topPadding = 10;
            var t = this.pluginEl.getBoundingClientRect();
            var parentOffsetFromTop = 0;
            if (t.top < 0 && window.scrollY === 0) {
                // Means a child element is scrolled and we can not use t.top + window.scrollY to get the el's actual offset from top. 
                // need to traverse all the way to the top to get actual scroll offset.
                var target = this.config.parent;
                do {
                    if (target.scrollTop > 0)
                        parentOffsetFromTop += target.scrollTop;
                    target = target.parentNode;
                } while (target.parentNode);
            }
            else
                parentOffsetFromTop = window.scrollY;
            if ((t.top + parentOffsetFromTop - hM) < 0)
                if (this.config.position === 'left' || this.config.position === 'right')
                    this.innerPluginEl.style.transform = "translateY(calc(-50% + " + (topPadding + hM - (t.top + parentOffsetFromTop)) + "px))";
        };
        ;
        AsqCtx.prototype.setHeight = function (height) {
            if (!height)
                return;
            // top 30 padding = 25
            var currentHeight = this.innerPluginEl.getBoundingClientRect().height;
            var newHeight = Math.min(300, Math.max(currentHeight, height));
            this.innerPluginEl.style.height = newHeight + "px";
            if (this.config.position === 'left' || this.config.position === 'right')
                this.calculateFrameYDelta(newHeight);
            if (this.config.position === 'top')
                this.innerPluginEl.style.bottom = newHeight + "px";
        };
        /**
         * @description If it doesn't fit on the page it will always position itself underneath the content.
         * 3/18 Must be able to set closed to closed!
         */
        AsqCtx.prototype.resize = function () {
            if (!this.config.parent)
                return console.log('return!');
        };
        AsqCtx.prototype._init = function () {
            // this.config.parent = document.getElementById(this.config.parentId.charAt(0) === '#' ? this.config.parentId.slice(1) : this.config.parentId);
            // if (!this.config.parent) throw new Error('Asq error: you passed the ID => ' + this.config.parentId + ', but it was not present on your page');
            var _this = this;
            this.pluginEl = document.createElement('div');
            this.pluginEl.classList.add('fm-context', 'isHidden', 'detached', 'fm-plugin', this.config.position || 'bottom');
            this.innerPluginEl = document.createElement('div');
            this.innerPluginEl.classList.add('fm-context-inner', this.config.position === 'left' || this.config.position === 'right' ? 'vertical-center' : 'horizontal');
            this.pluginEl.innerHTML = Asq.loaderTmp;
            this.loadScreen = this.pluginEl.querySelector('.fm-load-screen');
            this.pluginEl.appendChild(this.innerPluginEl);
            // hack for Chrome IntersectionObserver SVG Bug.
            // https://github.com/WICG/IntersectionObserver/issues/223
            // document.querySelectorAll('svg').forEach(element => {
            //     if (element.contains(this.config.parent)) {
            //         const div = document.createElement('div');
            //         div.id = 'svg-hack';
            //         div.style.height = '1px';
            //         div.style.width = '1px';
            //         document.body.appendChild(div);
            //         new Popper(this.config.parent, div, { flip: { enabled: false } });
            //         this.config.parent = div;
            //     }
            // });
            this.attention = document.createElement('div');
            this.attention.classList.add('displayNone', 'detached', this.config.position || 'bottom');
            this.attention.addEventListener('click', function () {
                _this.setHidden(!_this.hidden);
                // this.fmIFrame.contentWindow.postMessage({
                //   isHidden: this.isHidden
                // }, '*');
            });
            this.attention.innerHTML = '<span class="asq-attention-outer-dot"><span class="asq-attention-inner-dot"></span></span>';
            this.attention.classList.add('asq-attention');
            this.config.parent.appendChild(this.attention);
            this.pluginEl.appendChild(this.innerPluginEl);
            this.createIFrame(this.innerPluginEl, this.config.id);
            this.fmIFrame = this.innerPluginEl.querySelector('iframe');
            // Create load screen.
            var el = document.createElement('div');
            // el.innerHTML = Asq.loaderTmp;
            // this.loadScreen = <HTMLElement>el.firstElementChild;
            // this.innerPluginEl.appendChild(this.loadScreen);
            if (!Popper)
                return;
            document.body.appendChild(this.pluginEl);
            this.popper = new Popper(this.config.parent, this.pluginEl, { modifiers: { flip: { enabled: false } }, placement: this.config.position || 'bottom' });
            // This is annoying but we have to do it to make sure that the popper knows how to calculate the width to be in the middle of the el.
            setVisibleTimeout(function () {
                _this.pluginEl.classList.add('displayNone');
            }, 0);
            this.obs = new MutationObserver(function (mutations) {
                // Risk of infinite looping here.
                _this.loops.push(new Date().getTime());
                if (_this.loops.length > 50 && ((_this.loops[_this.loops.length - 10] - new Date().getTime()) < 1000))
                    _this.obs.disconnect();
                mutations.forEach(function (mutation) {
                    mutation.removedNodes.forEach(function (_node) {
                        if (_node.contains(_this.config.parent))
                            _this.teardown();
                    });
                });
            });
            this.obs.observe(document.body, { childList: true, subtree: true });
            return this.load().then(function () {
                // if it's hidden it's been force hiddden
                // by the user and we want to keep it closed.
                if (_this.hidden) {
                    _this.attach();
                    _this.startSurveying();
                }
                else
                    _this.addEventHandlers();
            });
        };
        return AsqCtx;
    }(Asq));
    var AsqInline = (function (_super) {
        __extends(AsqInline, _super);
        // get isHidden() {
        //   return false;
        // }
        // set isHidden(isHidden: boolean) {
        // }
        function AsqInline(c) {
            return _super.call(this, c) || this;
        }
        AsqInline.prototype.setHeight = function (height) {
            // top 30 padding = 25
            // console.log(height);
            this.config.parent.style.cssText += "min-height: " + Math.min((this.config.maxHeight || 500), height) + "px";
            // const currentHeight = this.pluginEl.getBoundingClientRect().height;
            // const newHeight = Math.max(currentHeight, height);
            // this.config.parent.style.height = `${newHeight}px`;
        };
        AsqInline.prototype.changeScreenState = function () {
        };
        /**
         * @description If it doesn't fit on the page it will always position itself underneath the content.
         */
        AsqInline.prototype.resize = function () {
        };
        AsqInline.prototype._init = function () {
            var _this = this;
            // why?
            getComputedStyle(this.config.parent);
            this.config.parent.style.cssText += "margin: 0 auto;width: 100%;max-width: " + (this.config.maxWidth ? (this.config.maxWidth + 'px') : 'initial') + "; min-height:50px; max-height:" + (Asq.isMobile ? 300 : this.config.maxHeight || 500) + "px;transition: height .5s linear, max-height .5s linear, min-height .5s linear";
            this.pluginEl = document.createElement('div');
            this.pluginEl.classList.add('asq-inline', 'fm-plugin');
            this.pluginEl.innerHTML = Asq.loaderTmp;
            this.loadScreen = this.pluginEl.querySelector('.fm-load-screen');
            this.innerPluginEl = document.createElement('div');
            this.innerPluginEl.classList.add('asq-inline-inner');
            this.createIFrame(this.innerPluginEl, this.config.id);
            this.pluginEl.appendChild(this.innerPluginEl);
            this.fmIFrame = this.innerPluginEl.querySelector('iframe');
            this.config.parent.appendChild(this.pluginEl);
            return this.load().then(function () {
                _this.addEventHandlers('scroll');
            });
        };
        return AsqInline;
    }(Asq));
    var AsqWidget = (function (_super) {
        __extends(AsqWidget, _super);
        function AsqWidget() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return AsqWidget;
    }(Asq));
    window.AsqInit = Asq.init;
    Asq.onLibraryLoad().then(() => {

        Asq.surveyInstances.forEach(function (el) {
            el.startSurveying()
        })

    })
    // .then(Asq.initialize)
    // .catch((err: any) => {
    //     throw new Error('There was an error initializing the Formatic widget. -> ' + err);
    // });
})();
