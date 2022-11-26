!function(e){function t(e){Object.defineProperty(this,e,{enumerable:!0,get:function(){return this[m][e]}})}function r(e){var t;if(e&&e.__esModule){t={};for(var r in e)Object.hasOwnProperty.call(e,r)&&(t[r]=e[r]);t.__useDefault&&delete t.__useDefault,t.__esModule=!0}else{if("[object Module]"===Object.prototype.toString.call(e)||"undefined"!=typeof System&&System.isModule&&System.isModule(e))return e;t={default:e,__useDefault:!0}}return new o(t)}function o(e){Object.defineProperty(this,m,{value:e}),Object.keys(e).forEach(t,this)}function n(e){return"@node/"===e.substr(0,6)?c(e,r(v(e.substr(6))),{}):p[e]}function u(e){var t=n(e);if(!t)throw new Error('Module "'+e+'" expected, but not contained in build.');if(t.module)return t.module;var r=t.linkRecord;return d(t,r),a(t,r,[]),t.module}function d(e,t){if(!t.depLoads){t.declare&&i(e,t),t.depLoads=[];for(var r=0;r<t.deps.length;r++){var o=n(t.deps[r]);t.depLoads.push(o),o.linkRecord&&d(o,o.linkRecord);var u=t.setters&&t.setters[r];u&&(u(o.module||o.linkRecord.moduleObj),o.importerSetters.push(u))}return e}}function i(t,r){var o=r.moduleObj,n=t.importerSetters,u=!1,d=r.declare.call(e,function(e,t){if(!u){if("object"==typeof e)for(var r in e)"__useDefault"!==r&&(o[r]=e[r]);else o[e]=t;u=!0;for(var d=0;d<n.length;d++)n[d](o);return u=!1,t}},{id:t.key});"function"!=typeof d?(r.setters=d.setters,r.execute=d.execute):(r.setters=[],r.execute=d)}function l(e,t,r){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:r,setters:void 0,execute:void 0,moduleObj:{}}}}function f(e,t,r,o){return p[e]={key:e,module:void 0,importerSetters:[],linkRecord:{deps:t,depLoads:void 0,declare:void 0,execute:o,executingRequire:r,moduleObj:{default:{},__useDefault:!0},setters:void 0}}}function s(e,t,r){return function(o){for(var n=0;n<e.length;n++)if(e[n]===o){var u,d=t[n],i=d.linkRecord;return u=i?-1===r.indexOf(d)?a(d,i,r):i.moduleObj:d.module,u.__useDefault?u.default:u}}}function a(t,r,n){if(n.push(t),t.module)return t.module;var u;if(r.setters){for(var d=0;d<r.deps.length;d++){var i=r.depLoads[d],l=i.linkRecord;l&&-1===n.indexOf(i)&&(u=a(i,l,l.setters?n:[]))}r.execute.call(y)}else{var f={id:t.key},c=r.moduleObj;Object.defineProperty(f,"exports",{configurable:!0,set:function(e){c.default=e},get:function(){return c.default}});var p=s(r.deps,r.depLoads,n);if(!r.executingRequire)for(var d=0;d<r.deps.length;d++)p(r.deps[d]);var m=r.execute.call(e,p,c.default,f);if(void 0!==m?c.default=m:f.exports!==c.default&&(c.default=f.exports),c.default&&c.default.__esModule)for(var v in c.default)Object.hasOwnProperty.call(c.default,v)&&"default"!==v&&(c[v]=c.default[v])}var f=t.module=new o(r.moduleObj);if(!r.setters)for(var d=0;d<t.importerSetters.length;d++)t.importerSetters[d](f);return f}function c(e,t){return p[e]={key:e,module:t,importerSetters:[],linkRecord:void 0}}var p={},m="undefined"!=typeof Symbol?Symbol():"@@baseObject";o.prototype=Object.create(null),"undefined"!=typeof Symbol&&Symbol.toStringTag&&(o.prototype[Symbol.toStringTag]="Module");var v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,y={};return Object.freeze&&Object.freeze(y),function(e,t,n,d){return function(i){i(function(i){var s={_nodeRequire:v,register:l,registerDynamic:f,registry:{get:function(e){return p[e].module},set:c},newModule:function(e){return new o(e)}};c("@empty",new o({}));for(var a=0;a<t.length;a++)c(t[a],r(arguments[a],{}));d(s);var m=u(e[0]);if(e.length>1)for(var a=1;a<e.length;a++)u(e[a]);return n?m.default:(m instanceof o&&Object.defineProperty(m,"__esModule",{value:!0}),m)})}}}("undefined"!=typeof self?self:global)

