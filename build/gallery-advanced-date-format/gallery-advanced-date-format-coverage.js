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
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].code=["YUI.add('gallery-advanced-date-format', function (Y, NAME) {","","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","","/**"," * This module provides absolute/relative date and time formatting, as well as duration formatting"," * Applications can choose date, time, and time zone components separately."," * For dates, relative descriptions (English \"yesterday\", German \"vorgestern\", Japanese \"後天\") are also supported."," *"," * This module uses a few modified parts of zimbra AjxFormat to handle dates and time."," *"," * Absolute formats use the default calendar specified in CLDR for each locale."," * Currently this means the Buddhist calendar for Thailand; the Gregorian calendar for all other countries."," * However, you can specify other calendars using language subtags;"," * for example, for Thai the Gregorian calendar can be specified as th-TH-u-ca-gregory."," *"," * Relative time formats only support times in the past. It can represent times like \"1 hour 5 minutes ago\""," *"," * @module gallery-advance-date-format"," * @requires gallery-advanced-date-timezone"," */","","var MODULE_NAME = \"gallery-advanced-date-format\",","    Format, ShortNames, DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat,","    DATE_PATTERN_START = \"<datePattern>\",","    DATE_PATTERN_END = \"</datePattern>\";","","Format = Y.Intl.Common.BaseFormat;","Y.Date.__advancedFormat = true;","","ShortNames = {","    \"weekdayMonShort\":\"M\",","    \"weekdayTueShort\":\"T\",","    \"weekdayWedShort\":\"W\",","    \"weekdayThuShort\":\"T\",","    \"weekdayFriShort\":\"F\",","    \"weekdaySatShort\":\"S\",","    \"weekdaySunShort\":\"S\",","    \"monthJanShort\":\"J\",","    \"monthFebShort\":\"F\",","    \"monthMarShort\":\"M\",","    \"monthAprShort\":\"A\",","    \"monthMayShort\":\"M\",","    \"monthJunShort\":\"J\",","    \"monthJulShort\":\"J\",","    \"monthAugShort\":\"A\",","    \"monthSepShort\":\"S\",","    \"monthOctShort\":\"O\",","    \"monthNovShort\":\"N\",","    \"monthDecShort\":\"D\"","};","    ","//","// Date format class","//","","/**"," * The DateFormat class formats Date objects according to a specified pattern."," * The patterns are defined the same as the SimpleDateFormat class in the Java libraries."," *"," * Note:"," * The date format differs from the Java patterns a few ways: the pattern"," * \"EEEEE\" (5 'E's) denotes a <em>short</em> weekday and the pattern \"MMMMM\""," * (5 'M's) denotes a <em>short</em> month name. This matches the extended"," * pattern found in the Common Locale Data Repository (CLDR) found at:"," * http://www.unicode.org/cldr/."," *"," * @class __zDateFormat"," * @extends Intl.Common.BaseFormat"," * @namespace Date"," * @private"," * @constructor"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {","    DateFormat.superclass.constructor.call(this, pattern, formats);","    this.timeZone = new Y.Date.Timezone(timeZoneId);","        ","    if (pattern === null) {","        return;","    }","    var segment, i, c, field, metaRegex, count,","        literalRegex = /^(('((''|[^'])+?)'(?!'))|[^GyMwWDdFEaHkKhmsSzZ']+)/;","    ","    for (i = 0; i < pattern.length; i++) {","        c = pattern.charAt(i);","        if(DateFormat._META_CHARS.indexOf(c) !== -1) {     //c is a meta char","            metaRegex = new RegExp(\"^\" + c+\"+\");","            field = metaRegex.exec(pattern.slice(i))[0];","            ","            segment = this._createSegment(c, field);","            if (segment !== null) {","                i += field.length - 1;","                segment._index = this._segments.length;","                this._segments.push(segment);","            }","        } else {  //Non-meta char. Should create a TextSegment","            field = literalRegex.exec(pattern.slice(i));     //Get TextSegment field. Quoted literal or any character not a meta","            if(field) {","                field = field[0];","                count = field.length;","                i += count - 1;","                ","                if(field.indexOf(\"''\") !== -1) {     //If contains double apostrophe","                    field = field.replace(\"''\", \"'\");","                    pattern = pattern.slice(0, i) + field + pattern.slice(i+count);","                }","","                field = field.replace(/^'/, \"\").replace(/'$/, \"\"); //remove leading and trailing quotes, if any","                ","                segment = new Format.TextSegment(this, field);","                this._segments.push(segment);","            }","        }","    }","};","","DateFormat = Y.Date.__zDateFormat;","Y.extend(DateFormat, Format);","","// Constants","","Y.mix(DateFormat, {","    SHORT: 0,","    MEDIUM: 1,","    LONG: 2,","    DEFAULT: 1,","    _META_CHARS: \"GyMwWDdFEaHkKhmsSzZ\"","});","","Y.mix(DateFormat.prototype, {","    /**","     * Create a segment of the correct type","     * @method createSegment","     * @private","     * @param ch {String} The meta character that will decide the segment type","     * @param field {String} The field that will be made into a segment. Will be a sequence of ch characters","     * @return {Intl.Common.BaseFormat.Segment}","     */","    _createSegment: function(ch, field) {","        if(!field) {","            return null;","        }","        ","        var segment = null;","        ","        switch (ch) {","            case 'G':","                segment = new DateFormat.EraSegment(this, field);","                break;","            case 'y':","                segment = new DateFormat.YearSegment(this, field);","                break;","            case 'M':","                segment = new DateFormat.MonthSegment(this, field);","                break;","            case 'w':","            case 'W':","                segment = new DateFormat.WeekSegment(this, field);","                break;","            case 'D':","            case 'd':","                segment = new DateFormat.DaySegment(this, field);","                break;","            case 'F':","            case 'E':","                segment = new DateFormat.WeekdaySegment(this, field);","                break;","            case 'a':","                segment = new DateFormat.AmPmSegment(this, field);","                break;","            case 'H':","            case 'k':","            case 'K':","            case 'h':","                segment = new DateFormat.HourSegment(this, field);","                break;","            case 'm':","                segment = new DateFormat.MinuteSegment(this, field);","                break;","            case 's':","            case 'S':","                segment = new DateFormat.SecondSegment(this, field);","                break;","            case 'z':","            case 'Z':","                segment = new DateFormat.TimezoneSegment(this, field);","                break;","        }","        return segment;","    },"," ","    /**","     * Format the date","     * @method format","     * @param object {Date} The date to be formatted","     * @param [relative=false] {Boolean} Whether relative dates should be used.","     * @return {String} Formatted result","     */","    format: function(object, relative) {","        var useRelative = false,","        s = [],","        datePattern = false,","        i;","","        if(relative !== null && relative !== \"\") {","            useRelative = true;","        }","","        for (i = 0; i < this._segments.length; i++) {","            //Mark datePattern sections in case of relative dates","            if(this._segments[i]._s === DATE_PATTERN_START) {","                if(useRelative) {","                    s.push(relative);","                }","                datePattern = true;","            } else if(this._segments[i]._s === DATE_PATTERN_END) {","                datePattern = false;","            } else if(!datePattern || !useRelative) {","                s.push(this._segments[i].format(object));","            }","        }","        return s.join(\"\");","    }","}, true);","","//","// Date segment class","//","","/**"," * Date Segment in the pattern"," * @class DateSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Intl.Common.BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.DateSegment = function(format, s) {","    DateFormat.DateSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DateSegment, Format.Segment);","","//","// Date era segment class","//","","/**"," * Era Segment in the pattern"," * @class EraSegment"," * @for Date.__DateFormat"," * @namespace Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.EraSegment = function(format, s) {","    DateFormat.EraSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);","","/**"," * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD"," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.EraSegment.prototype.format = function(/*date*/) {","    // NOTE: Only support current era at the moment...","    return this.getFormat().AD;","};","","//","// Date year segment class","//","","/**"," * Year Segment in the pattern"," * @class YearSegment"," * @namespace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.YearSegment = function(format, s) {","    DateFormat.YearSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.YearSegment.prototype, {","    /**","     * Format date and get the year segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var year = String(date.getFullYear());","        return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Intl.Common.zeroPad(year, this._s.length);","    }","}, true);","","//","// Date month segment class","//","","/**"," * Month Segment in the pattern"," * @class MonthSegment"," * @namepspace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.MonthSegment = function(format, s) {","    DateFormat.MonthSegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.MonthSegment.prototype, {","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.MonthSegment.MONTHS = {};","        DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [","        ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,","        ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,","        ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,","        ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [","        Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,","        Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,","        Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,","        Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium","        ];","        DateFormat.MonthSegment.MONTHS[DateFormat.LONG] = [","        Formats.monthJanLong, Formats.monthFebLong, Formats.monthMarLong,","        Formats.monthAprLong, Formats.monthMayLong, Formats.monthJunLong,","        Formats.monthJulLong, Formats.monthAugLong, Formats.monthSepLong,","        Formats.monthOctLong, Formats.monthNovLong, Formats.monthDecLong","        ];","    },","","    /**","     * Format date and get the month segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var month = date.getMonth();","        switch (this._s.length) {","            case 1:","                return String(month + 1);","            case 2:","                return Y.Intl.Common.zeroPad(month + 1, 2);","            case 3:","                return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];","            case 5:","                return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];","        }","        return DateFormat.MonthSegment.MONTHS[DateFormat.LONG][month];","    }","}, true);","","//","// Date week segment class","//","","/**"," * Week Segment in the pattern"," * @class WeekSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekSegment = function(format, s) {","    DateFormat.WeekSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);","","/**"," * Format date and get the week segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.WeekSegment.prototype.format = function(date) {","    var year = date.getYear(),","    month = date.getMonth(),","    day = date.getDate(),","    ofYear = /w/.test(this._s),","    date2 = new Date(year, ofYear ? 0 : month, 1),","    week = 1;","    while (!(date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day))) {","        date2.setDate(date2.getDate() + 7);","        week++;","    }","","    return Y.Intl.Common.zeroPad(week, this._s.length);","};","","//","// Date day segment class","//","","/**"," * Day Segment in the pattern"," * @class DaySegment"," * @namespace Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.DaySegment = function(format, s) {","    DateFormat.DaySegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);","","/**"," * Format date and get the day segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.DaySegment.prototype.format = function(date) {","    var month = date.getMonth(),","    day = date.getDate(),","    year = date.getYear(),","    date2;","","    if (/D/.test(this._s)) {","        while (month > 0) {","            // set date to first day of month and then go back one day","            date2 = new Date(year, month, 1);","            date2.setDate(0);","			","            day += date2.getDate();","            month--;","        }","    }","    return Y.Intl.Common.zeroPad(day, this._s.length);","};","","//","// Date weekday segment class","//","","/**"," * Weekday Segment in the pattern"," * @class WeekdaySegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekdaySegment = function(format, s) {","    DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);","","Y.mix(DateFormat.WeekdaySegment.prototype, {","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.WeekdaySegment.WEEKDAYS = {};","        // NOTE: The short names aren't available in Java so we have to define them.","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [","        ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,","        ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,","        ShortNames.weekdaySatShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [","        Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,","        Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,","        Formats.weekdaySatMedium","        ];","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.LONG] = [","        Formats.weekdaySunLong, Formats.weekdayMonLong, Formats.weekdayTueLong,","        Formats.weekdayWedLong, Formats.weekdayThuLong, Formats.weekdayFriLong,","        Formats.weekdaySatLong","        ];","    },","","    /**","     * Format date and get the weekday segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var weekday = date.getDay(),","        style;","        if (/E/.test(this._s)) {","            switch (this._s.length) {","                case 4:","                    style = DateFormat.LONG;","                    break;","                case 5:","                    style = DateFormat.SHORT;","                    break;","                default:","                    style = DateFormat.MEDIUM;","            }","            return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];","        }","        return Y.Intl.Common.zeroPad(weekday, this._s.length);","    }","}, true);","","//","// Time segment class","//","","/**"," * Time Segment in the pattern"," * @class TimeSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Intl.Common.BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimeSegment = function(format, s) {","    DateFormat.TimeSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimeSegment, Y.Intl.Common.BaseFormat.Segment);","","//","// Time hour segment class","//","","/**"," * Hour Segment in the pattern"," * @class HourSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.HourSegment = function(format, s) {","    DateFormat.HourSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.HourSegment.prototype, {","    /**","     * Format date and get the hour segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        if (hours > 12 && /[hK]/.test(this._s)) {","            hours -= 12;","        }","        else if (hours === 0 && /[h]/.test(this._s)) {","            hours = 12;","        }","        /***","            // NOTE: This is commented out to match the Java formatter output","            //       but from the comments for these meta-chars, it doesn't","            //       seem right.","            if (/[Hk]/.test(this._s)) {","                hours--;","            }","        /***/","        return Y.Intl.Common.zeroPad(hours, this._s.length);","    }","}, true);","","//","// Time minute segment class","//","","/**"," * Minute Segment in the pattern"," * @class MinuteSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.MinuteSegment = function(format, s) {","    DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.MinuteSegment.prototype, {","    /**","     * Format date and get the minute segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var minutes = date.getMinutes();","        return Y.Intl.Common.zeroPad(minutes, this._s.length);","    }","}, true);","","//","// Time second segment class","//","","/**"," * Second Segment in the pattern"," * @class SecondSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.SecondSegment = function(format, s) {","    DateFormat.SecondSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);","","/**"," * Format date and get the second segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.SecondSegment.prototype.format = function(date) {","    var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();","    return Y.Intl.Common.zeroPad(minutes, this._s.length);","};","","//","// Time am/pm segment class","//","","/**"," * AM/PM Segment in the pattern"," * @class AmPmSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.AmPmSegment = function(format, s) {","    DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.AmPmSegment.prototype, {","    /**","     * Format date and get the AM/PM segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        return hours < 12 ? this.getFormat().Formats.periodAm : this.getFormat().Formats.periodPm;","    }","}, true);","","//","// Time timezone segment class","//","","/**"," * TimeZone Segment in the pattern"," * @class TimezoneSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimezoneSegment = function(format, s) {","    DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.TimezoneSegment.prototype, {","    /**","     * Format date and get the timezone segment.","     * @method format","     * //param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(/*date*/) {","        var timeZone = this.getFormat().timeZone;","        if (/Z/.test(this._s)) {","            return timeZone.getShortName();","        }","        return this._s.length < 4 ? timeZone.getMediumName() : timeZone.getLongName();","    }","}, true);","    ","//","// Non-Gregorian Calendars","//","","/*"," * Buddhist Calendar. This is normally used only for Thai locales (th)."," * @class __BuddhistDateFormat"," * @namespace Date"," * @extends __zDateFormat"," * @constructor"," * @private"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {","    BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);","        ","    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar","    var segments = this._segments, i;","    for(i=0; i<segments.length; i++) {","        if(segments[i] instanceof DateFormat.YearSegment) {","            segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);","        } else if (segments[i] instanceof DateFormat.EraSegment) {","            segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);","        }","    }","};","","BuddhistDateFormat = Y.Date.__BuddhistDateFormat;","Y.extend(BuddhistDateFormat, DateFormat);","    ","/**"," * YearSegment class for Buddhist Calender"," * @class YearSegment"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.YearSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.YearSegment}"," */","BuddhistDateFormat.YearSegment = function(segment) {","    BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);","","/**"," * Format date and get the year segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.YearSegment.prototype.format = function(date) {","    var year = date.getFullYear();","    year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC","    return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Intl.Common.zeroPad(year, this._s.length);","};","    ","/**"," * EraSegment class for Buddhist Calender"," * @class EraSegment"," * @for Date.__BuddhistDateFormat"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.EraSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.EraSegment}"," */","BuddhistDateFormat.EraSegment = function(segment) {","    BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);","","/**"," * Format date and get the era segment."," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {","    return \"BE\";    //Only Buddhist Era supported for now","};","","/**"," * Wrapper around the zimbra-based DateFormat for use in YUI. API designed to be similar to ICU"," * @class __YDateFormat"," * namespace Date"," * @private"," * @constructor"," * @param {String} [timeZone] TZ database ID for the time zone that should be used."," *                            If omitted, defaults to the system timezone"," * @param {Number} [dateFormat=0] Selector for the desired date format from Y.Date.DATE_FORMATS."," * @param {Number} [timeFormat=0] Selector for the desired time format from Y.Date.TIME_FORMATS."," * @param {Number} [timeZoneFormat=0] Selector for the desired time zone format from Y.Date.TIMEZONE_FORMATS."," */","Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {","        ","    if(timeZone === undefined || timeZone === null) {","        timeZone = Y.Date.Timezone.getTimezoneIdForOffset( new Date().getTimezoneOffset() * -60 );","    }","","    this._Formats = Y.Intl.get(MODULE_NAME);","        ","    //If not valid time zone","    if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {","        Y.error(\"Could not find timezone: \" + timeZone);","    }","","    this._timeZone = timeZone;","    this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);","","    this._dateFormat = dateFormat || 0;","    this._timeFormat = timeFormat || 0;","    this._timeZoneFormat = timeZoneFormat || 0;","","    this._relative = false;","    this._pattern = this._generatePattern();","","    var locale = Y.Intl.getLang(MODULE_NAME);","        ","    if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {","        //Use buddhist calendar","        this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);","    } else {","        //Use gregorian calendar","        this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);","    }","};","","YDateFormat = Y.Date.__YDateFormat;","","Y.mix(Y.Date, {","    /**","     * Date Format Style values to use during format/parse","     * @property DATE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DATE_FORMATS: {","        NONE: 0,","        WYMD_LONG: 1,","        WYMD_ABBREVIATED: 4,","        WYMD_SHORT: 8,","        WMD_LONG: 16,","        WMD_ABBREVIATED: 32,","        WMD_SHORT: 64,","        YMD_LONG: 128,","        YMD_ABBREVIATED: 256,","        YMD_SHORT: 512,","        YM_LONG: 1024,","        MD_LONG: 2048,","        MD_ABBREVIATED: 4096,","        MD_SHORT: 8192,","        W_LONG: 16384,","        W_ABBREVIATED: 32768,","        M_LONG: 65536,","        M_ABBREVIATED: 131072,","        YMD_FULL: 262144,","        RELATIVE_DATE: 524288","    },","","    /**","     * Time Format Style values to use during format/parse","     * @property TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIME_FORMATS: {","        NONE: 0,","        HM_ABBREVIATED: 1,","        HM_SHORT: 2,","        H_ABBREVIATED: 4","    },","","    /**","     * Timezone Format Style values to use during format/parse","     * @property TIMEZONE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIMEZONE_FORMATS: {","        NONE: 0,","        Z_ABBREVIATED: 1,","        Z_SHORT: 2","    }","});","","Y.mix(YDateFormat.prototype, {","    /**","     * Generate date pattern for selected format. For internal use only.","     * @method _generateDatePattern","     * @for Date.__YDateFormat","     * @private","     * @return {String} Date pattern","     */","    _generateDatePattern: function() {","        var format = this._dateFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.DATE_FORMATS[format];","        }","    ","        if(format === null) {","            return \"\";","        }","        /*jshint bitwise: false*/","        if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {","            this._relative = true;","            format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;","        }","        /*jshint bitwise: true*/","        switch(format) {","            //Use relative only for formats with day component","            case Y.Date.DATE_FORMATS.NONE:","                this._relative = false;","                return \"\";","            case Y.Date.DATE_FORMATS.WYMD_LONG:","                return this._Formats.WYMD_long;","            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:","                return this._Formats.WYMD_abbreviated;","            case Y.Date.DATE_FORMATS.WYMD_SHORT:","                return this._Formats.WYMD_short;","            case Y.Date.DATE_FORMATS.WMD_LONG:","                return this._Formats.WMD_long;","            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:","                return this._Formats.WMD_abbreviated;","            case Y.Date.DATE_FORMATS.WMD_SHORT:","                return this._Formats.WMD_short;","            case Y.Date.DATE_FORMATS.YMD_LONG:","                return this._Formats.YMD_long;","            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:","                return this._Formats.YMD_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_SHORT:","                return this._Formats.YMD_short;","            case Y.Date.DATE_FORMATS.YM_LONG:","                this._relative = false;","                return this._Formats.YM_long;","            case Y.Date.DATE_FORMATS.MD_LONG:","                return this._Formats.MD_long;","            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:","                return this._Formats.MD_abbreviated;","            case Y.Date.DATE_FORMATS.MD_SHORT:","                return this._Formats.MD_short;","            case Y.Date.DATE_FORMATS.W_LONG:","                this._relative = false;","                return this._Formats.W_long;","            case Y.Date.DATE_FORMATS.W_ABBREVIATED:","                this._relative = false;","                return this._Formats.W_abbreviated;","            case Y.Date.DATE_FORMATS.M_LONG:","                this._relative = false;","                return this._Formats.M_long;","            case Y.Date.DATE_FORMATS.M_ABBREVIATED:","                this._relative = false;","                return this._Formats.M_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_FULL:","                return this._Formats.YMD_full;","            default:","                Y.error(\"Date format given does not exist\");	//Error no such pattern.","        }","    },","        ","    /**","     * Generate time pattern for selected format. For internal use only","     * @method _generateTimePattern","     * @private","     * @return {String} Time pattern","     */","    _generateTimePattern: function() {","        var format = this._timeFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIME_FORMATS[format];","        }","    ","        if(format === null) {","            return \"\";","        }","        switch(format) {","            case Y.Date.TIME_FORMATS.NONE:","                return \"\";","            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:","                return this._Formats.HM_abbreviated;","            case Y.Date.TIME_FORMATS.HM_SHORT:","                return this._Formats.HM_short;","            case Y.Date.TIME_FORMATS.H_ABBREVIATED:","                return this._Formats.H_abbreviated;","            default:","                Y.error(\"Time format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate time-zone pattern for selected format. For internal use only.","     * @method _generateTimeZonePattern","     * @private","     * @return {String} Time-Zone pattern","     */","    _generateTimeZonePattern: function() {","        var format = this._timeZoneFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIMEZONE_FORMATS[format];","        }","    ","        if(format === null) {","            return \"\";","        }","        switch(format) {","            case Y.Date.TIMEZONE_FORMATS.NONE:","                return \"\";","            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:","                return \"z\";","            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:","                return \"Z\";","            default:","                Y.error(\"Time Zone format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate pattern for selected date, time and time-zone formats. For internal use only","     * @method _generatePattern","     * @private","     * @return {String} Combined pattern for date, time and time-zone","     */","    _generatePattern: function() {","        var datePattern = this._generateDatePattern(),","        timePattern = this._generateTimePattern(),","        timeZonePattern = this._generateTimeZonePattern(),","        pattern = \"\";","","        //Combine patterns. Mark date pattern part, to use with relative dates.","        if(datePattern !== \"\") {","            datePattern = \"'\" + DATE_PATTERN_START + \"'\" + datePattern + \"'\" + DATE_PATTERN_END + \"'\";","        }","        ","        if(timePattern !== \"\" && timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimeTimezoneCombination;","        } else if (timePattern !== \"\") {","            pattern = this._Formats.DateTimeCombination;","        } else if(timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimezoneCombination;","        } else if(datePattern !== \"\"){","            //Just date","            pattern = \"{1}\";","        }","        ","        pattern = pattern.replace(\"{0}\", timePattern).replace(\"{1}\", datePattern).replace(\"{2}\", timeZonePattern);","        ","        //Remove unnecessary whitespaces","        pattern = Y.Lang.trim(pattern.replace(/\\s\\s+/g, \" \"));","","        return pattern;","    },","","    /**","     * Formats a date","     * @method format","     * @param {Date} date The date to be formatted.","     * @return {String} The formatted string","     */","    format: function(date) {","        if(date === null || !Y.Lang.isDate(date)) {","            Y.error(\"format called without a date.\");","        }","        ","        var offset = this._timeZoneInstance.getRawOffset() * 1000,","        relativeDate = null,","        today = new Date(),","        tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),","        yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);","        date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);","","        if(this._relative) {","            if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {","                relativeDate = this._Formats.today;","            }","","            if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {","                relativeDate = this._Formats.tomorrow;","            }","","            if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {","                relativeDate = this._Formats.yesterday;","            }","        }","","        return this._dateFormatInstance.format(date, relativeDate);","    }","}, true);","/**"," * YRelativeTimeFormat class provides localized formatting of relative time values such as \"3 minutes ago\"."," * Relative time formats supported are defined by how many units they may include."," * Relative time is only used for past events. The Relative time formats use appropriate singular/plural/paucal/etc. forms for all languages."," * In order to keep relative time formats independent of time zones, relative day names such as today, yesterday, or tomorrow are not used."," */","","/**"," * Class to handle relative time formatting"," * @class __YRelativeTimeFormat"," * @namespace Date"," * @private"," * @constructor"," * @param [style='ONE_UNIT_LONG'] {Number|String} Selector for the desired relative time format. Should be key/value from Y.Date.RELATIVE_TIME_FORMATS"," */","Y.Date.__YRelativeTimeFormat = function(style) {","    if(style === null) {","        style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;","    } else if(Y.Lang.isString(style)) {","        style = Y.Date.RELATIVE_TIME_FORMATS[style];","    }","        ","    this.patterns = Y.Intl.get(MODULE_NAME);","    this.style = style;","		","    switch(style) {","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:","            this.numUnits = 2;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:","            this.numUnits = 2;","            this.abbr = false;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:","            this.numUnits = 1;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:","            this.numUnits = 1;","            this.abbr = false;","            break;","        default:","            Y.error(\"Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS\");","    }","};","","YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;","","Y.mix(Y.Date, {","    /**","     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.","     * @property","     * @type Number|function","     * @static","     */","    currentDate: function() { return new Date(); },","","    /**","     * Format Style values to use during format/parse","     * @property RELATIVE_TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    RELATIVE_TIME_FORMATS: {","        ONE_OR_TWO_UNITS_ABBREVIATED: 0,","        ONE_OR_TWO_UNITS_LONG: 1,","        ONE_UNIT_ABBREVIATED: 2,","        ONE_UNIT_LONG: 4","    }","});","","/**"," * Add value to result array"," * @method _addResult"," * @private"," * @param type {String} Type of value. eg. day, month, year, etc"," * @param value {Number} Number of elements of type. eg. 3 days, value would be 3"," * @return {Boolean} Whether the value was added to the result array"," */","YRelativeTimeFormat.prototype._addResult = function(type, value) {","    if (value === 0 && this.result.length === 0 && type !== \"second\") {","                            //First result should not be zero, except if everything before seconds is zero","        return false;","    }","","    var text,","        patternPlural = type + \"s\",","        abbrev = type + \"_abbr\",","        abbrevPlural = patternPlural + \"_abbr\";","","    if(this.abbr) {","        text = value + \" \" + (value !== 1 ? this.patterns[abbrevPlural] : this.patterns[abbrev]);","    } else {","        text = value + \" \" + (value !== 1 ? this.patterns[patternPlural] : this.patterns[type]);","    }","","    this.result.push(text);","    return true;","};","	","/**"," * Formats a time value."," * @method format"," * @for Date.__YRelativeTimeFormat"," * @param {Number} timeValue The time value (seconds since Epoch) to be formatted."," * @param {Number} [relativeTo=Current Time] The time value (seconds since Epoch) in relation to which timeValue should be formatted.","          It must be greater than or equal to timeValue"," * @return {String} The formatted string"," */","YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {","    if(relativeTo === null) {","        relativeTo = (new Date()).getTime()/1000;","        if(timeValue > relativeTo) {","            Y.error(\"timeValue must be in the past\");","        }","    } else if(timeValue > relativeTo) {","        Y.error(\"relativeTo must be greater than or equal to timeValue\");","    }","","    var date = new Date((relativeTo - timeValue)*1000),","        numUnits = this.numUnits,","        value,","        pattern, i;","","    value = [","        [\"year\", date.getUTCFullYear() - 1970], //Need zero-based index","        [\"month\", date.getUTCMonth()],","        [\"day\", date.getUTCDate()-1],           //Need zero-based index","        [\"hour\", date.getUTCHours()],","        [\"minute\", date.getUTCMinutes()],","        [\"second\", date.getUTCSeconds()]","    ];","","    this.result = [];","    for (i=0; i<value.length && numUnits > 0; i++) {","        if(this._addResult(value[i][0], value[i][1])) {","            numUnits--;","        }","    }","","    pattern = (this.result.length === 1) ? this.patterns[\"RelativeTime/oneUnit\"] : this.patterns[\"RelativeTime/twoUnits\"];","        ","    for(i=0; i<this.result.length; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", this.result[i]);","    }","    for(i=this.result.length; i<this.numUnits; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", \"\");","    }","    //Remove unnecessary whitespaces","    pattern = Y.Lang.trim(pattern.replace(/\\s+/g, \" \"));","        ","    return pattern;","};","/**"," * YDurationFormat class formats time in a language independent manner."," * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages."," */","","Y.mix(Y.Date, {","    /**","     * Strip decimal part of argument and return the integer part","     * @method _stripDecimals","     * @static","     * @private","     * @for Date","     * @param floatNum A real number","     * @return Integer part of floatNum","     */","    _stripDecimals: function (floatNum) {","        return floatNum > 0 ? Math.floor(floatNum): Math.ceil(floatNum);","    }","});","","/**"," * YDurationFormat class formats time in a language independent manner."," * @class __YDurationFormat"," * @namespace Date"," * @private"," * @constructor"," * @param style {Number|String} selector for the desired duration format. Can be key/value from Y.Date.DURATION_FORMATS"," */","Y.Date.__YDurationFormat = function(style) {","    if(style && Y.Lang.isString(style)) {","        style = Y.Date.DURATION_FORMATS[style];","    }","    this.style = style;","    this.patterns = Y.Intl.get(MODULE_NAME);","};","","YDurationFormat = Y.Date.__YDurationFormat;","","Y.mix(Y.Date, {","    /**","     * Format Style values to use during format/parse of Duration values","     * @property DURATION_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DURATION_FORMATS: {","        HMS_LONG: 0,","        HMS_SHORT: 1","    }","});","","Y.mix(YDurationFormat, {","    /**","     * Parse XMLDurationFormat (PnYnMnDTnHnMnS) and return an object with hours, minutes and seconds","     * Any absent values are set to -1, which will be ignored in HMS_long, and set to 0 in HMS_short","     * Year, Month and Day are ignored. Only Hours, Minutes and Seconds are used","     * @method _getDuration_XML","     * @static","     * @private","     * @for Date.__YDurationFormat","     * @param {String} xmlDuration XML Duration String.","     *      The lexical representation for duration is the [ISO 8601] extended format PnYnMnDTnHnMnS,","     *      where nY represents the number of years, nM the number of months, nD the number of days,","     *      'T' is the date/time separator,","     *      nH the number of hours, nM the number of minutes and nS the number of seconds.","     *      The number of seconds can include decimal digits to arbitrary precision.","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_XML: function (xmlDuration) {","        var regex = new RegExp(/P(\\d+Y)?(\\d+M)?(\\d+D)?T(\\d+H)?(\\d+M)?(\\d+(\\.\\d+)?S)/),","            matches = xmlDuration.match(regex);","        ","        if(matches === null) {","            Y.error(\"xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'\");","        }","        ","        return {","            hours: parseInt(matches[4] || -1, 10),","            minutes: parseInt(matches[5] || -1, 10),","            seconds: parseFloat(matches[6] || -1, 10)","        };","    },","    ","    /**","     * Get duration from time in seconds.","     * The value should be integer value in seconds, and should not be negative.","     * @method _getDuration_Seconds","     * @static","     * @private","     * @param {Number} timeValueInSeconds Duration in seconds","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_Seconds: function (timeValueInSeconds) {","        var duration = {};","        if(timeValueInSeconds < 0) {","            Y.error(\"TimeValue cannot be negative\");","        }","                ","        duration.hours = Y.Date._stripDecimals(timeValueInSeconds / 3600);","                ","        timeValueInSeconds %= 3600;","        duration.minutes = Y.Date._stripDecimals(timeValueInSeconds / 60);","                ","        timeValueInSeconds %= 60;","        duration.seconds = timeValueInSeconds;","        ","        return duration;","    }","});","    ","/**"," * Formats the given value into a duration format string."," * For XML duration format, the string should be in the pattern PnYnMnDTnHnMnS."," * Please note that year, month and day fields are ignored in this version."," * For future compatibility, please do not pass Year/Month/Day in the parameter."," *"," * For hours, minutes, and seconds, any absent or negative parts are ignored in HMS_long format,"," * but are treated as 0 in HMS_short format style."," *"," * @method"," * @private"," * @param oDuration {String|Number|Object} Duration as time in seconds (Integer),","          XML duration format (String), or an object with hours, minutes and seconds"," * @return {String} The formatted string"," */","YDurationFormat.prototype.format = function(oDuration) {","    if(Y.Lang.isNumber(oDuration)) {","        oDuration = YDurationFormat._getDuration_Seconds(oDuration);","    } else if(Y.Lang.isString(oDuration)) {","        oDuration = YDurationFormat._getDuration_XML(oDuration);","    }","    ","    var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,","        result = {","            hours: \"\",","            minutes: \"\",","            seconds: \"\"","        },","        resultPattern = \"\",","        formatNumber = function(num) { return num; };","","    if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }","    if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }","    if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }","   ","    //Test minutes and seconds for invalid values","    if(oDuration.minutes > 59 || oDuration.seconds > 59) {","        Y.error(\"Minutes and Seconds should be less than 60\");","    }","","    //If number format available, use it, otherwise do not format number.","    if (Y.Number !== undefined && Y.Number.format !== undefined) {","        formatNumber = function(num) { return Y.Number.format(num); };","    }","    if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {","        resultPattern = this.patterns.HMS_long;","        if(oDuration.hours >= 0) {","            result.hours = formatNumber(oDuration.hours) + \" \" + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);","        }","","        if(oDuration.minutes >= 0) {","            result.minutes = oDuration.minutes + \" \" + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);","        }","","        if(oDuration.seconds >= 0) {","            result.seconds = oDuration.seconds + \" \" + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);","        }","    } else {                                            //HMS_SHORT","        resultPattern = this.patterns.HMS_short;","        result = {","             hours: formatNumber(oDuration.hours),","             minutes: Y.Intl.Common.zeroPad(oDuration.minutes, 2),","             seconds: Y.Intl.Common.zeroPad(oDuration.seconds, 2)","        };","    }","        ","    resultPattern = resultPattern.replace(\"{0}\", result.hours);","    resultPattern = resultPattern.replace(\"{1}\", result.minutes);","    resultPattern = resultPattern.replace(\"{2}\", result.seconds);","       ","    //Remove unnecessary whitespaces","    resultPattern = Y.Lang.trim(resultPattern.replace(/\\s\\s+/g, \" \"));","       ","    return resultPattern;","};","","Y.Date.oldFormat = Y.Date.format;","","Y.mix(Y.Date, {","    /**","     * Takes a native JavaScript Date and formats it as a string for display to user. Can be configured with the oConfig parameter.","     * For relative time format, dates are compared to current time. To compare to a different time, set the parameter Y.Date.currentDate","     * Configuration object can have 4 optional parameters:","     *     [dateFormat=0] {String|Number} Date format to use. Should be a key/value from Y.Date.DATE_FORMATS.","     *     [timeFormat=0] {String|Number} Time format to use. Should be a key/value from Y.Date.TIME_FORMATS.","     *     [timezoneFormat=0] {String|Number} Timezone format to use. Should be a key/value from Y.Date.TIMEZONE_FORMATS.","     *     [relativeTimeFormat=0] {String|Number} RelativeTime format to use. Should be a key/value from Y.Date.RELATIVE_TIME_FORMATS.","     *     [format] {HTML} Format string as pattern. This is passed to the Y.Date.format method from datatype-date-format module.","                           If this parameter is used, the other three will be ignored.","     * @for Date","     * @method format","     * @param oDate {Date} Date","     * @param [oConfig] {Object} Object literal of configuration values.","     * @return {String} string representation of the date","     * @example","            var date = new Date();","            Y.Date.format(date, { timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\", timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\" });","            Y.Date.format(date, { relativeTimeFormat: \"ONE_OR_TWO_UNITS_LONG\" });","            Y.Date.format(date, { format: \"%Y-%m-%d\"});","     */","    format: function(oDate, oConfig) {","        oConfig = oConfig || {};","        if(oConfig.format && Y.Lang.isString(oConfig.format)) {","            return Y.Date.oldFormat(oDate, oConfig);","        }","    ","        if(!Y.Lang.isDate(oDate)) {","            return Y.Lang.isValue(oDate) ? oDate : \"\";","        }","                ","        var formatter, relativeTo;","        if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {","            formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);","            return formatter.format(oDate);","        }","    ","        relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);","        if(oConfig.relativeTimeFormat) {","            formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);","            return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);","        }","","        Y.error(\"Unrecognized format options.\");","    },","","    /**","     * Returns a string representation of the duration","     * @method format","     * @param oDuration {String|Number|Object} Duration as time in seconds, xml duration format, or an object with hours, minutes and seconds","     * @param [oConfig] {Object} Configuration object. Used to pass style parameter to the method.","                        'style' can be a string (HMS_LONG/HMS_SHORT) or the numerical values in Y.Date.DURATION_FORMATS","     * @return {String} string representation of the duration","     * @example","                Y.Date.formatDuration(3601, { style: \"HMS_LONG\" });","                Y.Date.formatDuration(\"PT11H22M33S\", { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40 }, { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40, seconds: 5 }, { style: \"HMS_LONG\" });","     */","    formatDuration: function(oDuration, oConfig) {","        oConfig = oConfig || {};","        return new YDurationFormat(oConfig.style).format(oDuration);","    }","}, true);","","","}, '@VERSION@', {","    \"lang\": [","        \"af\",","        \"am\",","        \"ar-DZ\",","        \"ar-JO\",","        \"ar\",","        \"ar-LB\",","        \"ar-MA\",","        \"ar-SY\",","        \"ar-TN\",","        \"as\",","        \"az-Cyrl\",","        \"az\",","        \"be\",","        \"bg\",","        \"bn-IN\",","        \"bn\",","        \"bo\",","        \"ca\",","        \"cs\",","        \"cy\",","        \"da\",","        \"de-AT\",","        \"de-BE\",","        \"de\",","        \"el\",","        \"en-AU\",","        \"en-BE\",","        \"en-BW\",","        \"en-CA\",","        \"en-GB\",","        \"en-HK\",","        \"en-IE\",","        \"en-IN\",","        \"en-JO\",","        \"en-MT\",","        \"en-MY\",","        \"en-NZ\",","        \"en-PH\",","        \"en-RH\",","        \"en-SG\",","        \"en-US\",","        \"en-US-POSIX\",","        \"en-ZA\",","        \"en-ZW\",","        \"eo\",","        \"es-AR\",","        \"es-CL\",","        \"es-CO\",","        \"es-EC\",","        \"es-GT\",","        \"es-HN\",","        \"es\",","        \"es-PA\",","        \"es-PE\",","        \"es-PR\",","        \"es-US\",","        \"et\",","        \"eu\",","        \"fa-AF\",","        \"fa\",","        \"fi\",","        \"fil\",","        \"fo\",","        \"fr-BE\",","        \"fr-CA\",","        \"fr-CH\",","        \"fr\",","        \"ga\",","        \"gl\",","        \"gsw\",","        \"gu\",","        \"gv\",","        \"ha\",","        \"haw\",","        \"he\",","        \"hi\",","        \"hr\",","        \"hu\",","        \"hy\",","        \"id\",","        \"ii\",","        \"in\",","        \"is\",","        \"it-CH\",","        \"it\",","        \"iw\",","        \"ja-JP-TRADITIONAL\",","        \"ja\",","        \"\",","        \"ka\",","        \"kk\",","        \"kl\",","        \"km\",","        \"kn\",","        \"ko\",","        \"kok\",","        \"kw\",","        \"lt\",","        \"lv\",","        \"mk\",","        \"ml\",","        \"mr\",","        \"ms-BN\",","        \"ms\",","        \"mt\",","        \"nb\",","        \"ne-IN\",","        \"ne\",","        \"nl-BE\",","        \"nl\",","        \"nn\",","        \"no\",","        \"no-NO-NY\",","        \"om\",","        \"or\",","        \"pa-Arab\",","        \"pa\",","        \"pa-PK\",","        \"pl\",","        \"ps\",","        \"pt\",","        \"pt-PT\",","        \"ro\",","        \"ru\",","        \"ru-UA\",","        \"sh\",","        \"si\",","        \"sk\",","        \"sl\",","        \"so\",","        \"sq\",","        \"sr-BA\",","        \"sr-Cyrl-BA\",","        \"sr\",","        \"sr-Latn\",","        \"sr-Latn-ME\",","        \"sr-ME\",","        \"sv-FI\",","        \"sv\",","        \"sw\",","        \"ta\",","        \"te\",","        \"th\",","        \"ti-ER\",","        \"ti\",","        \"tl\",","        \"tr\",","        \"uk\",","        \"ur-IN\",","        \"ur\",","        \"ur-PK\",","        \"uz\",","        \"uz-Latn\",","        \"vi\",","        \"zh-Hans-SG\",","        \"zh-Hant-HK\",","        \"zh-Hant\",","        \"zh-Hant-MO\",","        \"zh-HK\",","        \"zh\",","        \"zh-MO\",","        \"zh-SG\",","        \"zh-TW\",","        \"zu\"","    ],","    \"requires\": [","        \"gallery-advanced-date-timezone\"","    ]","});"];
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].lines = {"1":0,"25":0,"30":0,"31":0,"33":0,"79":0,"80":0,"81":0,"83":0,"84":0,"86":0,"89":0,"90":0,"91":0,"92":0,"93":0,"95":0,"96":0,"97":0,"98":0,"99":0,"102":0,"103":0,"104":0,"105":0,"106":0,"108":0,"109":0,"110":0,"113":0,"115":0,"116":0,"122":0,"123":0,"127":0,"135":0,"145":0,"146":0,"149":0,"151":0,"153":0,"154":0,"156":0,"157":0,"159":0,"160":0,"163":0,"164":0,"167":0,"168":0,"171":0,"172":0,"174":0,"175":0,"180":0,"181":0,"183":0,"184":0,"187":0,"188":0,"191":0,"192":0,"194":0,"205":0,"210":0,"211":0,"214":0,"216":0,"217":0,"218":0,"220":0,"221":0,"222":0,"223":0,"224":0,"227":0,"246":0,"247":0,"249":0,"266":0,"267":0,"269":0,"277":0,"279":0,"297":0,"298":0,"300":0,"302":0,"310":0,"311":0,"330":0,"331":0,"332":0,"334":0,"336":0,"342":0,"343":0,"350":0,"351":0,"357":0,"372":0,"373":0,"375":0,"377":0,"379":0,"381":0,"383":0,"402":0,"403":0,"405":0,"413":0,"414":0,"420":0,"421":0,"422":0,"425":0,"442":0,"443":0,"445":0,"453":0,"454":0,"459":0,"460":0,"462":0,"463":0,"465":0,"466":0,"469":0,"487":0,"488":0,"489":0,"491":0,"493":0,"499":0,"501":0,"507":0,"508":0,"513":0,"527":0,"529":0,"530":0,"532":0,"533":0,"535":0,"536":0,"538":0,"540":0,"542":0,"561":0,"562":0,"564":0,"581":0,"582":0,"584":0,"586":0,"594":0,"595":0,"596":0,"598":0,"599":0,"609":0,"628":0,"629":0,"631":0,"633":0,"641":0,"642":0,"661":0,"662":0,"664":0,"672":0,"673":0,"674":0,"692":0,"693":0,"695":0,"697":0,"705":0,"706":0,"725":0,"726":0,"728":0,"730":0,"738":0,"739":0,"740":0,"742":0,"761":0,"762":0,"765":0,"766":0,"767":0,"768":0,"769":0,"770":0,"775":0,"776":0,"787":0,"788":0,"791":0,"799":0,"800":0,"801":0,"802":0,"815":0,"816":0,"819":0,"827":0,"828":0,"843":0,"845":0,"846":0,"849":0,"852":0,"853":0,"856":0,"857":0,"859":0,"860":0,"861":0,"863":0,"864":0,"866":0,"868":0,"870":0,"873":0,"877":0,"879":0,"941":0,"950":0,"951":0,"952":0,"955":0,"956":0,"959":0,"960":0,"961":0,"964":0,"967":0,"968":0,"970":0,"972":0,"974":0,"976":0,"978":0,"980":0,"982":0,"984":0,"986":0,"988":0,"989":0,"991":0,"993":0,"995":0,"997":0,"998":0,"1000":0,"1001":0,"1003":0,"1004":0,"1006":0,"1007":0,"1009":0,"1011":0,"1022":0,"1023":0,"1024":0,"1027":0,"1028":0,"1030":0,"1032":0,"1034":0,"1036":0,"1038":0,"1040":0,"1051":0,"1052":0,"1053":0,"1056":0,"1057":0,"1059":0,"1061":0,"1063":0,"1065":0,"1067":0,"1078":0,"1084":0,"1085":0,"1088":0,"1089":0,"1090":0,"1091":0,"1092":0,"1093":0,"1094":0,"1096":0,"1099":0,"1102":0,"1104":0,"1114":0,"1115":0,"1118":0,"1123":0,"1125":0,"1126":0,"1127":0,"1130":0,"1131":0,"1134":0,"1135":0,"1139":0,"1157":0,"1158":0,"1159":0,"1160":0,"1161":0,"1164":0,"1165":0,"1167":0,"1169":0,"1170":0,"1171":0,"1173":0,"1174":0,"1175":0,"1177":0,"1178":0,"1179":0,"1181":0,"1182":0,"1183":0,"1185":0,"1189":0,"1191":0,"1198":0,"1224":0,"1225":0,"1227":0,"1230":0,"1235":0,"1236":0,"1238":0,"1241":0,"1242":0,"1254":0,"1255":0,"1256":0,"1257":0,"1258":0,"1260":0,"1261":0,"1264":0,"1269":0,"1278":0,"1279":0,"1280":0,"1281":0,"1285":0,"1287":0,"1288":0,"1290":0,"1291":0,"1294":0,"1296":0,"1303":0,"1314":0,"1326":0,"1327":0,"1328":0,"1330":0,"1331":0,"1334":0,"1336":0,"1351":0,"1369":0,"1372":0,"1373":0,"1376":0,"1393":0,"1394":0,"1395":0,"1398":0,"1400":0,"1401":0,"1403":0,"1404":0,"1406":0,"1425":0,"1426":0,"1427":0,"1428":0,"1429":0,"1432":0,"1439":0,"1441":0,"1442":0,"1443":0,"1446":0,"1447":0,"1451":0,"1452":0,"1454":0,"1455":0,"1456":0,"1457":0,"1460":0,"1461":0,"1464":0,"1465":0,"1468":0,"1469":0,"1476":0,"1477":0,"1478":0,"1481":0,"1483":0,"1486":0,"1488":0,"1513":0,"1514":0,"1515":0,"1518":0,"1519":0,"1522":0,"1523":0,"1524":0,"1525":0,"1528":0,"1529":0,"1530":0,"1531":0,"1534":0,"1551":0,"1552":0};
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].functions = {"__zDateFormat:79":0,"_createSegment:144":0,"format:204":0,"DateSegment:246":0,"EraSegment:266":0,"format:277":0,"YearSegment:297":0,"format:309":0,"MonthSegment:330":0,"initialize:341":0,"format:371":0,"WeekSegment:402":0,"format:413":0,"DaySegment:442":0,"format:453":0,"WeekdaySegment:487":0,"initialize:498":0,"format:526":0,"TimeSegment:561":0,"HourSegment:581":0,"format:593":0,"MinuteSegment:628":0,"format:640":0,"SecondSegment:661":0,"format:672":0,"AmPmSegment:692":0,"format:704":0,"TimezoneSegment:725":0,"format:737":0,"__BuddhistDateFormat:761":0,"YearSegment:787":0,"format:799":0,"EraSegment:815":0,"format:827":0,"__YDateFormat:843":0,"_generateDatePattern:949":0,"_generateTimePattern:1021":0,"_generateTimeZonePattern:1050":0,"_generatePattern:1077":0,"format:1113":0,"__YRelativeTimeFormat:1157":0,"currentDate:1198":0,"_addResult:1224":0,"format:1254":0,"_stripDecimals:1313":0,"__YDurationFormat:1326":0,"_getDuration_XML:1368":0,"_getDuration_Seconds:1392":0,"formatNumber:1439":0,"formatNumber:1452":0,"format:1425":0,"format:1512":0,"formatDuration:1550":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].coveredLines = 434;
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].coveredFunctions = 54;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1);
YUI.add('gallery-advanced-date-format', function (Y, NAME) {

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
 * @module gallery-advance-date-format
 * @requires gallery-advanced-date-timezone
 */

_yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 25);
var MODULE_NAME = "gallery-advanced-date-format",
    Format, ShortNames, DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat,
    DATE_PATTERN_START = "<datePattern>",
    DATE_PATTERN_END = "</datePattern>";

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 30);
Format = Y.Intl.Common.BaseFormat;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 31);
Y.Date.__advancedFormat = true;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 33);
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
 * @extends Intl.Common.BaseFormat
 * @namespace Date
 * @private
 * @constructor
 * @param pattern {String} The pattern to format date in
 * @param formats {Object} Locale specific data
 * @param timeZoneId {String} Timezone Id according to Olson tz database
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 79);
Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__zDateFormat", 79);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 80);
DateFormat.superclass.constructor.call(this, pattern, formats);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 81);
this.timeZone = new Y.Date.Timezone(timeZoneId);
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 83);
if (pattern === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 84);
return;
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 86);
var segment, i, c, field, metaRegex, count,
        literalRegex = /^(('((''|[^'])+?)'(?!'))|[^GyMwWDdFEaHkKhmsSzZ']+)/;
    
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 89);
for (i = 0; i < pattern.length; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 90);
c = pattern.charAt(i);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 91);
if(DateFormat._META_CHARS.indexOf(c) !== -1) {     //c is a meta char
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 92);
metaRegex = new RegExp("^" + c+"+");
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 93);
field = metaRegex.exec(pattern.slice(i))[0];
            
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 95);
segment = this._createSegment(c, field);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 96);
if (segment !== null) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 97);
i += field.length - 1;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 98);
segment._index = this._segments.length;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 99);
this._segments.push(segment);
            }
        } else {  //Non-meta char. Should create a TextSegment
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 102);
field = literalRegex.exec(pattern.slice(i));     //Get TextSegment field. Quoted literal or any character not a meta
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 103);
if(field) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 104);
field = field[0];
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 105);
count = field.length;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 106);
i += count - 1;
                
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 108);
if(field.indexOf("''") !== -1) {     //If contains double apostrophe
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 109);
field = field.replace("''", "'");
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 110);
pattern = pattern.slice(0, i) + field + pattern.slice(i+count);
                }

                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 113);
