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
_yuitest_coverage["build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js",
    code: []
};
_yuitest_coverage["build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js"].code=["YUI.add('gallery-advanced-date-timezone', function (Y, NAME) {","","/*"," * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc."," */","var TimezoneData, TimezoneLinks, Timezone, AjxTimezone;","","Y.Date.Timezone = {","    __tzoneData: {","         TRANSITION_YEAR: 2011,","         TIMEZONE_RULES: [","{","    tzId: \"Asia/Riyadh88\",","    standard: {","        offset: 187","    }","},","{","    tzId: \"Asia/Kabul\",","    standard: {","        offset: 270","    }","},","{","    tzId: \"Asia/Yerevan\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Baku\",","    standard: {","        offset: 240,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 5,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 300,","        mon: 3,","        week: -1,","        wkday: 1,","        hour: 4,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Asia/Bahrain\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Dhaka\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Thimphu\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Indian/Chagos\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Brunei\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Rangoon\",","    standard: {","        offset: 390","    }","},","{","    tzId: \"Asia/Phnom_Penh\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Harbin\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Shanghai\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Chongqing\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Urumqi\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Kashgar\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Hong_Kong\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Taipei\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Macau\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Nicosia\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Tbilisi\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Dili\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Kolkata\",","    standard: {","        offset: 330","    }","},","{","    tzId: \"Asia/Jakarta\",","    standard: {","        offset: 427","    }","},","{","    tzId: \"Asia/Pontianak\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Tehran\",","    standard: {","        offset: 210","    }","},","{","    tzId: \"Asia/Baghdad\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Jerusalem\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Tokyo\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Amman\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Almaty\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Qyzylorda\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Aqtobe\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Aqtau\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Oral\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Bishkek\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Seoul\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Kuwait\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Vientiane\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Beirut\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Kuala_Lumpur\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Kuching\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Indian/Maldives\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Hovd\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Ulaanbaatar\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Choibalsan\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Kathmandu\",","    standard: {","        offset: 345","    }","},","{","    tzId: \"Asia/Muscat\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Karachi\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Gaza\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Hebron\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Asia/Manila\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Qatar\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Riyadh\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Asia/Singapore\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Colombo\",","    standard: {","        offset: 330","    }","},","{","    tzId: \"Asia/Damascus\",","    standard: {","        offset: 120,","        mon: 10,","        week: -1,","        wkday: 6,","        hour: 0,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 180,","        mon: 3,","        week: -1,","        wkday: 6,","        hour: 0,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Asia/Dushanbe\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Bangkok\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Ashgabat\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Dubai\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Samarkand\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Asia/Ho_Chi_Minh\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Aden\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Australia/Darwin\",","    standard: {","        offset: 570","    }","},","{","    tzId: \"Australia/Perth\",","    standard: {","        offset: 525","    }","},","{","    tzId: \"Australia/Brisbane\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Australia/Adelaide\",","    standard: {","        offset: 570,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 630,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Australia/Hobart\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Australia/Melbourne\",","    standard: {","        offset: 600,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 660,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Australia/Sydney\",","    standard: {","        offset: 570,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 630,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Australia/Lord_Howe\",","    standard: {","        offset: 630,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 660,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Indian/Christmas\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Pacific/Rarotonga\",","    standard: {","        offset: -600","    }","},","{","    tzId: \"Indian/Cocos\",","    standard: {","        offset: 390","    }","},","{","    tzId: \"Pacific/Fiji\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Gambier\",","    standard: {","        offset: -600","    }","},","{","    tzId: \"Pacific/Guam\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Pacific/Tarawa\",","    standard: {","        offset: 840","    }","},","{","    tzId: \"Pacific/Saipan\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Pacific/Majuro\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Chuuk\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Pacific/Nauru\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Noumea\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Pacific/Auckland\",","    standard: {","        offset: 765","    }","},","{","    tzId: \"Pacific/Niue\",","    standard: {","        offset: -660","    }","},","{","    tzId: \"Pacific/Norfolk\",","    standard: {","        offset: 690","    }","},","{","    tzId: \"Pacific/Palau\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Pacific/Port_Moresby\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Pacific/Pitcairn\",","    standard: {","        offset: -480","    }","},","{","    tzId: \"Pacific/Pago_Pago\",","    standard: {","        offset: -660","    }","},","{","    tzId: \"Pacific/Apia\",","    standard: {","        offset: 780","    }","},","{","    tzId: \"Pacific/Guadalcanal\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Pacific/Fakaofo\",","    standard: {","        offset: 840","    }","},","{","    tzId: \"Pacific/Tongatapu\",","    standard: {","        offset: 780","    }","},","{","    tzId: \"Pacific/Funafuti\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Johnston\",","    standard: {","        offset: -600","    }","},","{","    tzId: \"Pacific/Midway\",","    standard: {","        offset: -660","    }","},","{","    tzId: \"Pacific/Wake\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Pacific/Efate\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Pacific/Wallis\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Etc/GMT\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Etc/GMT-14\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Asia/Riyadh87\",","    standard: {","        offset: 187","    }","},","{","    tzId: \"America/Argentina/Buenos_Aires\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Cordoba\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Salta\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Tucuman\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/La_Rioja\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/San_Juan\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Jujuy\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Catamarca\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Mendoza\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/San_Luis\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Argentina/Rio_Gallegos\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Argentina/Ushuaia\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Aruba\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/La_Paz\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Noronha\",","    standard: {","        offset: -120","    }","},","{","    tzId: \"America/Belem\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Santarem\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Fortaleza\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Recife\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Araguaina\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Maceio\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Bahia\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Sao_Paulo\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Campo_Grande\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Cuiaba\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Porto_Velho\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Boa_Vista\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Manaus\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Eirunepe\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Rio_Branco\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Santiago\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Bogota\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Curacao\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Guayaquil\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"Atlantic/Stanley\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Cayenne\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Guyana\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Asuncion\",","    standard: {","        offset: -240,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 0,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 10,","        week: 2,","        wkday: 1,","        hour: 0,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Lima\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"Atlantic/South_Georgia\",","    standard: {","        offset: -120","    }","},","{","    tzId: \"America/Paramaribo\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Port_of_Spain\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Montevideo\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"America/Caracas\",","    standard: {","        offset: -210","    }","},","{","    tzId: \"Antarctica/Casey\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Antarctica/Davis\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Antarctica/Macquarie\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Indian/Kerguelen\",","    standard: {","        offset: 300","    }","},","{","    tzId: \"Antarctica/DumontDUrville\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Antarctica/Syowa\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Antarctica/Vostok\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Antarctica/Rothera\",","    standard: {","        offset: -180","    }","},","{","    tzId: \"Antarctica/Palmer\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"Antarctica/McMurdo\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Asia/Riyadh89\",","    standard: {","        offset: 187","    }","},","{","    tzId: \"Africa/Algiers\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Luanda\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Porto-Novo\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Gaborone\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Ouagadougou\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Bujumbura\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Douala\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Atlantic/Cape_Verde\",","    standard: {","        offset: -60","    }","},","{","    tzId: \"Africa/Bangui\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Ndjamena\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Indian/Comoro\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Kinshasa\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Brazzaville\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Abidjan\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Djibouti\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Cairo\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Malabo\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Asmara\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Addis_Ababa\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Libreville\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Banjul\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Accra\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Conakry\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Bissau\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Nairobi\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Maseru\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Monrovia\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Tripoli\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Indian/Antananarivo\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Blantyre\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Bamako\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Nouakchott\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Indian/Mauritius\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Indian/Mayotte\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Casablanca\",","    standard: {","        offset: 0,","        mon: 9,","        week: -1,","        wkday: 1,","        hour: 3,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: 60,","        mon: 4,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Africa/El_Aaiun\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Maputo\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Windhoek\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Niamey\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Lagos\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Indian/Reunion\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Africa/Kigali\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Atlantic/St_Helena\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Sao_Tome\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Dakar\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Indian/Mahe\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Africa/Freetown\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Mogadishu\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Johannesburg\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Khartoum\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Juba\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Mbabane\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Dar_es_Salaam\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Lome\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Africa/Tunis\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Africa/Kampala\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Africa/Lusaka\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Africa/Harare\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/London\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"WET\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Tirane\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Andorra\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Vienna\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Minsk\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Europe/Brussels\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Sofia\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Prague\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Copenhagen\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"America/Danmarkshavn\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Europe/Tallinn\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Helsinki\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Paris\",","    standard: {","        offset: 9","    }","},","{","    tzId: \"Europe/Berlin\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Gibraltar\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Athens\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Budapest\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Atlantic/Reykjavik\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Rome\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Riga\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Vaduz\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Vilnius\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Luxembourg\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Malta\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Chisinau\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Monaco\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Amsterdam\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Oslo\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Warsaw\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Lisbon\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Bucharest\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Kaliningrad\",","    standard: {","        offset: 180","    }","},","{","    tzId: \"Europe/Moscow\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Europe/Volgograd\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Europe/Samara\",","    standard: {","        offset: 240","    }","},","{","    tzId: \"Asia/Yekaterinburg\",","    standard: {","        offset: 360","    }","},","{","    tzId: \"Asia/Omsk\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Novosibirsk\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Novokuznetsk\",","    standard: {","        offset: 420","    }","},","{","    tzId: \"Asia/Krasnoyarsk\",","    standard: {","        offset: 480","    }","},","{","    tzId: \"Asia/Irkutsk\",","    standard: {","        offset: 540","    }","},","{","    tzId: \"Asia/Yakutsk\",","    standard: {","        offset: 600","    }","},","{","    tzId: \"Asia/Vladivostok\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Asia/Sakhalin\",","    standard: {","        offset: 660","    }","},","{","    tzId: \"Asia/Magadan\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Asia/Kamchatka\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Asia/Anadyr\",","    standard: {","        offset: 720","    }","},","{","    tzId: \"Europe/Belgrade\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Madrid\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Stockholm\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Zurich\",","    standard: {","        offset: 60","    }","},","{","    tzId: \"Europe/Istanbul\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"Europe/Kiev\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Uzhgorod\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Zaporozhye\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"Europe/Simferopol\",","    standard: {","        offset: 120","    }","},","{","    tzId: \"EST\",","    standard: {","        offset: 0","    }","},","{","    tzId: \"America/New_York\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Chicago\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/North_Dakota/Center\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/North_Dakota/New_Salem\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/North_Dakota/Beulah\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Denver\",","    standard: {","        offset: -420,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Los_Angeles\",","    standard: {","        offset: -480,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -420,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Juneau\",","    standard: {","        offset: -600,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -540,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"Pacific/Honolulu\",","    standard: {","        offset: -600","    }","},","{","    tzId: \"America/Phoenix\",","    standard: {","        offset: -420","    }","},","{","    tzId: \"America/Boise\",","    standard: {","        offset: -420,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Indianapolis\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Marengo\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Vincennes\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Tell_City\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Petersburg\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Knox\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Winamac\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Indiana/Vevay\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Kentucky/Louisville\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Kentucky/Monticello\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Detroit\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Menominee\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/St_Johns\",","    standard: {","        offset: -150,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -90,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Goose_Bay\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Halifax\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Moncton\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Blanc-Sablon\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Toronto\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Winnipeg\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Regina\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Edmonton\",","    standard: {","        offset: -420,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Vancouver\",","    standard: {","        offset: -420","    }","},","{","    tzId: \"America/Pangnirtung\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Iqaluit\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Resolute\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Rankin_Inlet\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Cambridge_Bay\",","    standard: {","        offset: -480,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -420,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Cancun\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Merida\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Matamoros\",","    standard: {","        offset: -360,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Monterrey\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Mexico_City\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Ojinaga\",","    standard: {","        offset: -420,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Chihuahua\",","    standard: {","        offset: -420,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Hermosillo\",","    standard: {","        offset: -420","    }","},","{","    tzId: \"America/Mazatlan\",","    standard: {","        offset: -420,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -360,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Bahia_Banderas\",","    standard: {","        offset: -360,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -300,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Tijuana\",","    standard: {","        offset: -480,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -420,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Santa_Isabel\",","    standard: {","        offset: -480,","        mon: 10,","        week: -1,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -420,","        mon: 4,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Anguilla\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Antigua\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Nassau\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Barbados\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Belize\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"Atlantic/Bermuda\",","    standard: {","        offset: -240,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -180,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Cayman\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Costa_Rica\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Havana\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Dominica\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Santo_Domingo\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/El_Salvador\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Grenada\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Guadeloupe\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Guatemala\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Port-au-Prince\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Tegucigalpa\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Jamaica\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Martinique\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Montserrat\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Managua\",","    standard: {","        offset: -360","    }","},","{","    tzId: \"America/Panama\",","    standard: {","        offset: -300","    }","},","{","    tzId: \"America/Puerto_Rico\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/St_Kitts\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/St_Lucia\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Miquelon\",","    standard: {","        offset: -180,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -120,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/St_Vincent\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/Grand_Turk\",","    standard: {","        offset: -300,","        mon: 11,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    },","    daylight: {","        offset: -240,","        mon: 3,","        week: 2,","        wkday: 1,","        hour: 2,","        min: 0,","        sec: 0","    }","},","{","    tzId: \"America/Tortola\",","    standard: {","        offset: -240","    }","},","{","    tzId: \"America/St_Thomas\",","    standard: {","        offset: -240","    }","}","]","}};","","TimezoneData = Y.Date.Timezone.__tzoneData;","Y.Date.Timezone.__tzoneLinks = {","    \"Mideast/Riyadh88\": \"Asia/Riyadh88\",","    \"Europe/Nicosia\": \"Asia/Nicosia\",","    \"US/Pacific-New\": \"America/Los_Angeles\",","    \"GMT\": \"Etc/GMT\",","    \"Etc/UTC\": \"Etc/GMT\",","    \"Etc/Universal\": \"Etc/UTC\",","    \"Etc/Zulu\": \"Etc/UTC\",","    \"Etc/Greenwich\": \"Etc/GMT\",","    \"Etc/GMT-0\": \"Etc/GMT\",","    \"Etc/GMT+0\": \"Etc/GMT\",","    \"Etc/GMT0\": \"Etc/GMT\",","    \"Mideast/Riyadh87\": \"Asia/Riyadh87\",","    \"America/Lower_Princes\": \"America/Curacao\",","    \"America/Kralendijk\": \"America/Curacao\",","    \"Antarctica/South_Pole\": \"Antarctica/McMurdo\",","    \"Mideast/Riyadh89\": \"Asia/Riyadh89\",","    \"Africa/Asmera\": \"Africa/Asmara\",","    \"Africa/Timbuktu\": \"Africa/Bamako\",","    \"America/Argentina/ComodRivadavia\": \"America/Argentina/Catamarca\",","    \"America/Atka\": \"America/Adak\",","    \"America/Buenos_Aires\": \"America/Argentina/Buenos_Aires\",","    \"America/Catamarca\": \"America/Argentina/Catamarca\",","    \"America/Coral_Harbour\": \"America/Atikokan\",","    \"America/Cordoba\": \"America/Argentina/Cordoba\",","    \"America/Ensenada\": \"America/Tijuana\",","    \"America/Fort_Wayne\": \"America/Indiana/Indianapolis\",","    \"America/Indianapolis\": \"America/Indiana/Indianapolis\",","    \"America/Jujuy\": \"America/Argentina/Jujuy\",","    \"America/Knox_IN\": \"America/Indiana/Knox\",","    \"America/Louisville\": \"America/Kentucky/Louisville\",","    \"America/Mendoza\": \"America/Argentina/Mendoza\",","    \"America/Porto_Acre\": \"America/Rio_Branco\",","    \"America/Rosario\": \"America/Argentina/Cordoba\",","    \"America/Virgin\": \"America/St_Thomas\",","    \"Asia/Ashkhabad\": \"Asia/Ashgabat\",","    \"Asia/Chungking\": \"Asia/Chongqing\",","    \"Asia/Dacca\": \"Asia/Dhaka\",","    \"Asia/Katmandu\": \"Asia/Kathmandu\",","    \"Asia/Calcutta\": \"Asia/Kolkata\",","    \"Asia/Macao\": \"Asia/Macau\",","    \"Asia/Tel_Aviv\": \"Asia/Jerusalem\",","    \"Asia/Saigon\": \"Asia/Ho_Chi_Minh\",","    \"Asia/Thimbu\": \"Asia/Thimphu\",","    \"Asia/Ujung_Pandang\": \"Asia/Makassar\",","    \"Asia/Ulan_Bator\": \"Asia/Ulaanbaatar\",","    \"Atlantic/Faeroe\": \"Atlantic/Faroe\",","    \"Atlantic/Jan_Mayen\": \"Europe/Oslo\",","    \"Australia/ACT\": \"Australia/Sydney\",","    \"Australia/Canberra\": \"Australia/Sydney\",","    \"Australia/LHI\": \"Australia/Lord_Howe\",","    \"Australia/NSW\": \"Australia/Sydney\",","    \"Australia/North\": \"Australia/Darwin\",","    \"Australia/Queensland\": \"Australia/Brisbane\",","    \"Australia/South\": \"Australia/Adelaide\",","    \"Australia/Tasmania\": \"Australia/Hobart\",","    \"Australia/Victoria\": \"Australia/Melbourne\",","    \"Australia/West\": \"Australia/Perth\",","    \"Australia/Yancowinna\": \"Australia/Broken_Hill\",","    \"Brazil/Acre\": \"America/Rio_Branco\",","    \"Brazil/DeNoronha\": \"America/Noronha\",","    \"Brazil/East\": \"America/Sao_Paulo\",","    \"Brazil/West\": \"America/Manaus\",","    \"Canada/Atlantic\": \"America/Halifax\",","    \"Canada/Central\": \"America/Winnipeg\",","    \"Canada/East-Saskatchewan\": \"America/Regina\",","    \"Canada/Eastern\": \"America/Toronto\",","    \"Canada/Mountain\": \"America/Edmonton\",","    \"Canada/Newfoundland\": \"America/St_Johns\",","    \"Canada/Pacific\": \"America/Vancouver\",","    \"Canada/Saskatchewan\": \"America/Regina\",","    \"Canada/Yukon\": \"America/Whitehorse\",","    \"Chile/Continental\": \"America/Santiago\",","    \"Chile/EasterIsland\": \"Pacific/Easter\",","    \"Cuba\": \"America/Havana\",","    \"Egypt\": \"Africa/Cairo\",","    \"Eire\": \"Europe/Dublin\",","    \"Europe/Belfast\": \"Europe/London\",","    \"Europe/Tiraspol\": \"Europe/Chisinau\",","    \"GB\": \"Europe/London\",","    \"GB-Eire\": \"Europe/London\",","    \"GMT+0\": \"Etc/GMT\",","    \"GMT-0\": \"Etc/GMT\",","    \"GMT0\": \"Etc/GMT\",","    \"Greenwich\": \"Etc/GMT\",","    \"Hongkong\": \"Asia/Hong_Kong\",","    \"Iceland\": \"Atlantic/Reykjavik\",","    \"Iran\": \"Asia/Tehran\",","    \"Israel\": \"Asia/Jerusalem\",","    \"Jamaica\": \"America/Jamaica\",","    \"Japan\": \"Asia/Tokyo\",","    \"Kwajalein\": \"Pacific/Kwajalein\",","    \"Libya\": \"Africa/Tripoli\",","    \"Mexico/BajaNorte\": \"America/Tijuana\",","    \"Mexico/BajaSur\": \"America/Mazatlan\",","    \"Mexico/General\": \"America/Mexico_City\",","    \"NZ\": \"Pacific/Auckland\",","    \"NZ-CHAT\": \"Pacific/Chatham\",","    \"Navajo\": \"America/Denver\",","    \"PRC\": \"Asia/Shanghai\",","    \"Pacific/Samoa\": \"Pacific/Pago_Pago\",","    \"Pacific/Yap\": \"Pacific/Chuuk\",","    \"Pacific/Truk\": \"Pacific/Chuuk\",","    \"Pacific/Ponape\": \"Pacific/Pohnpei\",","    \"Poland\": \"Europe/Warsaw\",","    \"Portugal\": \"Europe/Lisbon\",","    \"ROC\": \"Asia/Taipei\",","    \"ROK\": \"Asia/Seoul\",","    \"Singapore\": \"Asia/Singapore\",","    \"Turkey\": \"Europe/Istanbul\",","    \"UCT\": \"Etc/UCT\",","    \"US/Alaska\": \"America/Anchorage\",","    \"US/Aleutian\": \"America/Adak\",","    \"US/Arizona\": \"America/Phoenix\",","    \"US/Central\": \"America/Chicago\",","    \"US/East-Indiana\": \"America/Indiana/Indianapolis\",","    \"US/Eastern\": \"America/New_York\",","    \"US/Hawaii\": \"Pacific/Honolulu\",","    \"US/Indiana-Starke\": \"America/Indiana/Knox\",","    \"US/Michigan\": \"America/Detroit\",","    \"US/Mountain\": \"America/Denver\",","    \"US/Pacific\": \"America/Los_Angeles\",","    \"US/Samoa\": \"Pacific/Pago_Pago\",","    \"UTC\": \"Etc/UTC\",","    \"Universal\": \"Etc/UTC\",","    \"W-SU\": \"Europe/Moscow\",","    \"Zulu\": \"Etc/UTC\",","    \"Europe/Mariehamn\": \"Europe/Helsinki\",","    \"Europe/Vatican\": \"Europe/Rome\",","    \"Europe/San_Marino\": \"Europe/Rome\",","    \"Arctic/Longyearbyen\": \"Europe/Oslo\",","    \"Europe/Ljubljana\": \"Europe/Belgrade\",","    \"Europe/Podgorica\": \"Europe/Belgrade\",","    \"Europe/Sarajevo\": \"Europe/Belgrade\",","    \"Europe/Skopje\": \"Europe/Belgrade\",","    \"Europe/Zagreb\": \"Europe/Belgrade\",","    \"Europe/Bratislava\": \"Europe/Prague\",","    \"America/Shiprock\": \"America/Denver\",","    \"America/St_Barthelemy\": \"America/Guadeloupe\",","    \"America/Marigot\": \"America/Guadeloupe\"","};","","TimezoneLinks = Y.Date.Timezone.__tzoneLinks;/**"," * Timezone performs operations on a given timezone string represented in Olson tz database"," * This module uses parts of zimbra AjxTimezone to handle time-zones"," * @module datatype-date-timezone"," * @requires datatype-date-format"," */","","/**"," * Pad string to specified length"," * @method _zeroPad"," * @for Date"," * @static"," * @private"," * @param {String|Number} s The string or number to be padded"," * @param {Number} length The maximum length s should be padded to have"," * @param {String} [zeroChar='0'] The character to be used to pad the string."," * @param {Boolean} [rightSide=false] If true, padding will be done from the right-side of the string"," * @return {String} The padded string"," */","Y.Date._zeroPad  = function(s, length, zeroChar, rightSide) {","    s = typeof s === \"string\" ? s : String(s);","","    if (s.length >= length) { return s; }","","    zeroChar = zeroChar || '0';","	","    var a = [], i;","    for (i = s.length; i < length; i++) {","        a.push(zeroChar);","    }","    a[rightSide ? \"unshift\" : \"push\"](s);","","    return a.join(\"\");","};","","/**"," * Class to handle timezones"," * @class __zTimezone"," * @namespace Date"," * @private"," * @constructor"," */","Y.Date.__zTimezone = function() {};","","AjxTimezone = Y.Date.__zTimezone;","","Y.mix(AjxTimezone, {","    /**","     * Get DST trasition date","     * @method getTransition","     * @static","     * @param onset {Object} DST transition information","     * @param year {Number} Year in which transition date is calculated","     * @return {Array} Transition as [year, month, day]","     */","    getTransition: function(onset, year) {","        var trans = [ year || new Date().getFullYear(), onset.mon, 1 ], date, wkday, adjust, last, count;","        if (onset.mday) {","            trans[2] = onset.mday;","        }","        else if (onset.wkday) {","            date = new Date(year, onset.mon - 1, 1, onset.hour, onset.min, onset.sec);","","            // last wkday of month","            if (onset.week === -1) {","                // NOTE: This creates a date of the *last* day of specified month by","                //       setting the month to *next* month and setting day of month","                //       to zero (i.e. the day *before* the first day).","                last = new Date(new Date(date.getTime()).setMonth(onset.mon, 0));","                count = last.getDate();","                wkday = last.getDay() + 1;","                adjust = wkday >= onset.wkday ? wkday - onset.wkday : 7 - onset.wkday - wkday;","                trans[2] = count - adjust;","            }","","            // Nth wkday of month","            else {","                wkday = date.getDay() + 1;","                adjust = onset.wkday === wkday ? 1 :0;","                trans[2] = onset.wkday + 7 * (onset.week - adjust) - wkday + 1;","            }","        }","        return trans;","    },","","    /**","     * Add dst transition rules with dst information","     * @method addRule","     * @static","     * @param rule {Object} Object containing timezone information","     */","    addRule: function(rule) {","        var tzId = rule.tzId, array;","","        AjxTimezone._SHORT_NAMES[tzId] = AjxTimezone._generateShortName(rule.standard.offset);","        AjxTimezone._CLIENT2RULE[tzId] = rule;","","        array = rule.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;","        array.push(rule);","    },","","    /**","     * Get dst transition rule","     * @method getRule","     * @static","     * @param tzId {Object} Timezone Id","     * @param tz {Object} Rule object to match against","     * @return {Object} The rule","     */","    getRule: function(tzId, tz) {","        var rule = AjxTimezone._CLIENT2RULE[tzId],","            names = [ \"standard\", \"daylight\" ],","            rules, i, j, found, name, onset, breakOuter, p;","        if (!rule && tz) {","            rules = tz.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;","            for (i = 0; i < rules.length; i++) {","                rule = rules[i];","","                found = true;","                for (j = 0; j < names.length; j++) {","                    name = names[j];","                    onset = rule[name];","                    if (!onset) { continue; }","			","                    breakOuter = false;","","                    for (p in tz[name]) {","                        if (tz[name][p] !== onset[p]) {","                            found = false;","                            breakOuter = true;","                            break;","                        }","                    }","","                    if(breakOuter){","                        break;","                    }","                }","                if (found) {","                    return rule;","                }","            }","            return null;","        }","","        return rule;","    },","","    /**","     * Get offset in minutes from GMT","     * @method getOffset","     * @static","     * @param tzId {String} Timezone ID","     * @param date {Date} Date on which the offset is to be found (offset may differ by date due to DST)","     * @return {Number} Offset in minutes from GMT","     */","    getOffset: function(tzId, date) {","        var rule = AjxTimezone.getRule(tzId), year, standard, stdTrans, dstTrans, month, stdMonth, dstMonth, isDST;","        if (rule && rule.daylight) {","            year = date.getFullYear();","","            standard = rule.standard, daylight  = rule.daylight;","            stdTrans = AjxTimezone.getTransition(standard, year);","            dstTrans = AjxTimezone.getTransition(daylight, year);","","            month    = date.getMonth()+1, day = date.getDate();","            stdMonth = stdTrans[1], stdDay = stdTrans[2];","            dstMonth = dstTrans[1], dstDay = dstTrans[2];","","            // northern hemisphere","            isDST = false;","            if (dstMonth < stdMonth) {","                isDST = month > dstMonth && month < stdMonth;","                isDST = isDST || (month === dstMonth && day >= dstDay);","                isDST = isDST || (month === stdMonth && day <  stdDay);","            }","","            // sorthern hemisphere","            else {","                isDST = month < dstMonth || month > stdMonth;","                isDST = isDST || (month === dstMonth && day <  dstDay);","                isDST = isDST || (month === stdMonth && day >= stdDay);","            }","","            return isDST ? daylight.offset : standard.offset;","        }","        return rule ? rule.standard.offset : -(new Date().getTimezoneOffset());","    },","","    /**","     * Compare rules to sort by offset","     * @method _BY_OFFSET","     * @static","     * @private","     * @param arule {Object} Rule to compare","     * @param brule {Object} Rule to compare","     * @return {Number} Difference in offsets between the rules.","               If offsets are equal, returns 1 if timezone id of arule comes first alphabetically, -1 otherwise","     */","    _BY_OFFSET: function(arule, brule) {","        // sort by offset and then by name","        var delta = arule.standard.offset - brule.standard.offset,","            aname = arule.tzId,","            bname = brule.tzId;","        if (delta === 0) {","            if (aname < bname) { delta = -1; }","            else if (aname > bname) { delta = 1; }","        }","        return delta;","    },","","    _SHORT_NAMES: {},","    _CLIENT2RULE: {},","    /**","     * The data is specified using the server identifiers for historical","     * reasons. Perhaps in the future we'll use the client (i.e. Java)","     * identifiers on the server as well.","     */","    STANDARD_RULES: [],","    DAYLIGHT_RULES: [],","","    /**","     * Generate short name for a timezone like +0530 for IST","     * @method _generateShortName","     * @static","     * @private","     * @param offset {Number} Offset in minutes from GMT","     * @param [period=false] {Boolean} If true, a dot is inserted between hours and minutes","     * @return {String} Short name for timezone","     */","    _generateShortName: function(offset, period) {","        if (offset === 0) { return \"\"; }","        var sign = offset < 0 ? \"-\" : \"+\",","            stdOffset = Math.abs(offset),","            hours = Math.floor(stdOffset / 60),","            minutes = stdOffset % 60;","","        hours = hours < 10 ? '0' + hours : hours;","        minutes = minutes < 10 ? '0' + minutes : minutes;","        return [sign,hours,period?\".\":\"\",minutes].join(\"\");","    },","","    /**","     * Initialized timezone rules. Only for internal use.","     * @method _initTimezoneRules","     * @static","     * @private","     */","    _initTimezoneRules: function() {","        var rule, i, j, array;","","        for (i = 0; i < TimezoneData.TIMEZONE_RULES.length; i++) {","            rule = TimezoneData.TIMEZONE_RULES[i];","            array = rule.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;","            array.push(rule);","        }","","        TimezoneData.TIMEZONE_RULES.sort(AjxTimezone._BY_OFFSET);","        for (j = 0; j < TimezoneData.TIMEZONE_RULES.length; j++) {","            rule = TimezoneData.TIMEZONE_RULES[j];","            AjxTimezone.addRule(rule);","        }","    },","","    /**","     * Get timezone ids matching raw offset","     * @method getCurrentTimezoneIds","     * @static","     * @param rawOffset {Number} Offset in seconds from GMT","     * @return {Array} timezone ids having the specified offset","     */","    getCurrentTimezoneIds: function(rawOffset) {","        rawOffset = rawOffset/60;	//Need offset in minutes","","        var result = [],","            today = new Date(),","            tzId, link;","","        for(tzId in AjxTimezone._CLIENT2RULE) {","            if(rawOffset === 0 || AjxTimezone.getOffset(tzId, today) === rawOffset) {","                result.push(tzId);","            }","        }","","        for(link in TimezoneLinks) {","            if(Y.Array.indexOf(result,TimezoneLinks[link]) !== -1) {","                result.push(link);","            }","        }","        return result;","    },","","    /**","     * Get the first timezone matching rawOffset","     * @method getTimezoneIdForOffset","     * @static","     * @param rawOffset {Number} offset in seconds from GMT","     * @return {String} tzId of timezone that matches the offset. Returns empty string if no matches found","     */","    getTimezoneIdForOffset: function(rawOffset) {","        rawOffset = rawOffset/60;	//Need offset in minutes","","        var etcGMTId = \"Etc/GMT\",","            today = new Date(),","            tzId;","        ","        if(rawOffset % 60 === 0) {","            if(rawOffset !== 0) {","                etcGMTId += (rawOffset > 0? \"-\": \"+\") + rawOffset/60;","            }","","            if(AjxTimezone._CLIENT2RULE[etcGMTId] !== undefined) {","                return etcGMTId;","            }","        }","	","        for(tzId in AjxTimezone._CLIENT2RULE) {","            if(AjxTimezone.getOffset(tzId, today) === rawOffset) {","                return tzId;","            }","        }","","        return \"\";","    },","","    /**","     * Check whether DST is active at specified date","     * @method isDST","     * @static","     * @param tzId {String} Timezone ID","     * @param date {Date}","     * @return {Number} 1 if DST is active, 0 if not, and -1 if specified timezone does not observe DST","     */","    isDST: function(tzId, date) {","        var rule = AjxTimezone.getRule(tzId),","            year,","            standard, daylight,","            stdTrans, dstTrans,","            month, day,","            stdMonth, stdDay,","            dstMonth, dstDay,","            isDSTActive;","            ","        if (rule && rule.daylight) {","            year = date.getFullYear();","","            standard = rule.standard, daylight  = rule.daylight;","            stdTrans = AjxTimezone.getTransition(standard, year);","            dstTrans = AjxTimezone.getTransition(daylight, year);","","            month    = date.getMonth()+1, day = date.getDate();","            stdMonth = stdTrans[1], stdDay = stdTrans[2];","            dstMonth = dstTrans[1], dstDay = dstTrans[2];","","            // northern hemisphere","            isDSTActive = false;","            if (dstMonth < stdMonth) {","                isDSTActive = month > dstMonth && month < stdMonth;","                isDSTActive = isDSTActive || (month === dstMonth && day >= dstDay);","                isDSTActive = isDSTActive || (month === stdMonth && day <  stdDay);","            }","","            // sorthern hemisphere","            else {","                isDSTActive = month < dstMonth || month > stdMonth;","                isDSTActive = isDSTActive || (month === dstMonth && day <  dstDay);","                isDSTActive = isDSTActive || (month === stdMonth && day >= stdDay);","            }","","            return isDSTActive? 1:0;","        }","        return -1;","    },","","    /**","     * Check whether tzId is a valid timezone","     * @method isValidTimezoneId","     * @static","     * @param tzId {String} Timezone ID","     * @return {Boolean} true if tzId is valid, false otherwise","     */","    isValidTimezoneId: function(tzId) {","        return (AjxTimezone._CLIENT2RULE[tzId] !== undefined || TimezoneLinks[tzId] !== undefined);","    }","});","","Y.mix(AjxTimezone.prototype, {","","    /**","     * Get short name of timezone","     * @method getShortName","     * @param tzId {String} Timezone ID","     * @return {String}","     */","    getShortName: function(tzId) {","        var shortName = [\"GMT\",AjxTimezone._SHORT_NAMES[tzId]].join(\"\");","        return shortName;","    },","","    /**","     * Get medium length name of timezone","     * @method getMediumName","     * @param tzId {String} Timezone ID","     * @return {String}","     */","    getMediumName: function(tzId) {","        var mediumName = ['(',this.getShortName(tzId),') ',tzId].join(\"\");","        return mediumName;","    },","","    /**","     * Get long name of timezone","     * @method getLongName","     * @param tzId {String} Timezone Id","     * @return {String}","     */","    getLongName: AjxTimezone.prototype.getMediumName","});","","AjxTimezone._initTimezoneRules();","","/**"," * Timezone performs operations on a given timezone string represented in Olson tz database"," * @class Timezone"," * @constructor"," * @param {String} tzId TimeZone ID as in Olson tz database"," */","Y.Date.Timezone = function(tzId) {","    var normalizedId = Timezone.getNormalizedTimezoneId(tzId);","    if(normalizedId === \"\") {","	Y.error(\"Could not find timezone: \" + tzId);","    }","    this.tzId = normalizedId;","","    this._ajxTimeZoneInstance = new AjxTimezone();","};","","Y.namespace(\"Date\");","Timezone = Y.Date.Timezone;","","Y.mix(Timezone, {","    /**","     * Get Day of Year(0-365) for the date passed","     * @method _getDOY","     * @private","     * @static","     * @param {Date} date","     * @return {Number} Day of Year","     */","    _getDOY: function (date) {","        var oneJan = new Date(date.getFullYear(),0,1);","        return Math.ceil((date - oneJan) / 86400000);","    },","","    /**","     * Get integer part of floating point argument","     * @method _floatToInt","     * @static","     * @private","     * @param floatNum {Number} A real number","     * @return {Number} Integer part of floatNum","     */","    _floatToInt: function (floatNum) {","        return (floatNum < 0) ? Math.ceil(floatNum) : Math.floor(floatNum);","    },","","    /**","     * Returns list of timezone Id's that have the same rawOffSet as passed in","     * @method getCurrentTimezoneIds","     * @static","     * @param {Number} rawOffset Raw offset (in seconds) from GMT.","     * @return {Array} array of timezone Id's that match rawOffset passed in to the API.","     */","    getCurrentTimezoneIds: function(rawOffset) {","        return AjxTimezone.getCurrentTimezoneIds(rawOffset);","    },","","    /**","     * Given a raw offset in seconds, get the tz database ID that reflects the given raw offset, or empty string if there is no such ID.","     * Where available, the function will return an ID starting with \"Etc/GMT\".","     * For offsets where no such ID exists but that are used by actual time zones, the ID of one of those time zones is returned.","     * Note that the offset shown in an \"Etc/GMT\" ID is opposite to the value of rawOffset","     * @method getTimezoneIdForOffset","     * @static","     * @param {Number} rawOffset Offset from GMT in seconds","     * @return {String} timezone id","     */","    getTimezoneIdForOffset: function(rawOffset) {","        return AjxTimezone.getTimezoneIdForOffset(rawOffset);","    },","","    /**","     * Given a wall time reference, convert it to UNIX time - seconds since Epoch","     * @method getUnixTimeFromWallTime","     * @static","     * @param {Object} walltime Walltime that needs conversion. Missing properties will be treat as 0.","     * @return {Number} UNIX time - time in seconds since Epoch","     */","    getUnixTimeFromWallTime: function(walltime) {","        /*","         * Initialize any missing properties.","         */","        if(!Y.Lang.isValue( walltime.year )) {","            walltime.year = new Date().getFullYear();	//Default to current year","        }","        if(!Y.Lang.isValue( walltime.mon )) {","            walltime.mon = 0;				//Default to January","        }","        if(!Y.Lang.isValue( walltime.mday )) {","            walltime.mday = 1;				//Default to first of month","        }","        if(!Y.Lang.isValue( walltime.hour )) {			//Default to 12 midnight","            walltime.hour = 0;","        }","        if(!Y.Lang.isValue( walltime.min )) {","            walltime.min = 0;","        }","        if(!Y.Lang.isValue( walltime.sec )) {","            walltime.sec = 0;","        }","        if(!Y.Lang.isValue( walltime.gmtoff )) {			//Default to UTC","            walltime.gmtoff = 0;","        }","","        var utcTime = Date.UTC(walltime.year, walltime.mon, walltime.mday, walltime.hour, walltime.min, walltime.sec);","        utcTime -= walltime.gmtoff*1000;","","        return Timezone._floatToInt(utcTime/1000);	//Unix time: count from midnight Jan 1 1970 UTC","    },","","    /**","     * Checks if the timestamp passed in is a valid timestamp for this timezone and offset.","     * @method isValidTimestamp","     * @static","     * @param {String} timeStamp Time value in UTC RFC3339 format - yyyy-mm-ddThh:mm:ssZ or yyyy-mm-ddThh:mm:ss+/-HH:MM","     * @param {Number} rawOffset An offset from UTC in seconds.","     * @return {Boolean} true if valid timestamp, false otherwise","     */","    isValidTimestamp: function(timeStamp, rawOffset) {","        var regex = /^(\\d\\d\\d\\d)\\-([0-1][0-9])\\-([0-3][0-9])([T ])([0-2][0-9]):([0-6][0-9]):([0-6][0-9])(Z|[+\\-][0-1][0-9]:[0-3][0-9])?$/,","            matches = (new RegExp(regex)).exec(timeStamp),","            year, month, day, hours, minutes, seconds, tZone,","            m31, maxDays,","            dateTimeSeparator, offset;","","        //No match","        if(matches === null) {","            return false;","        }","","        year = parseInt(matches[1], 10),","        month = parseInt(matches[2], 10),","        day = parseInt(matches[3], 10),","        dateTimeSeparator = matches[4],","        hours = parseInt(matches[5], 10),","        minutes = parseInt(matches[6], 10),","        seconds = parseInt(matches[7], 10),","        tZone = matches[8];","        //Month should be in 1-12","        if(month < 1 || month > 12) {","            return false;","        }","","        //Months with 31 days","        m31 = [1,3,5,7,8,10,12];","        maxDays = 30;","        if(Y.Array.indexOf(m31,month) !== -1) {","            maxDays = 31;","        } else if(month === 2) {","            if(year % 400 === 0) {","                maxDays = 29;","            } else if(year % 100 === 0) {","                maxDays = 28;","            } else if(year % 4 === 0) {","                maxDays = 29;","            } else {","                maxDays = 28;","            }","        }","","        //Day should be valid day for month","        if(day < 1 || day > maxDays) {","            return false;","        }","","        //Hours should be in 0-23","        if(hours < 0 || hours > 23) {","            return false;","        }","","        //Minutes and Seconds should in 0-59","        if(minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {","            return false;","        }","","        //Now verify timezone","        if(dateTimeSeparator === \" \" && tZone === undefined) {","            //SQL Format","            return true;","        } else if(dateTimeSeparator === \"T\" && tZone !== undefined) {","            //RFC3339 Format","            offset = 0;","            if(tZone !== \"Z\") {","                //Not UTC TimeZone","                offset = parseInt(tZone.substr(1,3), 10)*60 + parseInt(tZone.substr(4), 10);","                offset = offset*60;	//To seconds","","                offset = offset * (tZone.charAt(0) === \"+\" ? 1 : -1);","            }","            //Check offset in timeStamp with passed rawOffset","            if(offset === rawOffset) {","                return true;","            }","        }","","        //If reached here, wrong format","        return false;","    },","","    /**","     * Checks if tzId passed in is a valid Timezone id in tz database.","     * @method isValidTimezoneId","     * @static","     * @param {String} tzId timezoneId to be checked for validity","     * @return {Boolean} true if tzId is a valid timezone id in tz database.","               tzId could be a \"zone\" id or a \"link\" id to be a valid tz Id. False otherwise","     */","    isValidTimezoneId: function(tzId) {","        return AjxTimezone.isValidTimezoneId(tzId);","    },","","    /**","     * Returns the normalized version of the time zone ID, or empty string if tzId is not a valid time zone ID.","     * If tzId is a link Id, the standard name will be returned.","     * @method getNormalizedTimezoneId","     * @static","     * @param {String} tzId The timezone ID whose normalized form is requested.","     * @return {String} The normalized version of the timezone Id, or empty string if tzId is not a valid time zone Id.","     */","    getNormalizedTimezoneId: function(tzId) {","        if(!Timezone.isValidTimezoneId(tzId)) {","            return \"\";","        }","        var normalizedId,","            next = tzId;","","        do {","            normalizedId = next;","            next = TimezoneLinks[normalizedId];","        } while( next !== undefined );","","        return normalizedId;","    }","});","","Y.mix(Timezone.prototype, {","    /**","     * Parse RFC3339 date format and return the Date","     * Format: yyyy-mm-ddThh:mm:ssZ","     * @method _parseRFC3339","     * @private","     * @param {String} dString The date string to be parsed","     * @return {Date} The date represented by dString","     */","    _parseRFC3339: function(dString){","        var regexp = /(\\d+)(\\-)?(\\d+)(\\-)?(\\d+)(T)?(\\d+)(:)?(\\d+)(:)?(\\d+)(\\.\\d+)?(Z|([+\\-])(\\d+)(:)?(\\d+))/,","            result = new Date(),","            d = dString.match(regexp),","            offset = 0;","","        result.setUTCDate(1);","        result.setUTCFullYear(parseInt(d[1],10));","        result.setUTCMonth(parseInt(d[3],10) - 1);","        result.setUTCDate(parseInt(d[5],10));","        result.setUTCHours(parseInt(d[7],10));","        result.setUTCMinutes(parseInt(d[9],10));","        result.setUTCSeconds(parseInt(d[11],10));","        if (d[12]) {","            result.setUTCMilliseconds(parseFloat(d[12]) * 1000);","        } else {","            result.setUTCMilliseconds(0);","        }","        if (d[13] !== 'Z') {","            offset = (d[15] * 60) + parseInt(d[17],10);","            offset *= ((d[14] === '-') ? -1 : 1);","            result.setTime(result.getTime() - offset * 60 * 1000);","        }","        return result;","    },","","    /**","     * Parse SQL date format and return the Date","     * Format: yyyy-mm-dd hh:mm:ss","     * @method _parseSQLFormat","     * @private","     * @param {String} dString The date string to be parsed","     * @return {Date} The date represented by dString","     */","    _parseSQLFormat: function(dString) {","        var dateTime = dString.split(\" \"),","            date = dateTime[0].split(\"-\"),","            time = dateTime[1].split(\":\"),","            offset = AjxTimezone.getOffset(this.tzId, new Date(date[0], date[1] - 1, date[2]));","            ","        return new Date(Date.UTC(date[0], date[1] - 1, date[2], time[0], time[1], time[2]) - offset*60*1000);","    },","","    /**","     * Return a short name for the timezone","     * @method getShortName","     * @return {String} Short name","     */","    getShortName: function() {","        return this._ajxTimeZoneInstance.getShortName(this.tzId);","    },","","    /**","     * Return a medium length name for the timezone","     * @method getMediumName","     * @return {String} Medium length name","     */","    getMediumName: function() {","        return this._ajxTimeZoneInstance.getMediumName(this.tzId);","    },","","    /**","     * Return a long name for the timezone","     * @method getLongName","     * @return {String} Long name","     */","    getLongName: function() {","        return this._ajxTimeZoneInstance.getLongName(this.tzId);","    },","","    /**","     * Given a timevalue representation in RFC 3339 or SQL format, convert to UNIX time - seconds since Epoch ie., since 1970-01-01T00:00:00Z","     * @method convertToIncrementalUTC","     * @param {String} timeValue TimeValue representation in RFC 3339 or SQL format.","     * @return {Number} UNIX time - time in seconds since Epoch","     */","    convertToIncrementalUTC: function(timeValue) {","        if(Y.Array.indexOf(timeValue,\"T\") !== -1) {","            //RFC3339","            return this._parseRFC3339(timeValue).getTime() / 1000;","        } else {","            //SQL","            return this._parseSQLFormat(timeValue).getTime() / 1000;","        }","    },","","    /**","     * Given UNIX time - seconds since Epoch ie., 1970-01-01T00:00:00Z, convert the timevalue to RFC3339 format - \"yyyy-mm-ddThh:mm:ssZ\"","     * @method convertUTCToRFC3339Format","     * @param {Number} timeValue time value in seconds since Epoch.","     * @return {String} RFC3339 format timevalue - \"yyyy-mm-ddThh:mm:ssZ\"","     */","    convertUTCToRFC3339Format: function(timeValue) {","        var uTime = new Date(timeValue * 1000),","            offset = AjxTimezone.getOffset(this.tzId, uTime),","            offsetString = \"Z\",","            rfc3339, offsetSign;","","        if(offset !== 0) {","            offsetSign = (offset > 0 ? \"+\": \"-\");","            offsetString = offsetSign + Y.Date._zeroPad(Math.abs(Timezone._floatToInt(offset/60)), 2) + \":\" + Y.Date._zeroPad(offset % 60, 2);","        }","","        uTime.setTime(timeValue*1000 + offset*60*1000);","","        rfc3339 = Y.Date._zeroPad(uTime.getUTCFullYear(), 4) + \"-\"","                      + Y.Date._zeroPad((uTime.getUTCMonth() + 1), 2) + \"-\" + Y.Date._zeroPad(uTime.getUTCDate(), 2)","                      + \"T\" + Y.Date._zeroPad(uTime.getUTCHours(), 2) + \":\" + Y.Date._zeroPad(uTime.getUTCMinutes(), 2)","                      + \":\" + Y.Date._zeroPad(uTime.getUTCSeconds(), 2) + offsetString;","","        return rfc3339;","    },","","    /**","     * Given UNIX Time - seconds since Epoch ie., 1970-01-01T00:00:00Z, convert the timevalue to SQL Format - \"yyyy-mm-dd hh:mm:ss\"","     * @method convertUTCToSQLFormat","     * @param {Number} timeValue time value in seconds since Epoch.","     * @return {String} SQL Format timevalue - \"yyyy-mm-dd hh:mm:ss\"","     */","    convertUTCToSQLFormat: function(timeValue) {","        var uTime = new Date(timeValue * 1000),","            offset = AjxTimezone.getOffset(this.tzId, uTime),","            sqlDate;","            ","        uTime.setTime(timeValue*1000 + offset*60*1000);","","        sqlDate = Y.Date._zeroPad(uTime.getUTCFullYear(), 4) + \"-\" + Y.Date._zeroPad((uTime.getUTCMonth() + 1), 2)","                      + \"-\" + Y.Date._zeroPad(uTime.getUTCDate(), 2) + \" \" + Y.Date._zeroPad(uTime.getUTCHours(), 2)","                      + \":\" + Y.Date._zeroPad(uTime.getUTCMinutes(), 2) + \":\" + Y.Date._zeroPad(uTime.getUTCSeconds(), 2);","","        return sqlDate;","    },","","    /**","     * Gets the offset of this timezone in seconds from UTC","     * @method getRawOffset","     * @return {Number} offset of this timezone in seconds from UTC","     */","    getRawOffset: function() {","        return AjxTimezone.getOffset(this.tzId, new Date()) * 60;","    },","","    /**","     * Given a unix time, convert it to wall time for this timezone.","     * @method getWallTimeFromUnixTime","     * @param {Number} timeValue value in seconds from Epoch.","     * @return {Object} an object with the properties: sec, min, hour, mday, mon, year, wday, yday, isdst, gmtoff, zone.","           All of these are integers except for zone, which is a string. isdst is 1 if DST is active, and 0 if DST is inactive.","     */","    getWallTimeFromUnixTime: function(timeValue) {","        var offset = AjxTimezone.getOffset(this.tzId, new Date(timeValue*1000)) * 60,","            localTimeValue = timeValue + offset,","            date = new Date(localTimeValue*1000),","            walltime = {","                sec: date.getUTCSeconds(),","                min: date.getUTCMinutes(),","                hour: date.getUTCHours(),","                mday: date.getUTCDate(),","                mon: date.getUTCMonth(),","                year: date.getUTCFullYear(),","                wday: date.getUTCDay(),","                yday: Timezone._getDOY(date),","                isdst: AjxTimezone.isDST(this.tzId, new Date(timeValue)),","                gmtoff: offset,","                zone: this.tzId","            };","","        return walltime;","    }","});","","","}, '@VERSION@', {\"requires\": [\"datatype-date-format\"]});"];
_yuitest_coverage["build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js"].lines = {"1":0,"6":0,"8":0,"3000":0,"3001":0,"3143":0,"3162":0,"3163":0,"3165":0,"3167":0,"3169":0,"3170":0,"3171":0,"3173":0,"3175":0,"3185":0,"3187":0,"3189":0,"3199":0,"3200":0,"3201":0,"3203":0,"3204":0,"3207":0,"3211":0,"3212":0,"3213":0,"3214":0,"3215":0,"3220":0,"3221":0,"3222":0,"3225":0,"3235":0,"3237":0,"3238":0,"3240":0,"3241":0,"3253":0,"3256":0,"3257":0,"3258":0,"3259":0,"3261":0,"3262":0,"3263":0,"3264":0,"3265":0,"3267":0,"3269":0,"3270":0,"3271":0,"3272":0,"3273":0,"3277":0,"3278":0,"3281":0,"3282":0,"3285":0,"3288":0,"3300":0,"3301":0,"3302":0,"3304":0,"3305":0,"3306":0,"3308":0,"3309":0,"3310":0,"3313":0,"3314":0,"3315":0,"3316":0,"3317":0,"3322":0,"3323":0,"3324":0,"3327":0,"3329":0,"3344":0,"3347":0,"3348":0,"3349":0,"3351":0,"3374":0,"3375":0,"3380":0,"3381":0,"3382":0,"3392":0,"3394":0,"3395":0,"3396":0,"3397":0,"3400":0,"3401":0,"3402":0,"3403":0,"3415":0,"3417":0,"3421":0,"3422":0,"3423":0,"3427":0,"3428":0,"3429":0,"3432":0,"3443":0,"3445":0,"3449":0,"3450":0,"3451":0,"3454":0,"3455":0,"3459":0,"3460":0,"3461":0,"3465":0,"3477":0,"3486":0,"3487":0,"3489":0,"3490":0,"3491":0,"3493":0,"3494":0,"3495":0,"3498":0,"3499":0,"3500":0,"3501":0,"3502":0,"3507":0,"3508":0,"3509":0,"3512":0,"3514":0,"3525":0,"3529":0,"3538":0,"3539":0,"3549":0,"3550":0,"3562":0,"3570":0,"3571":0,"3572":0,"3573":0,"3575":0,"3577":0,"3580":0,"3581":0,"3583":0,"3593":0,"3594":0,"3606":0,"3617":0,"3631":0,"3645":0,"3646":0,"3648":0,"3649":0,"3651":0,"3652":0,"3654":0,"3655":0,"3657":0,"3658":0,"3660":0,"3661":0,"3663":0,"3664":0,"3667":0,"3668":0,"3670":0,"3682":0,"3689":0,"3690":0,"3693":0,"3702":0,"3703":0,"3707":0,"3708":0,"3709":0,"3710":0,"3711":0,"3712":0,"3713":0,"3714":0,"3715":0,"3716":0,"3717":0,"3719":0,"3724":0,"3725":0,"3729":0,"3730":0,"3734":0,"3735":0,"3739":0,"3741":0,"3742":0,"3744":0,"3745":0,"3747":0,"3748":0,"3750":0,"3753":0,"3754":0,"3759":0,"3771":0,"3783":0,"3784":0,"3786":0,"3789":0,"3790":0,"3791":0,"3794":0,"3798":0,"3808":0,"3813":0,"3814":0,"3815":0,"3816":0,"3817":0,"3818":0,"3819":0,"3820":0,"3821":0,"3823":0,"3825":0,"3826":0,"3827":0,"3828":0,"3830":0,"3842":0,"3847":0,"3856":0,"3865":0,"3874":0,"3884":0,"3886":0,"3889":0,"3900":0,"3905":0,"3906":0,"3907":0,"3910":0,"3912":0,"3917":0,"3927":0,"3931":0,"3933":0,"3937":0,"3946":0,"3957":0,"3974":0};
_yuitest_coverage["build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js"].functions = {"_zeroPad:3162":0,"getTransition:3198":0,"addRule:3234":0,"getRule:3252":0,"getOffset:3299":0,"_BY_OFFSET:3342":0,"_generateShortName:3373":0,"_initTimezoneRules:3391":0,"getCurrentTimezoneIds:3414":0,"getTimezoneIdForOffset:3442":0,"isDST:3476":0,"isValidTimezoneId:3524":0,"getShortName:3537":0,"getMediumName:3548":0,"Timezone:3570":0,"_getDOY:3592":0,"_floatToInt:3605":0,"getCurrentTimezoneIds:3616":0,"getTimezoneIdForOffset:3630":0,"getUnixTimeFromWallTime:3641":0,"isValidTimestamp:3681":0,"isValidTimezoneId:3770":0,"getNormalizedTimezoneId:3782":0,"_parseRFC3339:3807":0,"_parseSQLFormat:3841":0,"getShortName:3855":0,"getMediumName:3864":0,"getLongName:3873":0,"convertToIncrementalUTC:3883":0,"convertUTCToRFC3339Format:3899":0,"convertUTCToSQLFormat:3926":0,"getRawOffset:3945":0,"getWallTimeFromUnixTime:3956":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js"].coveredLines = 257;
_yuitest_coverage["build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js"].coveredFunctions = 34;
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 1);
YUI.add('gallery-advanced-date-timezone', function (Y, NAME) {

/*
 * Copyright 2012 Yahoo! Inc. All Rights Reserved. Based on code owned by VMWare, Inc.
 */
_yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 6);
var TimezoneData, TimezoneLinks, Timezone, AjxTimezone;

_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 8);
Y.Date.Timezone = {
    __tzoneData: {
         TRANSITION_YEAR: 2011,
         TIMEZONE_RULES: [
{
    tzId: "Asia/Riyadh88",
    standard: {
        offset: 187
    }
},
{
    tzId: "Asia/Kabul",
    standard: {
        offset: 270
    }
},
{
    tzId: "Asia/Yerevan",
    standard: {
        offset: 240
    }
},
{
    tzId: "Asia/Baku",
    standard: {
        offset: 240,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 5,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: 300,
        mon: 3,
        week: -1,
        wkday: 1,
        hour: 4,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Asia/Bahrain",
    standard: {
        offset: 180
    }
},
{
    tzId: "Asia/Dhaka",
    standard: {
        offset: 360
    }
},
{
    tzId: "Asia/Thimphu",
    standard: {
        offset: 360
    }
},
{
    tzId: "Indian/Chagos",
    standard: {
        offset: 360
    }
},
{
    tzId: "Asia/Brunei",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Rangoon",
    standard: {
        offset: 390
    }
},
{
    tzId: "Asia/Phnom_Penh",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Harbin",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Shanghai",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Chongqing",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Urumqi",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Kashgar",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Hong_Kong",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Taipei",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Macau",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Nicosia",
    standard: {
        offset: 120
    }
},
{
    tzId: "Asia/Tbilisi",
    standard: {
        offset: 240
    }
},
{
    tzId: "Asia/Dili",
    standard: {
        offset: 540
    }
},
{
    tzId: "Asia/Kolkata",
    standard: {
        offset: 330
    }
},
{
    tzId: "Asia/Jakarta",
    standard: {
        offset: 427
    }
},
{
    tzId: "Asia/Pontianak",
    standard: {
        offset: 540
    }
},
{
    tzId: "Asia/Tehran",
    standard: {
        offset: 210
    }
},
{
    tzId: "Asia/Baghdad",
    standard: {
        offset: 180
    }
},
{
    tzId: "Asia/Jerusalem",
    standard: {
        offset: 120
    }
},
{
    tzId: "Asia/Tokyo",
    standard: {
        offset: 540
    }
},
{
    tzId: "Asia/Amman",
    standard: {
        offset: 120
    }
},
{
    tzId: "Asia/Almaty",
    standard: {
        offset: 360
    }
},
{
    tzId: "Asia/Qyzylorda",
    standard: {
        offset: 360
    }
},
{
    tzId: "Asia/Aqtobe",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Aqtau",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Oral",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Bishkek",
    standard: {
        offset: 360
    }
},
{
    tzId: "Asia/Seoul",
    standard: {
        offset: 540
    }
},
{
    tzId: "Asia/Kuwait",
    standard: {
        offset: 180
    }
},
{
    tzId: "Asia/Vientiane",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Beirut",
    standard: {
        offset: 120
    }
},
{
    tzId: "Asia/Kuala_Lumpur",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Kuching",
    standard: {
        offset: 480
    }
},
{
    tzId: "Indian/Maldives",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Hovd",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Ulaanbaatar",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Choibalsan",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Kathmandu",
    standard: {
        offset: 345
    }
},
{
    tzId: "Asia/Muscat",
    standard: {
        offset: 240
    }
},
{
    tzId: "Asia/Karachi",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Gaza",
    standard: {
        offset: 120
    }
},
{
    tzId: "Asia/Hebron",
    standard: {
        offset: 120
    }
},
{
    tzId: "Asia/Manila",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Qatar",
    standard: {
        offset: 180
    }
},
{
    tzId: "Asia/Riyadh",
    standard: {
        offset: 180
    }
},
{
    tzId: "Asia/Singapore",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Colombo",
    standard: {
        offset: 330
    }
},
{
    tzId: "Asia/Damascus",
    standard: {
        offset: 120,
        mon: 10,
        week: -1,
        wkday: 6,
        hour: 0,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: 180,
        mon: 3,
        week: -1,
        wkday: 6,
        hour: 0,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Asia/Dushanbe",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Bangkok",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Ashgabat",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Dubai",
    standard: {
        offset: 240
    }
},
{
    tzId: "Asia/Samarkand",
    standard: {
        offset: 300
    }
},
{
    tzId: "Asia/Ho_Chi_Minh",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Aden",
    standard: {
        offset: 180
    }
},
{
    tzId: "Australia/Darwin",
    standard: {
        offset: 570
    }
},
{
    tzId: "Australia/Perth",
    standard: {
        offset: 525
    }
},
{
    tzId: "Australia/Brisbane",
    standard: {
        offset: 600
    }
},
{
    tzId: "Australia/Adelaide",
    standard: {
        offset: 570,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: 630,
        mon: 10,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Australia/Hobart",
    standard: {
        offset: 600
    }
},
{
    tzId: "Australia/Melbourne",
    standard: {
        offset: 600,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: 660,
        mon: 10,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Australia/Sydney",
    standard: {
        offset: 570,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: 630,
        mon: 10,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Australia/Lord_Howe",
    standard: {
        offset: 630,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: 660,
        mon: 10,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Indian/Christmas",
    standard: {
        offset: 420
    }
},
{
    tzId: "Pacific/Rarotonga",
    standard: {
        offset: -600
    }
},
{
    tzId: "Indian/Cocos",
    standard: {
        offset: 390
    }
},
{
    tzId: "Pacific/Fiji",
    standard: {
        offset: 720
    }
},
{
    tzId: "Pacific/Gambier",
    standard: {
        offset: -600
    }
},
{
    tzId: "Pacific/Guam",
    standard: {
        offset: 600
    }
},
{
    tzId: "Pacific/Tarawa",
    standard: {
        offset: 840
    }
},
{
    tzId: "Pacific/Saipan",
    standard: {
        offset: 600
    }
},
{
    tzId: "Pacific/Majuro",
    standard: {
        offset: 720
    }
},
{
    tzId: "Pacific/Chuuk",
    standard: {
        offset: 660
    }
},
{
    tzId: "Pacific/Nauru",
    standard: {
        offset: 720
    }
},
{
    tzId: "Pacific/Noumea",
    standard: {
        offset: 660
    }
},
{
    tzId: "Pacific/Auckland",
    standard: {
        offset: 765
    }
},
{
    tzId: "Pacific/Niue",
    standard: {
        offset: -660
    }
},
{
    tzId: "Pacific/Norfolk",
    standard: {
        offset: 690
    }
},
{
    tzId: "Pacific/Palau",
    standard: {
        offset: 540
    }
},
{
    tzId: "Pacific/Port_Moresby",
    standard: {
        offset: 600
    }
},
{
    tzId: "Pacific/Pitcairn",
    standard: {
        offset: -480
    }
},
{
    tzId: "Pacific/Pago_Pago",
    standard: {
        offset: -660
    }
},
{
    tzId: "Pacific/Apia",
    standard: {
        offset: 780
    }
},
{
    tzId: "Pacific/Guadalcanal",
    standard: {
        offset: 660
    }
},
{
    tzId: "Pacific/Fakaofo",
    standard: {
        offset: 840
    }
},
{
    tzId: "Pacific/Tongatapu",
    standard: {
        offset: 780
    }
},
{
    tzId: "Pacific/Funafuti",
    standard: {
        offset: 720
    }
},
{
    tzId: "Pacific/Johnston",
    standard: {
        offset: -600
    }
},
{
    tzId: "Pacific/Midway",
    standard: {
        offset: -660
    }
},
{
    tzId: "Pacific/Wake",
    standard: {
        offset: 720
    }
},
{
    tzId: "Pacific/Efate",
    standard: {
        offset: 660
    }
},
{
    tzId: "Pacific/Wallis",
    standard: {
        offset: 720
    }
},
{
    tzId: "Etc/GMT",
    standard: {
        offset: 0
    }
},
{
    tzId: "Etc/GMT-14",
    standard: {
        offset: 0
    }
},
{
    tzId: "Asia/Riyadh87",
    standard: {
        offset: 187
    }
},
{
    tzId: "America/Argentina/Buenos_Aires",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/Cordoba",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/Salta",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/Tucuman",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/La_Rioja",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/San_Juan",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/Jujuy",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/Catamarca",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/Mendoza",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/San_Luis",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Argentina/Rio_Gallegos",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Argentina/Ushuaia",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Aruba",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/La_Paz",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Noronha",
    standard: {
        offset: -120
    }
},
{
    tzId: "America/Belem",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Santarem",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Fortaleza",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Recife",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Araguaina",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Maceio",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Bahia",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Sao_Paulo",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Campo_Grande",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Cuiaba",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Porto_Velho",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Boa_Vista",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Manaus",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Eirunepe",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Rio_Branco",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Santiago",
    standard: {
        offset: -360
    }
},
{
    tzId: "America/Bogota",
    standard: {
        offset: -300
    }
},
{
    tzId: "America/Curacao",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Guayaquil",
    standard: {
        offset: -360
    }
},
{
    tzId: "Atlantic/Stanley",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Cayenne",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Guyana",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Asuncion",
    standard: {
        offset: -240,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 0,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -180,
        mon: 10,
        week: 2,
        wkday: 1,
        hour: 0,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Lima",
    standard: {
        offset: -300
    }
},
{
    tzId: "Atlantic/South_Georgia",
    standard: {
        offset: -120
    }
},
{
    tzId: "America/Paramaribo",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Port_of_Spain",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Montevideo",
    standard: {
        offset: -180
    }
},
{
    tzId: "America/Caracas",
    standard: {
        offset: -210
    }
},
{
    tzId: "Antarctica/Casey",
    standard: {
        offset: 480
    }
},
{
    tzId: "Antarctica/Davis",
    standard: {
        offset: 360
    }
},
{
    tzId: "Antarctica/Macquarie",
    standard: {
        offset: 660
    }
},
{
    tzId: "Indian/Kerguelen",
    standard: {
        offset: 300
    }
},
{
    tzId: "Antarctica/DumontDUrville",
    standard: {
        offset: 600
    }
},
{
    tzId: "Antarctica/Syowa",
    standard: {
        offset: 180
    }
},
{
    tzId: "Antarctica/Vostok",
    standard: {
        offset: 360
    }
},
{
    tzId: "Antarctica/Rothera",
    standard: {
        offset: -180
    }
},
{
    tzId: "Antarctica/Palmer",
    standard: {
        offset: -240
    }
},
{
    tzId: "Antarctica/McMurdo",
    standard: {
        offset: 720
    }
},
{
    tzId: "Asia/Riyadh89",
    standard: {
        offset: 187
    }
},
{
    tzId: "Africa/Algiers",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Luanda",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Porto-Novo",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Gaborone",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Ouagadougou",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Bujumbura",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Douala",
    standard: {
        offset: 60
    }
},
{
    tzId: "Atlantic/Cape_Verde",
    standard: {
        offset: -60
    }
},
{
    tzId: "Africa/Bangui",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Ndjamena",
    standard: {
        offset: 60
    }
},
{
    tzId: "Indian/Comoro",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Kinshasa",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Brazzaville",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Abidjan",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Djibouti",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Cairo",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Malabo",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Asmara",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Addis_Ababa",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Libreville",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Banjul",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Accra",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Conakry",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Bissau",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Nairobi",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Maseru",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Monrovia",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Tripoli",
    standard: {
        offset: 60
    }
},
{
    tzId: "Indian/Antananarivo",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Blantyre",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Bamako",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Nouakchott",
    standard: {
        offset: 0
    }
},
{
    tzId: "Indian/Mauritius",
    standard: {
        offset: 240
    }
},
{
    tzId: "Indian/Mayotte",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Casablanca",
    standard: {
        offset: 0,
        mon: 9,
        week: -1,
        wkday: 1,
        hour: 3,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: 60,
        mon: 4,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Africa/El_Aaiun",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Maputo",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Windhoek",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Niamey",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Lagos",
    standard: {
        offset: 60
    }
},
{
    tzId: "Indian/Reunion",
    standard: {
        offset: 240
    }
},
{
    tzId: "Africa/Kigali",
    standard: {
        offset: 120
    }
},
{
    tzId: "Atlantic/St_Helena",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Sao_Tome",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Dakar",
    standard: {
        offset: 0
    }
},
{
    tzId: "Indian/Mahe",
    standard: {
        offset: 240
    }
},
{
    tzId: "Africa/Freetown",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Mogadishu",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Johannesburg",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Khartoum",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Juba",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Mbabane",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Dar_es_Salaam",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Lome",
    standard: {
        offset: 0
    }
},
{
    tzId: "Africa/Tunis",
    standard: {
        offset: 60
    }
},
{
    tzId: "Africa/Kampala",
    standard: {
        offset: 180
    }
},
{
    tzId: "Africa/Lusaka",
    standard: {
        offset: 120
    }
},
{
    tzId: "Africa/Harare",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/London",
    standard: {
        offset: 0
    }
},
{
    tzId: "WET",
    standard: {
        offset: 0
    }
},
{
    tzId: "Europe/Tirane",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Andorra",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Vienna",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Minsk",
    standard: {
        offset: 180
    }
},
{
    tzId: "Europe/Brussels",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Sofia",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Prague",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Copenhagen",
    standard: {
        offset: 0
    }
},
{
    tzId: "America/Danmarkshavn",
    standard: {
        offset: -240,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -180,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Europe/Tallinn",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Helsinki",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Paris",
    standard: {
        offset: 9
    }
},
{
    tzId: "Europe/Berlin",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Gibraltar",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Athens",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Budapest",
    standard: {
        offset: 60
    }
},
{
    tzId: "Atlantic/Reykjavik",
    standard: {
        offset: 0
    }
},
{
    tzId: "Europe/Rome",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Riga",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Vaduz",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Vilnius",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Luxembourg",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Malta",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Chisinau",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Monaco",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Amsterdam",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Oslo",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Warsaw",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Lisbon",
    standard: {
        offset: 0
    }
},
{
    tzId: "Europe/Bucharest",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Kaliningrad",
    standard: {
        offset: 180
    }
},
{
    tzId: "Europe/Moscow",
    standard: {
        offset: 240
    }
},
{
    tzId: "Europe/Volgograd",
    standard: {
        offset: 240
    }
},
{
    tzId: "Europe/Samara",
    standard: {
        offset: 240
    }
},
{
    tzId: "Asia/Yekaterinburg",
    standard: {
        offset: 360
    }
},
{
    tzId: "Asia/Omsk",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Novosibirsk",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Novokuznetsk",
    standard: {
        offset: 420
    }
},
{
    tzId: "Asia/Krasnoyarsk",
    standard: {
        offset: 480
    }
},
{
    tzId: "Asia/Irkutsk",
    standard: {
        offset: 540
    }
},
{
    tzId: "Asia/Yakutsk",
    standard: {
        offset: 600
    }
},
{
    tzId: "Asia/Vladivostok",
    standard: {
        offset: 660
    }
},
{
    tzId: "Asia/Sakhalin",
    standard: {
        offset: 660
    }
},
{
    tzId: "Asia/Magadan",
    standard: {
        offset: 720
    }
},
{
    tzId: "Asia/Kamchatka",
    standard: {
        offset: 720
    }
},
{
    tzId: "Asia/Anadyr",
    standard: {
        offset: 720
    }
},
{
    tzId: "Europe/Belgrade",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Madrid",
    standard: {
        offset: 0
    }
},
{
    tzId: "Europe/Stockholm",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Zurich",
    standard: {
        offset: 60
    }
},
{
    tzId: "Europe/Istanbul",
    standard: {
        offset: 0
    }
},
{
    tzId: "Europe/Kiev",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Uzhgorod",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Zaporozhye",
    standard: {
        offset: 120
    }
},
{
    tzId: "Europe/Simferopol",
    standard: {
        offset: 120
    }
},
{
    tzId: "EST",
    standard: {
        offset: 0
    }
},
{
    tzId: "America/New_York",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Chicago",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/North_Dakota/Center",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/North_Dakota/New_Salem",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/North_Dakota/Beulah",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Denver",
    standard: {
        offset: -420,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -360,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Los_Angeles",
    standard: {
        offset: -480,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -420,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Juneau",
    standard: {
        offset: -600,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -540,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "Pacific/Honolulu",
    standard: {
        offset: -600
    }
},
{
    tzId: "America/Phoenix",
    standard: {
        offset: -420
    }
},
{
    tzId: "America/Boise",
    standard: {
        offset: -420,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -360,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Indianapolis",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Marengo",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Vincennes",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Tell_City",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Petersburg",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Knox",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Winamac",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Indiana/Vevay",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Kentucky/Louisville",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Kentucky/Monticello",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Detroit",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Menominee",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/St_Johns",
    standard: {
        offset: -150,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -90,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Goose_Bay",
    standard: {
        offset: -240,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -180,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Halifax",
    standard: {
        offset: -240,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -180,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Moncton",
    standard: {
        offset: -240,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -180,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Blanc-Sablon",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Toronto",
    standard: {
        offset: -300
    }
},
{
    tzId: "America/Winnipeg",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Regina",
    standard: {
        offset: -360
    }
},
{
    tzId: "America/Edmonton",
    standard: {
        offset: -420,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -360,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Vancouver",
    standard: {
        offset: -420
    }
},
{
    tzId: "America/Pangnirtung",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Iqaluit",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Resolute",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Rankin_Inlet",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Cambridge_Bay",
    standard: {
        offset: -480,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -420,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Cancun",
    standard: {
        offset: -360,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Merida",
    standard: {
        offset: -360,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Matamoros",
    standard: {
        offset: -360,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Monterrey",
    standard: {
        offset: -360,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Mexico_City",
    standard: {
        offset: -360,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Ojinaga",
    standard: {
        offset: -420,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -360,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Chihuahua",
    standard: {
        offset: -420,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -360,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Hermosillo",
    standard: {
        offset: -420
    }
},
{
    tzId: "America/Mazatlan",
    standard: {
        offset: -420,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -360,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Bahia_Banderas",
    standard: {
        offset: -360,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -300,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Tijuana",
    standard: {
        offset: -480,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -420,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Santa_Isabel",
    standard: {
        offset: -480,
        mon: 10,
        week: -1,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -420,
        mon: 4,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Anguilla",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Antigua",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Nassau",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Barbados",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Belize",
    standard: {
        offset: -360
    }
},
{
    tzId: "Atlantic/Bermuda",
    standard: {
        offset: -240,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -180,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Cayman",
    standard: {
        offset: -300
    }
},
{
    tzId: "America/Costa_Rica",
    standard: {
        offset: -360
    }
},
{
    tzId: "America/Havana",
    standard: {
        offset: -300
    }
},
{
    tzId: "America/Dominica",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Santo_Domingo",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/El_Salvador",
    standard: {
        offset: -360
    }
},
{
    tzId: "America/Grenada",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Guadeloupe",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Guatemala",
    standard: {
        offset: -360
    }
},
{
    tzId: "America/Port-au-Prince",
    standard: {
        offset: -300
    }
},
{
    tzId: "America/Tegucigalpa",
    standard: {
        offset: -360
    }
},
{
    tzId: "America/Jamaica",
    standard: {
        offset: -300
    }
},
{
    tzId: "America/Martinique",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Montserrat",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Managua",
    standard: {
        offset: -360
    }
},
{
    tzId: "America/Panama",
    standard: {
        offset: -300
    }
},
{
    tzId: "America/Puerto_Rico",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/St_Kitts",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/St_Lucia",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Miquelon",
    standard: {
        offset: -180,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -120,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/St_Vincent",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/Grand_Turk",
    standard: {
        offset: -300,
        mon: 11,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    },
    daylight: {
        offset: -240,
        mon: 3,
        week: 2,
        wkday: 1,
        hour: 2,
        min: 0,
        sec: 0
    }
},
{
    tzId: "America/Tortola",
    standard: {
        offset: -240
    }
},
{
    tzId: "America/St_Thomas",
    standard: {
        offset: -240
    }
}
]
}};

_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3000);
TimezoneData = Y.Date.Timezone.__tzoneData;
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3001);
Y.Date.Timezone.__tzoneLinks = {
    "Mideast/Riyadh88": "Asia/Riyadh88",
    "Europe/Nicosia": "Asia/Nicosia",
    "US/Pacific-New": "America/Los_Angeles",
    "GMT": "Etc/GMT",
    "Etc/UTC": "Etc/GMT",
    "Etc/Universal": "Etc/UTC",
    "Etc/Zulu": "Etc/UTC",
    "Etc/Greenwich": "Etc/GMT",
    "Etc/GMT-0": "Etc/GMT",
    "Etc/GMT+0": "Etc/GMT",
    "Etc/GMT0": "Etc/GMT",
    "Mideast/Riyadh87": "Asia/Riyadh87",
    "America/Lower_Princes": "America/Curacao",
    "America/Kralendijk": "America/Curacao",
    "Antarctica/South_Pole": "Antarctica/McMurdo",
    "Mideast/Riyadh89": "Asia/Riyadh89",
    "Africa/Asmera": "Africa/Asmara",
    "Africa/Timbuktu": "Africa/Bamako",
    "America/Argentina/ComodRivadavia": "America/Argentina/Catamarca",
    "America/Atka": "America/Adak",
    "America/Buenos_Aires": "America/Argentina/Buenos_Aires",
    "America/Catamarca": "America/Argentina/Catamarca",
    "America/Coral_Harbour": "America/Atikokan",
    "America/Cordoba": "America/Argentina/Cordoba",
    "America/Ensenada": "America/Tijuana",
    "America/Fort_Wayne": "America/Indiana/Indianapolis",
    "America/Indianapolis": "America/Indiana/Indianapolis",
    "America/Jujuy": "America/Argentina/Jujuy",
    "America/Knox_IN": "America/Indiana/Knox",
    "America/Louisville": "America/Kentucky/Louisville",
    "America/Mendoza": "America/Argentina/Mendoza",
    "America/Porto_Acre": "America/Rio_Branco",
    "America/Rosario": "America/Argentina/Cordoba",
    "America/Virgin": "America/St_Thomas",
    "Asia/Ashkhabad": "Asia/Ashgabat",
    "Asia/Chungking": "Asia/Chongqing",
    "Asia/Dacca": "Asia/Dhaka",
    "Asia/Katmandu": "Asia/Kathmandu",
    "Asia/Calcutta": "Asia/Kolkata",
    "Asia/Macao": "Asia/Macau",
    "Asia/Tel_Aviv": "Asia/Jerusalem",
    "Asia/Saigon": "Asia/Ho_Chi_Minh",
    "Asia/Thimbu": "Asia/Thimphu",
    "Asia/Ujung_Pandang": "Asia/Makassar",
    "Asia/Ulan_Bator": "Asia/Ulaanbaatar",
    "Atlantic/Faeroe": "Atlantic/Faroe",
    "Atlantic/Jan_Mayen": "Europe/Oslo",
    "Australia/ACT": "Australia/Sydney",
    "Australia/Canberra": "Australia/Sydney",
    "Australia/LHI": "Australia/Lord_Howe",
    "Australia/NSW": "Australia/Sydney",
    "Australia/North": "Australia/Darwin",
    "Australia/Queensland": "Australia/Brisbane",
    "Australia/South": "Australia/Adelaide",
    "Australia/Tasmania": "Australia/Hobart",
    "Australia/Victoria": "Australia/Melbourne",
    "Australia/West": "Australia/Perth",
    "Australia/Yancowinna": "Australia/Broken_Hill",
    "Brazil/Acre": "America/Rio_Branco",
    "Brazil/DeNoronha": "America/Noronha",
    "Brazil/East": "America/Sao_Paulo",
    "Brazil/West": "America/Manaus",
    "Canada/Atlantic": "America/Halifax",
    "Canada/Central": "America/Winnipeg",
    "Canada/East-Saskatchewan": "America/Regina",
    "Canada/Eastern": "America/Toronto",
    "Canada/Mountain": "America/Edmonton",
    "Canada/Newfoundland": "America/St_Johns",
    "Canada/Pacific": "America/Vancouver",
    "Canada/Saskatchewan": "America/Regina",
    "Canada/Yukon": "America/Whitehorse",
    "Chile/Continental": "America/Santiago",
    "Chile/EasterIsland": "Pacific/Easter",
    "Cuba": "America/Havana",
    "Egypt": "Africa/Cairo",
    "Eire": "Europe/Dublin",
    "Europe/Belfast": "Europe/London",
    "Europe/Tiraspol": "Europe/Chisinau",
    "GB": "Europe/London",
    "GB-Eire": "Europe/London",
    "GMT+0": "Etc/GMT",
    "GMT-0": "Etc/GMT",
    "GMT0": "Etc/GMT",
    "Greenwich": "Etc/GMT",
    "Hongkong": "Asia/Hong_Kong",
    "Iceland": "Atlantic/Reykjavik",
    "Iran": "Asia/Tehran",
    "Israel": "Asia/Jerusalem",
    "Jamaica": "America/Jamaica",
    "Japan": "Asia/Tokyo",
    "Kwajalein": "Pacific/Kwajalein",
    "Libya": "Africa/Tripoli",
    "Mexico/BajaNorte": "America/Tijuana",
    "Mexico/BajaSur": "America/Mazatlan",
    "Mexico/General": "America/Mexico_City",
    "NZ": "Pacific/Auckland",
    "NZ-CHAT": "Pacific/Chatham",
    "Navajo": "America/Denver",
    "PRC": "Asia/Shanghai",
    "Pacific/Samoa": "Pacific/Pago_Pago",
    "Pacific/Yap": "Pacific/Chuuk",
    "Pacific/Truk": "Pacific/Chuuk",
    "Pacific/Ponape": "Pacific/Pohnpei",
    "Poland": "Europe/Warsaw",
    "Portugal": "Europe/Lisbon",
    "ROC": "Asia/Taipei",
    "ROK": "Asia/Seoul",
    "Singapore": "Asia/Singapore",
    "Turkey": "Europe/Istanbul",
    "UCT": "Etc/UCT",
    "US/Alaska": "America/Anchorage",
    "US/Aleutian": "America/Adak",
    "US/Arizona": "America/Phoenix",
    "US/Central": "America/Chicago",
    "US/East-Indiana": "America/Indiana/Indianapolis",
    "US/Eastern": "America/New_York",
    "US/Hawaii": "Pacific/Honolulu",
    "US/Indiana-Starke": "America/Indiana/Knox",
    "US/Michigan": "America/Detroit",
    "US/Mountain": "America/Denver",
    "US/Pacific": "America/Los_Angeles",
    "US/Samoa": "Pacific/Pago_Pago",
    "UTC": "Etc/UTC",
    "Universal": "Etc/UTC",
    "W-SU": "Europe/Moscow",
    "Zulu": "Etc/UTC",
    "Europe/Mariehamn": "Europe/Helsinki",
    "Europe/Vatican": "Europe/Rome",
    "Europe/San_Marino": "Europe/Rome",
    "Arctic/Longyearbyen": "Europe/Oslo",
    "Europe/Ljubljana": "Europe/Belgrade",
    "Europe/Podgorica": "Europe/Belgrade",
    "Europe/Sarajevo": "Europe/Belgrade",
    "Europe/Skopje": "Europe/Belgrade",
    "Europe/Zagreb": "Europe/Belgrade",
    "Europe/Bratislava": "Europe/Prague",
    "America/Shiprock": "America/Denver",
    "America/St_Barthelemy": "America/Guadeloupe",
    "America/Marigot": "America/Guadeloupe"
};

_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3143);
TimezoneLinks = Y.Date.Timezone.__tzoneLinks;/**
 * Timezone performs operations on a given timezone string represented in Olson tz database
 * This module uses parts of zimbra AjxTimezone to handle time-zones
 * @module datatype-date-timezone
 * @requires datatype-date-format
 */

/**
 * Pad string to specified length
 * @method _zeroPad
 * @for Date
 * @static
 * @private
 * @param {String|Number} s The string or number to be padded
 * @param {Number} length The maximum length s should be padded to have
 * @param {String} [zeroChar='0'] The character to be used to pad the string.
 * @param {Boolean} [rightSide=false] If true, padding will be done from the right-side of the string
 * @return {String} The padded string
 */
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3162);
Y.Date._zeroPad  = function(s, length, zeroChar, rightSide) {
    _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "_zeroPad", 3162);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3163);
s = typeof s === "string" ? s : String(s);

    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3165);
if (s.length >= length) { return s; }

    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3167);
zeroChar = zeroChar || '0';
	
    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3169);
var a = [], i;
    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3170);
for (i = s.length; i < length; i++) {
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3171);
a.push(zeroChar);
    }
    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3173);
a[rightSide ? "unshift" : "push"](s);

    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3175);
return a.join("");
};

/**
 * Class to handle timezones
 * @class __zTimezone
 * @namespace Date
 * @private
 * @constructor
 */
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3185);
Y.Date.__zTimezone = function() {};

_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3187);
AjxTimezone = Y.Date.__zTimezone;

_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3189);
Y.mix(AjxTimezone, {
    /**
     * Get DST trasition date
     * @method getTransition
     * @static
     * @param onset {Object} DST transition information
     * @param year {Number} Year in which transition date is calculated
     * @return {Array} Transition as [year, month, day]
     */
    getTransition: function(onset, year) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getTransition", 3198);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3199);
var trans = [ year || new Date().getFullYear(), onset.mon, 1 ], date, wkday, adjust, last, count;
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3200);
if (onset.mday) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3201);
trans[2] = onset.mday;
        }
        else {_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3203);
if (onset.wkday) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3204);
date = new Date(year, onset.mon - 1, 1, onset.hour, onset.min, onset.sec);

            // last wkday of month
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3207);
if (onset.week === -1) {
                // NOTE: This creates a date of the *last* day of specified month by
                //       setting the month to *next* month and setting day of month
                //       to zero (i.e. the day *before* the first day).
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3211);
last = new Date(new Date(date.getTime()).setMonth(onset.mon, 0));
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3212);
count = last.getDate();
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3213);
wkday = last.getDay() + 1;
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3214);
adjust = wkday >= onset.wkday ? wkday - onset.wkday : 7 - onset.wkday - wkday;
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3215);
trans[2] = count - adjust;
            }

            // Nth wkday of month
            else {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3220);
wkday = date.getDay() + 1;
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3221);
adjust = onset.wkday === wkday ? 1 :0;
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3222);
trans[2] = onset.wkday + 7 * (onset.week - adjust) - wkday + 1;
            }
        }}
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3225);
return trans;
    },

    /**
     * Add dst transition rules with dst information
     * @method addRule
     * @static
     * @param rule {Object} Object containing timezone information
     */
    addRule: function(rule) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "addRule", 3234);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3235);
