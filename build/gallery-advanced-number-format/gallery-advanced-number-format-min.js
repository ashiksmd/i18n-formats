YUI.add("gallery-advanced-number-format",function(e,t){var n="gallery-advanced-number-format",r=e.Intl.Common.BaseFormat,i,s;e.Number.__advancedFormat=!0,e.Number.__zNumberFormat=function(e,t,n){var s,o,u,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S,x;if(arguments.length===0)return;i.superclass.constructor.call(this,e,t);if(!e)return;e==="{plural_style}"&&(e=this.Formats.currencyFormat.replace("\u00a4",""),this._isPluralCurrency=!0,this._pattern=e),this.currency=this.Formats.defaultCurrency;if(this.currency===undefined||!this.currency)this.currency="USD";s=e.split(/;/),e=s[0],this._useGrouping=e.indexOf(",")!==-1,this._parseIntegerOnly=e.indexOf(".")===-1,this._useGrouping&&(o=e.match(/[0#,]+/),u=new RegExp("[0#]+","g"),a=o[0].match(u),f=a.length-2,this._primaryGrouping=a[f+1].length,this._secondaryGrouping=f>0?a[f].length:a[f+1].length),f=0,l=this.__parseStatic(e,f),f=l.offset,c=l.text!=="",c&&this._segments.push(new r.TextSegment(this,l.text)),h=f;while(f<e.length&&i._META_CHARS.indexOf(e.charAt(f))!==-1)f++;p=f,d=e.substring(h,p),v=d.indexOf(this.Formats.exponentialSymbol),m=v!==-1?d.substring(v+1):null,m&&(d=d.substring(0,v),this._showExponent=!0),g=d.indexOf("."),y=g!==-1?d.substring(0,g):d,y&&(y=y.replace(/[^#0]/g,""),b=y.indexOf("0"),b!==-1&&(this._minIntDigits=y.length-b),this._maxIntDigits=y.length),w=g!==-1?d.substring(g+1):null,w&&(b=w.lastIndexOf("0"),b!==-1&&(this._minFracDigits=b+1),this._maxFracDigits=w.replace(/[^#0]/g,"").length),this._segments.push(new i.NumberSegment(this,d)),l=this.__parseStatic(e,f),f=l.offset,l.text!==""&&this._segments.push(new r.TextSegment(this,l.text));if(n)return;s.length>1?(e=s[1],this._negativeFormatter=new i(e,t,!0)):(E=new i("",t),E._segments=E._segments.concat(this._segments),S=c?1:0,x=new r.TextSegment(E,this.Formats.minusSign),E._segments.splice(S,0,x),this._negativeFormatter=E)},i=e.Number.__zNumberFormat,e.extend(i,r),e.mix(i,{_NUMBER:"number",_INTEGER:"integer",_CURRENCY:"currency",_PERCENT:"percent",_META_CHARS:"0#.,E"}),e.mix(i.prototype,{_groupingOffset:Number.MAX_VALUE,_minIntDigits:1,_isCurrency:!1,_isPercent:!1,_isPerMille:!1,_showExponent:!1,format:function(e){if(e<0&&this._negativeFormatter)return this._negativeFormatter.format(e);var t=r.prototype.format.call(this,e),n="";return this._isPluralCurrency&&(e===1?(n=this.Formats.currencyPatternSingular,n=n.replace("{1}",this.Formats[this.currency+"_currencySingular"])):(n=this.Formats.currencyPatternPlural,n=n.replace("{1}",this.Formats[this.currency+"_currencyPlural"])),t=n.replace("{0}",t)),t},parse:function(t,n){var i,s,o;if(t.indexOf(this.Formats.minusSign)!==-1&&this._negativeFormatter)return this._negativeFormatter.parse(t,n);this._isPluralCurrency&&(i=this.Formats[this.currency+"_currencySingular"],s=this.Formats[this.currency+"_currencyPlural"],t=e.Lang.trim(t.replace(s,"").replace(i,""))),o=null;try{o=r.prototype.parse.call(this,t,n),o=o.value}catch(u){e.error("Failed to parse: "+t,u)}return o},__parseStatic:function(e,t){var n=[],r,s,o;while(t<e.length){r=e.charAt(t++);if(i._META_CHARS.indexOf(r)!==-1){t--;break}switch(r){case"'":s=t;while(t<e.length&&e.charAt(t)!=="'")t++;o=t,r=o-s===0?"'":e.substring(s,o);break;case"%":r=this.Formats.percentSign,this._isPercent=!0;break;case"\u2030":r=this.Formats.perMilleSign,this._isPerMille=!0;break;case"\u00a4":e.charAt(t)==="\u00a4"?(r=this.currency,t++):r=this.Formats[this.currency+"_currencySymbol"],this._isCurrency=!0}n.push(r)}return{text:n.join(""),offset:t}},_createParseObject:function(){return{value:null}}},!0),i.NumberSegment=function(e,t){if(e===null&&t===null)return;i.NumberSegment.superclass.constructor.call(this,e,t)},e.extend(i.NumberSegment,r.Segment),e.mix(i.NumberSegment.prototype,{format:function(e){var t,n,r;return isNaN(e)?this._parent.Formats.nanSymbol:e===Number.NEGATIVE_INFINITY||e===Number.POSITIVE_INFINITY?this._parent.Formats.infinitySign:(typeof e!="number"&&(e=Number(e)),e=Math.abs(e),this._parent._isPercent?e*=100:this._parent._isPerMille&&(e*=1e3),this._parent._parseIntegerOnly&&(e=Math.floor(e)),t=this._parent.Formats.exponentialSymbol,n=new RegExp(t+"+"),r=this._parent._showExponent?e.toExponential(this._parent._maxFracDigits).toUpperCase().replace(n,t):e.toFixed(this._parent._maxFracDigits||0),r=this._normalize(r),r)},_normalize:function(t){var n=this._parent.Formats.exponentialSymbol,r=new RegExp("[\\."+n+"]"),i=t.split(r),s=i.shift(),o=[],u=this._parent._primaryGrouping,a="0",f=this._parent.Formats.decimalSeparator,l,c;s.length<this._parent._minIntDigits&&(s=e.Intl.Common.zeroPad(s,this._parent._minIntDigits,this._parent.Formats.numberZero));if(s.length>this._parent._primaryGrouping&&this._parent._useGrouping){c=s.length-u;while(c>0)o.unshift(s.substr(c,u)),o.unshift(this._parent.Formats.groupingSeparator),u=this._parent._secondaryGrouping,c-=u;o.unshift(s.substring(0,c+u)),s=o.join("")}if(t.match(/\./))a=i.shift();else if(t.match(/\e/)||t.match(/\E/))l=i.shift();return o=[s],this._parent._parseIntegerOnly||(a=a.replace(/0+$/,""),a.length<this._parent._minFracDigits&&(a=e.Intl.Common.zeroPad(a,this._parent._minFracDigits,this._parent.Formats.numberZero,!0)),a.length>0&&o.push(f,a)),l&&o.push(n,l.replace(/^\+/,"")),o.join("")},parse:function(t,n,r){var i=this._parent.Formats.groupingSeparator,s=this._parent.Formats.decimalSeparator,o=this._parent.Formats.minusSign,u=this._parent.Formats.exponentialSymbol,a="[\\"+o+"0-9"+i+"]+",f,l,c,h,p=null,d,v=this._parent._secondaryGrouping||this._parent._primaryGrouping;this._parent._parseIntegerOnly||(a+="(\\"+s+"[0-9]+)?"),this._parent._showExponent&&(a+="("+u+"\\+?[0-9]+)"),f=new RegExp(a),l=n.match(f),l||e.error("Error parsing: Number does not match pattern"),c=n.indexOf(o)!==-1,h=r+l[0].length,n=n.slice(r,h);if(this._parent.showExponent)p=n.split(u);else if(this._parent._useGrouping){this._parent._primaryGrouping||e.error("Error parsing: Invalid pattern"),d=n.length-this._parent._primaryGrouping-1,l[1]&&(d-=l[1].length),d>0&&(n.charAt(d)!==","&&e.error("Error parsing: Number does not match pattern"
),n=n.slice(0,d)+n.slice(d+1)),d=d-v-1;while(d>0)n.charAt(d)!==","&&e.error("Error parsing: Number does not match pattern"),n=n.slice(0,d)+n.slice(d+1),d=d-v-1;n.indexOf(i)!==-1&&e.error("Error parsing: Number does not match pattern")}return p?t.value=parseFloat(p[0],10)*Math.pow(10,parseFloat(p[1],10)):t.value=parseFloat(n,10),c&&(t.value*=-1),this._parent._isPercent?t.value/=100:this._parent._isPerMille&&(t.value/=1e3),h}},!0),e.Number.__YNumberFormat=function(t){t=t||e.Number.STYLES.NUMBER_STYLE,this.style=t;var r="",s=e.Intl.get(n);switch(t){case e.Number.STYLES.CURRENCY_STYLE:r=s.currencyFormat;break;case e.Number.STYLES.ISO_CURRENCY_STYLE:r=s.currencyFormat,r=r.replace("\u00a4","\u00a4\u00a4");break;case e.Number.STYLES.NUMBER_STYLE:r=s.decimalFormat;break;case e.Number.STYLES.PERCENT_STYLE:r=s.percentFormat;break;case e.Number.STYLES.PLURAL_CURRENCY_STYLE:r="{plural_style}";break;case e.Number.STYLES.SCIENTIFIC_STYLE:r=s.scientificFormat}this._numberFormatInstance=new i(r,s)},s=e.Number.__YNumberFormat,e.mix(e.Number,{STYLES:{CURRENCY_STYLE:1,ISO_CURRENCY_STYLE:2,NUMBER_STYLE:4,PERCENT_STYLE:8,PLURAL_CURRENCY_STYLE:16,SCIENTIFIC_STYLE:32}}),e.mix(s.prototype,{format:function(e){return this._numberFormatInstance.format(e)},isParseIntegerOnly:function(){return this._numberFormatInstance._parseIntegerOnly},parse:function(e,t){return this._numberFormatInstance.parse(e,t)},setParseIntegerOnly:function(e){this._numberFormatInstance._parseIntegerOnly=e},getCurrency:function(){return this._numberFormatInstance.currency},setCurrency:function(e){this._numberFormatInstance.currency=e},isCurrencyStyle:function(){var t=e.Number.STYLES;return this.style===t.CURRENCY_STYLE||this.style===t.ISO_CURRENCY_STYLE||this.style===t.PLURAL_CURRENCY_STYLE}}),e.mix(e.Number,{_oldFormat:e.Number.format,_oldParse:e.Number.parse}),e.mix(e.Number,{format:function(t,n){n=n||{};if(n.prefix!==undefined||n.decimalPlaces!==undefined||n.decimalSeparator!==undefined||n.thousandsSeparator!==undefined||n.suffix!==undefined)return e.Number._oldFormat(t,n);e.Lang.isString(n.style)&&(n.style=e.Number.STYLES[n.style]);if(e.Number.formatEcma&&n.style!==e.Number.STYLES.SCIENTIFIC_STYLE)return e.Number.formatEcma(t,n);var r=new s(n.style);return n.parseIntegerOnly&&r.setParseIntegerOnly(!0),r.isCurrencyStyle()&&n.currency!==undefined&&r.setCurrency(n.currency),r.format(t)},parse:function(e,t){var n=new s(t.style);return n.parse(e,t.parsePosition)}},!0),e.namespace("Parsers").number=e.Number.parse},"@VERSION@",{lang:["af","af-NA","af-ZA","am-ET","am","ar-AE","ar-BH","ar-DZ","ar-EG","ar-IQ","ar-JO","ar","ar-KW","ar-LB","ar-LY","ar-MA","ar-OM","ar-QA","ar-SA","ar-SD","ar-SY","ar-TN","ar-YE","as-IN","as","az-AZ","az-Cyrl-AZ","az-Cyrl","az","az-Latn-AZ","be-BY","be","bg-BG","bg","bn-BD","bn-IN","bn","bo-CN","bo-IN","bo","ca-ES","ca","cs-CZ","cs","cy-GB","cy","da-DK","da","de-AT","de-BE","de-CH","de-DE","de","de-LI","de-LU","el-CY","el-GR","el","en-AU","en-BE","en-BW","en-BZ","en-CA","en-GB","en-HK","en-IE","en-IN","en-JM","en-JO","en-MH","en-MT","en-MY","en-NA","en-NZ","en-PH","en-PK","en-RH","en-SG","en-TT","en-US","en-US-POSIX","en-VI","en-ZA","en-ZW","eo","es-AR","es-BO","es-CL","es-CO","es-CR","es-DO","es-EC","es-ES","es-GT","es-HN","es","es-MX","es-NI","es-PA","es-PE","es-PR","es-PY","es-SV","es-US","es-UY","es-VE","et-EE","et","eu-ES","eu","fa-AF","fa-IR","fa","fi-FI","fi","fil","fil-PH","fo-FO","fo","fr-BE","fr-CA","fr-CH","fr-FR","fr","fr-LU","fr-MC","fr-SN","ga-IE","ga","gl-ES","gl","gsw-CH","gsw","gu-IN","gu","gv-GB","gv","ha-GH","ha","ha-Latn-GH","ha-Latn-NE","ha-Latn-NG","ha-NE","ha-NG","haw","haw-US","he-IL","he","hi-IN","hi","hr-HR","hr","hu-HU","hu","hy-AM","hy","id-ID","id","ii-CN","ii","in-ID","in","is-IS","is","it-CH","it-IT","it","iw-IL","iw","ja-JP","ja-JP-TRADITIONAL","ja","","ka-GE","ka","kk-Cyrl-KZ","kk","kk-KZ","kl-GL","kl","km","km-KH","kn-IN","kn","ko","kok-IN","kok","ko-KR","kw-GB","kw","lt","lt-LT","lv","lv-LV","mk","mk-MK","ml-IN","ml","mr-IN","mr","ms-BN","ms","ms-MY","mt","mt-MT","nb","nb-NO","ne-IN","ne","ne-NP","nl-BE","nl","nl-NL","nn","nn-NO","no","no-NO","om-ET","om","om-KE","or-IN","or","pa-Arab","pa-Arab-PK","pa-Guru-IN","pa-IN","pa","pa-PK","pl","pl-PL","ps-AF","ps","pt-BR","pt","pt-PT","ro","ro-MD","ro-RO","ru","ru-RU","ru-UA","sh-BA","sh-CS","sh","sh-YU","si","si-LK","sk","sk-SK","sl","sl-SI","so-DJ","so-ET","so","so-KE","so-SO","sq-AL","sq","sr-BA","sr-CS","sr-Cyrl-BA","sr-Cyrl-CS","sr-Cyrl-ME","sr-Cyrl-RS","sr-Cyrl-YU","sr","sr-Latn-BA","sr-Latn-CS","sr-Latn-ME","sr-Latn-RS","sr-Latn-YU","sr-ME","sr-RS","sr-YU","sv-FI","sv","sv-SE","sw","sw-KE","sw-TZ","ta-IN","ta","te-IN","te","th","th-TH","ti-ER","ti-ET","ti","tl","tl-PH","tr","tr-TR","uk","uk-UA","ur-IN","ur","ur-PK","uz-AF","uz-Arab-AF","uz-Arab","uz-Cyrl-UZ","uz","uz-Latn","uz-Latn-UZ","uz-UZ","vi","vi-VN","zh-CN","zh-Hans-CN","zh-Hans-HK","zh-Hans-MO","zh-Hans-SG","zh-Hant-HK","zh-Hant","zh-Hant-MO","zh-Hant-TW","zh-HK","zh","zh-MO","zh-SG","zh-TW","zu","zu-ZA"],requires:["gallery-i18n-common","datatype-number-format","datatype-number-parse"]});
