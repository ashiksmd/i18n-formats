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
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].code=["YUI.add('gallery-advanced-date-format', function (Y, NAME) {","","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","","/**"," * This module provides absolute/relative date and time formatting, as well as duration formatting"," * Applications can choose date, time, and time zone components separately."," * For dates, relative descriptions (English \"yesterday\", German \"vorgestern\", Japanese \"後天\") are also supported."," *"," * This module uses a few modified parts of zimbra AjxFormat to handle dates and time."," *"," * Absolute formats use the default calendar specified in CLDR for each locale."," * Currently this means the Buddhist calendar for Thailand; the Gregorian calendar for all other countries."," * However, you can specify other calendars using language subtags;"," * for example, for Thai the Gregorian calendar can be specified as th-TH-u-ca-gregory."," *"," * Relative time formats only support times in the past. It can represent times like \"1 hour 5 minutes ago\""," *"," * @module gallery-advance-date-format"," * @requires gallery-advanced-date-timezone"," */","","var MODULE_NAME = \"gallery-advanced-date-format\",","    Format, ShortNames, DateFormat, BuddhistDateFormat, YDateFormat, YRelativeTimeFormat, YDurationFormat;","","Format = Y.Intl.Common.BaseFormat;","Y.Date.__advancedFormat = true;","","ShortNames = {","        \"weekdayMonShort\":\"M\",","        \"weekdayTueShort\":\"T\",","        \"weekdayWedShort\":\"W\",","        \"weekdayThuShort\":\"T\",","        \"weekdayFriShort\":\"F\",","        \"weekdaySatShort\":\"S\",","        \"weekdaySunShort\":\"S\",","        \"monthJanShort\":\"J\",","        \"monthFebShort\":\"F\",","        \"monthMarShort\":\"M\",","        \"monthAprShort\":\"A\",","        \"monthMayShort\":\"M\",","        \"monthJunShort\":\"J\",","        \"monthJulShort\":\"J\",","        \"monthAugShort\":\"A\",","        \"monthSepShort\":\"S\",","        \"monthOctShort\":\"O\",","        \"monthNovShort\":\"N\",","        \"monthDecShort\":\"D\"","};","    ","//","// Date format class","//","","/**"," * The DateFormat class formats Date objects according to a specified pattern."," * The patterns are defined the same as the SimpleDateFormat class in the Java libraries."," *"," * Note:"," * The date format differs from the Java patterns a few ways: the pattern"," * \"EEEEE\" (5 'E's) denotes a <em>short</em> weekday and the pattern \"MMMMM\""," * (5 'M's) denotes a <em>short</em> month name. This matches the extended"," * pattern found in the Common Locale Data Repository (CLDR) found at:"," * http://www.unicode.org/cldr/."," *"," * @class __zDateFormat"," * @extends Intl.Common.BaseFormat"," * @namespace Date"," * @private"," * @constructor"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__zDateFormat = function(pattern, formats, timeZoneId) {","    DateFormat.superclass.constructor.call(this, pattern, formats);","    this.timeZone = new Y.Date.Timezone(timeZoneId);","        ","    if (pattern === null) {","        return;","    }","    var head, tail, segment, i, c, count, field;","    for (i = 0; i < pattern.length; i++) {","        // literal","        c = pattern.charAt(i);","        if (c === \"'\") {","            head = i + 1;","            for (i++ ; i < pattern.length; i++) {","                c = pattern.charAt(i);","                if (c === \"'\") {","                    if (i + 1 < pattern.length && pattern.charAt(i + 1) === \"'\") {","                        pattern = pattern.substr(0, i) + pattern.substr(i + 1);","                    }","                    else {","                        break;","                    }","                }","            }","            if (i === pattern.length) {","		Y.error(\"unterminated string literal\");","            }","            tail = i;","            segment = new Format.TextSegment(this, pattern.substring(head, tail));","            this._segments.push(segment);","            continue;","        }","","        // non-meta chars","        head = i;","        while(i < pattern.length) {","            c = pattern.charAt(i);","            if (DateFormat._META_CHARS.indexOf(c) !== -1 || c === \"'\") {","                break;","            }","            i++;","        }","        tail = i;","        if (head !== tail) {","            segment = new Format.TextSegment(this, pattern.substring(head, tail));","            this._segments.push(segment);","            i--;","            continue;","        }","		","        // meta char","        head = i;","        while(++i < pattern.length) {","            if (pattern.charAt(i) !== c) {","                break;","            }","        }","        tail = i--;","        count = tail - head;","        field = pattern.substr(head, count);","        segment = null;","        switch (c) {","            case 'G':","                segment = new DateFormat.EraSegment(this, field);","                break;","            case 'y':","                segment = new DateFormat.YearSegment(this, field);","                break;","            case 'M':","                segment = new DateFormat.MonthSegment(this, field);","                break;","            case 'w':","            case 'W':","                segment = new DateFormat.WeekSegment(this, field);","                break;","            case 'D':","            case 'd':","                segment = new DateFormat.DaySegment(this, field);","                break;","            case 'F':","            case 'E':","                segment = new DateFormat.WeekdaySegment(this, field);","                break;","            case 'a':","                segment = new DateFormat.AmPmSegment(this, field);","                break;","            case 'H':","            case 'k':","            case 'K':","            case 'h':","                segment = new DateFormat.HourSegment(this, field);","                break;","            case 'm':","                segment = new DateFormat.MinuteSegment(this, field);","                break;","            case 's':","            case 'S':","                segment = new DateFormat.SecondSegment(this, field);","                break;","            case 'z':","            case 'Z':","                segment = new DateFormat.TimezoneSegment(this, field);","                break;","        }","        if (segment !== null) {","            segment._index = this._segments.length;","            this._segments.push(segment);","        }","    }","};","","DateFormat = Y.Date.__zDateFormat;","Y.extend(DateFormat, Format);","","// Constants","","Y.mix(DateFormat, {","	SHORT: 0,","	MEDIUM: 1,","	LONG: 2,","	DEFAULT: 1,","	_META_CHARS: \"GyMwWDdFEaHkKhmsSzZ\"","});","","/**"," * Format the date"," * @method format"," * @param object {Date} The date to be formatted"," * @param [relative=false] {Boolean} Whether relative dates should be used."," * @return {String} Formatted result"," */","DateFormat.prototype.format = function(object, relative) {","    var useRelative = false,","        s = [],","        datePattern = false,","        i;","","    if(relative !== null && relative !== \"\") {","        useRelative = true;","    }","","    for (i = 0; i < this._segments.length; i++) {","        //Mark datePattern sections in case of relative dates","        if(this._segments[i]._s.indexOf(\"<datePattern>\") === 0) {","            if(useRelative) {","                s.push(relative);","            }","            datePattern = true;","            continue;","        }","        if(this._segments[i]._s.indexOf(\"</datePattern>\") === 0) {","            datePattern = false;","            continue;","        }","        if(!datePattern || !useRelative) {","            s.push(this._segments[i].format(object));","        }","    }","    return s.join(\"\");","};","","//","// Date segment class","//","","/**"," * Date Segment in the pattern"," * @class DateSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Intl.Common.BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.DateSegment = function(format, s) {","    DateFormat.DateSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DateSegment, Format.Segment);","","//","// Date era segment class","//","","/**"," * Era Segment in the pattern"," * @class EraSegment"," * @for Date.__DateFormat"," * @namespace Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.EraSegment = function(format, s) {","    DateFormat.EraSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);","","/**"," * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD"," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.EraSegment.prototype.format = function(/*date*/) {","    // NOTE: Only support current era at the moment...","    return this.getFormat().AD;","};","","//","// Date year segment class","//","","/**"," * Year Segment in the pattern"," * @class YearSegment"," * @namespace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.YearSegment = function(format, s) {","    DateFormat.YearSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.YearSegment.prototype, {","    /**","     * Format date and get the year segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var year = String(date.getFullYear());","        return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Intl.Common.zeroPad(year, this._s.length);","    }","}, true);","","//","// Date month segment class","//","","/**"," * Month Segment in the pattern"," * @class MonthSegment"," * @namepspace Date.__DateFormat"," * @for Date.__DateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__DateFormat} The parent Format object."," * @param s {String} The pattern representing the segment"," */","DateFormat.MonthSegment = function(format, s) {","    DateFormat.MonthSegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);","","Y.mix(DateFormat.MonthSegment.prototype, {","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.MonthSegment.MONTHS = {};","        DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [","            ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,","            ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,","            ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,","            ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [","            Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,","            Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,","            Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,","            Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium","        ];","        DateFormat.MonthSegment.MONTHS[DateFormat.LONG] = [","            Formats.monthJanLong, Formats.monthFebLong, Formats.monthMarLong,","            Formats.monthAprLong, Formats.monthMayLong, Formats.monthJunLong,","            Formats.monthJulLong, Formats.monthAugLong, Formats.monthSepLong,","            Formats.monthOctLong, Formats.monthNovLong, Formats.monthDecLong","        ];","    },","","    /**","     * Format date and get the month segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var month = date.getMonth();","        switch (this._s.length) {","            case 1:","                return String(month + 1);","            case 2:","                return Y.Intl.Common.zeroPad(month + 1, 2);","            case 3:","                return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];","            case 5:","                return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];","        }","        return DateFormat.MonthSegment.MONTHS[DateFormat.LONG][month];","    }","}, true);","","//","// Date week segment class","//","","/**"," * Week Segment in the pattern"," * @class WeekSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekSegment = function(format, s) {","    DateFormat.WeekSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);","","/**"," * Format date and get the week segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.WeekSegment.prototype.format = function(date) {","    var year = date.getYear(),","        month = date.getMonth(),","        day = date.getDate(),","	ofYear = /w/.test(this._s),","        date2 = new Date(year, ofYear ? 0 : month, 1),","        week = 0;","    while (true) {","        week++;","        if (date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day)) {","            break;","        }","        date2.setDate(date2.getDate() + 7);","    }","","    return Y.Intl.Common.zeroPad(week, this._s.length);","};","","//","// Date day segment class","//","","/**"," * Day Segment in the pattern"," * @class DaySegment"," * @namespace Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.DaySegment = function(format, s) {","    DateFormat.DaySegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);","","/**"," * Format date and get the day segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.DaySegment.prototype.format = function(date) {","    var month = date.getMonth(),","        day = date.getDate(),","        year = date.getYear(),","        date2;","","    if (/D/.test(this._s) && month > 0) {","        do {","            // set date to first day of month and then go back one day","            date2 = new Date(year, month, 1);","            date2.setDate(0);","			","            day += date2.getDate();","            month--;","        } while (month > 0);","    }","    return Y.Intl.Common.zeroPad(day, this._s.length);","};","","//","// Date weekday segment class","//","","/**"," * Weekday Segment in the pattern"," * @class WeekdaySegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends DateSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.WeekdaySegment = function(format, s) {","    DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);","    this.initialize();","};","Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);","","Y.mix(DateFormat.WeekdaySegment.prototype, {","    /**","     * Initialize with locale specific data.","     * @method initialize","     */","    initialize: function() {","        DateFormat.WeekdaySegment.WEEKDAYS = {};","        // NOTE: The short names aren't available in Java so we have to define them.","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [","            ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,","            ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,","            ShortNames.weekdaySatShort","        ];","","        var Formats = this.getFormat().Formats;","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [","            Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,","            Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,","            Formats.weekdaySatMedium","        ];","        DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.LONG] = [","            Formats.weekdaySunLong, Formats.weekdayMonLong, Formats.weekdayTueLong,","            Formats.weekdayWedLong, Formats.weekdayThuLong, Formats.weekdayFriLong,","            Formats.weekdaySatLong","        ];","    },","","    /**","     * Format date and get the weekday segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var weekday = date.getDay(),","            style;","        if (/E/.test(this._s)) {","            switch (this._s.length) {","                case 4:","                    style = DateFormat.LONG;","                    break;","                case 5:","                    style = DateFormat.SHORT;","                    break;","                default:","                    style = DateFormat.MEDIUM;","            }","            return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];","        }","        return Y.Intl.Common.zeroPad(weekday, this._s.length);","    }","}, true);","","//","// Time segment class","//","","/**"," * Time Segment in the pattern"," * @class TimeSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends Intl.Common.BaseFormat.Segment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimeSegment = function(format, s) {","    DateFormat.TimeSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimeSegment, Y.Intl.Common.BaseFormat.Segment);","","//","// Time hour segment class","//","","/**"," * Hour Segment in the pattern"," * @class HourSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.HourSegment = function(format, s) {","    DateFormat.HourSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.HourSegment.prototype, {","    /**","     * Format date and get the hour segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        if (hours > 12 && /[hK]/.test(this._s)) {","            hours -= 12;","        }","        else if (hours === 0 && /[h]/.test(this._s)) {","            hours = 12;","        }","        /***","            // NOTE: This is commented out to match the Java formatter output","            //       but from the comments for these meta-chars, it doesn't","            //       seem right.","            if (/[Hk]/.test(this._s)) {","                hours--;","            }","        /***/","        return Y.Intl.Common.zeroPad(hours, this._s.length);","    }","}, true);","","//","// Time minute segment class","//","","/**"," * Minute Segment in the pattern"," * @class MinuteSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.MinuteSegment = function(format, s) {","    DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.MinuteSegment.prototype, {","    /**","     * Format date and get the minute segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var minutes = date.getMinutes();","        return Y.Intl.Common.zeroPad(minutes, this._s.length);","    }","}, true);","","//","// Time second segment class","//","","/**"," * Second Segment in the pattern"," * @class SecondSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.SecondSegment = function(format, s) {","    DateFormat.SecondSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);","","/**"," * Format date and get the second segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","DateFormat.SecondSegment.prototype.format = function(date) {","    var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();","    return Y.Intl.Common.zeroPad(minutes, this._s.length);","};","","//","// Time am/pm segment class","//","","/**"," * AM/PM Segment in the pattern"," * @class AmPmSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object. Here it would be of type DateFormat (which extends Format)"," * @param s {String} The pattern representing the segment"," */","DateFormat.AmPmSegment = function(format, s) {","    DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.AmPmSegment.prototype, {","    /**","     * Format date and get the AM/PM segment.","     * @method format","     * @param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(date) {","        var hours = date.getHours();","        return hours < 12 ? this.getFormat().Formats.periodAm : this.getFormat().Formats.periodPm;","    }","}, true);","","//","// Time timezone segment class","//","","/**"," * TimeZone Segment in the pattern"," * @class TimezoneSegment"," * @namespace Date.__zDateFormat"," * @for Date.__zDateFormat"," * @extends TimeSegment"," * @private"," * @constructor"," * @param format {Date.__zDateFormat} The parent Format object"," * @param s {String} The pattern representing the segment"," */","DateFormat.TimezoneSegment = function(format, s) {","    DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);","};","Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);","","Y.mix(DateFormat.TimezoneSegment.prototype, {","    /**","     * Format date and get the timezone segment.","     * @method format","     * //param date {Date} The date to be formatted","     * @return {String} Formatted result","     */","    format: function(/*date*/) {","        var timeZone = this.getFormat().timeZone;","        if (/Z/.test(this._s)) {","            return timeZone.getShortName();","        }","        return this._s.length < 4 ? timeZone.getMediumName() : timeZone.getLongName();","    }","}, true);","    ","//","// Non-Gregorian Calendars","//","","/*"," * Buddhist Calendar. This is normally used only for Thai locales (th)."," * @class __BuddhistDateFormat"," * @namespace Date"," * @extends __zDateFormat"," * @constructor"," * @private"," * @param pattern {String} The pattern to format date in"," * @param formats {Object} Locale specific data"," * @param timeZoneId {String} Timezone Id according to Olson tz database"," */","Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {","    BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);","        ","    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar","    var segments = this._segments, i;","    for(i=0; i<segments.length; i++) {","        if(segments[i] instanceof DateFormat.YearSegment) {","            segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);","        } else if (segments[i] instanceof DateFormat.EraSegment) {","            segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);","        }","    }","};","","BuddhistDateFormat = Y.Date.__BuddhistDateFormat;","Y.extend(BuddhistDateFormat, DateFormat);","    ","/**"," * YearSegment class for Buddhist Calender"," * @class YearSegment"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.YearSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.YearSegment}"," */","BuddhistDateFormat.YearSegment = function(segment) {","    BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);","","/**"," * Format date and get the year segment."," * @method format"," * @param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.YearSegment.prototype.format = function(date) {","    var year = date.getFullYear();","    year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC","    return this._s.length !== 1 && this._s.length < 4 ? year.substr(year.length - 2) : Y.Intl.Common.zeroPad(year, this._s.length);","};","    ","/**"," * EraSegment class for Buddhist Calender"," * @class EraSegment"," * @for Date.__BuddhistDateFormat"," * @namespace Date.__BuddhistDateFormat"," * @extends Date.__zDateFormat.EraSegment"," * @private"," * @constructor"," * @param segment {Date.__zDateFormat.EraSegment}"," */","BuddhistDateFormat.EraSegment = function(segment) {","    BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);","};","","Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);","","/**"," * Format date and get the era segment."," * @method format"," * //param date {Date} The date to be formatted"," * @return {String} Formatted result"," */","BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {","    return \"BE\";    //Only Buddhist Era supported for now","};","","/**"," * Wrapper around the zimbra-based DateFormat for use in YUI. API designed to be similar to ICU"," * @class __YDateFormat"," * namespace Date"," * @private"," * @constructor"," * @param {String} [timeZone] TZ database ID for the time zone that should be used."," *                            If omitted, defaults to the system timezone"," * @param {Number} [dateFormat=0] Selector for the desired date format from Y.Date.DATE_FORMATS."," * @param {Number} [timeFormat=0] Selector for the desired time format from Y.Date.TIME_FORMATS."," * @param {Number} [timeZoneFormat=0] Selector for the desired time zone format from Y.Date.TIMEZONE_FORMATS."," */","Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {","        ","    if(timeZone === undefined || timeZone === null) {","        timeZone = Y.Date.Timezone.getTimezoneIdForOffset( new Date().getTimezoneOffset() * -60 );","    }","","    this._Formats = Y.Intl.get(MODULE_NAME);","        ","    //If not valid time zone","    if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {","	Y.error(\"Could not find timezone: \" + timeZone);","    }","","    this._timeZone = timeZone;","    this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);","","    this._dateFormat = dateFormat || 0;","    this._timeFormat = timeFormat || 0;","    this._timeZoneFormat = timeZoneFormat || 0;","","    this._relative = false;","    this._pattern = this._generatePattern();","","    var locale = Y.Intl.getLang(MODULE_NAME);","        ","    if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {","        //Use buddhist calendar","        this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);","    } else {","        //Use gregorian calendar","        this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);","    }","};","","YDateFormat = Y.Date.__YDateFormat;","","Y.mix(Y.Date, {","    /**","     * Date Format Style values to use during format/parse","     * @property DATE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DATE_FORMATS: {","        NONE: 0,","        WYMD_LONG: 1,","        WYMD_ABBREVIATED: 4,","        WYMD_SHORT: 8,","        WMD_LONG: 16,","        WMD_ABBREVIATED: 32,","        WMD_SHORT: 64,","        YMD_LONG: 128,","        YMD_ABBREVIATED: 256,","        YMD_SHORT: 512,","        YM_LONG: 1024,","        MD_LONG: 2048,","        MD_ABBREVIATED: 4096,","        MD_SHORT: 8192,","        W_LONG: 16384,","        W_ABBREVIATED: 32768,","        M_LONG: 65536,","        M_ABBREVIATED: 131072,","        YMD_FULL: 262144,","        RELATIVE_DATE: 524288","    },","","    /**","     * Time Format Style values to use during format/parse","     * @property TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIME_FORMATS: {","        NONE: 0,","        HM_ABBREVIATED: 1,","        HM_SHORT: 2,","        H_ABBREVIATED: 4","    },","","    /**","     * Timezone Format Style values to use during format/parse","     * @property TIMEZONE_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    TIMEZONE_FORMATS: {","        NONE: 0,","        Z_ABBREVIATED: 1,","        Z_SHORT: 2","    }","});","","Y.mix(YDateFormat.prototype, {","    /**","     * Generate date pattern for selected format. For internal use only.","     * @method _generateDatePattern","     * @for Date.__YDateFormat","     * @private","     * @return {String} Date pattern","     */","    _generateDatePattern: function() {","        var format = this._dateFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.DATE_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        /*jshint bitwise: false*/","        if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {","            this._relative = true;","            format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;","        }","        /*jshint bitwise: true*/","        switch(format) {","            //Use relative only for formats with day component","            case Y.Date.DATE_FORMATS.NONE:","                this._relative = false;","                return \"\";","            case Y.Date.DATE_FORMATS.WYMD_LONG:","                return this._Formats.WYMD_long;","            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:","                return this._Formats.WYMD_abbreviated;","            case Y.Date.DATE_FORMATS.WYMD_SHORT:","                return this._Formats.WYMD_short;","            case Y.Date.DATE_FORMATS.WMD_LONG:","                return this._Formats.WMD_long;","            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:","                return this._Formats.WMD_abbreviated;","            case Y.Date.DATE_FORMATS.WMD_SHORT:","                return this._Formats.WMD_short;","            case Y.Date.DATE_FORMATS.YMD_LONG:","                return this._Formats.YMD_long;","            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:","                return this._Formats.YMD_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_SHORT:","                return this._Formats.YMD_short;","            case Y.Date.DATE_FORMATS.YM_LONG:","                this._relative = false;","                return this._Formats.YM_long;","            case Y.Date.DATE_FORMATS.MD_LONG:","                return this._Formats.MD_long;","            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:","                return this._Formats.MD_abbreviated;","            case Y.Date.DATE_FORMATS.MD_SHORT:","                return this._Formats.MD_short;","            case Y.Date.DATE_FORMATS.W_LONG:","                this._relative = false;","                return this._Formats.W_long;","            case Y.Date.DATE_FORMATS.W_ABBREVIATED:","                this._relative = false;","                return this._Formats.W_abbreviated;","            case Y.Date.DATE_FORMATS.M_LONG:","                this._relative = false;","                return this._Formats.M_long;","            case Y.Date.DATE_FORMATS.M_ABBREVIATED:","                this._relative = false;","                return this._Formats.M_abbreviated;","            case Y.Date.DATE_FORMATS.YMD_FULL:","                return this._Formats.YMD_full;","            default:","                Y.error(\"Date format given does not exist\");	//Error no such pattern.","        }","    },","        ","    /**","     * Generate time pattern for selected format. For internal use only","     * @method _generateTimePattern","     * @private","     * @return {String} Time pattern","     */","    _generateTimePattern: function() {","        var format = this._timeFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIME_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        switch(format) {","            case Y.Date.TIME_FORMATS.NONE:","                return \"\";","            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:","                return this._Formats.HM_abbreviated;","            case Y.Date.TIME_FORMATS.HM_SHORT:","                return this._Formats.HM_short;","            case Y.Date.TIME_FORMATS.H_ABBREVIATED:","                return this._Formats.H_abbreviated;","            default:","                Y.error(\"Time format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate time-zone pattern for selected format. For internal use only.","     * @method _generateTimeZonePattern","     * @private","     * @return {String} Time-Zone pattern","     */","    _generateTimeZonePattern: function() {","        var format = this._timeZoneFormat;","        if(format && Y.Lang.isString(format)) {","            format = Y.Date.TIMEZONE_FORMATS[format];","        }","    ","        if(format === null) { return \"\"; }","        switch(format) {","            case Y.Date.TIMEZONE_FORMATS.NONE:","                return \"\";","            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:","                return \"z\";","            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:","                return \"Z\";","            default:","                Y.error(\"Time Zone format given does not exist\");	//Error no such pattern.","        }","    },","    ","    /**","     * Generate pattern for selected date, time and time-zone formats. For internal use only","     * @method _generatePattern","     * @private","     * @return {String} Combined pattern for date, time and time-zone","     */","    _generatePattern: function() {","        var datePattern = this._generateDatePattern(),","            timePattern = this._generateTimePattern(),","            timeZonePattern = this._generateTimeZonePattern(),","            pattern = \"\";","","        //Combine patterns. Mark date pattern part, to use with relative dates.","        if(datePattern !== \"\") {","            datePattern = \"'<datePattern>'\" + datePattern + \"'</datePattern>'\";","        }","        ","        if(timePattern !== \"\" && timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimeTimezoneCombination;","        } else if (timePattern !== \"\") {","            pattern = this._Formats.DateTimeCombination;","        } else if(timeZonePattern !== \"\") {","            pattern = this._Formats.DateTimezoneCombination;","        } else if(datePattern !== \"\"){","            //Just date","            pattern = \"{1}\";","        }","        ","        pattern = pattern.replace(\"{0}\", timePattern).replace(\"{1}\", datePattern).replace(\"{2}\", timeZonePattern);","        ","        //Remove unnecessary whitespaces","        pattern = Y.Lang.trim(pattern.replace(/\\s\\s+/g, \" \"));","","        return pattern;","    },","","    /**","     * Formats a date","     * @method format","     * @param {Date} date The date to be formatted.","     * @return {String} The formatted string","     */","    format: function(date) {","        if(date === null || !Y.Lang.isDate(date)) {","            Y.error(\"format called without a date.\");","        }","        ","        var offset = this._timeZoneInstance.getRawOffset() * 1000,","            relativeDate = null,","            today = new Date(),","            tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),","            yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);","        date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);","","        if(this._relative) {","            if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {","                relativeDate = this._Formats.today;","            }","","            if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {","                relativeDate = this._Formats.tomorrow;","            }","","            if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {","                relativeDate = this._Formats.yesterday;","            }","        }","","        return this._dateFormatInstance.format(date, relativeDate);","    }","}, true);","/**"," * YRelativeTimeFormat class provides localized formatting of relative time values such as \"3 minutes ago\"."," * Relative time formats supported are defined by how many units they may include."," * Relative time is only used for past events. The Relative time formats use appropriate singular/plural/paucal/etc. forms for all languages."," * In order to keep relative time formats independent of time zones, relative day names such as today, yesterday, or tomorrow are not used."," */","","/**"," * Class to handle relative time formatting"," * @class __YRelativeTimeFormat"," * @namespace Date"," * @private"," * @constructor"," * @param [style='ONE_UNIT_LONG'] {Number|String} Selector for the desired relative time format. Should be key/value from Y.Date.RELATIVE_TIME_FORMATS"," */","Y.Date.__YRelativeTimeFormat = function(style) {","    if(style === null) {","        style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;","    } else if(Y.Lang.isString(style)) {","        style = Y.Date.RELATIVE_TIME_FORMATS[style];","    }","        ","    this.patterns = Y.Intl.get(MODULE_NAME);","    this.style = style;","		","    switch(style) {","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:","            this.numUnits = 2;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:","            this.numUnits = 2;","            this.abbr = false;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:","            this.numUnits = 1;","            this.abbr = true;","            break;","        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:","            this.numUnits = 1;","            this.abbr = false;","            break;","        default:","            Y.error(\"Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS\");","    }","};","","YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;","","Y.mix(Y.Date, {","    /**","     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.","     * @property","     * @type Number|function","     * @static","     */","    currentDate: function() { return new Date(); },","","    /**","     * Format Style values to use during format/parse","     * @property RELATIVE_TIME_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    RELATIVE_TIME_FORMATS: {","        ONE_OR_TWO_UNITS_ABBREVIATED: 0,","        ONE_OR_TWO_UNITS_LONG: 1,","        ONE_UNIT_ABBREVIATED: 2,","        ONE_UNIT_LONG: 4","    }","});","	","/**"," * Formats a time value."," * @method format"," * @for Date.__YRelativeTimeFormat"," * @param {Number} timeValue The time value (seconds since Epoch) to be formatted."," * @param {Number} [relativeTo=Current Time] The time value (seconds since Epoch) in relation to which timeValue should be formatted.","          It must be greater than or equal to timeValue"," * @return {String} The formatted string"," */","YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {","    if(relativeTo === null) {","        relativeTo = (new Date()).getTime()/1000;","        if(timeValue > relativeTo) {","            Y.error(\"timeValue must be in the past\");","        }","    } else if(timeValue > relativeTo) {","        Y.error(\"relativeTo must be greater than or equal to timeValue\");","    }","","    var date = new Date((relativeTo - timeValue)*1000),","        result = [],","        numUnits = this.numUnits,","        value = date.getUTCFullYear() - 1970,	//Need zero-based index","        text, pattern, i;","        ","    if(value > 0) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.years_abbr : this.patterns.year_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.years : this.patterns.year);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMonth();","    if((numUnits > 0) && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.months_abbr : this.patterns.month_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.months : this.patterns.month);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCDate()-1;			//Need zero-based index","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.days_abbr : this.patterns.day_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.days : this.patterns.day);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCHours();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.hours_abbr : this.patterns.hour_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.hours : this.patterns.hour);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCMinutes();","    if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.minutes_abbr : this.patterns.minute_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.minutes : this.patterns.minute);","            result.push(text);","        }","        numUnits--;","    }","","    value = date.getUTCSeconds();","    if(result.length === 0 || (numUnits > 0 && (numUnits < this.numUnits || value > 0))) {","        if(this.abbr) {","            text = value + \" \" + (value !== 1 ? this.patterns.seconds_abbr : this.patterns.second_abbr);","            result.push(text);","        } else {","            text = value + \" \" + (value !== 1 ? this.patterns.seconds : this.patterns.second);","            result.push(text);","        }","        numUnits--;","    }","","    pattern = (result.length === 1) ? this.patterns[\"RelativeTime/oneUnit\"] : this.patterns[\"RelativeTime/twoUnits\"];","        ","    for(i=0; i<result.length; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", result[i]);","    }","    for(i=result.length; i<this.numUnits; i++) {","        pattern = pattern.replace(\"{\" + i + \"}\", \"\");","    }","    //Remove unnecessary whitespaces","    pattern = Y.Lang.trim(pattern.replace(/\\s+/g, \" \"));","        ","    return pattern;","};","/**"," * YDurationFormat class formats time in a language independent manner."," * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages."," */","","Y.mix(Y.Date, {","    /**","     * Strip decimal part of argument and return the integer part","     * @method _stripDecimals","     * @static","     * @private","     * @for Date","     * @param floatNum A real number","     * @return Integer part of floatNum","     */","    _stripDecimals: function (floatNum) {","        return floatNum > 0 ? Math.floor(floatNum): Math.ceil(floatNum);","    }","});","","/**"," * YDurationFormat class formats time in a language independent manner."," * @class __YDurationFormat"," * @namespace Date"," * @private"," * @constructor"," * @param style {Number|String} selector for the desired duration format. Can be key/value from Y.Date.DURATION_FORMATS"," */","Y.Date.__YDurationFormat = function(style) {","    if(style && Y.Lang.isString(style)) {","        style = Y.Date.DURATION_FORMATS[style];","    }","    this.style = style;","    this.patterns = Y.Intl.get(MODULE_NAME);","};","","YDurationFormat = Y.Date.__YDurationFormat;","","Y.mix(Y.Date, {","    /**","     * Format Style values to use during format/parse of Duration values","     * @property DURATION_FORMATS","     * @type Object","     * @static","     * @final","     * @for Date","     */","    DURATION_FORMATS: {","        HMS_LONG: 0,","        HMS_SHORT: 1","    }","});","","Y.mix(YDurationFormat, {","    /**","     * Parse XMLDurationFormat (PnYnMnDTnHnMnS) and return an object with hours, minutes and seconds","     * Any absent values are set to -1, which will be ignored in HMS_long, and set to 0 in HMS_short","     * Year, Month and Day are ignored. Only Hours, Minutes and Seconds are used","     * @method _getDuration_XML","     * @static","     * @private","     * @for Date.__YDurationFormat","     * @param {String} xmlDuration XML Duration String.","     *      The lexical representation for duration is the [ISO 8601] extended format PnYnMnDTnHnMnS,","     *      where nY represents the number of years, nM the number of months, nD the number of days,","     *      'T' is the date/time separator,","     *      nH the number of hours, nM the number of minutes and nS the number of seconds.","     *      The number of seconds can include decimal digits to arbitrary precision.","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_XML: function (xmlDuration) {","        var regex = new RegExp(/P(\\d+Y)?(\\d+M)?(\\d+D)?T(\\d+H)?(\\d+M)?(\\d+(\\.\\d+)?S)/),","            matches = xmlDuration.match(regex);","        ","        if(matches === null) {","            Y.error(\"xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'\");","        }","        ","        return {","            hours: parseInt(matches[4] || -1, 10),","            minutes: parseInt(matches[5] || -1, 10),","            seconds: parseFloat(matches[6] || -1, 10)","        };","    },","    ","    /**","     * Get duration from time in seconds.","     * The value should be integer value in seconds, and should not be negative.","     * @method _getDuration_Seconds","     * @static","     * @private","     * @param {Number} timeValueInSeconds Duration in seconds","     * @return {Object} Duration as an object with the parameters hours, minutes and seconds.","     */","    _getDuration_Seconds: function (timeValueInSeconds) {","        var duration = {};","        if(timeValueInSeconds < 0) {","            Y.error(\"TimeValue cannot be negative\");","        }","                ","        duration.hours = Y.Date._stripDecimals(timeValueInSeconds / 3600);","                ","        timeValueInSeconds %= 3600;","        duration.minutes = Y.Date._stripDecimals(timeValueInSeconds / 60);","                ","        timeValueInSeconds %= 60;","        duration.seconds = timeValueInSeconds;","        ","        return duration;","    }","});","    ","/**"," * Formats the given value into a duration format string."," * For XML duration format, the string should be in the pattern PnYnMnDTnHnMnS."," * Please note that year, month and day fields are ignored in this version."," * For future compatibility, please do not pass Year/Month/Day in the parameter."," *"," * For hours, minutes, and seconds, any absent or negative parts are ignored in HMS_long format,"," * but are treated as 0 in HMS_short format style."," *"," * @method"," * @private"," * @param oDuration {String|Number|Object} Duration as time in seconds (Integer),","          XML duration format (String), or an object with hours, minutes and seconds"," * @return {String} The formatted string"," */","YDurationFormat.prototype.format = function(oDuration) {","    if(Y.Lang.isNumber(oDuration)) {","        oDuration = YDurationFormat._getDuration_Seconds(oDuration);","    } else if(Y.Lang.isString(oDuration)) {","        oDuration = YDurationFormat._getDuration_XML(oDuration);","    }","    ","    var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,","        result = {","            hours: \"\",","            minutes: \"\",","            seconds: \"\"","        },","        resultPattern = \"\",","        formatNumber = function(num) { return num; };","","    if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }","    if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }","    if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }","   ","    //Test minutes and seconds for invalid values","    if(oDuration.minutes > 59 || oDuration.seconds > 59) {","        Y.error(\"Minutes and Seconds should be less than 60\");","    }","","    //If number format available, use it, otherwise do not format number.","    if (Y.Number !== undefined && Y.Number.format !== undefined) {","        formatNumber = function(num) { return Y.Number.format(num); };","    }","    if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {","        resultPattern = this.patterns.HMS_long;","        if(oDuration.hours >= 0) {","            result.hours = formatNumber(oDuration.hours) + \" \" + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);","        }","","        if(oDuration.minutes >= 0) {","            result.minutes = oDuration.minutes + \" \" + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);","        }","","        if(oDuration.seconds >= 0) {","            result.seconds = oDuration.seconds + \" \" + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);","        }","    } else {                                            //HMS_SHORT","        resultPattern = this.patterns.HMS_short;","        result = {","             hours: formatNumber(oDuration.hours),","             minutes: Y.Intl.Common.zeroPad(oDuration.minutes, 2),","             seconds: Y.Intl.Common.zeroPad(oDuration.seconds, 2)","        };","    }","        ","    resultPattern = resultPattern.replace(\"{0}\", result.hours);","    resultPattern = resultPattern.replace(\"{1}\", result.minutes);","    resultPattern = resultPattern.replace(\"{2}\", result.seconds);","       ","    //Remove unnecessary whitespaces","    resultPattern = Y.Lang.trim(resultPattern.replace(/\\s\\s+/g, \" \"));","       ","    return resultPattern;","};","","Y.Date.oldFormat = Y.Date.format;","","Y.mix(Y.Date, {","    /**","     * Takes a native JavaScript Date and formats it as a string for display to user. Can be configured with the oConfig parameter.","     * For relative time format, dates are compared to current time. To compare to a different time, set the parameter Y.Date.currentDate","     * Configuration object can have 4 optional parameters:","     *     [dateFormat=0] {String|Number} Date format to use. Should be a key/value from Y.Date.DATE_FORMATS.","     *     [timeFormat=0] {String|Number} Time format to use. Should be a key/value from Y.Date.TIME_FORMATS.","     *     [timezoneFormat=0] {String|Number} Timezone format to use. Should be a key/value from Y.Date.TIMEZONE_FORMATS.","     *     [relativeTimeFormat=0] {String|Number} RelativeTime format to use. Should be a key/value from Y.Date.RELATIVE_TIME_FORMATS.","     *     [format] {HTML} Format string as pattern. This is passed to the Y.Date.format method from datatype-date-format module.","                           If this parameter is used, the other three will be ignored.","     * @for Date","     * @method format","     * @param oDate {Date} Date","     * @param [oConfig] {Object} Object literal of configuration values.","     * @return {String} string representation of the date","     * @example","            var date = new Date();","            Y.Date.format(date, { timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\", timeFormat: \"HM_SHORT\", timezoneFormat: \"Z_SHORT\" });","            Y.Date.format(date, { dateFormat: \"YMD_FULL\" });","            Y.Date.format(date, { relativeTimeFormat: \"ONE_OR_TWO_UNITS_LONG\" });","            Y.Date.format(date, { format: \"%Y-%m-%d\"});","     */","    format: function(oDate, oConfig) {","        oConfig = oConfig || {};","        if(oConfig.format && Y.Lang.isString(oConfig.format)) {","            return Y.Date.oldFormat(oDate, oConfig);","        }","    ","        if(!Y.Lang.isDate(oDate)) {","            return Y.Lang.isValue(oDate) ? oDate : \"\";","        }","                ","        var formatter, relativeTo;","        if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {","            formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);","            return formatter.format(oDate);","        }","    ","        relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);","        if(oConfig.relativeTimeFormat) {","            formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);","            return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);","        }","","        Y.error(\"Unrecognized format options.\");","    },","","    /**","     * Returns a string representation of the duration","     * @method format","     * @param oDuration {String|Number|Object} Duration as time in seconds, xml duration format, or an object with hours, minutes and seconds","     * @param [oConfig] {Object} Configuration object. Used to pass style parameter to the method.","                        'style' can be a string (HMS_LONG/HMS_SHORT) or the numerical values in Y.Date.DURATION_FORMATS","     * @return {String} string representation of the duration","     * @example","                Y.Date.formatDuration(3601, { style: \"HMS_LONG\" });","                Y.Date.formatDuration(\"PT11H22M33S\", { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40 }, { style: \"HMS_SHORT\" });","                Y.Date.formatDuration({ hours: 1, minutes: 40, seconds: 5 }, { style: \"HMS_LONG\" });","     */","    formatDuration: function(oDuration, oConfig) {","        oConfig = oConfig || {};","        return new YDurationFormat(oConfig.style).format(oDuration);","    }","}, true);","","","}, '@VERSION@', {","    \"lang\": [","        \"af\",","        \"am\",","        \"ar-DZ\",","        \"ar-JO\",","        \"ar\",","        \"ar-LB\",","        \"ar-MA\",","        \"ar-SY\",","        \"ar-TN\",","        \"as\",","        \"az-Cyrl\",","        \"az\",","        \"be\",","        \"bg\",","        \"bn-IN\",","        \"bn\",","        \"bo\",","        \"ca\",","        \"cs\",","        \"cy\",","        \"da\",","        \"de-AT\",","        \"de-BE\",","        \"de\",","        \"el\",","        \"en-AU\",","        \"en-BE\",","        \"en-BW\",","        \"en-CA\",","        \"en-GB\",","        \"en-HK\",","        \"en-IE\",","        \"en-IN\",","        \"en-JO\",","        \"en-MT\",","        \"en-MY\",","        \"en-NZ\",","        \"en-PH\",","        \"en-RH\",","        \"en-SG\",","        \"en-US\",","        \"en-US-POSIX\",","        \"en-ZA\",","        \"en-ZW\",","        \"eo\",","        \"es-AR\",","        \"es-CL\",","        \"es-CO\",","        \"es-EC\",","        \"es-GT\",","        \"es-HN\",","        \"es\",","        \"es-PA\",","        \"es-PE\",","        \"es-PR\",","        \"es-US\",","        \"et\",","        \"eu\",","        \"fa-AF\",","        \"fa\",","        \"fi\",","        \"fil\",","        \"fo\",","        \"fr-BE\",","        \"fr-CA\",","        \"fr-CH\",","        \"fr\",","        \"ga\",","        \"gl\",","        \"gsw\",","        \"gu\",","        \"gv\",","        \"ha\",","        \"haw\",","        \"he\",","        \"hi\",","        \"hr\",","        \"hu\",","        \"hy\",","        \"id\",","        \"ii\",","        \"in\",","        \"is\",","        \"it-CH\",","        \"it\",","        \"iw\",","        \"ja-JP-TRADITIONAL\",","        \"ja\",","        \"\",","        \"ka\",","        \"kk\",","        \"kl\",","        \"km\",","        \"kn\",","        \"ko\",","        \"kok\",","        \"kw\",","        \"lt\",","        \"lv\",","        \"mk\",","        \"ml\",","        \"mr\",","        \"ms-BN\",","        \"ms\",","        \"mt\",","        \"nb\",","        \"ne-IN\",","        \"ne\",","        \"nl-BE\",","        \"nl\",","        \"nn\",","        \"no\",","        \"no-NO-NY\",","        \"om\",","        \"or\",","        \"pa-Arab\",","        \"pa\",","        \"pa-PK\",","        \"pl\",","        \"ps\",","        \"pt\",","        \"pt-PT\",","        \"ro\",","        \"ru\",","        \"ru-UA\",","        \"sh\",","        \"si\",","        \"sk\",","        \"sl\",","        \"so\",","        \"sq\",","        \"sr-BA\",","        \"sr-Cyrl-BA\",","        \"sr\",","        \"sr-Latn\",","        \"sr-Latn-ME\",","        \"sr-ME\",","        \"sv-FI\",","        \"sv\",","        \"sw\",","        \"ta\",","        \"te\",","        \"th\",","        \"ti-ER\",","        \"ti\",","        \"tl\",","        \"tr\",","        \"uk\",","        \"ur-IN\",","        \"ur\",","        \"ur-PK\",","        \"uz\",","        \"uz-Latn\",","        \"vi\",","        \"zh-Hans-SG\",","        \"zh-Hant-HK\",","        \"zh-Hant\",","        \"zh-Hant-MO\",","        \"zh-HK\",","        \"zh\",","        \"zh-MO\",","        \"zh-SG\",","        \"zh-TW\",","        \"zu\"","    ],","    \"requires\": [","        \"gallery-advanced-date-timezone\"","    ]","});"];
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].lines = {"1":0,"25":0,"28":0,"29":0,"31":0,"77":0,"78":0,"79":0,"81":0,"82":0,"84":0,"85":0,"87":0,"88":0,"89":0,"90":0,"91":0,"92":0,"93":0,"94":0,"97":0,"101":0,"102":0,"104":0,"105":0,"106":0,"107":0,"111":0,"112":0,"113":0,"114":0,"115":0,"117":0,"119":0,"120":0,"121":0,"122":0,"123":0,"124":0,"128":0,"129":0,"130":0,"131":0,"134":0,"135":0,"136":0,"137":0,"138":0,"140":0,"141":0,"143":0,"144":0,"146":0,"147":0,"150":0,"151":0,"154":0,"155":0,"158":0,"159":0,"161":0,"162":0,"167":0,"168":0,"170":0,"171":0,"174":0,"175":0,"178":0,"179":0,"181":0,"182":0,"183":0,"188":0,"189":0,"193":0,"208":0,"209":0,"214":0,"215":0,"218":0,"220":0,"221":0,"222":0,"224":0,"225":0,"227":0,"228":0,"229":0,"231":0,"232":0,"235":0,"253":0,"254":0,"256":0,"273":0,"274":0,"276":0,"284":0,"286":0,"304":0,"305":0,"307":0,"309":0,"317":0,"318":0,"337":0,"338":0,"339":0,"341":0,"343":0,"349":0,"350":0,"357":0,"358":0,"364":0,"379":0,"380":0,"382":0,"384":0,"386":0,"388":0,"390":0,"409":0,"410":0,"412":0,"420":0,"421":0,"427":0,"428":0,"429":0,"430":0,"432":0,"435":0,"452":0,"453":0,"455":0,"463":0,"464":0,"469":0,"470":0,"472":0,"473":0,"475":0,"476":0,"479":0,"497":0,"498":0,"499":0,"501":0,"503":0,"509":0,"511":0,"517":0,"518":0,"523":0,"537":0,"539":0,"540":0,"542":0,"543":0,"545":0,"546":0,"548":0,"550":0,"552":0,"571":0,"572":0,"574":0,"591":0,"592":0,"594":0,"596":0,"604":0,"605":0,"606":0,"608":0,"609":0,"619":0,"638":0,"639":0,"641":0,"643":0,"651":0,"652":0,"671":0,"672":0,"674":0,"682":0,"683":0,"684":0,"702":0,"703":0,"705":0,"707":0,"715":0,"716":0,"735":0,"736":0,"738":0,"740":0,"748":0,"749":0,"750":0,"752":0,"771":0,"772":0,"775":0,"776":0,"777":0,"778":0,"779":0,"780":0,"785":0,"786":0,"797":0,"798":0,"801":0,"809":0,"810":0,"811":0,"812":0,"825":0,"826":0,"829":0,"837":0,"838":0,"853":0,"855":0,"856":0,"859":0,"862":0,"863":0,"866":0,"867":0,"869":0,"870":0,"871":0,"873":0,"874":0,"876":0,"878":0,"880":0,"883":0,"887":0,"889":0,"951":0,"960":0,"961":0,"962":0,"965":0,"967":0,"968":0,"969":0,"972":0,"975":0,"976":0,"978":0,"980":0,"982":0,"984":0,"986":0,"988":0,"990":0,"992":0,"994":0,"996":0,"997":0,"999":0,"1001":0,"1003":0,"1005":0,"1006":0,"1008":0,"1009":0,"1011":0,"1012":0,"1014":0,"1015":0,"1017":0,"1019":0,"1030":0,"1031":0,"1032":0,"1035":0,"1036":0,"1038":0,"1040":0,"1042":0,"1044":0,"1046":0,"1057":0,"1058":0,"1059":0,"1062":0,"1063":0,"1065":0,"1067":0,"1069":0,"1071":0,"1082":0,"1088":0,"1089":0,"1092":0,"1093":0,"1094":0,"1095":0,"1096":0,"1097":0,"1098":0,"1100":0,"1103":0,"1106":0,"1108":0,"1118":0,"1119":0,"1122":0,"1127":0,"1129":0,"1130":0,"1131":0,"1134":0,"1135":0,"1138":0,"1139":0,"1143":0,"1161":0,"1162":0,"1163":0,"1164":0,"1165":0,"1168":0,"1169":0,"1171":0,"1173":0,"1174":0,"1175":0,"1177":0,"1178":0,"1179":0,"1181":0,"1182":0,"1183":0,"1185":0,"1186":0,"1187":0,"1189":0,"1193":0,"1195":0,"1202":0,"1229":0,"1230":0,"1231":0,"1232":0,"1233":0,"1235":0,"1236":0,"1239":0,"1245":0,"1246":0,"1247":0,"1248":0,"1250":0,"1251":0,"1253":0,"1256":0,"1257":0,"1258":0,"1259":0,"1260":0,"1262":0,"1263":0,"1265":0,"1268":0,"1269":0,"1270":0,"1271":0,"1272":0,"1274":0,"1275":0,"1277":0,"1280":0,"1281":0,"1282":0,"1283":0,"1284":0,"1286":0,"1287":0,"1289":0,"1292":0,"1293":0,"1294":0,"1295":0,"1296":0,"1298":0,"1299":0,"1301":0,"1304":0,"1305":0,"1306":0,"1307":0,"1308":0,"1310":0,"1311":0,"1313":0,"1316":0,"1318":0,"1319":0,"1321":0,"1322":0,"1325":0,"1327":0,"1334":0,"1345":0,"1357":0,"1358":0,"1359":0,"1361":0,"1362":0,"1365":0,"1367":0,"1382":0,"1400":0,"1403":0,"1404":0,"1407":0,"1424":0,"1425":0,"1426":0,"1429":0,"1431":0,"1432":0,"1434":0,"1435":0,"1437":0,"1456":0,"1457":0,"1458":0,"1459":0,"1460":0,"1463":0,"1470":0,"1472":0,"1473":0,"1474":0,"1477":0,"1478":0,"1482":0,"1483":0,"1485":0,"1486":0,"1487":0,"1488":0,"1491":0,"1492":0,"1495":0,"1496":0,"1499":0,"1500":0,"1507":0,"1508":0,"1509":0,"1512":0,"1514":0,"1517":0,"1519":0,"1544":0,"1545":0,"1546":0,"1549":0,"1550":0,"1553":0,"1554":0,"1555":0,"1556":0,"1559":0,"1560":0,"1561":0,"1562":0,"1565":0,"1582":0,"1583":0};
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].functions = {"__zDateFormat:77":0,"format:208":0,"DateSegment:253":0,"EraSegment:273":0,"format:284":0,"YearSegment:304":0,"format:316":0,"MonthSegment:337":0,"initialize:348":0,"format:378":0,"WeekSegment:409":0,"format:420":0,"DaySegment:452":0,"format:463":0,"WeekdaySegment:497":0,"initialize:508":0,"format:536":0,"TimeSegment:571":0,"HourSegment:591":0,"format:603":0,"MinuteSegment:638":0,"format:650":0,"SecondSegment:671":0,"format:682":0,"AmPmSegment:702":0,"format:714":0,"TimezoneSegment:735":0,"format:747":0,"__BuddhistDateFormat:771":0,"YearSegment:797":0,"format:809":0,"EraSegment:825":0,"format:837":0,"__YDateFormat:853":0,"_generateDatePattern:959":0,"_generateTimePattern:1029":0,"_generateTimeZonePattern:1056":0,"_generatePattern:1081":0,"format:1117":0,"__YRelativeTimeFormat:1161":0,"currentDate:1202":0,"format:1229":0,"_stripDecimals:1344":0,"__YDurationFormat:1357":0,"_getDuration_XML:1399":0,"_getDuration_Seconds:1423":0,"formatNumber:1470":0,"formatNumber:1483":0,"format:1456":0,"format:1543":0,"formatDuration:1581":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].coveredLines = 482;
_yuitest_coverage["build/gallery-advanced-date-format/gallery-advanced-date-format.js"].coveredFunctions = 52;
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
var head, tail, segment, i, c, count, field;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 85);
for (i = 0; i < pattern.length; i++) {
        // literal
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 87);
c = pattern.charAt(i);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 88);
if (c === "'") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 89);
head = i + 1;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 90);
for (i++ ; i < pattern.length; i++) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 91);
c = pattern.charAt(i);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 92);
if (c === "'") {
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 93);
if (i + 1 < pattern.length && pattern.charAt(i + 1) === "'") {
                        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 94);
