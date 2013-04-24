YUI.add("gallery-i18n-common",function(e,t){var n;e.namespace("Intl.Common"),e.Intl.Common.BaseFormat=function(t,n){if(!t&&!n)return;e.mix(this,{_pattern:t,_segments:[],Formats:n})},n=e.Intl.Common.BaseFormat,e.mix(n.prototype,{format:function(e){var t=[],n=0;for(;n<this._segments.length;n++)t.push(this._segments[n].format(e));return t.join("")},parse:function(t,n){var r=this._createParseObject(),i=n||0,s=0;for(;s<this._segments.length;s++)i=this._segments[s].parse(r,t,i);return i<t.length&&e.error("Parse Error: Input too long"),r}}),n.Segment=function(e,t){if(!e&&!t)return;this._parent=e,this._s=t},e.mix(n.Segment.prototype,{format:function(){return this._s},getFormat:function(){return this._parent}}),e.mix(n.Segment,{_parseLiteral:function(t,n,r){n.length-r<t.length&&e.error("Parse Error: Input too short");for(var i=0;i<t.length;i++)t.charAt(i)!==n.charAt(r+i)&&e.error("Parse Error: Input does not match");return r+t.length},_parseInt:function(t,n,r,i,s,o,u){var a=o||i.length-s,f=s,l=0,c,h,p;for(;l<a;l++)if(!i.charAt(s++).match(/\d/)){s--;break}return c=s,f===c&&e.error("Error parsing number. Number not present"),o&&c-f!==o&&e.error("Error parsing number. Number too short"),h=parseInt(i.substring(f,c),u||10),n&&(p=t||e.config.win,typeof n=="function"?n.call(p,h+r):p[n]=h+r),c}}),n.TextSegment=function(e,t){if(!e&&!t)return;n.TextSegment.superclass.constructor.call(this,e,t)},e.extend(n.TextSegment,n.Segment),e.mix(n.TextSegment.prototype,{parse:function(e,t,r){return n.Segment._parseLiteral(this._s,t,r)}},!0),e.Intl.Common.zeroPad=function(e,t,n,r){e=typeof e=="string"?e:String(e);if(e.length>=t)return e;n=n||"0";var i=[],s;for(s=e.length;s<t;s++)i.push(n);return i[r?"unshift":"push"](e),i.join("")}},"@VERSION@",{requires:["intl"]});