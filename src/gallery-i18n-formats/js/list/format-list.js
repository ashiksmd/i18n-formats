ListFormatter = {
    __sub: function(pattern, item0, item1) {
         return pattern.replace("{0}", item0).replace("{1}", item1);
    },

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
             return ListFormatter.__sub(two, list[0], list[1]);
         }

         result = ListFormatter.__sub(start, list[0], list[1]);
         for(i=2; i<len-1; i++) {
              result = ListFormatter.__sub(middle, result, list[i]);
         }
         result = ListFormatter.__sub(end, result, list[i]);

         return result;
    }
};

Y.Intl.ListFormatter = ListFormatter;