field = field.replace(/^'/, "").replace(/'$/, ""); //remove leading and trailing quotes, if any
                
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 115);
segment = new Format.TextSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 116);
this._segments.push(segment);
            }
        }
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 122);
DateFormat = Y.Date.__zDateFormat;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 123);
Y.extend(DateFormat, Format);

// Constants

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 127);
Y.mix(DateFormat, {
    SHORT: 0,
    MEDIUM: 1,
    LONG: 2,
    DEFAULT: 1,
    _META_CHARS: "GyMwWDdFEaHkKhmsSzZ"
});

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 135);
Y.mix(DateFormat.prototype, {
    /**
     * Create a segment of the correct type
     * @method createSegment
     * @private
     * @param ch {String} The meta character that will decide the segment type
     * @param field {String} The field that will be made into a segment. Will be a sequence of ch characters
     * @return {Intl.Common.BaseFormat.Segment}
     */
    _createSegment: function(ch, field) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_createSegment", 144);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 145);
if(!field) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 146);
return null;
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 149);
var segment = null;
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 151);
switch (ch) {
            case 'G':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 153);
segment = new DateFormat.EraSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 154);
break;
            case 'y':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 156);
segment = new DateFormat.YearSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 157);
break;
            case 'M':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 159);
segment = new DateFormat.MonthSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 160);
break;
            case 'w':
            case 'W':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 163);
