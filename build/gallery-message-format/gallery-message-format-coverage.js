if (typeof _yuitest_coverage == "undefined"){
    _yuitest_coverage = {};
    _yuitest_coverline = function(src, line){
        var coverage = _yuitest_coverage[src];
        if (!coverage.lines[line]){
            coverage.calledLines++;
        }
        coverage.lines[line]++;
    };
    _yuitest_coverfunc = function(src, name, line){
        var coverage = _yuitest_coverage[src],
            funcId = name + ":" + line;
        if (!coverage.functions[funcId]){
            coverage.calledFunctions++;
        }
        coverage.functions[funcId]++;
    };
}
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-message-format/gallery-message-format.js",
    code: []
};
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].code=["YUI.add('gallery-message-format', function (Y, NAME) {","","var MODULE_NAME = \"gallery-message-format\",","    PluralRules, inRange,","    Formatter, StringFormatter, DateFormatter, TimeFormatter, NumberFormatter,SelectFormatter,","    PluralFormatter, ChoiceFormatter, MsgListFormatter, formatters;","","/**"," * Formatter base class"," * @class MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.MsgBaseFormatter = function(values) {","    this.values = values;","};","","Formatter = Y.Intl.MsgBaseFormatter;","","Y.mix(Formatter.prototype, {","    /**","     * Get value of key","     * @method getValue","     * @param key {String|Number} Key/index of value in the object/array 'values'","     * @return Value from the data in 'values'","     */","    getValue: function(key) {","        if(Y.Lang.isArray(this.values)) {","            key = parseInt(key, 10);","        }","        return this.values[key];","    },","","    /**","     * Get value of params.key","     * The value found will be set to params.value","     * @method getParams","     * @param params {Object} Object containing key as in { key: \"KEY\" }","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params) {","        if(!params || !params.key) {","            return false;","        }","","        var value = this.getValue(params.key);","	","        if(value !== undefined) {","            params.value = value;","            return true;","        }","","        return false;","    },","","    /**","     * Format string. Will be overridden in descendants","     * @method format","     */","    format: function(/*str, config*/) {","        Y.error('Not implemented');	//Must override in descendants","    }","});","","//For date and time formatters","Y.mix(Formatter, {","    /**","     * Create an instance of the formatter","     * @method createInstance","     * @static","     * //param values {Array|Object} The data to be processed and inserted.","     */","    createInstance: function(/*values*/) {","        //return new Formatter(values);","        Y.error('Not implemented');	//Must override in descendants","    },","","    /**","     * Get current timezone. Used for time format","     * @method getCurrentTimeZone","     * @return {Y.Date.Timezone}","     */","    getCurrentTimeZone: function() {","        if(Y.Date === undefined || Y.Date.Timezone === undefined) { return \"GMT\"; }","        var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;","        return Y.Date.Timezone.getTimezoneIdForOffset(systemTZoneOffset);","    }","});","/**"," * String formatter"," * @class StringFormatter"," * @namespace Intl"," * @extends MsgBaseFormatter"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.StringFormatter = function(values) {","    StringFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*}\";","};","","StringFormatter = Y.Intl.StringFormatter;","Y.extend(StringFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","StringFormatter.createInstance = function(values) {","    return new StringFormatter(values);","};","","Y.mix(StringFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store key and value in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches && matches[1]) {","            params.key = matches[1];","            if(Formatter.prototype.getParams.call(this, params)) {","                return true;","            }","        }","	","        return false;","    },","","    /**","     * Format all instances in str that can be handled by StringFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                str = str.replace(matches[0], params.value);","            }","","        }","","        return str;","    }","}, true);/**"," * Date formatter"," * @class DateFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.DateFormatter = function(values) {","    DateFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"short\":  [ 512 /*Y.Date.DATE_FORMATS.YMD_SHORT*/, 0, 0 ],","        \"medium\": [ 256 /*Y.Date.DATE_FORMATS.YMD_ABBREVIATED*/,0, 0 ],","        \"long\":   [ 128 /*Y.Date.DATE_FORMATS.YMD_LONG*/, 0, 0 ],","        \"full\":   [ 1 /*Y.Date.DATE_FORMATS.WYMD_LONG*/, 0, 0 ]","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*date\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","DateFormatter = Y.Intl.DateFormatter;","Y.extend(DateFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","DateFormatter.createInstance = function(values) {","    return new DateFormatter(values);","};","","Y.mix(DateFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","            if(matches[3]) {","                params.style = matches[3];","            }","        }","","        if(!params.style) {","            params.style = \"medium\";","        }			//If no style, default to medium","","        if(!this.styles[params.style]) {","            return false;","        }	//Invalid style","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Format all instances in str that can be handled by DateFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @param [config] {Object} Optional configuration parameters. Used to pass timezone for time formatting","     * @return {String} Formatted result","     */","    format: function(str, config) {","        if(Y.Date === undefined || !Y.Date.__advancedFormat ) { return str; }","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, style, result;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                style = this.styles[params.style];","                result = Y.Date.format(new Date(params.value), {","                    timezone: config.timezone || Formatter.getCurrentTimeZone(),","                    dateFormat: style[0],","                    timeFormat: style[1],","                    timezoneFormat: style[2]","                });","                str = str.replace(matches[0], result);","            }","","        }","","        return str;","    }","}, true);","/**"," * Time formatter"," * @class TimeFormatter"," * @extends DateFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.TimeFormatter = function(values) {","    TimeFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"short\": [ 0, 2 /*Y.Date.TIME_FORMATS.HM_SHORT*/, 0 ],","        \"medium\": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 0 ],","        \"long\": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 2 /*Y.Date.TIMEZONE_FORMATS.Z_SHORT*/ ],","        \"full\": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 1 /*Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED*/ ]","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*time\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","TimeFormatter = Y.Intl.TimeFormatter;","Y.extend(TimeFormatter, DateFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","TimeFormatter.createInstance = function(values) {","    return new TimeFormatter(values);","};","/**"," * Number formatter"," * @class NumberFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.NumberFormatter = function(values) {","    NumberFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"integer\": 4 /*Y.Number.STYLES.NUMBER_STYLE*/,","        \"percent\": 8 /*Y.Number.STYLES.PERCENT_STYLE*/,","        \"currency\": 1 /*Y.Number.STYLES.CURRENCY_STYLE*/","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*number\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","NumberFormatter = Y.Intl.NumberFormatter;","Y.extend(NumberFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","NumberFormatter.createInstance = function(values) {","    return new NumberFormatter(values);","};","","Y.mix(NumberFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","            if(matches[3]) {","                params.style = matches[3];","            }","        }","","        if(!params.style) {","            params.style = \"integer\";	//If no style, default to medium","            params.showDecimal = true;	//Show decimal parts too","        }","","        if(!this.styles[params.style]) {	//Invalid style","            return false;","        }","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Format all instances in str that can be handled by NumberFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        if(Y.Number === undefined || !Y.Number.__advancedFormat) { return str; }","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, config;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                config = {","                    style: this.styles[params.style]","                };","                if(params.style === \"integer\" && !params.showDecimal) {","                    config.parseIntegerOnly = true;","                }","                str = str.replace(matches[0], Y.Number.format(params.value, config));","            }","        }","","        return str;","    }","}, true);","/**"," * Select formatter. Select ouput based on value of key"," * @class SelectFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.SelectFormatter = function(values) {","    SelectFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*select\\\\s*,\\\\s*\";","};","","SelectFormatter = Y.Intl.SelectFormatter;","Y.extend(SelectFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","SelectFormatter.createInstance = function(values) {","    return new SelectFormatter(values);","};","","Y.mix(SelectFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store key and value in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","        }","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Parse choices in pattern and get options array.","     * @method parseOptions","     * @param str {String} Pattern string","     * @param start {Number} Position in str to start parsing from","     * @return {Object} Object in the form:","             {","               options: [","                     { key: KEY1, value: VALUE1 },","                     { key: KEY2, value: VALUE2 },","                     ... ],","               next: i  //Index of next character in str that can be parsed","             }","     */","    parseOptions: function(str, start) {","        var options = {},","            key = \"\", value = \"\", current = \"\",","            i, ch;","        for(i=start; i<str.length; i++) {","            ch = str.charAt(i);","            if (ch === '\\\\') {","                current += ch + str.charAt(i+1);","                i++;","            } else if (ch === '}') {","                if(current === \"\") {","                    i++;","                    break;","                }","                value = current;","                options[key.trim()] = value;","                current = key = value = \"\";","            } else if (ch === '{') {","                key = current;","                current = \"\";","            } else {","                current += ch;","            }","        }","","        if(current !== \"\") {","            return null;","        }","","        return {","            options: options,","            next: i","        };","    },","","    /**","     * Select output depending on params.value from options","     * @method select","     * @param options {Array} Array of key,value pairs","     * @param params {Object} Object containing value","     * @return {String} selected result","     */","    select: function(options, params) {","        for ( var key in options ) {","            if( key === \"other\" ) {","                continue;	//Will use this only if everything else fails","            }","","            if( key === params.value ) {","                return options[key];","            }","        }","","        return options.other;","    },","","    /**","     * Format all instances in str that can be handled by SelectFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, options, result, start;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                options = this.parseOptions(str, regex.lastIndex);","                if(!options) {","                    continue;","                }","","                regex.lastIndex = options.next;","                options = options.options;","","                result = this.select(options, params);","                if(result) {","                    start = str.indexOf(matches[0]);","                    str = str.slice(0, start) + result + str.slice(regex.lastIndex);","                }","            }","        }","","        return str;","    }","}, true);/**"," * PluralRules is used to determine the plural form in MessageFormat"," * @class PluralRules"," * @namespace Intl"," * @static"," */","Y.Intl.PluralRules = {","    /**","     * Check if n is between start and end","     * @method _inRange","     * @static","     * @private","     * @param n {Number} Number to test","     * @param start {Number} Start of range","     * @param end {Number} End of range","     * @return {Boolean} true if n is between start and end, false otherwise","     */","    _inRange: function(n, start, end) {","        return n >= start && n <= end;","    },","","    /**","     * Find matching plural form for the set of rules","     * @method _matchRule","     * @static","     * @private","     * @param rules {Object} Keys will be plural forms one,two,.. Values will be boolean","     * @return {String} Returns key that has value true","     */","    _matchRule: function(rules) {","        for(var key in rules) {","            if(rules[key]) { return key; }","        }","        return \"other\";","    },","","    /**","     * Set of rules. Each locale will have a matching rule. The corresponding functions in each set","     * will take a number as parameter and return the relevant plural form.","     */","    rules: {","        set1: function(n) {","            var mod = n % 100;","            return PluralRules._matchRule({","                few:  inRange(mod, 3, 10),","                many: inRange(mod, 11, 99),","                one:  n === 1,","                two:  n === 2,","                zero: n === 0","            });","        },","","        set2: function(n) {","            return PluralRules._matchRule({","               many: n !== 0 && n%10 === 0,","               one:  n === 1,","               two:  n === 2","            });","        },","","        set3: function(n) {","            return PluralRules._matchRule({","               one: n === 1","            });","        },","","        set4: function(n) {","            return PluralRules._matchRule({","                one: inRange(n, 0, 1)","            });","        },","","        set5: function(n) {","            return PluralRules._matchRule({","                one: inRange(n, 0, 2) && n !== 2","            });","        },","","        set6: function(n) {","            return PluralRules._matchRule({","                one:  n%10 === 1 && n%100 !== 11,","                zero: n === 0","            });","        },","","        set7: function(n) {","            return PluralRules._matchRule({","                one: n === 1,","                two: n === 2","            });","        },","","        set8: function(n) {","            return PluralRules._matchRule({","                few:  inRange(n, 3, 6),","                many: inRange(n, 7, 10),","                one:  n === 1,","                two:  n === 2","            });","        },","","        set9: function(n) {","            return PluralRules._matchRule({","                few: n === 0 || (n !== 1 && inRange(n%100, 1, 19)),","                one: n === 1","            });","        },","","        set10: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few: inRange(mod10, 2, 9) && !inRange(mod100, 11, 19),","                one: mod10 === 1 && !inRange(mod100, 11, 19)","            });","        },","","        set11: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),","                many: mod10 === 0 || inRange(mod10, 5, 9) || inRange(mod100, 11, 14),","                one:  mod10 === 1 && mod100 !== 11","            });","        },","","        set12: function(n) {","            return PluralRules._matchRule({","                few: inRange(n, 2, 4),","                one: n === 1","            });","        },","","        set13: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),","                many: n !== 1 && inRange(mod10, 0, 1) || inRange(mod10, 5, 9) || inRange(mod100, 12, 14),","                one:  n === 1","            });","        },","","        set14: function(n) {","            var mod = n%100;","            return PluralRules._matchRule({","                few: inRange(mod, 3, 4),","                one: mod === 1,","                two: mod === 2","            });","        },","","        set15: function(n) {","            var mod = n%100;","            return PluralRules._matchRule({","                few:  n === 0 || inRange(mod, 2, 10),","                many: inRange(mod, 11, 19),","                one:  n === 1","            });","        },","","        set16: function(n) {","            return PluralRules._matchRule({","                one: n%10 === 1 && n !== 11","            });","        },","","        set17: function(n) {","            return PluralRules._matchRule({","                few:  n === 3,","                many: n === 6,","                one:  n === 1,","                two:  n === 2,","                zero: n === 0","            });","        },","","        set18: function(n) {","            return PluralRules._matchRule({","                one:  inRange(n, 0, 2) && n !== 0 && n !== 2,","                zero: n === 0","            });","        },","","        set19: function(n) {","            return PluralRules._matchRule({","                few: inRange(n, 2, 10),","                one: inRange(n, 0, 1)","            });","        },","","        set20: function(n) {","            var mod1 = n%10, mod2 = n%100, mod6 = n%1000000;","            return PluralRules._matchRule({","                few:  (inRange(mod1, 3, 4) || mod1 === 9) && !inRange(mod2, 10, 19) && !inRange(mod2, 70, 79) && !inRange(mod2, 90, 99),","                many: n !== 0 && mod6 === 0,","                one:  mod1 === 1 && mod2 !== 11 && mod2 !== 71 && mod2 !== 91,","                two:  mod1 === 2 && mod2 !== 12 && mod2 !== 72 && mod2 !== 92","            });","        },","","        set21: function(n) {","            return PluralRules._matchRule({","                one:  n === 1,","                zero: n === 0","            });","        },","","        set22: function(n) {","            return PluralRules._matchRule({","                one: inRange(n, 0, 1) || inRange(n, 11, 99)","            });","        },","","        set23: function(n) {","            return PluralRules._matchRule({","                one: inRange(n%10, 1, 2) || n%20 === 0","            });","        },","","        set24: function(n) {","            return PluralRules._matchRule({","                few: inRange(n, 3, 10) || inRange(n, 13, 19),","                one: n === 1 || n === 11,","                two: n === 2 || n === 12","            });","        },","","        set25: function(n) {","            return PluralRules._matchRule({","                one: n === 1 || n === 5","            });","        },","","        set26: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                one: (mod10 === 1 || mod10 === 2) && (mod100 !== 11 && mod100 !== 12)","            });","        },","","        set27: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few: mod10 === 3 && mod100 !== 13,","                one: mod10 === 1 && mod100 !== 11,","                two: mod10 === 2 && mod100 !== 12","            });","        },","","        set28: function(n) {","            return PluralRules._matchRule({","                many: n === 11 || n === 8 || n === 80 || n === 800","            });","        },","","        set29: function(n) {","            return PluralRules._matchRule({","                few: n === 4,","                one: n === 1 || n === 3,","                two: n === 2","            });","        },","","        set30: function(n) {","            return PluralRules._matchRule({","                few: n === 4,","                one: n === 1,","                two: n === 2 || n === 3","            });","        },","","        set31: function(n) {","            return PluralRules._matchRule({","                few:  n === 4,","                many: n === 6,","                one:  n === 1,","                two:  n === 2 || n === 3","            });","        },","","        set32: function(n) {","            return PluralRules._matchRule({","                few:  n === 4,","                many: n === 6,","                one:  Y.Array.indexOf([1,5,7,8,9,10], n) > -1,","                two: n === 2 || n === 3","            });","        },","","        set33: function(n) {","            return PluralRules._matchRule({","                few:  inRange(n, 2, 9),","                many: inRange(n, 10, 19) || inRange(n, 100, 199) || inRange(n, 1000, 1999),","                one:  n === 1","            });","        }","    }","};","","PluralRules = Y.Intl.PluralRules;","inRange = PluralRules._inRange;","/**"," * Plural formatter. Select ouput based on whether value of key is singular/plural"," * @class PluralFormatter"," * @extends SelectFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.PluralFormatter = function(values) {","    PluralFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*plural\\\\s*,\\\\s*\";","    ","    var formats = Y.Intl.get(MODULE_NAME),","        ruleSet = formats.pluralRule;","","    if(ruleSet) {","         this.rule = PluralRules.rules[ruleSet];","    }","","    if(this.rule === undefined) {","         this.rule = function() { return \"other\"; };","    }","};","","PluralFormatter = Y.Intl.PluralFormatter;","Y.extend(PluralFormatter, SelectFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","PluralFormatter.createInstance = function(values) {","    return new PluralFormatter(values);","};","","/**"," * Select output depending on params.value from options"," * @method select"," * @param options {Object} Object containing results for singular/plural"," * @param params {Object} Object containing value"," * @return {String} selected result"," */","PluralFormatter.prototype.select = function(options, params) {","    var pluralForm = this.rule(params.value),","        result = options[pluralForm];","","    if(result === undefined || result === null) {","        result = options.other;","    }","","    result = result.replace(\"#\", new NumberFormatter({VAL: params.value}).format(\"{VAL, number, integer}\"));	//Use 'number' to format this part","","    return result;","};","/**"," * Choice formatter. Select ouput based on numerical values"," * @class ChoiceFormatter"," * @extends SelectFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.ChoiceFormatter = function(values) {","    ChoiceFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*choice\\\\s*,\\\\s*(.+)}\";","};","","ChoiceFormatter = Y.Intl.ChoiceFormatter;","Y.extend(ChoiceFormatter, SelectFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","ChoiceFormatter.createInstance = function(values) {","    return new ChoiceFormatter(values);","};","","Y.mix(ChoiceFormatter.prototype, {","    /**","     * Parse choices in pattern and get options array.","     * @method parseOptions","     * @param choicesStr {String} Choice string from pattern","     * @return {Array} Array of objects containing value(choice), result, and relation","     */","    parseOptions: function(choicesStr) {","        var options = [],","            choicesArray = choicesStr.split(\"|\"),","            i, j, choice, relations, rel, mapping, ch;","        for (i=0; i<choicesArray.length; i++) {","            choice = choicesArray[i];","            relations = ['#', '<', '\\u2264'];","            for (j=0; j<relations.length; j++) {","                rel = relations[j];","                if(choice.indexOf(rel) !== -1) {","                    mapping = choice.split(rel);","                    ch = {","                        value: parseInt(mapping[0], 10),","                        result: mapping[1],","                        relation: rel","                    };","                    options.push(ch);","                    break;","                }","            }","        }","","        return options;","    },","","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, choices in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(SelectFormatter.prototype.getParams.call(this, params, matches)) {","            if(matches[2]) {","                params.choices = this.parseOptions(matches[2]);","                return params.choices === [] ? false: true;","            }","        }","","        return false;","    },","","    /**","     * Select output depending on params.value from options in params.choices","     * @method select","     * @param params {Object} Object containing value and choices","     * @return {String} selected result","     */","    select: function(params) {","        var choice, value, result, relation, i;","        for (i=0; i<params.choices.length; i++) {","            choice = params.choices[i];","            value = choice.value, result = choice.result, relation = choice.relation;","","            if( (relation === '#' && value === params.value) || (relation === '<' && value < params.value)","                || (relation === '\\u2264' && value <= params.value)) {","                return result;","            }","        }","","        return \"\";","    },","","    /**","     * Format all instances in str that can be handled by ChoiceFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, result;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                result = this.select(params);","                if(result) {","                    str = str.replace(matches[0], result);","                }","            }","        }","","        return str;","    }","}, true);/**"," * List formatter"," * @class MsgListFormatter"," * @namespace Intl"," * @extends StringFormatter"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.MsgListFormatter = function(values) {","      MsgListFormatter.superclass.constructor.call(this, values);","      this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*list\\\\s*}\";","};","","MsgListFormatter = Y.Intl.MsgListFormatter;","Y.extend(MsgListFormatter, StringFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","MsgListFormatter.createInstance = function(values) {","     return new MsgListFormatter(values);","};","","Y.mix(MsgListFormatter.prototype, {","     /**","      * Format all instances in str that can be handled by MsgListFormatter","      * @method format","      * @param str {String} Input string/pattern","      * @return {String} Formatted result","      */","     format: function(str) {","          if(Y.Intl === undefined || Y.Intl.ListFormatter === undefined || Y.Intl.ListFormatter.format === undefined) { return str; }","          var regex = new RegExp(this.regex, \"gm\"),","              matches = null,","              params;","","          while((matches = regex.exec(str))) {","              params = {};","","              if(this.getParams(params, matches)) {","                  //Got a match","                  str = str.replace(","                             matches[0],","                             Y.Intl.ListFormatter.format( params.value )","                  );","              }","          }","","          return str;","     }","}, true);","","/**"," * MessageFormat enables the construction of localizable messages that combine static strings with information that only becomes available at runtime."," * @module intl-format"," * @requires datatype-date-advanced-format, datatype-number-advanced-format, intl"," */","","/**"," * Formatter classes. For each group found in the pattern, will try to parse with all of these formatters."," * If a formatter fails to parse, the next one in the list try to do so."," */","formatters = [ StringFormatter, DateFormatter, TimeFormatter, NumberFormatter, ChoiceFormatter, PluralFormatter, SelectFormatter, MsgListFormatter ];","","Y.mix(Y.Intl, {","","    /**","     * Format message that may contain date/time, numbers, etc. Choice, Select and Plural formatters are also available.","     * @method formatMessage","     * @static","     * @param pattern {String} string contains static text with embedded format elements that specify","              how to process and insert strings, numbers, and dates, as well as perform conditional processing.","     * @param values {Object|Array} The data to be processed and inserted.","     * @param [config] {Object} Optional configuration parameters","     * @return {String} Formatted result","     * @example","            //String formatting. Key is replaced by value","            Y.Intl.formatMessage(\"{EMPLOYEE} reports to {MANAGER}\", {","                \"EMPLOYEE\": \"Ashik\",","                \"MANAGER\": \"Dharmesh\"","            });","","            //3-parameter form: {KEY, type, style}. Style is optional. Type can be date/time/number. Style can be short/medium/long/full","            //For 'time', timezone can be specified as configuration param. If not specified, will default to system timezone","            Y.Intl.formatMessage(\"Today is {DATE, date, short}\", { DATE: new Date() });","            Y.Intl.formatMessage(\"The time is {DATE, time, medium}\", {DATE: new Date()}, {timezone: \"Asia/Kolkata\"});","            Y.Intl.formatMessage(\"There are {POPULATION_INDIA, number} million people in India.\", {POPULATION_INDIA: 1241.492});","","            //Select formatting. Selects output depending on value","            Y.Intl.formatMessage(\"{NAME} est {GENDER, select, female {allée} other {allé}} à {CITY}.\", {","                \"NAME\": \"Henri\",","                \"GENDER\": \"male\",","                \"CITY\": \"Paris\"","            });","","            //Plural formatting. Selects output depending on whether numerical value is singular/plural","            Y.Intl.formatMessage(\"{COMPANY_COUNT, plural, one {One company} other {# companies}} published new books.\", {","                \"COMPANY_COUNT\": 1","            });","","            //Choice formatting. Selects output depending on numerical value","            Y.Intl.formatMessage(\"There {FILE_COUNT, choice, 0#are no files|1#is one file|1<are {FILE_COUNT, number, integer} files} on disk.\", {","                \"FILE_COUNT\": 1","            });","     */","    formatMessage: function(pattern, values, config) {","        config = config || {};","        var i, formatter;","        for(i=0; i<formatters.length; i++) {","            formatter = formatters[i].createInstance(values);","            pattern = formatter.format(pattern, config);","        }","        return pattern;","    }","});","","","}, '@VERSION@', {","    \"lang\": [","        \"am\",","        \"ar\",","        \"be\",","        \"cs\",","        \"cy\",","        \"fil\",","        \"fr\",","        \"ga\",","        \"gv\",","        \"he\",","        \"hi\",","        \"hr\",","        \"\",","        \"kw\",","        \"lt\",","        \"lv\",","        \"mk\",","        \"mt\",","        \"pl\",","        \"ro\",","        \"ru\",","        \"sh\",","        \"sk\",","        \"sl\",","        \"sr\",","        \"ti\",","        \"tl\",","        \"uk\"","    ],","    \"requires\": [","        \"intl\"","    ]","});"];
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].lines = {"1":0,"3":0,"16":0,"17":0,"20":0,"22":0,"30":0,"31":0,"33":0,"44":0,"45":0,"48":0,"50":0,"51":0,"52":0,"55":0,"63":0,"68":0,"77":0,"86":0,"87":0,"88":0,"100":0,"101":0,"102":0,"105":0,"106":0,"114":0,"115":0,"118":0,"127":0,"128":0,"129":0,"130":0,"134":0,"144":0,"147":0,"148":0,"150":0,"152":0,"157":0,"168":0,"169":0,"170":0,"176":0,"179":0,"180":0,"188":0,"189":0,"192":0,"201":0,"202":0,"203":0,"205":0,"206":0,"210":0,"211":0,"214":0,"215":0,"218":0,"219":0,"222":0,"233":0,"234":0,"237":0,"238":0,"240":0,"242":0,"243":0,"249":0,"254":0,"266":0,"267":0,"268":0,"274":0,"277":0,"278":0,"286":0,"287":0,"298":0,"299":0,"300":0,"305":0,"308":0,"309":0,"317":0,"318":0,"321":0,"330":0,"331":0,"332":0,"334":0,"335":0,"339":0,"340":0,"341":0,"344":0,"345":0,"348":0,"349":0,"352":0,"362":0,"363":0,"366":0,"367":0,"369":0,"371":0,"374":0,"375":0,"377":0,"381":0,"393":0,"394":0,"395":0,"398":0,"399":0,"407":0,"408":0,"411":0,"420":0,"421":0,"422":0,"426":0,"427":0,"430":0,"448":0,"451":0,"452":0,"453":0,"454":0,"455":0,"456":0,"457":0,"458":0,"459":0,"461":0,"462":0,"463":0,"464":0,"465":0,"466":0,"468":0,"472":0,"473":0,"476":0,"490":0,"491":0,"492":0,"495":0,"496":0,"500":0,"510":0,"513":0,"514":0,"516":0,"518":0,"519":0,"520":0,"523":0,"524":0,"526":0,"527":0,"528":0,"529":0,"534":0,"542":0,"554":0,"566":0,"567":0,"569":0,"578":0,"579":0,"589":0,"597":0,"603":0,"609":0,"615":0,"622":0,"629":0,"638":0,"645":0,"646":0,"653":0,"654":0,"662":0,"669":0,"670":0,"678":0,"679":0,"687":0,"688":0,"696":0,"702":0,"712":0,"719":0,"726":0,"727":0,"736":0,"743":0,"749":0,"755":0,"763":0,"769":0,"770":0,"776":0,"777":0,"785":0,"791":0,"799":0,"807":0,"816":0,"825":0,"834":0,"835":0,"845":0,"846":0,"847":0,"849":0,"852":0,"853":0,"856":0,"857":0,"861":0,"862":0,"870":0,"871":0,"881":0,"882":0,"885":0,"886":0,"889":0,"891":0,"902":0,"903":0,"904":0,"907":0,"908":0,"916":0,"917":0,"920":0,"928":0,"931":0,"932":0,"933":0,"934":0,"935":0,"936":0,"937":0,"938":0,"943":0,"944":0,"949":0,"960":0,"961":0,"962":0,"963":0,"967":0,"977":0,"978":0,"979":0,"980":0,"982":0,"984":0,"988":0,"998":0,"1001":0,"1002":0,"1004":0,"1005":0,"1006":0,"1007":0,"1012":0,"1023":0,"1024":0,"1025":0,"1028":0,"1029":0,"1037":0,"1038":0,"1041":0,"1049":0,"1050":0,"1054":0,"1055":0,"1057":0,"1059":0,"1066":0,"1080":0,"1082":0,"1124":0,"1125":0,"1126":0,"1127":0,"1128":0,"1130":0};
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].functions = {"MsgBaseFormatter:16":0,"getValue:29":0,"getParams:43":0,"format:62":0,"createInstance:75":0,"getCurrentTimeZone:85":0,"StringFormatter:100":0,"createInstance:114":0,"getParams:126":0,"format:143":0,"DateFormatter:168":0,"createInstance:188":0,"getParams:200":0,"format:232":0,"TimeFormatter:266":0,"createInstance:286":0,"NumberFormatter:298":0,"createInstance:317":0,"getParams:329":0,"format:361":0,"SelectFormatter:393":0,"createInstance:407":0,"getParams:419":0,"parseOptions:447":0,"select:489":0,"format:509":0,"_inRange:553":0,"_matchRule:565":0,"set1:577":0,"set2:588":0,"set3:596":0,"set4:602":0,"set5:608":0,"set6:614":0,"set7:621":0,"set8:628":0,"set9:637":0,"set10:644":0,"set11:652":0,"set12:661":0,"set13:668":0,"set14:677":0,"set15:686":0,"set16:695":0,"set17:701":0,"set18:711":0,"set19:718":0,"set20:725":0,"set21:735":0,"set22:742":0,"set23:748":0,"set24:754":0,"set25:762":0,"set26:768":0,"set27:775":0,"set28:784":0,"set29:790":0,"set30:798":0,"set31:806":0,"set32:815":0,"set33:824":0,"rule:857":0,"PluralFormatter:845":0,"createInstance:870":0,"select:881":0,"ChoiceFormatter:902":0,"createInstance:916":0,"parseOptions:927":0,"getParams:959":0,"select:976":0,"format:997":0,"MsgListFormatter:1023":0,"createInstance:1037":0,"format:1048":0,"formatMessage:1123":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].coveredLines = 295;
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].coveredFunctions = 76;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1);
YUI.add('gallery-message-format', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 3);
var MODULE_NAME = "gallery-message-format",
    PluralRules, inRange,
    Formatter, StringFormatter, DateFormatter, TimeFormatter, NumberFormatter,SelectFormatter,
    PluralFormatter, ChoiceFormatter, MsgListFormatter, formatters;