pattern = pattern.substr(0, i) + pattern.substr(i + 1);
                    }
                    else {
                        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 97);
break;
                    }
                }
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 101);
if (i === pattern.length) {
		_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 102);
Y.error("unterminated string literal");
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 104);
tail = i;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 105);
segment = new Format.TextSegment(this, pattern.substring(head, tail));
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 106);
this._segments.push(segment);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 107);
continue;
        }

        // non-meta chars
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 111);
head = i;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 112);
while(i < pattern.length) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 113);
c = pattern.charAt(i);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 114);
if (DateFormat._META_CHARS.indexOf(c) !== -1 || c === "'") {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 115);
break;
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 117);
i++;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 119);
tail = i;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 120);
if (head !== tail) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 121);
segment = new Format.TextSegment(this, pattern.substring(head, tail));
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 122);
this._segments.push(segment);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 123);
i--;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 124);
continue;
        }
		
        // meta char
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 128);
head = i;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 129);
while(++i < pattern.length) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 130);
if (pattern.charAt(i) !== c) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 131);
break;
            }
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 134);
tail = i--;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 135);
count = tail - head;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 136);
field = pattern.substr(head, count);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 137);
segment = null;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 138);
switch (c) {
            case 'G':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 140);
segment = new DateFormat.EraSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 141);
break;
            case 'y':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 143);
