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
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].code=["YUI.add('gallery-advanced-date-format', function (Y, NAME) {","","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","","var MODULE_NAME = \"gallery-advanced-date-format\",","    Format, ShortNames, DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat;","","/**"," * This module provides absolute/relative date and time formatting, as well as duration formatting"," * Applications can choose date, time, and time zone components separately."," * For dates, relative descriptions (English \"yesterday\", German \"vorgestern\", Japanese \"後天\") are also supported."," *"," * This module uses a few modified parts of zimbra AjxFormat to handle dates and time."," *"," * Absolute formats use the default calendar specified in CLDR for each locale."," * Currently this means the Buddhist calendar for Thailand; the Gregorian calendar for all other countries."," * However, you can specify other calendars using language subtags;"," * for example, for Thai the Gregorian calendar can be specified as th-TH-u-ca-gregory."," *"," * Relative time formats only support times in the past. It can represent times like \"1 hour 5 minutes ago\""," *"," * @module datatype-date-advanced-format"," * @requires datatype-date-timezone, datatype-date-format, datatype-number-advanced-format"," */","","Format = Y.Number.__BaseFormat;","","ShortNames = {","        \"weekdayMonShort\":\"M\",","        \"weekdayTueShort\":\"T\",","        \"weekdayWedShort\":\"W\",","        \"weekdayThuShort\":\"T\",","        \"weekdayFriShort\":\"F\",","        \"weekdaySatShort\":\"S\",","        \"weekdaySunShort\":\"S\",","        \"monthJanShort\":\"J\",","        \"monthFebShort\":\"F\",","        \"monthMarShort\":\"M\",","        \"monthAprShort\":\"A\",","        \"monthMayShort\":\"M\",","        \"monthJunShort\":\"J\",","        \"monthJulShort\":\"J\",","        \"monthAugShort\":\"A\",","        \"monthSepShort\":\"S\",","        \"monthOctShort\":\"O\",","        \"monthNovShort\":\"N\",","        \"monthDecShort\":\"D\"","};","    ","//","// Date format class","//","","/**"," * The DateFormat class formats Date objects according to a specified pattern."," * The patterns are defined the same as the SimpleDateFormat class in the Java libraries."," *"," * Note:"," * The date format differs from the Java patterns a few ways: the pattern"," * \"EEEEE\" (5 'E's) denotes a <em>short</em> weekday and the pattern \"MMMMM\""," * (5 'M's) denotes a <em>short</em> month name. This matches the extended"," * pattern found in the Common Locale Data Repository (CLDR) found at:"," * http://www.unicode.org/cldr/."," *"," * @class __zDateFormat"," * @extends Number.__BaseFormat"," * @namespace Date"," * @private"," * @constructor"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {","    DateFormat.superclass.constructor.call(this, pattern, formats);","    this.timeZone = new Y.Date.Timezone(timeZoneId);","        ","    if (pattern === null) {","        return;","    }","    var head, tail, segment, i, c, count, field;","    for (i = 0; i < pattern.length; i++) {","        // literal","        c = pattern.charAt(i);","        if (c === \"'\") {","            head = i + 1;","            for (i++ ; i < pattern.length; i++) {","                c = pattern.charAt(i);","                if (c === \"'\") {","                    if (i + 1 < pattern.length && pattern.charAt(i + 1) === \"'\") {","                        pattern = pattern.substr(0, i) + pattern.substr(i + 1);","                    }","                    else {","                        break;","                    }","                }","            }","            if (i === pattern.length) {","		Y.error(\"unterminated string literal\");","            }","            tail = i;","            segment = new Format.TextSegment(this, pattern.substring(head, tail));","            this._segments.push(segment);","            continue;","        }","","        // non-meta chars","        head = i;","        while(i < pattern.length) {","            c = pattern.charAt(i);","            if (DateFormat._META_CHARS.indexOf(c) !== -1 || c === \"'\") {","                break;","            }","            i++;","        }","        tail = i;","        if (head !== tail) {","            segment = new Format.TextSegment(this, pattern.substring(head, tail));","            this._segments.push(segment);","            i--;","            continue;","        }","		","        // meta char","        head = i;","        while(++i < pattern.length) {","            if (pattern.charAt(i) !== c) {","                break;","            }","        }","        tail = i--;","        count = tail - head;","        field = pattern.substr(head, count);","        segment = null;","        switch (c) {","            case 'G':","                segment = new DateFormat.EraSegment(this, field);","                break;","            case 'y':","                segment = new DateFormat.YearSegment(this, field);","                break;","            case 'M':","                segment = new DateFormat.MonthSegment(this, field);","                break;","            case 'w':","            case 'W':","                segment = new DateFormat.WeekSegment(this, field);","                break;","            case 'D':","            case 'd':","                segment = new DateFormat.DaySegment(this, field);","                break;","            case 'F':","            case 'E':","                segment = new DateFormat.WeekdaySegment(this, field);","                break;","            case 'a':","                segment = new DateFormat.AmPmSegment(this, field);","                break;","            case 'H':","            case 'k':","            case 'K':","            case 'h':","                segment = new DateFormat.HourSegment(this, field);","                break;","            case 'm':","                segment = new DateFormat.MinuteSegment(this, field);","                break;","            case 's':","            case 'S':","                segment = new DateFormat.SecondSegment(this, field);","                break;","            case 'z':","            case 'Z':","                segment = new DateFormat.TimezoneSegment(this, field);","                break;","        }","        if (segment !== null) {","            segment._index = this._segments.length;","            this._segments.push(segment);","        }","    }","};","","DateFormat = Y.Date.__zDateFormat;","Y.extend(DateFormat, Format);","","// Constants","","Y.mix(DateFormat, {","	SHORT: 0,","	MEDIUM: 1,","	LONG: 2,","	DEFAULT: 1,","	_META_CHARS: \"GyMwWDdFEaHkKhmsSzZ\"","});","","/**"," * Format the date"," * @method format"," * @param object {Date} The date to be formatted"," * @param [relative=false] {Boolean} Whether relative dates should be used."," * @return {String} Formatted result"," */","DateFormat.prototype.format = function(object, relative) {","    var useRelative = false,","        s = [],","        datePattern = false,","        i;","","    if(relative !== null && relative !== \"\") {","        useRelative = true;","    }","","    for (i = 0; i < this._segments.length; i++) {","        //Mark datePattern sections in case of relative dates","        if(this._segments[i].toString().indexOf(\"text: \\\"<datePattern>\\\"\") === 0) {","            if(useRelative) {","                s.push(relative);","            }","            datePattern = true;","            continue;","        }","        if(this._segments[i].toString().indexOf(\"text: \\\"</datePattern>\\\"\") === 0) {","            datePattern = false;","            continue;","        }","        if(!datePattern || !useRelative) {","            s.push(this._segments[i].format(object));","        }","    }","    return s.join(\"\");","};","","//","// Date segment class","//","","/**"," * Date Segment in the pattern"," * @class DateSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Number.__BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.DateSegment = function(format, s) {","    DateFormat.DateSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DateSegment, Format.Segment);","","//","// Date era segment class","//","","/**"," * Era Segment in the pattern"," * @class EraSegment"," * @for Date.__DateFormat"," * @namespace Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.EraSegment = function(format, s) {","    DateFormat.EraSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);","","/**"," * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD"," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.EraSegment.prototype.format = function(/*date*/) {","    // NOTE: Only support current era at the moment...","    return this.getFormat().AD;","};","","//","// Date year segment class","//","","/**"," * Year Segment in the pattern"," * @class YearSegment"," * @namespace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.YearSegment = function(format, s) {","    DateFormat.YearSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.YearSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateYear: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the year segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var year = String(date.getFullYear());","        return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Date._zeroPad(year, this._s.length);","    }","}, true);","","//","// Date month segment class","//","","/**"," * Month Segment in the pattern"," * @class MonthSegment"," * @namepspace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.MonthSegment = function(format, s) {","    DateFormat.MonthSegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.MonthSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateMonth: \\\"\"+this._s+'\"';","    },","","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.MonthSegment.MONTHS = {};","        DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [","            ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,","            ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,","            ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,","            ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [","            Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,","            Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,","            Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,","            Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium","        ];","        DateFormat.MonthSegment.MONTHS[DateFormat.LONG] = [","            Formats.monthJanLong, Formats.monthFebLong, Formats.monthMarLong,","            Formats.monthAprLong, Formats.monthMayLong, Formats.monthJunLong,","            Formats.monthJulLong, Formats.monthAugLong, Formats.monthSepLong,","            Formats.monthOctLong, Formats.monthNovLong, Formats.monthDecLong","        ];","    },","","    /**","     * Format date and get the month segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var month = date.getMonth();","        switch (this._s.length) {","            case 1:","                return String(month + 1);","            case 2:","                return Y.Date._zeroPad(month + 1, 2);","            case 3:","                return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];","            case 5:","                return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];","        }","        return DateFormat.MonthSegment.MONTHS[DateFormat.LONG][month];","    }","}, true);","","//","// Date week segment class","//","","/**"," * Week Segment in the pattern"," * @class WeekSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekSegment = function(format, s) {","    DateFormat.WeekSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);","","/**"," * Format date and get the week segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.WeekSegment.prototype.format = function(date) {","    var year = date.getYear(),","        month = date.getMonth(),","        day = date.getDate(),","	ofYear = /w/.test(this._s),","        date2 = new Date(year, ofYear ? 0 : month, 1),","        week = 0;","    while (true) {","        week++;","        if (date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day)) {","            break;","        }","        date2.setDate(date2.getDate() + 7);","    }","","    return Y.Date._zeroPad(week, this._s.length);","};","","//","// Date day segment class","//","","/**"," * Day Segment in the pattern"," * @class DaySegment"," * @namespace Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.DaySegment = function(format, s) {","    DateFormat.DaySegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);","","/**"," * Format date and get the day segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.DaySegment.prototype.format = function(date) {","    var month = date.getMonth(),","        day = date.getDate(),","        year = date.getYear(),","        date2;","","    if (/D/.test(this._s) && month > 0) {","        do {","            // set date to first day of month and then go back one day","            date2 = new Date(year, month, 1);","            date2.setDate(0);","			","            day += date2.getDate();","            month--;","        } while (month > 0);","    }","    return Y.Date._zeroPad(day, this._s.length);","};","","//","// Date weekday segment class","//","","/**"," * Weekday Segment in the pattern"," * @class WeekdaySegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekdaySegment = function(format, s) {","    DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);","","Y.mix(DateFormat.WeekdaySegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"dateDay: \\\"\"+this._s+'\"';","    },","","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.WeekdaySegment.WEEKDAYS = {};","        // NOTE: The short names aren't available in Java so we have to define them.","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [","            ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,","            ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,","            ShortNames.weekdaySatShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [","            Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,","            Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,","            Formats.weekdaySatMedium","        ];","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.LONG] = [","            Formats.weekdaySunLong, Formats.weekdayMonLong, Formats.weekdayTueLong,","            Formats.weekdayWedLong, Formats.weekdayThuLong, Formats.weekdayFriLong,","            Formats.weekdaySatLong","        ];","    },","","    /**","     * Format date and get the weekday segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var weekday = date.getDay(),","            style;","        if (/E/.test(this._s)) {","            switch (this._s.length) {","                case 4:","                    style = DateFormat.LONG;","                    break;","                case 5:","                    style = DateFormat.SHORT;","                    break;","                default:","                    style = DateFormat.MEDIUM;","            }","            return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];","        }","        return Y.Date._zeroPad(weekday, this._s.length);","    }","}, true);","","//","// Time segment class","//","","/**"," * Time Segment in the pattern"," * @class TimeSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Number.__BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimeSegment = function(format, s) {","    DateFormat.TimeSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimeSegment, Y.Number.__BaseFormat.Segment);","","//","// Time hour segment class","//","","/**"," * Hour Segment in the pattern"," * @class HourSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.HourSegment = function(format, s) {","    DateFormat.HourSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.HourSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeHour: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the hour segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        if (hours > 12 && /[hK]/.test(this._s)) {","            hours -= 12;","        }","        else if (hours === 0 && /[h]/.test(this._s)) {","            hours = 12;","        }","        /***","            // NOTE: This is commented out to match the Java formatter output","            //       but from the comments for these meta-chars, it doesn't","            //       seem right.","            if (/[Hk]/.test(this._s)) {","                hours--;","            }","        /***/","        return Y.Date._zeroPad(hours, this._s.length);","    }","}, true);","","//","// Time minute segment class","//","","/**"," * Minute Segment in the pattern"," * @class MinuteSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.MinuteSegment = function(format, s) {","    DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.MinuteSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeMinute: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the minute segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var minutes = date.getMinutes();","        return Y.Date._zeroPad(minutes, this._s.length);","    }","}, true);","","//","// Time second segment class","//","","/**"," * Second Segment in the pattern"," * @class SecondSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.SecondSegment = function(format, s) {","    DateFormat.SecondSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);","","/**"," * Format date and get the second segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.SecondSegment.prototype.format = function(date) {","    var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();","    return Y.Date._zeroPad(minutes, this._s.length);","};","","//","// Time am/pm segment class","//","","/**"," * AM/PM Segment in the pattern"," * @class AmPmSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.AmPmSegment = function(format, s) {","    DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.AmPmSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeAmPm: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the AM/PM segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        return hours < 12 ? this.getFormat().Formats.periodAm : this.getFormat().Formats.periodPm;","    }","}, true);","","//","// Time timezone segment class","//","","/**"," * TimeZone Segment in the pattern"," * @class TimezoneSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimezoneSegment = function(format, s) {","    DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.TimezoneSegment.prototype, {","    /**","     * Return a string representation of the object","     * @method toString","     * @return {String}","     */","    toString: function() {","        return \"timeTimezone: \\\"\"+this._s+'\"';","    },","","    /**","     * Format date and get the timezone segment.","     * @method format","     * //param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(/*date*/) {","        var timeZone = this.getFormat().timeZone;","        if (/Z/.test(this._s)) {","            return timeZone.getShortName();","        }","        return this._s.length < 4 ? timeZone.getMediumName() : timeZone.getLongName();","    }","}, true);","    ","//","// Non-Gregorian Calendars","//","","/*"," * Buddhist Calendar. This is normally used only for Thai locales (th)."," * @class __BuddhistDateFormat"," * @namespace Date"," * @extends __zDateFormat"," * @constructor"," * @private"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {","    BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);","        ","    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar","    var segments = this._segments, i;","    for(i=0; i<segments.length; i++) {","        if(segments[i] instanceof DateFormat.YearSegment) {","            segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);","        } else if (segments[i] instanceof DateFormat.EraSegment) {","            segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);","        }","    }","};","","BuddhistDateFormat = Y.Date.__BuddhistDateFormat;","Y.extend(BuddhistDateFormat, DateFormat);","    ","/**"," * YearSegment class for Buddhist Calender"," * @class YearSegment"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.YearSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.YearSegment}"," */","BuddhistDateFormat.YearSegment = function(segment) {","    BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);","","/**"," * Format date and get the year segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.YearSegment.prototype.format = function(date) {","    var year = date.getFullYear();","    year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC","    return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Date._zeroPad(year, this._s.length);","};","    ","/**"," * EraSegment class for Buddhist Calender"," * @class EraSegment"," * @for Date.__BuddhistDateFormat"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.EraSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.EraSegment}"," */","BuddhistDateFormat.EraSegment = function(segment) {","    BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);","","/**"," * Format date and get the era segment."," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {","    return \"BE\";    //Only Buddhist Era supported for now","};","","/**"," * Wrapper around the zimbra-based DateFormat for use in YUI. API designed to be similar to ICU"," * @class __YDateFormat"," * namespace Date"," * @private"," * @constructor"," * @param {String} [timeZone] TZ database ID for the time zone that should be used."," *                            If omitted, defaults to the system timezone"," * @param {Number} [dateFormat=0] Selector for the desired date format from Y.Date.DATE_FORMATS."," * @param {Number} [timeFormat=0] Selector for the desired time format from Y.Date.TIME_FORMATS."," * @param {Number} [timeZoneFormat=0] Selector for the desired time zone format from Y.Date.TIMEZONE_FORMATS."," */","Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {","        ","    if(timeZone === undefined || timeZone === null) {","        timeZone = Y.Date.Timezone.getTimezoneIdForOffset( new Date().getTimezoneOffset() * -60 );","    }","","    this._Formats = Y.Intl.get(MODULE_NAME);","        ","    //If not valid time zone","    if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {","	Y.error(\"Could not find timezone: \" + timeZone);","    }","","    this._timeZone = timeZone;","    this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);","","    this._dateFormat = dateFormat || 0;","    this._timeFormat = timeFormat || 0;","    this._timeZoneFormat = timeZoneFormat || 0;","","    this._relative = false;","    this._pattern = this._generatePattern();","","    var locale = Y.Intl.getLang(MODULE_NAME);","        ","    if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {","        //Use buddhist calendar","        this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);","    } else {","        //Use gregorian calendar","        this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);","    }","};","","YDateFormat = Y.Date.__YDateFormat;","","Y.mix(Y.Date, {","    /**","     * Date Format Style values to use during format/parse","     * @property DATE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DATE_FORMATS: {","        NONE: 0,","        WYMD_LONG: 1,","        WYMD_ABBREVIATED: 4,","        WYMD_SHORT: 8,","        WMD_LONG: 16,","        WMD_ABBREVIATED: 32,","        WMD_SHORT: 64,","        YMD_LONG: 128,","        YMD_ABBREVIATED: 256,","        YMD_SHORT: 512,","        YM_LONG: 1024,","        MD_LONG: 2048,","        MD_ABBREVIATED: 4096,","        MD_SHORT: 8192,","        W_LONG: 16384,","        W_ABBREVIATED: 32768,","        M_LONG: 65536,","        M_ABBREVIATED: 131072,","        YMD_FULL: 262144,","        RELATIVE_DATE: 524288","    },","","    /**","     * Time Format Style values to use during format/parse","     * @property TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIME_FORMATS: {","        NONE: 0,","        HM_ABBREVIATED: 1,","        HM_SHORT: 2,","        H_ABBREVIATED: 4","    },","","    /**","     * Timezone Format Style values to use during format/parse","     * @property TIMEZONE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIMEZONE_FORMATS: {","        NONE: 0,","        Z_ABBREVIATED: 1,","        Z_SHORT: 2","    }","});","","Y.mix(YDateFormat.prototype, {","    /**","     * Generate date pattern for selected format. For internal use only.","     * @method _generateDatePattern","     * @for Date.__YDateFormat","     * @private","     * @return {String} Date pattern","     */","    _generateDatePattern: function() {","        var format = this._dateFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.DATE_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        /*jshint bitwise: false*/","        if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {","            this._relative = true;","            format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;","        }","        /*jshint bitwise: true*/","        switch(format) {","            //Use relative only for formats with day component","            case Y.Date.DATE_FORMATS.NONE:","                this._relative = false;","                return \"\";","            case Y.Date.DATE_FORMATS.WYMD_LONG:","                return this._Formats.WYMD_long;","            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:","                return this._Formats.WYMD_abbreviated;","            case Y.Date.DATE_FORMATS.WYMD_SHORT:","                return this._Formats.WYMD_short;","            case Y.Date.DATE_FORMATS.WMD_LONG:","                return this._Formats.WMD_long;","            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:","                return this._Formats.WMD_abbreviated;","            case Y.Date.DATE_FORMATS.WMD_SHORT:","                return this._Formats.WMD_short;","            case Y.Date.DATE_FORMATS.YMD_LONG:","                return this._Formats.YMD_long;","            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:","                return this._Formats.YMD_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_SHORT:","                return this._Formats.YMD_short;","            case Y.Date.DATE_FORMATS.YM_LONG:","                this._relative = false;","                return this._Formats.YM_long;","            case Y.Date.DATE_FORMATS.MD_LONG:","                return this._Formats.MD_long;","            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:","                return this._Formats.MD_abbreviated;","            case Y.Date.DATE_FORMATS.MD_SHORT:","                return this._Formats.MD_short;","            case Y.Date.DATE_FORMATS.W_LONG:","                this._relative = false;","                return this._Formats.W_long;","            case Y.Date.DATE_FORMATS.W_ABBREVIATED:","                this._relative = false;","                return this._Formats.W_abbreviated;","            case Y.Date.DATE_FORMATS.M_LONG:","                this._relative = false;","                return this._Formats.M_long;","            case Y.Date.DATE_FORMATS.M_ABBREVIATED:","                this._relative = false;","                return this._Formats.M_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_FULL:","                return this._Formats.YMD_full;","            default:","                Y.error(\"Date format given does not exist\");	//Error no such pattern.","        }","    },","        ","    /**","     * Generate time pattern for selected format. For internal use only","     * @method _generateTimePattern","     * @private","     * @return {String} Time pattern","     */","    _generateTimePattern: function() {","        var format = this._timeFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIME_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        switch(format) {","            case Y.Date.TIME_FORMATS.NONE:","                return \"\";","            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:","                return this._Formats.HM_abbreviated;","            case Y.Date.TIME_FORMATS.HM_SHORT:","                return this._Formats.HM_short;","            case Y.Date.TIME_FORMATS.H_ABBREVIATED:","                return this._Formats.H_abbreviated;","            default:","                Y.error(\"Time format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate time-zone pattern for selected format. For internal use only.","     * @method _generateTimeZonePattern","     * @private","     * @return {String} Time-Zone pattern","     */","    _generateTimeZonePattern: function() {","        var format = this._timeZoneFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIMEZONE_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        switch(format) {","            case Y.Date.TIMEZONE_FORMATS.NONE:","                return \"\";","            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:","                return \"z\";","            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:","                return \"Z\";","            default:","                Y.error(\"Time Zone format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate pattern for selected date, time and time-zone formats. For internal use only","     * @method _generatePattern","     * @private","     * @return {String} Combined pattern for date, time and time-zone","     */","    _generatePattern: function() {","        var datePattern = this._generateDatePattern(),","            timePattern = this._generateTimePattern(),","            timeZonePattern = this._generateTimeZonePattern(),","            pattern = \"\";","","        //Combine patterns. Mark date pattern part, to use with relative dates.","        if(datePattern !== \"\") {","            datePattern = \"'<datePattern>'\" + datePattern + \"'</datePattern>'\";","        }","        ","        if(timePattern !== \"\" && timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimeTimezoneCombination;","        } else if (timePattern !== \"\") {","            pattern = this._Formats.DateTimeCombination;","        } else if(timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimezoneCombination;","        } else if(datePattern !== \"\"){","            //Just date","            pattern = \"{1}\";","        }","        ","        pattern = pattern.replace(\"{0}\", timePattern).replace(\"{1}\", datePattern).replace(\"{2}\", timeZonePattern);","        ","        //Remove unnecessary whitespaces","        pattern = Y.Lang.trim(pattern.replace(/\\s\\s+/g, \" \"));","","        return pattern;","    },","","    /**","     * Formats a date","     * @method format","     * @param {Date} date The date to be formatted.","     * @return {String} The formatted string","     */","    format: function(date) {","        if(date === null || !Y.Lang.isDate(date)) {","            Y.error(\"format called without a date.\");","        }","        ","        var offset = this._timeZoneInstance.getRawOffset() * 1000,","            relativeDate = null,","            today = new Date(),","            tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),","            yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);","        date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);","","        if(this._relative) {","            if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {","                relativeDate = this._Formats.today;","            }","","            if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {","                relativeDate = this._Formats.tomorrow;","            }","","            if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {","                relativeDate = this._Formats.yesterday;","            }","        }","","        return this._dateFormatInstance.format(date, relativeDate);","    }","}, true);","/**"," * YRelativeTimeFormat class provides localized formatting of relative time values such as \"3 minutes ago\"."," * Relative time formats supported are defined by how many units they may include."," * Relative time is only used for past events. The Relative time formats use appropriate singular/plural/paucal/etc. forms for all languages."," * In order to keep relative time formats independent of time zones, relative day names such as today, yesterday, or tomorrow are not used."," */","","/**"," * Class to handle relative time formatting"," * @class __YRelativeTimeFormat"," * @namespace Date"," * @private"," * @constructor"," * @param [style='ONE_UNIT_LONG'] {Number|String} Selector for the desired relative time format. Should be key/value from Y.Date.RELATIVE_TIME_FORMATS"," */","Y.Date.__YRelativeTimeFormat = function(style) {","    if(style === null) {","        style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;","    } else if(Y.Lang.isString(style)) {","        style = Y.Date.RELATIVE_TIME_FORMATS[style];","    }","        ","    this.patterns = Y.Intl.get(MODULE_NAME);","    this.style = style;","		","    switch(style) {","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:","            this.numUnits = 2;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:","            this.numUnits = 2;","            this.abbr = false;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:","            this.numUnits = 1;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:","            this.numUnits = 1;","            this.abbr = false;","            break;","        default:","            Y.error(\"Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS\");","    }","};","","YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;","","Y.mix(Y.Date, {","    /**","     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.","     * @property","     * @type Number|function","     * @static","     */","    currentDate: function() { return new Date(); },","","    /**","     * Format Style values to use during format/parse","     * @property RELATIVE_TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    RELATIVE_TIME_FORMATS: {","        ONE_OR_TWO_UNITS_ABBREVIATED: 0,","        ONE_OR_TWO_UNITS_LONG: 1,","        ONE_UNIT_ABBREVIATED: 2,","        ONE_UNIT_LONG: 4","    }","});","	","/**"," * Formats a time value."," * @method format"," * @for Date.__YRelativeTimeFormat"," * @param {Number} timeValue The time value (seconds since Epoch) to be formatted."," * @param {Number} [relativeTo=Current Time] The time value (seconds since Epoch) in relation to which timeValue should be formatted.","          It must be greater than or equal to timeValue"," * @return {String} The formatted string"," */","YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {","    if(relativeTo === null) {","        relativeTo = (new Date()).getTime()/1000;","        if(timeValue > relativeTo) {","            Y.error(\"timeValue must be in the past\");","        }","    } else if(timeValue > relativeTo) {","        Y.error(\"relativeTo must be greater than or equal to timeValue\");","    }","","    var date = new Date((relativeTo - timeValue)*1000),","        result = [],","        numUnits = this.numUnits,","        value = date.getUTCFullYear() - 1970,	//Need zero-based index","        text, pattern, i;","        ","    if(value > 0) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.years_abbr : this.patterns.year_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.years : this.patterns.year);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMonth();","    if((numUnits > 0) && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.months_abbr : this.patterns.month_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.months : this.patterns.month);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCDate()-1;			//Need zero-based index","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.days_abbr : this.patterns.day_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.days : this.patterns.day);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCHours();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.hours_abbr : this.patterns.hour_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.hours : this.patterns.hour);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMinutes();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.minutes_abbr : this.patterns.minute_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.minutes : this.patterns.minute);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCSeconds();","    if(result.length === 0 || (numUnits > 0 && (numUnits < this.numUnits || value > 0))) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.seconds_abbr : this.patterns.second_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.seconds : this.patterns.second);","            result.push(text);","        }","        numUnits--;","    }","","    pattern = (result.length === 1) ? this.patterns[\"RelativeTime/oneUnit\"] : this.patterns[\"RelativeTime/twoUnits\"];","        ","    for(i=0; i<result.length; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", result[i]);","    }","    for(i=result.length; i<this.numUnits; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", \"\");","    }","    //Remove unnecessary whitespaces","    pattern = Y.Lang.trim(pattern.replace(/\\s+/g, \" \"));","        ","    return pattern;","};","/**"," * YDurationFormat class formats time in a language independent manner."," * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages."," */","","Y.mix(Y.Date, {","    /**","     * Strip decimal part of argument and return the integer part","     * @method _stripDecimals","     * @static","     * @private","     * @for Date","     * @param floatNum A real number","     * @return Integer part of floatNum","     */","    _stripDecimals: function (floatNum) {","        return floatNum > 0 ? Math.floor(floatNum): Math.ceil(floatNum);","    }","});","","/**"," * YDurationFormat class formats time in a language independent manner."," * @class __YDurationFormat"," * @namespace Date"," * @private"," * @constructor"," * @param style {Number|String} selector for the desired duration format. Can be key/value from Y.Date.DURATION_FORMATS"," */","Y.Date.__YDurationFormat = function(style) {","    if(style && Y.Lang.isString(style)) {","        style = Y.Date.DURATION_FORMATS[style];","    }","    this.style = style;","    this.patterns = Y.Intl.get(MODULE_NAME);","};","","YDurationFormat = Y.Date.__YDurationFormat;","","Y.mix(Y.Date, {","    /**","     * Format Style values to use during format/parse of Duration values","     * @property DURATION_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DURATION_FORMATS: {","        HMS_LONG: 0,","        HMS_SHORT: 1","    }","});","","Y.mix(YDurationFormat, {","    /**","     * Parse XMLDurationFormat (PnYnMnDTnHnMnS) and return an object with hours, minutes and seconds","     * Any absent values are set to -1, which will be ignored in HMS_long, and set to 0 in HMS_short","     * Year, Month and Day are ignored. Only Hours, Minutes and Seconds are used","     * @method _getDuration_XML","     * @static","     * @private","     * @for Date.__YDurationFormat","     * @param {String} xmlDuration XML Duration String.","     *      The lexical representation for duration is the [ISO 8601] extended format PnYnMnDTnHnMnS,","     *      where nY represents the number of years, nM the number of months, nD the number of days,","     *      'T' is the date/time separator,","     *      nH the number of hours, nM the number of minutes and nS the number of seconds.","     *      The number of seconds can include decimal digits to arbitrary precision.","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_XML: function (xmlDuration) {","        var regex = new RegExp(/P(\\d+Y)?(\\d+M)?(\\d+D)?T(\\d+H)?(\\d+M)?(\\d+(\\.\\d+)?S)/),","            matches = xmlDuration.match(regex);","        ","        if(matches === null) {","            Y.error(\"xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'\");","        }","        ","        return {","            hours: parseInt(matches[4] || -1, 10),","            minutes: parseInt(matches[5] || -1, 10),","            seconds: parseFloat(matches[6] || -1, 10)","        };","    },","    ","    /**","     * Get duration from time in seconds.","     * The value should be integer value in seconds, and should not be negative.","     * @method _getDuration_Seconds","     * @static","     * @private","     * @param {Number} timeValueInSeconds Duration in seconds","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_Seconds: function (timeValueInSeconds) {","        var duration = {};","        if(timeValueInSeconds < 0) {","            Y.error(\"TimeValue cannot be negative\");","        }","                ","        duration.hours = Y.Date._stripDecimals(timeValueInSeconds / 3600);","                ","        timeValueInSeconds %= 3600;","        duration.minutes = Y.Date._stripDecimals(timeValueInSeconds / 60);","                ","        timeValueInSeconds %= 60;","        duration.seconds = timeValueInSeconds;","        ","        return duration;","    }","});","    ","/**"," * Formats the given value into a duration format string."," * For XML duration format, the string should be in the pattern PnYnMnDTnHnMnS."," * Please note that year, month and day fields are ignored in this version."," * For future compatibility, please do not pass Year/Month/Day in the parameter."," *"," * For hours, minutes, and seconds, any absent or negative parts are ignored in HMS_long format,"," * but are treated as 0 in HMS_short format style."," *"," * @method"," * @private"," * @param oDuration {String|Number|Object} Duration as time in seconds (Integer),","          XML duration format (String), or an object with hours, minutes and seconds"," * @return {String} The formatted string"," */","YDurationFormat.prototype.format = function(oDuration) {","    if(Y.Lang.isNumber(oDuration)) {","        oDuration = YDurationFormat._getDuration_Seconds(oDuration);","    } else if(Y.Lang.isString(oDuration)) {","        oDuration = YDurationFormat._getDuration_XML(oDuration);","    }","    ","    var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,","        result = {","            hours: \"\",","            minutes: \"\",","            seconds: \"\"","        },","        resultPattern = \"\";","","    if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }","    if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }","    if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }","   ","    //Test minutes and seconds for invalid values","    if(oDuration.minutes > 59 || oDuration.seconds > 59) {","        Y.error(\"Minutes and Seconds should be less than 60\");","    }","    ","    if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {","        resultPattern = this.patterns.HMS_long;","        if(oDuration.hours >= 0) {","            result.hours = Y.Number.format(oDuration.hours) + \" \" + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);","        }","","        if(oDuration.minutes >= 0) {","            result.minutes = oDuration.minutes + \" \" + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);","        }","","        if(oDuration.seconds >= 0) {","            result.seconds = oDuration.seconds + \" \" + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);","        }","    } else {                                            //HMS_SHORT","        resultPattern = this.patterns.HMS_short;","        result = {","             hours: Y.Number.format(oDuration.hours),","             minutes: Y.Date._zeroPad(oDuration.minutes, 2),","             seconds: Y.Date._zeroPad(oDuration.seconds, 2)","        };","    }","        ","    resultPattern = resultPattern.replace(\"{0}\", result.hours);","    resultPattern = resultPattern.replace(\"{1}\", result.minutes);","    resultPattern = resultPattern.replace(\"{2}\", result.seconds);","       ","    //Remove unnecessary whitespaces","    resultPattern = Y.Lang.trim(resultPattern.replace(/\\s\\s+/g, \" \"));","       ","    return resultPattern;","};","","Y.Date.oldFormat = Y.Date.format;","","Y.mix(Y.Date, {","    /**","     * Takes a native JavaScript Date and formats it as a string for display to user. Can be configured with the oConfig parameter.","     * For relative time format, dates are compared to current time. To compare to a different time, set the parameter Y.Date.currentDate","     * Configuration object can have 4 optional parameters:","     *     [dateFormat=0] {String|Number} Date format to use. Should be a key/value from Y.Date.DATE_FORMATS.","     *     [timeFormat=0] {String|Number} Time format to use. Should be a key/value from Y.Date.TIME_FORMATS.","     *     [timezoneFormat=0] {String|Number} Timezone format to use. Should be a key/value from Y.Date.TIMEZONE_FORMATS.","     *     [relativeTimeFormat=0] {String|Number} RelativeTime format to use. Should be a key/value from Y.Date.RELATIVE_TIME_FORMATS.","     *     [format] {HTML} Format string as pattern. This is passed to the Y.Date.format method from datatype-date-format module.","                           If this parameter is used, the other three will be ignored.","     * @for Date","     * @method format","     * @param oDate {Date} Date","     * @param [oConfig] {Object} Object literal of configuration values.","     * @return {String} string representation of the date","     * @example","            var date = new Date();","            Y.Date.format(date, { timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\", timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\" });","            Y.Date.format(date, { relativeTimeFormat: \"ONE_OR_TWO_UNITS_LONG\" });","            Y.Date.format(date, { format: \"%Y-%m-%d\"});","     */","    format: function(oDate, oConfig) {","        oConfig = oConfig || {};","        if(oConfig.format && Y.Lang.isString(oConfig.format)) {","            return Y.Date.oldFormat(oDate, oConfig);","        }","    ","        if(!Y.Lang.isDate(oDate)) {","            return Y.Lang.isValue(oDate) ? oDate : \"\";","        }","                ","        var formatter, relativeTo;","        if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {","            formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);","            return formatter.format(oDate);","        }","    ","        relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);","        if(oConfig.relativeTimeFormat) {","            formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);","            return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);","        }","","        Y.error(\"Unrecognized format options.\");","    },","","    /**","     * Returns a string representation of the duration","     * @method format","     * @param oDuration {String|Number|Object} Duration as time in seconds, xml duration format, or an object with hours, minutes and seconds","     * @param [oConfig] {Object} Configuration object. Used to pass style parameter to the method.","                        'style' can be a string (HMS_LONG/HMS_SHORT) or the numerical values in Y.Date.DURATION_FORMATS","     * @return {String} string representation of the duration","     * @example","                Y.Date.formatDuration(3601, { style: \"HMS_LONG\" });","                Y.Date.formatDuration(\"PT11H22M33S\", { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40 }, { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40, seconds: 5 }, { style: \"HMS_LONG\" });","     */","    formatDuration: function(oDuration, oConfig) {","        oConfig = oConfig || {};","        return new YDurationFormat(oConfig.style).format(oDuration);","    }","}, true);","","","}, '@VERSION@', {","    \"lang\": [","        \"af\",","        \"am\",","        \"ar-DZ\",","        \"ar-JO\",","        \"ar\",","        \"ar-LB\",","        \"ar-MA\",","        \"ar-SY\",","        \"ar-TN\",","        \"as\",","        \"az-Cyrl\",","        \"az\",","        \"be\",","        \"bg\",","        \"bn-IN\",","        \"bn\",","        \"bo\",","        \"ca\",","        \"cs\",","        \"cy\",","        \"da\",","        \"de-AT\",","        \"de-BE\",","        \"de\",","        \"el\",","        \"en-AU\",","        \"en-BE\",","        \"en-BW\",","        \"en-CA\",","        \"en-GB\",","        \"en-HK\",","        \"en-IE\",","        \"en-IN\",","        \"en-JO\",","        \"en-MT\",","        \"en-MY\",","        \"en-NZ\",","        \"en-PH\",","        \"en-RH\",","        \"en-SG\",","        \"en-US\",","        \"en-US-POSIX\",","        \"en-ZA\",","        \"en-ZW\",","        \"eo\",","        \"es-AR\",","        \"es-CL\",","        \"es-CO\",","        \"es-EC\",","        \"es-GT\",","        \"es-HN\",","        \"es\",","        \"es-PA\",","        \"es-PE\",","        \"es-PR\",","        \"es-US\",","        \"et\",","        \"eu\",","        \"fa-AF\",","        \"fa\",","        \"fi\",","        \"fil\",","        \"fo\",","        \"fr-BE\",","        \"fr-CA\",","        \"fr-CH\",","        \"fr\",","        \"ga\",","        \"gl\",","        \"gsw\",","        \"gu\",","        \"gv\",","        \"ha\",","        \"haw\",","        \"he\",","        \"hi\",","        \"hr\",","        \"hu\",","        \"hy\",","        \"id\",","        \"ii\",","        \"in\",","        \"is\",","        \"it-CH\",","        \"it\",","        \"iw\",","        \"ja-JP-TRADITIONAL\",","        \"ja\",","        \"\",","        \"ka\",","        \"kk\",","        \"kl\",","        \"km\",","        \"kn\",","        \"ko\",","        \"kok\",","        \"kw\",","        \"lt\",","        \"lv\",","        \"mk\",","        \"ml\",","        \"mr\",","        \"ms-BN\",","        \"ms\",","        \"mt\",","        \"nb\",","        \"ne-IN\",","        \"ne\",","        \"nl-BE\",","        \"nl\",","        \"nn\",","        \"no\",","        \"no-NO-NY\",","        \"om\",","        \"or\",","        \"pa-Arab\",","        \"pa\",","        \"pa-PK\",","        \"pl\",","        \"ps\",","        \"pt\",","        \"pt-PT\",","        \"ro\",","        \"ru\",","        \"ru-UA\",","        \"sh\",","        \"si\",","        \"sk\",","        \"sl\",","        \"so\",","        \"sq\",","        \"sr-BA\",","        \"sr-Cyrl-BA\",","        \"sr\",","        \"sr-Latn\",","        \"sr-Latn-ME\",","        \"sr-ME\",","        \"sv-FI\",","        \"sv\",","        \"sw\",","        \"ta\",","        \"te\",","        \"th\",","        \"ti-ER\",","        \"ti\",","        \"tl\",","        \"tr\",","        \"uk\",","        \"ur-IN\",","        \"ur\",","        \"ur-PK\",","        \"uz\",","        \"uz-Latn\",","        \"vi\",","        \"zh-Hans-SG\",","        \"zh-Hant-HK\",","        \"zh-Hant\",","        \"zh-Hant-MO\",","        \"zh-HK\",","        \"zh\",","        \"zh-MO\",","        \"zh-SG\",","        \"zh-TW\",","        \"zu\"","    ],","    \"requires\": [","        \"gallery-advanced-number-format\",","        \"gallery-advanced-date-timezone\"","    ]","});"];
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].lines = {"1":0,"7":0,"28":0,"30":0,"76":0,"77":0,"78":0,"80":0,"81":0,"83":0,"84":0,"86":0,"87":0,"88":0,"89":0,"90":0,"91":0,"92":0,"93":0,"96":0,"100":0,"101":0,"103":0,"104":0,"105":0,"106":0,"110":0,"111":0,"112":0,"113":0,"114":0,"116":0,"118":0,"119":0,"120":0,"121":0,"122":0,"123":0,"127":0,"128":0,"129":0,"130":0,"133":0,"134":0,"135":0,"136":0,"137":0,"139":0,"140":0,"142":0,"143":0,"145":0,"146":0,"149":0,"150":0,"153":0,"154":0,"157":0,"158":0,"160":0,"161":0,"166":0,"167":0,"169":0,"170":0,"173":0,"174":0,"177":0,"178":0,"180":0,"181":0,"182":0,"187":0,"188":0,"192":0,"207":0,"208":0,"213":0,"214":0,"217":0,"219":0,"220":0,"221":0,"223":0,"224":0,"226":0,"227":0,"228":0,"230":0,"231":0,"234":0,"252":0,"253":0,"255":0,"272":0,"273":0,"275":0,"283":0,"285":0,"303":0,"304":0,"306":0,"308":0,"315":0,"325":0,"326":0,"345":0,"346":0,"347":0,"349":0,"351":0,"358":0,"366":0,"367":0,"374":0,"375":0,"381":0,"396":0,"397":0,"399":0,"401":0,"403":0,"405":0,"407":0,"426":0,"427":0,"429":0,"437":0,"438":0,"444":0,"445":0,"446":0,"447":0,"449":0,"452":0,"469":0,"470":0,"472":0,"480":0,"481":0,"486":0,"487":0,"489":0,"490":0,"492":0,"493":0,"496":0,"514":0,"515":0,"516":0,"518":0,"520":0,"527":0,"535":0,"537":0,"543":0,"544":0,"549":0,"563":0,"565":0,"566":0,"568":0,"569":0,"571":0,"572":0,"574":0,"576":0,"578":0,"597":0,"598":0,"600":0,"617":0,"618":0,"620":0,"622":0,"629":0,"639":0,"640":0,"641":0,"643":0,"644":0,"654":0,"673":0,"674":0,"676":0,"678":0,"685":0,"695":0,"696":0,"715":0,"716":0,"718":0,"726":0,"727":0,"728":0,"746":0,"747":0,"749":0,"751":0,"758":0,"768":0,"769":0,"788":0,"789":0,"791":0,"793":0,"800":0,"810":0,"811":0,"812":0,"814":0,"833":0,"834":0,"837":0,"838":0,"839":0,"840":0,"841":0,"842":0,"847":0,"848":0,"859":0,"860":0,"863":0,"871":0,"872":0,"873":0,"874":0,"887":0,"888":0,"891":0,"899":0,"900":0,"915":0,"917":0,"918":0,"921":0,"924":0,"925":0,"928":0,"929":0,"931":0,"932":0,"933":0,"935":0,"936":0,"938":0,"940":0,"942":0,"945":0,"949":0,"951":0,"1013":0,"1022":0,"1023":0,"1024":0,"1027":0,"1029":0,"1030":0,"1031":0,"1034":0,"1037":0,"1038":0,"1040":0,"1042":0,"1044":0,"1046":0,"1048":0,"1050":0,"1052":0,"1054":0,"1056":0,"1058":0,"1059":0,"1061":0,"1063":0,"1065":0,"1067":0,"1068":0,"1070":0,"1071":0,"1073":0,"1074":0,"1076":0,"1077":0,"1079":0,"1081":0,"1092":0,"1093":0,"1094":0,"1097":0,"1098":0,"1100":0,"1102":0,"1104":0,"1106":0,"1108":0,"1119":0,"1120":0,"1121":0,"1124":0,"1125":0,"1127":0,"1129":0,"1131":0,"1133":0,"1144":0,"1150":0,"1151":0,"1154":0,"1155":0,"1156":0,"1157":0,"1158":0,"1159":0,"1160":0,"1162":0,"1165":0,"1168":0,"1170":0,"1180":0,"1181":0,"1184":0,"1189":0,"1191":0,"1192":0,"1193":0,"1196":0,"1197":0,"1200":0,"1201":0,"1205":0,"1223":0,"1224":0,"1225":0,"1226":0,"1227":0,"1230":0,"1231":0,"1233":0,"1235":0,"1236":0,"1237":0,"1239":0,"1240":0,"1241":0,"1243":0,"1244":0,"1245":0,"1247":0,"1248":0,"1249":0,"1251":0,"1255":0,"1257":0,"1264":0,"1291":0,"1292":0,"1293":0,"1294":0,"1295":0,"1297":0,"1298":0,"1301":0,"1307":0,"1308":0,"1309":0,"1310":0,"1312":0,"1313":0,"1315":0,"1318":0,"1319":0,"1320":0,"1321":0,"1322":0,"1324":0,"1325":0,"1327":0,"1330":0,"1331":0,"1332":0,"1333":0,"1334":0,"1336":0,"1337":0,"1339":0,"1342":0,"1343":0,"1344":0,"1345":0,"1346":0,"1348":0,"1349":0,"1351":0,"1354":0,"1355":0,"1356":0,"1357":0,"1358":0,"1360":0,"1361":0,"1363":0,"1366":0,"1367":0,"1368":0,"1369":0,"1370":0,"1372":0,"1373":0,"1375":0,"1378":0,"1380":0,"1381":0,"1383":0,"1384":0,"1387":0,"1389":0,"1396":0,"1407":0,"1419":0,"1420":0,"1421":0,"1423":0,"1424":0,"1427":0,"1429":0,"1444":0,"1462":0,"1465":0,"1466":0,"1469":0,"1486":0,"1487":0,"1488":0,"1491":0,"1493":0,"1494":0,"1496":0,"1497":0,"1499":0,"1518":0,"1519":0,"1520":0,"1521":0,"1522":0,"1525":0,"1533":0,"1534":0,"1535":0,"1538":0,"1539":0,"1542":0,"1543":0,"1544":0,"1545":0,"1548":0,"1549":0,"1552":0,"1553":0,"1556":0,"1557":0,"1564":0,"1565":0,"1566":0,"1569":0,"1571":0,"1574":0,"1576":0,"1601":0,"1602":0,"1603":0,"1606":0,"1607":0,"1610":0,"1611":0,"1612":0,"1613":0,"1616":0,"1617":0,"1618":0,"1619":0,"1622":0,"1639":0,"1640":0};
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].functions = {"__zDateFormat:76":0,"format:207":0,"DateSegment:252":0,"EraSegment:272":0,"format:283":0,"YearSegment:303":0,"toString:314":0,"format:324":0,"MonthSegment:345":0,"toString:357":0,"initialize:365":0,"format:395":0,"WeekSegment:426":0,"format:437":0,"DaySegment:469":0,"format:480":0,"WeekdaySegment:514":0,"toString:526":0,"initialize:534":0,"format:562":0,"TimeSegment:597":0,"HourSegment:617":0,"toString:628":0,"format:638":0,"MinuteSegment:673":0,"toString:684":0,"format:694":0,"SecondSegment:715":0,"format:726":0,"AmPmSegment:746":0,"toString:757":0,"format:767":0,"TimezoneSegment:788":0,"toString:799":0,"format:809":0,"__BuddhistDateFormat:833":0,"YearSegment:859":0,"format:871":0,"EraSegment:887":0,"format:899":0,"__YDateFormat:915":0,"_generateDatePattern:1021":0,"_generateTimePattern:1091":0,"_generateTimeZonePattern:1118":0,"_generatePattern:1143":0,"format:1179":0,"__YRelativeTimeFormat:1223":0,"currentDate:1264":0,"format:1291":0,"_stripDecimals:1406":0,"__YDurationFormat:1419":0,"_getDuration_XML:1461":0,"_getDuration_Seconds:1485":0,"format:1518":0,"format:1600":0,"formatDuration:1638":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].coveredLines = 485;
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].coveredFunctions = 57;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1);
YUI.add('gallery-advanced-date-format', function (Y, NAME) {

/*
 * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc.
 */

_yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 7);
var MODULE_NAME = "gallery-advanced-date-format",
    Format, ShortNames, DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat;

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

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 28);
Format = Y.Number.__BaseFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 30);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 76);
Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__zDateFormat", 76);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 77);
DateFormat.superclass.constructor.call(this, pattern, formats);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 78);
this.timeZone = new Y.Date.Timezone(timeZoneId);
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 80);
if (pattern === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 81);
return;
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 83);
var head, tail, segment, i, c, count, field;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 84);
for (i = 0; i < pattern.length; i++) {
        // literal
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 86);
c = pattern.charAt(i);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 87);
if (c === "'") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 88);
head = i + 1;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 89);
for (i++ ; i < pattern.length; i++) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 90);
c = pattern.charAt(i);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 91);
if (c === "'") {
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 92);
if (i + 1 < pattern.length && pattern.charAt(i + 1) === "'") {
                        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 93);