/**
 * Formatter base class
 * @class MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 16);
Y.Intl.MsgBaseFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "MsgBaseFormatter", 16);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 17);
this.values = values;
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 20);
Formatter = Y.Intl.MsgBaseFormatter;

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 22);
Y.mix(Formatter.prototype, {
    /**
     * Get value of key
     * @method getValue
     * @param key {String|Number} Key/index of value in the object/array 'values'
     * @return Value from the data in 'values'
     */
    getValue: function(key) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getValue", 29);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 30);
if(Y.Lang.isArray(this.values)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 31);
key = parseInt(key, 10);
        }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 33);
return this.values[key];
    },

    /**
     * Get value of params.key
     * The value found will be set to params.value
     * @method getParams
     * @param params {Object} Object containing key as in { key: "KEY" }
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 43);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 44);
if(!params || !params.key) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 45);
return false;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 48);
var value = this.getValue(params.key);
	
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 50);
if(value !== undefined) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 51);
params.value = value;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 52);
return true;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 55);
return false;
    },

    /**
     * Format string. Will be overridden in descendants
     * @method format
     */
    format: function(/*str, config*/) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 62);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 63);
Y.error('Not implemented');	//Must override in descendants
    }
});

//For date and time formatters
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 68);
Y.mix(Formatter, {
    /**
     * Create an instance of the formatter
     * @method createInstance
     * @static
     * //param values {Array|Object} The data to be processed and inserted.
     */
    createInstance: function(/*values*/) {
        //return new Formatter(values);
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 75);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 77);
Y.error('Not implemented');	//Must override in descendants
    },

    /**
     * Get current timezone. Used for time format
     * @method getCurrentTimeZone
     * @return {Y.Date.Timezone}
     */
    getCurrentTimeZone: function() {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getCurrentTimeZone", 85);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 86);
if(Y.Date === undefined || Y.Date.Timezone === undefined) { return "GMT"; }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 87);
var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 88);
return Y.Date.Timezone.getTimezoneIdForOffset(systemTZoneOffset);
    }
});
/**
 * String formatter
 * @class StringFormatter
 * @namespace Intl
 * @extends MsgBaseFormatter
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 100);
Y.Intl.StringFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "StringFormatter", 100);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 101);
StringFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 102);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 105);
StringFormatter = Y.Intl.StringFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 106);
Y.extend(StringFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 114);
StringFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 114);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 115);
return new StringFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 118);
Y.mix(StringFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store key and value in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 126);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 127);
if(matches && matches[1]) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 128);
params.key = matches[1];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 129);
if(Formatter.prototype.getParams.call(this, params)) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 130);
return true;
            }
        }
	
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 134);
return false;
    },

    /**
     * Format all instances in str that can be handled by StringFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 143);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 144);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 147);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 148);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 150);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 152);
str = str.replace(matches[0], params.value);
            }

        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 157);
return str;
    }
}, true);/**
 * Date formatter
 * @class DateFormatter
 * @extends MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 168);
Y.Intl.DateFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "DateFormatter", 168);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 169);
DateFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 170);
this.styles = {
        "short":  [ 512 /*Y.Date.DATE_FORMATS.YMD_SHORT*/, 0, 0 ],
        "medium": [ 256 /*Y.Date.DATE_FORMATS.YMD_ABBREVIATED*/,0, 0 ],
        "long":   [ 128 /*Y.Date.DATE_FORMATS.YMD_LONG*/, 0, 0 ],
        "full":   [ 1 /*Y.Date.DATE_FORMATS.WYMD_LONG*/, 0, 0 ]
    };
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 176);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*date\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 179);
DateFormatter = Y.Intl.DateFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 180);
Y.extend(DateFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 188);
DateFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 188);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 189);
return new DateFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 192);
Y.mix(DateFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 200);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 201);
if(matches) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 202);
if(matches[1]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 203);
params.key = matches[1];
            }
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 205);
if(matches[3]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 206);
params.style = matches[3];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 210);
if(!params.style) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 211);
params.style = "medium";
        }			//If no style, default to medium

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 214);
if(!this.styles[params.style]) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 215);
return false;
        }	//Invalid style

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 218);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 219);
return true;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 222);
return false;
    },

    /**
     * Format all instances in str that can be handled by DateFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @param [config] {Object} Optional configuration parameters. Used to pass timezone for time formatting
     * @return {String} Formatted result
     */
    format: function(str, config) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 232);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 233);
