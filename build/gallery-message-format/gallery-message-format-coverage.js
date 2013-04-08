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
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].code=["YUI.add('gallery-message-format', function (Y, NAME) {","","var MODULE_NAME = \"gallery-message-format\",","    PluralRules, inRange,","    Formatter, StringFormatter, DateFormatter, TimeFormatter, NumberFormatter,SelectFormatter,","    PluralFormatter, ChoiceFormatter, MsgListFormatter, formatters;","","/**"," * Formatter base class"," * @class MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.MsgBaseFormatter = function(values) {","    this.values = values;","};","","Formatter = Y.Intl.MsgBaseFormatter;","","Y.mix(Formatter.prototype, {","    /**","     * Get value of key","     * @method getValue","     * @param key {String|Number} Key/index of value in the object/array 'values'","     * @return Value from the data in 'values'","     */","    getValue: function(key) {","        if(Y.Lang.isArray(this.values)) {","            key = parseInt(key, 10);","        }","        return this.values[key];","    },","","    /**","     * Get value of params.key","     * The value found will be set to params.value","     * @method getParams","     * @param params {Object} Object containing key as in { key: \"KEY\" }","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params) {","        if(!params || !params.key) {","            return false;","        }","","        var value = this.getValue(params.key);","	","        if(value !== undefined) {","            params.value = value;","            return true;","        }","","        return false;","    },","","    /**","     * Format string. Will be overridden in descendants","     * @method format","     */","    format: function(/*str, config*/) {","        Y.error('Not implemented');	//Must override in descendants","    }","});","","//For date and time formatters","Y.mix(Formatter, {","    /**","     * Create an instance of the formatter","     * @method createInstance","     * @static","     * //param values {Array|Object} The data to be processed and inserted.","     */","    createInstance: function(/*values*/) {","        //return new Formatter(values);","        Y.error('Not implemented');	//Must override in descendants","    },","","    /**","     * Get current timezone. Used for time format","     * @method getCurrentTimeZone","     * @return {Y.Date.Timezone}","     */","    getCurrentTimeZone: function() {","        var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;","        return Y.Date.Timezone.getTimezoneIdForOffset(systemTZoneOffset);","    }","});","/**"," * String formatter"," * @class StringFormatter"," * @namespace Intl"," * @extends MsgBaseFormatter"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.StringFormatter = function(values) {","    StringFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*}\";","};","","StringFormatter = Y.Intl.StringFormatter;","Y.extend(StringFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","StringFormatter.createInstance = function(values) {","    return new StringFormatter(values);","};","","Y.mix(StringFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store key and value in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches && matches[1]) {","            params.key = matches[1];","            if(Formatter.prototype.getParams.call(this, params)) {","                return true;","            }","        }","	","        return false;","    },","","    /**","     * Format all instances in str that can be handled by StringFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                str = str.replace(matches[0], params.value);","            }","","        }","","        return str;","    }","}, true);/**"," * Date formatter"," * @class DateFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.DateFormatter = function(values) {","    DateFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"short\":  [ Y.Date.DATE_FORMATS.YMD_SHORT, 0, 0 ],","        \"medium\": [ Y.Date.DATE_FORMATS.YMD_ABBREVIATED,0, 0 ],","        \"long\":   [ Y.Date.DATE_FORMATS.YMD_LONG, 0, 0 ],","        \"full\":   [ Y.Date.DATE_FORMATS.WYMD_LONG, 0, 0 ]","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*date\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","DateFormatter = Y.Intl.DateFormatter;","Y.extend(DateFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","DateFormatter.createInstance = function(values) {","    return new DateFormatter(values);","};","","Y.mix(DateFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","            if(matches[3]) {","                params.style = matches[3];","            }","        }","","        if(!params.style) {","            params.style = \"medium\";","        }			//If no style, default to medium","","        if(!this.styles[params.style]) {","            return false;","        }	//Invalid style","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Format all instances in str that can be handled by DateFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @param [config] {Object} Optional configuration parameters. Used to pass timezone for time formatting","     * @return {String} Formatted result","     */","    format: function(str, config) {","        if(Y.Date === undefined || Y.Date.format === undefined) { return str; }","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, style, result;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                style = this.styles[params.style];","                result = Y.Date.format(new Date(params.value), {","                    timezone: config.timezone || Formatter.getCurrentTimeZone(),","                    dateFormat: style[0],","                    timeFormat: style[1],","                    timezoneFormat: style[2]","                });","                str = str.replace(matches[0], result);","            }","","        }","","        return str;","    }","}, true);","/**"," * Time formatter"," * @class TimeFormatter"," * @extends DateFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.TimeFormatter = function(values) {","    TimeFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"short\": [ 0, Y.Date.TIME_FORMATS.HM_SHORT, Y.Date.TIMEZONE_FORMATS.NONE ],","        \"medium\": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.NONE ],","        \"long\": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_SHORT ],","        \"full\": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED ]","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*time\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","TimeFormatter = Y.Intl.TimeFormatter;","Y.extend(TimeFormatter, DateFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","TimeFormatter.createInstance = function(values) {","    return new TimeFormatter(values);","};","/**"," * Number formatter"," * @class NumberFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.NumberFormatter = function(values) {","    NumberFormatter.superclass.constructor.call(this, values);","    this.styles = {","        \"integer\": Y.Number.STYLES.NUMBER_STYLE,","        \"percent\": Y.Number.STYLES.PERCENT_STYLE,","        \"currency\": Y.Number.STYLES.CURRENCY_STYLE","    };","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*number\\\\s*(,\\\\s*(\\\\w+)\\\\s*)?}\";","};","","NumberFormatter = Y.Intl.NumberFormatter;","Y.extend(NumberFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","NumberFormatter.createInstance = function(values) {","    return new NumberFormatter(values);","};","","Y.mix(NumberFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","            if(matches[3]) {","                params.style = matches[3];","            }","        }","","        if(!params.style) {","            params.style = \"integer\";	//If no style, default to medium","            params.showDecimal = true;	//Show decimal parts too","        }","","        if(!this.styles[params.style]) {	//Invalid style","            return false;","        }","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Format all instances in str that can be handled by NumberFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        if(Y.Number === undefined || Y.Number.format === undefined) { return str; }","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, config;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                config = {","                    style: this.styles[params.style]","                };","                if(params.style === \"integer\" && !params.showDecimal) {","                    config.parseIntegerOnly = true;","                }","                str = str.replace(matches[0], Y.Number.format(params.value, config));","            }","        }","","        return str;","    }","}, true);","/**"," * Select formatter. Select ouput based on value of key"," * @class SelectFormatter"," * @extends MsgBaseFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.SelectFormatter = function(values) {","    SelectFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*select\\\\s*,\\\\s*\";","};","","SelectFormatter = Y.Intl.SelectFormatter;","Y.extend(SelectFormatter, Formatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","SelectFormatter.createInstance = function(values) {","    return new SelectFormatter(values);","};","","Y.mix(SelectFormatter.prototype, {","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store key and value in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(matches) {","            if(matches[1]) {","                params.key = matches[1];","            }","        }","","        if(params.key && Formatter.prototype.getParams.call(this, params)) {","            return true;","        }","","        return false;","    },","","    /**","     * Parse choices in pattern and get options array.","     * @method parseOptions","     * @param str {String} Pattern string","     * @param start {Number} Position in str to start parsing from","     * @return {Object} Object in the form:","             {","               options: [","                     { key: KEY1, value: VALUE1 },","                     { key: KEY2, value: VALUE2 },","                     ... ],","               next: i  //Index of next character in str that can be parsed","             }","     */","    parseOptions: function(str, start) {","        var options = {},","            key = \"\", value = \"\", current = \"\",","            i, ch;","        for(i=start; i<str.length; i++) {","            ch = str.charAt(i);","            if (ch === '\\\\') {","                current += ch + str.charAt(i+1);","                i++;","            } else if (ch === '}') {","                if(current === \"\") {","                    i++;","                    break;","                }","                value = current;","                options[key.trim()] = value;","                current = key = value = \"\";","            } else if (ch === '{') {","                key = current;","                current = \"\";","            } else {","                current += ch;","            }","        }","","        if(current !== \"\") {","            return null;","        }","","        return {","            options: options,","            next: i","        };","    },","","    /**","     * Select output depending on params.value from options","     * @method select","     * @param options {Array} Array of key,value pairs","     * @param params {Object} Object containing value","     * @return {String} selected result","     */","    select: function(options, params) {","        for ( var key in options ) {","            if( key === \"other\" ) {","                continue;	//Will use this only if everything else fails","            }","","            if( key === params.value ) {","                return options[key];","            }","        }","","        return options.other;","    },","","    /**","     * Format all instances in str that can be handled by SelectFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, options, result, start;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                //Got a match","                options = this.parseOptions(str, regex.lastIndex);","                if(!options) {","                    continue;","                }","","                regex.lastIndex = options.next;","                options = options.options;","","                result = this.select(options, params);","                if(result) {","                    start = str.indexOf(matches[0]);","                    str = str.slice(0, start) + result + str.slice(regex.lastIndex);","                }","            }","        }","","        return str;","    }","}, true);/**"," * PluralRules is used to determine the plural form in MessageFormat"," * @class PluralRules"," * @namespace Intl"," * @static"," */","Y.Intl.PluralRules = {","    /**","     * Check if n is between start and end","     * @method _inRange","     * @static","     * @private","     * @param n {Number} Number to test","     * @param start {Number} Start of range","     * @param end {Number} End of range","     * @return {Boolean} true if n is between start and end, false otherwise","     */","    _inRange: function(n, start, end) {","        return n >= start && n <= end;","    },","","    /**","     * Find matching plural form for the set of rules","     * @method _matchRule","     * @static","     * @private","     * @param rules {Object} Keys will be plural forms one,two,.. Values will be boolean","     * @return {String} Returns key that has value true","     */","    _matchRule: function(rules) {","        for(var key in rules) {","            if(rules[key]) { return key; }","        }","        return \"other\";","    },","","    /**","     * Set of rules. Each locale will have a matching rule. The corresponding functions in each set","     * will take a number as parameter and return the relevant plural form.","     */","    rules: {","        set1: function(n) {","            var mod = n % 100;","            return PluralRules._matchRule({","                few:  inRange(mod, 3, 10),","                many: inRange(mod, 11, 99),","                one:  n === 1,","                two:  n === 2,","                zero: n === 0","            });","        },","","        set2: function(n) {","            return PluralRules._matchRule({","               many: n !== 0 && n%10 === 0,","               one:  n === 1,","               two:  n === 2","            });","        },","","        set3: function(n) {","            return PluralRules._matchRule({","               one: n === 1","            });","        },","","        set4: function(n) {","            return PluralRules._matchRule({","                one: inRange(n, 0, 1)","            });","        },","","        set5: function(n) {","            return PluralRules._matchRule({","                one: inRange(n, 0, 2) && n !== 2","            });","        },","","        set6: function(n) {","            return PluralRules._matchRule({","                one:  n%10 === 1 && n%100 !== 11,","                zero: n === 0","            });","        },","","        set7: function(n) {","            return PluralRules._matchRule({","                one: n === 1,","                two: n === 2","            });","        },","","        set8: function(n) {","            return PluralRules._matchRule({","                few:  inRange(n, 3, 6),","                many: inRange(n, 7, 10),","                one:  n === 1,","                two:  n === 2","            });","        },","","        set9: function(n) {","            return PluralRules._matchRule({","                few: n === 0 || (n !== 1 && inRange(n%100, 1, 19)),","                one: n === 1","            });","        },","","        set10: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few: inRange(mod10, 2, 9) && !inRange(mod100, 11, 19),","                one: mod10 === 1 && !inRange(mod100, 11, 19)","            });","        },","","        set11: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),","                many: mod10 === 0 || inRange(mod10, 5, 9) || inRange(mod100, 11, 14),","                one:  mod10 === 1 && mod100 !== 11","            });","        },","","        set12: function(n) {","            return PluralRules._matchRule({","                few: inRange(n, 2, 4),","                one: n === 1","            });","        },","","        set13: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),","                many: n !== 1 && inRange(mod10, 0, 1) || inRange(mod10, 5, 9) || inRange(mod100, 12, 14),","                one:  n === 1","            });","        },","","        set14: function(n) {","            var mod = n%100;","            return PluralRules._matchRule({","                few: inRange(mod, 3, 4),","                one: mod === 1,","                two: mod === 2","            });","        },","","        set15: function(n) {","            var mod = n%100;","            return PluralRules._matchRule({","                few:  n === 0 || inRange(mod, 2, 10),","                many: inRange(mod, 11, 19),","                one:  n === 1","            });","        },","","        set16: function(n) {","            return PluralRules._matchRule({","                one: n%10 === 1 && n !== 11","            });","        },","","        set17: function(n) {","            return PluralRules._matchRule({","                few:  n === 3,","                many: n === 6,","                one:  n === 1,","                two:  n === 2,","                zero: n === 0","            });","        },","","        set18: function(n) {","            return PluralRules._matchRule({","                one:  inRange(n, 0, 2) && n !== 0 && n !== 2,","                zero: n === 0","            });","        },","","        set19: function(n) {","            return PluralRules._matchRule({","                few: inRange(n, 2, 10),","                one: inRange(n, 0, 1)","            });","        },","","        set20: function(n) {","            var mod1 = n%10, mod2 = n%100, mod6 = n%1000000;","            return PluralRules._matchRule({","                few:  (inRange(mod1, 3, 4) || mod1 === 9) && !inRange(mod2, 10, 19) && !inRange(mod2, 70, 79) && !inRange(mod2, 90, 99),","                many: n !== 0 && mod6 === 0,","                one:  mod1 === 1 && mod2 !== 11 && mod2 !== 71 && mod2 !== 91,","                two:  mod1 === 2 && mod2 !== 12 && mod2 !== 72 && mod2 !== 92","            });","        },","","        set21: function(n) {","            return PluralRules._matchRule({","                one:  n === 1,","                zero: n === 0","            });","        },","","        set22: function(n) {","            return PluralRules._matchRule({","                one: inRange(n, 0, 1) || inRange(n, 11, 99)","            });","        },","","        set23: function(n) {","            return PluralRules._matchRule({","                one: inRange(n%10, 1, 2) || n%20 === 0","            });","        },","","        set24: function(n) {","            return PluralRules._matchRule({","                few: inRange(n, 3, 10) || inRange(n, 13, 19),","                one: n === 1 || n === 11,","                two: n === 2 || n === 12","            });","        },","","        set25: function(n) {","            return PluralRules._matchRule({","                one: n === 1 || n === 5","            });","        },","","        set26: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                one: (mod10 === 1 || mod10 === 2) && (mod100 !== 11 && mod100 !== 12)","            });","        },","","        set27: function(n) {","            var mod10 = n%10, mod100 = n%100;","            return PluralRules._matchRule({","                few: mod10 === 3 && mod100 !== 13,","                one: mod10 === 1 && mod100 !== 11,","                two: mod10 === 2 && mod100 !== 12","            });","        },","","        set28: function(n) {","            return PluralRules._matchRule({","                many: n === 11 || n === 8 || n === 80 || n === 800","            });","        },","","        set29: function(n) {","            return PluralRules._matchRule({","                few: n === 4,","                one: n === 1 || n === 3,","                two: n === 2","            });","        },","","        set30: function(n) {","            return PluralRules._matchRule({","                few: n === 4,","                one: n === 1,","                two: n === 2 || n === 3","            });","        },","","        set31: function(n) {","            return PluralRules._matchRule({","                few:  n === 4,","                many: n === 6,","                one:  n === 1,","                two:  n === 2 || n === 3","            });","        },","","        set32: function(n) {","            return PluralRules._matchRule({","                few:  n === 4,","                many: n === 6,","                one:  Y.Array.indexOf([1,5,7,8,9,10], n) > -1,","                two: n === 2 || n === 3","            });","        },","","        set33: function(n) {","            return PluralRules._matchRule({","                few:  inRange(n, 2, 9),","                many: inRange(n, 10, 19) || inRange(n, 100, 199) || inRange(n, 1000, 1999),","                one:  n === 1","            });","        }","    }","};","","PluralRules = Y.Intl.PluralRules;","inRange = PluralRules._inRange;","/**"," * Plural formatter. Select ouput based on whether value of key is singular/plural"," * @class PluralFormatter"," * @extends SelectFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.PluralFormatter = function(values) {","    PluralFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*plural\\\\s*,\\\\s*\";","    ","    var formats = Y.Intl.get(MODULE_NAME),","        ruleSet = formats.pluralRule;","","    if(ruleSet) {","         this.rule = PluralRules.rules[ruleSet];","    }","","    if(this.rule === undefined) {","         this.rule = function() { return \"other\"; };","    }","};","","PluralFormatter = Y.Intl.PluralFormatter;","Y.extend(PluralFormatter, SelectFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","PluralFormatter.createInstance = function(values) {","    return new PluralFormatter(values);","};","","/**"," * Select output depending on params.value from options"," * @method select"," * @param options {Object} Object containing results for singular/plural"," * @param params {Object} Object containing value"," * @return {String} selected result"," */","PluralFormatter.prototype.select = function(options, params) {","    var pluralForm = this.rule(params.value),","        result = options[pluralForm];","","    if(result === undefined || result === null) {","        result = options.other;","    }","","    result = result.replace(\"#\", new NumberFormatter({VAL: params.value}).format(\"{VAL, number, integer}\"));	//Use 'number' to format this part","","    return result;","};","/**"," * Choice formatter. Select ouput based on numerical values"," * @class ChoiceFormatter"," * @extends SelectFormatter"," * @namespace Intl"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.ChoiceFormatter = function(values) {","    ChoiceFormatter.superclass.constructor.call(this, values);","    this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*choice\\\\s*,\\\\s*(.+)}\";","};","","ChoiceFormatter = Y.Intl.ChoiceFormatter;","Y.extend(ChoiceFormatter, SelectFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","ChoiceFormatter.createInstance = function(values) {","    return new ChoiceFormatter(values);","};","","Y.mix(ChoiceFormatter.prototype, {","    /**","     * Parse choices in pattern and get options array.","     * @method parseOptions","     * @param choicesStr {String} Choice string from pattern","     * @return {Array} Array of objects containing value(choice), result, and relation","     */","    parseOptions: function(choicesStr) {","        var options = [],","            choicesArray = choicesStr.split(\"|\"),","            i, j, choice, relations, rel, mapping, ch;","        for (i=0; i<choicesArray.length; i++) {","            choice = choicesArray[i];","            relations = ['#', '<', '\\u2264'];","            for (j=0; j<relations.length; j++) {","                rel = relations[j];","                if(choice.indexOf(rel) !== -1) {","                    mapping = choice.split(rel);","                    ch = {","                        value: parseInt(mapping[0], 10),","                        result: mapping[1],","                        relation: rel","                    };","                    options.push(ch);","                    break;","                }","            }","        }","","        return options;","    },","","    /**","     * Get parameters from regex match","     * @method getParams","     * @param params {Object} Object to receive value. Function will store the values key, value, choices in this variable","     * @param matches {Array} Result of regex match over pattern string.","     * @return {Boolean} True if value found, False otherwise","     */","    getParams: function(params, matches) {","        if(SelectFormatter.prototype.getParams.call(this, params, matches)) {","            if(matches[2]) {","                params.choices = this.parseOptions(matches[2]);","                return params.choices === [] ? false: true;","            }","        }","","        return false;","    },","","    /**","     * Select output depending on params.value from options in params.choices","     * @method select","     * @param params {Object} Object containing value and choices","     * @return {String} selected result","     */","    select: function(params) {","        var choice, value, result, relation, i;","        for (i=0; i<params.choices.length; i++) {","            choice = params.choices[i];","            value = choice.value, result = choice.result, relation = choice.relation;","","            if( (relation === '#' && value === params.value) || (relation === '<' && value < params.value)","                || (relation === '\\u2264' && value <= params.value)) {","                return result;","            }","        }","","        return \"\";","    },","","    /**","     * Format all instances in str that can be handled by ChoiceFormatter","     * @method format","     * @param str {String} Input string/pattern","     * @return {String} Formatted result","     */","    format: function(str) {","        var regex = new RegExp(this.regex, \"gm\"),","            matches = null,","            params, result;","        while((matches = regex.exec(str))) {","            params = {};","","            if(this.getParams(params, matches)) {","                result = this.select(params);","                if(result) {","                    str = str.replace(matches[0], result);","                }","            }","        }","","        return str;","    }","}, true);/**"," * List formatter"," * @class MsgListFormatter"," * @namespace Intl"," * @extends StringFormatter"," * @private"," * @constructor"," * @param values {Array|Object} The data to be processed and inserted."," */","Y.Intl.MsgListFormatter = function(values) {","      MsgListFormatter.superclass.constructor.call(this, values);","      this.regex = \"{\\\\s*([a-zA-Z0-9_]+)\\\\s*,\\\\s*list\\\\s*}\";","};","","MsgListFormatter = Y.Intl.MsgListFormatter;","Y.extend(MsgListFormatter, StringFormatter);","","/**"," * Create an instance of the formatter"," * @method createInstance"," * @static"," * @param values {Array|Object} The data to be processed and inserted."," */","MsgListFormatter.createInstance = function(values) {","     return new MsgListFormatter(values);","};","","Y.mix(MsgListFormatter.prototype, {","     /**","      * Format all instances in str that can be handled by MsgListFormatter","      * @method format","      * @param str {String} Input string/pattern","      * @return {String} Formatted result","      */","     format: function(str) {","          if(Y.Intl === undefined || Y.Intl.ListFormatter === undefined || Y.Intl.ListFormatter.format === undefined) { return str; }","          var regex = new RegExp(this.regex, \"gm\"),","              matches = null,","              params;","","          while((matches = regex.exec(str))) {","              params = {};","","              if(this.getParams(params, matches)) {","                  //Got a match","                  str = str.replace(","                             matches[0],","                             Y.Intl.ListFormatter.format( params.value )","                  );","              }","          }","","          return str;","     }","}, true);","","/**"," * MessageFormat enables the construction of localizable messages that combine static strings with information that only becomes available at runtime."," * @module intl-format"," * @requires datatype-date-advanced-format, datatype-number-advanced-format, intl"," */","","/**"," * Formatter classes. For each group found in the pattern, will try to parse with all of these formatters."," * If a formatter fails to parse, the next one in the list try to do so."," */","formatters = [ StringFormatter, DateFormatter, TimeFormatter, NumberFormatter, ChoiceFormatter, PluralFormatter, SelectFormatter, MsgListFormatter ];","","Y.mix(Y.Intl, {","","    /**","     * Format message that may contain date/time, numbers, etc. Choice, Select and Plural formatters are also available.","     * @method formatMessage","     * @static","     * @param pattern {String} string contains static text with embedded format elements that specify","              how to process and insert strings, numbers, and dates, as well as perform conditional processing.","     * @param values {Object|Array} The data to be processed and inserted.","     * @param [config] {Object} Optional configuration parameters","     * @return {String} Formatted result","     * @example","            //String formatting. Key is replaced by value","            Y.Intl.formatMessage(\"{EMPLOYEE} reports to {MANAGER}\", {","                \"EMPLOYEE\": \"Ashik\",","                \"MANAGER\": \"Dharmesh\"","            });","","            //3-parameter form: {KEY, type, style}. Style is optional. Type can be date/time/number. Style can be short/medium/long/full","            //For 'time', timezone can be specified as configuration param. If not specified, will default to system timezone","            Y.Intl.formatMessage(\"Today is {DATE, date, short}\", { DATE: new Date() });","            Y.Intl.formatMessage(\"The time is {DATE, time, medium}\", {DATE: new Date()}, {timezone: \"Asia/Kolkata\"});","            Y.Intl.formatMessage(\"There are {POPULATION_INDIA, number} million people in India.\", {POPULATION_INDIA: 1241.492});","","            //Select formatting. Selects output depending on value","            Y.Intl.formatMessage(\"{NAME} est {GENDER, select, female {allée} other {allé}} à {CITY}.\", {","                \"NAME\": \"Henri\",","                \"GENDER\": \"male\",","                \"CITY\": \"Paris\"","            });","","            //Plural formatting. Selects output depending on whether numerical value is singular/plural","            Y.Intl.formatMessage(\"{COMPANY_COUNT, plural, one {One company} other {# companies}} published new books.\", {","                \"COMPANY_COUNT\": 1","            });","","            //Choice formatting. Selects output depending on numerical value","            Y.Intl.formatMessage(\"There {FILE_COUNT, choice, 0#are no files|1#is one file|1<are {FILE_COUNT, number, integer} files} on disk.\", {","                \"FILE_COUNT\": 1","            });","     */","    formatMessage: function(pattern, values, config) {","        config = config || {};","        var i, formatter;","        for(i=0; i<formatters.length; i++) {","            formatter = formatters[i].createInstance(values);","            pattern = formatter.format(pattern, config);","        }","        return pattern;","    }","});","","","}, '@VERSION@', {","    \"lang\": [","        \"am\",","        \"ar\",","        \"be\",","        \"cs\",","        \"cy\",","        \"fil\",","        \"fr\",","        \"ga\",","        \"gv\",","        \"he\",","        \"hi\",","        \"hr\",","        \"\",","        \"kw\",","        \"lt\",","        \"lv\",","        \"mk\",","        \"mt\",","        \"pl\",","        \"ro\",","        \"ru\",","        \"sh\",","        \"sk\",","        \"sl\",","        \"sr\",","        \"ti\",","        \"tl\",","        \"uk\"","    ],","    \"requires\": [","        \"intl\"","    ]","});"];
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].lines = {"1":0,"3":0,"16":0,"17":0,"20":0,"22":0,"30":0,"31":0,"33":0,"44":0,"45":0,"48":0,"50":0,"51":0,"52":0,"55":0,"63":0,"68":0,"77":0,"86":0,"87":0,"99":0,"100":0,"101":0,"104":0,"105":0,"113":0,"114":0,"117":0,"126":0,"127":0,"128":0,"129":0,"133":0,"143":0,"146":0,"147":0,"149":0,"151":0,"156":0,"167":0,"168":0,"169":0,"175":0,"178":0,"179":0,"187":0,"188":0,"191":0,"200":0,"201":0,"202":0,"204":0,"205":0,"209":0,"210":0,"213":0,"214":0,"217":0,"218":0,"221":0,"232":0,"233":0,"236":0,"237":0,"239":0,"241":0,"242":0,"248":0,"253":0,"265":0,"266":0,"267":0,"273":0,"276":0,"277":0,"285":0,"286":0,"297":0,"298":0,"299":0,"304":0,"307":0,"308":0,"316":0,"317":0,"320":0,"329":0,"330":0,"331":0,"333":0,"334":0,"338":0,"339":0,"340":0,"343":0,"344":0,"347":0,"348":0,"351":0,"361":0,"362":0,"365":0,"366":0,"368":0,"370":0,"373":0,"374":0,"376":0,"380":0,"392":0,"393":0,"394":0,"397":0,"398":0,"406":0,"407":0,"410":0,"419":0,"420":0,"421":0,"425":0,"426":0,"429":0,"447":0,"450":0,"451":0,"452":0,"453":0,"454":0,"455":0,"456":0,"457":0,"458":0,"460":0,"461":0,"462":0,"463":0,"464":0,"465":0,"467":0,"471":0,"472":0,"475":0,"489":0,"490":0,"491":0,"494":0,"495":0,"499":0,"509":0,"512":0,"513":0,"515":0,"517":0,"518":0,"519":0,"522":0,"523":0,"525":0,"526":0,"527":0,"528":0,"533":0,"541":0,"553":0,"565":0,"566":0,"568":0,"577":0,"578":0,"588":0,"596":0,"602":0,"608":0,"614":0,"621":0,"628":0,"637":0,"644":0,"645":0,"652":0,"653":0,"661":0,"668":0,"669":0,"677":0,"678":0,"686":0,"687":0,"695":0,"701":0,"711":0,"718":0,"725":0,"726":0,"735":0,"742":0,"748":0,"754":0,"762":0,"768":0,"769":0,"775":0,"776":0,"784":0,"790":0,"798":0,"806":0,"815":0,"824":0,"833":0,"834":0,"844":0,"845":0,"846":0,"848":0,"851":0,"852":0,"855":0,"856":0,"860":0,"861":0,"869":0,"870":0,"880":0,"881":0,"884":0,"885":0,"888":0,"890":0,"901":0,"902":0,"903":0,"906":0,"907":0,"915":0,"916":0,"919":0,"927":0,"930":0,"931":0,"932":0,"933":0,"934":0,"935":0,"936":0,"937":0,"942":0,"943":0,"948":0,"959":0,"960":0,"961":0,"962":0,"966":0,"976":0,"977":0,"978":0,"979":0,"981":0,"983":0,"987":0,"997":0,"1000":0,"1001":0,"1003":0,"1004":0,"1005":0,"1006":0,"1011":0,"1022":0,"1023":0,"1024":0,"1027":0,"1028":0,"1036":0,"1037":0,"1040":0,"1048":0,"1049":0,"1053":0,"1054":0,"1056":0,"1058":0,"1065":0,"1079":0,"1081":0,"1123":0,"1124":0,"1125":0,"1126":0,"1127":0,"1129":0};
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].functions = {"MsgBaseFormatter:16":0,"getValue:29":0,"getParams:43":0,"format:62":0,"createInstance:75":0,"getCurrentTimeZone:85":0,"StringFormatter:99":0,"createInstance:113":0,"getParams:125":0,"format:142":0,"DateFormatter:167":0,"createInstance:187":0,"getParams:199":0,"format:231":0,"TimeFormatter:265":0,"createInstance:285":0,"NumberFormatter:297":0,"createInstance:316":0,"getParams:328":0,"format:360":0,"SelectFormatter:392":0,"createInstance:406":0,"getParams:418":0,"parseOptions:446":0,"select:488":0,"format:508":0,"_inRange:552":0,"_matchRule:564":0,"set1:576":0,"set2:587":0,"set3:595":0,"set4:601":0,"set5:607":0,"set6:613":0,"set7:620":0,"set8:627":0,"set9:636":0,"set10:643":0,"set11:651":0,"set12:660":0,"set13:667":0,"set14:676":0,"set15:685":0,"set16:694":0,"set17:700":0,"set18:710":0,"set19:717":0,"set20:724":0,"set21:734":0,"set22:741":0,"set23:747":0,"set24:753":0,"set25:761":0,"set26:767":0,"set27:774":0,"set28:783":0,"set29:789":0,"set30:797":0,"set31:805":0,"set32:814":0,"set33:823":0,"rule:856":0,"PluralFormatter:844":0,"createInstance:869":0,"select:880":0,"ChoiceFormatter:901":0,"createInstance:915":0,"parseOptions:926":0,"getParams:958":0,"select:975":0,"format:996":0,"MsgListFormatter:1022":0,"createInstance:1036":0,"format:1047":0,"formatMessage:1122":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-message-format/gallery-message-format.js"].coveredLines = 294;
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
var systemTZoneOffset = (new Date()).getTimezoneOffset()*-60;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 87);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 99);
Y.Intl.StringFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "StringFormatter", 99);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 100);
StringFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 101);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 104);
StringFormatter = Y.Intl.StringFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 105);
Y.extend(StringFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 113);
StringFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 113);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 114);
return new StringFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 117);
Y.mix(StringFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store key and value in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 125);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 126);
if(matches && matches[1]) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 127);
params.key = matches[1];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 128);
if(Formatter.prototype.getParams.call(this, params)) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 129);
return true;
            }
        }
	
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 133);
return false;
    },

    /**
     * Format all instances in str that can be handled by StringFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 142);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 143);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 146);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 147);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 149);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 151);
str = str.replace(matches[0], params.value);
            }

        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 156);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 167);
Y.Intl.DateFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "DateFormatter", 167);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 168);
DateFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 169);
this.styles = {
        "short":  [ Y.Date.DATE_FORMATS.YMD_SHORT, 0, 0 ],
        "medium": [ Y.Date.DATE_FORMATS.YMD_ABBREVIATED,0, 0 ],
        "long":   [ Y.Date.DATE_FORMATS.YMD_LONG, 0, 0 ],
        "full":   [ Y.Date.DATE_FORMATS.WYMD_LONG, 0, 0 ]
    };
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 175);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*date\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 178);
DateFormatter = Y.Intl.DateFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 179);
Y.extend(DateFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 187);
DateFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 187);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 188);
return new DateFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 191);
Y.mix(DateFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 199);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 200);
if(matches) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 201);
if(matches[1]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 202);
params.key = matches[1];
            }
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 204);
if(matches[3]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 205);
params.style = matches[3];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 209);
if(!params.style) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 210);
params.style = "medium";
        }			//If no style, default to medium

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 213);
if(!this.styles[params.style]) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 214);
return false;
        }	//Invalid style

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 217);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 218);
return true;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 221);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 231);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 232);
if(Y.Date === undefined || Y.Date.format === undefined) { return str; }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 233);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, style, result;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 236);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 237);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 239);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 241);
style = this.styles[params.style];
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 242);
result = Y.Date.format(new Date(params.value), {
                    timezone: config.timezone || Formatter.getCurrentTimeZone(),
                    dateFormat: style[0],
                    timeFormat: style[1],
                    timezoneFormat: style[2]
                });
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 248);
str = str.replace(matches[0], result);
            }

        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 253);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 265);
Y.Intl.TimeFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "TimeFormatter", 265);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 266);
TimeFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 267);
this.styles = {
        "short": [ 0, Y.Date.TIME_FORMATS.HM_SHORT, Y.Date.TIMEZONE_FORMATS.NONE ],
        "medium": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.NONE ],
        "long": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_SHORT ],
        "full": [ 0, Y.Date.TIME_FORMATS.HM_ABBREVIATED, Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED ]
    };
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 273);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*time\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 276);
TimeFormatter = Y.Intl.TimeFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 277);
Y.extend(TimeFormatter, DateFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 285);
TimeFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 285);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 286);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 297);
Y.Intl.NumberFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "NumberFormatter", 297);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 298);
NumberFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 299);
this.styles = {
        "integer": Y.Number.STYLES.NUMBER_STYLE,
        "percent": Y.Number.STYLES.PERCENT_STYLE,
        "currency": Y.Number.STYLES.CURRENCY_STYLE
    };
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 304);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*number\\s*(,\\s*(\\w+)\\s*)?}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 307);
NumberFormatter = Y.Intl.NumberFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 308);
Y.extend(NumberFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 316);
NumberFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 316);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 317);
return new NumberFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 320);
Y.mix(NumberFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store the values key, value, style in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 328);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 329);
if(matches) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 330);
if(matches[1]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 331);
params.key = matches[1];
            }
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 333);
if(matches[3]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 334);
params.style = matches[3];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 338);
if(!params.style) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 339);
params.style = "integer";	//If no style, default to medium
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 340);
params.showDecimal = true;	//Show decimal parts too
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 343);
if(!this.styles[params.style]) {	//Invalid style
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 344);
return false;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 347);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 348);
return true;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 351);
return false;
    },

    /**
     * Format all instances in str that can be handled by NumberFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 360);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 361);
if(Y.Number === undefined || Y.Number.format === undefined) { return str; }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 362);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, config;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 365);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 366);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 368);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 370);
config = {
                    style: this.styles[params.style]
                };
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 373);
if(params.style === "integer" && !params.showDecimal) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 374);
config.parseIntegerOnly = true;
                }
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 376);
str = str.replace(matches[0], Y.Number.format(params.value, config));
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 380);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 392);
Y.Intl.SelectFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "SelectFormatter", 392);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 393);
SelectFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 394);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*select\\s*,\\s*";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 397);
SelectFormatter = Y.Intl.SelectFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 398);
Y.extend(SelectFormatter, Formatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 406);
SelectFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 406);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 407);
return new SelectFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 410);
Y.mix(SelectFormatter.prototype, {
    /**
     * Get parameters from regex match
     * @method getParams
     * @param params {Object} Object to receive value. Function will store key and value in this variable
     * @param matches {Array} Result of regex match over pattern string.
     * @return {Boolean} True if value found, False otherwise
     */
    getParams: function(params, matches) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 418);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 419);
