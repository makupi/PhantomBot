(function(){var e=$.inidb.exists("youtubePlayer","updatesInChat")?$.getIniDbBoolean("youtubePlayer","updatesInChat"):false,t=$.inidb.exists("youtubePlayer","requestLimit")?parseInt($.inidb.get("youtubePlayer","requestLimit")):3,s=$.inidb.exists("youtubePlayer","playerVolume")?parseInt($.inidb.get("youtubePlayer","playerVolume")):20,i=$.inidb.exists("youtubePlayer","shuffleDefaultPlaylist")?$.getIniDbBoolean("youtubePlayer","shuffleDefaultPlaylist"):false,a=$.inidb.exists("youtubePlayer","requestsEnabled")?$.getIniDbBoolean("youtubePlayer","requestsEnabled"):true,r=$.inidb.exists("youtubePlayer","maxVideoLength")?parseInt($.inidb.get("youtubePlayer","maxVideoLength"))*1e3:48e4,u="./addons/youtubePlayer/",n=false,l=false,o=-1,y=-1,g=[],d=[],f=null;function h(e,s){this.youtubeVideo=e;this.username=s;this.isOverRequestLimit=function(){var e=0,s;for(s in d){if(d[s].username==this.username){e++}}return e>=t};this.isQueueDuplicate=function(){var e;for(e in d){if(d[e].videoId==this.youtubeVideo.videoId){return true}}return false};this.isVideoTooLong=function(){return $.isAdmin(this.username)||this.youtubeVideo.getVideoLength()>r};this.request=function(){if(!this.youtubeVideo.found){$.say($.whisperPrefix(this.username)+$.lang.get("youtubeplayer.request.error.404",this.youtubeVideo.link));$.returnCommandCost(this.username,"addsong");return false}else if(this.isOverRequestLimit()){$.say($.whisperPrefix(this.username)+$.lang.get("youtubeplayer.request.error.overlimit",t));$.returnCommandCost(this.username,"addsong");return false}else if(this.isQueueDuplicate()){$.say($.whisperPrefix(this.username)+$.lang.get("youtubeplayer.request.error.alreadyexists"));$.returnCommandCost(this.username,"addsong");return false}else if(this.isVideoTooLong()){$.say($.whisperPrefix(this.username)+$.lang.get("youtubeplayer.request.error.toolong",this.youtubeVideo.videoTitle,$.getTimeString(this.youtubeVideo.getVideoLength()),$.getTimeString(r)));$.returnCommandCost(this.username,"addsong");return false}else{d.push(this.youtubeVideo);x();$.say($.lang.get("youtubeplayer.request.success",this.youtubeVideo.videoTitle,$.resolveRank(this.username)));return true}}}function p(e,t){this.link=e;this.username=(t+"").toLowerCase();this.videoId="";this.videoTitle="";this.length=0;this.found=true;this.getVideoLength=function(){var e=$.youtube.GetVideoLength(this.videoId);while(e[0]==0&&e[1]==0&&e[2]==0){e=$.youtube.GetVideoLength(this.videoId)}if(e[0]==0&&e[1]==0&&e[2]==0){return false}this.length=e[2];return this.length};this.cue=function(){$.musicplayer.cue(this.videoId)};if(!this.link){this.found=false}var s=$.youtube.SearchForVideo(this.link);while(s[0].length()<11&&s[1]!="No Search Results Found"){s=$.youtube.SearchForVideo(this.link)}this.videoId=s[0];this.videoTitle=s[1];this.length=1;if(this.videoTitle=="Video Marked Private"||this.videoTitle=="No Search Results Found"){this.found=false}if(this.videoId==""){this.found=false}}function b(){var e,t;$.consoleLn($.lang.get("youtubeplayer.playlist.parse.default.start"));g=$.readFile(u+"playlist.txt").reverse();if(g.length>0){for(e in g){t=new p(g[e]);if(t){$.writeToFile(e+". "+t.videoTitle+" ("+t.link+")",u+"defaultPlaylist.txt",e!=0)}else{$.writeToFile(e+". COULD NOT FIND! ("+t.link+")",u+"defaultPlaylist.txt",e!=0)}}}$.consoleLn($.lang.get("youtubeplayer.playlist.parse.default.complete"))}function m(){var e,t;if(d.length>0){e=d.shift()}else{if(i){do{t=$.randRange(0,g.length-1)}while(t==y);o=y=t}else{if(o<g.length){o++}else{o=0}}e=new p(g[o],$.botName)}v(e)}function c(e){var t,s;for(t in g){if(g[t].toLowerCase().indexOf(e.toLowerCase())>-1){o=t;s=new p(g[t],$.botName);v(s);return true}}return false}function P(e){$.writeToFile("http://youtube.com/watch?v="+e.videoId,"./addons/youtubePlayer/playlist.txt",true);b()}function w(e){var t=new p(g[e]),s,i;g.splice(e,1);s=g.reverse();for(i in s){$.writeToFile(s[i],"./addons/youtubePlayer/playlist.txt",i!=0)}b();return t.videoTitle}function v(t){if(t){f=t;t.cue();$.writeToFile(t.videoTitle,u+"currentSong.txt",false);if(e){$.say($.lang.get("youtubeplayer.nowplaying.get",t.videoTitle,$.resolveRank(t.username)))}else{$.consoleLn($.lang.get("youtubeplayer.nowplaying.get",t.videoTitle,$.resolveRank(t.username)))}}x()}function x(e){var t;if(e){$.writeToFile("",u+"requestQueue.txt",false);return}if(d.length>0){for(t in d){$.writeToFile(d[t].videoTitle+" (By "+$.username.resolve(d[t].username)+")",u+"requestQueue.txt",t!=0)}}}function C(){if(l){$.musicplayer.play()}else{$.musicplayer.pause()}l=!l}$.bind("musicPlayerConnect",function(){n=true;if(g.length==0){b()}if(e&&a){$.say($.lang.get("youtubeplayer.requests.enabled")+" "+$.lang.get("youtubeplayer.request.usage"))}$.consoleLn($.lang.get("youtubeplayer.console.client.connected"))});$.bind("musicPlayerDisconnect",function(){n=false;x(true);if(e&&a){$.say("[♫] Song requests have been disabled.")}$.consoleLn($.lang.get("youtubeplayer.console.client.disconnected"))});$.bind("musicPlayerState",function(e){$.musicplayer.setVolume(s);if(e.getStateId()==-2){d=[];m()}if(e.getStateId()==0){m()}if(e.getStateId()==5){$.musicplayer.play();$.musicplayer.currentId()}});$.bind("command",function(l){var o=l.getSender().toLowerCase(),y=l.getCommand(),v=l.getArgs(),x=v[0]?v[0]:"",I=v[1],q;if(y.equalsIgnoreCase("musicplayer")){if(!$.isAdmin(o)){$.say($.whisperPrefix(o)+$.adminMsg);return}if(x.equalsIgnoreCase("togglenotify")){e=!e;$.setIniDbBoolean("youtubePlayer","updatesInChat",e);$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.toggle.chatnotifications.success",e?$.lang.get("common.enabled"):$.lang.get("common.disabled")))}if(x.equalsIgnoreCase("limit")){if(!I||isNaN(parseInt(I))){$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.set.requestlimit.usage",t));return}t=parseInt(I);$.inidb.set("youtubePlayer","requestLimit",t);$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.set.requestlimit.success",t))}if(x.equalsIgnoreCase("maxvideolength")){if(!I||isNaN(parseInt(I))){$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.set.maxvideolength.usage",$.getTimeString(r/1e3)));return}r=parseInt(I)*6e4;$.inidb.set("youtubePlayer","maxVideoLength",r);$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.set.maxvideolength.success",$.getTimeString(r/1e3)))}if(x.equalsIgnoreCase("shuffle")){i=!i;$.setIniDbBoolean("youtubePlayer","shuffleDefaultPlaylist",i);$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.toggle.songShuffle.success",i?$.lang.get("common.enabled"):$.lang.get("common.disabled")))}if(x.equalsIgnoreCase("pause")){C()}if(x.equalsIgnoreCase("reload")){b();$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.playlist.reload.success"))}if(x.equalsIgnoreCase("adddefault")){if(!I){$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.playlist.adddefault.usage"));return}q=new p(I,o);if(!q){$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.playlist.adddefault.failed"))}else{P(q);$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.playlist.adddefault.success",q.videoTitle))}}if(x.equalsIgnoreCase("deldefault")){I=parseInt(I);if(isNaN(I)||!g[I]){$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.playlist.deletedefault.usage"));return}$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.playlist.deletedefault.success",w(I)))}}if(y.equalsIgnoreCase("addsong")){if(!a){$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.request.error.disabled"));return}if(!x){$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.request.usage"));return}if(!n){$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.request.error.notrunning"));return}q=new h(new p(x,o),o);if(q.youtubeVideo){q.request()}}if(y.equalsIgnoreCase("volume")){if(!$.isAdmin(o)){$.say($.whisperPrefix(o)+$.adminMsg);return}if(!I&&!isNaN(parseInt(x))){s=parseInt(x);$.inidb.set("youtubePlayer","playerVolume",s);if(n){$.musicplayer.setVolume(s)}}}if(y.equalsIgnoreCase("skipsong")){if(!$.isAdmin(o)){$.say($.whisperPrefix(o)+$.adminMsg);return}if(!n){$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.notrunning"));return}m()}if(y.equalsIgnoreCase("currentsong")){if(!n){$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.notrunning"));return}$.say($.lang.get("youtubeplayer.nowplaying.getwithlink",f.videoTitle,$.resolveRank(f.username),f.link))}if(y.equalsIgnoreCase("stealsong")){if(!$.isAdmin(o)){$.say($.whisperPrefix(o)+$.adminMsg);return}if(f){$.writeToFile("https://youtube.com/watch?v="+f.videoId,u+"playlist.txt",true);$.say($.lang.get("youtubeplayer.stealsong.success",f.videoTitle,$.resolveRank(f.username)));b()}}if(y.equalsIgnoreCase("playsong")){if(!$.isAdmin(o)){$.say($.whisperPrefix(o)+$.adminMsg);return}if(!n){$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.notrunning"));return}if(d.length>0){$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.playsong.requestsrunning"));return}if(x){if(!c(x)){$.say($.whisperPrefix(o)+$.lang.get("youtubeplayer.playsong.404",x))}}}if(y.equalsIgnoreCase("togglerequests")){if(!$.isAdmin(o)){$.say($.whisperPrefix(o)+$.adminMsg);return}a=!a;$.setIniDbBoolean("youtubePlayer","requestsEnabled",a);if(a){$.say($.lang.get("youtubeplayer.requests.enabled"))}else{$.say($.lang.get("youtubeplayer.requests.disabled"))}}});$.bind("initReady",function(){if($.bot.isModuleEnabled("./systems/youtubePlayer.js")){if(g.length==0){b()}$.registerChatCommand("./systems/youtubePlayer.js","musicplayer",1);$.registerChatCommand("./systems/youtubePlayer.js","volume",1);$.registerChatCommand("./systems/youtubePlayer.js","skipsong",1);$.registerChatCommand("./systems/youtubePlayer.js","stealsong",1);$.registerChatCommand("./systems/youtubePlayer.js","playsong",1);$.registerChatCommand("./systems/youtubePlayer.js","togglerequests",1);$.registerChatCommand("./systems/youtubePlayer.js","addsong",6);$.registerChatCommand("./systems/youtubePlayer.js","currentsong",7)}})})();