if(Y.Date === undefined || !Y.Date.__advancedFormat ) { return str; }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 234);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, style, result;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 237);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 238);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 240);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 242);
style = this.styles[params.style];
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 243);
result = Y.Date.format(new Date(params.value), {
                    timezone: config.timezone || Formatter.getCurrentTimeZone(),
                    dateFormat: style[0],
                    timeFormat: style[1],
                    timezoneFormat: style[2]
                });
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 249);
str = str.replace(matches[0], result);
            }

        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 254);
return str;
    }
}, true);
/**
 * Time formatter
 * @class TimeFormatter
 * @extends DateFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 266);
Y.Intl.TimeFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "TimeFormatter", 266);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 267);
TimeFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 268);
this.styles = {
        "short": [ 0, 2 /*Y.Date.TIME_FORMATS.HM_SHORT*/, 0 ],
        "medium": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 0 ],
        "long": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 2 /*Y.Date.TIMEZONE_FORMATS.Z_SHORT*/ ],
        "full": [ 0, 1 /*Y.Date.TIME_FORMATS.HM_ABBREVIATED*/, 1 /*Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED*/ ]
    };
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 274);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*time\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 277);
TimeFormatter = Y.Intl.TimeFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 278);
Y.extend(TimeFormatter, DateFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 286);
TimeFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 286);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 287);
return new TimeFormatter(values);
};
/**
 * Number formatter
 * @class NumberFormatter
 * @extends MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 298);
Y.Intl.NumberFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "NumberFormatter", 298);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 299);
NumberFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 300);
this.styles = {
        "integer": 4 /*Y.Number.STYLES.NUMBER_STYLE*/,
        "percent": 8 /*Y.Number.STYLES.PERCENT_STYLE*/,
        "currency": 1 /*Y.Number.STYLES.CURRENCY_STYLE*/
    };
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 305);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*number\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 308);
NumberFormatter = Y.Intl.NumberFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 309);
Y.extend(NumberFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 317);
NumberFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 317);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 318);
return new NumberFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 321);
Y.mix(NumberFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 329);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 330);
if(matches) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 331);
if(matches[1]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 332);
params.key = matches[1];
            }
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 334);
if(matches[3]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 335);
params.style = matches[3];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 339);
if(!params.style) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 340);
params.style = "integer";	//If no style, default to medium
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 341);
params.showDecimal = true;	//Show decimal parts too
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 344);
if(!this.styles[params.style]) {	//Invalid style
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 345);
return false;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 348);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 349);
return true;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 352);
return false;
    },

    /**
     * Format all instances in str that can be handled by NumberFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 361);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 362);
if(Y.Number === undefined || !Y.Number.__advancedFormat) { return str; }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 363);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, config;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 366);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 367);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 369);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 371);
config = {
                    style: this.styles[params.style]
                };
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 374);
if(params.style === "integer" && !params.showDecimal) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 375);
config.parseIntegerOnly = true;
                }
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 377);
str = str.replace(matches[0], Y.Number.format(params.value, config));
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 381);
return str;
    }
}, true);
/**
 * Select formatter. Select ouput based on value of key
 * @class SelectFormatter
 * @extends MsgBaseFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 393);
Y.Intl.SelectFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "SelectFormatter", 393);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 394);
SelectFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 395);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*select\\s*,\\s*";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 398);
SelectFormatter = Y.Intl.SelectFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 399);
Y.extend(SelectFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 407);
SelectFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 407);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 408);
return new SelectFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 411);
Y.mix(SelectFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store key and value in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 419);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 420);
if(matches) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 421);
if(matches[1]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 422);
params.key = matches[1];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 426);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 427);
return true;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 430);
return false;
    },

    /**
     * Parse choices in pattern and get options array.
     * @method parseOptions
     * @param str {String} Pattern string
     * @param start {Number} Position in str to start parsing from
     * @return {Object} Object in the form:
             {
               options: [
                     { key: KEY1, value: VALUE1 },
                     { key: KEY2, value: VALUE2 },
                     ... ],
               next: i  //Index of next character in str that can be parsed
             }
     */
    parseOptions: function(str, start) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "parseOptions", 447);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 448);