segment = new DateFormat.WeekSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 164);
break;
            case 'D':
            case 'd':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 167);
segment = new DateFormat.DaySegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 168);
break;
            case 'F':
            case 'E':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 171);
segment = new DateFormat.WeekdaySegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 172);
break;
            case 'a':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 174);
segment = new DateFormat.AmPmSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 175);
break;
            case 'H':
            case 'k':
            case 'K':
            case 'h':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 180);
segment = new DateFormat.HourSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 181);
break;
            case 'm':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 183);
segment = new DateFormat.MinuteSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 184);
break;
            case 's':
            case 'S':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 187);
segment = new DateFormat.SecondSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 188);
break;
            case 'z':
            case 'Z':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 191);
segment = new DateFormat.TimezoneSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 192);
break;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 194);
return segment;
    },
 
    /**
     * Format the date
     * @method format
     * @param object {Date} The date to be formatted
     * @param [relative=false] {Boolean} Whether relative dates should be used.
     * @return {String} Formatted result
     */
    format: function(object, relative) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 204);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 205);
var useRelative = false,
        s = [],
        datePattern = false,
        i;

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 210);
if(relative !== null && relative !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 211);
useRelative = true;
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 214);
for (i = 0; i < this._segments.length; i++) {
            //Mark datePattern sections in case of relative dates
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 216);
if(this._segments[i]._s === DATE_PATTERN_START) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 217);
if(useRelative) {
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 218);
s.push(relative);
                }
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 220);
datePattern = true;
            } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 221);