if(matches) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 420);
if(matches[1]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 421);
params.key = matches[1];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 425);
if(params.key && Formatter.prototype.getParams.call(this, params)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 426);
return true;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 429);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "parseOptions", 446);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 447);
var options = {},
            key = "", value = "", current = "",
            i, ch;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 450);
for(i=start; i<str.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 451);
ch = str.charAt(i);
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 452);
if (ch === '\\') {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 453);
current += ch + str.charAt(i+1);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 454);
i++;
            } else {_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 455);
if (ch === '}') {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 456);
if(current === "") {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 457);
i++;
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 458);
break;
                }
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 460);
value = current;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 461);
options[key.trim()] = value;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 462);
current = key = value = "";
            } else {_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 463);
if (ch === '{') {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 464);
key = current;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 465);
current = "";
            } else {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 467);
current += ch;
            }}}
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 471);
if(current !== "") {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 472);
return null;
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 475);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "select", 488);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 489);
for ( var key in options ) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 490);
if( key === "other" ) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 491);
continue;	//Will use this only if everything else fails
            }

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 494);
if( key === params.value ) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 495);
return options[key];
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 499);
return options.other;
    },

    /**
     * Format all instances in str that can be handled by SelectFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 508);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 509);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, options, result, start;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 512);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 513);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 515);
if(this.getParams(params, matches)) {
                //Got a match
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 517);
options = this.parseOptions(str, regex.lastIndex);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 518);
if(!options) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 519);
continue;
                }

                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 522);
regex.lastIndex = options.next;
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 523);
options = options.options;

                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 525);
result = this.select(options, params);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 526);
if(result) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 527);
start = str.indexOf(matches[0]);
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 528);
str = str.slice(0, start) + result + str.slice(regex.lastIndex);
                }
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 533);
return str;
    }
}, true);/**
 * PluralRules is used to determine the plural form in MessageFormat
 * @class PluralRules
 * @namespace Intl
 * @static
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 541);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "_inRange", 552);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 553);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "_matchRule", 564);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 565);
for(var key in rules) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 566);
if(rules[key]) { return key; }
        }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 568);
return "other";
    },

    /**
     * Set of rules. Each locale will have a matching rule. The corresponding functions in each set
     * will take a number as parameter and return the relevant plural form.
     */
    rules: {
        set1: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set1", 576);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 577);
var mod = n % 100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 578);
return PluralRules._matchRule({
                few:  inRange(mod, 3, 10),
                many: inRange(mod, 11, 99),
                one:  n === 1,
                two:  n === 2,
                zero: n === 0
            });
        },

        set2: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set2", 587);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 588);
