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
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-advanced-date-format/gallery-advanced-date-format.js",
    code: []
};
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].code=["YUI.add('gallery-advanced-date-format', function (Y, NAME) {","","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","","var MODULE_NAME = \"gallery-advanced-date-format\",","    Format, ShortNames, DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat;","","Y.Date.__advancedFormat = true;","","//","// Format class","//","","/**"," * Base class for all formats. To format an object, instantiate the format of your choice and call the format method which"," * returns the formatted string."," * For internal use only."," * @class __BaseFormat"," * @namespace Date"," * @constructor"," * @private"," * @param {String} pattern"," * @param {Object} formats"," */","Y.Date.__BaseFormat = function(pattern, formats) {","    if ( !pattern && !formats ) {","        return;","    }","","    Y.mix(this, {","        /**","         * Pattern to format/parse","         * @property _pattern","         * @type String","         */","        _pattern: pattern,","        /**","         * Segments in the pattern","         * @property _segments","         * @type Date.__BaseFormat.Segment","         */","        _segments: [],","        Formats: formats","    });","};","","Format = Y.Date.__BaseFormat;","","Y.mix(Format.prototype, {","    /**","     * Format object","     * @method format","     * @param object The object to be formatted","     * @return {String} Formatted result","     */","    format: function(object) {","        var s = [], i = 0;","    ","        for (; i < this._segments.length; i++) {","            s.push(this._segments[i].format(object));","        }","        return s.join(\"\");","    },","","    ","    /**","     * Parses the given string according to this format's pattern and returns","     * an object.","     * Note:","     * The default implementation of this method assumes that the sub-class","     * has implemented the _createParseObject method.","     * @method parse","     * @for Date.__BaseFormat","     * @param {String} s The string to be parsed","     * @param {Number} [pp=0] Parse position. String will only be read from here","     */","    parse: function(s, pp) {","        var object = this._createParseObject(),","            index = pp || 0,","            i = 0;","        for (; i < this._segments.length; i++) {","            index = this._segments[i].parse(object, s, index);","        }","        ","        if (index < s.length) {","            Y.error(\"Parse Error: Input too long\");","        }","        return object;","    },","    ","    /**","     * Creates the object that is initialized by parsing. For internal use only.","     * Note:","     * This must be implemented by sub-classes.","     * @method _createParseObject","     * @private","     * //return {Object}","     */","    _createParseObject: function(/*s*/) {","        Y.error(\"Not implemented\");","    }","});","","//","// Segment class","//","","/**"," * Segments in the pattern to be formatted"," * @class __BaseFormat.Segment"," * @for __BaseFormat"," * @namespace Date"," * @private"," * @constructor"," * @param {Format} format The format object that created this segment"," * @param {String} s String representing this segment"," */","Format.Segment = function(format, s) {","    if( !format && !s ) { return; }","    this._parent = format;","    this._s = s;","};","","Y.mix(Format.Segment.prototype, {","    /**","     * Formats the object. Will be overridden in most subclasses.","     * @method format","     * //param o The object to format","     * @return {String} Formatted result","     */","    format: function(/*o*/) {","        return this._s;","    },","","    /**","     * Parses the string at the given index, initializes the parse object","     * (as appropriate), and returns the new index within the string for","     * the next parsing step.","     *","     * Note:","     * This method must be implemented by sub-classes.","     *","     * @method parse","     * //param o     {Object} The parse object to be initialized.","     * //param s     {String} The input string to be parsed.","     * //param index {Number} The index within the string to start parsing.","     * //return The parsed result.","     */","    parse: function(/*o, s, index*/) {","        Y.error(\"Not implemented\");","    },","","    /**","     * Return the parent Format object","     * @method getFormat","     * @return {Date.__BaseFormat}","     */","    getFormat: function() {","        return this._parent;","    }","});","","Y.mix(Format.Segment, {","    /**","     * Parse literal string that matches the pattern","     * @method _parseLiteral","     * @static","     * @private","     * @param {String} literal The pattern that literal should match","     * @param {String} s The literal to be parsed","     * @param {Number} index The position in s where literal is expected to start from","     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.","     */","    _parseLiteral: function(literal, s, index) {","        if (s.length - index < literal.length) {","            Y.error(\"Parse Error: Input too short\");","        }","        for (var i = 0; i < literal.length; i++) {","            if (literal.charAt(i) !== s.charAt(index + i)) {","                Y.error(\"Parse Error: Input does not match\");","            }","        }","        return index + literal.length;","    },","    ","    /**","     * Parses an integer at the offset of the given string and calls a","     * method on the specified object.","     *","     * @method _parseInt","     * @private","     *","     * @param o           {Object}   The target object.","     * @param f           {function|String} The method to call on the target object.","     *                               If this parameter is a string, then it is used","     *                               as the name of the property to set on the","     *                               target object.","     * @param adjust      {Number}   The numeric adjustment to make on the","     *                               value before calling the object method.","     * @param s           {String}   The string to parse.","     * @param index       {Number}   The index within the string to start parsing.","     * @param fixedlen    {Number}   If specified, specifies the required number","     *                               of digits to be parsed.","     * @param [radix=10]  {Number}   Specifies the radix of the parse string.","     * @return {Number}   The position where the parsed number was found","     */","    _parseInt: function(o, f, adjust, s, index, fixedlen, radix) {","        var len = fixedlen || s.length - index,","            head = index,","            i = 0,","            tail, value, target;","        for (; i < len; i++) {","            if (!s.charAt(index++).match(/\\d/)) {","                index--;","                break;","            }","        }","        tail = index;","        if (head === tail) {","            Y.error(\"Error parsing number. Number not present\");","        }","        if (fixedlen && tail - head !== fixedlen) {","            Y.error(\"Error parsing number. Number too short\");","        }","        value = parseInt(s.substring(head, tail), radix || 10);","        if (f) {","            target = o || Y.config.win;","            if (typeof f === \"function\") {","                f.call(target, value + adjust);","            }","            else {","                target[f] = value + adjust;","            }","        }","        return tail;","    }","});","","//","// Text segment class","//","","/**"," * Text segment in the pattern."," * @class __BaseFormat.TextSegment"," * @for __BaseFormat"," * @namespace Date"," * @extends Segment"," * @constructor"," * @param {Format} format The parent Format object"," * @param {String} s The pattern representing this segment"," */","Format.TextSegment = function(format, s) {","    if (!format && !s) { return; }","    Format.TextSegment.superclass.constructor.call(this, format, s);","};","","Y.extend(Format.TextSegment, Format.Segment);","","Y.mix(Format.TextSegment.prototype, {","    /**","     * String representation of the class","     * @method toString","     * @private","     * @return {String}","     */","    toString: function() {","        return \"text: \\\"\"+this._s+'\"';","    },","","    /**","     * Parse an object according to the pattern","     * @method parse","     * @param o The parse object. Not used here. This is only used in more complex segment types","     * @param s {String} The string being parsed","     * @param index {Number} The index in s to start parsing from","     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.","     */","    parse: function(o, s, index) {","        return Format.Segment._parseLiteral(this._s, s, index);","    }","}, true);","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","","/**"," * This module provides absolute/relative date and time formatting, as well as duration formatting"," * Applications can choose date, time, and time zone components separately."," * For dates, relative descriptions (English \"yesterday\", German \"vorgestern\", Japanese \"後天\") are also supported."," *"," * This module uses a few modified parts of zimbra AjxFormat to handle dates and time."," *"," * Absolute formats use the default calendar specified in CLDR for each locale."," * Currently this means the Buddhist calendar for Thailand; the Gregorian calendar for all other countries."," * However, you can specify other calendars using language subtags;"," * for example, for Thai the Gregorian calendar can be specified as th-TH-u-ca-gregory."," *"," * Relative time formats only support times in the past. It can represent times like \"1 hour 5 minutes ago\""," *"," * @module datatype-date-advanced-format"," * @requires datatype-date-timezone, datatype-date-format, datatype-number-advanced-format"," */","","Format = Y.Date.__BaseFormat;","","ShortNames = {","        \"weekdayMonShort\":\"M\",","        \"weekdayTueShort\":\"T\",","        \"weekdayWedShort\":\"W\",","        \"weekdayThuShort\":\"T\",","        \"weekdayFriShort\":\"F\",","        \"weekdaySatShort\":\"S\",","        \"weekdaySunShort\":\"S\",","        \"monthJanShort\":\"J\",","        \"monthFebShort\":\"F\",","        \"monthMarShort\":\"M\",","        \"monthAprShort\":\"A\",","        \"monthMayShort\":\"M\",","        \"monthJunShort\":\"J\",","        \"monthJulShort\":\"J\",","        \"monthAugShort\":\"A\",","        \"monthSepShort\":\"S\",","        \"monthOctShort\":\"O\",","        \"monthNovShort\":\"N\",","        \"monthDecShort\":\"D\"","};","    ","//","// Date format class","//","","/**"," * The DateFormat class formats Date objects according to a specified pattern."," * The patterns are defined the same as the SimpleDateFormat class in the Java libraries."," *"," * Note:"," * The date format differs from the Java patterns a few ways: the pattern"," * \"EEEEE\" (5 'E's) denotes a <em>short</em> weekday and the pattern \"MMMMM\""," * (5 'M's) denotes a <em>short</em> month name. This matches the extended"," * pattern found in the Common Locale Data Repository (CLDR) found at:"," * http://www.unicode.org/cldr/."," *"," * @class __zDateFormat"," * @extends Number.__BaseFormat"," * @namespace Date"," * @private"," * @constructor"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {","    DateFormat.superclass.constructor.call(this, pattern, formats);","    this.timeZone = new Y.Date.Timezone(timeZoneId);","        ","    if (pattern === null) {","        return;","    }","    var head, tail, segment, i, c, count, field;","    for (i = 0; i < pattern.length; i++) {","        // literal","        c = pattern.charAt(i);","        if (c === \"'\") {","            head = i + 1;","            for (i++ ; i < pattern.length; i++) {","                c = pattern.charAt(i);","                if (c === \"'\") {","                    if (i + 1 < pattern.length && pattern.charAt(i + 1) === \"'\") {","                        pattern = pattern.substr(0, i) + pattern.substr(i + 1);","                    }","                    else {","                        break;","                    }","                }","            }","            if (i === pattern.length) {","		Y.error(\"unterminated string literal\");","            }","            tail = i;","            segment = new Format.TextSegment(this, pattern.substring(head, tail));","            this._segments.push(segment);","            continue;","        }","","        // non-meta chars","        head = i;","        while(i < pattern.length) {","            c = pattern.charAt(i);","            if (DateFormat._META_CHARS.indexOf(c) !== -1 || c === \"'\") {","                break;","            }","            i++;","        }","        tail = i;","        if (head !== tail) {","            segment = new Format.TextSegment(this, pattern.substring(head, tail));","            this._segments.push(segment);","            i--;","            continue;","        }","		","        // meta char","        head = i;","        while(++i < pattern.length) {","            if (pattern.charAt(i) !== c) {","                break;","            }","        }","        tail = i--;","        count = tail - head;","        field = pattern.substr(head, count);","        segment = null;","        switch (c) {","            case 'G':","                segment = new DateFormat.EraSegment(this, field);","                break;","            case 'y':","                segment = new DateFormat.YearSegment(this, field);","                break;","            case 'M':","                segment = new DateFormat.MonthSegment(this, field);","                break;","            case 'w':","            case 'W':","                segment = new DateFormat.WeekSegment(this, field);","                break;","            case 'D':","            case 'd':","                segment = new DateFormat.DaySegment(this, field);","                break;","            case 'F':","            case 'E':","                segment = new DateFormat.WeekdaySegment(this, field);","                break;","            case 'a':","                segment = new DateFormat.AmPmSegment(this, field);","                break;","            case 'H':","            case 'k':","            case 'K':","            case 'h':","                segment = new DateFormat.HourSegment(this, field);","                break;","            case 'm':","                segment = new DateFormat.MinuteSegment(this, field);","                break;","            case 's':","            case 'S':","                segment = new DateFormat.SecondSegment(this, field);","                break;","            case 'z':","            case 'Z':","                segment = new DateFormat.TimezoneSegment(this, field);","                break;","        }","        if (segment !== null) {","            segment._index = this._segments.length;","            this._segments.push(segment);","        }","    }","};","","DateFormat = Y.Date.__zDateFormat;","Y.extend(DateFormat, Format);","","// Constants","","Y.mix(DateFormat, {","	SHORT: 0,","	MEDIUM: 1,","	LONG: 2,","	DEFAULT: 1,","	_META_CHARS: \"GyMwWDdFEaHkKhmsSzZ\"","});","","/**"," * Format the date"," * @method format"," * @param object {Date} The date to be formatted"," * @param [relative=false] {Boolean} Whether relative dates should be used."," * @return {String} Formatted result"," */","DateFormat.prototype.format = function(object, relative) {","    var useRelative = false,","        s = [],","        datePattern = false,","        i;","","    if(relative !== null && relative !== \"\") {","        useRelative = true;","    }","","    for (i = 0; i < this._segments.length; i++) {","        //Mark datePattern sections in case of relative dates","        if(this._segments[i].toString().indexOf(\"text: \\\"<datePattern>\\\"\") === 0) {","            if(useRelative) {","                s.push(relative);","            }","            datePattern = true;","            continue;","        }","        if(this._segments[i].toString().indexOf(\"text: \\\"</datePattern>\\\"\") === 0) {","            datePattern = false;","            continue;","        }","        if(!datePattern || !useRelative) {","            s.push(this._segments[i].format(object));","        }","    }","    return s.join(\"\");","};","","//","// Date segment class","//","","/**"," * Date Segment in the pattern"," * @class DateSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Number.__BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.DateSegment = function(format, s) {","    DateFormat.DateSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DateSegment, Format.Segment);","","//","// Date era segment class","//","","/**"," * Era Segment in the pattern"," * @class EraSegment"," * @for Date.__DateFormat"," * @namespace Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.EraSegment = function(format, s) {","    DateFormat.EraSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);","","/**"," * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD"," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.EraSegment.prototype.format = function(/*date*/) {","    // NOTE: Only support current era at the moment...","    return this.getFormat().AD;","};","","//","// Date year segment class","//","","/**"," * Year Segment in the pattern"," * @class YearSegment"," * @namespace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.YearSegment = function(format, s) {","    DateFormat.YearSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.YearSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateYear: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the year segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var year = String(date.getFullYear());","        return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Date._zeroPad(year, this._s.length);","    }","}, true);","","//","// Date month segment class","//","","/**"," * Month Segment in the pattern"," * @class MonthSegment"," * @namepspace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.MonthSegment = function(format, s) {","    DateFormat.MonthSegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.MonthSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateMonth: \\\"\"+this._s+'\"';","    },","","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.MonthSegment.MONTHS = {};","        DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [","            ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,","            ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,","            ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,","            ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [","            Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,","            Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,","            Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,","            Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium","        ];","        DateFormat.MonthSegment.MONTHS[DateFormat.LONG] = [","            Formats.monthJanLong, Formats.monthFebLong, Formats.monthMarLong,","            Formats.monthAprLong, Formats.monthMayLong, Formats.monthJunLong,","            Formats.monthJulLong, Formats.monthAugLong, Formats.monthSepLong,","            Formats.monthOctLong, Formats.monthNovLong, Formats.monthDecLong","        ];","    },","","    /**","     * Format date and get the month segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var month = date.getMonth();","        switch (this._s.length) {","            case 1:","                return String(month + 1);","            case 2:","                return Y.Date._zeroPad(month + 1, 2);","            case 3:","                return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];","            case 5:","                return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];","        }","        return DateFormat.MonthSegment.MONTHS[DateFormat.LONG][month];","    }","}, true);","","//","// Date week segment class","//","","/**"," * Week Segment in the pattern"," * @class WeekSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekSegment = function(format, s) {","    DateFormat.WeekSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);","","/**"," * Format date and get the week segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.WeekSegment.prototype.format = function(date) {","    var year = date.getYear(),","        month = date.getMonth(),","        day = date.getDate(),","	ofYear = /w/.test(this._s),","        date2 = new Date(year, ofYear ? 0 : month, 1),","        week = 0;","    while (true) {","        week++;","        if (date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day)) {","            break;","        }","        date2.setDate(date2.getDate() + 7);","    }","","    return Y.Date._zeroPad(week, this._s.length);","};","","//","// Date day segment class","//","","/**"," * Day Segment in the pattern"," * @class DaySegment"," * @namespace Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.DaySegment = function(format, s) {","    DateFormat.DaySegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);","","/**"," * Format date and get the day segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.DaySegment.prototype.format = function(date) {","    var month = date.getMonth(),","        day = date.getDate(),","        year = date.getYear(),","        date2;","","    if (/D/.test(this._s) && month > 0) {","        do {","            // set date to first day of month and then go back one day","            date2 = new Date(year, month, 1);","            date2.setDate(0);","			","            day += date2.getDate();","            month--;","        } while (month > 0);","    }","    return Y.Date._zeroPad(day, this._s.length);","};","","//","// Date weekday segment class","//","","/**"," * Weekday Segment in the pattern"," * @class WeekdaySegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekdaySegment = function(format, s) {","    DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);","","Y.mix(DateFormat.WeekdaySegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateDay: \\\"\"+this._s+'\"';","    },","","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.WeekdaySegment.WEEKDAYS = {};","        // NOTE: The short names aren't available in Java so we have to define them.","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [","            ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,","            ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,","            ShortNames.weekdaySatShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [","            Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,","            Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,","            Formats.weekdaySatMedium","        ];","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.LONG] = [","            Formats.weekdaySunLong, Formats.weekdayMonLong, Formats.weekdayTueLong,","            Formats.weekdayWedLong, Formats.weekdayThuLong, Formats.weekdayFriLong,","            Formats.weekdaySatLong","        ];","    },","","    /**","     * Format date and get the weekday segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var weekday = date.getDay(),","            style;","        if (/E/.test(this._s)) {","            switch (this._s.length) {","                case 4:","                    style = DateFormat.LONG;","                    break;","                case 5:","                    style = DateFormat.SHORT;","                    break;","                default:","                    style = DateFormat.MEDIUM;","            }","            return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];","        }","        return Y.Date._zeroPad(weekday, this._s.length);","    }","}, true);","","//","// Time segment class","//","","/**"," * Time Segment in the pattern"," * @class TimeSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Number.__BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimeSegment = function(format, s) {","    DateFormat.TimeSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimeSegment, Y.Date.__BaseFormat.Segment);","","//","// Time hour segment class","//","","/**"," * Hour Segment in the pattern"," * @class HourSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.HourSegment = function(format, s) {","    DateFormat.HourSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.HourSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeHour: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the hour segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        if (hours > 12 && /[hK]/.test(this._s)) {","            hours -= 12;","        }","        else if (hours === 0 && /[h]/.test(this._s)) {","            hours = 12;","        }","        /***","            // NOTE: This is commented out to match the Java formatter output","            //       but from the comments for these meta-chars, it doesn't","            //       seem right.","            if (/[Hk]/.test(this._s)) {","                hours--;","            }","        /***/","        return Y.Date._zeroPad(hours, this._s.length);","    }","}, true);","","//","// Time minute segment class","//","","/**"," * Minute Segment in the pattern"," * @class MinuteSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.MinuteSegment = function(format, s) {","    DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.MinuteSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeMinute: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the minute segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var minutes = date.getMinutes();","        return Y.Date._zeroPad(minutes, this._s.length);","    }","}, true);","","//","// Time second segment class","//","","/**"," * Second Segment in the pattern"," * @class SecondSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.SecondSegment = function(format, s) {","    DateFormat.SecondSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);","","/**"," * Format date and get the second segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.SecondSegment.prototype.format = function(date) {","    var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();","    return Y.Date._zeroPad(minutes, this._s.length);","};","","//","// Time am/pm segment class","//","","/**"," * AM/PM Segment in the pattern"," * @class AmPmSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.AmPmSegment = function(format, s) {","    DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.AmPmSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeAmPm: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the AM/PM segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        return hours < 12 ? this.getFormat().Formats.periodAm : this.getFormat().Formats.periodPm;","    }","}, true);","","//","// Time timezone segment class","//","","/**"," * TimeZone Segment in the pattern"," * @class TimezoneSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimezoneSegment = function(format, s) {","    DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.TimezoneSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeTimezone: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the timezone segment.","     * @method format","     * //param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(/*date*/) {","        var timeZone = this.getFormat().timeZone;","        if (/Z/.test(this._s)) {","            return timeZone.getShortName();","        }","        return this._s.length < 4 ? timeZone.getMediumName() : timeZone.getLongName();","    }","}, true);","    ","//","// Non-Gregorian Calendars","//","","/*"," * Buddhist Calendar. This is normally used only for Thai locales (th)."," * @class __BuddhistDateFormat"," * @namespace Date"," * @extends __zDateFormat"," * @constructor"," * @private"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {","    BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);","        ","    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar","    var segments = this._segments, i;","    for(i=0; i<segments.length; i++) {","        if(segments[i] instanceof DateFormat.YearSegment) {","            segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);","        } else if (segments[i] instanceof DateFormat.EraSegment) {","            segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);","        }","    }","};","","BuddhistDateFormat = Y.Date.__BuddhistDateFormat;","Y.extend(BuddhistDateFormat, DateFormat);","    ","/**"," * YearSegment class for Buddhist Calender"," * @class YearSegment"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.YearSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.YearSegment}"," */","BuddhistDateFormat.YearSegment = function(segment) {","    BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);","","/**"," * Format date and get the year segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.YearSegment.prototype.format = function(date) {","    var year = date.getFullYear();","    year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC","    return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Date._zeroPad(year, this._s.length);","};","    ","/**"," * EraSegment class for Buddhist Calender"," * @class EraSegment"," * @for Date.__BuddhistDateFormat"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.EraSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.EraSegment}"," */","BuddhistDateFormat.EraSegment = function(segment) {","    BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);","","/**"," * Format date and get the era segment."," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {","    return \"BE\";    //Only Buddhist Era supported for now","};","","/**"," * Wrapper around the zimbra-based DateFormat for use in YUI. API designed to be similar to ICU"," * @class __YDateFormat"," * namespace Date"," * @private"," * @constructor"," * @param {String} [timeZone] TZ database ID for the time zone that should be used."," *                            If omitted, defaults to the system timezone"," * @param {Number} [dateFormat=0] Selector for the desired date format from Y.Date.DATE_FORMATS."," * @param {Number} [timeFormat=0] Selector for the desired time format from Y.Date.TIME_FORMATS."," * @param {Number} [timeZoneFormat=0] Selector for the desired time zone format from Y.Date.TIMEZONE_FORMATS."," */","Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {","        ","    if(timeZone === undefined || timeZone === null) {","        timeZone = Y.Date.Timezone.getTimezoneIdForOffset( new Date().getTimezoneOffset() * -60 );","    }","","    this._Formats = Y.Intl.get(MODULE_NAME);","        ","    //If not valid time zone","    if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {","	Y.error(\"Could not find timezone: \" + timeZone);","    }","","    this._timeZone = timeZone;","    this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);","","    this._dateFormat = dateFormat || 0;","    this._timeFormat = timeFormat || 0;","    this._timeZoneFormat = timeZoneFormat || 0;","","    this._relative = false;","    this._pattern = this._generatePattern();","","    var locale = Y.Intl.getLang(MODULE_NAME);","        ","    if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {","        //Use buddhist calendar","        this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);","    } else {","        //Use gregorian calendar","        this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);","    }","};","","YDateFormat = Y.Date.__YDateFormat;","","Y.mix(Y.Date, {","    /**","     * Date Format Style values to use during format/parse","     * @property DATE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DATE_FORMATS: {","        NONE: 0,","        WYMD_LONG: 1,","        WYMD_ABBREVIATED: 4,","        WYMD_SHORT: 8,","        WMD_LONG: 16,","        WMD_ABBREVIATED: 32,","        WMD_SHORT: 64,","        YMD_LONG: 128,","        YMD_ABBREVIATED: 256,","        YMD_SHORT: 512,","        YM_LONG: 1024,","        MD_LONG: 2048,","        MD_ABBREVIATED: 4096,","        MD_SHORT: 8192,","        W_LONG: 16384,","        W_ABBREVIATED: 32768,","        M_LONG: 65536,","        M_ABBREVIATED: 131072,","        YMD_FULL: 262144,","        RELATIVE_DATE: 524288","    },","","    /**","     * Time Format Style values to use during format/parse","     * @property TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIME_FORMATS: {","        NONE: 0,","        HM_ABBREVIATED: 1,","        HM_SHORT: 2,","        H_ABBREVIATED: 4","    },","","    /**","     * Timezone Format Style values to use during format/parse","     * @property TIMEZONE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIMEZONE_FORMATS: {","        NONE: 0,","        Z_ABBREVIATED: 1,","        Z_SHORT: 2","    }","});","","Y.mix(YDateFormat.prototype, {","    /**","     * Generate date pattern for selected format. For internal use only.","     * @method _generateDatePattern","     * @for Date.__YDateFormat","     * @private","     * @return {String} Date pattern","     */","    _generateDatePattern: function() {","        var format = this._dateFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.DATE_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        /*jshint bitwise: false*/","        if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {","            this._relative = true;","            format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;","        }","        /*jshint bitwise: true*/","        switch(format) {","            //Use relative only for formats with day component","            case Y.Date.DATE_FORMATS.NONE:","                this._relative = false;","                return \"\";","            case Y.Date.DATE_FORMATS.WYMD_LONG:","                return this._Formats.WYMD_long;","            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:","                return this._Formats.WYMD_abbreviated;","            case Y.Date.DATE_FORMATS.WYMD_SHORT:","                return this._Formats.WYMD_short;","            case Y.Date.DATE_FORMATS.WMD_LONG:","                return this._Formats.WMD_long;","            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:","                return this._Formats.WMD_abbreviated;","            case Y.Date.DATE_FORMATS.WMD_SHORT:","                return this._Formats.WMD_short;","            case Y.Date.DATE_FORMATS.YMD_LONG:","                return this._Formats.YMD_long;","            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:","                return this._Formats.YMD_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_SHORT:","                return this._Formats.YMD_short;","            case Y.Date.DATE_FORMATS.YM_LONG:","                this._relative = false;","                return this._Formats.YM_long;","            case Y.Date.DATE_FORMATS.MD_LONG:","                return this._Formats.MD_long;","            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:","                return this._Formats.MD_abbreviated;","            case Y.Date.DATE_FORMATS.MD_SHORT:","                return this._Formats.MD_short;","            case Y.Date.DATE_FORMATS.W_LONG:","                this._relative = false;","                return this._Formats.W_long;","            case Y.Date.DATE_FORMATS.W_ABBREVIATED:","                this._relative = false;","                return this._Formats.W_abbreviated;","            case Y.Date.DATE_FORMATS.M_LONG:","                this._relative = false;","                return this._Formats.M_long;","            case Y.Date.DATE_FORMATS.M_ABBREVIATED:","                this._relative = false;","                return this._Formats.M_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_FULL:","                return this._Formats.YMD_full;","            default:","                Y.error(\"Date format given does not exist\");	//Error no such pattern.","        }","    },","        ","    /**","     * Generate time pattern for selected format. For internal use only","     * @method _generateTimePattern","     * @private","     * @return {String} Time pattern","     */","    _generateTimePattern: function() {","        var format = this._timeFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIME_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        switch(format) {","            case Y.Date.TIME_FORMATS.NONE:","                return \"\";","            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:","                return this._Formats.HM_abbreviated;","            case Y.Date.TIME_FORMATS.HM_SHORT:","                return this._Formats.HM_short;","            case Y.Date.TIME_FORMATS.H_ABBREVIATED:","                return this._Formats.H_abbreviated;","            default:","                Y.error(\"Time format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate time-zone pattern for selected format. For internal use only.","     * @method _generateTimeZonePattern","     * @private","     * @return {String} Time-Zone pattern","     */","    _generateTimeZonePattern: function() {","        var format = this._timeZoneFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIMEZONE_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        switch(format) {","            case Y.Date.TIMEZONE_FORMATS.NONE:","                return \"\";","            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:","                return \"z\";","            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:","                return \"Z\";","            default:","                Y.error(\"Time Zone format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate pattern for selected date, time and time-zone formats. For internal use only","     * @method _generatePattern","     * @private","     * @return {String} Combined pattern for date, time and time-zone","     */","    _generatePattern: function() {","        var datePattern = this._generateDatePattern(),","            timePattern = this._generateTimePattern(),","            timeZonePattern = this._generateTimeZonePattern(),","            pattern = \"\";","","        //Combine patterns. Mark date pattern part, to use with relative dates.","        if(datePattern !== \"\") {","            datePattern = \"'<datePattern>'\" + datePattern + \"'</datePattern>'\";","        }","        ","        if(timePattern !== \"\" && timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimeTimezoneCombination;","        } else if (timePattern !== \"\") {","            pattern = this._Formats.DateTimeCombination;","        } else if(timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimezoneCombination;","        } else if(datePattern !== \"\"){","            //Just date","            pattern = \"{1}\";","        }","        ","        pattern = pattern.replace(\"{0}\", timePattern).replace(\"{1}\", datePattern).replace(\"{2}\", timeZonePattern);","        ","        //Remove unnecessary whitespaces","        pattern = Y.Lang.trim(pattern.replace(/\\s\\s+/g, \" \"));","","        return pattern;","    },","","    /**","     * Formats a date","     * @method format","     * @param {Date} date The date to be formatted.","     * @return {String} The formatted string","     */","    format: function(date) {","        if(date === null || !Y.Lang.isDate(date)) {","            Y.error(\"format called without a date.\");","        }","        ","        var offset = this._timeZoneInstance.getRawOffset() * 1000,","            relativeDate = null,","            today = new Date(),","            tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),","            yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);","        date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);","","        if(this._relative) {","            if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {","                relativeDate = this._Formats.today;","            }","","            if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {","                relativeDate = this._Formats.tomorrow;","            }","","            if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {","                relativeDate = this._Formats.yesterday;","            }","        }","","        return this._dateFormatInstance.format(date, relativeDate);","    }","}, true);","/**"," * YRelativeTimeFormat class provides localized formatting of relative time values such as \"3 minutes ago\"."," * Relative time formats supported are defined by how many units they may include."," * Relative time is only used for past events. The Relative time formats use appropriate singular/plural/paucal/etc. forms for all languages."," * In order to keep relative time formats independent of time zones, relative day names such as today, yesterday, or tomorrow are not used."," */","","/**"," * Class to handle relative time formatting"," * @class __YRelativeTimeFormat"," * @namespace Date"," * @private"," * @constructor"," * @param [style='ONE_UNIT_LONG'] {Number|String} Selector for the desired relative time format. Should be key/value from Y.Date.RELATIVE_TIME_FORMATS"," */","Y.Date.__YRelativeTimeFormat = function(style) {","    if(style === null) {","        style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;","    } else if(Y.Lang.isString(style)) {","        style = Y.Date.RELATIVE_TIME_FORMATS[style];","    }","        ","    this.patterns = Y.Intl.get(MODULE_NAME);","    this.style = style;","		","    switch(style) {","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:","            this.numUnits = 2;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:","            this.numUnits = 2;","            this.abbr = false;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:","            this.numUnits = 1;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:","            this.numUnits = 1;","            this.abbr = false;","            break;","        default:","            Y.error(\"Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS\");","    }","};","","YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;","","Y.mix(Y.Date, {","    /**","     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.","     * @property","     * @type Number|function","     * @static","     */","    currentDate: function() { return new Date(); },","","    /**","     * Format Style values to use during format/parse","     * @property RELATIVE_TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    RELATIVE_TIME_FORMATS: {","        ONE_OR_TWO_UNITS_ABBREVIATED: 0,","        ONE_OR_TWO_UNITS_LONG: 1,","        ONE_UNIT_ABBREVIATED: 2,","        ONE_UNIT_LONG: 4","    }","});","	","/**"," * Formats a time value."," * @method format"," * @for Date.__YRelativeTimeFormat"," * @param {Number} timeValue The time value (seconds since Epoch) to be formatted."," * @param {Number} [relativeTo=Current Time] The time value (seconds since Epoch) in relation to which timeValue should be formatted.","          It must be greater than or equal to timeValue"," * @return {String} The formatted string"," */","YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {","    if(relativeTo === null) {","        relativeTo = (new Date()).getTime()/1000;","        if(timeValue > relativeTo) {","            Y.error(\"timeValue must be in the past\");","        }","    } else if(timeValue > relativeTo) {","        Y.error(\"relativeTo must be greater than or equal to timeValue\");","    }","","    var date = new Date((relativeTo - timeValue)*1000),","        result = [],","        numUnits = this.numUnits,","        value = date.getUTCFullYear() - 1970,	//Need zero-based index","        text, pattern, i;","        ","    if(value > 0) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.years_abbr : this.patterns.year_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.years : this.patterns.year);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMonth();","    if((numUnits > 0) && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.months_abbr : this.patterns.month_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.months : this.patterns.month);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCDate()-1;			//Need zero-based index","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.days_abbr : this.patterns.day_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.days : this.patterns.day);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCHours();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.hours_abbr : this.patterns.hour_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.hours : this.patterns.hour);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMinutes();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.minutes_abbr : this.patterns.minute_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.minutes : this.patterns.minute);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCSeconds();","    if(result.length === 0 || (numUnits > 0 && (numUnits < this.numUnits || value > 0))) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.seconds_abbr : this.patterns.second_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.seconds : this.patterns.second);","            result.push(text);","        }","        numUnits--;","    }","","    pattern = (result.length === 1) ? this.patterns[\"RelativeTime/oneUnit\"] : this.patterns[\"RelativeTime/twoUnits\"];","        ","    for(i=0; i<result.length; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", result[i]);","    }","    for(i=result.length; i<this.numUnits; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", \"\");","    }","    //Remove unnecessary whitespaces","    pattern = Y.Lang.trim(pattern.replace(/\\s+/g, \" \"));","        ","    return pattern;","};","/**"," * YDurationFormat class formats time in a language independent manner."," * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages."," */","","Y.mix(Y.Date, {","    /**","     * Strip decimal part of argument and return the integer part","     * @method _stripDecimals","     * @static","     * @private","     * @for Date","     * @param floatNum A real number","     * @return Integer part of floatNum","     */","    _stripDecimals: function (floatNum) {","        return floatNum > 0 ? Math.floor(floatNum): Math.ceil(floatNum);","    }","});","","/**"," * YDurationFormat class formats time in a language independent manner."," * @class __YDurationFormat"," * @namespace Date"," * @private"," * @constructor"," * @param style {Number|String} selector for the desired duration format. Can be key/value from Y.Date.DURATION_FORMATS"," */","Y.Date.__YDurationFormat = function(style) {","    if(style && Y.Lang.isString(style)) {","        style = Y.Date.DURATION_FORMATS[style];","    }","    this.style = style;","    this.patterns = Y.Intl.get(MODULE_NAME);","};","","YDurationFormat = Y.Date.__YDurationFormat;","","Y.mix(Y.Date, {","    /**","     * Format Style values to use during format/parse of Duration values","     * @property DURATION_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DURATION_FORMATS: {","        HMS_LONG: 0,","        HMS_SHORT: 1","    }","});","","Y.mix(YDurationFormat, {","    /**","     * Parse XMLDurationFormat (PnYnMnDTnHnMnS) and return an object with hours, minutes and seconds","     * Any absent values are set to -1, which will be ignored in HMS_long, and set to 0 in HMS_short","     * Year, Month and Day are ignored. Only Hours, Minutes and Seconds are used","     * @method _getDuration_XML","     * @static","     * @private","     * @for Date.__YDurationFormat","     * @param {String} xmlDuration XML Duration String.","     *      The lexical representation for duration is the [ISO 8601] extended format PnYnMnDTnHnMnS,","     *      where nY represents the number of years, nM the number of months, nD the number of days,","     *      'T' is the date/time separator,","     *      nH the number of hours, nM the number of minutes and nS the number of seconds.","     *      The number of seconds can include decimal digits to arbitrary precision.","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_XML: function (xmlDuration) {","        var regex = new RegExp(/P(\\d+Y)?(\\d+M)?(\\d+D)?T(\\d+H)?(\\d+M)?(\\d+(\\.\\d+)?S)/),","            matches = xmlDuration.match(regex);","        ","        if(matches === null) {","            Y.error(\"xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'\");","        }","        ","        return {","            hours: parseInt(matches[4] || -1, 10),","            minutes: parseInt(matches[5] || -1, 10),","            seconds: parseFloat(matches[6] || -1, 10)","        };","    },","    ","    /**","     * Get duration from time in seconds.","     * The value should be integer value in seconds, and should not be negative.","     * @method _getDuration_Seconds","     * @static","     * @private","     * @param {Number} timeValueInSeconds Duration in seconds","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_Seconds: function (timeValueInSeconds) {","        var duration = {};","        if(timeValueInSeconds < 0) {","            Y.error(\"TimeValue cannot be negative\");","        }","                ","        duration.hours = Y.Date._stripDecimals(timeValueInSeconds / 3600);","                ","        timeValueInSeconds %= 3600;","        duration.minutes = Y.Date._stripDecimals(timeValueInSeconds / 60);","                ","        timeValueInSeconds %= 60;","        duration.seconds = timeValueInSeconds;","        ","        return duration;","    }","});","    ","/**"," * Formats the given value into a duration format string."," * For XML duration format, the string should be in the pattern PnYnMnDTnHnMnS."," * Please note that year, month and day fields are ignored in this version."," * For future compatibility, please do not pass Year/Month/Day in the parameter."," *"," * For hours, minutes, and seconds, any absent or negative parts are ignored in HMS_long format,"," * but are treated as 0 in HMS_short format style."," *"," * @method"," * @private"," * @param oDuration {String|Number|Object} Duration as time in seconds (Integer),","          XML duration format (String), or an object with hours, minutes and seconds"," * @return {String} The formatted string"," */","YDurationFormat.prototype.format = function(oDuration) {","    if(Y.Lang.isNumber(oDuration)) {","        oDuration = YDurationFormat._getDuration_Seconds(oDuration);","    } else if(Y.Lang.isString(oDuration)) {","        oDuration = YDurationFormat._getDuration_XML(oDuration);","    }","    ","    var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,","        result = {","            hours: \"\",","            minutes: \"\",","            seconds: \"\"","        },","        resultPattern = \"\",","        formatNumber = function(num) { return num; };","","    if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }","    if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }","    if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }","   ","    //Test minutes and seconds for invalid values","    if(oDuration.minutes > 59 || oDuration.seconds > 59) {","        Y.error(\"Minutes and Seconds should be less than 60\");","    }","","    //If number format available, use it, otherwise do not format number.","    if (Y.Number !== undefined && Y.Number.format !== undefined) {","        formatNumber = function(num) { return Y.Number.format(num); };","    }","    if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {","        resultPattern = this.patterns.HMS_long;","        if(oDuration.hours >= 0) {","            result.hours = formatNumber(oDuration.hours) + \" \" + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);","        }","","        if(oDuration.minutes >= 0) {","            result.minutes = oDuration.minutes + \" \" + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);","        }","","        if(oDuration.seconds >= 0) {","            result.seconds = oDuration.seconds + \" \" + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);","        }","    } else {                                            //HMS_SHORT","        resultPattern = this.patterns.HMS_short;","        result = {","             hours: formatNumber(oDuration.hours),","             minutes: Y.Date._zeroPad(oDuration.minutes, 2),","             seconds: Y.Date._zeroPad(oDuration.seconds, 2)","        };","    }","        ","    resultPattern = resultPattern.replace(\"{0}\", result.hours);","    resultPattern = resultPattern.replace(\"{1}\", result.minutes);","    resultPattern = resultPattern.replace(\"{2}\", result.seconds);","       ","    //Remove unnecessary whitespaces","    resultPattern = Y.Lang.trim(resultPattern.replace(/\\s\\s+/g, \" \"));","       ","    return resultPattern;","};","","Y.Date.oldFormat = Y.Date.format;","","Y.mix(Y.Date, {","    /**","     * Takes a native JavaScript Date and formats it as a string for display to user. Can be configured with the oConfig parameter.","     * For relative time format, dates are compared to current time. To compare to a different time, set the parameter Y.Date.currentDate","     * Configuration object can have 4 optional parameters:","     *     [dateFormat=0] {String|Number} Date format to use. Should be a key/value from Y.Date.DATE_FORMATS.","     *     [timeFormat=0] {String|Number} Time format to use. Should be a key/value from Y.Date.TIME_FORMATS.","     *     [timezoneFormat=0] {String|Number} Timezone format to use. Should be a key/value from Y.Date.TIMEZONE_FORMATS.","     *     [relativeTimeFormat=0] {String|Number} RelativeTime format to use. Should be a key/value from Y.Date.RELATIVE_TIME_FORMATS.","     *     [format] {HTML} Format string as pattern. This is passed to the Y.Date.format method from datatype-date-format module.","                           If this parameter is used, the other three will be ignored.","     * @for Date","     * @method format","     * @param oDate {Date} Date","     * @param [oConfig] {Object} Object literal of configuration values.","     * @return {String} string representation of the date","     * @example","            var date = new Date();","            Y.Date.format(date, { timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\", timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\" });","            Y.Date.format(date, { relativeTimeFormat: \"ONE_OR_TWO_UNITS_LONG\" });","            Y.Date.format(date, { format: \"%Y-%m-%d\"});","     */","    format: function(oDate, oConfig) {","        oConfig = oConfig || {};","        if(oConfig.format && Y.Lang.isString(oConfig.format)) {","            return Y.Date.oldFormat(oDate, oConfig);","        }","    ","        if(!Y.Lang.isDate(oDate)) {","            return Y.Lang.isValue(oDate) ? oDate : \"\";","        }","                ","        var formatter, relativeTo;","        if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {","            formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);","            return formatter.format(oDate);","        }","    ","        relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);","        if(oConfig.relativeTimeFormat) {","            formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);","            return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);","        }","","        Y.error(\"Unrecognized format options.\");","    },","","    /**","     * Returns a string representation of the duration","     * @method format","     * @param oDuration {String|Number|Object} Duration as time in seconds, xml duration format, or an object with hours, minutes and seconds","     * @param [oConfig] {Object} Configuration object. Used to pass style parameter to the method.","                        'style' can be a string (HMS_LONG/HMS_SHORT) or the numerical values in Y.Date.DURATION_FORMATS","     * @return {String} string representation of the duration","     * @example","                Y.Date.formatDuration(3601, { style: \"HMS_LONG\" });","                Y.Date.formatDuration(\"PT11H22M33S\", { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40 }, { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40, seconds: 5 }, { style: \"HMS_LONG\" });","     */","    formatDuration: function(oDuration, oConfig) {","        oConfig = oConfig || {};","        return new YDurationFormat(oConfig.style).format(oDuration);","    }","}, true);","","","}, '@VERSION@', {","    \"lang\": [","        \"af\",","        \"am\",","        \"ar-DZ\",","        \"ar-JO\",","        \"ar\",","        \"ar-LB\",","        \"ar-MA\",","        \"ar-SY\",","        \"ar-TN\",","        \"as\",","        \"az-Cyrl\",","        \"az\",","        \"be\",","        \"bg\",","        \"bn-IN\",","        \"bn\",","        \"bo\",","        \"ca\",","        \"cs\",","        \"cy\",","        \"da\",","        \"de-AT\",","        \"de-BE\",","        \"de\",","        \"el\",","        \"en-AU\",","        \"en-BE\",","        \"en-BW\",","        \"en-CA\",","        \"en-GB\",","        \"en-HK\",","        \"en-IE\",","        \"en-IN\",","        \"en-JO\",","        \"en-MT\",","        \"en-MY\",","        \"en-NZ\",","        \"en-PH\",","        \"en-RH\",","        \"en-SG\",","        \"en-US\",","        \"en-US-POSIX\",","        \"en-ZA\",","        \"en-ZW\",","        \"eo\",","        \"es-AR\",","        \"es-CL\",","        \"es-CO\",","        \"es-EC\",","        \"es-GT\",","        \"es-HN\",","        \"es\",","        \"es-PA\",","        \"es-PE\",","        \"es-PR\",","        \"es-US\",","        \"et\",","        \"eu\",","        \"fa-AF\",","        \"fa\",","        \"fi\",","        \"fil\",","        \"fo\",","        \"fr-BE\",","        \"fr-CA\",","        \"fr-CH\",","        \"fr\",","        \"ga\",","        \"gl\",","        \"gsw\",","        \"gu\",","        \"gv\",","        \"ha\",","        \"haw\",","        \"he\",","        \"hi\",","        \"hr\",","        \"hu\",","        \"hy\",","        \"id\",","        \"ii\",","        \"in\",","        \"is\",","        \"it-CH\",","        \"it\",","        \"iw\",","        \"ja-JP-TRADITIONAL\",","        \"ja\",","        \"\",","        \"ka\",","        \"kk\",","        \"kl\",","        \"km\",","        \"kn\",","        \"ko\",","        \"kok\",","        \"kw\",","        \"lt\",","        \"lv\",","        \"mk\",","        \"ml\",","        \"mr\",","        \"ms-BN\",","        \"ms\",","        \"mt\",","        \"nb\",","        \"ne-IN\",","        \"ne\",","        \"nl-BE\",","        \"nl\",","        \"nn\",","        \"no\",","        \"no-NO-NY\",","        \"om\",","        \"or\",","        \"pa-Arab\",","        \"pa\",","        \"pa-PK\",","        \"pl\",","        \"ps\",","        \"pt\",","        \"pt-PT\",","        \"ro\",","        \"ru\",","        \"ru-UA\",","        \"sh\",","        \"si\",","        \"sk\",","        \"sl\",","        \"so\",","        \"sq\",","        \"sr-BA\",","        \"sr-Cyrl-BA\",","        \"sr\",","        \"sr-Latn\",","        \"sr-Latn-ME\",","        \"sr-ME\",","        \"sv-FI\",","        \"sv\",","        \"sw\",","        \"ta\",","        \"te\",","        \"th\",","        \"ti-ER\",","        \"ti\",","        \"tl\",","        \"tr\",","        \"uk\",","        \"ur-IN\",","        \"ur\",","        \"ur-PK\",","        \"uz\",","        \"uz-Latn\",","        \"vi\",","        \"zh-Hans-SG\",","        \"zh-Hant-HK\",","        \"zh-Hant\",","        \"zh-Hant-MO\",","        \"zh-HK\",","        \"zh\",","        \"zh-MO\",","        \"zh-SG\",","        \"zh-TW\",","        \"zu\"","    ],","    \"requires\": [","        \"gallery-advanced-date-timezone\"","    ]","});"];
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].lines = {"1":0,"7":0,"10":0,"27":0,"28":0,"29":0,"32":0,"49":0,"51":0,"59":0,"61":0,"62":0,"64":0,"80":0,"83":0,"84":0,"87":0,"88":0,"90":0,"102":0,"120":0,"121":0,"122":0,"123":0,"126":0,"134":0,"152":0,"161":0,"165":0,"177":0,"178":0,"180":0,"181":0,"182":0,"185":0,"210":0,"214":0,"215":0,"216":0,"217":0,"220":0,"221":0,"222":0,"224":0,"225":0,"227":0,"228":0,"229":0,"230":0,"231":0,"234":0,"237":0,"255":0,"256":0,"257":0,"260":0,"262":0,"270":0,"282":0,"307":0,"309":0,"355":0,"356":0,"357":0,"359":0,"360":0,"362":0,"363":0,"365":0,"366":0,"367":0,"368":0,"369":0,"370":0,"371":0,"372":0,"375":0,"379":0,"380":0,"382":0,"383":0,"384":0,"385":0,"389":0,"390":0,"391":0,"392":0,"393":0,"395":0,"397":0,"398":0,"399":0,"400":0,"401":0,"402":0,"406":0,"407":0,"408":0,"409":0,"412":0,"413":0,"414":0,"415":0,"416":0,"418":0,"419":0,"421":0,"422":0,"424":0,"425":0,"428":0,"429":0,"432":0,"433":0,"436":0,"437":0,"439":0,"440":0,"445":0,"446":0,"448":0,"449":0,"452":0,"453":0,"456":0,"457":0,"459":0,"460":0,"461":0,"466":0,"467":0,"471":0,"486":0,"487":0,"492":0,"493":0,"496":0,"498":0,"499":0,"500":0,"502":0,"503":0,"505":0,"506":0,"507":0,"509":0,"510":0,"513":0,"531":0,"532":0,"534":0,"551":0,"552":0,"554":0,"562":0,"564":0,"582":0,"583":0,"585":0,"587":0,"594":0,"604":0,"605":0,"624":0,"625":0,"626":0,"628":0,"630":0,"637":0,"645":0,"646":0,"653":0,"654":0,"660":0,"675":0,"676":0,"678":0,"680":0,"682":0,"684":0,"686":0,"705":0,"706":0,"708":0,"716":0,"717":0,"723":0,"724":0,"725":0,"726":0,"728":0,"731":0,"748":0,"749":0,"751":0,"759":0,"760":0,"765":0,"766":0,"768":0,"769":0,"771":0,"772":0,"775":0,"793":0,"794":0,"795":0,"797":0,"799":0,"806":0,"814":0,"816":0,"822":0,"823":0,"828":0,"842":0,"844":0,"845":0,"847":0,"848":0,"850":0,"851":0,"853":0,"855":0,"857":0,"876":0,"877":0,"879":0,"896":0,"897":0,"899":0,"901":0,"908":0,"918":0,"919":0,"920":0,"922":0,"923":0,"933":0,"952":0,"953":0,"955":0,"957":0,"964":0,"974":0,"975":0,"994":0,"995":0,"997":0,"1005":0,"1006":0,"1007":0,"1025":0,"1026":0,"1028":0,"1030":0,"1037":0,"1047":0,"1048":0,"1067":0,"1068":0,"1070":0,"1072":0,"1079":0,"1089":0,"1090":0,"1091":0,"1093":0,"1112":0,"1113":0,"1116":0,"1117":0,"1118":0,"1119":0,"1120":0,"1121":0,"1126":0,"1127":0,"1138":0,"1139":0,"1142":0,"1150":0,"1151":0,"1152":0,"1153":0,"1166":0,"1167":0,"1170":0,"1178":0,"1179":0,"1194":0,"1196":0,"1197":0,"1200":0,"1203":0,"1204":0,"1207":0,"1208":0,"1210":0,"1211":0,"1212":0,"1214":0,"1215":0,"1217":0,"1219":0,"1221":0,"1224":0,"1228":0,"1230":0,"1292":0,"1301":0,"1302":0,"1303":0,"1306":0,"1308":0,"1309":0,"1310":0,"1313":0,"1316":0,"1317":0,"1319":0,"1321":0,"1323":0,"1325":0,"1327":0,"1329":0,"1331":0,"1333":0,"1335":0,"1337":0,"1338":0,"1340":0,"1342":0,"1344":0,"1346":0,"1347":0,"1349":0,"1350":0,"1352":0,"1353":0,"1355":0,"1356":0,"1358":0,"1360":0,"1371":0,"1372":0,"1373":0,"1376":0,"1377":0,"1379":0,"1381":0,"1383":0,"1385":0,"1387":0,"1398":0,"1399":0,"1400":0,"1403":0,"1404":0,"1406":0,"1408":0,"1410":0,"1412":0,"1423":0,"1429":0,"1430":0,"1433":0,"1434":0,"1435":0,"1436":0,"1437":0,"1438":0,"1439":0,"1441":0,"1444":0,"1447":0,"1449":0,"1459":0,"1460":0,"1463":0,"1468":0,"1470":0,"1471":0,"1472":0,"1475":0,"1476":0,"1479":0,"1480":0,"1484":0,"1502":0,"1503":0,"1504":0,"1505":0,"1506":0,"1509":0,"1510":0,"1512":0,"1514":0,"1515":0,"1516":0,"1518":0,"1519":0,"1520":0,"1522":0,"1523":0,"1524":0,"1526":0,"1527":0,"1528":0,"1530":0,"1534":0,"1536":0,"1543":0,"1570":0,"1571":0,"1572":0,"1573":0,"1574":0,"1576":0,"1577":0,"1580":0,"1586":0,"1587":0,"1588":0,"1589":0,"1591":0,"1592":0,"1594":0,"1597":0,"1598":0,"1599":0,"1600":0,"1601":0,"1603":0,"1604":0,"1606":0,"1609":0,"1610":0,"1611":0,"1612":0,"1613":0,"1615":0,"1616":0,"1618":0,"1621":0,"1622":0,"1623":0,"1624":0,"1625":0,"1627":0,"1628":0,"1630":0,"1633":0,"1634":0,"1635":0,"1636":0,"1637":0,"1639":0,"1640":0,"1642":0,"1645":0,"1646":0,"1647":0,"1648":0,"1649":0,"1651":0,"1652":0,"1654":0,"1657":0,"1659":0,"1660":0,"1662":0,"1663":0,"1666":0,"1668":0,"1675":0,"1686":0,"1698":0,"1699":0,"1700":0,"1702":0,"1703":0,"1706":0,"1708":0,"1723":0,"1741":0,"1744":0,"1745":0,"1748":0,"1765":0,"1766":0,"1767":0,"1770":0,"1772":0,"1773":0,"1775":0,"1776":0,"1778":0,"1797":0,"1798":0,"1799":0,"1800":0,"1801":0,"1804":0,"1811":0,"1813":0,"1814":0,"1815":0,"1818":0,"1819":0,"1823":0,"1824":0,"1826":0,"1827":0,"1828":0,"1829":0,"1832":0,"1833":0,"1836":0,"1837":0,"1840":0,"1841":0,"1848":0,"1849":0,"1850":0,"1853":0,"1855":0,"1858":0,"1860":0,"1885":0,"1886":0,"1887":0,"1890":0,"1891":0,"1894":0,"1895":0,"1896":0,"1897":0,"1900":0,"1901":0,"1902":0,"1903":0,"1906":0,"1923":0,"1924":0};
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].functions = {"__BaseFormat:27":0,"format:58":0,"parse:79":0,"_createParseObject:101":0,"Segment:120":0,"format:133":0,"parse:151":0,"getFormat:160":0,"_parseLiteral:176":0,"_parseInt:209":0,"TextSegment:255":0,"toString:269":0,"parse:281":0,"__zDateFormat:355":0,"format:486":0,"DateSegment:531":0,"EraSegment:551":0,"format:562":0,"YearSegment:582":0,"toString:593":0,"format:603":0,"MonthSegment:624":0,"toString:636":0,"initialize:644":0,"format:674":0,"WeekSegment:705":0,"format:716":0,"DaySegment:748":0,"format:759":0,"WeekdaySegment:793":0,"toString:805":0,"initialize:813":0,"format:841":0,"TimeSegment:876":0,"HourSegment:896":0,"toString:907":0,"format:917":0,"MinuteSegment:952":0,"toString:963":0,"format:973":0,"SecondSegment:994":0,"format:1005":0,"AmPmSegment:1025":0,"toString:1036":0,"format:1046":0,"TimezoneSegment:1067":0,"toString:1078":0,"format:1088":0,"__BuddhistDateFormat:1112":0,"YearSegment:1138":0,"format:1150":0,"EraSegment:1166":0,"format:1178":0,"__YDateFormat:1194":0,"_generateDatePattern:1300":0,"_generateTimePattern:1370":0,"_generateTimeZonePattern:1397":0,"_generatePattern:1422":0,"format:1458":0,"__YRelativeTimeFormat:1502":0,"currentDate:1543":0,"format:1570":0,"_stripDecimals:1685":0,"__YDurationFormat:1698":0,"_getDuration_XML:1740":0,"_getDuration_Seconds:1764":0,"formatNumber:1811":0,"formatNumber:1824":0,"format:1797":0,"format:1884":0,"formatDuration:1922":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].coveredLines = 545;
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].coveredFunctions = 72;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1);
YUI.add('gallery-advanced-date-format', function (Y, NAME) {

/*
 * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc.
 */

_yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 7);
var MODULE_NAME = "gallery-advanced-date-format",
    Format, ShortNames, DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 10);