if(this._segments[i]._s === DATE_PATTERN_END) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 222);
datePattern = false;
            } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 223);
if(!datePattern || !useRelative) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 224);
s.push(this._segments[i].format(object));
            }}}
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 227);
return s.join("");
    }
}, true);

//
// Date segment class
//

/**
 * Date Segment in the pattern
 * @class DateSegment
 * @namespace Date.__zDateFormat
 * @for Date.__zDateFormat
 * @extends Intl.Common.BaseFormat.Segment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object.
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 246);
DateFormat.DateSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "DateSegment", 246);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 247);
DateFormat.DateSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 249);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 266);
DateFormat.EraSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "EraSegment", 266);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 267);
DateFormat.EraSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 269);
Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);

/**
 * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 277);
DateFormat.EraSegment.prototype.format = function(/*date*/) {
    // NOTE: Only support current era at the moment...
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 277);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 279);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 297);
DateFormat.YearSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "YearSegment", 297);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 298);
DateFormat.YearSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 300);
Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 302);
Y.mix(DateFormat.YearSegment.prototype, {
    /**
     * Format date and get the year segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 309);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 310);
var year = String(date.getFullYear());
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 311);
return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Intl.Common.zeroPad(year, this._s.length);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 330);
DateFormat.MonthSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "MonthSegment", 330);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 331);
DateFormat.MonthSegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 332);
this.initialize();
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 334);
Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 336);
Y.mix(DateFormat.MonthSegment.prototype, {
    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "initialize", 341);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 342);
DateFormat.MonthSegment.MONTHS = {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 343);
DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [
        ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,
        ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,
        ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,
        ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort
        ];

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 350);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 351);
DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [
        Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,
        Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,
        Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,
        Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium
        ];
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 357);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 371);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 372);
var month = date.getMonth();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 373);
switch (this._s.length) {
            case 1:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 375);
return String(month + 1);
            case 2:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 377);
return Y.Intl.Common.zeroPad(month + 1, 2);
            case 3:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 379);
return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];
            case 5:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 381);
return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 383);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 402);
DateFormat.WeekSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "WeekSegment", 402);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 403);
DateFormat.WeekSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 405);
Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);

/**
 * Format date and get the week segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 413);
DateFormat.WeekSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 413);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 414);
var year = date.getYear(),
    month = date.getMonth(),
    day = date.getDate(),
    ofYear = /w/.test(this._s),
    date2 = new Date(year, ofYear ? 0 : month, 1),
    week = 1;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 420);
while (!(date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day))) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 421);
date2.setDate(date2.getDate() + 7);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 422);
week++;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 425);
return Y.Intl.Common.zeroPad(week, this._s.length);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 442);
DateFormat.DaySegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "DaySegment", 442);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 443);
DateFormat.DaySegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 445);
Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);

/**
 * Format date and get the day segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 453);
DateFormat.DaySegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 453);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 454);
var month = date.getMonth(),
    day = date.getDate(),
    year = date.getYear(),
    date2;

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 459);
if (/D/.test(this._s)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 460);
while (month > 0) {
            // set date to first day of month and then go back one day
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 462);
date2 = new Date(year, month, 1);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 463);
date2.setDate(0);
			
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 465);
day += date2.getDate();
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 466);
month--;
        }
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 469);
return Y.Intl.Common.zeroPad(day, this._s.length);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 487);
DateFormat.WeekdaySegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "WeekdaySegment", 487);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 488);
DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 489);
this.initialize();
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 491);
Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 493);
Y.mix(DateFormat.WeekdaySegment.prototype, {
    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "initialize", 498);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 499);
DateFormat.WeekdaySegment.WEEKDAYS = {};
        // NOTE: The short names aren't available in Java so we have to define them.
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 501);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [
        ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,
        ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,
        ShortNames.weekdaySatShort
        ];

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 507);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 508);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [
        Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,
        Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,
        Formats.weekdaySatMedium
        ];
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 513);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 526);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 527);
var weekday = date.getDay(),
        style;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 529);
if (/E/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 530);
switch (this._s.length) {
                case 4:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 532);
style = DateFormat.LONG;
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 533);
break;
                case 5:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 535);
style = DateFormat.SHORT;
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 536);
break;
                default:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 538);
style = DateFormat.MEDIUM;
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 540);
return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 542);
return Y.Intl.Common.zeroPad(weekday, this._s.length);
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
 * @extends Intl.Common.BaseFormat.Segment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 561);
DateFormat.TimeSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "TimeSegment", 561);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 562);
DateFormat.TimeSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 564);
Y.extend(DateFormat.TimeSegment, Y.Intl.Common.BaseFormat.Segment);

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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 581);
DateFormat.HourSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "HourSegment", 581);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 582);
DateFormat.HourSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 584);
Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 586);
Y.mix(DateFormat.HourSegment.prototype, {
    /**
     * Format date and get the hour segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 593);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 594);
var hours = date.getHours();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 595);
if (hours > 12 && /[hK]/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 596);
hours -= 12;
        }
        else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 598);
if (hours === 0 && /[h]/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 599);
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
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 609);
return Y.Intl.Common.zeroPad(hours, this._s.length);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 628);
DateFormat.MinuteSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "MinuteSegment", 628);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 629);
DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 631);
Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 633);
Y.mix(DateFormat.MinuteSegment.prototype, {
    /**
     * Format date and get the minute segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 640);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 641);
var minutes = date.getMinutes();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 642);
return Y.Intl.Common.zeroPad(minutes, this._s.length);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 661);
DateFormat.SecondSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "SecondSegment", 661);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 662);
DateFormat.SecondSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 664);
Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);

/**
 * Format date and get the second segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 672);
DateFormat.SecondSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 672);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 673);
var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 674);
return Y.Intl.Common.zeroPad(minutes, this._s.length);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 692);
DateFormat.AmPmSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "AmPmSegment", 692);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 693);
DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 695);
Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 697);
Y.mix(DateFormat.AmPmSegment.prototype, {
    /**
     * Format date and get the AM/PM segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 704);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 705);
var hours = date.getHours();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 706);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 725);
DateFormat.TimezoneSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "TimezoneSegment", 725);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 726);
DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 728);
Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 730);
Y.mix(DateFormat.TimezoneSegment.prototype, {
    /**
     * Format date and get the timezone segment.
     * @method format
     * //param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(/*date*/) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 737);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 738);