return PluralRules._matchRule({
               many: n !== 0 && n%10 === 0,
               one:  n === 1,
               two:  n === 2
            });
        },

        set3: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set3", 595);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 596);
return PluralRules._matchRule({
               one: n === 1
            });
        },

        set4: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set4", 601);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 602);
return PluralRules._matchRule({
                one: inRange(n, 0, 1)
            });
        },

        set5: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set5", 607);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 608);
return PluralRules._matchRule({
                one: inRange(n, 0, 2) && n !== 2
            });
        },

        set6: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set6", 613);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 614);
return PluralRules._matchRule({
                one:  n%10 === 1 && n%100 !== 11,
                zero: n === 0
            });
        },

        set7: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set7", 620);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 621);
return PluralRules._matchRule({
                one: n === 1,
                two: n === 2
            });
        },

        set8: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set8", 627);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 628);
return PluralRules._matchRule({
                few:  inRange(n, 3, 6),
                many: inRange(n, 7, 10),
                one:  n === 1,
                two:  n === 2
            });
        },

        set9: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set9", 636);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 637);
return PluralRules._matchRule({
                few: n === 0 || (n !== 1 && inRange(n%100, 1, 19)),
                one: n === 1
            });
        },

        set10: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set10", 643);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 644);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 645);
return PluralRules._matchRule({
                few: inRange(mod10, 2, 9) && !inRange(mod100, 11, 19),
                one: mod10 === 1 && !inRange(mod100, 11, 19)
            });
        },

        set11: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set11", 651);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 652);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 653);
