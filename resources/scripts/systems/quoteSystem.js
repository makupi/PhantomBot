(function(){function e(e,s){var t=$.inidb.GetKeyList("quotes","").length;$.inidb.set("quotes",t,JSON.stringify([e,s,$.systemTime()]));return t}function s(e){var s,t=[],i;if($.inidb.exists("quotes",e)){$.inidb.del("quotes",e);s=$.inidb.GetKeyList("quotes","");for(i in s){t.push($.inidb.get("quotes",s[i]));$.inidb.del("quotes",s[i])}for(i in t){$.inidb.set("quotes",i,t[i])}return t.length?t.length:0}else{return-1}}function t(e){if(!e||isNaN(e)){e=$.rand($.inidb.GetKeyList("quotes","").length-1)}if($.inidb.exists("quotes",e)){return JSON.parse($.inidb.get("quotes",e))}else{return[]}}$.bind("command",function(i){var n=i.getSender(),o=i.getCommand(),u=i.getArgs(),a;if(o.equalsIgnoreCase("addquote")){if(u.length<2){$.say($.whisperPrefix(n)+$.lang.get("quotesystem.add.usage"));return}var r=(u[0]+"").toLowerCase();a=u.splice(1).join(" ");$.say($.lang.get("quotesystem.add.success",r,e(r,a)))}if(o.equalsIgnoreCase("delquote")){if(!u[0]||isNaN(u[0])){$.say($.whisperPrefix(n)+$.lang.get("quotesystem.del.usage"));return}var d;if(d=s(u[0])<0){$.say($.whisperPrefix(n)+$.lang.get("quotesystem.del.success",u[0],d))}else{$.say($.whisperPrefix(n)+$.lang.get("quotesystem.del.404",u[0]))}}if(o.equalsIgnoreCase("quote")){a=t(u[0]);if(a.length>0){$.say($.lang.get("quotesystem.get.success",a[1],$.resolveRank(a[0]),$.dateToString(new Date(parseInt(a[2])))))}else{$.say($.whisperPrefix(n)+$.lang.get("quotesystem.get.404",typeof u[0]!="undefined"?u[0]:""))}}});$.bind("initReady",function(){if($.bot.isModuleEnabled("./systems/quoteSystem.js")){$.registerChatCommand("./systems/quoteSystem.js","addquote",2);$.registerChatCommand("./systems/quoteSystem.js","delquote",2);$.registerChatCommand("./systems/quoteSystem.js","quote")}})})();