var timeZone = this.getFormat().timeZone;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 739);
if (/Z/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 740);
return timeZone.getShortName();
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 742);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 761);
Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__BuddhistDateFormat", 761);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 762);
BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);
        
    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 765);
var segments = this._segments, i;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 766);
for(i=0; i<segments.length; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 767);
if(segments[i] instanceof DateFormat.YearSegment) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 768);
segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 769);
if (segments[i] instanceof DateFormat.EraSegment) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 770);
segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);
        }}
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 775);
BuddhistDateFormat = Y.Date.__BuddhistDateFormat;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 776);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 787);
BuddhistDateFormat.YearSegment = function(segment) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "YearSegment", 787);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 788);
BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 791);
Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);

/**
 * Format date and get the year segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 799);
BuddhistDateFormat.YearSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 799);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 800);
var year = date.getFullYear();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 801);
year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 802);
return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Intl.Common.zeroPad(year, this._s.length);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 815);
BuddhistDateFormat.EraSegment = function(segment) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "EraSegment", 815);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 816);
BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 819);
Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);

/**
 * Format date and get the era segment.
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 827);
BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 827);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 828);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 843);
Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {
        
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YDateFormat", 843);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 845);
if(timeZone === undefined || timeZone === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 846);
timeZone = Y.Date.Timezone.getTimezoneIdForOffset( new Date().getTimezoneOffset() * -60 );
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 849);
this._Formats = Y.Intl.get(MODULE_NAME);
        
    //If not valid time zone
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 852);
if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 853);
Y.error("Could not find timezone: " + timeZone);
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 856);
this._timeZone = timeZone;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 857);
this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 859);
this._dateFormat = dateFormat || 0;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 860);
this._timeFormat = timeFormat || 0;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 861);
this._timeZoneFormat = timeZoneFormat || 0;

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 863);
this._relative = false;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 864);
this._pattern = this._generatePattern();

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 866);
var locale = Y.Intl.getLang(MODULE_NAME);
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 868);
if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {
        //Use buddhist calendar
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 870);
this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);
    } else {
        //Use gregorian calendar
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 873);
this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 877);
YDateFormat = Y.Date.__YDateFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 879);
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

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 941);
Y.mix(YDateFormat.prototype, {
    /**
     * Generate date pattern for selected format. For internal use only.
     * @method _generateDatePattern
     * @for Date.__YDateFormat
     * @private
     * @return {String} Date pattern
     */
    _generateDatePattern: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateDatePattern", 949);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 950);
