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
_yuitest_coverage["build/gallery-list-format/gallery-list-format.js"] = {
    lines: {},
    functions: {},
    coveredLines: 0,
    calledLines: 0,
    coveredFunctions: 0,
    calledFunctions: 0,
    path: "build/gallery-list-format/gallery-list-format.js",
    code: []
};
_yuitest_coverage["build/gallery-list-format/gallery-list-format.js"].code=["YUI.add('gallery-list-format', function (Y, NAME) {","","var MODULE_NAME = \"gallery-list-format\",","    ListFormatter;","","/**"," * ListFormatter formats lists with locale dependent rules."," * For example, in locale en, lists are formatted into a"," * string of comma-separated values"," * @class ListFormatter"," * @namespace Intl"," * @static"," */","ListFormatter = {","    /**","     * Substitute items into corrrect positions in pattern","     * For internal use only","     * @method __sub","     * @private","     * @static","     * @param pattern {String} The pattern","     * @param item0 {String} item to replace {0} in pattern","     * @param item1 {String} item to replace {1} in pattern","     * @return {String} Result string after substitutions","     */","    __sub: function(pattern, item0, item1) {","         return pattern.replace(\"{0}\", item0).replace(\"{1}\", item1);","    },","","    /**","     * Format list into string","     * @method format","     * @static","     * @param list {Array} The list to be formatted","     * @return {String} formatted result","     */","    format: function(list) {","         if(!Y.Lang.isArray(list)) { return \"\"; }","        ","         var localeData = Y.Intl.get(MODULE_NAME),","             middle = localeData.listPatternMiddle || \"{0}, {1}\",","             start = localeData.listPatternStart || middle,","             end = localeData.listPatternEnd,","             two = localeData.listPatternTwo || end,","             len = list.length,","             result, i;","","         if(len === 0) { return \"\"; }","         if(len === 1) { return list[0]; }","         if(len === 2) {","             return ListFormatter.__sub(two, list[0], list[1]);","         }","","         result = ListFormatter.__sub(start, list[0], list[1]);","         for(i=2; i<len-1; i++) {","              result = ListFormatter.__sub(middle, result, list[i]);","         }","         result = ListFormatter.__sub(end, result, list[i]);","","         return result;","    }","};","","Y.Intl.ListFormatter = ListFormatter;","","","}, '@VERSION@', {","    \"lang\": [","        \"af\",","        \"am\",","        \"ar\",","        \"as\",","        \"az\",","        \"be\",","        \"bg\",","        \"bn\",","        \"bo\",","        \"ca\",","        \"cs\",","        \"cy\",","        \"da\",","        \"de\",","        \"el\",","        \"eo\",","        \"es\",","        \"et\",","        \"eu\",","        \"fa\",","        \"fi\",","        \"fil\",","        \"fo\",","        \"fr\",","        \"ga\",","        \"gl\",","        \"gsw\",","        \"gu\",","        \"gv\",","        \"ha\",","        \"haw\",","        \"he\",","        \"hi\",","        \"hr\",","        \"hu\",","        \"hy\",","        \"id\",","        \"ii\",","        \"in\",","        \"is\",","        \"it\",","        \"iw\",","        \"ja\",","        \"\",","        \"ka\",","        \"kk\",","        \"kl\",","        \"km\",","        \"kn\",","        \"ko\",","        \"kok\",","        \"kw\",","        \"lt\",","        \"lv\",","        \"mk\",","        \"ml\",","        \"mr\",","        \"ms\",","        \"mt\",","        \"nb\",","        \"ne\",","        \"nl\",","        \"nn\",","        \"no\",","        \"om\",","        \"or\",","        \"pa\",","        \"pl\",","        \"ps\",","        \"pt\",","        \"ro\",","        \"ru\",","        \"sh\",","        \"si\",","        \"sk\",","        \"sl\",","        \"so\",","        \"sq\",","        \"sr\",","        \"sr-Latn\",","        \"sr-ME\",","        \"sv\",","        \"sw\",","        \"ta\",","        \"te\",","        \"th\",","        \"ti\",","        \"tl\",","        \"tr\",","        \"uk\",","        \"ur\",","        \"uz\",","        \"vi\",","        \"zh\",","        \"zu\"","    ]","});"];
_yuitest_coverage["build/gallery-list-format/gallery-list-format.js"].lines = {"1":0,"3":0,"14":0,"27":0,"38":0,"40":0,"48":0,"49":0,"50":0,"51":0,"54":0,"55":0,"56":0,"58":0,"60":0,"64":0};
_yuitest_coverage["build/gallery-list-format/gallery-list-format.js"].functions = {"__sub:26":0,"format:37":0,"(anonymous 1):1":0};
_yuitest_coverage["build/gallery-list-format/gallery-list-format.js"].coveredLines = 16;
_yuitest_coverage["build/gallery-list-format/gallery-list-format.js"].coveredFunctions = 3;
_yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 1);
YUI.add('gallery-list-format', function (Y, NAME) {

_yuitest_coverfunc("build/gallery-list-format/gallery-list-format.js", "(anonymous 1)", 1);
_yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 3);
var MODULE_NAME = "gallery-list-format",
    ListFormatter;

/**
 * ListFormatter formats lists with locale dependent rules.
 * For example, in locale en, lists are formatted into a
 * string of comma-separated values
 * @class ListFormatter
 * @namespace Intl
 * @static
 */
_yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 14);
ListFormatter = {
    /**
     * Substitute items into corrrect positions in pattern
     * For internal use only
     * @method __sub
     * @private
     * @static
     * @param pattern {String} The pattern
     * @param item0 {String} item to replace {0} in pattern
     * @param item1 {String} item to replace {1} in pattern
     * @return {String} Result string after substitutions
     */
    __sub: function(pattern, item0, item1) {
         _yuitest_coverfunc("build/gallery-list-format/gallery-list-format.js", "__sub", 26);
_yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 27);
return pattern.replace("{0}", item0).replace("{1}", item1);
    },

    /**
     * Format list into string
     * @method format
     * @static
     * @param list {Array} The list to be formatted
     * @return {String} formatted result
     */
    format: function(list) {
         _yuitest_coverfunc("build/gallery-list-format/gallery-list-format.js", "format", 37);
_yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 38);
if(!Y.Lang.isArray(list)) { return ""; }
        
         _yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 40);