var tzId = rule.tzId, array;

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3237);
AjxTimezone._SHORT_NAMES[tzId] = AjxTimezone._generateShortName(rule.standard.offset);
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3238);
AjxTimezone._CLIENT2RULE[tzId] = rule;

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3240);
array = rule.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3241);
array.push(rule);
    },

    /**
     * Get dst transition rule
     * @method getRule
     * @static
     * @param tzId {Object} Timezone Id
     * @param tz {Object} Rule object to match against
     * @return {Object} The rule
     */
    getRule: function(tzId, tz) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getRule", 3252);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3253);
var rule = AjxTimezone._CLIENT2RULE[tzId],
            names = [ "standard", "daylight" ],
            rules, i, j, found, name, onset, breakOuter, p;
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3256);
if (!rule && tz) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3257);
rules = tz.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3258);
for (i = 0; i < rules.length; i++) {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3259);
rule = rules[i];

                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3261);
found = true;
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3262);
for (j = 0; j < names.length; j++) {
                    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3263);
name = names[j];
                    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3264);
onset = rule[name];
                    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3265);
if (!onset) { continue; }
			
                    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3267);
breakOuter = false;

                    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3269);
for (p in tz[name]) {
                        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3270);
if (tz[name][p] !== onset[p]) {
                            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3271);