var format = this._dateFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 951);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 952);
format = Y.Date.DATE_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 955);
if(format === null) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 956);
return "";
        }
        /*jshint bitwise: false*/
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 959);
if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 960);
this._relative = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 961);
format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;
        }
        /*jshint bitwise: true*/
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 964);
switch(format) {
            //Use relative only for formats with day component
            case Y.Date.DATE_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 967);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 968);
return "";
            case Y.Date.DATE_FORMATS.WYMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 970);
return this._Formats.WYMD_long;
            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 972);
return this._Formats.WYMD_abbreviated;
            case Y.Date.DATE_FORMATS.WYMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 974);
return this._Formats.WYMD_short;
            case Y.Date.DATE_FORMATS.WMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 976);
return this._Formats.WMD_long;
            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 978);
return this._Formats.WMD_abbreviated;
            case Y.Date.DATE_FORMATS.WMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 980);
return this._Formats.WMD_short;
            case Y.Date.DATE_FORMATS.YMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 982);
return this._Formats.YMD_long;
            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 984);
return this._Formats.YMD_abbreviated;
            case Y.Date.DATE_FORMATS.YMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 986);
return this._Formats.YMD_short;
            case Y.Date.DATE_FORMATS.YM_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 988);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 989);
return this._Formats.YM_long;
            case Y.Date.DATE_FORMATS.MD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 991);