var options = {},
            key = "", value = "", current = "",
            i, ch;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 451);
for(i=start; i<str.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 452);
ch = str.charAt(i);
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 453);
if (ch === '\\') {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 454);
current += ch + str.charAt(i+1);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 455);
i++;
            } else {_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 456);
if (ch === '}') {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 457);
if(current === "") {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 458);
i++;
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 459);
break;
                }
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 461);
value = current;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 462);
options[key.trim()] = value;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 463);
current = key = value = "";
            } else {_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 464);
if (ch === '{') {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 465);
key = current;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 466);
current = "";
            } else {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 468);
current += ch;
            }}}
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 472);
if(current !== "") {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 473);
return null;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 476);
return {
            options: options,
            next: i
        };
    },

    /**
     * Select output depending on params.value from options
     * @method select
     * @param options {Array} Array of key,value pairs
     * @param params {Object} Object containing value
     * @return {String} selected result
     */
    select: function(options, params) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "select", 489);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 490);
for ( var key in options ) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 491);
if( key === "other" ) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 492);
continue;	//Will use this only if everything else fails
            }

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 495);
if( key === params.value ) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 496);
return options[key];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 500);
return options.other;
    },

    /**
     * Format all instances in str that can be handled by SelectFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 509);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 510);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, options, result, start;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 513);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 514);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 516);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 518);
options = this.parseOptions(str, regex.lastIndex);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 519);
if(!options) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 520);
continue;
                }

                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 523);
regex.lastIndex = options.next;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 524);
options = options.options;

                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 526);
result = this.select(options, params);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 527);
if(result) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 528);
start = str.indexOf(matches[0]);
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 529);
str = str.slice(0, start) + result + str.slice(regex.lastIndex);
                }
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 534);
return str;
    }
}, true);/**
 * PluralRules is used to determine the plural form in MessageFormat
 * @class PluralRules
 * @namespace Intl
 * @static
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 542);
Y.Intl.PluralRules = {
    /**
     * Check if n is between start and end
     * @method _inRange
     * @static
     * @private
     * @param n {Number} Number to test
     * @param start {Number} Start of range
     * @param end {Number} End of range
     * @return {Boolean} true if n is between start and end, false otherwise
     */
    _inRange: function(n, start, end) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "_inRange", 553);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 554);