segment = new DateFormat.YearSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 144);
break;
            case 'M':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 146);
segment = new DateFormat.MonthSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 147);
break;
            case 'w':
            case 'W':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 150);
segment = new DateFormat.WeekSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 151);
break;
            case 'D':
            case 'd':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 154);
segment = new DateFormat.DaySegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 155);
break;
            case 'F':
            case 'E':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 158);
segment = new DateFormat.WeekdaySegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 159);
break;
            case 'a':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 161);
segment = new DateFormat.AmPmSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 162);
break;
            case 'H':
            case 'k':
            case 'K':
            case 'h':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 167);
segment = new DateFormat.HourSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 168);
break;
            case 'm':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 170);
segment = new DateFormat.MinuteSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 171);
break;
            case 's':
            case 'S':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 174);
segment = new DateFormat.SecondSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 175);
break;
            case 'z':
            case 'Z':
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 178);
segment = new DateFormat.TimezoneSegment(this, field);
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 179);
break;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 181);
if (segment !== null) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 182);
segment._index = this._segments.length;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 183);
this._segments.push(segment);
        }
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 188);
DateFormat = Y.Date.__zDateFormat;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 189);
Y.extend(DateFormat, Format);

// Constants

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 193);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 208);
DateFormat.prototype.format = function(object, relative) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 208);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 209);
var useRelative = false,
        s = [],
        datePattern = false,
        i;

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 214);
if(relative !== null && relative !== "") {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 215);
useRelative = true;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 218);
for (i = 0; i < this._segments.length; i++) {
        //Mark datePattern sections in case of relative dates
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 220);
if(this._segments[i]._s.indexOf("<datePattern>") === 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 221);
if(useRelative) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 222);
s.push(relative);
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 224);
datePattern = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 225);
continue;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 227);
if(this._segments[i]._s.indexOf("</datePattern>") === 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 228);
datePattern = false;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 229);
continue;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 231);
if(!datePattern || !useRelative) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 232);
s.push(this._segments[i].format(object));
        }
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 235);
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
 * @extends Intl.Common.BaseFormat.Segment
 * @private
 * @constructor
 * @param format {Date.__zDateFormat} The parent Format object.
 * @param s {String} The pattern representing the segment
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 253);
DateFormat.DateSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "DateSegment", 253);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 254);
DateFormat.DateSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 256);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 273);
DateFormat.EraSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "EraSegment", 273);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 274);
DateFormat.EraSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 276);
Y.extend(DateFormat.EraSegment, DateFormat.DateSegment);

