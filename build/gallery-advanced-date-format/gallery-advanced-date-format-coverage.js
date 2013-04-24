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
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].code=["YUI.add('gallery-advanced-date-format', function (Y, NAME) {","","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","","/**"," * This module provides absolute/relative date and time formatting, as well as duration formatting"," * Applications can choose date, time, and time zone components separately."," * For dates, relative descriptions (English \"yesterday\", German \"vorgestern\", Japanese \"後天\") are also supported."," *"," * This module uses a few modified parts of zimbra AjxFormat to handle dates and time."," *"," * Absolute formats use the default calendar specified in CLDR for each locale."," * Currently this means the Buddhist calendar for Thailand; the Gregorian calendar for all other countries."," * However, you can specify other calendars using language subtags;"," * for example, for Thai the Gregorian calendar can be specified as th-TH-u-ca-gregory."," *"," * Relative time formats only support times in the past. It can represent times like \"1 hour 5 minutes ago\""," *"," * @module gallery-advance-date-format"," * @requires gallery-advanced-date-timezone"," */","","var MODULE_NAME = \"gallery-advanced-date-format\",","Format, ShortNames, DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat;","","Format = Y.Intl.Common.BaseFormat;","Y.Date.__advancedFormat = true;","","ShortNames = {","    \"weekdayMonShort\":\"M\",","    \"weekdayTueShort\":\"T\",","    \"weekdayWedShort\":\"W\",","    \"weekdayThuShort\":\"T\",","    \"weekdayFriShort\":\"F\",","    \"weekdaySatShort\":\"S\",","    \"weekdaySunShort\":\"S\",","    \"monthJanShort\":\"J\",","    \"monthFebShort\":\"F\",","    \"monthMarShort\":\"M\",","    \"monthAprShort\":\"A\",","    \"monthMayShort\":\"M\",","    \"monthJunShort\":\"J\",","    \"monthJulShort\":\"J\",","    \"monthAugShort\":\"A\",","    \"monthSepShort\":\"S\",","    \"monthOctShort\":\"O\",","    \"monthNovShort\":\"N\",","    \"monthDecShort\":\"D\"","};","    ","//","// Date format class","//","","/**"," * The DateFormat class formats Date objects according to a specified pattern."," * The patterns are defined the same as the SimpleDateFormat class in the Java libraries."," *"," * Note:"," * The date format differs from the Java patterns a few ways: the pattern"," * \"EEEEE\" (5 'E's) denotes a <em>short</em> weekday and the pattern \"MMMMM\""," * (5 'M's) denotes a <em>short</em> month name. This matches the extended"," * pattern found in the Common Locale Data Repository (CLDR) found at:"," * http://www.unicode.org/cldr/."," *"," * @class __zDateFormat"," * @extends Intl.Common.BaseFormat"," * @namespace Date"," * @private"," * @constructor"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {","    DateFormat.superclass.constructor.call(this, pattern, formats);","    this.timeZone = new Y.Date.Timezone(timeZoneId);","        ","    if (pattern === null) {","        return;","    }","    var segment, i, c, field, metaRegex, count,","    literalRegex = /^(('((''|[^'])+?)'(?!'))|[^GyMwWDdFEaHkKhmsSzZ']+)/;","    ","    for (i = 0; i < pattern.length; i++) {","        c = pattern.charAt(i);","        if(DateFormat._META_CHARS.indexOf(c) !== -1) {     //c is a meta char","            if(c === 'E') {","                console.log(\"E\");","            }","            metaRegex = new RegExp(\"^\" + c+\"+\");","            field = metaRegex.exec(pattern.slice(i))[0];","            ","            segment = this._createSegment(c, field);","            if (segment !== null) {","                i += field.length - 1;","                segment._index = this._segments.length;","                this._segments.push(segment);","            }","        } else {  //Non-meta char. Should create a TextSegment","            field = literalRegex.exec(pattern.slice(i));     //Get TextSegment field. Quoted literal or any character not a meta","            if(field) {","                field = field[0];","                count = field.length;","                i += count - 1;","                ","                if(field.indexOf(\"''\") !== -1) {     //If contains double apostrophe","                    field = field.replace(\"''\", \"'\");","                    pattern = pattern.slice(0, i) + field + pattern.slice(i+count);","                }","","                field = field.replace(/^'/, \"\").replace(/'$/, \"\"); //remove leading and trailing quotes, if any","                ","                segment = new Format.TextSegment(this, field);","                this._segments.push(segment);","            }","        }","    }","};","","DateFormat = Y.Date.__zDateFormat;","Y.extend(DateFormat, Format);","","// Constants","","Y.mix(DateFormat, {","    SHORT: 0,","    MEDIUM: 1,","    LONG: 2,","    DEFAULT: 1,","    _META_CHARS: \"GyMwWDdFEaHkKhmsSzZ\"","});","","Y.mix(DateFormat.prototype, {","    /**","     * Create a segment of the correct type","     * @method createSegment","     * @private","     * @param ch {String} The meta character that will decide the segment type","     * @param field {String} The field that will be made into a segment. Will be a sequence of ch characters","     * @return {Intl.Common.BaseFormat.Segment}","     */","    _createSegment: function(ch, field) {","        if(!field) {","            return null;","        }","        ","        var segment = null;","        ","        switch (ch) {","            case 'G':","                segment = new DateFormat.EraSegment(this, field);","                break;","            case 'y':","                segment = new DateFormat.YearSegment(this, field);","                break;","            case 'M':","                segment = new DateFormat.MonthSegment(this, field);","                break;","            case 'w':","            case 'W':","                segment = new DateFormat.WeekSegment(this, field);","                break;","            case 'D':","            case 'd':","                segment = new DateFormat.DaySegment(this, field);","                break;","            case 'F':","            case 'E':","                segment = new DateFormat.WeekdaySegment(this, field);","                break;","            case 'a':","                segment = new DateFormat.AmPmSegment(this, field);","                break;","            case 'H':","            case 'k':","            case 'K':","            case 'h':","                segment = new DateFormat.HourSegment(this, field);","                break;","            case 'm':","                segment = new DateFormat.MinuteSegment(this, field);","                break;","            case 's':","            case 'S':","                segment = new DateFormat.SecondSegment(this, field);","                break;","            case 'z':","            case 'Z':","                segment = new DateFormat.TimezoneSegment(this, field);","                break;","        }","        return segment;","    },"," ","    /**","     * Format the date","     * @method format","     * @param object {Date} The date to be formatted","     * @param [relative=false] {Boolean} Whether relative dates should be used.","     * @return {String} Formatted result","     */","    format: function(object, relative) {","        var useRelative = false,","        s = [],","        datePattern = false,","        i;","","        if(relative !== null && relative !== \"\") {","            useRelative = true;","        }","","        for (i = 0; i < this._segments.length; i++) {","            //Mark datePattern sections in case of relative dates","            if(this._segments[i]._s.indexOf(\"<datePattern>\") === 0) {","                if(useRelative) {","                    s.push(relative);","                }","                datePattern = true;","                continue;","            }","            if(this._segments[i]._s.indexOf(\"</datePattern>\") === 0) {","                datePattern = false;","                continue;","            }","            if(!datePattern || !useRelative) {","                s.push(this._segments[i].format(object));","            }","        }","        return s.join(\"\");","    }","}, true);","","//","// Date segment class","//","","/**"," * Date Segment in the pattern"," * @class DateSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Intl.Common.BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.DateSegment = function(format, s) {","    DateFormat.DateSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DateSegment, Format.Segment);","","//","// Date era segment class","//","","/**"," * Era Segment in the pattern"," * @class EraSegment"," * @for Date.__DateFormat"," * @namespace Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.EraSegment = function(format, s) {","    DateFormat.EraSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);","","/**"," * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD"," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.EraSegment.prototype.format = function(/*date*/) {","    // NOTE: Only support current era at the moment...","    return this.getFormat().AD;","};","","//","// Date year segment class","//","","/**"," * Year Segment in the pattern"," * @class YearSegment"," * @namespace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.YearSegment = function(format, s) {","    DateFormat.YearSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.YearSegment.prototype, {","    /**","     * Format date and get the year segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var year = String(date.getFullYear());","        return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Intl.Common.zeroPad(year, this._s.length);","    }","}, true);","","//","// Date month segment class","//","","/**"," * Month Segment in the pattern"," * @class MonthSegment"," * @namepspace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.MonthSegment = function(format, s) {","    DateFormat.MonthSegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.MonthSegment.prototype, {","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.MonthSegment.MONTHS = {};","        DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [","        ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,","        ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,","        ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,","        ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [","        Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,","        Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,","        Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,","        Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium","        ];","        DateFormat.MonthSegment.MONTHS[DateFormat.LONG] = [","        Formats.monthJanLong, Formats.monthFebLong, Formats.monthMarLong,","        Formats.monthAprLong, Formats.monthMayLong, Formats.monthJunLong,","        Formats.monthJulLong, Formats.monthAugLong, Formats.monthSepLong,","        Formats.monthOctLong, Formats.monthNovLong, Formats.monthDecLong","        ];","    },","","    /**","     * Format date and get the month segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var month = date.getMonth();","        switch (this._s.length) {","            case 1:","                return String(month + 1);","            case 2:","                return Y.Intl.Common.zeroPad(month + 1, 2);","            case 3:","                return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];","            case 5:","                return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];","        }","        return DateFormat.MonthSegment.MONTHS[DateFormat.LONG][month];","    }","}, true);","","//","// Date week segment class","//","","/**"," * Week Segment in the pattern"," * @class WeekSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekSegment = function(format, s) {","    DateFormat.WeekSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);","","/**"," * Format date and get the week segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.WeekSegment.prototype.format = function(date) {","    var year = date.getYear(),","    month = date.getMonth(),","    day = date.getDate(),","    ofYear = /w/.test(this._s),","    date2 = new Date(year, ofYear ? 0 : month, 1),","    week = 1;","    while (!(date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day))) {","        date2.setDate(date2.getDate() + 7);","        week++;","    }","","    return Y.Intl.Common.zeroPad(week, this._s.length);","};","","//","// Date day segment class","//","","/**"," * Day Segment in the pattern"," * @class DaySegment"," * @namespace Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.DaySegment = function(format, s) {","    DateFormat.DaySegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);","","/**"," * Format date and get the day segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.DaySegment.prototype.format = function(date) {","    var month = date.getMonth(),","    day = date.getDate(),","    year = date.getYear(),","    date2;","","    if (/D/.test(this._s)) {","        while (month > 0) {","            // set date to first day of month and then go back one day","            date2 = new Date(year, month, 1);","            date2.setDate(0);","			","            day += date2.getDate();","            month--;","        }","    }","    return Y.Intl.Common.zeroPad(day, this._s.length);","};","","//","// Date weekday segment class","//","","/**"," * Weekday Segment in the pattern"," * @class WeekdaySegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekdaySegment = function(format, s) {","    DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);","","Y.mix(DateFormat.WeekdaySegment.prototype, {","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.WeekdaySegment.WEEKDAYS = {};","        // NOTE: The short names aren't available in Java so we have to define them.","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [","        ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,","        ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,","        ShortNames.weekdaySatShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [","        Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,","        Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,","        Formats.weekdaySatMedium","        ];","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.LONG] = [","        Formats.weekdaySunLong, Formats.weekdayMonLong, Formats.weekdayTueLong,","        Formats.weekdayWedLong, Formats.weekdayThuLong, Formats.weekdayFriLong,","        Formats.weekdaySatLong","        ];","    },","","    /**","     * Format date and get the weekday segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var weekday = date.getDay(),","        style;","        if (/E/.test(this._s)) {","            switch (this._s.length) {","                case 4:","                    style = DateFormat.LONG;","                    break;","                case 5:","                    style = DateFormat.SHORT;","                    break;","                default:","                    style = DateFormat.MEDIUM;","            }","            return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];","        }","        return Y.Intl.Common.zeroPad(weekday, this._s.length);","    }","}, true);","","//","// Time segment class","//","","/**"," * Time Segment in the pattern"," * @class TimeSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Intl.Common.BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimeSegment = function(format, s) {","    DateFormat.TimeSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimeSegment, Y.Intl.Common.BaseFormat.Segment);","","//","// Time hour segment class","//","","/**"," * Hour Segment in the pattern"," * @class HourSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.HourSegment = function(format, s) {","    DateFormat.HourSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.HourSegment.prototype, {","    /**","     * Format date and get the hour segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        if (hours > 12 && /[hK]/.test(this._s)) {","            hours -= 12;","        }","        else if (hours === 0 && /[h]/.test(this._s)) {","            hours = 12;","        }","        /***","            // NOTE: This is commented out to match the Java formatter output","            //       but from the comments for these meta-chars, it doesn't","            //       seem right.","            if (/[Hk]/.test(this._s)) {","                hours--;","            }","        /***/","        return Y.Intl.Common.zeroPad(hours, this._s.length);","    }","}, true);","","//","// Time minute segment class","//","","/**"," * Minute Segment in the pattern"," * @class MinuteSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.MinuteSegment = function(format, s) {","    DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.MinuteSegment.prototype, {","    /**","     * Format date and get the minute segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var minutes = date.getMinutes();","        return Y.Intl.Common.zeroPad(minutes, this._s.length);","    }","}, true);","","//","// Time second segment class","//","","/**"," * Second Segment in the pattern"," * @class SecondSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.SecondSegment = function(format, s) {","    DateFormat.SecondSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);","","/**"," * Format date and get the second segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.SecondSegment.prototype.format = function(date) {","    var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();","    return Y.Intl.Common.zeroPad(minutes, this._s.length);","};","","//","// Time am/pm segment class","//","","/**"," * AM/PM Segment in the pattern"," * @class AmPmSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.AmPmSegment = function(format, s) {","    DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.AmPmSegment.prototype, {","    /**","     * Format date and get the AM/PM segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        return hours < 12 ? this.getFormat().Formats.periodAm : this.getFormat().Formats.periodPm;","    }","}, true);","","//","// Time timezone segment class","//","","/**"," * TimeZone Segment in the pattern"," * @class TimezoneSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimezoneSegment = function(format, s) {","    DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.TimezoneSegment.prototype, {","    /**","     * Format date and get the timezone segment.","     * @method format","     * //param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(/*date*/) {","        var timeZone = this.getFormat().timeZone;","        if (/Z/.test(this._s)) {","            return timeZone.getShortName();","        }","        return this._s.length < 4 ? timeZone.getMediumName() : timeZone.getLongName();","    }","}, true);","    ","//","// Non-Gregorian Calendars","//","","/*"," * Buddhist Calendar. This is normally used only for Thai locales (th)."," * @class __BuddhistDateFormat"," * @namespace Date"," * @extends __zDateFormat"," * @constructor"," * @private"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {","    BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);","        ","    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar","    var segments = this._segments, i;","    for(i=0; i<segments.length; i++) {","        if(segments[i] instanceof DateFormat.YearSegment) {","            segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);","        } else if (segments[i] instanceof DateFormat.EraSegment) {","            segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);","        }","    }","};","","BuddhistDateFormat = Y.Date.__BuddhistDateFormat;","Y.extend(BuddhistDateFormat, DateFormat);","    ","/**"," * YearSegment class for Buddhist Calender"," * @class YearSegment"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.YearSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.YearSegment}"," */","BuddhistDateFormat.YearSegment = function(segment) {","    BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);","","/**"," * Format date and get the year segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.YearSegment.prototype.format = function(date) {","    var year = date.getFullYear();","    year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC","    return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Intl.Common.zeroPad(year, this._s.length);","};","    ","/**"," * EraSegment class for Buddhist Calender"," * @class EraSegment"," * @for Date.__BuddhistDateFormat"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.EraSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.EraSegment}"," */","BuddhistDateFormat.EraSegment = function(segment) {","    BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);","","/**"," * Format date and get the era segment."," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {","    return \"BE\";    //Only Buddhist Era supported for now","};","","/**"," * Wrapper around the zimbra-based DateFormat for use in YUI. API designed to be similar to ICU"," * @class __YDateFormat"," * namespace Date"," * @private"," * @constructor"," * @param {String} [timeZone] TZ database ID for the time zone that should be used."," *                            If omitted, defaults to the system timezone"," * @param {Number} [dateFormat=0] Selector for the desired date format from Y.Date.DATE_FORMATS."," * @param {Number} [timeFormat=0] Selector for the desired time format from Y.Date.TIME_FORMATS."," * @param {Number} [timeZoneFormat=0] Selector for the desired time zone format from Y.Date.TIMEZONE_FORMATS."," */","Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {","        ","    if(timeZone === undefined || timeZone === null) {","        timeZone = Y.Date.Timezone.getTimezoneIdForOffset( new Date().getTimezoneOffset() * -60 );","    }","","    this._Formats = Y.Intl.get(MODULE_NAME);","        ","    //If not valid time zone","    if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {","        Y.error(\"Could not find timezone: \" + timeZone);","    }","","    this._timeZone = timeZone;","    this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);","","    this._dateFormat = dateFormat || 0;","    this._timeFormat = timeFormat || 0;","    this._timeZoneFormat = timeZoneFormat || 0;","","    this._relative = false;","    this._pattern = this._generatePattern();","","    var locale = Y.Intl.getLang(MODULE_NAME);","        ","    if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {","        //Use buddhist calendar","        this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);","    } else {","        //Use gregorian calendar","        this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);","    }","};","","YDateFormat = Y.Date.__YDateFormat;","","Y.mix(Y.Date, {","    /**","     * Date Format Style values to use during format/parse","     * @property DATE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DATE_FORMATS: {","        NONE: 0,","        WYMD_LONG: 1,","        WYMD_ABBREVIATED: 4,","        WYMD_SHORT: 8,","        WMD_LONG: 16,","        WMD_ABBREVIATED: 32,","        WMD_SHORT: 64,","        YMD_LONG: 128,","        YMD_ABBREVIATED: 256,","        YMD_SHORT: 512,","        YM_LONG: 1024,","        MD_LONG: 2048,","        MD_ABBREVIATED: 4096,","        MD_SHORT: 8192,","        W_LONG: 16384,","        W_ABBREVIATED: 32768,","        M_LONG: 65536,","        M_ABBREVIATED: 131072,","        YMD_FULL: 262144,","        RELATIVE_DATE: 524288","    },","","    /**","     * Time Format Style values to use during format/parse","     * @property TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIME_FORMATS: {","        NONE: 0,","        HM_ABBREVIATED: 1,","        HM_SHORT: 2,","        H_ABBREVIATED: 4","    },","","    /**","     * Timezone Format Style values to use during format/parse","     * @property TIMEZONE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIMEZONE_FORMATS: {","        NONE: 0,","        Z_ABBREVIATED: 1,","        Z_SHORT: 2","    }","});","","Y.mix(YDateFormat.prototype, {","    /**","     * Generate date pattern for selected format. For internal use only.","     * @method _generateDatePattern","     * @for Date.__YDateFormat","     * @private","     * @return {String} Date pattern","     */","    _generateDatePattern: function() {","        var format = this._dateFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.DATE_FORMATS[format];","        }","    ","        if(format === null) {","            return \"\";","        }","        /*jshint bitwise: false*/","        if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {","            this._relative = true;","            format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;","        }","        /*jshint bitwise: true*/","        switch(format) {","            //Use relative only for formats with day component","            case Y.Date.DATE_FORMATS.NONE:","                this._relative = false;","                return \"\";","            case Y.Date.DATE_FORMATS.WYMD_LONG:","                return this._Formats.WYMD_long;","            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:","                return this._Formats.WYMD_abbreviated;","            case Y.Date.DATE_FORMATS.WYMD_SHORT:","                return this._Formats.WYMD_short;","            case Y.Date.DATE_FORMATS.WMD_LONG:","                return this._Formats.WMD_long;","            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:","                return this._Formats.WMD_abbreviated;","            case Y.Date.DATE_FORMATS.WMD_SHORT:","                return this._Formats.WMD_short;","            case Y.Date.DATE_FORMATS.YMD_LONG:","                return this._Formats.YMD_long;","            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:","                return this._Formats.YMD_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_SHORT:","                return this._Formats.YMD_short;","            case Y.Date.DATE_FORMATS.YM_LONG:","                this._relative = false;","                return this._Formats.YM_long;","            case Y.Date.DATE_FORMATS.MD_LONG:","                return this._Formats.MD_long;","            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:","                return this._Formats.MD_abbreviated;","            case Y.Date.DATE_FORMATS.MD_SHORT:","                return this._Formats.MD_short;","            case Y.Date.DATE_FORMATS.W_LONG:","                this._relative = false;","                return this._Formats.W_long;","            case Y.Date.DATE_FORMATS.W_ABBREVIATED:","                this._relative = false;","                return this._Formats.W_abbreviated;","            case Y.Date.DATE_FORMATS.M_LONG:","                this._relative = false;","                return this._Formats.M_long;","            case Y.Date.DATE_FORMATS.M_ABBREVIATED:","                this._relative = false;","                return this._Formats.M_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_FULL:","                return this._Formats.YMD_full;","            default:","                Y.error(\"Date format given does not exist\");	//Error no such pattern.","        }","    },","        ","    /**","     * Generate time pattern for selected format. For internal use only","     * @method _generateTimePattern","     * @private","     * @return {String} Time pattern","     */","    _generateTimePattern: function() {","        var format = this._timeFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIME_FORMATS[format];","        }","    ","        if(format === null) {","            return \"\";","        }","        switch(format) {","            case Y.Date.TIME_FORMATS.NONE:","                return \"\";","            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:","                return this._Formats.HM_abbreviated;","            case Y.Date.TIME_FORMATS.HM_SHORT:","                return this._Formats.HM_short;","            case Y.Date.TIME_FORMATS.H_ABBREVIATED:","                return this._Formats.H_abbreviated;","            default:","                Y.error(\"Time format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate time-zone pattern for selected format. For internal use only.","     * @method _generateTimeZonePattern","     * @private","     * @return {String} Time-Zone pattern","     */","    _generateTimeZonePattern: function() {","        var format = this._timeZoneFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIMEZONE_FORMATS[format];","        }","    ","        if(format === null) {","            return \"\";","        }","        switch(format) {","            case Y.Date.TIMEZONE_FORMATS.NONE:","                return \"\";","            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:","                return \"z\";","            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:","                return \"Z\";","            default:","                Y.error(\"Time Zone format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate pattern for selected date, time and time-zone formats. For internal use only","     * @method _generatePattern","     * @private","     * @return {String} Combined pattern for date, time and time-zone","     */","    _generatePattern: function() {","        var datePattern = this._generateDatePattern(),","        timePattern = this._generateTimePattern(),","        timeZonePattern = this._generateTimeZonePattern(),","        pattern = \"\";","","        //Combine patterns. Mark date pattern part, to use with relative dates.","        if(datePattern !== \"\") {","            datePattern = \"'<datePattern>'\" + datePattern + \"'</datePattern>'\";","        }","        ","        if(timePattern !== \"\" && timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimeTimezoneCombination;","        } else if (timePattern !== \"\") {","            pattern = this._Formats.DateTimeCombination;","        } else if(timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimezoneCombination;","        } else if(datePattern !== \"\"){","            //Just date","            pattern = \"{1}\";","        }","        ","        pattern = pattern.replace(\"{0}\", timePattern).replace(\"{1}\", datePattern).replace(\"{2}\", timeZonePattern);","        ","        //Remove unnecessary whitespaces","        pattern = Y.Lang.trim(pattern.replace(/\\s\\s+/g, \" \"));","","        return pattern;","    },","","    /**","     * Formats a date","     * @method format","     * @param {Date} date The date to be formatted.","     * @return {String} The formatted string","     */","    format: function(date) {","        if(date === null || !Y.Lang.isDate(date)) {","            Y.error(\"format called without a date.\");","        }","        ","        var offset = this._timeZoneInstance.getRawOffset() * 1000,","        relativeDate = null,","        today = new Date(),","        tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),","        yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);","        date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);","","        if(this._relative) {","            if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {","                relativeDate = this._Formats.today;","            }","","            if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {","                relativeDate = this._Formats.tomorrow;","            }","","            if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {","                relativeDate = this._Formats.yesterday;","            }","        }","","        return this._dateFormatInstance.format(date, relativeDate);","    }","}, true);","/**"," * YRelativeTimeFormat class provides localized formatting of relative time values such as \"3 minutes ago\"."," * Relative time formats supported are defined by how many units they may include."," * Relative time is only used for past events. The Relative time formats use appropriate singular/plural/paucal/etc. forms for all languages."," * In order to keep relative time formats independent of time zones, relative day names such as today, yesterday, or tomorrow are not used."," */","","/**"," * Class to handle relative time formatting"," * @class __YRelativeTimeFormat"," * @namespace Date"," * @private"," * @constructor"," * @param [style='ONE_UNIT_LONG'] {Number|String} Selector for the desired relative time format. Should be key/value from Y.Date.RELATIVE_TIME_FORMATS"," */","Y.Date.__YRelativeTimeFormat = function(style) {","    if(style === null) {","        style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;","    } else if(Y.Lang.isString(style)) {","        style = Y.Date.RELATIVE_TIME_FORMATS[style];","    }","        ","    this.patterns = Y.Intl.get(MODULE_NAME);","    this.style = style;","		","    switch(style) {","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:","            this.numUnits = 2;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:","            this.numUnits = 2;","            this.abbr = false;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:","            this.numUnits = 1;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:","            this.numUnits = 1;","            this.abbr = false;","            break;","        default:","            Y.error(\"Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS\");","    }","};","","YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;","","Y.mix(Y.Date, {","    /**","     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.","     * @property","     * @type Number|function","     * @static","     */","    currentDate: function() { return new Date(); },","","    /**","     * Format Style values to use during format/parse","     * @property RELATIVE_TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    RELATIVE_TIME_FORMATS: {","        ONE_OR_TWO_UNITS_ABBREVIATED: 0,","        ONE_OR_TWO_UNITS_LONG: 1,","        ONE_UNIT_ABBREVIATED: 2,","        ONE_UNIT_LONG: 4","    }","});","	","/**"," * Formats a time value."," * @method format"," * @for Date.__YRelativeTimeFormat"," * @param {Number} timeValue The time value (seconds since Epoch) to be formatted."," * @param {Number} [relativeTo=Current Time] The time value (seconds since Epoch) in relation to which timeValue should be formatted.","          It must be greater than or equal to timeValue"," * @return {String} The formatted string"," */","YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {","    if(relativeTo === null) {","        relativeTo = (new Date()).getTime()/1000;","        if(timeValue > relativeTo) {","            Y.error(\"timeValue must be in the past\");","        }","    } else if(timeValue > relativeTo) {","        Y.error(\"relativeTo must be greater than or equal to timeValue\");","    }","","    var date = new Date((relativeTo - timeValue)*1000),","        result = [],","        numUnits = this.numUnits,","        value = date.getUTCFullYear() - 1970,	//Need zero-based index","        text, pattern, i;","        ","    if(value > 0) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.years_abbr : this.patterns.year_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.years : this.patterns.year);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMonth();","    if((numUnits > 0) && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.months_abbr : this.patterns.month_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.months : this.patterns.month);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCDate()-1;			//Need zero-based index","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.days_abbr : this.patterns.day_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.days : this.patterns.day);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCHours();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.hours_abbr : this.patterns.hour_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.hours : this.patterns.hour);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMinutes();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.minutes_abbr : this.patterns.minute_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.minutes : this.patterns.minute);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCSeconds();","    if(result.length === 0 || (numUnits > 0 && (numUnits < this.numUnits || value > 0))) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.seconds_abbr : this.patterns.second_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.seconds : this.patterns.second);","            result.push(text);","        }","        numUnits--;","    }","","    pattern = (result.length === 1) ? this.patterns[\"RelativeTime/oneUnit\"] : this.patterns[\"RelativeTime/twoUnits\"];","        ","    for(i=0; i<result.length; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", result[i]);","    }","    for(i=result.length; i<this.numUnits; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", \"\");","    }","    //Remove unnecessary whitespaces","    pattern = Y.Lang.trim(pattern.replace(/\\s+/g, \" \"));","        ","    return pattern;","};","/**"," * YDurationFormat class formats time in a language independent manner."," * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages."," */","","Y.mix(Y.Date, {","    /**","     * Strip decimal part of argument and return the integer part","     * @method _stripDecimals","     * @static","     * @private","     * @for Date","     * @param floatNum A real number","     * @return Integer part of floatNum","     */","    _stripDecimals: function (floatNum) {","        return floatNum > 0 ? Math.floor(floatNum): Math.ceil(floatNum);","    }","});","","/**"," * YDurationFormat class formats time in a language independent manner."," * @class __YDurationFormat"," * @namespace Date"," * @private"," * @constructor"," * @param style {Number|String} selector for the desired duration format. Can be key/value from Y.Date.DURATION_FORMATS"," */","Y.Date.__YDurationFormat = function(style) {","    if(style && Y.Lang.isString(style)) {","        style = Y.Date.DURATION_FORMATS[style];","    }","    this.style = style;","    this.patterns = Y.Intl.get(MODULE_NAME);","};","","YDurationFormat = Y.Date.__YDurationFormat;","","Y.mix(Y.Date, {","    /**","     * Format Style values to use during format/parse of Duration values","     * @property DURATION_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DURATION_FORMATS: {","        HMS_LONG: 0,","        HMS_SHORT: 1","    }","});","","Y.mix(YDurationFormat, {","    /**","     * Parse XMLDurationFormat (PnYnMnDTnHnMnS) and return an object with hours, minutes and seconds","     * Any absent values are set to -1, which will be ignored in HMS_long, and set to 0 in HMS_short","     * Year, Month and Day are ignored. Only Hours, Minutes and Seconds are used","     * @method _getDuration_XML","     * @static","     * @private","     * @for Date.__YDurationFormat","     * @param {String} xmlDuration XML Duration String.","     *      The lexical representation for duration is the [ISO 8601] extended format PnYnMnDTnHnMnS,","     *      where nY represents the number of years, nM the number of months, nD the number of days,","     *      'T' is the date/time separator,","     *      nH the number of hours, nM the number of minutes and nS the number of seconds.","     *      The number of seconds can include decimal digits to arbitrary precision.","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_XML: function (xmlDuration) {","        var regex = new RegExp(/P(\\d+Y)?(\\d+M)?(\\d+D)?T(\\d+H)?(\\d+M)?(\\d+(\\.\\d+)?S)/),","            matches = xmlDuration.match(regex);","        ","        if(matches === null) {","            Y.error(\"xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'\");","        }","        ","        return {","            hours: parseInt(matches[4] || -1, 10),","            minutes: parseInt(matches[5] || -1, 10),","            seconds: parseFloat(matches[6] || -1, 10)","        };","    },","    ","    /**","     * Get duration from time in seconds.","     * The value should be integer value in seconds, and should not be negative.","     * @method _getDuration_Seconds","     * @static","     * @private","     * @param {Number} timeValueInSeconds Duration in seconds","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_Seconds: function (timeValueInSeconds) {","        var duration = {};","        if(timeValueInSeconds < 0) {","            Y.error(\"TimeValue cannot be negative\");","        }","                ","        duration.hours = Y.Date._stripDecimals(timeValueInSeconds / 3600);","                ","        timeValueInSeconds %= 3600;","        duration.minutes = Y.Date._stripDecimals(timeValueInSeconds / 60);","                ","        timeValueInSeconds %= 60;","        duration.seconds = timeValueInSeconds;","        ","        return duration;","    }","});","    ","/**"," * Formats the given value into a duration format string."," * For XML duration format, the string should be in the pattern PnYnMnDTnHnMnS."," * Please note that year, month and day fields are ignored in this version."," * For future compatibility, please do not pass Year/Month/Day in the parameter."," *"," * For hours, minutes, and seconds, any absent or negative parts are ignored in HMS_long format,"," * but are treated as 0 in HMS_short format style."," *"," * @method"," * @private"," * @param oDuration {String|Number|Object} Duration as time in seconds (Integer),","          XML duration format (String), or an object with hours, minutes and seconds"," * @return {String} The formatted string"," */","YDurationFormat.prototype.format = function(oDuration) {","    if(Y.Lang.isNumber(oDuration)) {","        oDuration = YDurationFormat._getDuration_Seconds(oDuration);","    } else if(Y.Lang.isString(oDuration)) {","        oDuration = YDurationFormat._getDuration_XML(oDuration);","    }","    ","    var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,","        result = {","            hours: \"\",","            minutes: \"\",","            seconds: \"\"","        },","        resultPattern = \"\",","        formatNumber = function(num) { return num; };","","    if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }","    if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }","    if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }","   ","    //Test minutes and seconds for invalid values","    if(oDuration.minutes > 59 || oDuration.seconds > 59) {","        Y.error(\"Minutes and Seconds should be less than 60\");","    }","","    //If number format available, use it, otherwise do not format number.","    if (Y.Number !== undefined && Y.Number.format !== undefined) {","        formatNumber = function(num) { return Y.Number.format(num); };","    }","    if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {","        resultPattern = this.patterns.HMS_long;","        if(oDuration.hours >= 0) {","            result.hours = formatNumber(oDuration.hours) + \" \" + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);","        }","","        if(oDuration.minutes >= 0) {","            result.minutes = oDuration.minutes + \" \" + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);","        }","","        if(oDuration.seconds >= 0) {","            result.seconds = oDuration.seconds + \" \" + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);","        }","    } else {                                            //HMS_SHORT","        resultPattern = this.patterns.HMS_short;","        result = {","             hours: formatNumber(oDuration.hours),","             minutes: Y.Intl.Common.zeroPad(oDuration.minutes, 2),","             seconds: Y.Intl.Common.zeroPad(oDuration.seconds, 2)","        };","    }","        ","    resultPattern = resultPattern.replace(\"{0}\", result.hours);","    resultPattern = resultPattern.replace(\"{1}\", result.minutes);","    resultPattern = resultPattern.replace(\"{2}\", result.seconds);","       ","    //Remove unnecessary whitespaces","    resultPattern = Y.Lang.trim(resultPattern.replace(/\\s\\s+/g, \" \"));","       ","    return resultPattern;","};","","Y.Date.oldFormat = Y.Date.format;","","Y.mix(Y.Date, {","    /**","     * Takes a native JavaScript Date and formats it as a string for display to user. Can be configured with the oConfig parameter.","     * For relative time format, dates are compared to current time. To compare to a different time, set the parameter Y.Date.currentDate","     * Configuration object can have 4 optional parameters:","     *     [dateFormat=0] {String|Number} Date format to use. Should be a key/value from Y.Date.DATE_FORMATS.","     *     [timeFormat=0] {String|Number} Time format to use. Should be a key/value from Y.Date.TIME_FORMATS.","     *     [timezoneFormat=0] {String|Number} Timezone format to use. Should be a key/value from Y.Date.TIMEZONE_FORMATS.","     *     [relativeTimeFormat=0] {String|Number} RelativeTime format to use. Should be a key/value from Y.Date.RELATIVE_TIME_FORMATS.","     *     [format] {HTML} Format string as pattern. This is passed to the Y.Date.format method from datatype-date-format module.","                           If this parameter is used, the other three will be ignored.","     * @for Date","     * @method format","     * @param oDate {Date} Date","     * @param [oConfig] {Object} Object literal of configuration values.","     * @return {String} string representation of the date","     * @example","            var date = new Date();","            Y.Date.format(date, { timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\", timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\" });","            Y.Date.format(date, { relativeTimeFormat: \"ONE_OR_TWO_UNITS_LONG\" });","            Y.Date.format(date, { format: \"%Y-%m-%d\"});","     */","    format: function(oDate, oConfig) {","        oConfig = oConfig || {};","        if(oConfig.format && Y.Lang.isString(oConfig.format)) {","            return Y.Date.oldFormat(oDate, oConfig);","        }","    ","        if(!Y.Lang.isDate(oDate)) {","            return Y.Lang.isValue(oDate) ? oDate : \"\";","        }","                ","        var formatter, relativeTo;","        if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {","            formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);","            return formatter.format(oDate);","        }","    ","        relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);","        if(oConfig.relativeTimeFormat) {","            formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);","            return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);","        }","","        Y.error(\"Unrecognized format options.\");","    },","","    /**","     * Returns a string representation of the duration","     * @method format","     * @param oDuration {String|Number|Object} Duration as time in seconds, xml duration format, or an object with hours, minutes and seconds","     * @param [oConfig] {Object} Configuration object. Used to pass style parameter to the method.","                        'style' can be a string (HMS_LONG/HMS_SHORT) or the numerical values in Y.Date.DURATION_FORMATS","     * @return {String} string representation of the duration","     * @example","                Y.Date.formatDuration(3601, { style: \"HMS_LONG\" });","                Y.Date.formatDuration(\"PT11H22M33S\", { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40 }, { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40, seconds: 5 }, { style: \"HMS_LONG\" });","     */","    formatDuration: function(oDuration, oConfig) {","        oConfig = oConfig || {};","        return new YDurationFormat(oConfig.style).format(oDuration);","    }","}, true);","","","}, '@VERSION@', {","    \"lang\": [","        \"af\",","        \"am\",","        \"ar-DZ\",","        \"ar-JO\",","        \"ar\",","        \"ar-LB\",","        \"ar-MA\",","        \"ar-SY\",","        \"ar-TN\",","        \"as\",","        \"az-Cyrl\",","        \"az\",","        \"be\",","        \"bg\",","        \"bn-IN\",","        \"bn\",","        \"bo\",","        \"ca\",","        \"cs\",","        \"cy\",","        \"da\",","        \"de-AT\",","        \"de-BE\",","        \"de\",","        \"el\",","        \"en-AU\",","        \"en-BE\",","        \"en-BW\",","        \"en-CA\",","        \"en-GB\",","        \"en-HK\",","        \"en-IE\",","        \"en-IN\",","        \"en-JO\",","        \"en-MT\",","        \"en-MY\",","        \"en-NZ\",","        \"en-PH\",","        \"en-RH\",","        \"en-SG\",","        \"en-US\",","        \"en-US-POSIX\",","        \"en-ZA\",","        \"en-ZW\",","        \"eo\",","        \"es-AR\",","        \"es-CL\",","        \"es-CO\",","        \"es-EC\",","        \"es-GT\",","        \"es-HN\",","        \"es\",","        \"es-PA\",","        \"es-PE\",","        \"es-PR\",","        \"es-US\",","        \"et\",","        \"eu\",","        \"fa-AF\",","        \"fa\",","        \"fi\",","        \"fil\",","        \"fo\",","        \"fr-BE\",","        \"fr-CA\",","        \"fr-CH\",","        \"fr\",","        \"ga\",","        \"gl\",","        \"gsw\",","        \"gu\",","        \"gv\",","        \"ha\",","        \"haw\",","        \"he\",","        \"hi\",","        \"hr\",","        \"hu\",","        \"hy\",","        \"id\",","        \"ii\",","        \"in\",","        \"is\",","        \"it-CH\",","        \"it\",","        \"iw\",","        \"ja-JP-TRADITIONAL\",","        \"ja\",","        \"\",","        \"ka\",","        \"kk\",","        \"kl\",","        \"km\",","        \"kn\",","        \"ko\",","        \"kok\",","        \"kw\",","        \"lt\",","        \"lv\",","        \"mk\",","        \"ml\",","        \"mr\",","        \"ms-BN\",","        \"ms\",","        \"mt\",","        \"nb\",","        \"ne-IN\",","        \"ne\",","        \"nl-BE\",","        \"nl\",","        \"nn\",","        \"no\",","        \"no-NO-NY\",","        \"om\",","        \"or\",","        \"pa-Arab\",","        \"pa\",","        \"pa-PK\",","        \"pl\",","        \"ps\",","        \"pt\",","        \"pt-PT\",","        \"ro\",","        \"ru\",","        \"ru-UA\",","        \"sh\",","        \"si\",","        \"sk\",","        \"sl\",","        \"so\",","        \"sq\",","        \"sr-BA\",","        \"sr-Cyrl-BA\",","        \"sr\",","        \"sr-Latn\",","        \"sr-Latn-ME\",","        \"sr-ME\",","        \"sv-FI\",","        \"sv\",","        \"sw\",","        \"ta\",","        \"te\",","        \"th\",","        \"ti-ER\",","        \"ti\",","        \"tl\",","        \"tr\",","        \"uk\",","        \"ur-IN\",","        \"ur\",","        \"ur-PK\",","        \"uz\",","        \"uz-Latn\",","        \"vi\",","        \"zh-Hans-SG\",","        \"zh-Hant-HK\",","        \"zh-Hant\",","        \"zh-Hant-MO\",","        \"zh-HK\",","        \"zh\",","        \"zh-MO\",","        \"zh-SG\",","        \"zh-TW\",","        \"zu\"","    ],","    \"requires\": [","        \"gallery-advanced-date-timezone\"","    ]","});"];
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].lines = {"1":0,"25":0,"28":0,"29":0,"31":0,"77":0,"78":0,"79":0,"81":0,"82":0,"84":0,"87":0,"88":0,"89":0,"90":0,"91":0,"93":0,"94":0,"96":0,"97":0,"98":0,"99":0,"100":0,"103":0,"104":0,"105":0,"106":0,"107":0,"109":0,"110":0,"111":0,"114":0,"116":0,"117":0,"123":0,"124":0,"128":0,"136":0,"146":0,"147":0,"150":0,"152":0,"154":0,"155":0,"157":0,"158":0,"160":0,"161":0,"164":0,"165":0,"168":0,"169":0,"172":0,"173":0,"175":0,"176":0,"181":0,"182":0,"184":0,"185":0,"188":0,"189":0,"192":0,"193":0,"195":0,"206":0,"211":0,"212":0,"215":0,"217":0,"218":0,"219":0,"221":0,"222":0,"224":0,"225":0,"226":0,"228":0,"229":0,"232":0,"251":0,"252":0,"254":0,"271":0,"272":0,"274":0,"282":0,"284":0,"302":0,"303":0,"305":0,"307":0,"315":0,"316":0,"335":0,"336":0,"337":0,"339":0,"341":0,"347":0,"348":0,"355":0,"356":0,"362":0,"377":0,"378":0,"380":0,"382":0,"384":0,"386":0,"388":0,"407":0,"408":0,"410":0,"418":0,"419":0,"425":0,"426":0,"427":0,"430":0,"447":0,"448":0,"450":0,"458":0,"459":0,"464":0,"465":0,"467":0,"468":0,"470":0,"471":0,"474":0,"492":0,"493":0,"494":0,"496":0,"498":0,"504":0,"506":0,"512":0,"513":0,"518":0,"532":0,"534":0,"535":0,"537":0,"538":0,"540":0,"541":0,"543":0,"545":0,"547":0,"566":0,"567":0,"569":0,"586":0,"587":0,"589":0,"591":0,"599":0,"600":0,"601":0,"603":0,"604":0,"614":0,"633":0,"634":0,"636":0,"638":0,"646":0,"647":0,"666":0,"667":0,"669":0,"677":0,"678":0,"679":0,"697":0,"698":0,"700":0,"702":0,"710":0,"711":0,"730":0,"731":0,"733":0,"735":0,"743":0,"744":0,"745":0,"747":0,"766":0,"767":0,"770":0,"771":0,"772":0,"773":0,"774":0,"775":0,"780":0,"781":0,"792":0,"793":0,"796":0,"804":0,"805":0,"806":0,"807":0,"820":0,"821":0,"824":0,"832":0,"833":0,"848":0,"850":0,"851":0,"854":0,"857":0,"858":0,"861":0,"862":0,"864":0,"865":0,"866":0,"868":0,"869":0,"871":0,"873":0,"875":0,"878":0,"882":0,"884":0,"946":0,"955":0,"956":0,"957":0,"960":0,"961":0,"964":0,"965":0,"966":0,"969":0,"972":0,"973":0,"975":0,"977":0,"979":0,"981":0,"983":0,"985":0,"987":0,"989":0,"991":0,"993":0,"994":0,"996":0,"998":0,"1000":0,"1002":0,"1003":0,"1005":0,"1006":0,"1008":0,"1009":0,"1011":0,"1012":0,"1014":0,"1016":0,"1027":0,"1028":0,"1029":0,"1032":0,"1033":0,"1035":0,"1037":0,"1039":0,"1041":0,"1043":0,"1045":0,"1056":0,"1057":0,"1058":0,"1061":0,"1062":0,"1064":0,"1066":0,"1068":0,"1070":0,"1072":0,"1083":0,"1089":0,"1090":0,"1093":0,"1094":0,"1095":0,"1096":0,"1097":0,"1098":0,"1099":0,"1101":0,"1104":0,"1107":0,"1109":0,"1119":0,"1120":0,"1123":0,"1128":0,"1130":0,"1131":0,"1132":0,"1135":0,"1136":0,"1139":0,"1140":0,"1144":0,"1162":0,"1163":0,"1164":0,"1165":0,"1166":0,"1169":0,"1170":0,"1172":0,"1174":0,"1175":0,"1176":0,"1178":0,"1179":0,"1180":0,"1182":0,"1183":0,"1184":0,"1186":0,"1187":0,"1188":0,"1190":0,"1194":0,"1196":0,"1203":0,"1230":0,"1231":0,"1232":0,"1233":0,"1234":0,"1236":0,"1237":0,"1240":0,"1246":0,"1247":0,"1248":0,"1249":0,"1251":0,"1252":0,"1254":0,"1257":0,"1258":0,"1259":0,"1260":0,"1261":0,"1263":0,"1264":0,"1266":0,"1269":0,"1270":0,"1271":0,"1272":0,"1273":0,"1275":0,"1276":0,"1278":0,"1281":0,"1282":0,"1283":0,"1284":0,"1285":0,"1287":0,"1288":0,"1290":0,"1293":0,"1294":0,"1295":0,"1296":0,"1297":0,"1299":0,"1300":0,"1302":0,"1305":0,"1306":0,"1307":0,"1308":0,"1309":0,"1311":0,"1312":0,"1314":0,"1317":0,"1319":0,"1320":0,"1322":0,"1323":0,"1326":0,"1328":0,"1335":0,"1346":0,"1358":0,"1359":0,"1360":0,"1362":0,"1363":0,"1366":0,"1368":0,"1383":0,"1401":0,"1404":0,"1405":0,"1408":0,"1425":0,"1426":0,"1427":0,"1430":0,"1432":0,"1433":0,"1435":0,"1436":0,"1438":0,"1457":0,"1458":0,"1459":0,"1460":0,"1461":0,"1464":0,"1471":0,"1473":0,"1474":0,"1475":0,"1478":0,"1479":0,"1483":0,"1484":0,"1486":0,"1487":0,"1488":0,"1489":0,"1492":0,"1493":0,"1496":0,"1497":0,"1500":0,"1501":0,"1508":0,"1509":0,"1510":0,"1513":0,"1515":0,"1518":0,"1520":0,"1545":0,"1546":0,"1547":0,"1550":0,"1551":0,"1554":0,"1555":0,"1556":0,"1557":0,"1560":0,"1561":0,"1562":0,"1563":0,"1566":0,"1583":0,"1584":0};
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].functions = {"__zDateFormat:77":0,"_createSegment:145":0,"format:205":0,"DateSegment:251":0,"EraSegment:271":0,"format:282":0,"YearSegment:302":0,"format:314":0,"MonthSegment:335":0,"initialize:346":0,"format:376":0,"WeekSegment:407":0,"format:418":0,"DaySegment:447":0,"format:458":0,"WeekdaySegment:492":0,"initialize:503":0,"format:531":0,"TimeSegment:566":0,"HourSegment:586":0,"format:598":0,"MinuteSegment:633":0,"format:645":0,"SecondSegment:666":0,"format:677":0,"AmPmSegment:697":0,"format:709":0,"TimezoneSegment:730":0,"format:742":0,"__BuddhistDateFormat:766":0,"YearSegment:792":0,"format:804":0,"EraSegment:820":0,"format:832":0,"__YDateFormat:848":0,"_generateDatePattern:954":0,"_generateTimePattern:1026":0,"_generateTimeZonePattern:1055":0,"_generatePattern:1082":0,"format:1118":0,"__YRelativeTimeFormat:1162":0,"currentDate:1203":0,"format:1230":0,"_stripDecimals:1345":0,"__YDurationFormat:1358":0,"_getDuration_XML:1400":0,"_getDuration_Seconds:1424":0,"formatNumber:1471":0,"formatNumber:1484":0,"format:1457":0,"format:1544":0,"formatDuration:1582":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].coveredLines = 471;
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].coveredFunctions = 53;
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
Format, ShortNames, DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 28);
Format = Y.Intl.Common.BaseFormat;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 29);
Y.Date.__advancedFormat = true;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 31);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 77);
Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__zDateFormat", 77);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 78);
DateFormat.superclass.constructor.call(this, pattern, formats);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 79);
this.timeZone = new Y.Date.Timezone(timeZoneId);
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 81);
if (pattern === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 82);
return;
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 84);
var segment, i, c, field, metaRegex, count,
    literalRegex = /^(('((''|[^'])+?)'(?!'))|[^GyMwWDdFEaHkKhmsSzZ']+)/;
    
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 87);
for (i = 0; i < pattern.length; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 88);
c = pattern.charAt(i);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 89);
if(DateFormat._META_CHARS.indexOf(c) !== -1) {     //c is a meta char
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 90);
if(c === 'E') {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 91);
console.log("E");
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 93);
metaRegex = new RegExp("^" + c+"+");
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 94);
field = metaRegex.exec(pattern.slice(i))[0];
            
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 96);
segment = this._createSegment(c, field);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 97);
if (segment !== null) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 98);
i += field.length - 1;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 99);
segment._index = this._segments.length;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 100);
this._segments.push(segment);
            }
        } else {  //Non-meta char. Should create a TextSegment
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 103);
field = literalRegex.exec(pattern.slice(i));     //Get TextSegment field. Quoted literal or any character not a meta
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 104);
if(field) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 105);
field = field[0];
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 106);
count = field.length;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 107);
i += count - 1;
                
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 109);
if(field.indexOf("''") !== -1) {     //If contains double apostrophe
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 110);
field = field.replace("''", "'");
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 111);
pattern = pattern.slice(0, i) + field + pattern.slice(i+count);
                }

                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 114);