return n >= start && n <= end;
    },

    /**
     * Find matching plural form for the set of rules
     * @method _matchRule
     * @static
     * @private
     * @param rules {Object} Keys will be plural forms one,two,.. Values will be boolean
     * @return {String} Returns key that has value true
     */
    _matchRule: function(rules) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "_matchRule", 565);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 566);
for(var key in rules) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 567);
if(rules[key]) { return key; }
        }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 569);
return "other";
    },

    /**
     * Set of rules. Each locale will have a matching rule. The corresponding functions in each set
     * will take a number as parameter and return the relevant plural form.
     */
    rules: {
        set1: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set1", 577);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 578);
var mod = n % 100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 579);
return PluralRules._matchRule({
                few:  inRange(mod, 3, 10),
                many: inRange(mod, 11, 99),
                one:  n === 1,
                two:  n === 2,
                zero: n === 0
            });
        },

        set2: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set2", 588);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 589);
return PluralRules._matchRule({
               many: n !== 0 && n%10 === 0,
               one:  n === 1,
               two:  n === 2
            });
        },

        set3: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set3", 596);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 597);
return PluralRules._matchRule({
               one: n === 1
            });
        },

        set4: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set4", 602);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 603);
return PluralRules._matchRule({
                one: inRange(n, 0, 1)
            });
        },

        set5: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set5", 608);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 609);