return PluralRules._matchRule({
                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),
                many: mod10 === 0 || inRange(mod10, 5, 9) || inRange(mod100, 11, 14),
                one:  mod10 === 1 && mod100 !== 11
            });
        },

        set12: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set12", 660);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 661);
return PluralRules._matchRule({
                few: inRange(n, 2, 4),
                one: n === 1
            });
        },

        set13: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set13", 667);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 668);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 669);
return PluralRules._matchRule({
                few:  inRange(mod10, 2, 4) && !inRange(mod100, 12, 14),
                many: n !== 1 && inRange(mod10, 0, 1) || inRange(mod10, 5, 9) || inRange(mod100, 12, 14),
                one:  n === 1
            });
        },

        set14: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set14", 676);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 677);
var mod = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 678);
return PluralRules._matchRule({
                few: inRange(mod, 3, 4),
                one: mod === 1,
                two: mod === 2
            });
        },

        set15: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set15", 685);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 686);
var mod = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 687);
return PluralRules._matchRule({
                few:  n === 0 || inRange(mod, 2, 10),
                many: inRange(mod, 11, 19),
                one:  n === 1
            });
        },

        set16: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set16", 694);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 695);
return PluralRules._matchRule({
                one: n%10 === 1 && n !== 11
            });
        },

        set17: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set17", 700);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 701);