field = field.replace(/^'/, "").replace(/'$/, ""); //remove leading and trailing quotes, if any
                
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 116);
segment = new Format.TextSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 117);
this._segments.push(segment);
            }
        }
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 123);
DateFormat = Y.Date.__zDateFormat;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 124);
Y.extend(DateFormat, Format);

// Constants

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 128);
Y.mix(DateFormat, {
    SHORT: 0,
    MEDIUM: 1,
    LONG: 2,
    DEFAULT: 1,
    _META_CHARS: "GyMwWDdFEaHkKhmsSzZ"
});

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 136);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_createSegment", 145);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 146);
if(!field) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 147);
return null;
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 150);
var segment = null;
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 152);
switch (ch) {
            case 'G':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 154);
segment = new DateFormat.EraSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 155);
break;
            case 'y':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 157);
segment = new DateFormat.YearSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 158);
break;
            case 'M':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 160);
segment = new DateFormat.MonthSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 161);
break;
            case 'w':
            case 'W':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 164);
segment = new DateFormat.WeekSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 165);
break;
            case 'D':
            case 'd':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 168);
segment = new DateFormat.DaySegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 169);
break;
            case 'F':
            case 'E':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 172);
segment = new DateFormat.WeekdaySegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 173);
break;
            case 'a':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 175);