pattern = pattern.substr(0, i) + pattern.substr(i + 1);
                    }
                    else {
                        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 96);
break;
                    }
                }
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 100);
if (i === pattern.length) {
		_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 101);
Y.error("unterminated string literal");
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 103);
tail = i;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 104);
segment = new Format.TextSegment(this, pattern.substring(head, tail));
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 105);
this._segments.push(segment);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 106);
continue;
        }

        // non-meta chars
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 110);
head = i;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 111);
while(i < pattern.length) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 112);
c = pattern.charAt(i);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 113);
if (DateFormat._META_CHARS.indexOf(c) !== -1 || c === "'") {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 114);
break;
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 116);
i++;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 118);
tail = i;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 119);
if (head !== tail) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 120);
segment = new Format.TextSegment(this, pattern.substring(head, tail));
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 121);
this._segments.push(segment);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 122);
i--;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 123);
continue;
        }
		
        // meta char
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 127);
head = i;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 128);
while(++i < pattern.length) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 129);
if (pattern.charAt(i) !== c) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 130);
break;
            }
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 133);
tail = i--;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 134);
count = tail - head;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 135);
field = pattern.substr(head, count);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 136);
segment = null;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 137);
switch (c) {
            case 'G':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 139);
segment = new DateFormat.EraSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 140);
break;
            case 'y':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 142);