Y.Date.__advancedFormat = true;

//
// Format class
//

/**
 * Base class for all formats. To format an object, instantiate the format of your choice and call the format method which
 * returns the formatted string.
 * For internal use only.
 * @class __BaseFormat
 * @namespace Date
 * @constructor
 * @private
 * @param {String} pattern
 * @param {Object} formats
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 27);
Y.Date.__BaseFormat = function(pattern, formats) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__BaseFormat", 27);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 28);
if ( !pattern && !formats ) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 29);
return;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 32);
Y.mix(this, {
        /**
         * Pattern to format/parse
         * @property _pattern
         * @type String
         */
        _pattern: pattern,
        /**
         * Segments in the pattern
         * @property _segments
         * @type Date.__BaseFormat.Segment
         */
        _segments: [],
        Formats: formats
    });
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 49);
Format = Y.Date.__BaseFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 51);
Y.mix(Format.prototype, {
    /**
     * Format object
     * @method format
     * @param object The object to be formatted
     * @return {String} Formatted result
     */
    format: function(object) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 58);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 59);
var s = [], i = 0;
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 61);
for (; i < this._segments.length; i++) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 62);
s.push(this._segments[i].format(object));
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 64);
return s.join("");
    },

    
    /**
     * Parses the given string according to this format's pattern and returns
     * an object.
     * Note:
     * The default implementation of this method assumes that the sub-class
     * has implemented the _createParseObject method.
     * @method parse
     * @for Date.__BaseFormat
     * @param {String} s The string to be parsed
     * @param {Number} [pp=0] Parse position. String will only be read from here
     */
    parse: function(s, pp) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "parse", 79);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 80);
