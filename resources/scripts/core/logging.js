(function(){var e=$.getIniDbBoolean("settings","loggingEnabled",true);function n(e){var n=e?new Date(e):new Date,o=function(e){return e<10?"0"+e:e};return o(n.getDate())+"-"+o(n.getMonth()+1)+"-"+n.getFullYear()}function o(e){if(e){return new Date(e).toLocaleTimeString("en-GB").replace(" ","_")}else{return(new Date).toTimeString()}}function i(i,s,t){if(!$.bot.isModuleEnabled("./core/fileSystem.js")||!e||t&&t.equalsIgnoreCase($.botName)||s.equalsIgnoreCase(".mods")){return}if(!$.isDirectory("./logs/"+i)){$.mkDir("./logs/"+i)}$.writeToFile(o()+" > "+s,"./logs/"+i+"/"+n()+".txt",true)}function s(o,i,s){if(!$.bot.isModuleEnabled("./core/fileSystem.js")||!e){return}if(!$.isDirectory("./logs/event")){$.mkDir("./logs/event")}var t=new Date;$.writeToFile(t.toDateString()+" "+t.toTimeString()+"["+o+"#"+i+"] "+s,"./logs/event/"+n()+".txt",true)}function t(o,i,s){if(!$.bot.isModuleEnabled("./core/fileSystem.js")||!e){return}if(!$.isDirectory("./logs/error")){$.mkDir("./logs/error")}var t=new Date;$.writeToFile(t.toDateString()+" "+t.toTimeString()+"["+o+"#"+i+"] "+s,"./logs/error/"+n()+".txt",true)}$.bind("ircChannelMessage",function(e){$.log("chat",""+e.getSender()+": "+e.getMessage())});$.bind("ircPrivateMessage",function(e){var n=e.getSender().toLowerCase(),o=e.getMessage();if(o.toLowerCase().indexOf("moderators if this room")==-1){$.log("privMsg",$.username.resolve(n)+": "+o,n)}$.consoleLn($.lang.get("console.received.irsprivmsg",n,o));o=o.toLowerCase();if(n.equalsIgnoreCase("jtv")){if(o.equalsIgnoreCase("clearchat")){$.logEvent("misc.js",333,$.lang.get("console.received.clearchat"))}else if(o.indexOf("clearchat")!=-1){$.logEvent("misc.js",335,$.lang.get("console.received.purgetimeoutban",o.substring(10)))}if(o.indexOf("now in slow mode")!=-1){$.logEvent("misc.js",339,$.lang.get("console.received.slowmode.start",o.substring(o.indexOf("every")+6)))}if(o.indexOf("no longer in slow mode")!=-1){$.logEvent("misc.js",343,$.lang.get("console.received.slowmode.end"))}if(o.indexOf("now in subscribers-only")!=-1){$.logEvent("misc.js",347,$.lang.get("console.received.subscriberonly.start"))}if(o.indexOf("no longer in subscribers-only")!=-1){$.logEvent("misc.js",351,$.lang.get("console.received.subscriberonly.end"))}if(o.indexOf("now in r9k")!=-1){$.logEvent("misc.js",355,$.lang.get("console.received.r9k.start"))}if(o.indexOf("no longer in r9k")!=-1){$.logEvent("misc.js",359,$.lang.get("console.received.r9k.end"))}if(o.indexOf("hosting")!=-1){var i=o.substring(11,o.indexOf(".",12)).trim();if(i.equalsIgnoreCase("-")){$.bot.channelIsHosting=null;$.logEvent("misc.js",366,$.lang.get("console.received.host.end"))}else{$.bot.channelIsHosting=i;$.logEvent("misc.js",368,$.lang.get("console.received.host.start",i))}}}});$.bind("command",function(n){var o=n.getCommand(),i=n.getSender().toLowerCase(),s=$.username.resolve(i),t=n.getArgs(),g=t[0];if(o.equalsIgnoreCase("log")){if(!$.isAdmin(i)){$.say($.whisperPrefix(i)+$.adminMsg);return}if(!g){if(e){$.say($.whisperPrefix(i)+$.lang.get("logging.enabled"))}else{$.say($.whisperPrefix(i)+$.lang.get("logging.disabled"))}return}if(g.equalsIgnoreCase("enable")){e=true;$.setIniDbBoolean("settings","loggingEnabled",e);$.logEvent("misc.js",84,s+" enabled logging");$.say($.whisperPrefix(i)+$.lang.get("logging.enabled"))}if(g.equalsIgnoreCase("disable")){e=false;$.setIniDbBoolean("settings","loggingEnabled",e);$.logEvent("misc.js",91,s+" disabled logging");$.say($.whisperPrefix(i)+$.lang.get("logging.disabled"))}}});$.bind("initReady",function(){if($.bot.isModuleEnabled("./core/logging.js")){$.consoleLn($.lang.get("console.loggingstatus",e?$.lang.get("common.enabled"):$.lang.get("common.disabled")));$.registerChatCommand("./core/logging.js","log",1)}});$.logging={getLogDateString:n,getLogTimeString:o};$.log=i;$.logEvent=s;$.logError=t})();