return PluralRules._matchRule({
                few:  n === 3,
                many: n === 6,
                one:  n === 1,
                two:  n === 2,
                zero: n === 0
            });
        },

        set18: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set18", 710);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 711);
return PluralRules._matchRule({
                one:  inRange(n, 0, 2) && n !== 0 && n !== 2,
                zero: n === 0
            });
        },

        set19: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set19", 717);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 718);
return PluralRules._matchRule({
                few: inRange(n, 2, 10),
                one: inRange(n, 0, 1)
            });
        },

        set20: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set20", 724);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 725);
var mod1 = n%10, mod2 = n%100, mod6 = n%1000000;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 726);
return PluralRules._matchRule({
                few:  (inRange(mod1, 3, 4) || mod1 === 9) && !inRange(mod2, 10, 19) && !inRange(mod2, 70, 79) && !inRange(mod2, 90, 99),
                many: n !== 0 && mod6 === 0,
                one:  mod1 === 1 && mod2 !== 11 && mod2 !== 71 && mod2 !== 91,
                two:  mod1 === 2 && mod2 !== 12 && mod2 !== 72 && mod2 !== 92
            });
        },

        set21: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set21", 734);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 735);
return PluralRules._matchRule({
                one:  n === 1,
                zero: n === 0
            });
        },

        set22: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set22", 741);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 742);