segment = new DateFormat.YearSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 143);
break;
            case 'M':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 145);
segment = new DateFormat.MonthSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 146);
break;
            case 'w':
            case 'W':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 149);
segment = new DateFormat.WeekSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 150);
break;
            case 'D':
            case 'd':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 153);
segment = new DateFormat.DaySegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 154);
break;
            case 'F':
            case 'E':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 157);
segment = new DateFormat.WeekdaySegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 158);
break;
            case 'a':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 160);
segment = new DateFormat.AmPmSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 161);
break;
            case 'H':
            case 'k':
            case 'K':
            case 'h':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 166);
segment = new DateFormat.HourSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 167);
break;
            case 'm':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 169);
segment = new DateFormat.MinuteSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 170);
break;
            case 's':
            case 'S':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 173);
segment = new DateFormat.SecondSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 174);
break;
            case 'z':
            case 'Z':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 177);
segment = new DateFormat.TimezoneSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 178);
break;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 180);
if (segment !== null) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 181);
segment._index = this._segments.length;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 182);
this._segments.push(segment);
        }
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 187);
DateFormat = Y.Date.__zDateFormat;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 188);
Y.extend(DateFormat, Format);

// Constants

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 192);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 207);
DateFormat.prototype.format = function(object, relative) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 207);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 208);
var useRelative = false,
        s = [],
        datePattern = false,
        i;

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 213);
if(relative !== null && relative !== "") {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 214);
useRelative = true;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 217);
for (i = 0; i < this._segments.length; i++) {
        //Mark datePattern sections in case of relative dates
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 219);
if(this._segments[i].toString().indexOf("text: \"<datePattern>\"") === 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 220);
if(useRelative) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 221);
s.push(relative);
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 223);
datePattern = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 224);
continue;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 226);
if(this._segments[i].toString().indexOf("text: \"</datePattern>\"") === 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 227);
datePattern = false;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 228);
continue;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 230);
if(!datePattern || !useRelative) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 231);
s.push(this._segments[i].format(object));
        }
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 234);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 252);
DateFormat.DateSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "DateSegment", 252);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 253);
DateFormat.DateSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 255);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 272);
DateFormat.EraSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "EraSegment", 272);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 273);
DateFormat.EraSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 275);
Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);