/**
 * Format date and get the era segment. Currently it only supports the current era, and will always return localized representation of AD
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 284);
DateFormat.EraSegment.prototype.format = function(/*date*/) {
    // NOTE: Only support current era at the moment...
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 284);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 286);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 304);
DateFormat.YearSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "YearSegment", 304);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 305);
DateFormat.YearSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 307);
Y.extend(DateFormat.YearSegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 309);
Y.mix(DateFormat.YearSegment.prototype, {
    /**
     * Format date and get the year segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 316);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 317);
var year = String(date.getFullYear());
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 318);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 337);
DateFormat.MonthSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "MonthSegment", 337);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 338);
DateFormat.MonthSegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 339);
this.initialize();
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 341);
Y.extend(DateFormat.MonthSegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 343);
Y.mix(DateFormat.MonthSegment.prototype, {
    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "initialize", 348);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 349);
DateFormat.MonthSegment.MONTHS = {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 350);
DateFormat.MonthSegment.MONTHS[DateFormat.SHORT] = [
            ShortNames.monthJanShort,ShortNames.monthFebShort,ShortNames.monthMarShort,
            ShortNames.monthAprShort,ShortNames.monthMayShort,ShortNames.monthJunShort,
            ShortNames.monthJulShort,ShortNames.monthAugShort,ShortNames.monthSepShort,
            ShortNames.monthOctShort,ShortNames.monthNovShort,ShortNames.monthDecShort
        ];

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 357);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 358);
DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM] = [
            Formats.monthJanMedium, Formats.monthFebMedium, Formats.monthMarMedium,
            Formats.monthAprMedium, Formats.monthMayMedium, Formats.monthJunMedium,
            Formats.monthJulMedium, Formats.monthAugMedium, Formats.monthSepMedium,
            Formats.monthOctMedium, Formats.monthNovMedium, Formats.monthDecMedium
        ];
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 364);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 378);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 379);
var month = date.getMonth();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 380);
switch (this._s.length) {
            case 1:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 382);
return String(month + 1);
            case 2:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 384);
return Y.Intl.Common.zeroPad(month + 1, 2);
            case 3:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 386);
return DateFormat.MonthSegment.MONTHS[DateFormat.MEDIUM][month];
            case 5:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 388);
return DateFormat.MonthSegment.MONTHS[DateFormat.SHORT][month];
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 390);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 409);
DateFormat.WeekSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "WeekSegment", 409);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 410);
DateFormat.WeekSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 412);
Y.extend(DateFormat.WeekSegment, DateFormat.DateSegment);

/**
 * Format date and get the week segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 420);
DateFormat.WeekSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 420);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 421);
var year = date.getYear(),
        month = date.getMonth(),
        day = date.getDate(),
	ofYear = /w/.test(this._s),
        date2 = new Date(year, ofYear ? 0 : month, 1),
        week = 0;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 427);
while (true) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 428);
week++;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 429);
if (date2.getMonth() > month || (date2.getMonth() === month && date2.getDate() >= day)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 430);
break;
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 432);
date2.setDate(date2.getDate() + 7);
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 435);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 452);
DateFormat.DaySegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "DaySegment", 452);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 453);
DateFormat.DaySegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 455);
Y.extend(DateFormat.DaySegment, DateFormat.DateSegment);

/**
 * Format date and get the day segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 463);
DateFormat.DaySegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 463);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 464);
var month = date.getMonth(),
        day = date.getDate(),
        year = date.getYear(),
        date2;

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 469);
if (/D/.test(this._s) && month > 0) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 470);
do {
            // set date to first day of month and then go back one day
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 472);
date2 = new Date(year, month, 1);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 473);
date2.setDate(0);
			
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 475);
day += date2.getDate();
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 476);
month--;
        }while (month > 0);
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 479);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 497);
DateFormat.WeekdaySegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "WeekdaySegment", 497);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 498);
DateFormat.WeekdaySegment.superclass.constructor.call(this, format, s);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 499);
this.initialize();
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 501);
Y.extend(DateFormat.WeekdaySegment, DateFormat.DateSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 503);
Y.mix(DateFormat.WeekdaySegment.prototype, {
    /**
     * Initialize with locale specific data.
     * @method initialize
     */
    initialize: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "initialize", 508);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 509);