var object = this._createParseObject(),
            index = pp || 0,
            i = 0;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 83);
for (; i < this._segments.length; i++) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 84);
index = this._segments[i].parse(object, s, index);
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 87);
if (index < s.length) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 88);
Y.error("Parse Error: Input too long");
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 90);
return object;
    },
    
    /**
     * Creates the object that is initialized by parsing. For internal use only.
     * Note:
     * This must be implemented by sub-classes.
     * @method _createParseObject
     * @private
     * //return {Object}
     */
    _createParseObject: function(/*s*/) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_createParseObject", 101);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 102);
Y.error("Not implemented");
    }
});

//
// Segment class
//

/**
 * Segments in the pattern to be formatted
 * @class __BaseFormat.Segment
 * @for __BaseFormat
 * @namespace Date
 * @private
 * @constructor
 * @param {Format} format The format object that created this segment
 * @param {String} s String representing this segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 120);
Format.Segment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "Segment", 120);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 121);
if( !format && !s ) { return; }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 122);
this._parent = format;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 123);
this._s = s;
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 126);
Y.mix(Format.Segment.prototype, {
    /**
     * Formats the object. Will be overridden in most subclasses.
     * @method format
     * //param o The object to format
     * @return {String} Formatted result
     */
    format: function(/*o*/) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 133);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 134);
