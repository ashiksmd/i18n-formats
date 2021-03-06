/**
 * list-format formats lists with locale dependent rules.
 * @module gallery-list-format
 */
var MODULE_NAME = "gallery-list-format";

Y.namespace("Array");

Y.mix(Y.Array, {
    /**
     * Substitute items into correct positions in pattern
     * For internal use only
     * @method __sub
     * @for Array
     * @private
     * @static
     * @param pattern {String} The pattern
     * @param item0 {String} item to replace {0} in pattern
     * @param item1 {String} item to replace {1} in pattern
     * @return {String} Result string after substitutions
     */
    __sub: function(pattern, item0, item1) {
         return pattern.replace("{0}", item0).replace("{1}", item1);
    },

    /**
     * Format list into string
     * @method format
     * @for Array
     * @static
     * @param list {Array} The list to be formatted
     * @return {String} formatted result
     */
    format: function(list) {
         if(!Y.Lang.isArray(list)) { return ""; }
        
         var localeData = Y.Intl.get(MODULE_NAME),
             middle = localeData.listPatternMiddle || "{0}, {1}",
             start = localeData.listPatternStart || middle,
             end = localeData.listPatternEnd,
             two = localeData.listPatternTwo || end,
             len = list.length,
             result, i;

         if(len === 0) { return ""; }
         if(len === 1) { return list[0]; }
         if(len === 2) {
             return Y.Array.__sub(two, list[0], list[1]);
         }

         result = Y.Array.__sub(start, list[0], list[1]);
         for(i=2; i<len-1; i++) {
              result = Y.Array.__sub(middle, result, list[i]);
         }
         result = Y.Array.__sub(end, result, list[i]);

         return result;
    }
});