DateFormat.WeekdaySegment.WEEKDAYS = {};
        // NOTE: The short names aren't available in Java so we have to define them.
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 511);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.SHORT] = [
            ShortNames.weekdaySunShort,ShortNames.weekdayMonShort,ShortNames.weekdayTueShort,
            ShortNames.weekdayWedShort,ShortNames.weekdayThuShort,ShortNames.weekdayFriShort,
            ShortNames.weekdaySatShort
        ];

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 517);
var Formats = this.getFormat().Formats;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 518);
DateFormat.WeekdaySegment.WEEKDAYS[DateFormat.MEDIUM] = [
            Formats.weekdaySunMedium, Formats.weekdayMonMedium, Formats.weekdayTueMedium,
            Formats.weekdayWedMedium, Formats.weekdayThuMedium, Formats.weekdayFriMedium,
            Formats.weekdaySatMedium
        ];
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 523);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 536);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 537);
var weekday = date.getDay(),
            style;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 539);
if (/E/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 540);
switch (this._s.length) {
                case 4:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 542);
style = DateFormat.LONG;
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 543);
break;
                case 5:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 545);
style = DateFormat.SHORT;
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 546);
break;
                default:
                    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 548);
style = DateFormat.MEDIUM;
            }
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 550);
return DateFormat.WeekdaySegment.WEEKDAYS[style][weekday];
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 552);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 571);
DateFormat.TimeSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "TimeSegment", 571);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 572);
DateFormat.TimeSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 574);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 591);
DateFormat.HourSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "HourSegment", 591);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 592);
DateFormat.HourSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 594);
Y.extend(DateFormat.HourSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 596);
Y.mix(DateFormat.HourSegment.prototype, {
    /**
     * Format date and get the hour segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 603);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 604);
var hours = date.getHours();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 605);
if (hours > 12 && /[hK]/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 606);
hours -= 12;
        }
        else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 608);
if (hours === 0 && /[h]/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 609);
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
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 619);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 638);
DateFormat.MinuteSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "MinuteSegment", 638);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 639);
DateFormat.MinuteSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 641);
Y.extend(DateFormat.MinuteSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 643);
Y.mix(DateFormat.MinuteSegment.prototype, {
    /**
     * Format date and get the minute segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 650);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 651);
var minutes = date.getMinutes();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 652);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 671);
DateFormat.SecondSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "SecondSegment", 671);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 672);
DateFormat.SecondSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 674);
Y.extend(DateFormat.SecondSegment, DateFormat.TimeSegment);

/**
 * Format date and get the second segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 682);
DateFormat.SecondSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 682);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 683);
var minutes = /s/.test(this._s) ? date.getSeconds() : date.getMilliseconds();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 684);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 702);
DateFormat.AmPmSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "AmPmSegment", 702);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 703);
DateFormat.AmPmSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 705);
Y.extend(DateFormat.AmPmSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 707);
Y.mix(DateFormat.AmPmSegment.prototype, {
    /**
     * Format date and get the AM/PM segment.
     * @method format
     * @param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 714);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 715);
var hours = date.getHours();
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 716);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 735);
DateFormat.TimezoneSegment = function(format, s) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "TimezoneSegment", 735);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 736);
DateFormat.TimezoneSegment.superclass.constructor.call(this, format, s);
};
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 738);
Y.extend(DateFormat.TimezoneSegment, DateFormat.TimeSegment);

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 740);
Y.mix(DateFormat.TimezoneSegment.prototype, {
    /**
     * Format date and get the timezone segment.
     * @method format
     * //param date {Date} The date to be formatted
     * @return {String} Formatted result
     */
    format: function(/*date*/) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 747);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 748);