found = false;
                            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3272);
breakOuter = true;
                            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3273);
break;
                        }
                    }

                    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3277);
if(breakOuter){
                        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3278);
break;
                    }
                }
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3281);
if (found) {
                    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3282);
return rule;
                }
            }
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3285);
return null;
        }

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3288);
return rule;
    },

    /**
     * Get offset in minutes from GMT
     * @method getOffset
     * @static
     * @param tzId {String} Timezone ID
     * @param date {Date} Date on which the offset is to be found (offset may differ by date due to DST)
     * @return {Number} Offset in minutes from GMT
     */
    getOffset: function(tzId, date) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getOffset", 3299);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3300);
var rule = AjxTimezone.getRule(tzId), year, standard, stdTrans, dstTrans, month, stdMonth, dstMonth, isDST;
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3301);
if (rule && rule.daylight) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3302);
year = date.getFullYear();

            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3304);
standard = rule.standard, daylight  = rule.daylight;
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3305);
stdTrans = AjxTimezone.getTransition(standard, year);
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3306);
dstTrans = AjxTimezone.getTransition(daylight, year);

            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3308);
month    = date.getMonth()+1, day = date.getDate();
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3309);
stdMonth = stdTrans[1], stdDay = stdTrans[2];
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3310);
dstMonth = dstTrans[1], dstDay = dstTrans[2];

            // northern hemisphere
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3313);
isDST = false;
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3314);
if (dstMonth < stdMonth) {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3315);
isDST = month > dstMonth && month < stdMonth;
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3316);
isDST = isDST || (month === dstMonth && day >= dstDay);
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3317);
isDST = isDST || (month === stdMonth && day <  stdDay);
            }

            // sorthern hemisphere
            else {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3322);