return this._s;
    },

    /**
     * Parses the string at the given index, initializes the parse object
     * (as appropriate), and returns the new index within the string for
     * the next parsing step.
     *
     * Note:
     * This method must be implemented by sub-classes.
     *
     * @method parse
     * //param o     {Object} The parse object to be initialized.
     * //param s     {String} The input string to be parsed.
     * //param index {Number} The index within the string to start parsing.
     * //return The parsed result.
     */
    parse: function(/*o, s, index*/) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "parse", 151);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 152);
Y.error("Not implemented");
    },

    /**
     * Return the parent Format object
     * @method getFormat
     * @return {Date.__BaseFormat}
     */
    getFormat: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "getFormat", 160);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 161);
return this._parent;
    }
});

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 165);
Y.mix(Format.Segment, {
    /**
     * Parse literal string that matches the pattern
     * @method _parseLiteral
     * @static
     * @private
     * @param {String} literal The pattern that literal should match
     * @param {String} s The literal to be parsed
     * @param {Number} index The position in s where literal is expected to start from
     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.
     */
    _parseLiteral: function(literal, s, index) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_parseLiteral", 176);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 177);
if (s.length - index < literal.length) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 178);
Y.error("Parse Error: Input too short");
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 180);
for (var i = 0; i < literal.length; i++) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 181);
if (literal.charAt(i) !== s.charAt(index + i)) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 182);
Y.error("Parse Error: Input does not match");
            }
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 185);
return index + literal.length;
    },
    
    /**
     * Parses an integer at the offset of the given string and calls a
     * method on the specified object.
     *
     * @method _parseInt
     * @private
     *
     * @param o           {Object}   The target object.
     * @param f           {function|String} The method to call on the target object.
     *                               If this parameter is a string, then it is used
     *                               as the name of the property to set on the
     *                               target object.
     * @param adjust      {Number}   The numeric adjustment to make on the
     *                               value before calling the object method.
     * @param s           {String}   The string to parse.
     * @param index       {Number}   The index within the string to start parsing.
     * @param fixedlen    {Number}   If specified, specifies the required number
     *                               of digits to be parsed.
     * @param [radix=10]  {Number}   Specifies the radix of the parse string.
     * @return {Number}   The position where the parsed number was found
     */
    _parseInt: function(o, f, adjust, s, index, fixedlen, radix) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_parseInt", 209);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 210);
