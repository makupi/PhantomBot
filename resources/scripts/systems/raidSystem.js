(function(){$.bind("command",function(e){var s=e.getSender().toLowerCase(),a=e.getCommand(),i=e.getArgs(),r=i[0]?i[0].toLowerCase():false,n;if(a.equalsIgnoreCase("raid")){if(!r){$.say($.whisperPrefix(s)+$.lang.get("raidsystem.raid.usage"));return}if($.bot.isModuleEnabled("./core/commandPause.js")){$.commandPause.pause(300)}$.inidb.incr("outgoingRaids",r,1);$.say($.lang.get("raidsystem.raid",$.username.resolve(r)))}if(a.equalsIgnoreCase("raider")){if(!r){$.say($.whisperPrefix(s)+$.lang.get("raidsystem.raider.usage"));return}n=parseInt($.inidb.get("incommingRaids",r))+1;$.inidb.incr("incommingRaids",r,1);$.say($.lang.get("raidsystem.raided",$.username.resolve(r),$.getOrdinal(n)))}});$.bind("initReady",function(){if($.bot.isModuleEnabled("./systems/raidSystem.js")){$.registerChatCommand("./systems/raidSystem.js","raid",2);$.registerChatCommand("./systems/raidSystem.js","raider",2)}})})();