var localeData = Y.Intl.get(MODULE_NAME),
             middle = localeData.listPatternMiddle || "{0}, {1}",
             start = localeData.listPatternStart || middle,
             end = localeData.listPatternEnd,
             two = localeData.listPatternTwo || end,
             len = list.length,
             result, i;

         _yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 48);
if(len === 0) { return ""; }
         _yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 49);
if(len === 1) { return list[0]; }
         _yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 50);
if(len === 2) {
             _yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 51);
return ListFormatter.__sub(two, list[0], list[1]);
         }

         _yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 54);
result = ListFormatter.__sub(start, list[0], list[1]);
         _yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 55);
for(i=2; i<len-1; i++) {
              _yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 56);
result = ListFormatter.__sub(middle, result, list[i]);
         }
         _yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 58);
result = ListFormatter.__sub(end, result, list[i]);

         _yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 60);
return result;
    }
};

_yuitest_coverline("build/gallery-list-format/gallery-list-format.js", 64);
Y.Intl.ListFormatter = ListFormatter;


}, '@VERSION@', {
    "lang": [
        "af",
        "am",
        "ar",
        "as",
        "az",
        "be",
        "bg",
        "bn",
        "bo",
        "ca",
        "cs",
        "cy",
        "da",
        "de",
        "el",
        "eo",
        "es",
        "et",
        "eu",
        "fa",
        "fi",
        "fil",
        "fo",
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
        "it",
        "iw",
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
        "ms",
        "mt",
        "nb",
        "ne",
        "nl",
        "nn",
        "no",
        "om",
        "or",
        "pa",
        "pl",
        "ps",
        "pt",
        "ro",
        "ru",
        "sh",
        "si",
        "sk",
        "sl",
        "so",
        "sq",
        "sr",
        "sr-Latn",
        "sr-ME",
        "sv",
        "sw",
        "ta",
        "te",
        "th",
        "ti",
        "tl",
        "tr",
        "uk",
        "ur",
        "uz",
        "vi",
        "zh",
        "zu"
    ]
});