var timeZone = this.getFormat().timeZone;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 749);
if (/Z/.test(this._s)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 750);
return timeZone.getShortName();
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 752);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 771);
Y.Date.__BuddhistDateFormat = function(pattern, formats, timeZoneId) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__BuddhistDateFormat", 771);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 772);
BuddhistDateFormat.superclass.constructor.call(this, pattern, formats, timeZoneId);
        
    //Iterate through _segments, and replace the ones that are different for Buddhist Calendar
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 775);
var segments = this._segments, i;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 776);
for(i=0; i<segments.length; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 777);
if(segments[i] instanceof DateFormat.YearSegment) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 778);
segments[i] = new BuddhistDateFormat.YearSegment(segments[i]);
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 779);
if (segments[i] instanceof DateFormat.EraSegment) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 780);
segments[i] = new BuddhistDateFormat.EraSegment(segments[i]);
        }}
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 785);
BuddhistDateFormat = Y.Date.__BuddhistDateFormat;
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 786);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 797);
BuddhistDateFormat.YearSegment = function(segment) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "YearSegment", 797);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 798);
BuddhistDateFormat.YearSegment.superclass.constructor.call(this, segment._parent, segment._s);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 801);
Y.extend(BuddhistDateFormat.YearSegment, DateFormat.YearSegment);