return PluralRules._matchRule({
                one: inRange(n, 0, 2) && n !== 2
            });
        },

        set6: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set6", 614);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 615);
return PluralRules._matchRule({
                one:  n%10 === 1 && n%100 !== 11,
                zero: n === 0
            });
        },

        set7: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set7", 621);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 622);
return PluralRules._matchRule({
                one: n === 1,
                two: n === 2
            });
        },

        set8: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set8", 628);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 629);
return PluralRules._matchRule({
                few:  inRange(n, 3, 6),
                many: inRange(n, 7, 10),
                one:  n === 1,
                two:  n === 2
            });
        },

        set9: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set9", 637);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 638);
return PluralRules._matchRule({
                few: n === 0 || (n !== 1 && inRange(n%100, 1, 19)),
                one: n === 1
            });
        },

        set10: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set10", 644);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 645);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 646);
return PluralRules._matchRule({
                few: inRange(mod10, 2, 9) && !inRange(mod100, 11, 19),
                one: mod10 === 1 && !inRange(mod100, 11, 19)
            });
        },

        set11: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set11", 652);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 653);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 654);
return PluralRules._matchRule({
                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),
                many: mod10 === 0 || inRange(mod10, 5, 9) || inRange(mod100, 11, 14),
                one:  mod10 === 1 && mod100 !== 11
            });
        },

        set12: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set12", 661);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 662);