var len = fixedlen || s.length - index,
            head = index,
            i = 0,
            tail, value, target;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 214);
for (; i < len; i++) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 215);
if (!s.charAt(index++).match(/\d/)) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 216);
index--;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 217);
break;
            }
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 220);
tail = index;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 221);
if (head === tail) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 222);
Y.error("Error parsing number. Number not present");
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 224);
if (fixedlen && tail - head !== fixedlen) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 225);
Y.error("Error parsing number. Number too short");
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 227);
value = parseInt(s.substring(head, tail), radix || 10);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 228);
if (f) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 229);
target = o || Y.config.win;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 230);
if (typeof f === "function") {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 231);
f.call(target, value + adjust);
            }
            else {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 234);
target[f] = value + adjust;
            }
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 237);
return tail;
    }
});

//
// Text segment class
//

/**
 * Text segment in the pattern.
 * @class __BaseFormat.TextSegment
 * @for __BaseFormat
 * @namespace Date
 * @extends Segment
 * @constructor
 * @param {Format} format The parent Format object
 * @param {String} s The pattern representing this segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 255);
Format.TextSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "TextSegment", 255);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 256);
if (!format && !s) { return; }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 257);
Format.TextSegment.superclass.constructor.call(this, format, s);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 260);
Y.extend(Format.TextSegment, Format.Segment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 262);
Y.mix(Format.TextSegment.prototype, {
    /**
     * String representation of the class
     * @method toString
     * @private
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 269);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 270);
return "text: \""+this._s+'"';
    },

    /**
     * Parse an object according to the pattern
     * @method parse
     * @param o The parse object. Not used here. This is only used in more complex segment types
     * @param s {String} The string being parsed
     * @param index {Number} The index in s to start parsing from
     * @return {Number} Last position read in s. This is used to continue parsing from the end of the literal.
     */
    parse: function(o, s, index) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "parse", 281);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 282);
return Format.Segment._parseLiteral(this._s, s, index);
    }
}, true);
/*
 * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc.
 */

/**
 * This module provides absolute/relative date and time formatting, as well as duration formatting
 * Applications can choose date, time, and time zone components separately.
 * For dates, relative descriptions (English "yesterday", German "vorgestern", Japanese "後天") are also supported.
 *
 * This module uses a few modified parts of zimbra AjxFormat to handle dates and time.
 *
 * Absolute formats use the default calendar specified in CLDR for each locale.
 * Currently this means the Buddhist calendar for Thailand; the Gregorian calendar for all other countries.
 * However, you can specify other calendars using language subtags;
 * for example, for Thai the Gregorian calendar can be specified as th-TH-u-ca-gregory.
 *
 * Relative time formats only support times in the past. It can represent times like "1 hour 5 minutes ago"
 *
 * @module datatype-date-advanced-format
 * @requires datatype-date-timezone, datatype-date-format, datatype-number-advanced-format
 */

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 307);
Format = Y.Date.__BaseFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 309);
ShortNames = {
        "weekdayMonShort":"M",
        "weekdayTueShort":"T",
        "weekdayWedShort":"W",
        "weekdayThuShort":"T",
        "weekdayFriShort":"F",
        "weekdaySatShort":"S",
        "weekdaySunShort":"S",
        "monthJanShort":"J",
        "monthFebShort":"F",
        "monthMarShort":"M",
        "monthAprShort":"A",
        "monthMayShort":"M",
        "monthJunShort":"J",
        "monthJulShort":"J",
        "monthAugShort":"A",
        "monthSepShort":"S",
        "monthOctShort":"O",
        "monthNovShort":"N",
        "monthDecShort":"D"
};
    
//
// Date format class
//

/**
 * The DateFormat class formats Date objects according to a specified pattern.
 * The patterns are defined the same as the SimpleDateFormat class in the Java libraries.
 *
 * Note:
 * The date format differs from the Java patterns a few ways: the pattern
 * "EEEEE" (5 'E's) denotes a <em>short</em> weekday and the pattern "MMMMM"
 * (5 'M's) denotes a <em>short</em> month name. This matches the extended
 * pattern found in the Common Locale Data Repository (CLDR) found at:
 * http://www.unicode.org/cldr/.
 *
 * @class __zDateFormat
 * @extends Number.__BaseFormat
 * @namespace Date
 * @private
 * @constructor
 * @param pattern {String} The pattern to format date in
 * @param formats {Object} Locale specific data
 * @param timeZoneId {String} Timezone Id according to Olson tz database
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 355);
Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__zDateFormat", 355);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 356);
DateFormat.superclass.constructor.call(this, pattern, formats);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 357);
this.timeZone = new Y.Date.Timezone(timeZoneId);
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 359);
if (pattern === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 360);
return;
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 362);
var head, tail, segment, i, c, count, field;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 363);
for (i = 0; i < pattern.length; i++) {
        // literal
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 365);
c = pattern.charAt(i);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 366);
if (c === "'") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 367);
head = i + 1;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 368);
for (i++ ; i < pattern.length; i++) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 369);
c = pattern.charAt(i);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 370);
if (c === "'") {
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 371);
if (i + 1 < pattern.length && pattern.charAt(i + 1) === "'") {
                        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 372);
pattern = pattern.substr(0, i) + pattern.substr(i + 1);
                    }
                    else {
                        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 375);
break;
                    }
                }
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 379);
if (i === pattern.length) {
		_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 380);
Y.error("unterminated string literal");
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 382);
tail = i;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 383);
segment = new Format.TextSegment(this, pattern.substring(head, tail));
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 384);
this._segments.push(segment);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 385);
continue;
        }

        // non-meta chars
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 389);
head = i;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 390);
while(i < pattern.length) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 391);
c = pattern.charAt(i);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 392);
if (DateFormat._META_CHARS.indexOf(c) !== -1 || c === "'") {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 393);
break;
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 395);
i++;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 397);
tail = i;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 398);
if (head !== tail) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 399);
segment = new Format.TextSegment(this, pattern.substring(head, tail));
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 400);
this._segments.push(segment);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 401);
i--;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 402);
continue;
        }
		
        // meta char
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 406);
head = i;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 407);
while(++i < pattern.length) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 408);
if (pattern.charAt(i) !== c) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 409);
break;
            }
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 412);
tail = i--;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 413);
count = tail - head;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 414);
field = pattern.substr(head, count);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 415);
segment = null;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 416);
switch (c) {
            case 'G':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 418);
segment = new DateFormat.EraSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 419);
break;
            case 'y':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 421);
segment = new DateFormat.YearSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 422);
break;
            case 'M':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 424);
segment = new DateFormat.MonthSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 425);
break;
            case 'w':
            case 'W':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 428);
segment = new DateFormat.WeekSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 429);
break;
            case 'D':
            case 'd':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 432);
segment = new DateFormat.DaySegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 433);
break;
            case 'F':
            case 'E':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 436);
segment = new DateFormat.WeekdaySegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 437);
break;
            case 'a':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 439);
segment = new DateFormat.AmPmSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 440);
break;
            case 'H':
            case 'k':
            case 'K':
            case 'h':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 445);
segment = new DateFormat.HourSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 446);
break;
            case 'm':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 448);
segment = new DateFormat.MinuteSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 449);
break;
            case 's':
            case 'S':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 452);
segment = new DateFormat.SecondSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 453);
break;
            case 'z':
            case 'Z':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 456);
segment = new DateFormat.TimezoneSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 457);
break;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 459);
if (segment !== null) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 460);
segment._index = this._segments.length;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 461);
this._segments.push(segment);
        }
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 466);
DateFormat = Y.Date.__zDateFormat;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 467);
Y.extend(DateFormat, Format);

// Constants

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 471);
Y.mix(DateFormat, {
	SHORT: 0,
	MEDIUM: 1,
	LONG: 2,
	DEFAULT: 1,
	_META_CHARS: "GyMwWDdFEaHkKhmsSzZ"
});

/**
 * Format the date
 * @method format
 * @param object {Date} The date to be formatted
 * @param [relative=false] {Boolean} Whether relative dates should be used.
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 486);
DateFormat.prototype.format = function(object, relative) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 486);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 487);
var useRelative = false,
        s = [],
        datePattern = false,
        i;

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 492);
if(relative !== null && relative !== "") {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 493);
useRelative = true;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 496);
for (i = 0; i < this._segments.length; i++) {
        //Mark datePattern sections in case of relative dates
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 498);
if(this._segments[i].toString().indexOf("text: \"<datePattern>\"") === 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 499);
if(useRelative) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 500);
s.push(relative);
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 502);
datePattern = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 503);
continue;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 505);
if(this._segments[i].toString().indexOf("text: \"</datePattern>\"") === 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 506);
datePattern = false;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 507);
continue;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 509);
if(!datePattern || !useRelative) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 510);
s.push(this._segments[i].format(object));
        }
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 513);
return s.join("");
};

//
// Date segment class
//

/**
 * Date Segment in the pattern
 * @class DateSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends Number.__BaseFormat.Segment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object.
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 531);
DateFormat.DateSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "DateSegment", 531);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 532);
DateFormat.DateSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 534);
Y.extend(DateFormat.DateSegment, Format.Segment);

//
// Date era segment class
//

/**
 * Era Segment in the pattern
 * @class EraSegment
 * @for Date.__DateFormat
 * @namespace Date.__DateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__DateFormat} The parent Format object.
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 551);
DateFormat.EraSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "EraSegment", 551);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 552);
DateFormat.EraSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 554);
Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);

/**
 * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 562);
DateFormat.EraSegment.prototype.format = function(/*date*/) {
    // NOTE: Only support current era at the moment...
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 562);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 564);
return this.getFormat().AD;
};