segment = new DateFormat.AmPmSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 176);
break;
            case 'H':
            case 'k':
            case 'K':
            case 'h':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 181);
segment = new DateFormat.HourSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 182);
break;
            case 'm':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 184);
segment = new DateFormat.MinuteSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 185);
break;
            case 's':
            case 'S':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 188);
segment = new DateFormat.SecondSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 189);
break;
            case 'z':
            case 'Z':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 192);
segment = new DateFormat.TimezoneSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 193);
break;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 195);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 205);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 206);
var useRelative = false,
        s = [],
        datePattern = false,
        i;

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 211);
if(relative !== null && relative !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 212);
useRelative = true;
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 215);
for (i = 0; i < this._segments.length; i++) {
            //Mark datePattern sections in case of relative dates
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 217);
if(this._segments[i]._s.indexOf("<datePattern>") === 0) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 218);
if(useRelative) {
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 219);
s.push(relative);
                }
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 221);
datePattern = true;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 222);
continue;
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 224);
if(this._segments[i]._s.indexOf("</datePattern>") === 0) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 225);
datePattern = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 226);
continue;
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 228);
if(!datePattern || !useRelative) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 229);
s.push(this._segments[i].format(object));
            }
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 232);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 251);
DateFormat.DateSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "DateSegment", 251);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 252);
DateFormat.DateSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 254);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 271);
DateFormat.EraSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "EraSegment", 271);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 272);
DateFormat.EraSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 274);
Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);