/**
 * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 283);
DateFormat.EraSegment.prototype.format = function(/*date*/) {
    // NOTE: Only support current era at the moment...
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 283);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 285);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 303);
DateFormat.YearSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "YearSegment", 303);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 304);
DateFormat.YearSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 306);
Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 308);
Y.mix(DateFormat.YearSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 314);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 315);
return "dateYear: \""+this._s+'"';
    },

    /**
     * Format date and get the year segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 324);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 325);
var year = String(date.getFullYear());
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 326);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 345);
DateFormat.MonthSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "MonthSegment", 345);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 346);
DateFormat.MonthSegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 347);
this.initialize();
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 349);
Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 351);
Y.mix(DateFormat.MonthSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 357);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 358);
return "dateMonth: \""+this._s+'"';
    },

    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "initialize", 365);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 366);
DateFormat.MonthSegment.MONTHS = {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 367);
DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [
            ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,
            ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,
            ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,
            ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort
        ];

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 374);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 375);
DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [
            Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,
            Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,
            Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,
            Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium
        ];
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 381);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 395);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 396);
var month = date.getMonth();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 397);
switch (this._s.length) {
            case 1:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 399);
return String(month + 1);
            case 2:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 401);
return Y.Date._zeroPad(month + 1, 2);
            case 3:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 403);
return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];
            case 5:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 405);
return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 407);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 426);
DateFormat.WeekSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "WeekSegment", 426);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 427);
DateFormat.WeekSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 429);
Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);

/**
 * Format date and get the week segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 437);
DateFormat.WeekSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 437);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 438);
var year = date.getYear(),
        month = date.getMonth(),
        day = date.getDate(),
	ofYear = /w/.test(this._s),
        date2 = new Date(year, ofYear ? 0 : month, 1),
        week = 0;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 444);
while (true) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 445);
week++;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 446);
if (date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 447);
break;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 449);
date2.setDate(date2.getDate() + 7);
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 452);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 469);
DateFormat.DaySegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "DaySegment", 469);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 470);
DateFormat.DaySegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 472);
Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);

/**
 * Format date and get the day segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 480);
DateFormat.DaySegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 480);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 481);
var month = date.getMonth(),
        day = date.getDate(),
        year = date.getYear(),
        date2;

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 486);
if (/D/.test(this._s) && month > 0) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 487);
do {
            // set date to first day of month and then go back one day
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 489);
date2 = new Date(year, month, 1);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 490);
date2.setDate(0);
			
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 492);
day += date2.getDate();
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 493);
month--;
        }while (month > 0);
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 496);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 514);
DateFormat.WeekdaySegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "WeekdaySegment", 514);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 515);
DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 516);
this.initialize();
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 518);
Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 520);
Y.mix(DateFormat.WeekdaySegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 526);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 527);
return "dateDay: \""+this._s+'"';
    },

    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "initialize", 534);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 535);
DateFormat.WeekdaySegment.WEEKDAYS = {};
        // NOTE: The short names aren't available in Java so we have to define them.
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 537);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [
            ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,
            ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,
            ShortNames.weekdaySatShort
        ];

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 543);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 544);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [
            Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,
            Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,
            Formats.weekdaySatMedium
        ];
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 549);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 562);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 563);
var weekday = date.getDay(),
            style;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 565);
if (/E/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 566);
switch (this._s.length) {
                case 4:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 568);
style = DateFormat.LONG;
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 569);
break;
                case 5:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 571);
style = DateFormat.SHORT;
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 572);
break;
                default:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 574);
style = DateFormat.MEDIUM;
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 576);
return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 578);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 597);
DateFormat.TimeSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "TimeSegment", 597);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 598);
DateFormat.TimeSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 600);
Y.extend(DateFormat.TimeSegment, Y.Number.__BaseFormat.Segment);

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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 617);
DateFormat.HourSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "HourSegment", 617);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 618);
DateFormat.HourSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 620);
Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 622);
Y.mix(DateFormat.HourSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 628);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 629);
return "timeHour: \""+this._s+'"';
    },

    /**
     * Format date and get the hour segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 638);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 639);
var hours = date.getHours();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 640);
if (hours > 12 && /[hK]/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 641);
hours -= 12;
        }
        else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 643);
if (hours === 0 && /[h]/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 644);
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
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 654);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 673);
DateFormat.MinuteSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "MinuteSegment", 673);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 674);
DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 676);
Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 678);
Y.mix(DateFormat.MinuteSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 684);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 685);
return "timeMinute: \""+this._s+'"';
    },

    /**
     * Format date and get the minute segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 694);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 695);
var minutes = date.getMinutes();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 696);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 715);
DateFormat.SecondSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "SecondSegment", 715);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 716);
DateFormat.SecondSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 718);
Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);

/**
 * Format date and get the second segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 726);
DateFormat.SecondSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 726);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 727);
var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 728);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 746);
DateFormat.AmPmSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "AmPmSegment", 746);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 747);
DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 749);
Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 751);
Y.mix(DateFormat.AmPmSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 757);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 758);
return "timeAmPm: \""+this._s+'"';
    },

    /**
     * Format date and get the AM/PM segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 767);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 768);
var hours = date.getHours();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 769);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 788);
DateFormat.TimezoneSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "TimezoneSegment", 788);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 789);
DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 791);
Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 793);
Y.mix(DateFormat.TimezoneSegment.prototype, {
    /**
     * Return a string representation of the object
     * @method toString
     * @return {String}
     */
    toString: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "toString", 799);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 800);