return PluralRules._matchRule({
                one: inRange(n, 0, 1) || inRange(n, 11, 99)
            });
        },

        set23: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set23", 747);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 748);
return PluralRules._matchRule({
                one: inRange(n%10, 1, 2) || n%20 === 0
            });
        },

        set24: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set24", 753);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 754);
return PluralRules._matchRule({
                few: inRange(n, 3, 10) || inRange(n, 13, 19),
                one: n === 1 || n === 11,
                two: n === 2 || n === 12
            });
        },

        set25: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set25", 761);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 762);
return PluralRules._matchRule({
                one: n === 1 || n === 5
            });
        },

        set26: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set26", 767);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 768);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 769);
return PluralRules._matchRule({
                one: (mod10 === 1 || mod10 === 2) && (mod100 !== 11 && mod100 !== 12)
            });
        },

        set27: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set27", 774);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 775);
var mod10 = n%10, mod100 = n%100;
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 776);
return PluralRules._matchRule({
                few: mod10 === 3 && mod100 !== 13,
                one: mod10 === 1 && mod100 !== 11,
                two: mod10 === 2 && mod100 !== 12
            });
        },

        set28: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set28", 783);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 784);
return PluralRules._matchRule({
                many: n === 11 || n === 8 || n === 80 || n === 800
            });
        },

        set29: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set29", 789);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 790);
