(function(){function e(e){var n=$.inidb.GetKeyList(e,""),t=[],o;for(o in n){t.push({username:n[o],value:$.inidb.get(e,n[o])})}t.sort(function(e,n){return n.value-e.value});return t.splice(0,5)}$.bind("command",function(n){var t=n.getCommand(),o=[],a=1,i,m;if(t.equalsIgnoreCase("top5")){i=e("points");for(m in i){o.push(a+". "+$.resolveRank(i[m].username+" "+$.getPointsString(i[m].value)));a++}$.say($.lang.get("top5.default",$.pointNameMultiple,o.join(", ")))}if(t.equalsIgnoreCase("top5time")){i=e("time");for(m in i){o.push(a+". "+$.resolveRank(i[m].username+" "+$.getTimeString(i[m].value,true)));a++}$.say($.lang.get("top5.default","time",o.join(", ")))}});$.bind("initReady",function(){if($.bot.isModuleEnabled("./commands/topCommand.js")){$.registerChatCommand("./commands/topCommand.js","top5",7);$.registerChatCommand("./commands/topCommand.js","top5time",7)}})})();