/**
 * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 282);
DateFormat.EraSegment.prototype.format = function(/*date*/) {
    // NOTE: Only support current era at the moment...
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 282);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 284);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 302);
DateFormat.YearSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "YearSegment", 302);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 303);
DateFormat.YearSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 305);
Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 307);
Y.mix(DateFormat.YearSegment.prototype, {
    /**
     * Format date and get the year segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 314);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 315);
var year = String(date.getFullYear());
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 316);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 335);
DateFormat.MonthSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "MonthSegment", 335);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 336);
DateFormat.MonthSegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 337);
this.initialize();
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 339);
Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 341);
Y.mix(DateFormat.MonthSegment.prototype, {
    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "initialize", 346);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 347);
DateFormat.MonthSegment.MONTHS = {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 348);
DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [
        ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,
        ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,
        ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,
        ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort
        ];

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 355);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 356);
DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [
        Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,
        Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,
        Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,
        Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium
        ];
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 362);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 376);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 377);
var month = date.getMonth();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 378);
switch (this._s.length) {
            case 1:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 380);
return String(month + 1);
            case 2:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 382);
return Y.Intl.Common.zeroPad(month + 1, 2);
            case 3:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 384);
return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];
            case 5:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 386);
return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 388);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 407);
DateFormat.WeekSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "WeekSegment", 407);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 408);
DateFormat.WeekSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 410);
Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);

/**
 * Format date and get the week segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 418);
DateFormat.WeekSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 418);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 419);
var year = date.getYear(),
    month = date.getMonth(),
    day = date.getDate(),
    ofYear = /w/.test(this._s),
    date2 = new Date(year, ofYear ? 0 : month, 1),
    week = 1;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 425);
while (!(date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day))) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 426);
date2.setDate(date2.getDate() + 7);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 427);
week++;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 430);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 447);
DateFormat.DaySegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "DaySegment", 447);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 448);
DateFormat.DaySegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 450);
Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);

/**
 * Format date and get the day segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 458);
DateFormat.DaySegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 458);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 459);
var month = date.getMonth(),
    day = date.getDate(),
    year = date.getYear(),
    date2;

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 464);
if (/D/.test(this._s)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 465);
while (month > 0) {
            // set date to first day of month and then go back one day
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 467);
date2 = new Date(year, month, 1);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 468);
date2.setDate(0);
			
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 470);
day += date2.getDate();
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 471);
month--;
        }
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 474);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 492);
DateFormat.WeekdaySegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "WeekdaySegment", 492);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 493);
DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 494);
this.initialize();
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 496);
Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 498);
Y.mix(DateFormat.WeekdaySegment.prototype, {
    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "initialize", 503);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 504);
DateFormat.WeekdaySegment.WEEKDAYS = {};
        // NOTE: The short names aren't available in Java so we have to define them.
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 506);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [
        ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,
        ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,
        ShortNames.weekdaySatShort
        ];

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 512);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 513);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [
        Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,
        Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,
        Formats.weekdaySatMedium
        ];
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 518);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 531);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 532);
var weekday = date.getDay(),
        style;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 534);
if (/E/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 535);
switch (this._s.length) {
                case 4:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 537);
style = DateFormat.LONG;
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 538);
break;
                case 5:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 540);
style = DateFormat.SHORT;
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 541);
break;
                default:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 543);
style = DateFormat.MEDIUM;
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 545);
return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 547);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 566);
DateFormat.TimeSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "TimeSegment", 566);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 567);
DateFormat.TimeSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 569);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 586);
DateFormat.HourSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "HourSegment", 586);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 587);
DateFormat.HourSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 589);
Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 591);
Y.mix(DateFormat.HourSegment.prototype, {
    /**
     * Format date and get the hour segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 598);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 599);
var hours = date.getHours();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 600);
if (hours > 12 && /[hK]/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 601);
hours -= 12;
        }
        else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 603);
if (hours === 0 && /[h]/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 604);
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
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 614);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 633);
DateFormat.MinuteSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "MinuteSegment", 633);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 634);
DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 636);
Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 638);
Y.mix(DateFormat.MinuteSegment.prototype, {
    /**
     * Format date and get the minute segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 645);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 646);
var minutes = date.getMinutes();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 647);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 666);
DateFormat.SecondSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "SecondSegment", 666);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 667);
DateFormat.SecondSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 669);
Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);

/**
 * Format date and get the second segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 677);
DateFormat.SecondSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 677);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 678);
var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 679);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 697);
DateFormat.AmPmSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "AmPmSegment", 697);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 698);
DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 700);
Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 702);
Y.mix(DateFormat.AmPmSegment.prototype, {
    /**
     * Format date and get the AM/PM segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 709);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 710);
var hours = date.getHours();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 711);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 730);
DateFormat.TimezoneSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "TimezoneSegment", 730);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 731);
DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 733);
Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 735);
Y.mix(DateFormat.TimezoneSegment.prototype, {
    /**
     * Format date and get the timezone segment.
     * @method format
     * //param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(/*date*/) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 742);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 743);