/**
 * Format date and get the year segment.
 * @method format
 * @param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 809);
BuddhistDateFormat.YearSegment.prototype.format = function(date) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 809);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 810);
var year = date.getFullYear();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 811);
year = String(year + 543);      //Buddhist Calendar epoch is in 543 BC
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 812);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 825);
BuddhistDateFormat.EraSegment = function(segment) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "EraSegment", 825);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 826);
BuddhistDateFormat.EraSegment.superclass.constructor.call(this, segment._parent, segment._s);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 829);
Y.extend(BuddhistDateFormat.EraSegment, DateFormat.EraSegment);

/**
 * Format date and get the era segment.
 * @method format
 * //param date {Date} The date to be formatted
 * @return {String} Formatted result
 */
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 837);
BuddhistDateFormat.EraSegment.prototype.format = function(/*date*/) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 837);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 838);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 853);
Y.Date.__YDateFormat = function(timeZone, dateFormat, timeFormat, timeZoneFormat) {
        
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YDateFormat", 853);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 855);
if(timeZone === undefined || timeZone === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 856);
timeZone = Y.Date.Timezone.getTimezoneIdForOffset( new Date().getTimezoneOffset() * -60 );
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 859);
this._Formats = Y.Intl.get(MODULE_NAME);
        
    //If not valid time zone
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 862);
if(!Y.Date.Timezone.isValidTimezoneId(timeZone)) {
	_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 863);
Y.error("Could not find timezone: " + timeZone);
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 866);
this._timeZone = timeZone;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 867);
this._timeZoneInstance = new Y.Date.Timezone(this._timeZone);

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 869);
this._dateFormat = dateFormat || 0;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 870);
this._timeFormat = timeFormat || 0;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 871);
this._timeZoneFormat = timeZoneFormat || 0;

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 873);
this._relative = false;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 874);
this._pattern = this._generatePattern();

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 876);
var locale = Y.Intl.getLang(MODULE_NAME);
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 878);
if(locale.match(/^th/) && !locale.match(/u-ca-gregory/)) {
        //Use buddhist calendar
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 880);
this._dateFormatInstance = new BuddhistDateFormat(this._pattern, this._Formats, this._timeZone);
    } else {
        //Use gregorian calendar
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 883);
this._dateFormatInstance = new DateFormat(this._pattern, this._Formats, this._timeZone);
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 887);
YDateFormat = Y.Date.__YDateFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 889);
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

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 951);
Y.mix(YDateFormat.prototype, {
    /**
     * Generate date pattern for selected format. For internal use only.
     * @method _generateDatePattern
     * @for Date.__YDateFormat
     * @private
     * @return {String} Date pattern
     */
    _generateDatePattern: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateDatePattern", 959);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 960);
var format = this._dateFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 961);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 962);
format = Y.Date.DATE_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 965);
if(format === null) { return ""; }
        /*jshint bitwise: false*/
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 967);
if(format & Y.Date.DATE_FORMATS.RELATIVE_DATE) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 968);
this._relative = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 969);
format = format ^ Y.Date.DATE_FORMATS.RELATIVE_DATE;
        }
        /*jshint bitwise: true*/
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 972);
switch(format) {
            //Use relative only for formats with day component
            case Y.Date.DATE_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 975);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 976);
return "";
            case Y.Date.DATE_FORMATS.WYMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 978);
return this._Formats.WYMD_long;
            case Y.Date.DATE_FORMATS.WYMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 980);
return this._Formats.WYMD_abbreviated;
            case Y.Date.DATE_FORMATS.WYMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 982);
return this._Formats.WYMD_short;
            case Y.Date.DATE_FORMATS.WMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 984);
return this._Formats.WMD_long;
            case Y.Date.DATE_FORMATS.WMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 986);
return this._Formats.WMD_abbreviated;
            case Y.Date.DATE_FORMATS.WMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 988);
return this._Formats.WMD_short;
            case Y.Date.DATE_FORMATS.YMD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 990);
return this._Formats.YMD_long;
            case Y.Date.DATE_FORMATS.YMD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 992);
return this._Formats.YMD_abbreviated;
            case Y.Date.DATE_FORMATS.YMD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 994);
return this._Formats.YMD_short;
            case Y.Date.DATE_FORMATS.YM_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 996);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 997);
return this._Formats.YM_long;
            case Y.Date.DATE_FORMATS.MD_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 999);
return this._Formats.MD_long;
            case Y.Date.DATE_FORMATS.MD_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1001);
return this._Formats.MD_abbreviated;
            case Y.Date.DATE_FORMATS.MD_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1003);
return this._Formats.MD_short;
            case Y.Date.DATE_FORMATS.W_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1005);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1006);
return this._Formats.W_long;
            case Y.Date.DATE_FORMATS.W_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1008);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1009);
return this._Formats.W_abbreviated;
            case Y.Date.DATE_FORMATS.M_LONG:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1011);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1012);
return this._Formats.M_long;
            case Y.Date.DATE_FORMATS.M_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1014);
this._relative = false;
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1015);
return this._Formats.M_abbreviated;
            case Y.Date.DATE_FORMATS.YMD_FULL:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1017);
return this._Formats.YMD_full;
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1019);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateTimePattern", 1029);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1030);
var format = this._timeFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1031);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1032);
format = Y.Date.TIME_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1035);
if(format === null) { return ""; }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1036);
switch(format) {
            case Y.Date.TIME_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1038);
return "";
            case Y.Date.TIME_FORMATS.HM_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1040);
return this._Formats.HM_abbreviated;
            case Y.Date.TIME_FORMATS.HM_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1042);
return this._Formats.HM_short;
            case Y.Date.TIME_FORMATS.H_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1044);
return this._Formats.H_abbreviated;
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1046);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generateTimeZonePattern", 1056);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1057);
var format = this._timeZoneFormat;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1058);
if(format && Y.Lang.isString(format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1059);
format = Y.Date.TIMEZONE_FORMATS[format];
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1062);
if(format === null) { return ""; }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1063);
switch(format) {
            case Y.Date.TIMEZONE_FORMATS.NONE:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1065);
return "";
            case Y.Date.TIMEZONE_FORMATS.Z_ABBREVIATED:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1067);
return "z";
            case Y.Date.TIMEZONE_FORMATS.Z_SHORT:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1069);
return "Z";
            default:
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1071);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_generatePattern", 1081);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1082);
var datePattern = this._generateDatePattern(),
            timePattern = this._generateTimePattern(),
            timeZonePattern = this._generateTimeZonePattern(),
            pattern = "";

        //Combine patterns. Mark date pattern part, to use with relative dates.
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1088);
if(datePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1089);
datePattern = "'<datePattern>'" + datePattern + "'</datePattern>'";
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1092);
if(timePattern !== "" && timeZonePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1093);
pattern = this._Formats.DateTimeTimezoneCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1094);
if (timePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1095);
pattern = this._Formats.DateTimeCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1096);
if(timeZonePattern !== "") {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1097);
pattern = this._Formats.DateTimezoneCombination;
        } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1098);
if(datePattern !== ""){
            //Just date
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1100);
pattern = "{1}";
        }}}}
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1103);
pattern = pattern.replace("{0}", timePattern).replace("{1}", datePattern).replace("{2}", timeZonePattern);
        
        //Remove unnecessary whitespaces
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1106);
pattern = Y.Lang.trim(pattern.replace(/\s\s+/g, " "));

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1108);
return pattern;
    },

    /**
     * Formats a date
     * @method format
     * @param {Date} date The date to be formatted.
     * @return {String} The formatted string
     */
    format: function(date) {
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1117);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1118);
if(date === null || !Y.Lang.isDate(date)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1119);
Y.error("format called without a date.");
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1122);
var offset = this._timeZoneInstance.getRawOffset() * 1000,
            relativeDate = null,
            today = new Date(),
            tomorrow = new Date(today.getTime() + 24 * 60 * 60 * 1000),
            yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1127);
date = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000 + offset);

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1129);
if(this._relative) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1130);
if(date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1131);
relativeDate = this._Formats.today;
            }

            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1134);
if(date.getFullYear() === tomorrow.getFullYear() && date.getMonth() === tomorrow.getMonth() && date.getDate() === tomorrow.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1135);
relativeDate = this._Formats.tomorrow;
            }

            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1138);
if(date.getFullYear() === yesterday.getFullYear() && date.getMonth() === yesterday.getMonth() && date.getDate() === yesterday.getDate()) {
                _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1139);