return this._Formats.MD_long;
            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 993);
return this._Formats.MD_abbreviated;
            case Y.Date.DATE_FORMATS.MD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 995);
return this._Formats.MD_short;
            case Y.Date.DATE_FORMATS.W_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 997);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 998);
return this._Formats.W_long;
            case Y.Date.DATE_FORMATS.W_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1000);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1001);
return this._Formats.W_abbreviated;
            case Y.Date.DATE_FORMATS.M_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1003);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1004);
return this._Formats.M_long;
            case Y.Date.DATE_FORMATS.M_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1006);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1007);
return this._Formats.M_abbreviated;
            case Y.Date.DATE_FORMATS.YMD_FULL:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1009);
return this._Formats.YMD_full;
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1011);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateTimePattern", 1021);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1022);
var format = this._timeFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1023);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1024);
format = Y.Date.TIME_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1027);
if(format === null) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1028);
return "";
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1030);
switch(format) {
            case Y.Date.TIME_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1032);
return "";
            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1034);
return this._Formats.HM_abbreviated;
            case Y.Date.TIME_FORMATS.HM_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1036);
return this._Formats.HM_short;
            case Y.Date.TIME_FORMATS.H_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1038);
return this._Formats.H_abbreviated;
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1040);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateTimeZonePattern", 1050);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1051);
var format = this._timeZoneFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1052);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1053);
format = Y.Date.TIMEZONE_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1056);
if(format === null) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1057);
return "";
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1059);
switch(format) {
            case Y.Date.TIMEZONE_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1061);
return "";
            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1063);
return "z";
            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1065);
