YUI.add("gallery-message-format",function(e,t){var n="gallery-message-format",r,i,s,o,u,a,f,l,c,h,p,d;e.Intl.MsgBaseFormatter=function(e){this.values=e},s=e.Intl.MsgBaseFormatter,e.mix(s.prototype,{getValue:function(t){return e.Lang.isArray(this.values)&&(t=parseInt(t,10)),this.values[t]},getParams:function(e){if(!e||!e.key)return!1;var t=this.getValue(e.key);return t!==undefined?(e.value=t,!0):!1},format:function(){e.error("Not implemented")}}),e.mix(s,{createInstance:function(){e.error("Not implemented")},getCurrentTimeZone:function(){if(e.Date===undefined||e.Date.Timezone===undefined)return"GMT";var t=(new Date).getTimezoneOffset()*-60;return e.Date.Timezone.getTimezoneIdForOffset(t)}}),e.Intl.StringFormatter=function(e){o.superclass.constructor.call(this,e),this.regex="{\\s*([a-zA-Z0-9_]+)\\s*}"},o=e.Intl.StringFormatter,e.extend(o,s),o.createInstance=function(e){return new o(e)},e.mix(o.prototype,{getParams:function(e,t){if(t&&t[1]){e.key=t[1];if(s.prototype.getParams.call(this,e))return!0}return!1},format:function(e){var t=new RegExp(this.regex,"gm"),n=null,r;while(n=t.exec(e))r={},this.getParams(r,n)&&(e=e.replace(n[0],r.value));return e}},!0),e.Intl.DateFormatter=function(e){u.superclass.constructor.call(this,e),this.styles={"short":[512,0,0],medium:[256,0,0],"long":[128,0,0],full:[1,0,0]},this.regex="{\\s*([a-zA-Z0-9_]+)\\s*,\\s*date\\s*(,\\s*(\\w+)\\s*)?}"},u=e.Intl.DateFormatter,e.extend(u,s),u.createInstance=function(e){return new u(e)},e.mix(u.prototype,{getParams:function(e,t){return t&&(t[1]&&(e.key=t[1]),t[3]&&(e.style=t[3])),e.style||(e.style="medium"),this.styles[e.style]?e.key&&s.prototype.getParams.call(this,e)?!0:!1:!1},format:function(t,n){if(e.Date===undefined||!e.Date.__advancedFormat)return t;var r=new RegExp(this.regex,"gm"),i=null,o,u,a;while(i=r.exec(t))o={},this.getParams(o,i)&&(u=this.styles[o.style],a=e.Date.format(new Date(o.value),{timezone:n.timezone||s.getCurrentTimeZone(),dateFormat:u[0],timeFormat:u[1],timezoneFormat:u[2]}),t=t.replace(i[0],a));return t}},!0),e.Intl.TimeFormatter=function(e){a.superclass.constructor.call(this,e),this.styles={"short":[0,2,0],medium:[0,1,0],"long":[0,1,2],full:[0,1,1]},this.regex="{\\s*([a-zA-Z0-9_]+)\\s*,\\s*time\\s*(,\\s*(\\w+)\\s*)?}"},a=e.Intl.TimeFormatter,e.extend(a,u),a.createInstance=function(e){return new a(e)},e.Intl.NumberFormatter=function(e){f.superclass.constructor.call(this,e),this.styles={integer:4,percent:8,currency:1},this.regex="{\\s*([a-zA-Z0-9_]+)\\s*,\\s*number\\s*(,\\s*(\\w+)\\s*)?}"},f=e.Intl.NumberFormatter,e.extend(f,s),f.createInstance=function(e){return new f(e)},e.mix(f.prototype,{getParams:function(e,t){return t&&(t[1]&&(e.key=t[1]),t[3]&&(e.style=t[3])),e.style||(e.style="integer",e.showDecimal=!0),this.styles[e.style]?e.key&&s.prototype.getParams.call(this,e)?!0:!1:!1},format:function(t){if(e.Number===undefined||!e.Number.__advancedFormat)return t;var n=new RegExp(this.regex,"gm"),r=null,i,s;while(r=n.exec(t))i={},this.getParams(i,r)&&(s={style:this.styles[i.style]},i.style==="integer"&&!i.showDecimal&&(s.parseIntegerOnly=!0),t=t.replace(r[0],e.Number.format(i.value,s)));return t}},!0),e.Intl.SelectFormatter=function(e){l.superclass.constructor.call(this,e),this.regex="{\\s*([a-zA-Z0-9_]+)\\s*,\\s*select\\s*,\\s*"},l=e.Intl.SelectFormatter,e.extend(l,s),l.createInstance=function(e){return new l(e)},e.mix(l.prototype,{getParams:function(e,t){return t&&t[1]&&(e.key=t[1]),e.key&&s.prototype.getParams.call(this,e)?!0:!1},parseOptions:function(e,t){var n={},r="",i="",s="",o,u;for(o=t;o<e.length;o++){u=e.charAt(o);if(u==="\\")s+=u+e.charAt(o+1),o++;else if(u==="}"){if(s===""){o++;break}i=s,n[r.trim()]=i,s=r=i=""}else u==="{"?(r=s,s=""):s+=u}return s!==""?null:{options:n,next:o}},select:function(e,t){for(var n in e){if(n==="other")continue;if(n===t.value)return e[n]}return e.other},format:function(e){var t=new RegExp(this.regex,"gm"),n=null,r,i,s,o;while(n=t.exec(e)){r={};if(this.getParams(r,n)){i=this.parseOptions(e,t.lastIndex);if(!i)continue;t.lastIndex=i.next,i=i.options,s=this.select(i,r),s&&(o=e.indexOf(n[0]),e=e.slice(0,o)+s+e.slice(t.lastIndex))}}return e}},!0),e.Intl.PluralRules={_inRange:function(e,t,n){return e>=t&&e<=n},_matchRule:function(e){for(var t in e)if(e[t])return t;return"other"},rules:{set1:function(e){var t=e%100;return r._matchRule({few:i(t,3,10),many:i(t,11,99),one:e===1,two:e===2,zero:e===0})},set2:function(e){return r._matchRule({many:e!==0&&e%10===0,one:e===1,two:e===2})},set3:function(e){return r._matchRule({one:e===1})},set4:function(e){return r._matchRule({one:i(e,0,1)})},set5:function(e){return r._matchRule({one:i(e,0,2)&&e!==2})},set6:function(e){return r._matchRule({one:e%10===1&&e%100!==11,zero:e===0})},set7:function(e){return r._matchRule({one:e===1,two:e===2})},set8:function(e){return r._matchRule({few:i(e,3,6),many:i(e,7,10),one:e===1,two:e===2})},set9:function(e){return r._matchRule({few:e===0||e!==1&&i(e%100,1,19),one:e===1})},set10:function(e){var t=e%10,n=e%100;return r._matchRule({few:i(t,2,9)&&!i(n,11,19),one:t===1&&!i(n,11,19)})},set11:function(e){var t=e%10,n=e%100;return r._matchRule({few:i(t,2,4)&&!i(n,12,14),many:t===0||i(t,5,9)||i(n,11,14),one:t===1&&n!==11})},set12:function(e){return r._matchRule({few:i(e,2,4),one:e===1})},set13:function(e){var t=e%10,n=e%100;return r._matchRule({few:i(t,2,4)&&!i(n,12,14),many:e!==1&&i(t,0,1)||i(t,5,9)||i(n,12,14),one:e===1})},set14:function(e){var t=e%100;return r._matchRule({few:i(t,3,4),one:t===1,two:t===2})},set15:function(e){var t=e%100;return r._matchRule({few:e===0||i(t,2,10),many:i(t,11,19),one:e===1})},set16:function(e){return r._matchRule({one:e%10===1&&e!==11})},set17:function(e){return r._matchRule({few:e===3,many:e===6,one:e===1,two:e===2,zero:e===0})},set18:function(e){return r._matchRule({one:i(e,0,2)&&e!==0&&e!==2,zero:e===0})},set19:function(e){return r._matchRule({few:i(e,2,10),one:i(e,0,1)})},set20:function(e){var t=e%10,n=e%100,s=e%1e6;return r._matchRule({few:(i(t,3,4)||t===9)&&!i(n,10,19)&&!
i(n,70,79)&&!i(n,90,99),many:e!==0&&s===0,one:t===1&&n!==11&&n!==71&&n!==91,two:t===2&&n!==12&&n!==72&&n!==92})},set21:function(e){return r._matchRule({one:e===1,zero:e===0})},set22:function(e){return r._matchRule({one:i(e,0,1)||i(e,11,99)})},set23:function(e){return r._matchRule({one:i(e%10,1,2)||e%20===0})},set24:function(e){return r._matchRule({few:i(e,3,10)||i(e,13,19),one:e===1||e===11,two:e===2||e===12})},set25:function(e){return r._matchRule({one:e===1||e===5})},set26:function(e){var t=e%10,n=e%100;return r._matchRule({one:(t===1||t===2)&&n!==11&&n!==12})},set27:function(e){var t=e%10,n=e%100;return r._matchRule({few:t===3&&n!==13,one:t===1&&n!==11,two:t===2&&n!==12})},set28:function(e){return r._matchRule({many:e===11||e===8||e===80||e===800})},set29:function(e){return r._matchRule({few:e===4,one:e===1||e===3,two:e===2})},set30:function(e){return r._matchRule({few:e===4,one:e===1,two:e===2||e===3})},set31:function(e){return r._matchRule({few:e===4,many:e===6,one:e===1,two:e===2||e===3})},set32:function(t){return r._matchRule({few:t===4,many:t===6,one:e.Array.indexOf([1,5,7,8,9,10],t)>-1,two:t===2||t===3})},set33:function(e){return r._matchRule({few:i(e,2,9),many:i(e,10,19)||i(e,100,199)||i(e,1e3,1999),one:e===1})}}},r=e.Intl.PluralRules,i=r._inRange,e.Intl.PluralFormatter=function(t){c.superclass.constructor.call(this,t),this.regex="{\\s*([a-zA-Z0-9_]+)\\s*,\\s*plural\\s*,\\s*";var i=e.Intl.get(n),s=i.pluralRule;s&&(this.rule=r.rules[s]),this.rule===undefined&&(this.rule=function(){return"other"})},c=e.Intl.PluralFormatter,e.extend(c,l),c.createInstance=function(e){return new c(e)},c.prototype.select=function(e,t){var n=this.rule(t.value),r=e[n];if(r===undefined||r===null)r=e.other;return r=r.replace("#",(new f({VAL:t.value})).format("{VAL, number, integer}")),r},e.Intl.ChoiceFormatter=function(e){h.superclass.constructor.call(this,e),this.regex="{\\s*([a-zA-Z0-9_]+)\\s*,\\s*choice\\s*,\\s*(.+)}"},h=e.Intl.ChoiceFormatter,e.extend(h,l),h.createInstance=function(e){return new h(e)},e.mix(h.prototype,{parseOptions:function(e){var t=[],n=e.split("|"),r,i,s,o,u,a,f;for(r=0;r<n.length;r++){s=n[r],o=["#","<","\u2264"];for(i=0;i<o.length;i++){u=o[i];if(s.indexOf(u)!==-1){a=s.split(u),f={value:parseInt(a[0],10),result:a[1],relation:u},t.push(f);break}}}return t},getParams:function(e,t){return l.prototype.getParams.call(this,e,t)&&t[2]?(e.choices=this.parseOptions(t[2]),e.choices===[]?!1:!0):!1},select:function(e){var t,n,r,i,s;for(s=0;s<e.choices.length;s++){t=e.choices[s],n=t.value,r=t.result,i=t.relation;if(i==="#"&&n===e.value||i==="<"&&n<e.value||i==="\u2264"&&n<=e.value)return r}return""},format:function(e){var t=new RegExp(this.regex,"gm"),n=null,r,i;while(n=t.exec(e))r={},this.getParams(r,n)&&(i=this.select(r),i&&(e=e.replace(n[0],i)));return e}},!0),e.Intl.MsgListFormatter=function(e){p.superclass.constructor.call(this,e),this.regex="{\\s*([a-zA-Z0-9_]+)\\s*,\\s*list\\s*}"},p=e.Intl.MsgListFormatter,e.extend(p,o),p.createInstance=function(e){return new p(e)},e.mix(p.prototype,{format:function(t){if(e.Intl===undefined||e.Intl.ListFormatter===undefined||e.Intl.ListFormatter.format===undefined)return t;var n=new RegExp(this.regex,"gm"),r=null,i;while(r=n.exec(t))i={},this.getParams(i,r)&&(t=t.replace(r[0],e.Intl.ListFormatter.format(i.value)));return t}},!0),d=[o,u,a,f,h,c,l,p],e.mix(e.Intl,{formatMessage:function(e,t,n){n=n||{};var r,i;for(r=0;r<d.length;r++)i=d[r].createInstance(t),e=i.format(e,n);return e}})},"@VERSION@",{lang:["am","ar","be","cs","cy","fil","fr","ga","gv","he","hi","hr","","kw","lt","lv","mk","mt","pl","ro","ru","sh","sk","sl","sr","ti","tl","uk"],requires:["intl"]});