isDST = month < dstMonth || month > stdMonth;
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3323);
isDST = isDST || (month === dstMonth && day <  dstDay);
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3324);
isDST = isDST || (month === stdMonth && day >= stdDay);
            }

            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3327);
return isDST ? daylight.offset : standard.offset;
        }
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3329);
return rule ? rule.standard.offset : -(new Date().getTimezoneOffset());
    },

    /**
     * Compare rules to sort by offset
     * @method _BY_OFFSET
     * @static
     * @private
     * @param arule {Object} Rule to compare
     * @param brule {Object} Rule to compare
     * @return {Number} Difference in offsets between the rules.
               If offsets are equal, returns 1 if timezone id of arule comes first alphabetically, -1 otherwise
     */
    _BY_OFFSET: function(arule, brule) {
        // sort by offset and then by name
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "_BY_OFFSET", 3342);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3344);
var delta = arule.standard.offset - brule.standard.offset,
            aname = arule.tzId,
            bname = brule.tzId;
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3347);
if (delta === 0) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3348);
if (aname < bname) { delta = -1; }
            else {_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3349);
if (aname > bname) { delta = 1; }}
        }
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3351);
return delta;
    },

    _SHORT_NAMES: {},
    _CLIENT2RULE: {},
    /**
     * The data is specified using the server identifiers for historical
     * reasons. Perhaps in the future we'll use the client (i.e. Java)
     * identifiers on the server as well.
     */
    STANDARD_RULES: [],
    DAYLIGHT_RULES: [],

    /**
     * Generate short name for a timezone like +0530 for IST
     * @method _generateShortName
     * @static
     * @private
     * @param offset {Number} Offset in minutes from GMT
     * @param [period=false] {Boolean} If true, a dot is inserted between hours and minutes
     * @return {String} Short name for timezone
     */
    _generateShortName: function(offset, period) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "_generateShortName", 3373);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3374);