return PluralRules._matchRule({
                few: inRange(n, 2, 4),
                one: n === 1
            });
        },

        set13: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set13", 668);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 669);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 670);
return PluralRules._matchRule({
                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),
                many: n !== 1 && inRange(mod10, 0, 1) || inRange(mod10, 5, 9) || inRange(mod100, 12, 14),
                one:  n === 1
            });
        },

        set14: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set14", 677);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 678);
var mod = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 679);
return PluralRules._matchRule({
                few: inRange(mod, 3, 4),
                one: mod === 1,
                two: mod === 2
            });
        },

        set15: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set15", 686);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 687);
var mod = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 688);
return PluralRules._matchRule({
                few:  n === 0 || inRange(mod, 2, 10),
                many: inRange(mod, 11, 19),
                one:  n === 1
            });
        },

        set16: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set16", 695);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 696);
return PluralRules._matchRule({
                one: n%10 === 1 && n !== 11
            });
        },

        set17: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set17", 701);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 702);
return PluralRules._matchRule({
                few:  n === 3,
                many: n === 6,
                one:  n === 1,
                two:  n === 2,
                zero: n === 0
            });
        },

        set18: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set18", 711);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 712);
return PluralRules._matchRule({
                one:  inRange(n, 0, 2) && n !== 0 && n !== 2,
                zero: n === 0
            });
        },

        set19: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set19", 718);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 719);
return PluralRules._matchRule({
                few: inRange(n, 2, 10),
                one: inRange(n, 0, 1)
            });
        },

        set20: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set20", 725);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 726);
var mod1 = n%10, mod2 = n%100, mod6 = n%1000000;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 727);
return PluralRules._matchRule({
                few:  (inRange(mod1, 3, 4) || mod1 === 9) && !inRange(mod2, 10, 19) && !inRange(mod2, 70, 79) && !inRange(mod2, 90, 99),
                many: n !== 0 && mod6 === 0,
                one:  mod1 === 1 && mod2 !== 11 && mod2 !== 71 && mod2 !== 91,
                two:  mod1 === 2 && mod2 !== 12 && mod2 !== 72 && mod2 !== 92
            });
        },

        set21: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set21", 735);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 736);
return PluralRules._matchRule({
                one:  n === 1,
                zero: n === 0
            });
        },

        set22: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set22", 742);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 743);
return PluralRules._matchRule({
                one: inRange(n, 0, 1) || inRange(n, 11, 99)
            });
        },

        set23: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set23", 748);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 749);
return PluralRules._matchRule({
                one: inRange(n%10, 1, 2) || n%20 === 0
            });
        },

        set24: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set24", 754);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 755);
return PluralRules._matchRule({
                few: inRange(n, 3, 10) || inRange(n, 13, 19),
                one: n === 1 || n === 11,
                two: n === 2 || n === 12
            });
        },

        set25: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set25", 762);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 763);
return PluralRules._matchRule({
                one: n === 1 || n === 5
            });
        },

        set26: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set26", 768);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 769);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 770);
return PluralRules._matchRule({
                one: (mod10 === 1 || mod10 === 2) && (mod100 !== 11 && mod100 !== 12)
            });
        },

        set27: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set27", 775);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 776);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 777);
return PluralRules._matchRule({
                few: mod10 === 3 && mod100 !== 13,
                one: mod10 === 1 && mod100 !== 11,
                two: mod10 === 2 && mod100 !== 12
            });
        },

        set28: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set28", 784);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 785);
return PluralRules._matchRule({
                many: n === 11 || n === 8 || n === 80 || n === 800
            });
        },

        set29: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set29", 790);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 791);
return PluralRules._matchRule({
                few: n === 4,
                one: n === 1 || n === 3,
                two: n === 2
            });
        },

        set30: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set30", 798);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 799);
return PluralRules._matchRule({
                few: n === 4,
                one: n === 1,
                two: n === 2 || n === 3
            });
        },

        set31: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set31", 806);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 807);
return PluralRules._matchRule({
                few:  n === 4,
                many: n === 6,
                one:  n === 1,
                two:  n === 2 || n === 3
            });
        },

        set32: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set32", 815);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 816);
return PluralRules._matchRule({
                few:  n === 4,
                many: n === 6,
                one:  Y.Array.indexOf([1,5,7,8,9,10], n) > -1,
                two: n === 2 || n === 3
            });
        },

        set33: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set33", 824);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 825);
return PluralRules._matchRule({
                few:  inRange(n, 2, 9),
                many: inRange(n, 10, 19) || inRange(n, 100, 199) || inRange(n, 1000, 1999),
                one:  n === 1
            });
        }
    }
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 834);
PluralRules = Y.Intl.PluralRules;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 835);
inRange = PluralRules._inRange;
/**
 * Plural formatter. Select ouput based on whether value of key is singular/plural
 * @class PluralFormatter
 * @extends SelectFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 845);
Y.Intl.PluralFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "PluralFormatter", 845);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 846);
PluralFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 847);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*plural\\s*,\\s*";
    
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 849);
var formats = Y.Intl.get(MODULE_NAME),
        ruleSet = formats.pluralRule;

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 852);
if(ruleSet) {
         _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 853);
this.rule = PluralRules.rules[ruleSet];
    }

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 856);
if(this.rule === undefined) {
         _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 857);
this.rule = function() { _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "rule", 857);
return "other"; };
    }
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 861);
PluralFormatter = Y.Intl.PluralFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 862);
Y.extend(PluralFormatter, SelectFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 870);
PluralFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 870);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 871);
return new PluralFormatter(values);
};

/**
 * Select output depending on params.value from options
 * @method select
 * @param options {Object} Object containing results for singular/plural
 * @param params {Object} Object containing value
 * @return {String} selected result
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 881);
PluralFormatter.prototype.select = function(options, params) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "select", 881);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 882);
var pluralForm = this.rule(params.value),
        result = options[pluralForm];

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 885);
if(result === undefined || result === null) {
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 886);
result = options.other;
    }

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 889);
result = result.replace("#", new NumberFormatter({VAL: params.value}).format("{VAL, number, integer}"));	//Use 'number' to format this part

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 891);
return result;
};
/**
 * Choice formatter. Select ouput based on numerical values
 * @class ChoiceFormatter
 * @extends SelectFormatter
 * @namespace Intl
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 902);
Y.Intl.ChoiceFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "ChoiceFormatter", 902);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 903);
ChoiceFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 904);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*choice\\s*,\\s*(.+)}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 907);
ChoiceFormatter = Y.Intl.ChoiceFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 908);
Y.extend(ChoiceFormatter, SelectFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 916);
ChoiceFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 916);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 917);
return new ChoiceFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 920);
Y.mix(ChoiceFormatter.prototype, {
    /**
     * Parse choices in pattern and get options array.
     * @method parseOptions
     * @param choicesStr {String} Choice string from pattern
     * @return {Array} Array of objects containing value(choice), result, and relation
     */
    parseOptions: function(choicesStr) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "parseOptions", 927);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 928);