return "timeTimezone: \""+this._s+'"';
    },

    /**
     * Format date and get the timezone segment.
     * @method format
     * //param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(/*date*/) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 809);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 810);
var timeZone = this.getFormat().timeZone;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 811);
if (/Z/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 812);
return timeZone.getShortName();
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 814);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 833);
Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__BuddhistDateFormat", 833);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 834);
BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);
        
    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 837);
var segments = this._segments, i;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 838);
for(i=0; i<segments.length; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 839);
if(segments[i] instanceof DateFormat.YearSegment) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 840);
segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 841);
if (segments[i] instanceof DateFormat.EraSegment) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 842);
segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);
        }}
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 847);
BuddhistDateFormat = Y.Date.__BuddhistDateFormat;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 848);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 859);
BuddhistDateFormat.YearSegment = function(segment) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "YearSegment", 859);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 860);
BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 863);
Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);

/**
 * Format date and get the year segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 871);
BuddhistDateFormat.YearSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 871);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 872);
var year = date.getFullYear();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 873);
year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 874);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 887);
BuddhistDateFormat.EraSegment = function(segment) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "EraSegment", 887);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 888);
BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 891);
Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);

/**
 * Format date and get the era segment.
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 899);
BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 899);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 900);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 915);
Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {
        
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YDateFormat", 915);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 917);
if(timeZone === undefined || timeZone === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 918);
timeZone = Y.Date.Timezone.getTimezoneIdForOffset( new Date().getTimezoneOffset() * -60 );
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 921);
this._Formats = Y.Intl.get(MODULE_NAME);
        
    //If not valid time zone
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 924);
if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {
	_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 925);
Y.error("Could not find timezone: " + timeZone);
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 928);
this._timeZone = timeZone;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 929);
this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 931);
this._dateFormat = dateFormat || 0;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 932);
this._timeFormat = timeFormat || 0;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 933);
this._timeZoneFormat = timeZoneFormat || 0;

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 935);
this._relative = false;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 936);
this._pattern = this._generatePattern();

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 938);
var locale = Y.Intl.getLang(MODULE_NAME);
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 940);
if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {
        //Use buddhist calendar
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 942);
this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);
    } else {
        //Use gregorian calendar
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 945);
this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 949);
YDateFormat = Y.Date.__YDateFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 951);
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

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1013);
Y.mix(YDateFormat.prototype, {
    /**
     * Generate date pattern for selected format. For internal use only.
     * @method _generateDatePattern
     * @for Date.__YDateFormat
     * @private
     * @return {String} Date pattern
     */
    _generateDatePattern: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateDatePattern", 1021);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1022);