var timeZone = this.getFormat().timeZone;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 744);
if (/Z/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 745);
return timeZone.getShortName();
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 747);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 766);
Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__BuddhistDateFormat", 766);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 767);
BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);
        
    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 770);
var segments = this._segments, i;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 771);
for(i=0; i<segments.length; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 772);
if(segments[i] instanceof DateFormat.YearSegment) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 773);
segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 774);
if (segments[i] instanceof DateFormat.EraSegment) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 775);
segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);
        }}
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 780);
BuddhistDateFormat = Y.Date.__BuddhistDateFormat;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 781);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 792);
BuddhistDateFormat.YearSegment = function(segment) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "YearSegment", 792);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 793);
BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 796);
Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);

/**
 * Format date and get the year segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 804);
BuddhistDateFormat.YearSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 804);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 805);
var year = date.getFullYear();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 806);
year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 807);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 820);
BuddhistDateFormat.EraSegment = function(segment) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "EraSegment", 820);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 821);
BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 824);
Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);

/**
 * Format date and get the era segment.
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 832);
BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 832);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 833);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 848);
Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {
        
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YDateFormat", 848);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 850);
if(timeZone === undefined || timeZone === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 851);
timeZone = Y.Date.Timezone.getTimezoneIdForOffset( new Date().getTimezoneOffset() * -60 );
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 854);
this._Formats = Y.Intl.get(MODULE_NAME);
        
    //If not valid time zone
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 857);
if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 858);
Y.error("Could not find timezone: " + timeZone);
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 861);
this._timeZone = timeZone;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 862);
this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 864);
this._dateFormat = dateFormat || 0;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 865);
this._timeFormat = timeFormat || 0;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 866);
this._timeZoneFormat = timeZoneFormat || 0;

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 868);
this._relative = false;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 869);
this._pattern = this._generatePattern();

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 871);
var locale = Y.Intl.getLang(MODULE_NAME);
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 873);
if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {
        //Use buddhist calendar
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 875);
this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);
    } else {
        //Use gregorian calendar
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 878);
this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 882);
YDateFormat = Y.Date.__YDateFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 884);
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

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 946);
Y.mix(YDateFormat.prototype, {
    /**
     * Generate date pattern for selected format. For internal use only.
     * @method _generateDatePattern
     * @for Date.__YDateFormat
     * @private
     * @return {String} Date pattern
     */
    _generateDatePattern: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateDatePattern", 954);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 955);