return PluralRules._matchRule({
                few: n === 4,
                one: n === 1 || n === 3,
                two: n === 2
            });
        },

        set30: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set30", 797);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 798);
return PluralRules._matchRule({
                few: n === 4,
                one: n === 1,
                two: n === 2 || n === 3
            });
        },

        set31: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set31", 805);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 806);
return PluralRules._matchRule({
                few:  n === 4,
                many: n === 6,
                one:  n === 1,
                two:  n === 2 || n === 3
            });
        },

        set32: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set32", 814);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 815);
return PluralRules._matchRule({
                few:  n === 4,
                many: n === 6,
                one:  Y.Array.indexOf([1,5,7,8,9,10], n) > -1,
                two: n === 2 || n === 3
            });
        },

        set33: function(n) {
            _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "set33", 823);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 824);
return PluralRules._matchRule({
                few:  inRange(n, 2, 9),
                many: inRange(n, 10, 19) || inRange(n, 100, 199) || inRange(n, 1000, 1999),
                one:  n === 1
            });
        }
    }
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 833);
PluralRules = Y.Intl.PluralRules;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 834);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 844);
Y.Intl.PluralFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "PluralFormatter", 844);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 845);
PluralFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 846);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*plural\\s*,\\s*";
    
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 848);
var formats = Y.Intl.get(MODULE_NAME),
        ruleSet = formats.pluralRule;

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 851);
if(ruleSet) {
         _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 852);