relativeDate = this._Formats.yesterday;
            }
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1143);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1161);
Y.Date.__YRelativeTimeFormat = function(style) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YRelativeTimeFormat", 1161);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1162);
if(style === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1163);
style = Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG;
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1164);
if(Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1165);
style = Y.Date.RELATIVE_TIME_FORMATS[style];
    }}
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1168);
this.patterns = Y.Intl.get(MODULE_NAME);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1169);
this.style = style;
		
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1171);
switch(style) {
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_ABBREVIATED:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1173);
this.numUnits = 2;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1174);
this.abbr = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1175);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_OR_TWO_UNITS_LONG:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1177);
this.numUnits = 2;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1178);
this.abbr = false;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1179);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_ABBREVIATED:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1181);
this.numUnits = 1;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1182);
this.abbr = true;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1183);
break;
        case Y.Date.RELATIVE_TIME_FORMATS.ONE_UNIT_LONG:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1185);
this.numUnits = 1;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1186);
this.abbr = false;
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1187);
break;
        default:
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1189);
Y.error("Unknown style: Use a style from Y.Date.RELATIVE_TIME_FORMATS");
    }
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1193);
YRelativeTimeFormat = Y.Date.__YRelativeTimeFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1195);
Y.mix(Y.Date, {
    /**
     * Returns the current date. Used to calculate relative time. Change this parameter if you require comparison with different time.
     * @property
     * @type Number|function
     * @static
     */
    currentDate: function() { _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "currentDate", 1202);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1202);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1229);
YRelativeTimeFormat.prototype.format = function(timeValue, relativeTo) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1229);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1230);
if(relativeTo === null) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1231);
relativeTo = (new Date()).getTime()/1000;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1232);
if(timeValue > relativeTo) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1233);
Y.error("timeValue must be in the past");
        }
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1235);
if(timeValue > relativeTo) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1236);
Y.error("relativeTo must be greater than or equal to timeValue");
    }}

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1239);
var date = new Date((relativeTo - timeValue)*1000),
        result = [],
        numUnits = this.numUnits,
        value = date.getUTCFullYear() - 1970,	//Need zero-based index
        text, pattern, i;
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1245);
if(value > 0) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1246);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1247);
text = value + " " + (value !== 1 ? this.patterns.years_abbr : this.patterns.year_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1248);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1250);
text = value + " " + (value !== 1 ? this.patterns.years : this.patterns.year);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1251);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1253);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1256);
value = date.getUTCMonth();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1257);
if((numUnits > 0) && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1258);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1259);
text = value + " " + (value !== 1 ? this.patterns.months_abbr : this.patterns.month_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1260);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1262);
text = value + " " + (value !== 1 ? this.patterns.months : this.patterns.month);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1263);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1265);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1268);
value = date.getUTCDate()-1;			//Need zero-based index
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1269);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1270);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1271);
text = value + " " + (value !== 1 ? this.patterns.days_abbr : this.patterns.day_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1272);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1274);
text = value + " " + (value !== 1 ? this.patterns.days : this.patterns.day);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1275);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1277);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1280);
value = date.getUTCHours();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1281);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1282);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1283);
text = value + " " + (value !== 1 ? this.patterns.hours_abbr : this.patterns.hour_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1284);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1286);
text = value + " " + (value !== 1 ? this.patterns.hours : this.patterns.hour);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1287);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1289);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1292);
value = date.getUTCMinutes();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1293);
if(numUnits > 0 && (numUnits < this.numUnits || value > 0)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1294);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1295);
text = value + " " + (value !== 1 ? this.patterns.minutes_abbr : this.patterns.minute_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1296);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1298);
text = value + " " + (value !== 1 ? this.patterns.minutes : this.patterns.minute);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1299);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1301);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1304);
value = date.getUTCSeconds();
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1305);
if(result.length === 0 || (numUnits > 0 && (numUnits < this.numUnits || value > 0))) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1306);
if(this.abbr) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1307);
text = value + " " + (value !== 1 ? this.patterns.seconds_abbr : this.patterns.second_abbr);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1308);
result.push(text);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1310);
text = value + " " + (value !== 1 ? this.patterns.seconds : this.patterns.second);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1311);
result.push(text);
        }
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1313);
numUnits--;
    }

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1316);
pattern = (result.length === 1) ? this.patterns["RelativeTime/oneUnit"] : this.patterns["RelativeTime/twoUnits"];
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1318);
for(i=0; i<result.length; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1319);
pattern = pattern.replace("{" + i + "}", result[i]);
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1321);
for(i=result.length; i<this.numUnits; i++) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1322);
pattern = pattern.replace("{" + i + "}", "");
    }
    //Remove unnecessary whitespaces
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1325);
pattern = Y.Lang.trim(pattern.replace(/\s+/g, " "));
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1327);
return pattern;
};
/**
 * YDurationFormat class formats time in a language independent manner.
 * The duration formats use appropriate singular/plural/paucal/etc. forms for all languages.
 */

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1334);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_stripDecimals", 1344);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1345);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1357);
Y.Date.__YDurationFormat = function(style) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "__YDurationFormat", 1357);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1358);
if(style && Y.Lang.isString(style)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1359);
style = Y.Date.DURATION_FORMATS[style];
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1361);
this.style = style;
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1362);
this.patterns = Y.Intl.get(MODULE_NAME);
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1365);
YDurationFormat = Y.Date.__YDurationFormat;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1367);
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

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1382);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_getDuration_XML", 1399);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1400);
var regex = new RegExp(/P(\d+Y)?(\d+M)?(\d+D)?T(\d+H)?(\d+M)?(\d+(\.\d+)?S)/),
            matches = xmlDuration.match(regex);
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1403);
if(matches === null) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1404);
Y.error("xmlDurationFormat should be in the format: 'PnYnMnDTnHnMnS'");
        }
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1407);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "_getDuration_Seconds", 1423);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1424);
var duration = {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1425);
if(timeValueInSeconds < 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1426);
Y.error("TimeValue cannot be negative");
        }
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1429);
duration.hours = Y.Date._stripDecimals(timeValueInSeconds / 3600);
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1431);
timeValueInSeconds %= 3600;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1432);
duration.minutes = Y.Date._stripDecimals(timeValueInSeconds / 60);
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1434);
timeValueInSeconds %= 60;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1435);
duration.seconds = timeValueInSeconds;
        
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1437);
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
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1456);
YDurationFormat.prototype.format = function(oDuration) {
    _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1456);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1457);
if(Y.Lang.isNumber(oDuration)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1458);
oDuration = YDurationFormat._getDuration_Seconds(oDuration);
    } else {_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1459);
if(Y.Lang.isString(oDuration)) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1460);
oDuration = YDurationFormat._getDuration_XML(oDuration);
    }}
    
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1463);
var defaultValue = this.style === Y.Date.DURATION_FORMATS.HMS_LONG ? -1: 0,
        result = {
            hours: "",
            minutes: "",
            seconds: ""
        },
        resultPattern = "",
        formatNumber = function(num) { _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "formatNumber", 1470);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1470);
return num; };

    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1472);
if(oDuration.hours === undefined || oDuration.hours === null || oDuration.hours < 0) { oDuration.hours = defaultValue; }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1473);
if(oDuration.minutes === undefined || oDuration.minutes === null || oDuration.minutes < 0) { oDuration.minutes = defaultValue; }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1474);
if(oDuration.seconds === undefined || oDuration.seconds === null || oDuration.seconds < 0) { oDuration.seconds = defaultValue; }
   
    //Test minutes and seconds for invalid values
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1477);
if(oDuration.minutes > 59 || oDuration.seconds > 59) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1478);
Y.error("Minutes and Seconds should be less than 60");
    }

    //If number format available, use it, otherwise do not format number.
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1482);
if (Y.Number !== undefined && Y.Number.format !== undefined) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1483);
formatNumber = function(num) { _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "formatNumber", 1483);
return Y.Number.format(num); };
    }
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1485);
if(this.style === Y.Date.DURATION_FORMATS.HMS_LONG) {
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1486);
resultPattern = this.patterns.HMS_long;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1487);
if(oDuration.hours >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1488);
result.hours = formatNumber(oDuration.hours) + " " + (oDuration.hours === 1 ? this.patterns.hour : this.patterns.hours);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1491);
if(oDuration.minutes >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1492);
result.minutes = oDuration.minutes + " " + (oDuration.minutes === 1 ? this.patterns.minute : this.patterns.minutes);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1495);
if(oDuration.seconds >= 0) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1496);
result.seconds = oDuration.seconds + " " + (oDuration.seconds === 1 ? this.patterns.second : this.patterns.seconds);
        }
    } else {                                            //HMS_SHORT
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1499);
resultPattern = this.patterns.HMS_short;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1500);
result = {
             hours: formatNumber(oDuration.hours),
             minutes: Y.Intl.Common.zeroPad(oDuration.minutes, 2),
             seconds: Y.Intl.Common.zeroPad(oDuration.seconds, 2)
        };
    }
        
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1507);
resultPattern = resultPattern.replace("{0}", result.hours);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1508);
resultPattern = resultPattern.replace("{1}", result.minutes);
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1509);
resultPattern = resultPattern.replace("{2}", result.seconds);
       
    //Remove unnecessary whitespaces
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1512);
resultPattern = Y.Lang.trim(resultPattern.replace(/\s\s+/g, " "));
       
    _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1514);
return resultPattern;
};

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1517);
Y.Date.oldFormat = Y.Date.format;

_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1519);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "format", 1543);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1544);
oConfig = oConfig || {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1545);
if(oConfig.format && Y.Lang.isString(oConfig.format)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1546);
return Y.Date.oldFormat(oDate, oConfig);
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1549);
if(!Y.Lang.isDate(oDate)) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1550);
return Y.Lang.isValue(oDate) ? oDate : "";
        }
                
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1553);
var formatter, relativeTo;
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1554);
if(oConfig.dateFormat || oConfig.timeFormat || oConfig.timezoneFormat) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1555);
formatter = new YDateFormat(oConfig.timezone, oConfig.dateFormat, oConfig.timeFormat, oConfig.timezoneFormat);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1556);
return formatter.format(oDate);
        }
    
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1559);
relativeTo = (typeof Y.Date.currentDate === 'function' ?  Y.Date.currentDate() : Y.Date.currentDate);
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1560);
if(oConfig.relativeTimeFormat) {
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1561);
formatter = new YRelativeTimeFormat(oConfig.relativeTimeFormat, relativeTo);
            _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1562);
return formatter.format(oDate.getTime()/1000, Y.Date.currentDate.getTime()/1000);
        }

        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1565);
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
        _yuitest_coverfunc("build/gallery-advanced-date-format/gallery-advanced-date-format.js", "formatDuration", 1581);
_yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1582);
oConfig = oConfig || {};
        _yuitest_coverline("build/gallery-advanced-date-format/gallery-advanced-date-format.js", 1583);
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