var format = this._dateFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1023);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1024);
format = Y.Date.DATE_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1027);
if(format === null) { return ""; }
        /*jshint bitwise: false*/
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1029);
if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1030);
this._relative = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1031);
format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;
        }
        /*jshint bitwise: true*/
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1034);
switch(format) {
            //Use relative only for formats with day component
            case Y.Date.DATE_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1037);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1038);
return "";
            case Y.Date.DATE_FORMATS.WYMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1040);
return this._Formats.WYMD_long;
            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1042);
return this._Formats.WYMD_abbreviated;
            case Y.Date.DATE_FORMATS.WYMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1044);
return this._Formats.WYMD_short;
            case Y.Date.DATE_FORMATS.WMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1046);
return this._Formats.WMD_long;
            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1048);
return this._Formats.WMD_abbreviated;
            case Y.Date.DATE_FORMATS.WMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1050);
return this._Formats.WMD_short;
            case Y.Date.DATE_FORMATS.YMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1052);
return this._Formats.YMD_long;
            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1054);
return this._Formats.YMD_abbreviated;
            case Y.Date.DATE_FORMATS.YMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1056);
return this._Formats.YMD_short;
            case Y.Date.DATE_FORMATS.YM_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1058);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1059);
return this._Formats.YM_long;
            case Y.Date.DATE_FORMATS.MD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1061);