//
// Date year segment class
//

/**
 * Year Segment in the pattern
 * @class YearSegment
 * @namespace Date.__DateFormat
 * @for Date.__DateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__DateFormat} The parent Format object.
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 582);
DateFormat.YearSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "YearSegment", 582);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 583);
DateFormat.YearSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 585);
Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 587);
Y.mix(DateFormat.YearSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 593);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 594);
return "dateYear: \""+this._s+'"';
    },

    /**
     * Format date and get the year segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 603);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 604);
var year = String(date.getFullYear());
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 605);
return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Date._zeroPad(year, this._s.length);
    }
}, true);

//
// Date month segment class
//

/**
 * Month Segment in the pattern
 * @class MonthSegment
 * @namepspace Date.__DateFormat
 * @for Date.__DateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__DateFormat} The parent Format object.
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 624);
DateFormat.MonthSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "MonthSegment", 624);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 625);
DateFormat.MonthSegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 626);
this.initialize();
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 628);
Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 630);
Y.mix(DateFormat.MonthSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 636);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 637);
return "dateMonth: \""+this._s+'"';
    },

    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "initialize", 644);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 645);
DateFormat.MonthSegment.MONTHS = {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 646);
DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [
            ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,
            ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,
            ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,
            ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort
        ];

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 653);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 654);
DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [
            Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,
            Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,
            Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,
            Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium
        ];
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 660);
DateFormat.MonthSegment.MONTHS[DateFormat.LONG] = [
            Formats.monthJanLong, Formats.monthFebLong, Formats.monthMarLong,
            Formats.monthAprLong, Formats.monthMayLong, Formats.monthJunLong,
            Formats.monthJulLong, Formats.monthAugLong, Formats.monthSepLong,
            Formats.monthOctLong, Formats.monthNovLong, Formats.monthDecLong
        ];
    },

    /**
     * Format date and get the month segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 674);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 675);
var month = date.getMonth();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 676);
switch (this._s.length) {
            case 1:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 678);
return String(month + 1);
            case 2:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 680);
return Y.Date._zeroPad(month + 1, 2);
            case 3:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 682);
return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];
            case 5:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 684);
return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 686);
return DateFormat.MonthSegment.MONTHS[DateFormat.LONG][month];
    }
}, true);

//
// Date week segment class
//

/**
 * Week Segment in the pattern
 * @class WeekSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 705);
DateFormat.WeekSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "WeekSegment", 705);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 706);
DateFormat.WeekSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 708);
Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);

/**
 * Format date and get the week segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 716);
DateFormat.WeekSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 716);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 717);
var year = date.getYear(),
        month = date.getMonth(),
        day = date.getDate(),
	ofYear = /w/.test(this._s),
        date2 = new Date(year, ofYear ? 0 : month, 1),
        week = 0;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 723);
while (true) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 724);
week++;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 725);
if (date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 726);
break;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 728);
date2.setDate(date2.getDate() + 7);
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 731);
return Y.Date._zeroPad(week, this._s.length);
};

//
// Date day segment class
//

/**
 * Day Segment in the pattern
 * @class DaySegment
 * @namespace Date.__zDateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 748);
DateFormat.DaySegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "DaySegment", 748);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 749);
DateFormat.DaySegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 751);
Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);

/**
 * Format date and get the day segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 759);
DateFormat.DaySegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 759);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 760);
var month = date.getMonth(),
        day = date.getDate(),
        year = date.getYear(),
        date2;

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 765);
if (/D/.test(this._s) && month > 0) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 766);
do {
            // set date to first day of month and then go back one day
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 768);
date2 = new Date(year, month, 1);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 769);
date2.setDate(0);
			
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 771);
day += date2.getDate();
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 772);
month--;
        }while (month > 0);
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 775);
return Y.Date._zeroPad(day, this._s.length);
};

//
// Date weekday segment class
//

/**
 * Weekday Segment in the pattern
 * @class WeekdaySegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends DateSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 793);
DateFormat.WeekdaySegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "WeekdaySegment", 793);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 794);
DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 795);
this.initialize();
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 797);
Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 799);
Y.mix(DateFormat.WeekdaySegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 805);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 806);
return "dateDay: \""+this._s+'"';
    },

    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "initialize", 813);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 814);
DateFormat.WeekdaySegment.WEEKDAYS = {};
        // NOTE: The short names aren't available in Java so we have to define them.
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 816);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [
            ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,
            ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,
            ShortNames.weekdaySatShort
        ];

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 822);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 823);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [
            Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,
            Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,
            Formats.weekdaySatMedium
        ];
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 828);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.LONG] = [
            Formats.weekdaySunLong, Formats.weekdayMonLong, Formats.weekdayTueLong,
            Formats.weekdayWedLong, Formats.weekdayThuLong, Formats.weekdayFriLong,
            Formats.weekdaySatLong
        ];
    },

    /**
     * Format date and get the weekday segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 841);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 842);
var weekday = date.getDay(),
            style;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 844);
if (/E/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 845);
switch (this._s.length) {
                case 4:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 847);
style = DateFormat.LONG;
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 848);
break;
                case 5:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 850);
style = DateFormat.SHORT;
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 851);
break;
                default:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 853);
style = DateFormat.MEDIUM;
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 855);
return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 857);
return Y.Date._zeroPad(weekday, this._s.length);
    }
}, true);

//
// Time segment class
//

/**
 * Time Segment in the pattern
 * @class TimeSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends Number.__BaseFormat.Segment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 876);
DateFormat.TimeSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "TimeSegment", 876);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 877);
DateFormat.TimeSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 879);
Y.extend(DateFormat.TimeSegment, Y.Date.__BaseFormat.Segment);

//
// Time hour segment class
//

/**
 * Hour Segment in the pattern
 * @class HourSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends TimeSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 896);
DateFormat.HourSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "HourSegment", 896);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 897);
DateFormat.HourSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 899);
Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 901);
Y.mix(DateFormat.HourSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 907);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 908);
return "timeHour: \""+this._s+'"';
    },

    /**
     * Format date and get the hour segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 917);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 918);
var hours = date.getHours();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 919);
if (hours > 12 && /[hK]/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 920);
hours -= 12;
        }
        else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 922);
if (hours === 0 && /[h]/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 923);
hours = 12;
        }}
        /***
            // NOTE: This is commented out to match the Java formatter output
            //       but from the comments for these meta-chars, it doesn't
            //       seem right.
            if (/[Hk]/.test(this._s)) {
                hours--;
            }
        /***/
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 933);
return Y.Date._zeroPad(hours, this._s.length);
    }
}, true);

//
// Time minute segment class
//

/**
 * Minute Segment in the pattern
 * @class MinuteSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends TimeSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 952);
DateFormat.MinuteSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "MinuteSegment", 952);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 953);
DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 955);
Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 957);
Y.mix(DateFormat.MinuteSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 963);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 964);
return "timeMinute: \""+this._s+'"';
    },

    /**
     * Format date and get the minute segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 973);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 974);
var minutes = date.getMinutes();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 975);
return Y.Date._zeroPad(minutes, this._s.length);
    }
}, true);

//
// Time second segment class
//

/**
 * Second Segment in the pattern
 * @class SecondSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends TimeSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 994);
DateFormat.SecondSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "SecondSegment", 994);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 995);
DateFormat.SecondSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 997);
Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);

/**
 * Format date and get the second segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1005);
DateFormat.SecondSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1005);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1006);
var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1007);
return Y.Date._zeroPad(minutes, this._s.length);
};

//
// Time am/pm segment class
//

/**
 * AM/PM Segment in the pattern
 * @class AmPmSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends TimeSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1025);
DateFormat.AmPmSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "AmPmSegment", 1025);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1026);
DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1028);
Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1030);
Y.mix(DateFormat.AmPmSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 1036);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1037);
return "timeAmPm: \""+this._s+'"';
    },

    /**
     * Format date and get the AM/PM segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1046);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1047);
var hours = date.getHours();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1048);
return hours < 12 ? this.getFormat().Formats.periodAm : this.getFormat().Formats.periodPm;
    }
}, true);

//
// Time timezone segment class
//

/**
 * TimeZone Segment in the pattern
 * @class TimezoneSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends TimeSegment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1067);
DateFormat.TimezoneSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "TimezoneSegment", 1067);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1068);
DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1070);
Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1072);
Y.mix(DateFormat.TimezoneSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 1078);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1079);
return "timeTimezone: \""+this._s+'"';
    },

    /**
     * Format date and get the timezone segment.
     * @method format
     * //param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(/*date*/) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1088);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1089);
var timeZone = this.getFormat().timeZone;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1090);
if (/Z/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1091);
return timeZone.getShortName();
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1093);
return this._s.length < 4 ? timeZone.getMediumName() : timeZone.getLongName();
    }
}, true);
    
//
// Non-Gregorian Calendars
//