return "Z";
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1067);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generatePattern", 1077);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1078);
var datePattern = this._generateDatePattern(),
        timePattern = this._generateTimePattern(),
        timeZonePattern = this._generateTimeZonePattern(),
        pattern = "";

        //Combine patterns. Mark date pattern part, to use with relative dates.
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1084);
if(datePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1085);
datePattern = "'" + DATE_PATTERN_START + "'" + datePattern + "'" + DATE_PATTERN_END + "'";
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1088);
if(timePattern !== "" && timeZonePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1089);
pattern = this._Formats.DateTimeTimezoneCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1090);
if (timePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1091);
pattern = this._Formats.DateTimeCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1092);
if(timeZonePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1093);
pattern = this._Formats.DateTimezoneCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1094);
if(datePattern !== ""){
            //Just date
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1096);
pattern = "{1}";
        }}}}
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1099);
pattern = pattern.replace("{0}", timePattern).replace("{1}", datePattern).replace("{2}", timeZonePattern);
        
        //Remove unnecessary whitespaces
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1102);
pattern = Y.Lang.trim(pattern.replace(/\s\s+/g, " "));

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1104);
return pattern;
    },

    /**
     * Formats a date
     * @method format
     * @param {Date} date The date to be formatted.
     * @return {String} The formatted string
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1113);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1114);
if(date === null || !Y.Lang.isDate(date)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1115);
Y.error("format called without a date.");
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1118);
var offset = this._timeZoneInstance.getRawOffset() * 1000,
        relativeDate = null,
        today = new Date(),
        tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),
        yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1123);
date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1125);
if(this._relative) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1126);
if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1127);
relativeDate = this._Formats.today;
            }

            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1130);
if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1131);
relativeDate = this._Formats.tomorrow;
            }

            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1134);
if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1135);
relativeDate = this._Formats.yesterday;
            }
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1139);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1157);
Y.Date.__YRelativeTimeFormat = function(style) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YRelativeTimeFormat", 1157);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1158);
if(style === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1159);
style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1160);
if(Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1161);
style = Y.Date.RELATIVE_TIME_FORMATS[style];
    }}
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1164);
this.patterns = Y.Intl.get(MODULE_NAME);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1165);
this.style = style;
		
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1167);
switch(style) {
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1169);
this.numUnits = 2;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1170);
this.abbr = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1171);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1173);
this.numUnits = 2;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1174);
this.abbr = false;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1175);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1177);
this.numUnits = 1;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1178);
this.abbr = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1179);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1181);
this.numUnits = 1;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1182);
this.abbr = false;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1183);
break;
        default:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1185);
Y.error("Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS");
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1189);
YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1191);
Y.mix(Y.Date, {
    /**
     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.
     * @property
     * @type Number|function
     * @static
     */
    currentDate: function() { _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "currentDate", 1198);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1198);
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
 * Add value to result array
 * @method _addResult
 * @private
 * @param type {String} Type of value. eg. day, month, year, etc
 * @param value {Number} Number of elements of type. eg. 3 days, value would be 3
 * @return {Boolean} Whether the value was added to the result array
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1224);
YRelativeTimeFormat.prototype._addResult = function(type, value) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_addResult", 1224);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1225);
if (value === 0 && this.result.length === 0 && type !== "second") {
                            //First result should not be zero, except if everything before seconds is zero
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1227);
return false;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1230);
var text,
        patternPlural = type + "s",
        abbrev = type + "_abbr",
        abbrevPlural = patternPlural + "_abbr";

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1235);
if(this.abbr) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1236);
text = value + " " + (value !== 1 ? this.patterns[abbrevPlural] : this.patterns[abbrev]);
    } else {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1238);
text = value + " " + (value !== 1 ? this.patterns[patternPlural] : this.patterns[type]);
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1241);
this.result.push(text);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1242);
return true;
};
	
/**
 * Formats a time value.
 * @method format
 * @for Date.__YRelativeTimeFormat
 * @param {Number} timeValue The time value (seconds since Epoch) to be formatted.
 * @param {Number} [relativeTo=Current Time] The time value (seconds since Epoch) in relation to which timeValue should be formatted.
          It must be greater than or equal to timeValue
 * @return {String} The formatted string
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1254);
YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1254);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1255);
if(relativeTo === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1256);
relativeTo = (new Date()).getTime()/1000;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1257);
if(timeValue > relativeTo) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1258);
Y.error("timeValue must be in the past");
        }
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1260);
if(timeValue > relativeTo) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1261);
Y.error("relativeTo must be greater than or equal to timeValue");
    }}

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1264);
var date = new Date((relativeTo - timeValue)*1000),
        numUnits = this.numUnits,
        value,
        pattern, i;

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1269);
value = [
        ["year", date.getUTCFullYear() - 1970], //Need zero-based index
        ["month", date.getUTCMonth()],
        ["day", date.getUTCDate()-1],           //Need zero-based index
        ["hour", date.getUTCHours()],
        ["minute", date.getUTCMinutes()],
        ["second", date.getUTCSeconds()]
    ];

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1278);
this.result = [];
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1279);
for (i=0; i<value.length && numUnits > 0; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1280);
if(this._addResult(value[i][0], value[i][1])) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1281);
numUnits--;
        }
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1285);
pattern = (this.result.length === 1) ? this.patterns["RelativeTime/oneUnit"] : this.patterns["RelativeTime/twoUnits"];
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1287);
for(i=0; i<this.result.length; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1288);
pattern = pattern.replace("{" + i + "}", this.result[i]);
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1290);
for(i=this.result.length; i<this.numUnits; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1291);
pattern = pattern.replace("{" + i + "}", "");
    }
    //Remove unnecessary whitespaces
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1294);
pattern = Y.Lang.trim(pattern.replace(/\s+/g, " "));
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1296);
return pattern;
};
/**
 * YDurationFormat class formats time in a language independent manner.
 * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages.
 */

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1303);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_stripDecimals", 1313);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1314);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1326);
Y.Date.__YDurationFormat = function(style) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YDurationFormat", 1326);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1327);
if(style && Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1328);
style = Y.Date.DURATION_FORMATS[style];
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1330);
this.style = style;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1331);
this.patterns = Y.Intl.get(MODULE_NAME);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1334);
YDurationFormat = Y.Date.__YDurationFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1336);
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

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1351);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_getDuration_XML", 1368);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1369);
var regex = new RegExp(/P(\d+Y)?(\d+M)?(\d+D)?T(\d+H)?(\d+M)?(\d+(\.\d+)?S)/),
            matches = xmlDuration.match(regex);
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1372);
if(matches === null) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1373);
Y.error("xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'");
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1376);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_getDuration_Seconds", 1392);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1393);
var duration = {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1394);
if(timeValueInSeconds < 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1395);
Y.error("TimeValue cannot be negative");
        }
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1398);
duration.hours = Y.Date._stripDecimals(timeValueInSeconds / 3600);
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1400);
timeValueInSeconds %= 3600;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1401);
duration.minutes = Y.Date._stripDecimals(timeValueInSeconds / 60);
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1403);
timeValueInSeconds %= 60;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1404);
duration.seconds = timeValueInSeconds;
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1406);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1425);
YDurationFormat.prototype.format = function(oDuration) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1425);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1426);
if(Y.Lang.isNumber(oDuration)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1427);
oDuration = YDurationFormat._getDuration_Seconds(oDuration);
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1428);
if(Y.Lang.isString(oDuration)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1429);
oDuration = YDurationFormat._getDuration_XML(oDuration);
    }}
    
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1432);
var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,
        result = {
            hours: "",
            minutes: "",
            seconds: ""
        },
        resultPattern = "",
        formatNumber = function(num) { _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "formatNumber", 1439);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1439);
return num; };

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1441);
if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1442);
if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1443);
if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }
   
    //Test minutes and seconds for invalid values
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1446);
if(oDuration.minutes > 59 || oDuration.seconds > 59) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1447);
Y.error("Minutes and Seconds should be less than 60");
    }

    //If number format available, use it, otherwise do not format number.
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1451);
if (Y.Number !== undefined && Y.Number.format !== undefined) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1452);
formatNumber = function(num) { _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "formatNumber", 1452);
return Y.Number.format(num); };
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1454);
if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1455);
resultPattern = this.patterns.HMS_long;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1456);
if(oDuration.hours >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1457);
result.hours = formatNumber(oDuration.hours) + " " + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1460);
if(oDuration.minutes >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1461);
result.minutes = oDuration.minutes + " " + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1464);
if(oDuration.seconds >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1465);
result.seconds = oDuration.seconds + " " + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);
        }
    } else {                                            //HMS_SHORT
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1468);
resultPattern = this.patterns.HMS_short;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1469);
result = {
             hours: formatNumber(oDuration.hours),
             minutes: Y.Intl.Common.zeroPad(oDuration.minutes, 2),
             seconds: Y.Intl.Common.zeroPad(oDuration.seconds, 2)
        };
    }
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1476);
resultPattern = resultPattern.replace("{0}", result.hours);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1477);
resultPattern = resultPattern.replace("{1}", result.minutes);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1478);
resultPattern = resultPattern.replace("{2}", result.seconds);
       
    //Remove unnecessary whitespaces
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1481);
resultPattern = Y.Lang.trim(resultPattern.replace(/\s\s+/g, " "));
       
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1483);
return resultPattern;
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1486);
Y.Date.oldFormat = Y.Date.format;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1488);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1512);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1513);
oConfig = oConfig || {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1514);
if(oConfig.format && Y.Lang.isString(oConfig.format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1515);
return Y.Date.oldFormat(oDate, oConfig);
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1518);
if(!Y.Lang.isDate(oDate)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1519);
return Y.Lang.isValue(oDate) ? oDate : "";
        }
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1522);
var formatter, relativeTo;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1523);
if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1524);
formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1525);
return formatter.format(oDate);
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1528);
relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1529);
if(oConfig.relativeTimeFormat) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1530);
formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1531);
return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1534);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "formatDuration", 1550);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1551);
oConfig = oConfig || {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1552);
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
