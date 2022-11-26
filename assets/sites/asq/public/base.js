// This script will always be loaded onto the client for the "widget".
// It will not be used for the "web" version.
"use strict";
exports.__esModule = true;
/**
 * @description Ways to initiate a Formatic Element:
 *
 * <div class="formatic-plugin" data-id="SURVEY_ID"></div> // and then wait for this script to load
 *
 */
var Formatic = (function () {
    function Formatic(config) {
        var _this = this;
        this.config = config;
        this._queuedMessagCount = 0;
        this.hasMessages = false;
        this.origin = 'https://formatic.io/';
        this.kf = "@-webkit-keyframes fm-rotating {\n            from {\n                -ms-transform: rotate(0deg);\n                -moz-transform: rotate(0deg);\n                -webkit-transform: rotate(0deg);\n                -o-transform: rotate(0deg);\n                transform: rotate(0deg);\n            }\n            to {\n                -ms-transform: rotate(-360deg);\n                -moz-transform: rotate(-360deg);\n                -webkit-transform: rotate(-360deg);\n                -o-transform: rotate(-360deg);\n                transform: rotate(-360deg);\n            }\n        }\n\n        @keyframes fm-rotating {\n            from {\n                -ms-transform: rotate(0deg);\n                -moz-transform: rotate(0deg);\n                -webkit-transform: rotate(0deg);\n                -o-transform: rotate(0deg);\u00CF\n                transform: rotate(0deg);\n            }\n            to {\n                -ms-transform: rotate(-360deg);\n                -moz-transform: rotate(-360deg);\n                -webkit-transform: rotate(-360deg);\n                -o-transform: rotate(-360deg);\n                transform: rotate(-360deg);\n            }\n        }\n\n        #formatic-widget .fm-rotating {\n            -webkit-animation: fm-rotating 3s linear infinite;\n            -moz-animation: fm-rotating 3s linear infinite;\n            -ms-animation: fm-rotating 3s linear infinite;\n            -o-animation: fm-rotating 3s linear infinite;\n            animation: fm-rotating 3s linear infinite;\n        }\n        #formatic-widget #fm-load-screen {\n            position: absolute;\n            top: 0;\n            left: 0;\n            right: 0;\n            bottom: 0;\n            background: rgba(43, 43, 43, 0.75);\n            transition: opacity 1s linear;\n            border-radius: 20px;\n        }\n        div#formatic-widget {\n            all: initial; \n        }\n        div#formatic-widget * {\n            all: unset;\n            font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif!important;\n        }\n        style {\n            display: none!important;\n        }\n\n        .fm-list-item {\n            width: 100%!important;\n            display: block!important    ;\n            color: white!important;\n        }\n        #formatic-widget ._fm-list-title {\n            font-weight: 800!important;\n            color: #3a3e4d!important;\n        }\n        #formatic-widget path {\n            d: path('M 384 128 c 0 -70.692 57.308 -128 128 -128 s 128 57.308 128 128 c 0 70.692 -57.308 128 -128 128 s -128 -57.308 -128 -128 Z M 790.994 512 c 0 0 0 0 0 0 c 0 -57.993 47.013 -105.006 105.006 -105.006 s 105.006 47.013 105.006 105.006 c 0 0 0 0 0 0 c 0 57.993 -47.013 105.006 -105.006 105.006 s -105.006 -47.013 -105.006 -105.006 Z M 688.424 783.53 c 0 -52.526 42.58 -95.106 95.106 -95.106 s 95.106 42.58 95.106 95.106 c 0 52.526 -42.58 95.106 -95.106 95.106 s -95.106 -42.58 -95.106 -95.106 Z M 425.862 896 c 0 -47.573 38.565 -86.138 86.138 -86.138 s 86.138 38.565 86.138 86.138 c 0 47.573 -38.565 86.138 -86.138 86.138 s -86.138 -38.565 -86.138 -86.138 Z M 162.454 783.53 c 0 -43.088 34.93 -78.018 78.018 -78.018 s 78.018 34.93 78.018 78.018 c 0 43.088 -34.93 78.018 -78.018 78.018 s -78.018 -34.93 -78.018 -78.018 Z M 57.338 512 c 0 -39.026 31.636 -70.662 70.662 -70.662 s 70.662 31.636 70.662 70.662 c 0 39.026 -31.636 70.662 -70.662 70.662 s -70.662 -31.636 -70.662 -70.662 Z M 176.472 240.472 c 0 0 0 0 0 0 c 0 -35.346 28.654 -64 64 -64 s 64 28.654 64 64 c 0 0 0 0 0 0 c 0 35.346 -28.654 64 -64 64 s -64 -28.654 -64 -64 Z M 899.464 240.472 c 0 64.024 -51.906 115.934 -115.936 115.934 c -64.024 0 -115.936 -51.91 -115.936 -115.934 c 0 -64.032 51.912 -115.934 115.936 -115.934 c 64.03 0 115.936 51.902 115.936 115.934 Z')!important;\n        }";
        this.loaderTmp = "<div id=\"fm-load-screen\" style=\"display:none\">\n        <svg version=\"1.1\" style=\"top: calc(50% - 15px);position: absolute;left: calc(50% - 15px);fill: white;\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width=\"30\" height=\"30\" viewBox=\"0 0 1024 1024\" class=\"fm-rotating\">\n        <g id=\"icomoon-ignore\">\n        </g>\n        <path d=\"M384 128c0-70.692 57.308-128 128-128s128 57.308 128 128c0 70.692-57.308 128-128 128s-128-57.308-128-128zM790.994 512c0 0 0 0 0 0 0-57.993 47.013-105.006 105.006-105.006s105.006 47.013 105.006 105.006c0 0 0 0 0 0 0 57.993-47.013 105.006-105.006 105.006s-105.006-47.013-105.006-105.006zM688.424 783.53c0-52.526 42.58-95.106 95.106-95.106s95.106 42.58 95.106 95.106c0 52.526-42.58 95.106-95.106 95.106s-95.106-42.58-95.106-95.106zM425.862 896c0-47.573 38.565-86.138 86.138-86.138s86.138 38.565 86.138 86.138c0 47.573-38.565 86.138-86.138 86.138s-86.138-38.565-86.138-86.138zM162.454 783.53c0-43.088 34.93-78.018 78.018-78.018s78.018 34.93 78.018 78.018c0 43.088-34.93 78.018-78.018 78.018s-78.018-34.93-78.018-78.018zM57.338 512c0-39.026 31.636-70.662 70.662-70.662s70.662 31.636 70.662 70.662c0 39.026-31.636 70.662-70.662 70.662s-70.662-31.636-70.662-70.662zM176.472 240.472c0 0 0 0 0 0 0-35.346 28.654-64 64-64s64 28.654 64 64c0 0 0 0 0 0 0 35.346-28.654 64-64 64s-64-28.654-64-64zM899.464 240.472c0 64.024-51.906 115.934-115.936 115.934-64.024 0-115.936-51.91-115.936-115.934 0-64.032 51.912-115.934 115.936-115.934 64.030 0 115.936 51.902 115.936 115.934z\"></path>\n        </svg>\n        </div>";
        this.fmListStyle = "padding: 1em;border-bottom: 1px solid #dbe1e5;cursor: pointer;";
        this.notificationIndicator = "background: #e21d1d;border-radius: 100%;font-size: 10px;color: white;height: 15px;text-align: center;width: 15px;display: inline-block;margin-right: 1em;line-height: 16px;font-weight: 800;transform: translateY(-1px);";
        this.boxShadow = 'box-shadow: 0 5px 20px #e2e2e2;box-shadow: rgba(0, 0, 0, .3) 0px 15px 30px;border-radius: 20px;';
        /**
         * @description
         * @param c.showData {string | number} — the number of px scrolled before the element shows. if
         * the value passed in is not the string version of a number, we will attach an event that will
         * make the survey show up when the element is scrolled into view.
         */
        this.createScrollHandler = function () {
            var scrollEventListener = function () {
                setTimeout(function () {
                    var elOffsetTop = _this.config.parent.offsetTop;
                    var elShowPos = typeof parseInt(_this.config.showData) === 'number' ? parseInt(_this.config.showData) : elOffsetTop;
                    if (window.pageYOffset > elShowPos) {
                        _this.open = true;
                        window.removeEventListener('scroll', scrollEventListener);
                    }
                }, 250);
            };
            window.addEventListener('scroll', scrollEventListener);
        };
        // // Widget will not pass parentEl, while inline surveys will.
        Formatic.polyfills();
        this.config.userId = Formatic.getStorageObj().userId;
        if (!this.config.userId) {
            var ObjId = function (m, d, h, s) {
                if (m === void 0) { m = Math; }
                if (d === void 0) { d = Date; }
                if (h === void 0) { h = 16; }
                if (s === void 0) { s = function (s) { return m.floor(s).toString(h); }; }
                return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, function () { return s(m.random() * h); });
            };
            this.config.userId = ObjId();
            Formatic.setStorageItem('userId', this.config.userId);
        }
        ;
        this.formaticIFrameWrapper = document.createElement('div');
        this.formaticIFrameWrapper.id = 'fm-frame-wrapper';
        this.formaticIFrameWrapper.style.cssText += 'height: 100%;';
        this.formaticIFrame = document.createElement('iframe');
        this.formaticIFrame.style.cssText += 'height:100%;border:0;width: 1px;min-width: 100%;transition:height .5s linear, width .5s linear;';
        this.formaticIFrame.setAttribute('scrolling', 'no');
        var styles = document.createElement('style');
        styles.innerHTML = this.kf;
        this.config.parent.prepend(styles);
        this.config.parent.prepend(this.formaticIFrameWrapper);
        this.formaticIFrameWrapper.appendChild(this.formaticIFrame);
        // At this point elements have been styled and frames have been attached. Now let's add our event listener.
        switch (this.config.showEvent) {
            case 'click':
                this.createClickHandler();
                break;
            case 'hover':
                this.createHoverHandler();
                break;
            case 'onload':
                this.open = true;
                this.load();
                break;
            case 'scroll':
                this.createScrollHandler();
                break;
            case 'timeout':
                this.createTimeoutHandler();
                break;
        }
        window.addEventListener("resize", function () {
            setTimeout(function () {
                _this.resize();
            }, 500);
        });
        this.init();
        this.open = this.getThisFm().open;
        this.load();
    }
    Object.defineProperty(Formatic.prototype, "open", {
        get: function () {
            var fms = Formatic.getStorageObj().fms;
            var fm = fms[fms.map(function (f) { return f.id; }).indexOf(this.config.surveyId)] || {};
            return fm.open || false;
        },
        /**
         * @description We must save the state of this to LS.
         */
        set: function (d) {
            var fms = Formatic.getStorageObj().fms;
            var fm = fms[fms.map(function (f) { return f.id; }).indexOf(this.config.surveyId)] || {};
            fm.open = d;
            Formatic.setStorageItem('fms', fms);
            this._open = d;
            this.resize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Formatic.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (v) {
            this._expanded = v;
            this.resize();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Formatic.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (height) {
            if (this.height > 400)
                return;
            var newHeight = Math.min(height, 400);
            this._height = newHeight;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Formatic.prototype, "queuedMessageCount", {
        get: function () {
            return this._queuedMessagCount;
        },
        set: function (number) {
            this._queuedMessagCount = number;
            if (number === 0)
                this.notifications.style.display = 'none';
            else {
                this.notifications.style.display = 'block';
                this.notifications.innerHTML = number;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Formatic.prototype, "isLoading", {
        set: function (b) {
            var event = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';
            var el = document.getElementById('fm-load-screen');
            if (!el)
                throw new Error('Expected a loader element but found none');
            if (!b) {
                setTimeout(function () {
                    el.style.display = 'none';
                }, 1000);
                el.style.opacity = '0';
            }
            else {
                el.style.display = 'block';
                el.style.opacity = '1';
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @description Begins the conversation, skipping the welcome screen.
     */
    Formatic.prototype.start = function (frame) {
        frame.contentWindow.postMessage({
            init: true
        }, this.origin);
    };
    ;
    Formatic.prototype.createClickHandler = function () {
        var _this = this;
        if (typeof parseInt(this.config.showData) !== 'number')
            throw new Error('Argument provided to showData is not a number');
        var normalized = this.config.showData.charAt(0) === '#' ? this.config.showData.slice(1) : this.config.showData;
        var matches = document.querySelectorAll('#' + normalized);
        if (matches.length > 1)
            console.log('Multiple IDs found for the ID passed, this may lead to unexpected behavior!');
        if (matches.length === 0)
            return console.log('Could not find a match for the given ID => ' + this.config.showData);
        var el = matches[0];
        var clickEventHandler = function () {
            _this.open = true;
            el.removeEventListener('click', clickEventHandler);
        };
        el.addEventListener('click', clickEventHandler);
    };
    Formatic.prototype.createHoverHandler = function () {
        // setTimeout(() => {
        //     this.open = true;
        // }, parseInt(<string>this.config.showData));
    };
    Formatic.prototype.createTimeoutHandler = function () {
        var _this = this;
        if (!parseInt(this.config.showData))
            throw new Error('Did not pass a number to data-load-data=""');
        setTimeout(function () {
            _this.open = true;
        }, parseInt(this.config.showData));
    };
    /**
     * @description Make the call to get data.
     * Mark this survey as having been loaded.
     */
    Formatic.prototype.load = function () {
        var _this = this;
        this.isLoading = true;
        var fms = Formatic.getStorageObj().fms || [];
        if (fms.map(function (fm) { return fm.id; }).indexOf(this.config.surveyId) === -1) {
            fms.push({ id: this.config.surveyId });
            Formatic.setStorageItem('fms', fms);
        }
        ;
        return new Promise(function (resolve, reject) {
            _this.formaticIFrame.src = _this.origin + _this.config.surveyId;
            _this.formaticIFrame.onload = function () {
                if (!_this.formaticIFrame.contentWindow)
                    throw new Error('Did not receive a valid HTML response. Did you pass the correct surveyId?');
                var config = Object.create(_this.config); // need to delete reference to $el.
                delete config.parent;
                _this.formaticIFrame.contentWindow.postMessage({
                    id: _this.config.surveyId,
                    config: config
                }, _this.origin);
                _this.isLoading = false;
                resolve();
            };
        });
    };
    Formatic.prototype.incrementUnreadCount = function (id) {
        var _this = this;
        if (!this.open)
            this.queuedMessageCount++;
        var els = document.getElementsByClassName('fm-list-item');
        Array.prototype.slice.call(els).forEach(function (el) {
            if (el.dataset['id'] === _this.activeSurveyId)
                return;
            el.dataset.count = el.dataset.count ? (+el.dataset.count + 1) : 1;
            var e = el.querySelector('.list-item-unread');
            e.style.display = 'inline-block';
            e.innerHTML = el.dataset.count;
        });
    };
    /**
     * @description we received a message from the server.
     */
    Formatic.prototype.messageReceived = function (message) {
        if (message.type === 'widget')
            this.incrementUnreadCount(message.id);
    };
    Formatic.prototype.resize = function () {
        var isLg = window.outerWidth >= 450;
        this.config.parent.style.width = isLg ? 'initial' : (this.expanded ? '100%' : (this.open ? '220px' : '50px'));
        this.config.parent.style.marginLeft = isLg ? 'initial' : 'auto';
        this.config.parent.style.right = isLg ? '20px' : (this.expanded ? '0px' : '20px');
        this.config.parent.style.left = isLg ? 'calc(100% - 400px)' : (this.expanded ? '0px' : 'initial');
        this.config.parent.style.bottom = (this.expanded && !isLg) ? '0px' : '20px';
        // Move inner iframe to bottom (not atop the button);
        this.formaticIFrameWrapper.style.bottom = (this.expanded && !isLg) ? '0px' : '60px';
        // Hide radius on fs
        this.formaticIFrameWrapper.style.borderRadius = (this.expanded && !isLg) ? '0px' : '20px';
    };
    Formatic.prototype.createTrigger = function () {
        this.triggerFrameWrapper = document.createElement('div');
        this.triggerFrameWrapper.style.cssText += 'height: 50px;width: 50px;cursor:pointer;position: absolute;bottom: 0px;right: 0px;';
        this.triggerFrame = document.createElement('iframe');
        var body = document.createElement('body');
        body.style.cssText = 'margin: 0;';
        body.innerHTML = " \n                <div id=\"fm-trigger\" style=\"padding: 0 10px; position: relative;background: #1eccff; cursor: pointer;\">\n                    <?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n                    <svg width=\"100%\" height=\"100%\" viewBox=\"0 0 397 224\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n                        <g id=\"fm-logo\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n                            <g id=\"Artboard-10\" transform=\"translate(-1608.000000, -141.000000)\" fill=\"#FFFFFF\">\n                                <g id=\"Group-10\" transform=\"translate(1806.500000, 253.000000) rotate(-180.000000) translate(-1806.500000, -253.000000) translate(1608.000000, 141.000000)\">\n                                    <polygon id=\"Fill-40\" points=\"231.823661 42.5129731 99 42.5129731 106.330014 0 239.153674 0\"></polygon>\n                                    <polygon id=\"Fill-48\" points=\"321.49459 0 279.912344 0 272.584906 42.5129731 314.162 42.5129731\"></polygon>\n                                    <polygon id=\"Fill-40\" points=\"231.823661 223.312973 99 223.312973 106.330014 180.8 239.153674 180.8\"></polygon>\n                                    <polygon id=\"Fill-48\" points=\"321.49459 180.8 279.912344 180.8 272.584906 223.312973 314.162 223.312973\"></polygon>\n                                    <polygon id=\"Fill-40\" points=\"307.295358 132.912973 174.471698 132.912973 181.801711 90.4 314.625372 90.4\"></polygon>\n                                    <polygon id=\"Fill-40\" points=\"133.710453 132.912973 0.886792 132.912973 8.21680574 90.4 141.040466 90.4\"></polygon>\n                                    <polygon id=\"Fill-48\" points=\"396.966287 90.4 355.384042 90.4 348.056603 132.912973 389.633698 132.912973\"></polygon>\n                                </g>\n                            </g>\n                        </g> \n                    </svg>\n                </div>";
        var s = document.createElement('script');
        s.innerHTML = "\n            window.addEventListener('click', function(event) {\n                event.preventDefault();window.parent.postMessage({triggerClick: true}, '*'); return false;});\n            window.addEventListener('touchend', function(event) {\n                event.preventDefault();window.parent.postMessage({triggerClick: true}, '*'); return false;});";
        body.appendChild(s);
        this.triggerFrame.style.cssText = 'border: 0; width:100%;height:100%;border-radius: 50%;box-shadow: rgba(0, 0, 0, .3) 0px 15px 30px;';
        this.triggerFrameWrapper.appendChild(this.triggerFrame);
        this.triggerFrameWrapper.appendChild(this.notifications);
        this.config.parent.appendChild(this.triggerFrameWrapper);
        this.triggerFrame.contentWindow.document.body = body;
    };
    Formatic.prototype.getThisFm = function () {
        var s = Formatic.getStorageObj().fms;
        if (!s)
            return;
        return s[s.map(function (k) { return k.id; }).indexOf(this.config.surveyId)];
    };
    Formatic.getStorageObj = function () {
        var configStr = window.localStorage.getItem('__client_fm__');
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
    Formatic.setStorageItem = function (key, value) {
        var obj = Formatic.getStorageObj();
        var config;
        obj[key] = value;
        try {
            config = JSON.stringify(obj) || JSON.stringify({});
        }
        catch (e) {
            throw new Error("Could not load the client data.");
        }
        ;
        window.localStorage.setItem('__client_fm__', config);
    };
    ;
    Formatic.onLibraryLoad = function () {
        // For the widget, get current state.
        window.addEventListener("message", function (event) {
            if (!event.data || !event.data.id)
                throw new Error('Incorrect paramaters passed');
            var survey = Formatic.surveys[Formatic.surveys.map(function (fm) { return fm.config.surveyId; }).indexOf(event.data.id)];
            if (event.data.name === 'open')
                survey.open = event.data.value;
            // survey.setActiveState(event.data.id, 'frame');
            // If there is no value passed here, we will allow the widget to open/
            // survey.open = Formatic.getStorageObj().fmOpen === false ? false : event.data.value;
            if (event.data.name === 'messageReceived')
                survey.messageReceived(event.data.value);
            /**
             * @description Expands the widget when a response is received
             * if the viewport is mobile.
             */
            if (event.data.name === 'expand')
                survey.expanded = event.data.value;
            /**
             * @description Clicks on back button will cause the state to change here.
             */
            // if (event.data.name === 'stateChange')
            // survey.setActiveState(event.data.value.id, event.data.value.screen);
            /**
             * @description Expands the widget when a response is received
             * if the viewport is mobile.
             */
            if (event.data.name === 'surveyName')
                survey.setTitle(event.data.value);
            // Toggle.
            if (event.data.triggerClick)
                survey.open = !survey.open;
        }, false);
    };
    Formatic.initInstances = function () {
        // For elements already on the page.
        Array.prototype.slice.call(document.querySelector('[data-formatic-id]')).forEach(function (el) {
            var data = el.dataset;
            Formatic.surveys.push(new Formatic({
                type: data.type,
                surveyId: data.formaticId,
                parent: el,
                showWelcomeScreen: data.showWelcomeScreen,
                showEvent: data.showEvent,
                position: data.position,
                showData: data.showData,
                meta: null
            }));
        });
        // For IDs passed.
        // For IDs passed.
    };
    Formatic.polyfills = function () {
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
    };
    return Formatic;
}());
exports.Formatic = Formatic;