return this._Formats.MD_long;
            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1063);
return this._Formats.MD_abbreviated;
            case Y.Date.DATE_FORMATS.MD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1065);
return this._Formats.MD_short;
            case Y.Date.DATE_FORMATS.W_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1067);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1068);
return this._Formats.W_long;
            case Y.Date.DATE_FORMATS.W_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1070);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1071);
return this._Formats.W_abbreviated;
            case Y.Date.DATE_FORMATS.M_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1073);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1074);
return this._Formats.M_long;
            case Y.Date.DATE_FORMATS.M_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1076);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1077);
return this._Formats.M_abbreviated;
            case Y.Date.DATE_FORMATS.YMD_FULL:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1079);
return this._Formats.YMD_full;
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1081);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateTimePattern", 1091);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1092);
var format = this._timeFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1093);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1094);
format = Y.Date.TIME_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1097);
if(format === null) { return ""; }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1098);
switch(format) {
            case Y.Date.TIME_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1100);
return "";
            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1102);
return this._Formats.HM_abbreviated;
            case Y.Date.TIME_FORMATS.HM_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1104);
return this._Formats.HM_short;
            case Y.Date.TIME_FORMATS.H_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1106);
return this._Formats.H_abbreviated;
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1108);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateTimeZonePattern", 1118);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1119);
var format = this._timeZoneFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1120);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1121);
format = Y.Date.TIMEZONE_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1124);
if(format === null) { return ""; }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1125);
switch(format) {
            case Y.Date.TIMEZONE_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1127);
return "";
            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1129);
return "z";
            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1131);