var format = this._dateFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 956);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 957);
format = Y.Date.DATE_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 960);
if(format === null) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 961);
return "";
        }
        /*jshint bitwise: false*/
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 964);
if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 965);
this._relative = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 966);
format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;
        }
        /*jshint bitwise: true*/
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 969);
switch(format) {
            //Use relative only for formats with day component
            case Y.Date.DATE_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 972);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 973);
return "";
            case Y.Date.DATE_FORMATS.WYMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 975);
return this._Formats.WYMD_long;
            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 977);
return this._Formats.WYMD_abbreviated;
            case Y.Date.DATE_FORMATS.WYMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 979);
return this._Formats.WYMD_short;
            case Y.Date.DATE_FORMATS.WMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 981);
return this._Formats.WMD_long;
            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 983);
return this._Formats.WMD_abbreviated;
            case Y.Date.DATE_FORMATS.WMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 985);
return this._Formats.WMD_short;
            case Y.Date.DATE_FORMATS.YMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 987);
return this._Formats.YMD_long;
            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 989);
return this._Formats.YMD_abbreviated;
            case Y.Date.DATE_FORMATS.YMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 991);
return this._Formats.YMD_short;
            case Y.Date.DATE_FORMATS.YM_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 993);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 994);
return this._Formats.YM_long;
            case Y.Date.DATE_FORMATS.MD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 996);