var options = [],
            choicesArray = choicesStr.split("|"),
            i, j, choice, relations, rel, mapping, ch;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 931);
for (i=0; i<choicesArray.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 932);
choice = choicesArray[i];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 933);
relations = ['#', '<', '\u2264'];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 934);
for (j=0; j<relations.length; j++) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 935);
rel = relations[j];
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 936);
if(choice.indexOf(rel) !== -1) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 937);
mapping = choice.split(rel);
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 938);
ch = {
                        value: parseInt(mapping[0], 10),
                        result: mapping[1],
                        relation: rel
                    };
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 943);
options.push(ch);
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 944);
break;
                }
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 949);
return options;
    },

    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, choices in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 959);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 960);
if(SelectFormatter.prototype.getParams.call(this, params, matches)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 961);
if(matches[2]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 962);
params.choices = this.parseOptions(matches[2]);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 963);
return params.choices === [] ? false: true;
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 967);
return false;
    },

    /**
     * Select output depending on params.value from options in params.choices
     * @method select
     * @param params {Object} Object containing value and choices
     * @return {String} selected result
     */
    select: function(params) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "select", 976);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 977);
var choice, value, result, relation, i;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 978);
for (i=0; i<params.choices.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 979);
choice = params.choices[i];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 980);
value = choice.value, result = choice.result, relation = choice.relation;

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 982);
if( (relation === '#' && value === params.value) || (relation === '<' && value < params.value)
                || (relation === '\u2264' && value <= params.value)) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 984);
return result;
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 988);
return "";
    },

    /**
     * Format all instances in str that can be handled by ChoiceFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 997);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 998);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, result;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1001);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1002);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1004);
if(this.getParams(params, matches)) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1005);
result = this.select(params);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1006);
if(result) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1007);
str = str.replace(matches[0], result);
                }
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1012);
return str;
    }
}, true);/**
 * List formatter
 * @class MsgListFormatter
 * @namespace Intl
 * @extends StringFormatter
 * @private
 * @constructor
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1023);
Y.Intl.MsgListFormatter = function(values) {
      _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "MsgListFormatter", 1023);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1024);
MsgListFormatter.superclass.constructor.call(this, values);
      _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1025);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*list\\s*}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1028);
MsgListFormatter = Y.Intl.MsgListFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1029);
Y.extend(MsgListFormatter, StringFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1037);
MsgListFormatter.createInstance = function(values) {
     _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 1037);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1038);
return new MsgListFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1041);
Y.mix(MsgListFormatter.prototype, {
     /**
      * Format all instances in str that can be handled by MsgListFormatter
      * @method format
      * @param str {String} Input string/pattern
      * @return {String} Formatted result
      */
     format: function(str) {
          _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 1048);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1049);
if(Y.Intl === undefined || Y.Intl.ListFormatter === undefined || Y.Intl.ListFormatter.format === undefined) { return str; }
          _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1050);
var regex = new RegExp(this.regex, "gm"),
              matches = null,
              params;

          _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1054);
while((matches = regex.exec(str))) {
              _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1055);
params = {};

              _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1057);
if(this.getParams(params, matches)) {
                  //Got a match
                  _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1059);
str = str.replace(
                             matches[0],
                             Y.Intl.ListFormatter.format( params.value )
                  );
              }
          }

          _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1066);
return str;
     }
}, true);

/**
 * MessageFormat enables the construction of localizable messages that combine static strings with information that only becomes available at runtime.
 * @module intl-format
 * @requires datatype-date-advanced-format, datatype-number-advanced-format, intl
 */

/**
 * Formatter classes. For each group found in the pattern, will try to parse with all of these formatters.
 * If a formatter fails to parse, the next one in the list try to do so.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1080);
formatters = [ StringFormatter, DateFormatter, TimeFormatter, NumberFormatter, ChoiceFormatter, PluralFormatter, SelectFormatter, MsgListFormatter ];

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1082);
Y.mix(Y.Intl, {

    /**
     * Format message that may contain date/time, numbers, etc. Choice, Select and Plural formatters are also available.
     * @method formatMessage
     * @static
     * @param pattern {String} string contains static text with embedded format elements that specify
              how to process and insert strings, numbers, and dates, as well as perform conditional processing.
     * @param values {Object|Array} The data to be processed and inserted.
     * @param [config] {Object} Optional configuration parameters
     * @return {String} Formatted result
     * @example
            //String formatting. Key is replaced by value
            Y.Intl.formatMessage("{EMPLOYEE} reports to {MANAGER}", {
                "EMPLOYEE": "Ashik",
                "MANAGER": "Dharmesh"
            });

            //3-parameter form: {KEY, type, style}. Style is optional. Type can be date/time/number. Style can be short/medium/long/full
            //For 'time', timezone can be specified as configuration param. If not specified, will default to system timezone
            Y.Intl.formatMessage("Today is {DATE, date, short}", { DATE: new Date() });
            Y.Intl.formatMessage("The time is {DATE, time, medium}", {DATE: new Date()}, {timezone: "Asia/Kolkata"});
            Y.Intl.formatMessage("There are {POPULATION_INDIA, number} million people in India.", {POPULATION_INDIA: 1241.492});

            //Select formatting. Selects output depending on value
            Y.Intl.formatMessage("{NAME} est {GENDER, select, female {allée} other {allé}} à {CITY}.", {
                "NAME": "Henri",
                "GENDER": "male",
                "CITY": "Paris"
            });

            //Plural formatting. Selects output depending on whether numerical value is singular/plural
            Y.Intl.formatMessage("{COMPANY_COUNT, plural, one {One company} other {# companies}} published new books.", {
                "COMPANY_COUNT": 1
            });

            //Choice formatting. Selects output depending on numerical value
            Y.Intl.formatMessage("There {FILE_COUNT, choice, 0#are no files|1#is one file|1<are {FILE_COUNT, number, integer} files} on disk.", {
                "FILE_COUNT": 1
            });
     */
    formatMessage: function(pattern, values, config) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "formatMessage", 1123);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1124);
config = config || {};
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1125);
var i, formatter;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1126);
for(i=0; i<formatters.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1127);
formatter = formatters[i].createInstance(values);
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1128);
pattern = formatter.format(pattern, config);
        }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1130);
return pattern;
    }
});


}, '@VERSION@', {
    "lang": [
        "am",
        "ar",
        "be",
        "cs",
        "cy",
        "fil",
        "fr",
        "ga",
        "gv",
        "he",
        "hi",
        "hr",
        "",
        "kw",
        "lt",
        "lv",
        "mk",
        "mt",
        "pl",
        "ro",
        "ru",
        "sh",
        "sk",
        "sl",
        "sr",
        "ti",
        "tl",
        "uk"
    ],
    "requires": [
        "intl"
    ]
});