/*
 * Buddhist Calendar. This is normally used only for Thai locales (th).
 * @class __BuddhistDateFormat
 * @namespace Date
 * @extends __zDateFormat
 * @constructor
 * @private
 * @param pattern {String} The pattern to format date in
 * @param formats {Object} Locale specific data
 * @param timeZoneId {String} Timezone Id according to Olson tz database
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1112);
Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__BuddhistDateFormat", 1112);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1113);
BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);
        
    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1116);
var segments = this._segments, i;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1117);
for(i=0; i<segments.length; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1118);
if(segments[i] instanceof DateFormat.YearSegment) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1119);
segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1120);
if (segments[i] instanceof DateFormat.EraSegment) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1121);
segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);
        }}
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1126);
BuddhistDateFormat = Y.Date.__BuddhistDateFormat;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1127);
Y.extend(BuddhistDateFormat, DateFormat);
    
/**
 * YearSegment class for Buddhist Calender
 * @class YearSegment
 * @namespace Date.__BuddhistDateFormat
 * @extends Date.__zDateFormat.YearSegment
 * @private
 * @constructor
 * @param segment {Date.__zDateFormat.YearSegment}
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1138);
BuddhistDateFormat.YearSegment = function(segment) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "YearSegment", 1138);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1139);
BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1142);
Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);

/**
 * Format date and get the year segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1150);
BuddhistDateFormat.YearSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1150);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1151);
var year = date.getFullYear();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1152);
year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1153);
return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Date._zeroPad(year, this._s.length);
};
    
/**
 * EraSegment class for Buddhist Calender
 * @class EraSegment
 * @for Date.__BuddhistDateFormat
 * @namespace Date.__BuddhistDateFormat
 * @extends Date.__zDateFormat.EraSegment
 * @private
 * @constructor
 * @param segment {Date.__zDateFormat.EraSegment}
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1166);
BuddhistDateFormat.EraSegment = function(segment) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "EraSegment", 1166);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1167);
BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1170);
Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);

/**
 * Format date and get the era segment.
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1178);
BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1178);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1179);
return "BE";    //Only Buddhist Era supported for now
};

/**
 * Wrapper around the zimbra-based DateFormat for use in YUI. API designed to be similar to ICU
 * @class __YDateFormat
 * namespace Date
 * @private
 * @constructor
 * @param {String} [timeZone] TZ database ID for the time zone that should be used.
 *                            If omitted, defaults to the system timezone
 * @param {Number} [dateFormat=0] Selector for the desired date format from Y.Date.DATE_FORMATS.
 * @param {Number} [timeFormat=0] Selector for the desired time format from Y.Date.TIME_FORMATS.
 * @param {Number} [timeZoneFormat=0] Selector for the desired time zone format from Y.Date.TIMEZONE_FORMATS.
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1194);
Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {
        
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YDateFormat", 1194);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1196);
if(timeZone === undefined || timeZone === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1197);
timeZone = Y.Date.Timezone.getTimezoneIdForOffset( new Date().getTimezoneOffset() * -60 );
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1200);
this._Formats = Y.Intl.get(MODULE_NAME);
        
    //If not valid time zone
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1203);
if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {
	_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1204);
Y.error("Could not find timezone: " + timeZone);
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1207);
this._timeZone = timeZone;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1208);
this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1210);
this._dateFormat = dateFormat || 0;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1211);
this._timeFormat = timeFormat || 0;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1212);
this._timeZoneFormat = timeZoneFormat || 0;

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1214);
this._relative = false;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1215);
this._pattern = this._generatePattern();

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1217);
var locale = Y.Intl.getLang(MODULE_NAME);
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1219);
if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {
        //Use buddhist calendar
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1221);
this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);
    } else {
        //Use gregorian calendar
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1224);
this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1228);
YDateFormat = Y.Date.__YDateFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1230);
Y.mix(Y.Date, {
    /**
     * Date Format Style values to use during format/parse
     * @property DATE_FORMATS
     * @type Object
     * @static
     * @final
     * @for Date
     */
    DATE_FORMATS: {
        NONE: 0,
        WYMD_LONG: 1,
        WYMD_ABBREVIATED: 4,
        WYMD_SHORT: 8,
        WMD_LONG: 16,
        WMD_ABBREVIATED: 32,
        WMD_SHORT: 64,
        YMD_LONG: 128,
        YMD_ABBREVIATED: 256,
        YMD_SHORT: 512,
        YM_LONG: 1024,
        MD_LONG: 2048,
        MD_ABBREVIATED: 4096,
        MD_SHORT: 8192,
        W_LONG: 16384,
        W_ABBREVIATED: 32768,
        M_LONG: 65536,
        M_ABBREVIATED: 131072,
        YMD_FULL: 262144,
        RELATIVE_DATE: 524288
    },

    /**
     * Time Format Style values to use during format/parse
     * @property TIME_FORMATS
     * @type Object
     * @static
     * @final
     * @for Date
     */
    TIME_FORMATS: {
        NONE: 0,
        HM_ABBREVIATED: 1,
        HM_SHORT: 2,
        H_ABBREVIATED: 4
    },

    /**
     * Timezone Format Style values to use during format/parse
     * @property TIMEZONE_FORMATS
     * @type Object
     * @static
     * @final
     * @for Date
     */
    TIMEZONE_FORMATS: {
        NONE: 0,
        Z_ABBREVIATED: 1,
        Z_SHORT: 2
    }
});

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1292);
Y.mix(YDateFormat.prototype, {
    /**
     * Generate date pattern for selected format. For internal use only.
     * @method _generateDatePattern
     * @for Date.__YDateFormat
     * @private
     * @return {String} Date pattern
     */
    _generateDatePattern: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateDatePattern", 1300);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1301);
var format = this._dateFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1302);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1303);
format = Y.Date.DATE_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1306);
if(format === null) { return ""; }
        /*jshint bitwise: false*/
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1308);
if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1309);
this._relative = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1310);
format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;
        }
        /*jshint bitwise: true*/
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1313);
switch(format) {
            //Use relative only for formats with day component
            case Y.Date.DATE_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1316);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1317);
return "";
            case Y.Date.DATE_FORMATS.WYMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1319);
return this._Formats.WYMD_long;
            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1321);
return this._Formats.WYMD_abbreviated;
            case Y.Date.DATE_FORMATS.WYMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1323);
return this._Formats.WYMD_short;
            case Y.Date.DATE_FORMATS.WMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1325);
return this._Formats.WMD_long;
            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1327);
return this._Formats.WMD_abbreviated;
            case Y.Date.DATE_FORMATS.WMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1329);
return this._Formats.WMD_short;
            case Y.Date.DATE_FORMATS.YMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1331);
return this._Formats.YMD_long;
            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1333);
return this._Formats.YMD_abbreviated;
            case Y.Date.DATE_FORMATS.YMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1335);
return this._Formats.YMD_short;
            case Y.Date.DATE_FORMATS.YM_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1337);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1338);
return this._Formats.YM_long;
            case Y.Date.DATE_FORMATS.MD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1340);
return this._Formats.MD_long;
            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1342);
return this._Formats.MD_abbreviated;
            case Y.Date.DATE_FORMATS.MD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1344);
return this._Formats.MD_short;
            case Y.Date.DATE_FORMATS.W_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1346);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1347);
return this._Formats.W_long;
            case Y.Date.DATE_FORMATS.W_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1349);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1350);
return this._Formats.W_abbreviated;
            case Y.Date.DATE_FORMATS.M_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1352);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1353);
return this._Formats.M_long;
            case Y.Date.DATE_FORMATS.M_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1355);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1356);
return this._Formats.M_abbreviated;
            case Y.Date.DATE_FORMATS.YMD_FULL:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1358);
return this._Formats.YMD_full;
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1360);
Y.error("Date format given does not exist");	//Error no such pattern.
        }
    },
        
    /**
     * Generate time pattern for selected format. For internal use only
     * @method _generateTimePattern
     * @private
     * @return {String} Time pattern
     */
    _generateTimePattern: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateTimePattern", 1370);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1371);
var format = this._timeFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1372);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1373);
format = Y.Date.TIME_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1376);
if(format === null) { return ""; }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1377);
switch(format) {
            case Y.Date.TIME_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1379);
return "";
            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1381);
return this._Formats.HM_abbreviated;
            case Y.Date.TIME_FORMATS.HM_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1383);
return this._Formats.HM_short;
            case Y.Date.TIME_FORMATS.H_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1385);
return this._Formats.H_abbreviated;
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1387);
Y.error("Time format given does not exist");	//Error no such pattern.
        }
    },
    
    /**
     * Generate time-zone pattern for selected format. For internal use only.
     * @method _generateTimeZonePattern
     * @private
     * @return {String} Time-Zone pattern
     */
    _generateTimeZonePattern: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateTimeZonePattern", 1397);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1398);
var format = this._timeZoneFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1399);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1400);
format = Y.Date.TIMEZONE_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1403);
if(format === null) { return ""; }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1404);
switch(format) {
            case Y.Date.TIMEZONE_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1406);
return "";
            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1408);
return "z";
            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1410);
return "Z";
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1412);
Y.error("Time Zone format given does not exist");	//Error no such pattern.
        }
    },
    
    /**
     * Generate pattern for selected date, time and time-zone formats. For internal use only
     * @method _generatePattern
     * @private
     * @return {String} Combined pattern for date, time and time-zone
     */
    _generatePattern: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generatePattern", 1422);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1423);
var datePattern = this._generateDatePattern(),
            timePattern = this._generateTimePattern(),
            timeZonePattern = this._generateTimeZonePattern(),
            pattern = "";

        //Combine patterns. Mark date pattern part, to use with relative dates.
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1429);
if(datePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1430);
datePattern = "'<datePattern>'" + datePattern + "'</datePattern>'";
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1433);
if(timePattern !== "" && timeZonePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1434);
pattern = this._Formats.DateTimeTimezoneCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1435);
if (timePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1436);
pattern = this._Formats.DateTimeCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1437);
if(timeZonePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1438);
pattern = this._Formats.DateTimezoneCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1439);
if(datePattern !== ""){
            //Just date
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1441);
pattern = "{1}";
        }}}}
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1444);
pattern = pattern.replace("{0}", timePattern).replace("{1}", datePattern).replace("{2}", timeZonePattern);
        
        //Remove unnecessary whitespaces
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1447);
pattern = Y.Lang.trim(pattern.replace(/\s\s+/g, " "));

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1449);
return pattern;
    },

    /**
     * Formats a date
     * @method format
     * @param {Date} date The date to be formatted.
     * @return {String} The formatted string
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1458);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1459);
if(date === null || !Y.Lang.isDate(date)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1460);
Y.error("format called without a date.");
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1463);
var offset = this._timeZoneInstance.getRawOffset() * 1000,
            relativeDate = null,
            today = new Date(),
            tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),
            yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1468);
date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1470);
if(this._relative) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1471);
if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1472);
relativeDate = this._Formats.today;
            }

            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1475);
if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1476);
relativeDate = this._Formats.tomorrow;
            }

            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1479);
if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1480);
relativeDate = this._Formats.yesterday;
            }
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1484);
return this._dateFormatInstance.format(date, relativeDate);
    }
}, true);
/**
 * YRelativeTimeFormat class provides localized formatting of relative time values such as "3 minutes ago".
 * Relative time formats supported are defined by how many units they may include.
 * Relative time is only used for past events. The Relative time formats use appropriate singular/plural/paucal/etc. forms for all languages.
 * In order to keep relative time formats independent of time zones, relative day names such as today, yesterday, or tomorrow are not used.
 */

/**
 * Class to handle relative time formatting
 * @class __YRelativeTimeFormat
 * @namespace Date
 * @private
 * @constructor
 * @param [style='ONE_UNIT_LONG'] {Number|String} Selector for the desired relative time format. Should be key/value from Y.Date.RELATIVE_TIME_FORMATS
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1502);
Y.Date.__YRelativeTimeFormat = function(style) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YRelativeTimeFormat", 1502);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1503);
if(style === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1504);
style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1505);
if(Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1506);
style = Y.Date.RELATIVE_TIME_FORMATS[style];
    }}
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1509);
this.patterns = Y.Intl.get(MODULE_NAME);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1510);
this.style = style;
		
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1512);
switch(style) {
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1514);
this.numUnits = 2;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1515);
this.abbr = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1516);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1518);
this.numUnits = 2;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1519);
this.abbr = false;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1520);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1522);
this.numUnits = 1;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1523);
this.abbr = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1524);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1526);
this.numUnits = 1;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1527);
this.abbr = false;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1528);
break;
        default:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1530);
Y.error("Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS");
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1534);
YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1536);
Y.mix(Y.Date, {
    /**
     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.
     * @property
     * @type Number|function
     * @static
     */
    currentDate: function() { _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "currentDate", 1543);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1543);
return new Date(); },

    /**
     * Format Style values to use during format/parse
     * @property RELATIVE_TIME_FORMATS
     * @type Object
     * @static
     * @final
     * @for Date
     */
    RELATIVE_TIME_FORMATS: {
        ONE_OR_TWO_UNITS_ABBREVIATED: 0,
        ONE_OR_TWO_UNITS_LONG: 1,
        ONE_UNIT_ABBREVIATED: 2,
        ONE_UNIT_LONG: 4
    }
});
	
/**
 * Formats a time value.
 * @method format
 * @for Date.__YRelativeTimeFormat
 * @param {Number} timeValue The time value (seconds since Epoch) to be formatted.
 * @param {Number} [relativeTo=Current Time] The time value (seconds since Epoch) in relation to which timeValue should be formatted.
          It must be greater than or equal to timeValue
 * @return {String} The formatted string
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1570);
YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1570);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1571);
if(relativeTo === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1572);
relativeTo = (new Date()).getTime()/1000;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1573);
if(timeValue > relativeTo) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1574);
Y.error("timeValue must be in the past");
        }
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1576);
if(timeValue > relativeTo) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1577);
Y.error("relativeTo must be greater than or equal to timeValue");
    }}

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1580);
var date = new Date((relativeTo - timeValue)*1000),
        result = [],
        numUnits = this.numUnits,
        value = date.getUTCFullYear() - 1970,	//Need zero-based index
        text, pattern, i;
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1586);
if(value > 0) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1587);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1588);
text = value + " " + (value !== 1 ? this.patterns.years_abbr : this.patterns.year_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1589);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1591);
text = value + " " + (value !== 1 ? this.patterns.years : this.patterns.year);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1592);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1594);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1597);
value = date.getUTCMonth();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1598);
if((numUnits > 0) && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1599);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1600);
text = value + " " + (value !== 1 ? this.patterns.months_abbr : this.patterns.month_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1601);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1603);
text = value + " " + (value !== 1 ? this.patterns.months : this.patterns.month);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1604);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1606);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1609);
value = date.getUTCDate()-1;			//Need zero-based index
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1610);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1611);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1612);
text = value + " " + (value !== 1 ? this.patterns.days_abbr : this.patterns.day_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1613);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1615);
text = value + " " + (value !== 1 ? this.patterns.days : this.patterns.day);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1616);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1618);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1621);
value = date.getUTCHours();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1622);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1623);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1624);
text = value + " " + (value !== 1 ? this.patterns.hours_abbr : this.patterns.hour_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1625);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1627);
text = value + " " + (value !== 1 ? this.patterns.hours : this.patterns.hour);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1628);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1630);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1633);
value = date.getUTCMinutes();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1634);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1635);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1636);
text = value + " " + (value !== 1 ? this.patterns.minutes_abbr : this.patterns.minute_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1637);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1639);
text = value + " " + (value !== 1 ? this.patterns.minutes : this.patterns.minute);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1640);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1642);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1645);
value = date.getUTCSeconds();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1646);
if(result.length === 0 || (numUnits > 0 && (numUnits < this.numUnits || value > 0))) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1647);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1648);
text = value + " " + (value !== 1 ? this.patterns.seconds_abbr : this.patterns.second_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1649);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1651);
text = value + " " + (value !== 1 ? this.patterns.seconds : this.patterns.second);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1652);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1654);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1657);
pattern = (result.length === 1) ? this.patterns["RelativeTime/oneUnit"] : this.patterns["RelativeTime/twoUnits"];
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1659);
for(i=0; i<result.length; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1660);
pattern = pattern.replace("{" + i + "}", result[i]);
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1662);
for(i=result.length; i<this.numUnits; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1663);
pattern = pattern.replace("{" + i + "}", "");
    }
    //Remove unnecessary whitespaces
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1666);
pattern = Y.Lang.trim(pattern.replace(/\s+/g, " "));
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1668);
return pattern;
};
/**
 * YDurationFormat class formats time in a language independent manner.
 * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages.
 */

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1675);
Y.mix(Y.Date, {
    /**
     * Strip decimal part of argument and return the integer part
     * @method _stripDecimals
     * @static
     * @private
     * @for Date
     * @param floatNum A real number
     * @return Integer part of floatNum
     */
    _stripDecimals: function (floatNum) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_stripDecimals", 1685);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1686);
return floatNum > 0 ? Math.floor(floatNum): Math.ceil(floatNum);
    }
});