if (offset === 0) { return ""; }
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3375);
var sign = offset < 0 ? "-" : "+",
            stdOffset = Math.abs(offset),
            hours = Math.floor(stdOffset / 60),
            minutes = stdOffset % 60;

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3380);
hours = hours < 10 ? '0' + hours : hours;
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3381);
minutes = minutes < 10 ? '0' + minutes : minutes;
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3382);
return [sign,hours,period?".":"",minutes].join("");
    },

    /**
     * Initialized timezone rules. Only for internal use.
     * @method _initTimezoneRules
     * @static
     * @private
     */
    _initTimezoneRules: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "_initTimezoneRules", 3391);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3392);
var rule, i, j, array;

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3394);
for (i = 0; i < TimezoneData.TIMEZONE_RULES.length; i++) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3395);
rule = TimezoneData.TIMEZONE_RULES[i];
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3396);
array = rule.daylight ? AjxTimezone.DAYLIGHT_RULES : AjxTimezone.STANDARD_RULES;
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3397);
array.push(rule);
        }

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3400);
TimezoneData.TIMEZONE_RULES.sort(AjxTimezone._BY_OFFSET);
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3401);
for (j = 0; j < TimezoneData.TIMEZONE_RULES.length; j++) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3402);
rule = TimezoneData.TIMEZONE_RULES[j];
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3403);
AjxTimezone.addRule(rule);
        }
    },

    /**
     * Get timezone ids matching raw offset
     * @method getCurrentTimezoneIds
     * @static
     * @param rawOffset {Number} Offset in seconds from GMT
     * @return {Array} timezone ids having the specified offset
     */
    getCurrentTimezoneIds: function(rawOffset) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getCurrentTimezoneIds", 3414);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3415);