return this._Formats.MD_long;
            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 998);
return this._Formats.MD_abbreviated;
            case Y.Date.DATE_FORMATS.MD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1000);
return this._Formats.MD_short;
            case Y.Date.DATE_FORMATS.W_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1002);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1003);
return this._Formats.W_long;
            case Y.Date.DATE_FORMATS.W_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1005);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1006);
return this._Formats.W_abbreviated;
            case Y.Date.DATE_FORMATS.M_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1008);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1009);
return this._Formats.M_long;
            case Y.Date.DATE_FORMATS.M_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1011);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1012);
return this._Formats.M_abbreviated;
            case Y.Date.DATE_FORMATS.YMD_FULL:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1014);
return this._Formats.YMD_full;
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1016);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateTimePattern", 1026);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1027);
var format = this._timeFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1028);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1029);
format = Y.Date.TIME_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1032);
if(format === null) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1033);
return "";
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1035);
switch(format) {
            case Y.Date.TIME_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1037);
return "";
            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1039);
return this._Formats.HM_abbreviated;
            case Y.Date.TIME_FORMATS.HM_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1041);
return this._Formats.HM_short;
            case Y.Date.TIME_FORMATS.H_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1043);
return this._Formats.H_abbreviated;
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1045);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateTimeZonePattern", 1055);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1056);
var format = this._timeZoneFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1057);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1058);
format = Y.Date.TIMEZONE_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1061);
if(format === null) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1062);
return "";
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1064);
switch(format) {
            case Y.Date.TIMEZONE_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1066);
return "";
            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1068);
return "z";
            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1070);