return "Z";
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1133);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generatePattern", 1143);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1144);
var datePattern = this._generateDatePattern(),
            timePattern = this._generateTimePattern(),
            timeZonePattern = this._generateTimeZonePattern(),
            pattern = "";

        //Combine patterns. Mark date pattern part, to use with relative dates.
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1150);
if(datePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1151);
datePattern = "'<datePattern>'" + datePattern + "'</datePattern>'";
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1154);
if(timePattern !== "" && timeZonePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1155);
pattern = this._Formats.DateTimeTimezoneCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1156);
if (timePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1157);
pattern = this._Formats.DateTimeCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1158);
if(timeZonePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1159);
pattern = this._Formats.DateTimezoneCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1160);
if(datePattern !== ""){
            //Just date
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1162);
pattern = "{1}";
        }}}}
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1165);
pattern = pattern.replace("{0}", timePattern).replace("{1}", datePattern).replace("{2}", timeZonePattern);
        
        //Remove unnecessary whitespaces
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1168);
pattern = Y.Lang.trim(pattern.replace(/\s\s+/g, " "));

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1170);
return pattern;
    },

    /**
     * Formats a date
     * @method format
     * @param {Date} date The date to be formatted.
     * @return {String} The formatted string
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1179);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1180);
if(date === null || !Y.Lang.isDate(date)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1181);
Y.error("format called without a date.");
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1184);
var offset = this._timeZoneInstance.getRawOffset() * 1000,
            relativeDate = null,
            today = new Date(),
            tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),
            yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1189);
date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1191);
if(this._relative) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1192);
if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1193);
relativeDate = this._Formats.today;
            }

            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1196);
if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1197);
relativeDate = this._Formats.tomorrow;
            }

            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1200);
if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1201);
relativeDate = this._Formats.yesterday;
            }
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1205);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1223);
Y.Date.__YRelativeTimeFormat = function(style) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YRelativeTimeFormat", 1223);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1224);
if(style === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1225);
style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1226);
if(Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1227);
style = Y.Date.RELATIVE_TIME_FORMATS[style];
    }}
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1230);
this.patterns = Y.Intl.get(MODULE_NAME);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1231);
this.style = style;
		
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1233);
switch(style) {
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1235);
this.numUnits = 2;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1236);
this.abbr = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1237);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1239);
this.numUnits = 2;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1240);
this.abbr = false;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1241);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1243);
this.numUnits = 1;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1244);
this.abbr = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1245);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1247);
this.numUnits = 1;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1248);
this.abbr = false;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1249);
break;
        default:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1251);
Y.error("Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS");
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1255);
YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1257);
Y.mix(Y.Date, {
    /**
     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.
     * @property
     * @type Number|function
     * @static
     */
    currentDate: function() { _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "currentDate", 1264);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1264);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1291);
YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1291);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1292);
if(relativeTo === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1293);
relativeTo = (new Date()).getTime()/1000;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1294);
if(timeValue > relativeTo) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1295);
Y.error("timeValue must be in the past");
        }
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1297);
if(timeValue > relativeTo) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1298);
Y.error("relativeTo must be greater than or equal to timeValue");
    }}

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1301);
var date = new Date((relativeTo - timeValue)*1000),
        result = [],
        numUnits = this.numUnits,
        value = date.getUTCFullYear() - 1970,	//Need zero-based index
        text, pattern, i;
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1307);
if(value > 0) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1308);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1309);
text = value + " " + (value !== 1 ? this.patterns.years_abbr : this.patterns.year_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1310);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1312);
text = value + " " + (value !== 1 ? this.patterns.years : this.patterns.year);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1313);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1315);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1318);
value = date.getUTCMonth();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1319);
if((numUnits > 0) && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1320);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1321);
text = value + " " + (value !== 1 ? this.patterns.months_abbr : this.patterns.month_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1322);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1324);
text = value + " " + (value !== 1 ? this.patterns.months : this.patterns.month);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1325);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1327);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1330);
value = date.getUTCDate()-1;			//Need zero-based index
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1331);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1332);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1333);
text = value + " " + (value !== 1 ? this.patterns.days_abbr : this.patterns.day_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1334);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1336);
text = value + " " + (value !== 1 ? this.patterns.days : this.patterns.day);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1337);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1339);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1342);
value = date.getUTCHours();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1343);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1344);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1345);
text = value + " " + (value !== 1 ? this.patterns.hours_abbr : this.patterns.hour_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1346);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1348);
text = value + " " + (value !== 1 ? this.patterns.hours : this.patterns.hour);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1349);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1351);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1354);
value = date.getUTCMinutes();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1355);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1356);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1357);
text = value + " " + (value !== 1 ? this.patterns.minutes_abbr : this.patterns.minute_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1358);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1360);
text = value + " " + (value !== 1 ? this.patterns.minutes : this.patterns.minute);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1361);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1363);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1366);
value = date.getUTCSeconds();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1367);
if(result.length === 0 || (numUnits > 0 && (numUnits < this.numUnits || value > 0))) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1368);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1369);
text = value + " " + (value !== 1 ? this.patterns.seconds_abbr : this.patterns.second_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1370);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1372);
text = value + " " + (value !== 1 ? this.patterns.seconds : this.patterns.second);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1373);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1375);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1378);
pattern = (result.length === 1) ? this.patterns["RelativeTime/oneUnit"] : this.patterns["RelativeTime/twoUnits"];
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1380);
for(i=0; i<result.length; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1381);
pattern = pattern.replace("{" + i + "}", result[i]);
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1383);
for(i=result.length; i<this.numUnits; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1384);
pattern = pattern.replace("{" + i + "}", "");
    }
    //Remove unnecessary whitespaces
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1387);
pattern = Y.Lang.trim(pattern.replace(/\s+/g, " "));
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1389);
return pattern;
};
/**
 * YDurationFormat class formats time in a language independent manner.
 * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages.
 */

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1396);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_stripDecimals", 1406);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1407);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1419);
Y.Date.__YDurationFormat = function(style) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YDurationFormat", 1419);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1420);
if(style && Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1421);
style = Y.Date.DURATION_FORMATS[style];
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1423);
this.style = style;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1424);
this.patterns = Y.Intl.get(MODULE_NAME);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1427);
YDurationFormat = Y.Date.__YDurationFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1429);
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

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1444);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_getDuration_XML", 1461);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1462);
var regex = new RegExp(/P(\d+Y)?(\d+M)?(\d+D)?T(\d+H)?(\d+M)?(\d+(\.\d+)?S)/),
            matches = xmlDuration.match(regex);
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1465);
if(matches === null) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1466);
Y.error("xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'");
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1469);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_getDuration_Seconds", 1485);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1486);
var duration = {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1487);
if(timeValueInSeconds < 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1488);
Y.error("TimeValue cannot be negative");
        }
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1491);
duration.hours = Y.Date._stripDecimals(timeValueInSeconds / 3600);
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1493);
timeValueInSeconds %= 3600;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1494);
duration.minutes = Y.Date._stripDecimals(timeValueInSeconds / 60);
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1496);
timeValueInSeconds %= 60;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1497);
duration.seconds = timeValueInSeconds;
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1499);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1518);
YDurationFormat.prototype.format = function(oDuration) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1518);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1519);
if(Y.Lang.isNumber(oDuration)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1520);
oDuration = YDurationFormat._getDuration_Seconds(oDuration);
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1521);
if(Y.Lang.isString(oDuration)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1522);
oDuration = YDurationFormat._getDuration_XML(oDuration);
    }}
    
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1525);
var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,
        result = {
            hours: "",
            minutes: "",
            seconds: ""
        },
        resultPattern = "";

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1533);
if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1534);
if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1535);
if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }
   
    //Test minutes and seconds for invalid values
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1538);
if(oDuration.minutes > 59 || oDuration.seconds > 59) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1539);
Y.error("Minutes and Seconds should be less than 60");
    }
    
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1542);
if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1543);
resultPattern = this.patterns.HMS_long;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1544);
if(oDuration.hours >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1545);
result.hours = Y.Number.format(oDuration.hours) + " " + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1548);
if(oDuration.minutes >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1549);
result.minutes = oDuration.minutes + " " + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1552);
if(oDuration.seconds >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1553);
result.seconds = oDuration.seconds + " " + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);
        }
    } else {                                            //HMS_SHORT
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1556);
resultPattern = this.patterns.HMS_short;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1557);
result = {
             hours: Y.Number.format(oDuration.hours),
             minutes: Y.Date._zeroPad(oDuration.minutes, 2),
             seconds: Y.Date._zeroPad(oDuration.seconds, 2)
        };
    }
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1564);
resultPattern = resultPattern.replace("{0}", result.hours);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1565);
resultPattern = resultPattern.replace("{1}", result.minutes);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1566);
resultPattern = resultPattern.replace("{2}", result.seconds);
       
    //Remove unnecessary whitespaces
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1569);
resultPattern = Y.Lang.trim(resultPattern.replace(/\s\s+/g, " "));
       
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1571);
return resultPattern;
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1574);
Y.Date.oldFormat = Y.Date.format;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1576);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1600);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1601);
oConfig = oConfig || {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1602);
if(oConfig.format && Y.Lang.isString(oConfig.format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1603);
return Y.Date.oldFormat(oDate, oConfig);
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1606);
if(!Y.Lang.isDate(oDate)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1607);
return Y.Lang.isValue(oDate) ? oDate : "";
        }
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1610);
var formatter, relativeTo;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1611);
if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1612);
formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1613);
return formatter.format(oDate);
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1616);
relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1617);
if(oConfig.relativeTimeFormat) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1618);
formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1619);
return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1622);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "formatDuration", 1638);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1639);
oConfig = oConfig || {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1640);
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
        "gallery-advanced-number-format",
        "gallery-advanced-date-timezone"
    ]
});