rawOffset = rawOffset/60;	//Need offset in minutes

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3417);
var result = [],
            today = new Date(),
            tzId, link;

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3421);
for(tzId in AjxTimezone._CLIENT2RULE) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3422);
if(rawOffset === 0 || AjxTimezone.getOffset(tzId, today) === rawOffset) {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3423);
result.push(tzId);
            }
        }

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3427);
for(link in TimezoneLinks) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3428);
if(Y.Array.indexOf(result,TimezoneLinks[link]) !== -1) {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3429);
result.push(link);
            }
        }
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3432);
return result;
    },

    /**
     * Get the first timezone matching rawOffset
     * @method getTimezoneIdForOffset
     * @static
     * @param rawOffset {Number} offset in seconds from GMT
     * @return {String} tzId of timezone that matches the offset. Returns empty string if no matches found
     */
    getTimezoneIdForOffset: function(rawOffset) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getTimezoneIdForOffset", 3442);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3443);
rawOffset = rawOffset/60;	//Need offset in minutes

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3445);
var etcGMTId = "Etc/GMT",
            today = new Date(),
            tzId;
        
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3449);
if(rawOffset % 60 === 0) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3450);
if(rawOffset !== 0) {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3451);
etcGMTId += (rawOffset > 0? "-": "+") + rawOffset/60;
            }

            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3454);