this.rule = PluralRules.rules[ruleSet];
    }

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 855);
if(this.rule === undefined) {
         _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 856);
this.rule = function() { _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "rule", 856);
return "other"; };
    }
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 860);
PluralFormatter = Y.Intl.PluralFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 861);
Y.extend(PluralFormatter, SelectFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 869);
PluralFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 869);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 870);
return new PluralFormatter(values);
};

/**
 * Select output depending on params.value from options
 * @method select
 * @param options {Object} Object containing results for singular/plural
 * @param params {Object} Object containing value
 * @return {String} selected result
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 880);
PluralFormatter.prototype.select = function(options, params) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "select", 880);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 881);
var pluralForm = this.rule(params.value),
        result = options[pluralForm];

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 884);
if(result === undefined || result === null) {
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 885);
result = options.other;
    }

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 888);
result = result.replace("#", new NumberFormatter({VAL: params.value}).format("{VAL, number, integer}"));	//Use 'number' to format this part

    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 890);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 901);
Y.Intl.ChoiceFormatter = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "ChoiceFormatter", 901);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 902);
ChoiceFormatter.superclass.constructor.call(this, values);
    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 903);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*choice\\s*,\\s*(.+)}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 906);
ChoiceFormatter = Y.Intl.ChoiceFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 907);
Y.extend(ChoiceFormatter, SelectFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 915);
ChoiceFormatter.createInstance = function(values) {
    _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 915);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 916);
return new ChoiceFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 919);
Y.mix(ChoiceFormatter.prototype, {
    /**
     * Parse choices in pattern and get options array.
     * @method parseOptions
     * @param choicesStr {String} Choice string from pattern
     * @return {Array} Array of objects containing value(choice), result, and relation
     */
    parseOptions: function(choicesStr) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "parseOptions", 926);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 927);
var options = [],
            choicesArray = choicesStr.split("|"),
            i, j, choice, relations, rel, mapping, ch;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 930);
for (i=0; i<choicesArray.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 931);
choice = choicesArray[i];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 932);
relations = ['#', '<', '\u2264'];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 933);
for (j=0; j<relations.length; j++) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 934);
rel = relations[j];
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 935);
if(choice.indexOf(rel) !== -1) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 936);
mapping = choice.split(rel);
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 937);
ch = {
                        value: parseInt(mapping[0], 10),
                        result: mapping[1],
                        relation: rel
                    };
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 942);
options.push(ch);
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 943);
break;
                }
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 948);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "getParams", 958);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 959);
if(SelectFormatter.prototype.getParams.call(this, params, matches)) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 960);
if(matches[2]) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 961);
params.choices = this.parseOptions(matches[2]);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 962);
return params.choices === [] ? false: true;
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 966);
return false;
    },

    /**
     * Select output depending on params.value from options in params.choices
     * @method select
     * @param params {Object} Object containing value and choices
     * @return {String} selected result
     */
    select: function(params) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "select", 975);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 976);
var choice, value, result, relation, i;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 977);
for (i=0; i<params.choices.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 978);
choice = params.choices[i];
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 979);
value = choice.value, result = choice.result, relation = choice.relation;

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 981);
if( (relation === '#' && value === params.value) || (relation === '<' && value < params.value)
                || (relation === '\u2264' && value <= params.value)) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 983);
return result;
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 987);
return "";
    },

    /**
     * Format all instances in str that can be handled by ChoiceFormatter
     * @method format
     * @param str {String} Input string/pattern
     * @return {String} Formatted result
     */
    format: function(str) {
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 996);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 997);
var regex = new RegExp(this.regex, "gm"),
            matches = null,
            params, result;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1000);
while((matches = regex.exec(str))) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1001);
params = {};

            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1003);
if(this.getParams(params, matches)) {
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1004);
result = this.select(params);
                _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1005);
if(result) {
                    _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1006);
str = str.replace(matches[0], result);
                }
            }
        }

        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1011);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1022);
Y.Intl.MsgListFormatter = function(values) {
      _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "MsgListFormatter", 1022);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1023);
MsgListFormatter.superclass.constructor.call(this, values);
      _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1024);
this.regex = "{\\s*([a-zA-Z0-9_]+)\\s*,\\s*list\\s*}";
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1027);
MsgListFormatter = Y.Intl.MsgListFormatter;
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1028);
Y.extend(MsgListFormatter, StringFormatter);

/**
 * Create an instance of the formatter
 * @method createInstance
 * @static
 * @param values {Array|Object} The data to be processed and inserted.
 */
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1036);
MsgListFormatter.createInstance = function(values) {
     _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "createInstance", 1036);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1037);
return new MsgListFormatter(values);
};

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1040);
Y.mix(MsgListFormatter.prototype, {
     /**
      * Format all instances in str that can be handled by MsgListFormatter
      * @method format
      * @param str {String} Input string/pattern
      * @return {String} Formatted result
      */
     format: function(str) {
          _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "format", 1047);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1048);
if(Y.Intl === undefined || Y.Intl.ListFormatter === undefined || Y.Intl.ListFormatter.format === undefined) { return str; }
          _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1049);
var regex = new RegExp(this.regex, "gm"),
              matches = null,
              params;

          _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1053);
while((matches = regex.exec(str))) {
              _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1054);
params = {};

              _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1056);
if(this.getParams(params, matches)) {
                  //Got a match
                  _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1058);
str = str.replace(
                             matches[0],
                             Y.Intl.ListFormatter.format( params.value )
                  );
              }
          }

          _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1065);
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
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1079);
formatters = [ StringFormatter, DateFormatter, TimeFormatter, NumberFormatter, ChoiceFormatter, PluralFormatter, SelectFormatter, MsgListFormatter ];

_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1081);
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
        _yuitest_coverfunc("build/gallery-message-format/gallery-message-format.js", "formatMessage", 1122);
_yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1123);
config = config || {};
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1124);
var i, formatter;
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1125);
for(i=0; i<formatters.length; i++) {
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1126);
formatter = formatters[i].createInstance(values);
            _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1127);
pattern = formatter.format(pattern, config);
        }
        _yuitest_coverline("build/gallery-message-format/gallery-message-format.js", 1129);
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
