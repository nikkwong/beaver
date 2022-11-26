'use strict';

// Do this as parsed.

// document.querySelector('#hero-content')

// dom stuff
window.addEventListener('DOMContentLoaded', function() {

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

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ref3, _ref4, _ref5;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Strut = {
    random: function random(e, t) {
        return Math.random() * (t - e) + e;
    },
    arrayRandom: function arrayRandom(e) {
        return e[Math.floor(Math.random() * e.length)];
    },
    interpolate: function interpolate(e, t, n) {
        return e * (1 - n) + t * n;
    },
    rangePosition: function rangePosition(e, t, n) {
        return (n - e) / (t - e);
    },
    clamp: function clamp(e, t, n) {
        return Math.max(Math.min(e, n), t);
    },
    queryArray: function queryArray(e, t) {
        return t || (t = document.body), Array.prototype.slice.call(t.querySelectorAll(e));
    },
    ready: function ready(e) {
        document.readyState == 'complete' ? e() : document.addEventListener('DOMContentLoaded', e);
    }
};
var reduceMotion = matchMedia("(prefers-reduced-motion)").matches;
var setState = function setState(state, speed) {
    return directions.forEach(function (axis) {
        state[axis] += speed[axis];
        if (Math.abs(state[axis]) < 360) return;
        var max = Math.max(state[axis], 360);
        var min = max == 360 ? Math.abs(state[axis]) : 360;
        state[axis] = max - min;
    });
};

var cubeIsHidden = function cubeIsHidden(left) {
    return left > parentWidth + 30;
};

var headerIsHidden = false;

var parent = document.getElementById("header-hero");
var getParentWidth = function getParentWidth() {
    return parent.getBoundingClientRect().width;
};
var parentWidth = getParentWidth();
window.addEventListener("resize", function () {
    return parentWidth = getParentWidth();
});

var directions = ["x", "y"];

var palette = {
    white: {
        color: [255, 255, 255],
        shading: [160, 190, 218]
    },
    orange: {
        color: [255, 250, 230],
        shading: [255, 120, 50]
    },
    green: {
        color: [205, 255, 204],
        shading: [0, 211, 136]
    }
};

var setStyles = function setStyles(_ref) {
    var shape = _ref.shape,
        size = _ref.size,
        bottom = _ref.bottom,
        left = _ref.left;

    Object.assign(shape.style, {
        width: size + 'px',
        height: size + 'px',
        left: '' + left,
        bottom: bottom + 'px'
    });

    Object.assign(shape.querySelector(".shadow").style, {
        filter: 'blur(' + Math.round(size * .6) + 'px)',
        opacity: .9
    });
};

var createObj = function createObj(_ref2) {
    var size = _ref2.size,
        temp = _ref2.temp,
        type = _ref2.type;

    var fragment = document.importNode(temp.content, true);
    var shape = fragment.querySelector(".shape");
    shape.classList.add('nat' + type);

    var state = {
        x: 0,
        y: 0
    };

    var speed = directions.reduce(function (object, axis) {

        var max = size > sizes.m ? .6 : 1.2;
        object[axis] = Strut.random(-max, max);
        return object;
    }, {});

    var sides = Strut.queryArray(".sides > div", shape).reduce(function (object, side) {
        object[side.className] = {
            side: side,
            hidden: false,
            rotate: {
                x: 0,
                y: 0
            }
        };
        return object;
    }, {});

    switch (type) {
        case 'cube':
            sides.top.rotate.x = 90;
            sides.bottom.rotate.x = -90;
            sides.left.rotate.y = -90;
            sides.right.rotate.y = 90;
            sides.back.rotate.y = -180;
            break;
    }

    return { fragment: fragment, shape: shape, state: state, speed: speed, sides: Object.values(sides) };
};

var sizes = {
    xs: 15,
    s: 25,
    m: 40,
    l: 100,
    xl: 120
};

var cubes = [(_ref3 = {
    tint: palette.orange,
    size: sizes.m,
    left: 285,
    top: 415,
    right: 39
}, _defineProperty(_ref3, 'left', 'calc(((100vw / 2) - (2260px / 2)) + 1150px)'), _defineProperty(_ref3, 'bottom', 620), _ref3)].map(function (object) {
    return Object.assign(createObj({ type: 'cube', size: object.size, temp: document.querySelector('#cube-template') }), object);
});

cubes.forEach(setStyles);

var prisms = [(_ref4 = {
    tint: palette.green,
    size: sizes.xs,
    left: 920,
    top: 260,
    right: 39
}, _defineProperty(_ref4, 'left', 'calc(((100vw / 2) - (2260px / 2)) + 2000px)'), _defineProperty(_ref4, 'bottom', 400), _ref4)].map(function (object) {
    return Object.assign(createObj({ type: 'prism', size: object.size, temp: document.querySelector('#prism-template') }), object);
});

prisms.forEach(setStyles);

var cylinders = [{
    tint: palette.green,
    size: sizes.xs,
    left: 'calc(((100vw / 2) - (2260px / 2)) + 1445px)',
    bottom: 300
}].map(function (object) {
    return Object.assign(createObj({ type: 'cylinder', size: object.size, temp: document.querySelector('#cylinder-template') }), object);
});

cylinders.forEach(setStyles);

var triangles = [(_ref5 = {
    tint: palette.green,
    size: sizes.xs,
    left: 863,
    top: 316,
    right: 39
}, _defineProperty(_ref5, 'left', 'calc(((100vw / 2) - (2260px / 2)) + 1364px)'), _defineProperty(_ref5, 'bottom', 500), _ref5)].map(function (object) {
    return Object.assign(createObj({ type: 'triangle', size: object.size, temp: document.querySelector('#triangle-template') }), object);
});

triangles.forEach(setStyles);

var shapeGroups = [[{ type: 'cubes', data: cubes }, { type: 'prisms', data: prisms }], [{ type: 'cylinders', data: cylinders }, { type: 'triangles', data: triangles }]];

var getDistance = function getDistance(state, rotate) {
    return directions.reduce(function (object, axis) {
        object[axis] = Math.abs(state[axis] + rotate[axis]);
        return object;
    }, {});
};

var getRotation = function getRotation(state, size, rotate) {
    var axis = rotate.x ? "Z" : "Y";
    var direction = rotate.x > 0 ? -1 : 1;

    return '\n            rotateX(' + (state.x + rotate.x) + 'deg)\n            rotate' + axis + '(' + direction * (state.y + rotate.y) + 'deg)\n            translateZ(' + size / 2 + 'px)\n            ';
};

var getShading = function getShading(tint, rotate, distance) {
    var darken = directions.reduce(function (object, axis) {
        var delta = distance[axis];
        var ratio = delta / 180;
        object[axis] = delta > 180 ? Math.abs(2 - ratio) : ratio;
        return object;
    }, {});

    if (rotate.x) darken.y = 0;else {
        var x = distance.x;

        if (x > 90 && x < 270) directions.forEach(function (axis) {
            return darken[axis] = 1 - darken[axis];
        });
    }

    var alpha = (darken.x + darken.y) / 2;
    var blend = function blend(value, index) {
        return Math.round(Strut.interpolate(value, tint.shading[index], alpha));
    };

    var _tint$color$map = tint.color.map(blend),
        _tint$color$map2 = _slicedToArray(_tint$color$map, 3),
        r = _tint$color$map2[0],
        g = _tint$color$map2[1],
        b = _tint$color$map2[2];

    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
};

var shouldHide = function shouldHide(rotateX, x, y) {
    if (rotateX) return x > 90 && x < 270;
    if (x < 90) return y > 90 && y < 270;
    if (x < 270) return y < 90;
    return y > 90 && y < 270;
};

var updateSides = function updateSides(_ref6) {
    var state = _ref6.state,
        speed = _ref6.speed,
        size = _ref6.size,
        tint = _ref6.tint,
        sides = _ref6.sides,
        left = _ref6.left;

    if (headerIsHidden || cubeIsHidden(left)) return;

    var animate = function animate(object) {
        var side = object.side,
            rotate = object.rotate,
            hidden = object.hidden;

        var distance = getDistance(state, rotate);

        // don't animate hidden sides
        if (shouldHide(rotate.x, distance.x, distance.y)) {
            if (!hidden) {
                side.hidden = true;
                object.hidden = true;
            }
            return;
        }

        if (hidden) {
            side.hidden = false;
            object.hidden = false;
        }

        side.style.transform = getRotation(state, size, rotate);
        side.style.backgroundColor = getShading(tint, rotate, distance);
    };

    setState(state, speed);
    sides.forEach(animate);
};
var activeIndex = 0,
    numItems = shapeGroups.length;
function setActiveContainers() {
    containers.forEach(function (shapeGroupEl, i) {
        return shapeGroupEl.classList[i === activeIndex ? 'add' : 'remove']('active');
    });
}
setInterval(function () {

    activeIndex = activeIndex === numItems - 1 ? 0 : activeIndex + 1;
    setActiveContainers();
}, 5000);

var tick = function tick() {

    shapeGroups[activeIndex].forEach(function (shapeGroup) {

        switch (shapeGroup.type) {
            case 'cubes':
                shapeGroup.data.forEach(updateSides);
                break;
            case 'cylinders':
                break;
        }
    });

    if (reduceMotion) return;

    requestAnimationFrame(tick);
};

var containers = [];

shapeGroups.forEach(function (shapeGroup) {

    var container = document.createElement("div");
    container.className = "shapeGroup";
    containers.push(container);
    shapeGroup.forEach(function (shapesAndData) {

        var _fragment = document.importNode(document.querySelector('#attn-template').content, true);
        container.appendChild(_fragment);
        shapesAndData.data.forEach(function (_ref7) {
            var fragment = _ref7.fragment;
            return container.appendChild(fragment);
        });
    });
});

var start = function start() {
    tick();
    containers.forEach(function (container) {
        return parent.appendChild(container);
    });
    setTimeout(function () {
        setActiveContainers();
    }, 1000);
};

'requestIdleCallback' in window ? requestIdleCallback(start) : start();