if(AjxTimezone._CLIENT2RULE[etcGMTId] !== undefined) {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3455);
return etcGMTId;
            }
        }
	
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3459);
for(tzId in AjxTimezone._CLIENT2RULE) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3460);
if(AjxTimezone.getOffset(tzId, today) === rawOffset) {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3461);
return tzId;
            }
        }

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3465);
return "";
    },

    /**
     * Check whether DST is active at specified date
     * @method isDST
     * @static
     * @param tzId {String} Timezone ID
     * @param date {Date}
     * @return {Number} 1 if DST is active, 0 if not, and -1 if specified timezone does not observe DST
     */
    isDST: function(tzId, date) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "isDST", 3476);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3477);
var rule = AjxTimezone.getRule(tzId),
            year,
            standard, daylight,
            stdTrans, dstTrans,
            month, day,
            stdMonth, stdDay,
            dstMonth, dstDay,
            isDSTActive;
            
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3486);
if (rule && rule.daylight) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3487);
year = date.getFullYear();

            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3489);
standard = rule.standard, daylight  = rule.daylight;
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3490);
stdTrans = AjxTimezone.getTransition(standard, year);
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3491);
dstTrans = AjxTimezone.getTransition(daylight, year);

            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3493);
month    = date.getMonth()+1, day = date.getDate();
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3494);
stdMonth = stdTrans[1], stdDay = stdTrans[2];
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3495);
dstMonth = dstTrans[1], dstDay = dstTrans[2];

            // northern hemisphere
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3498);
isDSTActive = false;
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3499);
if (dstMonth < stdMonth) {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3500);
isDSTActive = month > dstMonth && month < stdMonth;
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3501);
isDSTActive = isDSTActive || (month === dstMonth && day >= dstDay);
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3502);
isDSTActive = isDSTActive || (month === stdMonth && day <  stdDay);
            }

            // sorthern hemisphere
            else {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3507);
isDSTActive = month < dstMonth || month > stdMonth;
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3508);
isDSTActive = isDSTActive || (month === dstMonth && day <  dstDay);
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3509);
isDSTActive = isDSTActive || (month === stdMonth && day >= stdDay);
            }

            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3512);
return isDSTActive? 1:0;
        }
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3514);
return -1;
    },

    /**
     * Check whether tzId is a valid timezone
     * @method isValidTimezoneId
     * @static
     * @param tzId {String} Timezone ID
     * @return {Boolean} true if tzId is valid, false otherwise
     */
    isValidTimezoneId: function(tzId) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "isValidTimezoneId", 3524);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3525);
return (AjxTimezone._CLIENT2RULE[tzId] !== undefined || TimezoneLinks[tzId] !== undefined);
    }
});

_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3529);
Y.mix(AjxTimezone.prototype, {

    /**
     * Get short name of timezone
     * @method getShortName
     * @param tzId {String} Timezone ID
     * @return {String}
     */
    getShortName: function(tzId) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getShortName", 3537);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3538);
var shortName = ["GMT",AjxTimezone._SHORT_NAMES[tzId]].join("");
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3539);
return shortName;
    },

    /**
     * Get medium length name of timezone
     * @method getMediumName
     * @param tzId {String} Timezone ID
     * @return {String}
     */
    getMediumName: function(tzId) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getMediumName", 3548);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3549);
var mediumName = ['(',this.getShortName(tzId),') ',tzId].join("");
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3550);
return mediumName;
    },

    /**
     * Get long name of timezone
     * @method getLongName
     * @param tzId {String} Timezone Id
     * @return {String}
     */
    getLongName: AjxTimezone.prototype.getMediumName
});

_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3562);
AjxTimezone._initTimezoneRules();

/**
 * Timezone performs operations on a given timezone string represented in Olson tz database
 * @class Timezone
 * @constructor
 * @param {String} tzId TimeZone ID as in Olson tz database
 */
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3570);
Y.Date.Timezone = function(tzId) {
    _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "Timezone", 3570);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3571);
var normalizedId = Timezone.getNormalizedTimezoneId(tzId);
    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3572);
if(normalizedId === "") {
	_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3573);
Y.error("Could not find timezone: " + tzId);
    }
    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3575);
this.tzId = normalizedId;

    _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3577);
this._ajxTimeZoneInstance = new AjxTimezone();
};

_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3580);
Y.namespace("Date");
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3581);
Timezone = Y.Date.Timezone;

_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3583);
Y.mix(Timezone, {
    /**
     * Get Day of Year(0-365) for the date passed
     * @method _getDOY
     * @private
     * @static
     * @param {Date} date
     * @return {Number} Day of Year
     */
    _getDOY: function (date) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "_getDOY", 3592);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3593);
var oneJan = new Date(date.getFullYear(),0,1);
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3594);
return Math.ceil((date - oneJan) / 86400000);
    },

    /**
     * Get integer part of floating point argument
     * @method _floatToInt
     * @static
     * @private
     * @param floatNum {Number} A real number
     * @return {Number} Integer part of floatNum
     */
    _floatToInt: function (floatNum) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "_floatToInt", 3605);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3606);
return (floatNum < 0) ? Math.ceil(floatNum) : Math.floor(floatNum);
    },

    /**
     * Returns list of timezone Id's that have the same rawOffSet as passed in
     * @method getCurrentTimezoneIds
     * @static
     * @param {Number} rawOffset Raw offset (in seconds) from GMT.
     * @return {Array} array of timezone Id's that match rawOffset passed in to the API.
     */
    getCurrentTimezoneIds: function(rawOffset) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getCurrentTimezoneIds", 3616);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3617);
return AjxTimezone.getCurrentTimezoneIds(rawOffset);
    },

    /**
     * Given a raw offset in seconds, get the tz database ID that reflects the given raw offset, or empty string if there is no such ID.
     * Where available, the function will return an ID starting with "Etc/GMT".
     * For offsets where no such ID exists but that are used by actual time zones, the ID of one of those time zones is returned.
     * Note that the offset shown in an "Etc/GMT" ID is opposite to the value of rawOffset
     * @method getTimezoneIdForOffset
     * @static
     * @param {Number} rawOffset Offset from GMT in seconds
     * @return {String} timezone id
     */
    getTimezoneIdForOffset: function(rawOffset) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getTimezoneIdForOffset", 3630);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3631);