/**
 * YDurationFormat class formats time in a language independent manner.
 * @class __YDurationFormat
 * @namespace Date
 * @private
 * @constructor
 * @param style {Number|String} selector for the desired duration format. Can be key/value from Y.Date.DURATION_FORMATS
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1698);
Y.Date.__YDurationFormat = function(style) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YDurationFormat", 1698);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1699);
if(style && Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1700);
style = Y.Date.DURATION_FORMATS[style];
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1702);
this.style = style;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1703);
this.patterns = Y.Intl.get(MODULE_NAME);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1706);
YDurationFormat = Y.Date.__YDurationFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1708);
Y.mix(Y.Date, {
    /**
     * Format Style values to use during format/parse of Duration values
     * @property DURATION_FORMATS
     * @type Object
     * @static
     * @final
     * @for Date
     */
    DURATION_FORMATS: {
        HMS_LONG: 0,
        HMS_SHORT: 1
    }
});

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1723);
Y.mix(YDurationFormat, {
    /**
     * Parse XMLDurationFormat (PnYnMnDTnHnMnS) and return an object with hours, minutes and seconds
     * Any absent values are set to -1, which will be ignored in HMS_long, and set to 0 in HMS_short
     * Year, Month and Day are ignored. Only Hours, Minutes and Seconds are used
     * @method _getDuration_XML
     * @static
     * @private
     * @for Date.__YDurationFormat
     * @param {String} xmlDuration XML Duration String.
     *      The lexical representation for duration is the [ISO 8601] extended format PnYnMnDTnHnMnS,
     *      where nY represents the number of years, nM the number of months, nD the number of days,
     *      'T' is the date/time separator,
     *      nH the number of hours, nM the number of minutes and nS the number of seconds.
     *      The number of seconds can include decimal digits to arbitrary precision.
     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.
     */
    _getDuration_XML: function (xmlDuration) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_getDuration_XML", 1740);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1741);
var regex = new RegExp(/P(\d+Y)?(\d+M)?(\d+D)?T(\d+H)?(\d+M)?(\d+(\.\d+)?S)/),
            matches = xmlDuration.match(regex);
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1744);
if(matches === null) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1745);
Y.error("xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'");
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1748);
return {
            hours: parseInt(matches[4] || -1, 10),
            minutes: parseInt(matches[5] || -1, 10),
            seconds: parseFloat(matches[6] || -1, 10)
        };
    },
    
    /**
     * Get duration from time in seconds.
     * The value should be integer value in seconds, and should not be negative.
     * @method _getDuration_Seconds
     * @static
     * @private
     * @param {Number} timeValueInSeconds Duration in seconds
     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.
     */
    _getDuration_Seconds: function (timeValueInSeconds) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_getDuration_Seconds", 1764);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1765);
var duration = {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1766);
if(timeValueInSeconds < 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1767);
Y.error("TimeValue cannot be negative");
        }
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1770);
duration.hours = Y.Date._stripDecimals(timeValueInSeconds / 3600);
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1772);
timeValueInSeconds %= 3600;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1773);
duration.minutes = Y.Date._stripDecimals(timeValueInSeconds / 60);
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1775);
timeValueInSeconds %= 60;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1776);
duration.seconds = timeValueInSeconds;
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1778);
return duration;
    }
});
    
/**
 * Formats the given value into a duration format string.
 * For XML duration format, the string should be in the pattern PnYnMnDTnHnMnS.
 * Please note that year, month and day fields are ignored in this version.
 * For future compatibility, please do not pass Year/Month/Day in the parameter.
 *
 * For hours, minutes, and seconds, any absent or negative parts are ignored in HMS_long format,
 * but are treated as 0 in HMS_short format style.
 *
 * @method
 * @private
 * @param oDuration {String|Number|Object} Duration as time in seconds (Integer),
          XML duration format (String), or an object with hours, minutes and seconds
 * @return {String} The formatted string
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1797);
YDurationFormat.prototype.format = function(oDuration) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1797);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1798);
if(Y.Lang.isNumber(oDuration)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1799);
oDuration = YDurationFormat._getDuration_Seconds(oDuration);
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1800);
if(Y.Lang.isString(oDuration)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1801);
oDuration = YDurationFormat._getDuration_XML(oDuration);
    }}
    
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1804);
var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,
        result = {
            hours: "",
            minutes: "",
            seconds: ""
        },
        resultPattern = "",
        formatNumber = function(num) { _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "formatNumber", 1811);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1811);
return num; };

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1813);
if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1814);
if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1815);
if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }
   
    //Test minutes and seconds for invalid values
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1818);
if(oDuration.minutes > 59 || oDuration.seconds > 59) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1819);
Y.error("Minutes and Seconds should be less than 60");
    }

    //If number format available, use it, otherwise do not format number.
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1823);
if (Y.Number !== undefined && Y.Number.format !== undefined) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1824);
formatNumber = function(num) { _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "formatNumber", 1824);
return Y.Number.format(num); };
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1826);
if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1827);
resultPattern = this.patterns.HMS_long;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1828);
if(oDuration.hours >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1829);
result.hours = formatNumber(oDuration.hours) + " " + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1832);
if(oDuration.minutes >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1833);
result.minutes = oDuration.minutes + " " + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1836);
if(oDuration.seconds >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1837);
result.seconds = oDuration.seconds + " " + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);
        }
    } else {                                            //HMS_SHORT
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1840);
resultPattern = this.patterns.HMS_short;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1841);
result = {
             hours: formatNumber(oDuration.hours),
             minutes: Y.Date._zeroPad(oDuration.minutes, 2),
             seconds: Y.Date._zeroPad(oDuration.seconds, 2)
        };
    }
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1848);
resultPattern = resultPattern.replace("{0}", result.hours);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1849);
resultPattern = resultPattern.replace("{1}", result.minutes);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1850);
resultPattern = resultPattern.replace("{2}", result.seconds);
       
    //Remove unnecessary whitespaces
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1853);
resultPattern = Y.Lang.trim(resultPattern.replace(/\s\s+/g, " "));
       
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1855);
return resultPattern;
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1858);
Y.Date.oldFormat = Y.Date.format;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1860);
Y.mix(Y.Date, {
    /**
     * Takes a native JavaScript Date and formats it as a string for display to user. Can be configured with the oConfig parameter.
     * For relative time format, dates are compared to current time. To compare to a different time, set the parameter Y.Date.currentDate
     * Configuration object can have 4 optional parameters:
     *     [dateFormat=0] {String|Number} Date format to use. Should be a key/value from Y.Date.DATE_FORMATS.
     *     [timeFormat=0] {String|Number} Time format to use. Should be a key/value from Y.Date.TIME_FORMATS.
     *     [timezoneFormat=0] {String|Number} Timezone format to use. Should be a key/value from Y.Date.TIMEZONE_FORMATS.
     *     [relativeTimeFormat=0] {String|Number} RelativeTime format to use. Should be a key/value from Y.Date.RELATIVE_TIME_FORMATS.
     *     [format] {HTML} Format string as pattern. This is passed to the Y.Date.format method from datatype-date-format module.
                           If this parameter is used, the other three will be ignored.
     * @for Date
     * @method format
     * @param oDate {Date} Date
     * @param [oConfig] {Object} Object literal of configuration values.
     * @return {String} string representation of the date
     * @example
            var date = new Date();
            Y.Date.format(date, { timeFormat: "HM_SHORT", timezoneFormat: "Z_SHORT" });
            Y.Date.format(date, { dateFormat: "YMD_FULL", timeFormat: "HM_SHORT", timezoneFormat: "Z_SHORT" });
            Y.Date.format(date, { dateFormat: "YMD_FULL" });
            Y.Date.format(date, { relativeTimeFormat: "ONE_OR_TWO_UNITS_LONG" });
            Y.Date.format(date, { format: "%Y-%m-%d"});
     */
    format: function(oDate, oConfig) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1884);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1885);
oConfig = oConfig || {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1886);
if(oConfig.format && Y.Lang.isString(oConfig.format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1887);
return Y.Date.oldFormat(oDate, oConfig);
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1890);
if(!Y.Lang.isDate(oDate)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1891);
return Y.Lang.isValue(oDate) ? oDate : "";
        }
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1894);
var formatter, relativeTo;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1895);
if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1896);
formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1897);
return formatter.format(oDate);
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1900);
relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1901);
if(oConfig.relativeTimeFormat) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1902);
formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1903);
return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1906);
Y.error("Unrecognized format options.");
    },

    /**
     * Returns a string representation of the duration
     * @method format
     * @param oDuration {String|Number|Object} Duration as time in seconds, xml duration format, or an object with hours, minutes and seconds
     * @param [oConfig] {Object} Configuration object. Used to pass style parameter to the method.
                        'style' can be a string (HMS_LONG/HMS_SHORT) or the numerical values in Y.Date.DURATION_FORMATS
     * @return {String} string representation of the duration
     * @example
                Y.Date.formatDuration(3601, { style: "HMS_LONG" });
                Y.Date.formatDuration("PT11H22M33S", { style: "HMS_SHORT" });
                Y.Date.formatDuration({ hours: 1, minutes: 40 }, { style: "HMS_SHORT" });
                Y.Date.formatDuration({ hours: 1, minutes: 40, seconds: 5 }, { style: "HMS_LONG" });
     */
    formatDuration: function(oDuration, oConfig) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "formatDuration", 1922);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1923);
oConfig = oConfig || {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1924);
return new YDurationFormat(oConfig.style).format(oDuration);
    }
}, true);


}, '@VERSION@', {
    "lang": [
        "af",
        "am",
        "ar-DZ",
        "ar-JO",
        "ar",
        "ar-LB",
        "ar-MA",
        "ar-SY",
        "ar-TN",
        "as",
        "az-Cyrl",
        "az",
        "be",
        "bg",
        "bn-IN",
        "bn",
        "bo",
        "ca",
        "cs",
        "cy",
        "da",
        "de-AT",
        "de-BE",
        "de",
        "el",
        "en-AU",
        "en-BE",
        "en-BW",
        "en-CA",
        "en-GB",
        "en-HK",
        "en-IE",
        "en-IN",
        "en-JO",
        "en-MT",
        "en-MY",
        "en-NZ",
        "en-PH",
        "en-RH",
        "en-SG",
        "en-US",
        "en-US-POSIX",
        "en-ZA",
        "en-ZW",
        "eo",
        "es-AR",
        "es-CL",
        "es-CO",
        "es-EC",
        "es-GT",
        "es-HN",
        "es",
        "es-PA",
        "es-PE",
        "es-PR",
        "es-US",
        "et",
        "eu",
        "fa-AF",
        "fa",
        "fi",
        "fil",
        "fo",
        "fr-BE",
        "fr-CA",
        "fr-CH",
        "fr",
        "ga",
        "gl",
        "gsw",
        "gu",
        "gv",
        "ha",
        "haw",
        "he",
        "hi",
        "hr",
        "hu",
        "hy",
        "id",
        "ii",
        "in",
        "is",
        "it-CH",
        "it",
        "iw",
        "ja-JP-TRADITIONAL",
        "ja",
        "",
        "ka",
        "kk",
        "kl",
        "km",
        "kn",
        "ko",
        "kok",
        "kw",
        "lt",
        "lv",
        "mk",
        "ml",
        "mr",
        "ms-BN",
        "ms",
        "mt",
        "nb",
        "ne-IN",
        "ne",
        "nl-BE",
        "nl",
        "nn",
        "no",
        "no-NO-NY",
        "om",
        "or",
        "pa-Arab",
        "pa",
        "pa-PK",
        "pl",
        "ps",
        "pt",
        "pt-PT",
        "ro",
        "ru",
        "ru-UA",
        "sh",
        "si",
        "sk",
        "sl",
        "so",
        "sq",
        "sr-BA",
        "sr-Cyrl-BA",
        "sr",
        "sr-Latn",
        "sr-Latn-ME",
        "sr-ME",
        "sv-FI",
        "sv",
        "sw",
        "ta",
        "te",
        "th",
        "ti-ER",
        "ti",
        "tl",
        "tr",
        "uk",
        "ur-IN",
        "ur",
        "ur-PK",
        "uz",
        "uz-Latn",
        "vi",
        "zh-Hans-SG",
        "zh-Hant-HK",
        "zh-Hant",
        "zh-Hant-MO",
        "zh-HK",
        "zh",
        "zh-MO",
        "zh-SG",
        "zh-TW",
        "zu"
    ],
    "requires": [
        "gallery-advanced-date-timezone"
    ]
});