return "Z";
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1072);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generatePattern", 1082);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1083);
var datePattern = this._generateDatePattern(),
        timePattern = this._generateTimePattern(),
        timeZonePattern = this._generateTimeZonePattern(),
        pattern = "";

        //Combine patterns. Mark date pattern part, to use with relative dates.
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1089);
if(datePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1090);
datePattern = "'<datePattern>'" + datePattern + "'</datePattern>'";
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1093);
if(timePattern !== "" && timeZonePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1094);
pattern = this._Formats.DateTimeTimezoneCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1095);
if (timePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1096);
pattern = this._Formats.DateTimeCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1097);
if(timeZonePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1098);
pattern = this._Formats.DateTimezoneCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1099);
if(datePattern !== ""){
            //Just date
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1101);
pattern = "{1}";
        }}}}
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1104);
pattern = pattern.replace("{0}", timePattern).replace("{1}", datePattern).replace("{2}", timeZonePattern);
        
        //Remove unnecessary whitespaces
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1107);
pattern = Y.Lang.trim(pattern.replace(/\s\s+/g, " "));

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1109);
return pattern;
    },

    /**
     * Formats a date
     * @method format
     * @param {Date} date The date to be formatted.
     * @return {String} The formatted string
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1118);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1119);
if(date === null || !Y.Lang.isDate(date)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1120);
Y.error("format called without a date.");
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1123);
var offset = this._timeZoneInstance.getRawOffset() * 1000,
        relativeDate = null,
        today = new Date(),
        tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),
        yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1128);
date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1130);
if(this._relative) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1131);
if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1132);
relativeDate = this._Formats.today;
            }

            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1135);
if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1136);
relativeDate = this._Formats.tomorrow;
            }

            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1139);
if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1140);
relativeDate = this._Formats.yesterday;
            }
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1144);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1162);
Y.Date.__YRelativeTimeFormat = function(style) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YRelativeTimeFormat", 1162);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1163);
if(style === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1164);
style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1165);
if(Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1166);
style = Y.Date.RELATIVE_TIME_FORMATS[style];
    }}
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1169);
this.patterns = Y.Intl.get(MODULE_NAME);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1170);
this.style = style;
		
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1172);
switch(style) {
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1174);
this.numUnits = 2;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1175);
this.abbr = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1176);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1178);
this.numUnits = 2;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1179);
this.abbr = false;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1180);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1182);
this.numUnits = 1;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1183);
this.abbr = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1184);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1186);
this.numUnits = 1;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1187);
this.abbr = false;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1188);
break;
        default:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1190);
Y.error("Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS");
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1194);
YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1196);
Y.mix(Y.Date, {
    /**
     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.
     * @property
     * @type Number|function
     * @static
     */
    currentDate: function() { _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "currentDate", 1203);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1203);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1230);
YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1230);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1231);
if(relativeTo === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1232);
relativeTo = (new Date()).getTime()/1000;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1233);
if(timeValue > relativeTo) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1234);
Y.error("timeValue must be in the past");
        }
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1236);
if(timeValue > relativeTo) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1237);
Y.error("relativeTo must be greater than or equal to timeValue");
    }}

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1240);
var date = new Date((relativeTo - timeValue)*1000),
        result = [],
        numUnits = this.numUnits,
        value = date.getUTCFullYear() - 1970,	//Need zero-based index
        text, pattern, i;
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1246);
if(value > 0) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1247);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1248);
text = value + " " + (value !== 1 ? this.patterns.years_abbr : this.patterns.year_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1249);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1251);
text = value + " " + (value !== 1 ? this.patterns.years : this.patterns.year);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1252);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1254);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1257);
value = date.getUTCMonth();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1258);
if((numUnits > 0) && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1259);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1260);
text = value + " " + (value !== 1 ? this.patterns.months_abbr : this.patterns.month_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1261);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1263);
text = value + " " + (value !== 1 ? this.patterns.months : this.patterns.month);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1264);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1266);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1269);
value = date.getUTCDate()-1;			//Need zero-based index
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1270);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1271);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1272);
text = value + " " + (value !== 1 ? this.patterns.days_abbr : this.patterns.day_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1273);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1275);
text = value + " " + (value !== 1 ? this.patterns.days : this.patterns.day);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1276);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1278);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1281);
value = date.getUTCHours();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1282);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1283);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1284);
text = value + " " + (value !== 1 ? this.patterns.hours_abbr : this.patterns.hour_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1285);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1287);
text = value + " " + (value !== 1 ? this.patterns.hours : this.patterns.hour);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1288);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1290);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1293);
value = date.getUTCMinutes();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1294);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1295);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1296);
text = value + " " + (value !== 1 ? this.patterns.minutes_abbr : this.patterns.minute_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1297);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1299);
text = value + " " + (value !== 1 ? this.patterns.minutes : this.patterns.minute);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1300);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1302);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1305);
value = date.getUTCSeconds();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1306);
if(result.length === 0 || (numUnits > 0 && (numUnits < this.numUnits || value > 0))) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1307);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1308);
text = value + " " + (value !== 1 ? this.patterns.seconds_abbr : this.patterns.second_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1309);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1311);
text = value + " " + (value !== 1 ? this.patterns.seconds : this.patterns.second);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1312);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1314);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1317);
pattern = (result.length === 1) ? this.patterns["RelativeTime/oneUnit"] : this.patterns["RelativeTime/twoUnits"];
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1319);
for(i=0; i<result.length; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1320);
pattern = pattern.replace("{" + i + "}", result[i]);
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1322);
for(i=result.length; i<this.numUnits; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1323);
pattern = pattern.replace("{" + i + "}", "");
    }
    //Remove unnecessary whitespaces
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1326);
pattern = Y.Lang.trim(pattern.replace(/\s+/g, " "));
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1328);
return pattern;
};
/**
 * YDurationFormat class formats time in a language independent manner.
 * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages.
 */

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1335);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_stripDecimals", 1345);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1346);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1358);
Y.Date.__YDurationFormat = function(style) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YDurationFormat", 1358);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1359);
if(style && Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1360);
style = Y.Date.DURATION_FORMATS[style];
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1362);
this.style = style;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1363);
this.patterns = Y.Intl.get(MODULE_NAME);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1366);
YDurationFormat = Y.Date.__YDurationFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1368);
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

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1383);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_getDuration_XML", 1400);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1401);
var regex = new RegExp(/P(\d+Y)?(\d+M)?(\d+D)?T(\d+H)?(\d+M)?(\d+(\.\d+)?S)/),
            matches = xmlDuration.match(regex);
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1404);
if(matches === null) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1405);
Y.error("xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'");
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1408);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_getDuration_Seconds", 1424);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1425);
var duration = {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1426);
if(timeValueInSeconds < 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1427);
Y.error("TimeValue cannot be negative");
        }
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1430);
duration.hours = Y.Date._stripDecimals(timeValueInSeconds / 3600);
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1432);
timeValueInSeconds %= 3600;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1433);
duration.minutes = Y.Date._stripDecimals(timeValueInSeconds / 60);
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1435);
timeValueInSeconds %= 60;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1436);
duration.seconds = timeValueInSeconds;
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1438);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1457);
YDurationFormat.prototype.format = function(oDuration) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1457);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1458);
if(Y.Lang.isNumber(oDuration)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1459);
oDuration = YDurationFormat._getDuration_Seconds(oDuration);
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1460);
if(Y.Lang.isString(oDuration)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1461);
oDuration = YDurationFormat._getDuration_XML(oDuration);
    }}
    
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1464);
var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,
        result = {
            hours: "",
            minutes: "",
            seconds: ""
        },
        resultPattern = "",
        formatNumber = function(num) { _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "formatNumber", 1471);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1471);
return num; };

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1473);
if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1474);
if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1475);
if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }
   
    //Test minutes and seconds for invalid values
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1478);
if(oDuration.minutes > 59 || oDuration.seconds > 59) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1479);
Y.error("Minutes and Seconds should be less than 60");
    }

    //If number format available, use it, otherwise do not format number.
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1483);
if (Y.Number !== undefined && Y.Number.format !== undefined) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1484);
formatNumber = function(num) { _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "formatNumber", 1484);
return Y.Number.format(num); };
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1486);
if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1487);
resultPattern = this.patterns.HMS_long;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1488);
if(oDuration.hours >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1489);
result.hours = formatNumber(oDuration.hours) + " " + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1492);
if(oDuration.minutes >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1493);
result.minutes = oDuration.minutes + " " + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1496);
if(oDuration.seconds >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1497);
result.seconds = oDuration.seconds + " " + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);
        }
    } else {                                            //HMS_SHORT
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1500);
resultPattern = this.patterns.HMS_short;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1501);
result = {
             hours: formatNumber(oDuration.hours),
             minutes: Y.Intl.Common.zeroPad(oDuration.minutes, 2),
             seconds: Y.Intl.Common.zeroPad(oDuration.seconds, 2)
        };
    }
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1508);
resultPattern = resultPattern.replace("{0}", result.hours);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1509);
resultPattern = resultPattern.replace("{1}", result.minutes);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1510);
resultPattern = resultPattern.replace("{2}", result.seconds);
       
    //Remove unnecessary whitespaces
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1513);
resultPattern = Y.Lang.trim(resultPattern.replace(/\s\s+/g, " "));
       
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1515);
return resultPattern;
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1518);
Y.Date.oldFormat = Y.Date.format;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1520);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1544);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1545);
oConfig = oConfig || {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1546);
if(oConfig.format && Y.Lang.isString(oConfig.format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1547);
return Y.Date.oldFormat(oDate, oConfig);
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1550);
if(!Y.Lang.isDate(oDate)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1551);
return Y.Lang.isValue(oDate) ? oDate : "";
        }
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1554);
var formatter, relativeTo;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1555);
if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1556);
formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1557);
return formatter.format(oDate);
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1560);
relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1561);
if(oConfig.relativeTimeFormat) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1562);
formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1563);
return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1566);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "formatDuration", 1582);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1583);
oConfig = oConfig || {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1584);
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