return AjxTimezone.getTimezoneIdForOffset(rawOffset);
    },

    /**
     * Given a wall time reference, convert it to UNIX time - seconds since Epoch
     * @method getUnixTimeFromWallTime
     * @static
     * @param {Object} walltime Walltime that needs conversion. Missing properties will be treat as 0.
     * @return {Number} UNIX time - time in seconds since Epoch
     */
    getUnixTimeFromWallTime: function(walltime) {
        /*
         * Initialize any missing properties.
         */
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getUnixTimeFromWallTime", 3641);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3645);
if(!Y.Lang.isValue( walltime.year )) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3646);
walltime.year = new Date().getFullYear();	//Default to current year
        }
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3648);
if(!Y.Lang.isValue( walltime.mon )) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3649);
walltime.mon = 0;				//Default to January
        }
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3651);
if(!Y.Lang.isValue( walltime.mday )) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3652);
walltime.mday = 1;				//Default to first of month
        }
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3654);
if(!Y.Lang.isValue( walltime.hour )) {			//Default to 12 midnight
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3655);
walltime.hour = 0;
        }
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3657);
if(!Y.Lang.isValue( walltime.min )) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3658);
walltime.min = 0;
        }
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3660);
if(!Y.Lang.isValue( walltime.sec )) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3661);
walltime.sec = 0;
        }
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3663);
if(!Y.Lang.isValue( walltime.gmtoff )) {			//Default to UTC
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3664);
walltime.gmtoff = 0;
        }

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3667);
var utcTime = Date.UTC(walltime.year, walltime.mon, walltime.mday, walltime.hour, walltime.min, walltime.sec);
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3668);
utcTime -= walltime.gmtoff*1000;

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3670);
return Timezone._floatToInt(utcTime/1000);	//Unix time: count from midnight Jan 1 1970 UTC
    },

    /**
     * Checks if the timestamp passed in is a valid timestamp for this timezone and offset.
     * @method isValidTimestamp
     * @static
     * @param {String} timeStamp Time value in UTC RFC3339 format - yyyy-mm-ddThh:mm:ssZ or yyyy-mm-ddThh:mm:ss+/-HH:MM
     * @param {Number} rawOffset An offset from UTC in seconds.
     * @return {Boolean} true if valid timestamp, false otherwise
     */
    isValidTimestamp: function(timeStamp, rawOffset) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "isValidTimestamp", 3681);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3682);
var regex = /^(\d\d\d\d)\-([0-1][0-9])\-([0-3][0-9])([T ])([0-2][0-9]):([0-6][0-9]):([0-6][0-9])(Z|[+\-][0-1][0-9]:[0-3][0-9])?$/,
            matches = (new RegExp(regex)).exec(timeStamp),
            year, month, day, hours, minutes, seconds, tZone,
            m31, maxDays,
            dateTimeSeparator, offset;

        //No match
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3689);
if(matches === null) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3690);
return false;
        }

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3693);
year = parseInt(matches[1], 10),
        month = parseInt(matches[2], 10),
        day = parseInt(matches[3], 10),
        dateTimeSeparator = matches[4],
        hours = parseInt(matches[5], 10),
        minutes = parseInt(matches[6], 10),
        seconds = parseInt(matches[7], 10),
        tZone = matches[8];
        //Month should be in 1-12
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3702);
if(month < 1 || month > 12) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3703);
return false;
        }

        //Months with 31 days
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3707);
m31 = [1,3,5,7,8,10,12];
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3708);
maxDays = 30;
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3709);
if(Y.Array.indexOf(m31,month) !== -1) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3710);
maxDays = 31;
        } else {_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3711);
if(month === 2) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3712);
if(year % 400 === 0) {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3713);
maxDays = 29;
            } else {_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3714);
if(year % 100 === 0) {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3715);
maxDays = 28;
            } else {_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3716);
if(year % 4 === 0) {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3717);
maxDays = 29;
            } else {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3719);
maxDays = 28;
            }}}
        }}

        //Day should be valid day for month
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3724);
if(day < 1 || day > maxDays) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3725);
return false;
        }

        //Hours should be in 0-23
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3729);
if(hours < 0 || hours > 23) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3730);
return false;
        }

        //Minutes and Seconds should in 0-59
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3734);
if(minutes < 0 || minutes > 59 || seconds < 0 || seconds > 59) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3735);
return false;
        }

        //Now verify timezone
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3739);
if(dateTimeSeparator === " " && tZone === undefined) {
            //SQL Format
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3741);
return true;
        } else {_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3742);
if(dateTimeSeparator === "T" && tZone !== undefined) {
            //RFC3339 Format
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3744);
offset = 0;
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3745);
if(tZone !== "Z") {
                //Not UTC TimeZone
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3747);
offset = parseInt(tZone.substr(1,3), 10)*60 + parseInt(tZone.substr(4), 10);
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3748);
offset = offset*60;	//To seconds

                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3750);
offset = offset * (tZone.charAt(0) === "+" ? 1 : -1);
            }
            //Check offset in timeStamp with passed rawOffset
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3753);
if(offset === rawOffset) {
                _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3754);
return true;
            }
        }}

        //If reached here, wrong format
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3759);
return false;
    },

    /**
     * Checks if tzId passed in is a valid Timezone id in tz database.
     * @method isValidTimezoneId
     * @static
     * @param {String} tzId timezoneId to be checked for validity
     * @return {Boolean} true if tzId is a valid timezone id in tz database.
               tzId could be a "zone" id or a "link" id to be a valid tz Id. False otherwise
     */
    isValidTimezoneId: function(tzId) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "isValidTimezoneId", 3770);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3771);
return AjxTimezone.isValidTimezoneId(tzId);
    },

    /**
     * Returns the normalized version of the time zone ID, or empty string if tzId is not a valid time zone ID.
     * If tzId is a link Id, the standard name will be returned.
     * @method getNormalizedTimezoneId
     * @static
     * @param {String} tzId The timezone ID whose normalized form is requested.
     * @return {String} The normalized version of the timezone Id, or empty string if tzId is not a valid time zone Id.
     */
    getNormalizedTimezoneId: function(tzId) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getNormalizedTimezoneId", 3782);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3783);
if(!Timezone.isValidTimezoneId(tzId)) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3784);
return "";
        }
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3786);
var normalizedId,
            next = tzId;

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3789);
do {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3790);
normalizedId = next;
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3791);
next = TimezoneLinks[normalizedId];
        }while( next !== undefined );

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3794);
return normalizedId;
    }
});

_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3798);
Y.mix(Timezone.prototype, {
    /**
     * Parse RFC3339 date format and return the Date
     * Format: yyyy-mm-ddThh:mm:ssZ
     * @method _parseRFC3339
     * @private
     * @param {String} dString The date string to be parsed
     * @return {Date} The date represented by dString
     */
    _parseRFC3339: function(dString){
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "_parseRFC3339", 3807);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3808);
var regexp = /(\d+)(\-)?(\d+)(\-)?(\d+)(T)?(\d+)(:)?(\d+)(:)?(\d+)(\.\d+)?(Z|([+\-])(\d+)(:)?(\d+))/,
            result = new Date(),
            d = dString.match(regexp),
            offset = 0;

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3813);
result.setUTCDate(1);
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3814);
result.setUTCFullYear(parseInt(d[1],10));
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3815);
result.setUTCMonth(parseInt(d[3],10) - 1);
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3816);
result.setUTCDate(parseInt(d[5],10));
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3817);
result.setUTCHours(parseInt(d[7],10));
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3818);
result.setUTCMinutes(parseInt(d[9],10));
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3819);
result.setUTCSeconds(parseInt(d[11],10));
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3820);
if (d[12]) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3821);
result.setUTCMilliseconds(parseFloat(d[12]) * 1000);
        } else {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3823);
result.setUTCMilliseconds(0);
        }
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3825);
if (d[13] !== 'Z') {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3826);
offset = (d[15] * 60) + parseInt(d[17],10);
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3827);
offset *= ((d[14] === '-') ? -1 : 1);
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3828);
result.setTime(result.getTime() - offset * 60 * 1000);
        }
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3830);
return result;
    },

    /**
     * Parse SQL date format and return the Date
     * Format: yyyy-mm-dd hh:mm:ss
     * @method _parseSQLFormat
     * @private
     * @param {String} dString The date string to be parsed
     * @return {Date} The date represented by dString
     */
    _parseSQLFormat: function(dString) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "_parseSQLFormat", 3841);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3842);
var dateTime = dString.split(" "),
            date = dateTime[0].split("-"),
            time = dateTime[1].split(":"),
            offset = AjxTimezone.getOffset(this.tzId, new Date(date[0], date[1] - 1, date[2]));
            
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3847);
return new Date(Date.UTC(date[0], date[1] - 1, date[2], time[0], time[1], time[2]) - offset*60*1000);
    },

    /**
     * Return a short name for the timezone
     * @method getShortName
     * @return {String} Short name
     */
    getShortName: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getShortName", 3855);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3856);
return this._ajxTimeZoneInstance.getShortName(this.tzId);
    },

    /**
     * Return a medium length name for the timezone
     * @method getMediumName
     * @return {String} Medium length name
     */
    getMediumName: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getMediumName", 3864);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3865);
return this._ajxTimeZoneInstance.getMediumName(this.tzId);
    },

    /**
     * Return a long name for the timezone
     * @method getLongName
     * @return {String} Long name
     */
    getLongName: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getLongName", 3873);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3874);
return this._ajxTimeZoneInstance.getLongName(this.tzId);
    },

    /**
     * Given a timevalue representation in RFC 3339 or SQL format, convert to UNIX time - seconds since Epoch ie., since 1970-01-01T00:00:00Z
     * @method convertToIncrementalUTC
     * @param {String} timeValue TimeValue representation in RFC 3339 or SQL format.
     * @return {Number} UNIX time - time in seconds since Epoch
     */
    convertToIncrementalUTC: function(timeValue) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "convertToIncrementalUTC", 3883);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3884);
if(Y.Array.indexOf(timeValue,"T") !== -1) {
            //RFC3339
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3886);
return this._parseRFC3339(timeValue).getTime() / 1000;
        } else {
            //SQL
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3889);
return this._parseSQLFormat(timeValue).getTime() / 1000;
        }
    },

    /**
     * Given UNIX time - seconds since Epoch ie., 1970-01-01T00:00:00Z, convert the timevalue to RFC3339 format - "yyyy-mm-ddThh:mm:ssZ"
     * @method convertUTCToRFC3339Format
     * @param {Number} timeValue time value in seconds since Epoch.
     * @return {String} RFC3339 format timevalue - "yyyy-mm-ddThh:mm:ssZ"
     */
    convertUTCToRFC3339Format: function(timeValue) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "convertUTCToRFC3339Format", 3899);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3900);
var uTime = new Date(timeValue * 1000),
            offset = AjxTimezone.getOffset(this.tzId, uTime),
            offsetString = "Z",
            rfc3339, offsetSign;

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3905);
if(offset !== 0) {
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3906);
offsetSign = (offset > 0 ? "+": "-");
            _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3907);
offsetString = offsetSign + Y.Date._zeroPad(Math.abs(Timezone._floatToInt(offset/60)), 2) + ":" + Y.Date._zeroPad(offset % 60, 2);
        }

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3910);
uTime.setTime(timeValue*1000 + offset*60*1000);

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3912);
rfc3339 = Y.Date._zeroPad(uTime.getUTCFullYear(), 4) + "-"
                      + Y.Date._zeroPad((uTime.getUTCMonth() + 1), 2) + "-" + Y.Date._zeroPad(uTime.getUTCDate(), 2)
                      + "T" + Y.Date._zeroPad(uTime.getUTCHours(), 2) + ":" + Y.Date._zeroPad(uTime.getUTCMinutes(), 2)
                      + ":" + Y.Date._zeroPad(uTime.getUTCSeconds(), 2) + offsetString;

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3917);
return rfc3339;
    },

    /**
     * Given UNIX Time - seconds since Epoch ie., 1970-01-01T00:00:00Z, convert the timevalue to SQL Format - "yyyy-mm-dd hh:mm:ss"
     * @method convertUTCToSQLFormat
     * @param {Number} timeValue time value in seconds since Epoch.
     * @return {String} SQL Format timevalue - "yyyy-mm-dd hh:mm:ss"
     */
    convertUTCToSQLFormat: function(timeValue) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "convertUTCToSQLFormat", 3926);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3927);
var uTime = new Date(timeValue * 1000),
            offset = AjxTimezone.getOffset(this.tzId, uTime),
            sqlDate;
            
        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3931);
uTime.setTime(timeValue*1000 + offset*60*1000);

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3933);
sqlDate = Y.Date._zeroPad(uTime.getUTCFullYear(), 4) + "-" + Y.Date._zeroPad((uTime.getUTCMonth() + 1), 2)
                      + "-" + Y.Date._zeroPad(uTime.getUTCDate(), 2) + " " + Y.Date._zeroPad(uTime.getUTCHours(), 2)
                      + ":" + Y.Date._zeroPad(uTime.getUTCMinutes(), 2) + ":" + Y.Date._zeroPad(uTime.getUTCSeconds(), 2);

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3937);
return sqlDate;
    },

    /**
     * Gets the offset of this timezone in seconds from UTC
     * @method getRawOffset
     * @return {Number} offset of this timezone in seconds from UTC
     */
    getRawOffset: function() {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getRawOffset", 3945);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3946);
return AjxTimezone.getOffset(this.tzId, new Date()) * 60;
    },

    /**
     * Given a unix time, convert it to wall time for this timezone.
     * @method getWallTimeFromUnixTime
     * @param {Number} timeValue value in seconds from Epoch.
     * @return {Object} an object with the properties: sec, min, hour, mday, mon, year, wday, yday, isdst, gmtoff, zone.
           All of these are integers except for zone, which is a string. isdst is 1 if DST is active, and 0 if DST is inactive.
     */
    getWallTimeFromUnixTime: function(timeValue) {
        _yuitest_coverfunc("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", "getWallTimeFromUnixTime", 3956);
_yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3957);
var offset = AjxTimezone.getOffset(this.tzId, new Date(timeValue*1000)) * 60,
            localTimeValue = timeValue + offset,
            date = new Date(localTimeValue*1000),
            walltime = {
                sec: date.getUTCSeconds(),
                min: date.getUTCMinutes(),
                hour: date.getUTCHours(),
                mday: date.getUTCDate(),
                mon: date.getUTCMonth(),
                year: date.getUTCFullYear(),
                wday: date.getUTCDay(),
                yday: Timezone._getDOY(date),
                isdst: AjxTimezone.isDST(this.tzId, new Date(timeValue)),
                gmtoff: offset,
                zone: this.tzId
            };

        _yuitest_coverline("build/gallery-advanced-date-timezone/gallery-advanced-date-timezone.js", 3974);
return walltime;
    }
});


}, '@VERSION@', {"requires": ["datatype-date-format"]});