(["a"], [], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("b", ["c", "d"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var question_1 = $__require("c");
    var option_1 = $__require("d");
    var SurveyFieldQuestionBoolean = function (_super) {
        __extends(SurveyFieldQuestionBoolean, _super);
        function SurveyFieldQuestionBoolean(obj) {
            var _this = _super.call(this, obj) || this;
            _this.questionType = 'BOOLEAN';
            _this.options = [new option_1.Option({ title: 'Yes' }), new option_1.Option({ title: 'No' })];
            return _this;
        }
        return SurveyFieldQuestionBoolean;
    }(question_1.SurveyFieldQuestion);
    exports.SurveyFieldQuestionBoolean = SurveyFieldQuestionBoolean;
});
$__System.registerDynamic("e", ["c", "d"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var question_1 = $__require("c");
    var option_1 = $__require("d");
    var SurveyFieldQuestionRating = function (_super) {
        __extends(SurveyFieldQuestionRating, _super);
        function SurveyFieldQuestionRating(obj) {
            var _this = _super.call(this, obj) || this;
            _this.questionType = 'RATING';
            _this.options = [new option_1.Option({ image_url: 'URL-1', payload: '1 star', title: '1' }), new option_1.Option({ image_url: 'URL-2', payload: '2 stars', title: '2' }), new option_1.Option({ image_url: 'URL-3', payload: '3 stars', title: '3' }), new option_1.Option({ image_url: 'URL-4', payload: '4 stars', title: '4' }), new option_1.Option({ image_url: 'URL-5', payload: '5 stars', title: '5' })];
            return _this;
        }
        return SurveyFieldQuestionRating;
    }(question_1.SurveyFieldQuestion);
    exports.SurveyFieldQuestionRating = SurveyFieldQuestionRating;
});
$__System.registerDynamic("f", ["c"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var question_1 = $__require("c");
    var SurveyFieldQuestionText = function (_super) {
        __extends(SurveyFieldQuestionText, _super);
        function SurveyFieldQuestionText(obj) {
            var _this = _super.call(this, obj) || this;
            _this.questionType = "TEXT";
            return _this;
        }
        return SurveyFieldQuestionText;
    }(question_1.SurveyFieldQuestion);
    exports.SurveyFieldQuestionText = SurveyFieldQuestionText;
});
$__System.registerDynamic("10", ["c", "d"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var question_1 = $__require("c");
    var option_1 = $__require("d");
    var SurveyFieldQuestionSmiley = function (_super) {
        __extends(SurveyFieldQuestionSmiley, _super);
        function SurveyFieldQuestionSmiley(obj) {
            var _this = _super.call(this, obj) || this;
            _this.questionType = 'SMILEY';
            _this.options = [new option_1.Option({ payload: '1', title: '1' }), new option_1.Option({ payload: '2', title: '2' }), new option_1.Option({ payload: '3', title: '3' }), new option_1.Option({ payload: '4', title: '4' }), new option_1.Option({ payload: '5', title: '5' })];
            return _this;
        }
        return SurveyFieldQuestionSmiley;
    }(question_1.SurveyFieldQuestion);
    exports.SurveyFieldQuestionSmiley = SurveyFieldQuestionSmiley;
});
$__System.registerDynamic("c", ["11"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var field_1 = $__require("11");
    var SurveyFieldQuestion = function (_super) {
        __extends(SurveyFieldQuestion, _super);
        function SurveyFieldQuestion(obj) {
            var _this = _super.call(this, obj) || this;
            _this.questionType = obj && obj.questionType || "TEXT";
            return _this;
        }
        SurveyFieldQuestion.prototype.responseSatisfiesQuestion = function (response) {
            var t = response.body.getText();
            /*TODO: Clean up*/
            switch (this.questionType) {
                case 'BOOLEAN':
                    return !!t.match(/^\s*?(no|yes)\s*?$/i);
                case 'MULTIPLE_OPTION':
                    return !!this.getOptionFromString(t);
                case "TEXT":
                    return true;
                case 'RATING':
                    // TODO: does not match preceding or trailing spaces.
                    return !!t.toString().match(new RegExp("^\s*?([1-5])\s*?$"));
                case 'SMILEY':
                    // TODO: does not match preceding or trailing spaces.
                    return !!t.toString().match(new RegExp("^\s*?([1-5])\s*?$"));
                default:
                    return true;
            }
        };
        SurveyFieldQuestion.prototype.getOptionFromString = function (t) {
            return this.options[this.options.map(function (option) {
                return !!option.payload.match(new RegExp("^\s*?(" + (t.toLowerCase ? t.toLowerCase() : t) + ")\s*?$", 'i'));
            }).indexOf(true)];
        };
        return SurveyFieldQuestion;
    }(field_1.SurveyField);
    exports.SurveyFieldQuestion = SurveyFieldQuestion;
    var Questions = function () {
        function Questions() {
            this.values = [{
                pretty: 'Yes or no',
                value: 'BOOLEAN'
            }, {
                pretty: 'Multiple choice',
                value: 'MULTIPLE_OPTION'
            }, {
                pretty: 'Text',
                value: "TEXT"
            }, {
                pretty: 'Rating',
                value: 'RATING'
            }, {
                pretty: 'Smiley',
                value: 'SMILEY'
            }
            // {
            //   pretty: 'Email',
            //   value: 'EMAIL'
            // },
            // {
            //   pretty: 'Net promoter score',
            //   value: 'NPS'
            // }
            ];
        }
        ;
        return Questions;
    }();
    exports.Questions = Questions;
});
$__System.registerDynamic('d', [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    exports.__esModule = true;
    var Option = function () {
        function Option(obj) {
            this.title = obj && obj.title || '';
            this.image_url = obj && obj.image_url || '';
            this.content_type = obj && obj.content_type || 'text';
            this.payload = obj && obj.payload || obj && obj.title || this.title;
        }
        return Option;
    }();
    exports.Option = Option;
});
$__System.registerDynamic("12", ["c", "d"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var question_1 = $__require("c");
    var option_1 = $__require("d");
    var SurveyFieldQuestionMultipleOption = function (_super) {
        __extends(SurveyFieldQuestionMultipleOption, _super);
        function SurveyFieldQuestionMultipleOption(obj) {
            var _this = _super.call(this, obj) || this;
            _this.questionType = 'MULTIPLE_OPTION';
            _this.options = obj && obj.options && obj.options.map(function (option) {
                return new option_1.Option(option);
            }) || [new option_1.Option(), new option_1.Option()];
            return _this;
        }
        return SurveyFieldQuestionMultipleOption;
    }(question_1.SurveyFieldQuestion);
    exports.SurveyFieldQuestionMultipleOption = SurveyFieldQuestionMultipleOption;
});
$__System.registerDynamic("13", ["b", "e", "f", "10", "12"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    exports.__esModule = true;
    var question_boolean_1 = $__require("b");
    var question_rating_1 = $__require("e");
    var question_text_1 = $__require("f");
    var question_smiley_1 = $__require("10");
    var question_multiple_option_1 = $__require("12");
    exports.surveyQuestionFactory = function (type, question) {
        switch (type) {
            case 'BOOLEAN':
                return new question_boolean_1.SurveyFieldQuestionBoolean(question);
            case 'MULTIPLE_OPTION':
                return new question_multiple_option_1.SurveyFieldQuestionMultipleOption(question);
            case "TEXT":
                return new question_text_1.SurveyFieldQuestionText(question);
            case 'RATING':
                return new question_rating_1.SurveyFieldQuestionRating(question);
            case 'SMILEY':
                return new question_smiley_1.SurveyFieldQuestionSmiley(question);
        }
        throw new Error('Cant find this question type');
    };
});
$__System.registerDynamic("14", ["11", "13", "15"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var field_1 = $__require("11");
    var question_1 = $__require("13");
    var generic_1 = $__require("15");
    var SurveyFieldGroupCondition = function () {
        function SurveyFieldGroupCondition(obj) {
            this.comparisonType = obj && obj.comparisonType || 'gte';
            this.comparisonValue = obj && obj.comparisonValue || null;
            this.goTo = obj && obj.goTo || 'end';
        }
        SurveyFieldGroupCondition.prototype.setComparisonTypeAndValue = function (questionType, questionFormGroup) {
            switch (questionType) {
                case 'MULTIPLE_OPTION':
                    this.comparisonType = 'eq';
                    if (questionFormGroup.get('options') && questionFormGroup.get('options').value && questionFormGroup.get('options').value[0]) this.comparisonValue = questionFormGroup.get('options').value[0].title;
                    break;
                case 'RATING':
                    this.comparisonType = 'gte';
                    this.comparisonValue = 3;
                    break;
                case 'BOOLEAN':
                    this.comparisonType = 'eq';
                    this.comparisonValue = 'Yes';
                    break;
                case 'NPS':
                    this.comparisonType = 'gte';
                    this.comparisonValue = 5;
                    break;
                case 'TEXT':
                    this.comparisonType = 'longer';
                    this.comparisonValue = 10;
                    break;
            }
            return this;
        };
        return SurveyFieldGroupCondition;
    }();
    exports.SurveyFieldGroupCondition = SurveyFieldGroupCondition;
    var SurveyFieldGroup = function (_super) {
        __extends(SurveyFieldGroup, _super);
        function SurveyFieldGroup(obj) {
            var _this = _super.call(this, obj) || this;
            _this.fields = obj && obj.fields && obj.fields.map(function (field) {
                return new field_1.SurveyField(field);
            }) || [];
            _this.question = obj && obj.question && obj.question.questionType && question_1.surveyQuestionFactory(obj.question.questionType, obj.question) || null;
            _this.fieldGroups = obj && obj.fieldGroups && obj.fieldGroups.map(function (fieldGroup) {
                return new SurveyFieldGroup(fieldGroup);
            }) || [];
            // new field groups auto go to end.
            _this.conditions = obj && obj.conditions || [new SurveyFieldGroupCondition({ comparisonType: 'next', goTo: 'end' })];
            _this.skippable = obj && obj.skippable || false;
            return _this;
        }
        return SurveyFieldGroup;
    }(generic_1.GenericData);
    exports.SurveyFieldGroup = SurveyFieldGroup;
});
!function (t, e) {
  if ("function" == "function" && true) $__System.registerDynamic("16", [], false, function ($__require, $__exports, $__module) {
    $__module.uri = $__module.id;

    if (typeof e === "function") {
      return e.call($__exports, $__module, $__exports);
    } else {
      return e;
    }
  });else if ("undefined" != typeof exports) e(module, exports);else {
    var s = { exports: {} };e(s, s.exports), t.Hashids = s.exports;
  }
}(this, function (t, e) {
  "use strict";
  function s(t, e) {
    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
  }Object.defineProperty(e, "__esModule", { value: !0 });var h = function () {
    function t(t, e) {
      for (var s = 0; s < e.length; s++) {
        var h = e[s];h.enumerable = h.enumerable || !1, h.configurable = !0, "value" in h && (h.writable = !0), Object.defineProperty(t, h.key, h);
      }
    }return function (e, s, h) {
      return s && t(e.prototype, s), h && t(e, h), e;
    };
  }(),
      r = function () {
    function t() {
      var e = arguments.length <= 0 || void 0 === arguments[0] ? "" : arguments[0],
          h = arguments.length <= 1 || void 0 === arguments[1] ? 0 : arguments[1],
          r = arguments.length <= 2 || void 0 === arguments[2] ? "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890" : arguments[2];s(this, t);var a = 16,
          n = 3.5,
          i = 12,
          l = "error: alphabet must contain at least X unique characters",
          u = "error: alphabet cannot contain spaces",
          p = "",
          o = void 0,
          f = void 0;this.escapeRegExp = function (t) {
        return t.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
      }, this.parseInt = function (t, e) {
        return (/^(\-|\+)?([0-9]+|Infinity)$/.test(t) ? parseInt(t, e) : NaN
        );
      }, this.seps = "cfhistuCFHISTU", this.minLength = parseInt(h, 10) > 0 ? h : 0, this.salt = "string" == typeof e ? e : "", "string" == typeof r && (this.alphabet = r);for (var g = 0; g !== this.alphabet.length; g++) p.indexOf(this.alphabet.charAt(g)) === -1 && (p += this.alphabet.charAt(g));if (this.alphabet = p, this.alphabet.length < a) throw l.replace("X", a);if (this.alphabet.search(" ") !== -1) throw u;for (var c = 0; c !== this.seps.length; c++) {
        var b = this.alphabet.indexOf(this.seps.charAt(c));b === -1 ? this.seps = this.seps.substr(0, c) + " " + this.seps.substr(c + 1) : this.alphabet = this.alphabet.substr(0, b) + " " + this.alphabet.substr(b + 1);
      }this.alphabet = this.alphabet.replace(/ /g, ""), this.seps = this.seps.replace(/ /g, ""), this.seps = this._shuffle(this.seps, this.salt), (!this.seps.length || this.alphabet.length / this.seps.length > n) && (o = Math.ceil(this.alphabet.length / n), o > this.seps.length && (f = o - this.seps.length, this.seps += this.alphabet.substr(0, f), this.alphabet = this.alphabet.substr(f))), this.alphabet = this._shuffle(this.alphabet, this.salt);var d = Math.ceil(this.alphabet.length / i);this.alphabet.length < 3 ? (this.guards = this.seps.substr(0, d), this.seps = this.seps.substr(d)) : (this.guards = this.alphabet.substr(0, d), this.alphabet = this.alphabet.substr(d));
    }return h(t, [{ key: "encode", value: function () {
        for (var t = arguments.length, e = Array(t), s = 0; s < t; s++) e[s] = arguments[s];var h = "";if (!e.length) return h;if (e[0] && e[0].constructor === Array && (e = e[0], !e.length)) return h;for (var r = 0; r !== e.length; r++) if (e[r] = this.parseInt(e[r], 10), !(e[r] >= 0)) return h;return this._encode(e);
      } }, { key: "decode", value: function (t) {
        var e = [];return t && t.length && "string" == typeof t ? this._decode(t, this.alphabet) : e;
      } }, { key: "encodeHex", value: function (t) {
        if (t = t.toString(), !/^[0-9a-fA-F]+$/.test(t)) return "";for (var e = t.match(/[\w\W]{1,12}/g), s = 0; s !== e.length; s++) e[s] = parseInt("1" + e[s], 16);return this.encode.apply(this, e);
      } }, { key: "decodeHex", value: function (t) {
        for (var e = [], s = this.decode(t), h = 0; h !== s.length; h++) e += s[h].toString(16).substr(1);return e;
      } }, { key: "_encode", value: function (t) {
        for (var e = void 0, s = this.alphabet, h = 0, r = 0; r !== t.length; r++) h += t[r] % (r + 100);e = s.charAt(h % s.length);for (var a = e, n = 0; n !== t.length; n++) {
          var i = t[n],
              l = a + this.salt + s;s = this._shuffle(s, l.substr(0, s.length));var u = this._toAlphabet(i, s);if (e += u, n + 1 < t.length) {
            i %= u.charCodeAt(0) + n;var p = i % this.seps.length;e += this.seps.charAt(p);
          }
        }if (e.length < this.minLength) {
          var o = (h + e[0].charCodeAt(0)) % this.guards.length,
              f = this.guards[o];e = f + e, e.length < this.minLength && (o = (h + e[2].charCodeAt(0)) % this.guards.length, f = this.guards[o], e += f);
        }for (var g = parseInt(s.length / 2, 10); e.length < this.minLength;) {
          s = this._shuffle(s, s), e = s.substr(g) + e + s.substr(0, g);var c = e.length - this.minLength;c > 0 && (e = e.substr(c / 2, this.minLength));
        }return e;
      } }, { key: "_decode", value: function (t, e) {
        var s = [],
            h = 0,
            r = new RegExp("[" + this.escapeRegExp(this.guards) + "]", "g"),
            a = t.replace(r, " "),
            n = a.split(" ");if (3 !== n.length && 2 !== n.length || (h = 1), a = n[h], "undefined" != typeof a[0]) {
          var i = a[0];a = a.substr(1), r = new RegExp("[" + this.escapeRegExp(this.seps) + "]", "g"), a = a.replace(r, " "), n = a.split(" ");for (var l = 0; l !== n.length; l++) {
            var u = n[l],
                p = i + this.salt + e;e = this._shuffle(e, p.substr(0, e.length)), s.push(this._fromAlphabet(u, e));
          }this._encode(s) !== t && (s = []);
        }return s;
      } }, { key: "_shuffle", value: function (t, e) {
        var s = void 0;if (!e.length) return t;for (var h = t.length - 1, r = 0, a = 0, n = 0; h > 0; h--, r++) {
          r %= e.length, a += s = e.charAt(r).charCodeAt(0), n = (s + r + a) % h;var i = t[n];t = t.substr(0, n) + t.charAt(h) + t.substr(n + 1), t = t.substr(0, h) + i + t.substr(h + 1);
        }return t;
      } }, { key: "_toAlphabet", value: function (t, e) {
        var s = "";do s = e.charAt(t % e.length) + s, t = parseInt(t / e.length, 10); while (t);return s;
      } }, { key: "_fromAlphabet", value: function (t, e) {
        for (var s = 0, h = 0; h < t.length; h++) {
          var r = e.indexOf(t[h]);s += r * Math.pow(e.length, t.length - h - 1);
        }return s;
      } }]), t;
  }();e.default = r, t.exports = e.default;
});

$__System.registerDynamic("17", ["15", "11", "14", "16"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var generic_1 = $__require("15");
    var field_1 = $__require("11");
    var survey_field_group_1 = $__require("14");
    // import { shortid } from 'shortid';
    var Hashids = $__require("16");
    ;
    ;
    var Survey = function (_super) {
        __extends(Survey, _super);
        // public afterCompletion?: ISurveyFieldGroup[];  
        function Survey(obj) {
            if (obj === void 0) {
                obj = {};
            }
            var _this = _super.call(this, obj) || this;
            // this.draft = (obj && obj.draft) || {};
            _this.shortLink = obj && obj.shortLink || new Hashids(_this._id).encode(1, 2, 3);
            _this.shortLinkActive = obj ? obj.shortLinkActive : true;
            _this.icon = obj && obj.icon || 'linear-gradient(150deg, #53f 15%, #05d5ff 70%, #a6ffcb 94%)';
            // this.welcome = (obj && obj.welcome) || { text: 'Please take our survey!' };
            _this.title = obj && obj.title || "Blank survey";
            _this.fieldGroups = obj && obj.fieldGroups && obj.fieldGroups.map(function (fieldGroup) {
                return new survey_field_group_1.SurveyFieldGroup(fieldGroup);
            }) || [new survey_field_group_1.SurveyFieldGroup()];
            _this.pageId = obj && obj.pageId || ''; // Optionally add the ID of a Messenger page.
            _this.description = obj && obj.description || "An empty survey.";
            _this.reward = obj && obj.reward || null;
            _this.pluginOpts = obj && obj.pluginOpts || { styles: { bubbleBg: 'rgba(21,100,173, 1)', headerBg: 'rgba(22,118,204, 1)', headerFont: 'rgba(255,255,255,1)', bodyBg: 'rgba(255,255,255,0)', bodyFont: 'rgba(255,255,255,1)', styleList: '', bubbleFont: "rgba(255,255,255,1)", buttonBg: "rgba(27, 133, 228, 1)", buttonFont: "rgba(255,255,255,1)" }, useCustom: false, custom: '' };
            _this.accountId = obj && obj.accountId || null;
            _this.meta = obj && obj.meta || {};
            _this.isExample = obj && obj.isExample || false;
            _this.exampleMeta = obj && obj.exampleMeta || {};
            _this.extendedFbId = obj && obj.extendedFbId || null;
            // this.completion = (obj && obj.completion && obj.completion.map((field: ISurveyField) => new SurveyField(field))) || [new SurveyField()];
            _this.completion = obj && obj.completion && obj.completion.map(function (field) {
                return new field_1.SurveyField(field);
            }) || [new field_1.SurveyField({ type: 'TEXT' })];
            return _this;
        }
        /**
         * @description Flatten nested field groups to an array
         */
        Survey.prototype.getAllFieldGroups = function () {
            // return this.fieldGroups.map((fieldGroup: ISurveyFieldGroup) => this.getNestedFieldGroups(fieldGroup)).reduce((a, b) => a.concat(b), []).concat(this.fieldGroups);
            return this.getNestedFieldGroups(this);
        };
        Survey.prototype.getNestedFieldGroups = function (obj) {
            var _this = this;
            return [].concat.apply([], obj.fieldGroups).concat(obj.fieldGroups.map(function (x) {
                return _this.getNestedFieldGroups(x);
            }).reduce(function (a, b) {
                return a.concat(b);
            }, []));
        };
        Survey.prototype.getRootIdFromNestedFieldGroupId = function (id) {
            var _this = this;
            var groups = [];
            this.fieldGroups.forEach(function (obj) {
                groups.push({
                    id: obj.id,
                    ids: _this.getNestedFieldGroups(obj).map(function (group) {
                        return group.id;
                    }).concat(obj.id)
                });
            });
            // now find it.
            for (var i = 0; i < groups.length; i++) if (groups[i].ids.indexOf(id) > -1) return groups[i].id;
        };
        return Survey;
    }(generic_1.GenericData);
    exports.Survey = Survey;
});
$__System.registerDynamic("18", ["15", "19", "17"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var generic_1 = $__require("15");
    var response_1 = $__require("19");
    var survey_1 = $__require("17");
    /**
     * @description a conversation with a user. This is abstract on the server but we use one {or some} of its static methods on the client.
     * @prop {string} accountId — makes reads from /api/read faster, because req.user.accountId
     * can be used to just find these conversation objects directly.
     *
     */
    var Conversation = function (_super) {
        __extends(Conversation, _super);
        function Conversation(obj) {
            var _this = _super.call(this, obj) || this;
            _this.currentFieldGroupId = obj && obj.currentFieldGroupId || '';
            // this.userId = (obj && obj.userId) || "";
            _this.survey = obj && obj.survey && new survey_1.Survey(obj.survey) || null;
            _this.platform = obj && obj.platform || '';
            _this.rewardSent = obj && obj.rewardSent || false;
            _this.started = obj && obj.started || [new Date()];
            _this.ended = obj && obj.ended || [];
            _this.userData = obj && obj.userData || null;
            _this.surveyId = obj && obj.surveyId || "";
            _this.accountId = obj && obj.accountId || "";
            _this.misc = obj && obj.misc || {};
            _this.responses = obj && obj.responses && obj.responses.map(function (response) {
                return new response_1.Response(response);
            }) || [];
            return _this;
        }
        /**
         * @description Messengerconversation overrides this.
         * Here we say on the plugin (and in the test env),
         * the *first* response we received is actually a response
         * to the question that was presented to the user on the client.
         * That question originated on the client, not the server, so here
         * we have to acknowledge that this response is for that question.
         */
        Conversation.prototype.getLastFieldGroup = function (survey) {
            console.log('Calling getCurrentFieldGroup in base class—if this is not a test it\'s an error!');
            // throw new Error('Called .getCurrentFieldGroup in the base class when it should have been called in a derived class.');
            if (!this.currentFieldGroupId) {
                // Only if conversation is new or already over.
                if (this.responses.length === 0)
                    // Acknowledge that the response received
                    // was for the first question which originated
                    // on the client, and never touched the server.
                    // AKA the response here will be a response for
                    // question  1on the survey.
                    return survey.fieldGroups[0];else return null;
            }
            // this.currentFieldGroupId was set from the last time a response was passed.
            var fieldGroups = survey.getAllFieldGroups();
            return fieldGroups[fieldGroups.map(function (fieldGroup) {
                return fieldGroup.id;
            }).indexOf(this.currentFieldGroupId)];
        };
        /**
        * We received a response.
        *
        */
        Conversation.prototype.saveResponseAndGetNextMessages = function (response, account) {
            var messages, finalFieldGroupId, nextFieldGroupId;
            /* Get the fieldgroup that this response responded to. If its a new conversation, this will be null */
            var lastFieldGroup = this.getLastFieldGroup(this.survey);
            // These need to happen sequentially because hydration depends on response type.
            // Here we're just saying if there wasn't a last field group, we will understand all messages given to us as text ("TEXT").
            response.questionType = lastFieldGroup && lastFieldGroup.question ? lastFieldGroup.question.questionType : "TEXT";
            response.hydrateResponseBody();
            var canIncrement = this.responseCanIncrement(lastFieldGroup, response);
            // Add the response to the conversation. Need to set it before fieldGroupId is incremented.
            // If fieldGroupId is incremented first, then the response will have an incorrect (+1) fieldGroupId.
            this.addResponse(response, lastFieldGroup, canIncrement);
            //—————————————————————————————————————————————
            // If the account is rate - limited, we want to
            // stop here.
            //—————————————————————————————————————————————
            if (account.periodCount > account.subscription.conversationLimit) return [account.rateLimitResponse];
            nextFieldGroupId = canIncrement ? this.getNextFieldGroupId(lastFieldGroup, response) : this.currentFieldGroupId;
            // if (canIncrement)
            // nextFieldGroupId = this.getNextFieldGroupId(survey, response, lastFieldGroup);
            // const s = this.getCurrentSurvey(survey);
            // const groups = s.getAllFieldGroups();
            // const nextGroup = groups[groups.map((group) => group.id).indexOf(nextFieldGroupId)];
            // this.currentFieldGroupId = nextGroup.question ? nextFieldGroupId : s.getRootIdFromNestedFieldGroupId;
            // this.currentFieldGroupId
            /* Now that its increemented, we use the currentFieldGroupId to get the next messages. */
            var val = this.getNextMessages(lastFieldGroup ? lastFieldGroup.id : null, nextFieldGroupId);
            this.currentFieldGroupId = val.nextFieldGroupId;
            // this.getCurrentFieldGroupId(survey, nextFieldGroupId);
            if (!this.currentFieldGroupId) {
                this.ended.push(new Date());
                if (this.shouldSendReward(this.survey)) {
                    this.rewardSent = true;
                    // const rs = rewards.filter((reward: IReward) => reward.id === survey.rewardId);
                    // if (!rs || rs.length < 1) throw new Error('Did not pass reward to modifyAndGetMessages');
                    (_a = val.fields).unshift.apply(_a, this.survey.reward.fields);
                }
            }
            return val.fields;
            var _a;
        };
        ;
        /**
         * @description We handle this differently for messenger.
         * See the messenger object for messenger implementation.
         */
        Conversation.prototype.responseCanIncrement = function (fieldGroup, response) {
            // IF the conversation is starting the fieldGroup will be incremented.
            if (!fieldGroup) {
                // If the convo is beginning
                if (this.responses.length === 0) {
                    // return true;
                } else {
                    // If the convo has ended
                    return false;
                }
            }
            return fieldGroup.question ? fieldGroup.question.responseSatisfiesQuestion(response) : true;
        };
        Conversation.prototype.shouldSendReward = function (s) {
            return !!(!this.rewardSent && s.reward);
        };
        // public getCurrentFieldGroupId(s: ISurvey, nextFieldGroupId: string) {
        //     // let retVal = [];
        //     /* If the fieldId is null, there are no more fields to send, send the onComplete message,
        //         additionally, if the reward hasn't been sent, send it now. */
        //     const survey: ISurvey = this.getCurrentSurvey(s);
        //     const groups = survey.getAllFieldGroups();
        //     const g = groups[groups.map(g => g.id).indexOf(nextFieldGroupId)];
        //     // const next = survey.fieldGroups[survey.fieldGroups.map(g => g.id).indexOf(survey.getRootIdFromNestedFieldGroupId(nextFieldGroupId)) + 1];
        //     return g && g.question ? g.id : (next ? next.id : null);
        // }
        Conversation.prototype.getNextMessages = function (lastFieldGroupId, nextFieldGroupId) {
            var retVal = [],
                groups = this.survey.getAllFieldGroups(),
                lastMessages = [],
                lastGroup = groups[groups.map(function (g) {
                return g.id;
            }).indexOf(lastFieldGroupId)] || null;
            /* If the fieldId is null, there are no more fields to send, send the onComplete message,
                additionally, if the reward hasn't been sent, send it now. */
            if (lastGroup) lastMessages = lastGroup.fields.filter(function (f) {
                return f.isAfter;
            });
            if (!nextFieldGroupId || nextFieldGroupId === 'end') retVal.push.apply(retVal, [].concat(lastMessages, this.survey.completion));else {
                var g = groups[groups.map(function (g) {
                    return g.id;
                }).indexOf(nextFieldGroupId)];
                retVal.push.apply(retVal, [].concat(lastMessages, g.fields.filter(function (f) {
                    return !f.isAfter;
                })));
                if (!g.question) {
                    var prevFieldGroupId = nextFieldGroupId;
                    nextFieldGroupId = this.getNextFieldGroupId(g);
                    // const nextGroup = this.survey.fieldGroups[this.survey.fieldGroups.map(g => g.id).indexOf(this.survey.getRootIdFromNestedFieldGroupId(nextFieldGroupId)) + 1];
                    if (!nextFieldGroupId || nextFieldGroupId === 'end') retVal.push.apply(retVal, [].concat(lastMessages, this.survey.completion));else {
                        var result = this.getNextMessages(prevFieldGroupId, nextFieldGroupId);
                        nextFieldGroupId = result.nextFieldGroupId;
                        retVal.push.apply(retVal, result.fields.filter(function (f) {
                            return !f.isAfter;
                        }));
                    }
                } else retVal.push(g.question);
            }
            return { fields: retVal, nextFieldGroupId: nextFieldGroupId };
        };
        /**
         * @description Set the next field group id.
         * @param {Object | null} FieldGroup—Can pass a fieldgroup or null.
         * We can have a null passed here in the case of a messenger conversation,
         * where the first response generates a null for previousFieldGroup.
         * In the case that this happens, we still want to increment the
         * fieldGroupId.
         *
         * NOTE this may not return the currentFieldGroupId, as some fields are not terminal.
         */
        Conversation.prototype.getNextFieldGroupId = function (previousFieldGroup, response) {
            // TODO: Fix.
            if (response && response.body && typeof response.body.getText !== 'function') response.hydrateResponseBody();
            var currentFieldGroupIndex = 0,
                matchedConditionId;
            if (previousFieldGroup) {
                // If a condition exists, and it passes, we will set the fieldGroupId to the goTo value. 
                // If a condition exists, and it fails, we will find its rootId, so we can increment.
                // Find the first condition that's true, if any.
                for (var k = 0; k < previousFieldGroup.conditions.length; k++) {
                    var cv = previousFieldGroup.conditions[k].comparisonValue;
                    var v = response && response.body && response.body.getText() || null;
                    var goTo = previousFieldGroup.conditions[k].goTo;
                    switch (previousFieldGroup.conditions[k].comparisonType) {
                        case 'shorter':
                            if (v.length < cv) matchedConditionId = goTo;
                            break;
                        case 'longer':
                            if (v.length > cv) matchedConditionId = goTo;
                            break;
                        case 'gte':
                            if (parseInt(v) >= parseInt(cv)) matchedConditionId = goTo;
                            break;
                        case 'lte':
                            if (parseInt(v) <= parseInt(cv)) matchedConditionId = goTo;
                            break;
                        case 'gt':
                            if (parseInt(v) > parseInt(cv)) matchedConditionId = goTo;
                            break;
                        case 'lt':
                            if (parseInt(v) < parseInt(cv)) matchedConditionId = goTo;
                            break;
                        case 'eq':
                            if (v === cv) matchedConditionId = goTo;
                            break;
                        case 'neq':
                            if (v !== cv) matchedConditionId = goTo;
                            break;
                        case 'next':
                            matchedConditionId = goTo;
                            break;
                    }
                    if (matchedConditionId) break;
                }
                return matchedConditionId || null;
                // if (matchedConditionId) {
                //     return matchedConditionId;
                // } 
                // else {
                //     // const id = s.getRootFromNestedFieldGroupId(response.fieldGroupId);
                //     const next = survey.fieldGroups[survey.fieldGroups.map((fieldGroup: ISurveyFieldGroup) => fieldGroup.id).indexOf(s.getRootIdFromNestedFieldGroupId(response.fieldGroupId)) + 1];
                //     return next && next.id || null;
                // }
            } else {
                // no previous fieldGroup, next fieldgroup will be the first fieldgroup
                // This is basically just for messenger.
                return this.survey.fieldGroups[0].id;
            }
            // If a field group was passed.
            // if (previousFieldGroup) {
            // currentFieldGroupIndex = survey.fieldGroups
            //     .map((group: ISurveyFieldGroup) => group.id).indexOf(previousFieldGroup.id);
            // }
            /* If there is no current fieldGroup found from the currentFieldGroupId, then the convo is starting and we put the next as the first fieldgroup., else, increment. */
            // If there was a fieldgroup, get the index of that 
            // and use it to increment fieldgroup by 1. 
            // const nextFieldGroup = survey.fieldGroups[previousFieldGroup ? currentFieldGroupIndex + 1 : 0];
        };
        Conversation.prototype.addResponse = function (response, fieldGroup, canIncrement) {
            // If there is no fieldGroup (aka survey is over / beginning) just assume the response is a text input.
            response.convoId = this.id;
            response.passed = canIncrement ? true : false;
            response.questionType = fieldGroup && fieldGroup.question ? fieldGroup.question.questionType : null;
            response.fieldGroupId = fieldGroup ? fieldGroup.id : null;
            this.responses.push(response);
        };
        /**
         * @description Builds template from existing responses.
         * @returns whether there was anything to build
         */
        Conversation.prototype.buildTemplateFromState = function (survey, account) {
            // const d = document.createElement('div');
            // this.responses.forEach((response: IResponse) => {
            //     if (!response.fieldGroupId) return console.log('Response did not receive a field group ID upon creation!');
            //     const group = templateService.createMessageGroup(survey.icon);
            //     const fgs = survey.getAllFieldGroups();
            //     const mes = group.querySelector('.message-group-messages');
            //     const fieldGroup = fgs[fgs.map((fieldGroup: ISurveyFieldGroup) => fieldGroup.id).indexOf(response.fieldGroupId)];
            //     response.hydrateResponseBody();
            //     fieldGroup.fields.forEach((field: ISurveyField) => {
            //         mes.appendChild(templateService.createBubble(field, templateService.classes.receiver));
            //     });
            //     if (fieldGroup.question)
            //         mes.appendChild(templateService.createBubble(fieldGroup.question, templateService.classes.receiver));
            //     d.appendChild(group);
            //     const r = templateService.createBubble(response.body.getText(), templateService.classes.sender);
            //     r.setAttribute('disabled', 'true');
            //     d.appendChild(r);
            // });
            // return <HTMLElement>d;
        };
        // /**
        //  * @description Here all we have is the last response from the conversation.
        //  * @param survey 
        //  */
        // public getNextFieldGroup(survey: ISurvey): ISurveyFieldGroup {
        //     const fieldGroups = survey.getAllFieldGroups();
        //     const response = this.responses[this.responses.length - 1];
        //     if (response) {
        //         const fieldGroup = fieldGroups[fieldGroups.map((fieldGroup: ISurveyFieldGroup) => fieldGroup.id).indexOf(response.fieldGroupId)];
        //         const nextFieldGroupId = this.getNextFieldGroupId(survey, response, fieldGroup);
        //         return fieldGroups[fieldGroups.map((fieldGroup: ISurveyFieldGroup) => fieldGroup.id).indexOf(nextFieldGroupId)] || fieldGroups[fieldGroups.length - 1];
        //     } else return survey.fieldGroups[0];
        // }
        /**
         * @description Get average rating.
         * @returns {number | null} average rating or null if empty.
         */
        Conversation.getAverageRating = function (responses, opts) {
            var _opts = opts || {};
            var responsesWithNumberBodyText = responses.filter(function (response) {
                return response.questionType === 'RATING';
            }).filter(function (response) {
                return !isNaN(parseInt(response.body.text)) && parseInt(response.body.text) <= 5;
            });
            /* For this granulated bucket, there are no results, so there is no average rating */
            if (responsesWithNumberBodyText.length === 0) return null;
            /* For this granulated bucket, there is one result, so we'll say the average rating is whatever that value is. */
            if (responsesWithNumberBodyText.length === 1) return parseInt(responsesWithNumberBodyText[0].body.getText());
            var average = responsesWithNumberBodyText.reduce(function (acc, response) {
                var w = ++acc.weight;
                var value = response.body.getText() * (1 / w) + acc.value * (1 - 1 / w);
                return { value: value, weight: w };
            }, { weight: _opts.currentWeight || 0, value: _opts.currentValue || 0 }).value;
            return average;
        };
        /**
         * @description Get average rating.
         * @returns {number | null} average rating or null if empty.
         */
        Conversation.getAverageNPS = function (responses) {
            // TODO;
            return 0;
        };
        /**
         * @description Get average rating.
         * @returns {number | null} average rating or null if empty.
         */
        Conversation.getAverageLength = function (responses) {
            // TODO.
            return 0;
        };
        return Conversation;
    }(generic_1.GenericData);
    exports.Conversation = Conversation;
});
$__System.registerDynamic("1a", ["1b"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var subscription_1 = $__require("1b");
    var ProSubscription = function (_super) {
        __extends(ProSubscription, _super);
        function ProSubscription(obj) {
            var _this = _super.call(this, obj) || this;
            _this.price = obj && obj.price || '19.99';
            _this.title = obj && obj.title || 'pro';
            _this.id = obj && obj.id || 'pro';
            _this.showFmBranding = obj && obj.showFmBranding || false;
            _this.conversationLimit = obj && obj.conversationLimit || 5000;
            return _this;
        }
        return ProSubscription;
    }(subscription_1.Subscription);
    exports.ProSubscription = ProSubscription;
});
$__System.registerDynamic("1c", ["1b"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var subscription_1 = $__require("1b");
    var EnterpriseSubscription = function (_super) {
        __extends(EnterpriseSubscription, _super);
        function EnterpriseSubscription(obj) {
            var _this = _super.call(this, obj) || this;
            _this.showFmBranding = obj.showFmBranding || false;
            _this.price = obj && obj.price || '99.99';
            _this.title = obj && obj.title || 'enterprise';
            _this.id = obj && obj.id || 'enterprise';
            _this.conversationLimit = obj && obj.conversationLimit || 999999;
            return _this;
        }
        return EnterpriseSubscription;
    }(subscription_1.Subscription);
    exports.EnterpriseSubscription = EnterpriseSubscription;
});
$__System.registerDynamic("1b", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    exports.__esModule = true;
    var Subscription = function () {
        function Subscription(obj) {
            this.amount = obj && obj.amount || null;
            this.created = obj && obj.created || null;
            this.currency = obj && obj.currency || null;
            this.id = obj && obj.id || null;
            this.interval = obj && obj.interval || null;
            this.interval_count = obj && obj.interval_count || null;
            this.livemode = obj && obj.livemode || null;
            this.metadata = obj && obj.metadata || null;
            this.name = obj && obj.name || null;
            this.object = obj && obj.object || null;
            this.statement_descriptor = obj && obj.statement_descriptor || null;
            this.trial_period_days = obj && obj.trial_period_days || null;
        }
        return Subscription;
    }();
    exports.Subscription = Subscription;
});
$__System.registerDynamic("1d", ["1b"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var subscription_1 = $__require("1b");
    var FreeSubscription = function (_super) {
        __extends(FreeSubscription, _super);
        function FreeSubscription(obj) {
            var _this = _super.call(this, obj) || this;
            _this.conversationLimit = obj && obj.conversationLimit || 100;
            _this.showFmBranding = obj && obj.showFmBranding || true;
            _this.price = obj && obj.price || '0';
            _this.title = obj && obj.title || 'free';
            _this.id = obj && obj.id || 'free';
            return _this;
        }
        return FreeSubscription;
    }(subscription_1.Subscription);
    exports.FreeSubscription = FreeSubscription;
});
$__System.registerDynamic("1e", ["1a", "1c", "1d"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    exports.__esModule = true;
    var pro_subscription_1 = $__require("1a");
    var enterprise_subscription_1 = $__require("1c");
    var free_subscription_1 = $__require("1d");
    exports.subscriptionFactory = function (subscription) {
        if (!subscription) return new free_subscription_1.FreeSubscription();
        switch (subscription.id) {
            case 'free':
                return new free_subscription_1.FreeSubscription(subscription);
            case 'pro':
                return new pro_subscription_1.ProSubscription(subscription);
            case 'enterprise':
                return new enterprise_subscription_1.EnterpriseSubscription(subscription);
            default:
                return new free_subscription_1.FreeSubscription(subscription);
        }
    };
});
$__System.registerDynamic("11", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    exports.__esModule = true;
    /**
     * @description These are used in outgoing messages.
     * They need to have a type because, for example,
     * when sending to FB, we need to know what type
     * of message body to construct.
     */
    var SurveyField = function () {
        function SurveyField(obj) {
            /* Obj can be one or other, but not both */
            this.prompt = obj && obj.prompt || '';
            this.attachment = obj && obj.attachment || null;
            this.isAfter = obj && obj.isAfter || false;
            this.type = obj && obj.type || null;
            // We may want to have this as "TEXT" 
            // that is not always a good default. its fucking with messenger this so we can switch when building the field in the editor between attacment / prompt (for validation).
        }
        return SurveyField;
    }();
    exports.SurveyField = SurveyField;
});
$__System.registerDynamic("1f", ["15", "1e", "11"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var generic_1 = $__require("15");
    var subscription_factory_1 = $__require("1e");
    var field_1 = $__require("11");
    var Account = function (_super) {
        __extends(Account, _super);
        function Account(obj) {
            var _this = _super.call(this, obj) || this;
            _this.files = obj && obj.files || [];
            _this.logo = obj && obj.logo || '';
            _this.stripeId = obj && obj.stripeId || '';
            _this.chat_icon = obj && obj.chat_icon || 'https://survey-uploads.s3.amazonaws.com/uploads/avatar_blank.png';
            _this.rateLimitResponse = obj && obj.rateLimitResponse || new field_1.SurveyField({ type: 'TEXT', prompt: 'Thanks for messaging me! Please try again later.' });
            _this.username = obj && obj.username || ""; // Must be an email
            _this.password = obj && obj.password || "";
            _this.subtitle = obj && obj.subtitle || "";
            _this.subscription = obj && obj.subscription && subscription_factory_1.subscriptionFactory(obj.subscription) || subscription_factory_1.subscriptionFactory();
            _this.facebookAppScopedId = obj && obj.facebookAppScopedId || "";
            _this.facebookToken = obj && obj.facebookToken || "";
            _this.subscribedPages = obj && obj.subscribedPages || [];
            _this.pages = obj && obj.pages || [];
            _this.rules = obj && obj.rules || [];
            _this.periodStart = obj && obj.periodStart || new Date();
            _this.periodCount = obj && obj.periodCount || 0;
            _this.chat_response_delay_in_seconds = obj && obj.chat_response_delay_in_seconds || 2;
            _this.webhooks = obj && obj.webhooks || [];
            _this.enable_completion_emails = obj && obj.enable_completion_emails || false;
            _this.enable_summary_emails = obj && obj.enable_summary_emails || true;
            _this.summary_email_frequency = obj && obj.summary_email_frequency || 'WEEKLY';
            _this.eventsSummary = obj && obj.eventsSummary || [];
            _this.events = obj && obj.events || [];
            return _this;
        }
        return Account;
    }(generic_1.GenericData);
    exports.Account = Account;
});
$__System.registerDynamic("20", [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    exports.__esModule = true;
    var SmoothScroll = function () {
        function SmoothScroll(
        // public window: Window,
        scrollEl, document) {
            this.scrollEl = scrollEl;
            this.document = document;
        }
        // private currentYPos() {
        //     // Firefox, Chrome, Opera, Safari
        //     if (this.window.pageYOffset) return this.window.pageYOffset;
        //     if (this.document.documentElement && this.document.documentElement.scrollTop)
        //         return this.document.documentElement.scrollTop;
        //     if (this.document.body.scrollTop) return this.document.body.scrollTop;
        //     return 0;
        // }
        SmoothScroll.prototype.elYPos = function (id) {
            var elm = this.document.getElementById(id);
            var y = elm.offsetTop;
            var node = elm;
            while (node.offsetParent && node.offsetParent != this.document.body) {
                node = node.offsetParent;
                y += node.offsetTop;
            }
            return y;
        };
        SmoothScroll.prototype.scrollToBottom = function (currentScroll) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                (currentScroll ? currentScroll : Promise.resolve()).then(function () {
                    resolve(_this.scrollTo(_this.scrollEl.scrollHeight - _this.scrollEl.clientHeight));
                });
            });
        };
        SmoothScroll.prototype.scrollTo = function (idOrPosition) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                var startY = _this.scrollEl.scrollTop || window.pageXOffset;
                var stopY = typeof idOrPosition === 'string' ? _this.elYPos(idOrPosition) : idOrPosition;
                var distance = stopY > startY ? stopY - startY : startY - stopY;
                // if (distance < 20) {
                //     this.scrollEl.scrollTop = stopY; return;
                // }
                var speed = Math.round(distance / 10) < 10 ? 10 : Math.round(distance / 10);
                if (speed >= 20) speed = 20;
                var step = Math.round(distance / 25) < 1 ? 1 : Math.round(distance / 25);
                var leapY = stopY > startY ? startY + step : startY - step;
                var timer = 0;
                if (stopY > startY) {
                    for (var i = startY; i < stopY; i += step) {
                        (function (t, timer, speed, leapY, isLastIteration) {
                            setTimeout(function () {
                                t.scrollTop = leapY;
                                if (isLastIteration) return resolve();
                            }, timer * speed);
                        })(_this.scrollEl, timer, speed, leapY, i + step >= stopY);
                        leapY += step;
                        if (leapY > stopY) leapY = stopY;
                        timer++;
                    }
                    return;
                }
                for (var i = startY; i > stopY; i -= step) {
                    (function (t, timer, speed, leapY) {
                        setTimeout(function () {
                            t.scrollTop = leapY;
                        }, timer * speed);
                    })(_this.scrollEl, timer, speed, leapY);
                    // setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                    leapY -= step;
                    if (leapY < stopY) leapY = stopY;
                    timer++;
                }
                if (stopY === startY) return resolve();
            });
        };
        return SmoothScroll;
    }();
    exports.SmoothScroll = SmoothScroll;
});
$__System.registerDynamic("21", ["22"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var abstract_handler_1 = $__require("22");
    var PluginAdapterMock = function (_super) {
        __extends(PluginAdapterMock, _super);
        function PluginAdapterMock() {
            return _super.call(this) || this;
        }
        PluginAdapterMock.prototype.init = function (conversation, account, emitter) {
            var _this = this;
            this.account = account;
            this.conversation = conversation;
            this.emitter = emitter;
            // User sends us a message, we must process it.
            this.emitter.listeners.push({
                name: 'RESPONSE', fn: function (response) {
                    _this.response = response;
                    _this.onMessageReceived();
                }
            });
            return Promise.resolve(true);
        };
        PluginAdapterMock.prototype.preSend = function () {
            return Promise.resolve(this.emitter.emit('STATE_PENDING'));
        };
        PluginAdapterMock.prototype.sendMessageToUser = function (data) {
            return Promise.resolve(this.emitter.emit('MESSAGE', data));
        };
        PluginAdapterMock.prototype.postSend = function () {
            return Promise.resolve(this.emitter.emit('STATE_READY'));
        };
        PluginAdapterMock.prototype.onError = function (err) {
            console.log(err);
        };
        return PluginAdapterMock;
    }(abstract_handler_1.AbstractHandler);
    exports.PluginAdapterMock = PluginAdapterMock;
    // public registerMessageReceivedHandler(boundFn: (message: ISurveyField) => Promise<boolean>): any {
    //     this.onMessageReceived = boundFn;
    // }
    // /* Send fields back to user */
    // private queueAndSend(response?: IResponse): Promise<boolean> {
    // private getSendFn(conversation: IConversationModel, field: ISurveyField, throttle: number) {
    //     return () => new Promise((resolve, reject) => {
    //         setTimeout((ctx: MessageSender, conversation: IConversationModel, field: ISurveyField) => {
    //             ctx.http
    //                 // .post(conversation.configureRequest(field, conversation.userId))
    //                 .then((result: any /* TODO: Define */) => resolve(result))
    //                 .catch((err: any) => { reject(err) });
    //         }, throttle, this, conversation, field);
    //     });
    // }
    // if (this.state !== 'READY') return;
    // this.state = 'PENDING';
    // this.emit('MESSAGE_STATUS', 'PENDING');
    // Promise.resolve(true)
    //     .then(() => this.conversation.onResponseReceived(response, this.survey, this.rewards))
    //     .then((messages: ISurveyField[]) => this.sendMessageArray(messages))
    //     .then(() => {
    //         this.emit('MESSAGE_STATUS', 'READY');
    //         this.state = 'READY';
    //         return true;
    //     }).catch((err: any) => {
    //         console.log('Attempted to send messages but couldn`t. This should never happen since sending messages in browser is synchronous.');
    //         this.state = 'ERRORED';
    //     });
    // }
    // need to get data. In a mock, its on the window.
    // public init(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         if (!this.survey || !this.account || !this.conversation)
    //             throw new Error('Environment not configured correctly');
    //         this.state = 'READY';
    //         this.queueAndSend();
    //     });
    // }
    /* We recieved a message from the user. On non mocked service, we wait for the result from addResponse to resolve to true. */
    // public send(text: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         const response: IResponse = new Response({
    //             surveyId: this.survey._id,
    //             body: {
    //                 text: text
    //             },
    //             userId: '', // Could also populate this with something.
    //             platform: 'WEB' // Web or widget?
    //         });
    //         // this.conversation.addResponse(response);
    //         this.queueAndSend(response);
    //         return resolve(true);
    //     });
    // } 
});
$__System.registerDynamic('22', [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    exports.__esModule = true;
    function setVisibleTimeout(callback, delay) {
        if (typeof window === 'undefined') return setTimeout(callback, delay);
        var id = null,
            t = 0,
            prefix = '';
        'o webkit moz ms'.replace(/\S+/g, function (p) {
            if (p + 'Hidden' in document) {
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
            } else {
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
        return function () {
            document.removeEventListener(prefix + 'visibilitychange', onVisibilityChange, false);
            if (id !== null) {
                clearTimeout(id);
                id = null;
            }
        };
    }
    /**
     * @description Takes responses and sends messages in return
     */
    var AbstractHandler = function () {
        function AbstractHandler() {}
        /**
         * @description We've received a response from the user, we have to process it heavily in .onResponseReceived,
         * and then send messages back to the user.
         */
        AbstractHandler.prototype.onMessageReceived = function (messageSendingCb) {
            var _this = this;
            if (!this.response || !this.account) return this.onError('Missing data');
            var messages = this.conversation.saveResponseAndGetNextMessages(this.response, this.account);
            return this.preSend().then(function () {
                return _this.sendMessageArray(messages, messageSendingCb);
            }).then(function () {
                return _this.postSend();
            })["catch"](function (err) {
                return console.log(err);
            });
        };
        AbstractHandler.prototype.sendMessageArray = function (messages, cb) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                // Count errors for send attempts for all messages
                var errCount = 0;
                var loop = function (message, remaining) {
                    return new Promise(function (r, reject) {
                        if (cb) cb();
                        setVisibleTimeout(function () {
                            return _this.sendMessageToUser({ message: message, remaining: remaining }).then(function (result) {
                                r(true);
                            });
                        }, remaining.length === messages.length ? 0 : parseFloat(_this.account.chat_response_delay_in_seconds) * 1000);
                    });
                };
                var doLoop = function (messages, remaining) {
                    // Loop into the next message, will resolve true if message is sent.
                    loop(messages[0], remaining).then(function () {
                        var next = messages.slice(1);
                        if (next.length === 0) return resolve(true);
                        doLoop(next, next);
                    });
                    // .catch((err: any) => {
                    //     errCount++;
                    //     if (errCount === 10)
                    //         return reject('Could not send messages');
                    //     // If its a network error, give it a second to reconnect
                    //     setTimeout(() => {
                    //         doLoop(messages, n);
                    //     }, 1250);
                    // });
                };
                // need to loop through messages, one by one.
                doLoop(messages, messages);
            });
        };
        return AbstractHandler;
    }();
    exports.AbstractHandler = AbstractHandler;
});
$__System.registerDynamic("23", ["22"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var abstract_handler_1 = $__require("22");
    /**
     * @description Client side code for interacting with Plugin.ts.
     * This takes events from Plugin.ts and sends them to the server.
     * This extends abstract handler bc it copies the handling of sending messages
     * for when a conversation is started. (the plugin when dealing with many requests,
     * we may not want to process those on the server, just process them with the survey obj on front end.)
     */
    var PluginAdapter = function (_super) {
        __extends(PluginAdapter, _super);
        function PluginAdapter(uid) {
            var _this = _super.call(this) || this;
            _this.uid = uid;
            return _this;
        }
        PluginAdapter.prototype.init = function (conversation, account, emitter) {
            var _this = this;
            this.account = account;
            this.conversation = conversation;
            this.emitter = emitter;
            this.emitter.listeners.push({
                name: 'RESPONSE', fn: function (response) {
                    var data = window.localStorage.getItem('__asq__client__storage__item__'),
                        storageObject,
                        storageString;
                    _this.response = response;
                    // TODO: Here opt for server side rendering/condition making. 
                    // this.emitResponse(response);
                    _this.onMessageReceived(); // This will add teh response to the conversation.`
                    // Now response is populated with fields we need like .fieldgroupid
                    if (data) try {
                        storageObject = JSON.parse(data);
                    } catch (e) {
                        console.log(e);
                    } else storageObject = {};
                    if (!storageObject[_this.uid]) storageObject[_this.uid] = {};
                    storageObject[_this.uid].conversation = _this.conversation;
                    try {
                        storageString = JSON.stringify(storageObject);
                    } catch (e) {
                        console.log(e);
                    }
                    ;
                    window.localStorage.setItem('__asq__client__storage__item__', storageString);
                }
            });
        };
        PluginAdapter.prototype.onError = function (err) {
            console.log(err);
        };
        PluginAdapter.prototype.preSend = function () {
            return Promise.resolve(this.emitter.emit('STATE_PENDING'));
        };
        /**
         * @description We have received a message and are posting it to the front end.
         * The message can be from the socket connection or from this.conversation.survey, which has
         * messages that are sent automatically when the conversation starts.
         */
        PluginAdapter.prototype.sendMessageToUser = function (data) {
            return Promise.resolve(this.emitter.emit('MESSAGE', data));
        };
        /**
         * @TODO: We're currently ignoring connection lapses. fix.
         */
        PluginAdapter.prototype.postSend = function () {
            var _this = this;
            Promise.resolve(this.emitter.emit('STATE_READY'));
            return new Promise(function (resolve, reject) {
                var xobj = new XMLHttpRequest();
                xobj.open('POST', '/api/plugin/response', true);
                xobj.setRequestHeader('Content-Type', "application/json");
                xobj.onreadystatechange = function () {
                    if (xobj.readyState == 4 && xobj.status == "200") {
                        // try {
                        //     // var k = JSON.parse(xobj.responseText);
                        // } catch (e) { 
                        //     return reject(e);
                        // }
                        resolve(xobj.responseText);
                    }
                };
                xobj.send(JSON.stringify({ conversation: _this.conversation, response: _this.response }));
                // todo.
                resolve();
            });
        };
        return PluginAdapter;
    }(abstract_handler_1.AbstractHandler);
    exports.PluginAdapter = PluginAdapter;
    // public registerMessageReceivedHandler(boundFn: (message: ISurveyField) => Promise<boolean>): any {
    //     this.onMessageReceived = boundFn;
    // }
    // /* Send fields back to user */
    // private queueAndSend(response?: IResponse): Promise<boolean> {
    // private getSendFn(conversation: IConversationModel, field: ISurveyField, throttle: number) {
    //     return () => new Promise((resolve, reject) => {
    //         setTimeout((ctx: MessageSender, conversation: IConversationModel, field: ISurveyField) => {
    //             ctx.http
    //                 // .post(conversation.configureRequest(field, conversation.userId))
    //                 .then((result: any /* TODO: Define */) => resolve(result))
    //                 .catch((err: any) => { reject(err) });
    //         }, throttle, this, conversation, field);
    //     });
    // }
    // if (this.state !== 'READY') return;
    // this.state = 'PENDING';
    // this.emit('MESSAGE_STATUS', 'PENDING');
    // Promise.resolve(true)
    //     .then(() => this.conversation.onResponseReceived(response, this.conversation.survey, this.rewards))
    //     .then((messages: ISurveyField[]) => this.sendMessageArray(messages))
    //     .then(() => {
    //         this.emit('MESSAGE_STATUS', 'READY');
    //         this.state = 'READY';
    //         return true;
    //     }).catch((err: any) => {
    //         console.log('Attempted to send messages but couldn`t. This should never happen since sending messages in browser is synchronous.');
    //         this.state = 'ERRORED';
    //     });
    // }
    // need to get data. In a mock, its on the window.
    // public init(): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         if (!this.conversation.survey || !this.account || !this.conversation)
    //             throw new Error('Environment not configured correctly');
    //         this.state = 'READY';
    //         this.queueAndSend();
    //     });
    // }
    /* We recieved a message from the user. On non mocked service, we wait for the result from addResponse to resolve to true. */
    // public send(text: string): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         const response: IResponse = new Response({
    //             surveyId: this.conversation.survey._id,
    //             body: {
    //                 text: text
    //             },
    //             userId: '', // Could also populate this with something.
    //             platform: 'WEB' // Web or widget?
    //         });
    //         // this.conversation.addResponse(response);
    //         this.queueAndSend(response);
    //         return resolve(true);
    //     });
    // } 
});
$__System.registerDynamic('15', [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    exports.__esModule = true;
    var GenericData = function () {
        function GenericData(obj) {
            this._id = obj && obj._id || ObjectId();
            this.id = this._id.toString ? this._id.toString() : this._id;
            this.modifiedAt = obj && obj.modifiedAt ? typeof obj.modifiedAt === 'string' ? new Date(obj.modifiedAt) : obj.modifiedAt : new Date();
        }
        return GenericData;
    }();
    exports.GenericData = GenericData;
    var ObjectId = function (m, d, h, s) {
        if (m === void 0) {
            m = Math;
        }
        if (d === void 0) {
            d = Date;
        }
        if (h === void 0) {
            h = 16;
        }
        if (s === void 0) {
            s = function (s) {
                return m.floor(s).toString(h);
            };
        }
        return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, function () {
            return s(m.random() * h);
        });
    };
});
$__System.registerDynamic('24', [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    exports.__esModule = true;
    /**
     * @description
     * We've gotten a response from a user.
     */
    exports.responseBodyFactory = function (type, message) {
        switch (type) {
            case 'RATING':
                return new MessengerQuickReply(message);
            case 'BOOLEAN':
                return new MessengerQuickReply(message);
            default:
                return new MessengerText(message);
        }
    };
    var MessengerQuickReply = function () {
        function MessengerQuickReply(obj) {
            // We just want to save the QR payload, not the actual text.
            this.text = obj && obj.quick_reply && obj.quick_reply.payload || obj.text;
        }
        MessengerQuickReply.prototype.getText = function () {
            return this.text;
        };
        ;
        return MessengerQuickReply;
    }();
    exports.MessengerQuickReply = MessengerQuickReply;
    var MessengerText = function () {
        function MessengerText(obj) {
            this.text = obj && obj.text || '';
        }
        MessengerText.prototype.getText = function () {
            return this.text;
        };
        ;
        return MessengerText;
    }();
    exports.MessengerText = MessengerText;
});
$__System.registerDynamic("19", ["15", "24"], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    var __extends = exports && exports.__extends || function () {
        var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
            d.__proto__ = b;
        } || function (d, b) {
            for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        };
        return function (d, b) {
            extendStatics(d, b);
            function __() {
                this.constructor = d;
            }
            d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
        };
    }();
    exports.__esModule = true;
    var generic_1 = $__require("15");
    var response_body_factory_1 = $__require("24");
    ;
    /**
     * @description Base class for all response types.
     * Response —> User sent us a message in response to a question.
     * Or—at the start of a conversation.
     */
    var Response = function (_super) {
        __extends(Response, _super);
        function Response(obj) {
            var _this = _super.call(this, obj) || this;
            _this.passed = obj && obj.passed || false;
            _this.type = obj && obj.type || null;
            _this.surveyId = obj && obj.surveyId || '';
            _this.fieldGroupId = obj && obj.fieldGroupId || '';
            // this.userId = obj && obj.userId || '';
            _this.convoId = obj && obj.convoId || '';
            _this.meta = obj && obj.meta || {};
            _this.questionType = obj && obj.questionType || '';
            _this.body = _this.questionType ? response_body_factory_1.responseBodyFactory(_this.questionType, obj && obj.body) : obj && obj.body || null;
            return _this;
        }
        Response.prototype.populate = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return Promise.resolve(this);
        };
        ;
        Response.prototype.hydrateResponseBody = function () {
            this.hydrated = true;
            this.body = response_body_factory_1.responseBodyFactory(this.questionType, this.body);
        };
        return Response;
    }(generic_1.GenericData);
    exports.Response = Response;
});
$__System.registerDynamic('25', [], true, function ($__require, exports, module) {
    "use strict";

    var global = this || self,
        GLOBAL = global;
    exports.__esModule = true;
    function ValidURL(str) {
        var pattern = new RegExp('^(https?:\/\/)?' + '((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|' + '((\d{1,3}\.){3}\d{1,3}))' + '(\:\d+)?(\/[-a-z\d%_.~+]*)*' + '(\?[;&a-z\d%_.~+=-]*)?' + '(\#[-a-z\d_]*)?$', 'i'); // fragment locater
        if (!pattern.test(str)) {
            alert("Please enter a valid URL.");
            return false;
        } else {
            return true;
        }
    }
    exports.TEMPLATES = {
        LOGO: "\n  <svg width=\"13px\" height=\"13px\" style=\" margin: 0 5px 0 0;transform: translateY(3px);\"viewBox=\"0 0 248 140\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\">\n    <title>Formatic</title>\n    <defs></defs>\n    <g id=\"Welcome\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\">\n        <g id=\"Artboard-9\" transform=\"translate(-171.000000, -1190.000000)\">\n            <g id=\"Group-4\" transform=\"translate(129.000000, 1094.000000)\">\n                <g id=\"Group-6\" transform=\"translate(42.000000, 96.000000)\">\n                    <g id=\"Group-2\" transform=\"translate(124.000000, 70.000000) rotate(-180.000000) translate(-124.000000, -70.000000) \">\n                        <g id=\"Group-7\" transform=\"translate(61.289863, 0.000000)\">\n                            <polygon id=\"Fill-40\" fill=\"#1FBEE6\" points=\"82.9729669 26.5706082 -7.81597009e-14 26.5706082 4.57895065 -1.95399252e-14 87.5519175 -1.95399252e-14\"></polygon>\n                            <polygon id=\"Fill-48\" fill=\"#2AA1FA\" points=\"138.989064 -4.79616347e-14 113.013253 -4.79616347e-14 108.435911 26.5706082 134.408504 26.5706082\"></polygon>\n                        </g>\n                        <g id=\"Group-7\" transform=\"translate(61.289863, 113.000000)\">\n                            <polygon id=\"Fill-40\" fill=\"#1FBEE6\" points=\"82.9729669 26.5706082 0 26.5706082 4.57895065 0 87.5519175 0\"></polygon>\n                            <polygon id=\"Fill-48\" fill=\"#2AA1FA\" points=\"138.989064 -1.42108547e-14 113.013253 -1.42108547e-14 108.435911 26.5706082 134.408504 26.5706082\"></polygon>\n                        </g>\n                        <g id=\"Group-7\" transform=\"translate(0.000000, 56.500000)\">\n                            <polygon id=\"Fill-40\" fill=\"#1FBEE6\" points=\"191.408878 26.5706082 108.435911 26.5706082 113.014861 -1.42108547e-14 195.987828 -1.42108547e-14\"></polygon>\n                            <polygon id=\"Fill-40\" fill=\"#FF60A2\" points=\"82.9729669 26.5706082 -4.54747351e-12 26.5706082 4.57895065 0 87.5519175 0\"></polygon>\n                            <polygon id=\"Fill-48\" fill=\"#2AA1FA\" points=\"247.424974 -2.84217094e-14 221.449163 -2.84217094e-14 216.871822 26.5706082 242.844415 26.5706082\"></polygon>\n                        </g>\n                    </g>\n                </g> \n            </g>\n        </g>\n    </g>   \n</svg>",
        TEMPLATE: "  \n<div id=\"survey-container\" class=\"d-flex flex-column w-100\">\n    <div id=\"survey-header\" class=\"d-flex justify-content-between align-items-center pointer\">\n      <small><span id=\"head-title\"></span></small>\n      <figure id=\"head-favicon\"></figure>\n      <small class=\"text-right\">\n      <span id=\"head-subtitle\"></span>\n        <div id=\"close-wrapper\" class=\"d-flex justify-content-end align-items-center\">\n            <svg id=\"fm-widget-menu\" style=\"width: 35px; height: 35px;\" class=\"isHidden\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" version=\"1.1\" x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" enable-background=\"new 0 0 100 100\" xml:space=\"preserve\"><path d=\"M37,31h39c3.987,0,3.987,6,0,6H37C33.013,37,33.013,31,37,31z M76,47H37c-3.987,0-3.987,6,0,6h39C79.987,53,79.987,47,76,47  z M76,63H37c-3.987,0-3.987,6,0,6h39C79.987,69,79.987,63,76,63z M27,31c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S28.7,31,27,31z   M27,47c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S28.7,47,27,47z M27,63c-1.7,0-3,1.3-3,3s1.3,3,3,3s3-1.3,3-3S28.7,63,27,63z\"/></svg>\n            <div class=\"d-flex align-items-center justify-content-end\"> \n                <span id=\"asq-open\" class=\"icon-minus pointer\"></span>\n                <span id=\"close\" class=\"icon-cross pointer\"></span>\n            </div> \n        </div>\n      </small>  \n    </div>   \n    <div id=\"survey-message-wrapper\" class=\"survey-message-wrapper\">  \n        <div id=\"survey-messages-and-image\" class=\"row no-gutters\">\n            <div id=\"survey-messages\">  \n            </div> \n        </div>\n    </div>\n</div>",
        TYPING: "\n<div class=\"loader\"> \n    <span></span> \n    <span></span>   \n    <span></span> \n</div>\n",
        // MESSAGE: ` 
        // <div id="survey-welcome" class="">
        //   <div class="row d-flex no-gutters"> 
        //     <figure id="survey-image" class="col-2 d-flex align-items-center justify-content-center">
        //       <figure id="placeholder" class="fm-box"></figure>
        //     </figure>
        //     <p id="survey-welcome-text" class="col-10 p-3 fm-box">
        //       Welcome! We'd love if you could take a quick minute to tell us how we're doing.
        //     </p>  
        //   </div>
        // </div> 
        // `, 
        //[ngStyle]="{'background-color': form.value.pluginOpts.styles.bodyBg}"
        WELCOME: "\n    <div id=\"welcome-message\" class=\"p-4 h-100 d-flex align-items-center justify-content-center\"> \n        <div class=\"d-flex align-items-center justify-content-center\">\n            <div id=\"welcome-wrapper\" class=\"d-flex flex-column justify-content-center\">\n                <!-- <figure class=\"placeholder lg\"></figure> -->\n                <small class=\"text-center pt-4 pb-4\" id=\"survey-welcome-text\"></small> \n                <button id=\"survey-start-button\" class=\"p-2\">Start</button> \n            </div>\n        </div> \n    </div>",
        SMILEY_TEMPLATE: "\n          <ul class=\"list-inline message-group d-flex justify-content-end options smiley\">\n            <button class=\"bubble option animatable icon-smiley-1\" value=\"1\"></button>\n            <button class=\"bubble option animatable icon-smiley-2\" value=\"2\"></button>\n            <button class=\"bubble option animatable icon-smiley-3\" value=\"3\"></button>\n            <button class=\"bubble option animatable icon-smiley-4\" value=\"4\"></button>\n            <button class=\"bubble option animatable icon-smiley-5\" value=\"5\"></button>\n          </ul>\n",
        AVATAR: "\n    <figure class=\"placeholder\"></figure>\n    ",
        INPUT: "   \n      <div class=\"options d-flex justify-content-end\">\n        <div class=\"fm-input-field-and-button fm-transposable\">\n          <textarea class=\"animatable fm-textarea\" class=\"col-9 pl-3 h-100\" placeholder=\"Write a message...\"></textarea>\n          <button class=\"animatable fm-send\" class=\"col-3 highlight h-100 asq-btn\">Send</button>\n        </div> \n    </div>",
        OPTION: "<button class=\"animatable asq-btn bubble fm-transposable option option-button fm-value\"><p></p></button>",
        OPTION_LIST: "  \n        <ul class=\"fm-transposable d-flex message-group justify-content-end list-inline options text-center multiple-option\">\n        </ul>  \n        ",
        BOOLEAN_TEMPLATE: "\n        <ul class=\"list-inline message-group d-flex justify-content-end options boolean w-100\">\n            <button class=\"animatable asq-btn d-flex justify-content-center align-items-center bubble fm-transposable iconed option\" data-value=\"Yes\">\n              <span class=\"icon-smile2\" data-value=\"Yes\"></span><span class=\"fm-value\" data-value=\"Yes\"><p data-value=\"Yes\">Yes</p></span>\n            </button>\n            <button class=\"animatable asq-btn d-flex justify-content-center align-items-center bubble fm-transposable iconed option\" data-value=\"No\">\n              <span class=\"icon-sad2\" data-value=\"No\"></span><span class=\"fm-value\" data-value=\"No\"><p data-value=\"No\">No</p></span>\n            </button>\n       </ul> \n        ",
        RATING_TEMPLATE: "\n        <ul class=\"list-inline message-group fm-transposable d-flex justify-content-end options rating w-100\">\n          <button class=\"animatable d-flex asq-btn fm-value bubble fm-transposable justify-content-center option option-star\" data-value=\"1\">\n            <p style=\"margin-right: 5px;transform: translate(0px, 2px);\"data-value=\"1\">1</p><span data-value=\"1\" class=\"icon-star\"></span>\n          </button> \n          <button class=\"animatable d-flex asq-btn fm-value bubble fm-transposable justify-content-center option option-star\" data-value=\"2\">\n            <p style=\"margin-right: 5px;transform: translate(0px, 2px);\"data-value=\"2\">2</p><span data-value=\"2\" class=\"icon-star\"></span>\n          </button> \n          <button class=\"animatable d-flex asq-btn fm-value bubble fm-transposable justify-content-center option option-star\" data-value=\"3\">\n            <p style=\"margin-right: 5px;transform: translate(0px, 2px);\"data-value=\"3\">3</p><span data-value=\"3\" class=\"icon-star\"></span>\n          </button> \n          <button class=\"animatable d-flex asq-btn fm-value bubble fm-transposable justify-content-center option option-star\" data-value=\"4\">\n            <p style=\"margin-right: 5px;transform: translate(0px, 2px);\"data-value=\"4\">4</p><span data-value=\"4\" class=\"icon-star\"></span>\n          </button> \n          <button class=\"animatable d-flex asq-btn fm-value bubble fm-transposable justify-content-center option option-star\" data-value=\"5\">\n            <p style=\"margin-right: 5px;transform: translate(0px, 2px);\"data-value=\"5\">5</p><span data-value=\"5\" class=\"icon-star\"></span>\n          </button> \n        </ul>"
    };
    exports.templateService = {
        classes: {
            sender: 'sender',
            receiver: 'receiver'
        },
        createBubble: function (message, type, doc /* ng2 app uses this */) {
            if (!message) throw new Error('Message was not attached!');
            var _doc = doc || document;
            var subtext = '<div class="subtext" style="line-height: 8px;margin-left: 15px;margin-bottom: 5px;"></div>';
            var messageWrapperEl = document.createElement('div');
            messageWrapperEl.classList.add('fm-transposable', type);
            var bubbleEl = _doc.createElement('div');
            bubbleEl.classList.add('bubble');
            var messageEl;
            // can be attachment if we're rebuilding state.
            var div;
            if (message.attachment) {
                bubbleEl.className += ' attachment ' + message.attachment.type;
                switch (message.attachment.type) {
                    case 'application/zip':
                        div = document.createElement('a');
                        div.setAttribute('href', message.attachment.payload.url);
                        div.setAttribute('download', true);
                        div.innerText = message.attachment.name;
                        break;
                    default:
                        div = document.createElement('img');
                        div.setAttribute('src', message.attachment.payload.url);
                        break;
                }
                bubbleEl.appendChild(div);
            }
            if (message.prompt || typeof message === 'string') {
                /* Appending */
                div = document.createElement('p');
                div.innerText = message.prompt || message;
                bubbleEl.appendChild(div);
            }
            if (typeof message.nodeName !== 'undefined') {
                bubbleEl.appendChild(message);
            }
            messageWrapperEl.appendChild(bubbleEl);
            return messageWrapperEl;
        },
        createInputField: function (disableTextArea, disableSubmit) {
            var inputWrapper = document.createElement('div');
            inputWrapper.innerHTML = exports.TEMPLATES.INPUT;
            var t = inputWrapper.querySelector('textarea');
            t.disabled = disableTextArea;
            var s = inputWrapper.querySelector('button');
            s.disabled = disableSubmit;
            s.innerHTML = 'Send';
            return inputWrapper.firstElementChild;
        },
        createAvatar: function (iconUrl) {
            var avatarEl = document.createElement('div');
            avatarEl.innerHTML = exports.TEMPLATES.AVATAR;
            if (iconUrl) avatarEl.querySelector('.placeholder').style.backgroundImage = iconUrl;
            return avatarEl.firstElementChild;
        },
        createMessageGroup: function (iconUrl) {
            var el = document.createElement('div');
            // holds a message group and a image
            el.className += 'message-group row d-flex no-gutters';
            var messagesEl = document.createElement('div');
            messagesEl.className += 'message-group-messages d-flex col flex-column';
            var avatarWrapper = document.createElement('div');
            avatarWrapper.className += 'pr-2 d-flex avatar-wrapper';
            var avatarDirectChild = document.createElement('div');
            avatarDirectChild.className += 'placeholder-wrapper d-flex align-items-end w-100 justify-content-center';
            avatarWrapper.appendChild(avatarDirectChild);
            avatarDirectChild.appendChild(exports.templateService.createAvatar(iconUrl));
            el.appendChild(avatarWrapper);
            el.appendChild(messagesEl);
            return el;
        }
    };
});
$__System.registerDynamic('a', ['18', '1f', '20', '21', '23', '19', '25'], true, function ($__require, exports, module) {
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
    "use strict";

    var global = this || self,
        GLOBAL = global;
    exports.__esModule = true;
    (function (window, document) {
        'use strict';
        // Exits early if all IntersectionObserver and IntersectionObserverEntry
        // features are natively supported.

        if ('IntersectionObserver' in window && 'IntersectionObserverEntry' in window && 'intersectionRatio' in window.IntersectionObserverEntry.prototype) {
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
            } else {
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
            this._observationTargets = this._observationTargets.filter(function (item) {
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
            if (!Array.isArray(threshold)) threshold = [threshold];
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
                } else {
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
                var intersectionRect = rootIsInDom && rootContainsTarget && this._computeTargetAndRootIntersection(target, rootRect);
                var newEntry = item.entry = new IntersectionObserverEntry({
                    time: now(),
                    target: target,
                    boundingClientRect: targetRect,
                    rootBounds: rootRect,
                    intersectionRect: intersectionRect
                });
                if (!oldEntry) {
                    this._queuedEntries.push(newEntry);
                } else if (rootIsInDom && rootContainsTarget) {
                    // If the new entry intersection ratio has crossed any of the
                    // thresholds, add a new entry.
                    if (this._hasCrossedThreshold(oldEntry, newEntry)) {
                        this._queuedEntries.push(newEntry);
                    }
                } else {
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
        IntersectionObserver.prototype._computeTargetAndRootIntersection = function (target, rootRect) {
            // If the element isn't displayed, an intersection can't happen.
            if (window.getComputedStyle(target).display == 'none') return;
            var targetRect = getBoundingClientRect(target);
            var intersectionRect = targetRect;
            var parent = target.parentNode;
            var atRoot = false;
            while (!atRoot) {
                var parentRect = null;
                // If we're at the root element, set parentRect to the already
                // calculated rootRect. And since <body> and <html> cannot be clipped
                // to a rect that's not also the document rect, consider them root too.
                if (parent == this.root || parent == document.body || parent == document.documentElement || parent.nodeType != 1) {
                    atRoot = true;
                    parentRect = rootRect;
                } else {
                    if (window.getComputedStyle(parent).overflow != 'visible') {
                        parentRect = getBoundingClientRect(parent);
                    }
                }
                // If either of the above conditionals set a new parentRect,
                // calculate new intersection data.
                if (parentRect) {
                    intersectionRect = computeRectIntersection(parentRect, intersectionRect);
                    if (!intersectionRect) break;
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
            } else {
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
                return margin.unit == 'px' ? margin.value : margin.value * (i % 2 ? rect.width : rect.height) / 100;
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
        IntersectionObserver.prototype._hasCrossedThreshold = function (oldEntry, newEntry) {
            // To make comparing easier, an entry that has a ratio of 0
            // but does not actually intersect is given a value of -1
            var oldRatio = oldEntry && oldEntry.isIntersecting ? oldEntry.intersectionRatio || 0 : -1;
            var newRatio = newEntry.isIntersecting ? newEntry.intersectionRatio || 0 : -1;
            // Ignore unchanged ratios
            if (oldRatio === newRatio) return;
            for (var i = 0; i < this.thresholds.length; i++) {
                var threshold = this.thresholds[i];
                // Return true if an entry matches a threshold or if the new ratio
                // and the old ratio are on the opposite sides of a threshold.
                if (threshold == oldRatio || threshold == newRatio || threshold < oldRatio !== threshold < newRatio) {
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
            if (index != -1) registry.splice(index, 1);
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
            } else if (typeof node.attachEvent == 'function') {
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
            } else if (typeof node.detatchEvent == 'function') {
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
            return width >= 0 && height >= 0 && {
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
            } catch (e) {}
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
                if (node == parent) return true;
                // Traverse upwards in the DOM.
                node = node.parentNode;
            }
            return false;
        }
        // Exposes the constructors globally.
        window.IntersectionObserver = IntersectionObserver;
        window.IntersectionObserverEntry = IntersectionObserverEntry;
    })(window, document);
    var conversation_1 = $__require('18');
    var account_1 = $__require('1f');
    var smooth_scroll_1 = $__require('20');
    var plugin_adapter_mock_1 = $__require('21');
    var plugin_adapter_1 = $__require('23');
    var response_1 = $__require('19');
    var templates_1 = $__require('25');
    // if (/mobile|tablet/i.test(navigator.userAgent)) {
    // // Mobile/Touch Device:
    // // –> Display link or button which launches iframe as popup/modal
    // // –> (or which simply redirects to the form on typeform.com)
    // } else {
    // // Other Devices:
    // // –> Display the inline iframe
    // }
    function setVisibleTimeout(callback, delay) {
        var id = null,
            t = 0,
            prefix = '';
        'o webkit moz ms'.replace(/\S+/g, function (p) {
            if (p + 'Hidden' in document) {
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
            } else {
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
        return function () {
            document.removeEventListener(prefix + 'visibilitychange', onVisibilityChange, false);
            if (id !== null) {
                clearTimeout(id);
                id = null;
            }
        };
    }
    /**
     * @description The class for the iframe window.
     * TODO: Eventually, the data grabbing strategy here
     * may be to render the page normally, and saving all the
     *
     */
    var __Asq__ = function () {
        // If an ID is passed this is a live survey.
        // If not it is a mock.
        function __Asq__(rootEl, data, config) {
            var _this = this;
            this.rootEl = rootEl;
            this.config = config;
            this.eventEmitter = {
                listeners: [],
                emit: function (name, data) {
                    _this.eventEmitter.listeners.forEach(function (listener) {
                        if (listener.name !== name) return;
                        listener.fn(data);
                    });
                }
            };
            this.currentScroll = Promise.resolve();
            this.fs = 500;
            this.listeners = [];
            if (!this.config) throw new Error('Config was not passed!');
            this.userId = this.getStorageObj().userId;
            if (!this.userId) {
                var ObjId = function (m, d, h, s) {
                    if (m === void 0) {
                        m = Math;
                    }
                    if (d === void 0) {
                        d = Date;
                    }
                    if (h === void 0) {
                        h = 16;
                    }
                    if (s === void 0) {
                        s = function (s) {
                            return m.floor(s).toString(h);
                        };
                    }
                    return s(d.now() / 1000) + ' '.repeat(h).replace(/./g, function () {
                        return s(m.random() * h);
                    });
                };
                this.userId = ObjId();
                window.localStorage.setItem('__asq__client__storage__item__', JSON.stringify(Object.assign({}, this.getStorageObj(), { userId: this.userId })));
            }
            ;
            // reset, so it doesnt add to overflow.
            this.rootEl.style.backgroundColor = 'initial';
            // IF this is true, this is directly navigated (not plugin)
            // So let's use the path as the UID, because that should be unique for the user.
            // I.e. /jsdfi345 they will only have one state for 'jsdfi345'
            if (!this.config.uid) this.config.uid = window.location.pathname;
            this.ruleObject = this.getStorageObj()[this.config.uid];
            var conversationData = this.ruleObject ? this.ruleObject.conversation : null;
            var accountData = this.ruleObject ? this.ruleObject.account : null;
            // Restore state, or start a new state (for test, or for live).
            this.conversation = new conversation_1.Conversation(conversationData || new conversation_1.Conversation({
                survey: data.survey,
                accountId: data.survey.accountId,
                surveyId: data.survey.id,
                userData: {
                    id: this.userId,
                    navigator: window.navigator.userAgent
                },
                platform: this.config.platform,
                responses: []
            }));
            this.account = new account_1.Account(config.platform === 'test' ? data.account : accountData || data.account);
            this.setStorageItem({
                data: {
                    conversation: this.conversation,
                    account: this.account
                }
            });
            if (!this.config || !this.config.platform) return console.log('Did not specify any opts.');
            this.eventEmitter.listeners.push({
                name: 'MESSAGE', fn: function (data) {
                    var bubble = _this.currentChild.querySelector('.bubble');
                    var _newBubbleChild;
                    if (data.message.attachment) {
                        bubble.className += ' attachment ' + data.message.attachment.type;
                        switch (data.message.attachment.type) {
                            case 'application/zip':
                                _newBubbleChild = document.createElement('a');
                                _newBubbleChild.setAttribute('href', data.message.attachment.payload.url);
                                _newBubbleChild.setAttribute('download', true);
                                _newBubbleChild.innerText = data.message.attachment.name;
                                break;
                            default:
                                var onL = function () {
                                    _newBubbleChild.style.cssText += 'max-height: 500px; max-width: 500px; opacity: 1;';
                                    _newBubbleChild.removeEventListener('load', onL);
                                };
                                _newBubbleChild = document.createElement('img');
                                _newBubbleChild.setAttribute('src', data.message.attachment.payload.url);
                                _newBubbleChild.style.cssText = 'max-height: 0px; opacity: 0; max-width: 0px; transition: max-height .5s linear, max-width .5s linear, opacity .5s linear;';
                                _newBubbleChild.addEventListener('load', onL);
                                break;
                        }
                    } else {
                        /* Appending */
                        _newBubbleChild = document.createElement('p');
                        _newBubbleChild.innerText = data.message.prompt;
                    }
                    var thisBubble = _this.currentChild.querySelector('.bubble');
                    thisBubble.innerHTML = '';
                    _this.append(thisBubble, thisBubble, _newBubbleChild, _this.messageContainerEl.getBoundingClientRect().width);
                    if (data.message.questionType) {
                        var field_1 = _this.createResponseField(data.message);
                        setTimeout(function () {
                            _this.append(field_1.querySelectorAll('.animatable'), _this.messageEl, field_1, _this.messageContainerEl.getBoundingClientRect().width);
                        }, 750);
                    }
                    window.parent.postMessage({
                        name: 'message',
                        value: data.message,
                        type: _this.config.platform,
                        uid: _this.config.uid
                    }, '*');
                    setVisibleTimeout(function () {
                        if (!data.message.questionType && data.remaining.length !== 1) _this.eventEmitter.emit('STATE_PENDING');
                        // stream is still going!
                    }, 500);
                }
            });
            this.eventEmitter.listeners.push({
                name: 'STATE_PENDING', fn: function () {
                    if (!_this.currentMessageGroup) {
                        _this.currentMessageGroup = templates_1.templateService.createMessageGroup(_this.conversation.survey.icon);
                        _this.observe(_this.currentMessageGroup.querySelector('.placeholder'));
                        _this.messageEl.appendChild(_this.currentMessageGroup);
                    }
                    var typing = document.createElement('div');
                    typing.innerHTML = templates_1.TEMPLATES.TYPING;
                    _this.currentChild = templates_1.templateService.createBubble(typing.firstElementChild, templates_1.templateService.classes.receiver);
                    _this.append(_this.currentChild.querySelector('.bubble'), _this.currentMessageGroup.querySelector('.message-group-messages'), _this.currentChild, 150);
                }
            });
            this.eventEmitter.listeners.push({
                name: 'STATE_READY', fn: function (data) {
                    _this.currentMessageGroup = null;
                }
            });
        }
        Object.defineProperty(__Asq__.prototype, "additionalMaxHeight", {
            set: function (additionalHeight) {
                // this.messageWrapperEl.style.maxHeight = Math.min((this._maxHeight || 0) + additionalHeight, 280) + 'px';
                // this.messageWrapperEl.style.maxHeight = (this._maxHeight || 0) + additionalHeight + 'px';
                // // if (this.messageWrapperEl.style.maxHeight === '280px') return;
                // this._maxHeight += additionalHeight;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(__Asq__.prototype, "isMobile", {
            get: function () {
                return window.outerWidth < this.fs;
            },
            set: function (isMobile) {
                this.rootEl.classList.remove('fm-mobile');
                if (isMobile) this.rootEl.classList.add('fm-mobile');
            },
            enumerable: true,
            configurable: true
        });
        __Asq__.prototype.setHidden = function (hidden, noBubbling) {
            this._isHidden = hidden;
            this.rootEl.classList[hidden ? 'add' : 'remove']('isHidden');
            // if (hidden) {
            //     this.headFavicon.classList.add('isHidden');
            //     this.openEl.classList.remove('isHidden');
            //     this.closeEl.classList.add('isHidden');
            //     this.setExpanded(false);
            // } else {
            //     this.headFavicon.classList.remove('isHidden');
            //     this.closeEl.classList.remove('isHidden');
            //     this.openEl.classList.add('isHidden');
            // }
            window.parent.postMessage({ name: 'isHidden', value: hidden, id: this.config.id, uid: this.config.uid }, '*');
        };
        Object.defineProperty(__Asq__.prototype, "isHidden", {
            get: function () {
                if (this.config.platform === 'inline') return false;
                return this._isHidden;
            },
            enumerable: true,
            configurable: true
        });
        ;
        __Asq__.prototype.setFs = function (fs, noBubbling) {
            this.isFs = fs;
            this.rootEl.classList[fs ? 'add' : 'remove']('fs');
            window.parent.postMessage({ name: 'fs', value: fs, id: this.config.id, uid: this.config.uid }, '*');
        };
        __Asq__.prototype.setMobile = function (isMobile) {
            this.isMobile = mobile;
        };
        __Asq__.prototype.setActive = function (active, noBubbling) {
            var _this = this;
            this._active = active;
            if (!noBubbling) window.parent.postMessage({ name: 'expanded', value: active, id: this.config.id, uid: this.config.uid }, '*');
            this.rootEl.classList[active ? 'add' : 'remove']('expanded');
            // if (expanded)
            //     this.showElements();
            // else {
            if (this.isMobile) this.setFs(active);
            // var open = () => {
            //     this.setActive(true);
            //     document.removeEventListener('scroll', open);
            // };
            // document.addEventListener('scroll', open)
            // wait for transition
            // setTimeout(() => {
            // this.rootEl.classList.remove('expanded');
            // this.smoothScroll.scrollToBottom()
            //     .then(() => this.hideElements())
            // this.recalculateHeight();
            setTimeout(function () {
                _this.currentScroll = _this.smoothScroll.scrollToBottom(_this.currentScroll);
            }, 500);
            // }, 500);
            // }
        };
        __Asq__.prototype.observe = function (el) {
            var _this = this;
            if (el.tagName === 'P') return;
            var observer = new IntersectionObserver(function (item) {
                var item = item[0];
                // if we're scrolling down (chat is automatically) then we dont want to hide elements at the bottom.
                if (!item || !item.isIntersecting || _this.isAppending && item.rootBounds.bottom === item.intersectionRect.bottom) return;
                var transitionend = function () {
                    item.target.dataset.isTransitioning = 'false';
                    item.target.removeEventListener('transitionend', transitionend);
                    item.target.style.opacity = item.target.dataset.transitionLatest === 'true' ? 1 : 0;
                };
                if (typeof item.target.dataset.transitionLatest === 'undefined') {
                    item.target.style.cssText += 'transition: opacity .5s linear';
                    item.target.addEventListener('transitionend', transitionend);
                }
                item.target.dataset.transitionLatest = item.intersectionRatio > .5 ? true : false;
                if (item.target.dataset.isTransitioning !== 'true') item.target.style.opacity = item.target.dataset.transitionLatest === 'true' ? 1 : 0;
            }, {
                threshold: [.5, .9],
                root: this.messageWrapperEl
            });
            observer.observe(el);
        };
        __Asq__.prototype.append = function (animatable, appender, apendee, size) {
            var _this = this;
            this.isAppending = true;
            this.observe(apendee);
            var hideContent,
                appenderIsBubble,
                newHeight = 0;
            // if the appender is a bubble then we are assuming we're changing the child text.
            if (appender.classList.contains('bubble')) appenderIsBubble = true;
            if (apendee.tagName === 'P') hideContent = true;
            var _animatableElements = animatable instanceof NodeList ? Array.prototype.slice.call(animatable) : [animatable];
            if (hideContent) apendee.style.cssText += 'opacity: 0;transition: opacity .5s linear';
            appender.appendChild(apendee);
            if (appenderIsBubble) {
                // We set these because the appender is a typing bubble,
                // and if we let these be set to zero then when the p text 
                // is appended it will start with a bubble that is 0px x 0px so the DOM will momentarily be empty.
                var a = getComputedStyle(appender);
                // if it's long text, we want it to not grow on y axis beyond the container.
                appender.style.maxHeight = a.height;
                appender.classList.add('appendingBubble');
            }
            // animatable adding maxHeight through a transition allows the container to grow in a smooth manner.
            _animatableElements.forEach(function (a) {
                a.classList.add('isAppending');
            });
            // this repaints
            var p = this.recalculateHeight(this.messageEl.getBoundingClientRect().height);
            _animatableElements.forEach(function (a) {
                a.classList.add('onAppended');
                a.classList.remove('isAppending');
            });
            setTimeout(function () {
                if (appenderIsBubble) {
                    appender.style.maxHeight = '500px';
                    appender.classList.remove('appendingBubble');
                }
                _animatableElements.forEach(function (a) {
                    return a.classList.remove('onAppended');
                });
            }, 500);
            if (hideContent) setTimeout(function () {
                apendee.style.cssText += 'opacity: 1;';
            }, 500);
            setTimeout(function () {
                _this.isAppending = false;
            }, 750);
            return p;
        };
        /**
         * @description Must call init because derived classes may have their own implementation.
         */
        __Asq__.prototype.init = function () {
            var _this = this;
            window.parent.postMessage({ name: 'initData', uid: this.config.uid, value: { bg: this.conversation.survey.pluginOpts.styles.bodyBg } }, '*');
            this.populateTemplate();
            // Restore the conversation
            var lastResponse = this.conversation.responses[this.conversation.responses.length - 1];
            var fieldGroups = this.conversation.survey.getAllFieldGroups();
            var lastFieldGroup = lastResponse ? fieldGroups[fieldGroups.map(function (g) {
                return g.id;
            }).indexOf(lastResponse.fieldGroupId)] : null;
            this.conversation.currentFieldGroupId = this.conversation.getNextFieldGroupId(lastFieldGroup, lastResponse);
            // const templateElement = this.conversation.buildTemplateFromState(this.conversation.survey, this.account);
            var state = this.getStorageObj()[this.config.uid].state;
            if (state) {
                this.messageEl.innerHTML = state;
                Array.prototype.slice.call(this.messageEl.querySelectorAll('.fm-transposable .bubble, .message-group .placeholder')).forEach(function (el) {
                    return _this.observe(el);
                });
            }
            // this.recalculateHeight();
            this.currentScroll = this.smoothScroll.scrollToBottom(this.currentScroll);
            // }
            this.adapter = this.config.platform === 'test' ? new plugin_adapter_mock_1.PluginAdapterMock() : new plugin_adapter_1.PluginAdapter(this.config.uid);
            this.adapter.init(this.conversation, this.account, this.eventEmitter, this.config);
            // if (this.config.isHidden)
            //     this.setHidden(true);
            // If state already exists, we do this: 
            if (this.conversation.responses.length > 0) this.start();else if (this.config.platform === 'inline' && !this.isMobile) this.messageEl.classList.add('one-line', 'd-flex', 'row', 'justify-content-between', 'align-items-center');
            window.parent.postMessage({ name: 'surveyName', uid: this.config.uid, value: this.conversation.survey.title }, '*');
            return this;
        };
        __Asq__.prototype.showElements = function () {
            // there are a lot of buttons, so dont select those.
            // const bubbles = Array.prototype.slice.call(document.querySelectorAll('.message-group-messages .bubble, .list-inline .selected, .message-group .placeholder'));
            // bubbles.forEach(b => {
            //     b.style.opacity = 1;
            // })
        };
        __Asq__.prototype.hideElements = function () {
            // // there are a lot of buttons, so dont select those.
            // const bubbles = Array.prototype.slice.call(document.querySelectorAll('.message-group-messages .bubble, .list-inline .selected, .message-group .placeholder')).slice(-10);
            // bubbles.forEach(b => {
            //     const t = b.getBoundingClientRect().top;
            //     if (t < 0)
            //         b.style.opacity = 0;
            // });
            // return;
        };
        __Asq__.prototype.start = function () {
            var _this = this;
            if (this.started) return;
            this.started = true;
            window.parent.postMessage({ name: 'start', value: true, uid: this.config.uid }, '*');
            // this.rootEl.querySelector("#welcome-message").classList.add('isHidden');
            // if (this.config.platform === 'widget') this.menuEl.classList.remove('isHidden');
            // We're now waiting for server messages so we'll mark the state as pending.
            this.eventEmitter.emit('STATE_PENDING');
            var lastResponse = this.adapter.conversation.responses[this.adapter.conversation.responses.length - 1];
            var fieldGroups = this.conversation.survey.getAllFieldGroups();
            var lastFieldGroup = lastResponse ? fieldGroups[fieldGroups.map(function (g) {
                return g.id;
            }).indexOf(lastResponse.fieldGroupId)] : null;
            var nextFieldGroupId = this.adapter.conversation.getNextFieldGroupId(lastFieldGroup, lastResponse);
            var messages = this.adapter.conversation.getNextMessages(lastFieldGroup ? lastFieldGroup.id : null, nextFieldGroupId).fields;
            this.adapter.sendMessageArray(messages).then(function () {
                _this.eventEmitter.emit('STATE_READY');
            });
        };
        ;
        /* Append message to DOM from service or from user. */
        __Asq__.prototype.recalculateHeight = function (value) {
            var _this = this;
            return new Promise(function (resolve, reject) {
                // const _header = getComputedStyle(this.headerEl);
                // const headerHeight = parseInt(_header.height.slice(0, -2)) || 0; // Inline may not have header.
                // const parentStyl = getComputedStyle(this.messageWrapperEl);
                // const h = headerHeight + parseInt(getComputedStyle(this.rootEl).paddingTop.slice(0, -2)) + this.messageEl.clientHeight + parseInt(parentStyl.paddingTop.slice(0, -2)) + parseInt(parentStyl.paddingBottom.slice(0, -2))
                if (_this.config.type === 'contextual') value = 2 * parseInt(getComputedStyle(_this.messageWrapperEl).padding.slice(0, -2)) + _this.messageEl.getBoundingClientRect().height + _this.headerEl.clientHeight;
                // const _header = getComputedStyle(this.headerEl.clientHeight;
                // const headerHeight = parseInt(_header.height.slice(0, -2)); // Inline may not have header.
                window.parent.postMessage({
                    name: 'grow',
                    value: value,
                    uid: _this.config.uid
                }, '*');
                setVisibleTimeout(function () {
                    // if (this.messageEl.getBoundingClientRect().height > this.messageWrapperEl.getBoundingClientRect().height)
                    _this.currentScroll = _this.smoothScroll.scrollToBottom(_this.currentScroll);
                    resolve();
                }, 500); // wait for growth.
                // })();
            });
            // }, 1000);
        };
        /**
         * @description Create the message and also add it to the scope of this object.
         * @param message {Object} — AbstractSurveyField
         */
        __Asq__.prototype.createResponseField = function (message) {
            var _this = this;
            var containerEl = document.createElement('div');
            var onkeypress = function (e) {
                var event = e || window.event;
                var charCode = event.which || event.keyCode;
                if (charCode == '13') {
                    sendInputResponse();
                    return false;
                }
            };
            var sendInputResponse = function () {
                if (_this.messageEl.classList.contains('d-flex'))
                    // get rid of styles which allow one-liner
                    _this.messageEl.classList.remove('d-flex', 'justify-content-between', 'row', 'align-items-center');
                var input = _this.currentResponseEl.querySelector('.fm-textarea');
                // TODO: Fix!!
                var divStr = " \n            <button class=\"sender asq-btn bubble fm-transposable\" disabled>\n                <p>" + input.value + "</p>\n            </button>";
                var show = document.createElement('div');
                show.innerHTML = divStr;
                _this.currentResponseEl.appendChild(show.firstElementChild);
                _this.currentResponseEl.querySelector('.fm-input-field-and-button').classList.add('isHidden');
                _this.postResponse(input.value);
                return false;
            };
            var quickReplyHandler = function (ev) {
                if (_this.messageEl.classList.contains('d-flex'))
                    // get rid of styles which allow one-liner
                    _this.messageEl.classList.remove('one-line', 'd-flex', 'justify-content-between', 'row');
                Array.prototype.slice.call(_this.currentResponseEl.querySelectorAll('button')).forEach(function (el) {
                    ev.target.disabled = true;
                    ev.target.parentNode.disabled = true;
                    if (el.contains(ev.target) || el === ev.target) el.classList.add('selected');else el.classList.add('isHidden');
                });
                _this.postResponse(ev.target.value || ev.target.dataset['value']);
                return false;
            };
            switch (message.questionType) {
                case "TEXT":
                    containerEl.style.marginTop = '5px';
                    containerEl.innerHTML = templates_1.TEMPLATES.INPUT;
                    var input = containerEl.querySelector('.fm-textarea');
                    input.onkeypress = onkeypress;
                    this.addListener(containerEl.querySelector('.fm-send'), 'click', sendInputResponse);
                    break;
                case 'MULTIPLE_OPTION':
                    containerEl.innerHTML = templates_1.TEMPLATES.OPTION_LIST;
                    message.options.forEach(function (option) {
                        var div = document.createElement('div');
                        div.innerHTML = templates_1.TEMPLATES.OPTION;
                        var el = div.querySelector('button');
                        el.value = option.payload;
                        var p = div.querySelector('p');
                        p.value = option.payload;
                        p.innerHTML = option.title;
                        _this.append(div.querySelectorAll('.animatable'), containerEl.querySelector('ul'), div.firstElementChild, 100);
                    });
                    break;
                case 'RATING':
                    containerEl.innerHTML = templates_1.TEMPLATES.RATING_TEMPLATE;
                    break;
                case 'SMILEY':
                    containerEl.innerHTML = templates_1.TEMPLATES.SMILEY_TEMPLATE;
                    break;
                case 'BOOLEAN':
                    containerEl.innerHTML = templates_1.TEMPLATES.BOOLEAN_TEMPLATE;
                    break;
            }
            var opts = Array.prototype.slice.call(containerEl.getElementsByClassName('option'));
            opts.forEach(function (optEl) {
                return _this.addListener(optEl, 'click', quickReplyHandler);
            });
            this.currentResponseEl = containerEl.firstElementChild;
            return containerEl.firstElementChild;
        };
        __Asq__.prototype.addListener = function (el, event, fn) {
            el.addEventListener(event, fn.bind(this));
            this.listeners.push({ el: el, event: event, fn: fn });
        };
        __Asq__.prototype.removeListeners = function () {
            this.listeners.forEach(function (listener) {
                return listener.el.removeEventListener(listener.event, listener.fn);
            });
        };
        /* user sends us a message, this is where we save it */
        __Asq__.prototype.postResponse = function (text) {
            // We always save the template here.
            this.setStorageItem({ 'state': this.messageEl.innerHTML });
            if (this.isMobile) this.setActive(true);
            window.parent.postMessage({ name: 'response', value: text, uid: this.config.uid }, '*');
            this.removeListeners();
            var r = new response_1.Response({
                body: { text: text, attachment: null },
                platform: this.config.platform,
                meta: { url: document.URL },
                surveyId: this.conversation.survey.id
            });
            this.eventEmitter.emit('RESPONSE', r);
        };
        /**
         * @description Here we set the styles defined by the user. Also if this is not a
         *
         */
        __Asq__.prototype.populateTemplate = function () {
            var _this = this;
            var styles = "\n        #formatic-plugin #survey-container {\n            background: " + this.conversation.survey.pluginOpts.styles.bodyBg + "\n        }\n        #formatic-plugin #survey-container #survey-header {\n            background: " + this.conversation.survey.pluginOpts.styles.headerBg + ";\n            fill: " + this.conversation.survey.pluginOpts.styles.headerFont + "; \n            color: " + this.conversation.survey.pluginOpts.styles.headerFont + ";\n        }\n        #formatic-plugin #survey-container #survey-header:after {\n            border-bottom: 10px solid " + this.conversation.survey.pluginOpts.styles.headerBg + ";\n        }\n        #formatic-plugin #survey-container .loader span {\n            background-color: " + this.conversation.survey.pluginOpts.styles.bubbleFont + ";\n        }\n        /* message bubbles */\n        #formatic-plugin #survey-container #survey-message-wrapper .message-group-messages .bubble {\n            background: " + this.conversation.survey.pluginOpts.styles.bubbleBg + ";\n            color: " + this.conversation.survey.pluginOpts.styles.bubbleFont + ";\n        }\n        /* rating */\n        /* the color of bubbleText is typically not a good choice for the textarea */\n        #formatic-plugin #survey-container #survey-message-wrapper .fm-input-field-and-button textarea {\n            color: " + this.conversation.survey.pluginOpts.styles.bubbleBg + ";\n            border-bottom: 2px solid " + this.conversation.survey.pluginOpts.styles.bubbleBg + ";\n        }\n        #formatic-plugin #survey-container #survey-message-wrapper .fm-input-field-and-button button:not([disabled]) {\n            border: 3px solid " + this.conversation.survey.pluginOpts.styles.bubbleBg + ";\n            color: " + this.conversation.survey.pluginOpts.styles.bubbleBg + ";\n        }\n        #formatic-plugin #survey-container #survey-message-wrapper ul button {\n            color: " + this.conversation.survey.pluginOpts.styles.buttonFont + ";\n        }\n        /* bgs for buttons */\n        #formatic-plugin #survey-container #survey-message-wrapper .boolean > .option,\n        #formatic-plugin #survey-container #survey-message-wrapper .multiple-option > .option,\n        #formatic-plugin #survey-container #survey-message-wrapper .options.rating > .option:after,\n        #formatic-plugin #survey-container #survey-message-wrapper .options.smiley > .option:after {\n            background: " + this.conversation.survey.pluginOpts.styles.buttonBg + ";\n        }\n        button[disabled]:not([class*=\"icon-smiley-\"]), [disabled] .bubble {\n            background: " + this.conversation.survey.pluginOpts.styles.buttonBg + ";\n            color:  white;\n            padding: 20px!important;\n        }\n        textarea, textarea::placeholder {\n            color: " + this.conversation.survey.pluginOpts.styles.bubbleBg + ";\n        }\n        /*\n        #formatic-plugin #survey-container #survey-start-button {\n            color: " + this.conversation.survey.pluginOpts.styles.buttonFont + ";\n            color: " + this.conversation.survey.pluginOpts.styles.buttonBg + ";\n        }\n        #formatic-plugin #survey-container #survey-welcome-text {\n            color: " + this.conversation.survey.pluginOpts.styles.bodyFont + ";\n        } */";
            var style = document.createElement('style');
            style.innerHTML = styles;
            document.body.appendChild(style);
            this.rootEl.innerHTML = templates_1.TEMPLATES.TEMPLATE;
            this.rootEl.classList.add(this.config.platform); // put this first because some calculations like setHeight depend on the height of elements.
            this.headerEl = this.rootEl.querySelector('#survey-header');
            this.closeEl = this.rootEl.querySelector('#close');
            this.menuEl = this.rootEl.querySelector('#fm-widget-menu');
            this.menuEl.style.display = 'none';
            this.messageWrapperEl = this.rootEl.querySelector('#survey-message-wrapper'); // this is overflow hidden
            this.messageContainerEl = this.rootEl.querySelector('#survey-messages-and-image'); // this is full height
            this.messageEl = this.rootEl.querySelector('#survey-messages');
            this.smoothScroll = new smooth_scroll_1.SmoothScroll(this.messageWrapperEl, document);
            var headTitle = this.rootEl.querySelector('#head-title');
            // header
            var favWrap = this.rootEl.querySelector('#head-favicon');
            var av = templates_1.templateService.createAvatar("url('" + (this.account.logo || this.account.chat_icon) + "')");
            favWrap.appendChild(av);
            this.headFavicon = this.rootEl.querySelector('#head-favicon .placeholder');
            this.containerEl = this.rootEl.querySelector('#survey-container');
            // const div = document.createElement('div');
            // div.innerHTML = TEMPLATES.WELCOME;
            // this.containerEl.insertBefore(div.firstElementChild, this.containerEl.querySelector('#survey-message-wrapper'));
            this.openEl = this.rootEl.querySelector('#asq-open');
            // this.rootEl.querySelector('#survey-start-button').addEventListener('click', () => {
            //     this.start();
            // });
            this.messageWrapperEl.addEventListener('scroll', function () {
                if (_this.isFs) return;
                if (_this.scrollTimeOut) clearTimeout(_this.scrollTimeOut);
                _this.scrollTimeOut = setTimeout(function () {
                    _this.smoothScroll.scrollToBottom(_this.currentScroll);
                }, 5000);
            });
            ['mousedown', 'touchdown'].forEach(function (e) {
                return document.body.addEventListener(e, function (e) {
                    if (e.target.contains(_this.closeEl)) return;
                    window.parent.postMessage({ name: 'click', id: _this.config.id, uid: _this.config.uid }, '*');
                });
            });
            // close el.
            ['mousedown', 'touchdown'].forEach(function (e) {
                return _this.headerEl.addEventListener(e, function () {
                    _this.setActive(false);
                    if (_this.config.platform === 'context' || _this.config.platform === 'contextual' || _this.config.platform === 'drawer') _this.setHidden(true);
                });
            });
            ['mousedown', 'touchdown'].forEach(function (e) {
                return _this.menuEl.addEventListener(e, function () {
                    console.log('Menu el clicked!');
                });
            });
            window.addEventListener('message', function (event) {
                if (event && event.data && typeof event.data.isHidden !== 'undefined') _this.setHidden(event.data.isHidden, true);
                if (event && event.data && typeof event.data.expanded !== 'undefined') _this.setActive(event.data.expanded, true);
                if (event && event.data && typeof event.data.isMobile !== 'undefined') _this.setMobile(event.data.mobile, true);
            });
            this.rootEl.querySelector('#head-title').textContent = this.conversation.survey.title;
            if (this.config.platform !== 'inline') return;
        };
        __Asq__.prototype.getStorageObj = function () {
            var configStr = window.localStorage.getItem('__asq__client__storage__item__');
            var config;
            try {
                config = JSON.parse(configStr) || {};
            } catch (e) {
                throw new Error("Could not load the client data.");
            }
            ;
            return config;
        };
        ;
        __Asq__.prototype.setStorageItem = function (value) {
            var storageObj = this.getStorageObj();
            var config;
            storageObj[this.config.uid] = Object.assign({}, storageObj[this.config.uid], value);
            try {
                config = JSON.stringify(storageObj) || {};
            } catch (e) {
                throw new Error("Could not load the client data.");
            }
            ;
            window.localStorage.setItem('__asq__client__storage__item__', config);
        };
        ;
        __Asq__.prototype.teardown = function () {
            this.rootEl.innerHTML = '';
        };
        return __Asq__;
    }();
    exports.__Asq__ = __Asq__;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    ___asqBundle____ = factory();
});