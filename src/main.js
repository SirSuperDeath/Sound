/*

Hey there!

This is property of Pr0Code.

http://plug.dj/astroparty

Enjoy using it in my room!

*/
var msgArray = [
	"Welcome to the AstroShock plug.dj room!",
	"Make sure to help out new users!",
	"Need help? Type !help for a list of commands",
	"This script is protected with an authentication system!",
	"More commands are on the way!",
	"The song limit for this room is 10 minutes.",
	"Please do not spam."];
var msgR = Math.floor(Math.random() * msgArray.length);
var sendMsg = API.sendChat("/em [Announcement] " + msgArray[msgR]);
	

//Settings
SoundBot = {};
SoundBot.options = {};
SoundBot.options.authSeperateFile = [
$.ajax({
    url:'https://raw.githubusercontent.com/Pr0Code/Sound/master/Loader.js',
    type:'HEAD',
    error: function()
    {
        return false;
	API.chatLog("Authentication file does not exist.");
    },
    success: function()
    {
        return true;
	API.chatLog("File exists.");
    }
});
	];
SoundBot.options.announcementMsg = true;
SoundBot.options.songIntervalMessage = [
	if(SoundBot.options.announcementMsg = true){
		
	interval: 15,
	offset: 0,
	msg: sendMsg
	}
	if(SoundBot.options.announcementMsg = false){
		API.chatLog("Announcements are off!");
	}
	];
SoundBot.options.allowCommands = true;
SoundBot.options.logUserJoin = true; //Figure this out


SoundBot.options.logUserJoin = {
API.on(API.USER_JOIN, callback);
function callback(user) {
  console.log(user.username + " joined the room");
  API.chatLog(user.username + " joined the room");
}
}
//Startup

var on = "Enabled ";
var version = "Beta 2.3";

API.chatLog("Loading file...");
setTimeout(function(){
	API.chatLog(on + "version " + version);
}, 1000);
setTimeout(function(){
API.sendChat("/em now live!");
}, 2000);

//Arrays here

var askArray = [
	"Why is an alarm clock going 'off' when it actually turns on?",
	"If you mated a bull dog and a shitsu, would it be called a bullsh*t?",
	"If an ambulance is on its way to save someone, and it runs someone over, does it stop to help them?",
	"Why is Grape Nuts cereal called that, when it contains neither grapes, nor nuts?",
	"Why is it called a 'drive through' if you have to stop?",
	"Why are Softballs hard?",
	"Do the minutes on the movie boxes include the previews, credits, and special features, or just the movie itself?",
	"If the professor on Giligan's Island can make a radio out of coconut, why can't he fix a hole in a boat?",
	"Why do we scrub Down and wash Up?",
	"Why is an electrical outlet called an outlet when you plug things into it? Shouldn't it be called an inlet.",
	"Why do people point to their wrist when asking for the time, but people don't point to their crotch when they ask where the bathroom is?",
	"Can blind people see their dreams?",
	"Why do most cars have speedometers that go up to at least 130 when you legally can't go that fast on any road?",
	"Why do they call it 'getting your dog fixed' if afterwards it doesn't work anymore?",
	"Why do they call it taking a dump? Shouldn't it be leaving a dump?",
	"Where in the nursery rhyme does it say humpty dumpty is an egg?",
	"Why do they sterilize needles for lethal injections?",
	"Why do banks leave the door wide open but the pens chained to the counter?",
	"If electricity comes from electrons, does morality come from morons?",
	"If all the countries in the world are in debt, where did all the money go?",
	"Why does Donald Duck wear a towel when he comes out of the shower, when he doesn't usually wear any pants?",
	"How come you press harder on a remote control when you know the battery is dead?",
	"If an orange is orange, why isn't a lime called a green or a lemon called a yellow?",
	"If a cat always lands on its feet, and buttered bread always lands butter side down, what would happen if you tied buttered bread on top of a cat?",
	"If the #2 pencil is the most popular, why's it still #2?",
	"What color would a smurf turn if you choked it?",
	"Where's the egg in an egg roll?",
	"Why aren't blue berries blue?",
	"Where is the lead in a lead pencil?",
	"Why is Greenland called green when it is covered in ice?",
	"If a person owns a piece of land, do they own it all the way down to the center of the earth?",
	"Why are they called stairs inside but steps outside?",
	"Why is there a light in the fridge but not in the freezer?",
	"Why does mineral water that has trickled through mountains for centuries have a use by date?",
	"Why do toasters always have a setting on them which burns your toast to a horrible crisp no one would eat?"];

var cookieArray = [" a chocolate chip ", " a sugar ", " a banana ", " a morphed ", " a slime "];
var outcome = [" touching it duplicates it. Wierd, but AWESOME!", " when you eat it, it makes you fall asleep.", " you decide to plant it, and it gives money!", " they take it back and eat it D:", " you accidently throw it out the window while driving."];

var fightArray = [
	" doesn't like water.",
	" likes to wear thier pants at their knees.",
	" hates cookies.",
	" likes to take hot showers infront of homeless people.",
	" doesn't know how to use an ipad.",
	" abuses people.",
	" wears hello-kitty clothes to work (or school).",
	" is 40 years old and lives in their parents basement.",
	" takes long walks in volcanos.",
	" has water, never wakes up.",
	" loves one-direction.",
	" eats coconuts"];
//Commands

//User

//Any errors that occur, will be sent. catch @ bottom of script.
try{
	
    API.on(API.CHAT, function(data){
        if(data.message.indexOf('!help') === 0){
           API.moderateDeleteChat(data.chatID);
           API.sendChat("/em [" + data.from + " My commands can be found here: http://goo.gl/PzvBL8]");
       
       }
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!fight') === 0){
    		API.moderateDeleteChat(data.chatID);
    		var fightUser = API.getUsers();
    		var fightR = Math.floor(Math.random() * fightArray.length);
    		var userFR = Math.floor(Math.random() * fightUser.length);
    		API.sendChat("[" + data.from + "] @" + fightUser[userFR].username + fightArray[fightR]);
    	}
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!staff') === 0){
    		API.moderateDeleteChat(data.chatID);
    		var online = API.getStaff();
    		var onlineR = Math.floor(Math.random() * online.length);
    		API.sendChat("/em [" + data.from + " Staff that's online: " + online[onlineR].username + "]");
    	}
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!theme') === 0){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " The theme is Electronic Dance Music. (EDM)]");
    	}
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!emoji') === 0){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " List of all emoji's here: http://www.emoji-cheat-sheet.com]");
    	}
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!cookie') === 0){
    		API.moderateDeleteChat(data.chatID);
    		var room = API.getUsers();
    		var cookieR = Math.floor(Math.random() * cookieArray.length);
    		var userR = Math.floor(Math.random() * room.length);
    		var outcomeR = Math.floor(Math.random() * outcome.length);
    		API.sendChat("[@" + room[userR].username + ", " + data.from + " gives you " + cookieArray[cookieR] + " cookie " + ", " + outcome[outcomeR] + "]");
    	}
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!ba') === 0){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " Brand Ambassaadors (BA's) are PlugDJ's global moderators. More info here: http://blog.plug.dj/brand-ambassadors/]");
    	}
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!link') === 0){
    		if(API.getMedia().format == 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " Link to current song: http://youtu.be/" + API.getMedia().cid + "]");
    		}else{
    			API.moderateDeleteChat(data.chatID);
    			var id = API.getMedia().cid;
    			SC.get('/tracks', { ids: id,}, function(tracks) {
    				API.sendChat("/em [" + data.from + " Link to current song: " + tracks[0].permalink_url + "]");
    			});
    		}
    	}
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!ask') === 0){
    		API.moderateDeleteChat(data.chatID);
    		var askR = Math.floor(Math.random() * askArray.length);
    		API.sendChat("/em [" + data.from + "] " + askArray[askR]);
    	}
    });
    //Put more here soon
    
    //Rdj
    
    //Coming soon
    
    //Bouncer
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!settings') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + "] Settings: " + SoundBot.options.authSeperateFile + ", " + SoundBot.options.announcementMsg + ", " + SoundBot.options.songIntervalMessage + ", " + SoundBot.options.allowCommands + ", " + SoundBot.options.logUserJoin + ".");
    	}
    });
    
    API.on(API.CHAT, function lengthCheck(data) {
    	if(data.message.indexOf('!check') === 0 && API.getUser(data.fromID).permmission > 1){
    if (data.media.duration > 600) {
        var currentSong = data.media.cid;
        API.sendChat("@" + currentDJ + " your song is longer than 10 minutes. I will now skip it.");
        API.moderateForceSkip();
    	}
    }
});
    
    API.on(API.CHAT, function(data){
    if(data.message.indexOf('!mute') === 0 && API.getUser(data.fromID).permission > 1){
    	API.moderateDeleteChat(data.chatID);
    	API.sendChat("/em [" + data.from + " used mute]");
    	var mute = function(a){ if (a.from == "user.username" || a.fromID == "user.userID") API.moderateDeleteChat(a.chatID); }
    	mute;
    	}	
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!say') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + "] " + data.message);
    	}
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!lock') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used lock]");
    		API.moderateLockWaitList(true);
    	}
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!unlock') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used unlock]");
    		API.moderateLockWaitList(false);
    	}
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!lskip') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used lockskip]");
    		API.moderateLockWaitList(true);
    		API.moderateForceSkip();
    	}
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!wlclear') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used wlclear]");
    		setTimeout(function(){
    		API.moderateLockWaitList(true, true);
    		}, 1000);
    		setTimeout(function(){
    			API.moderateLockWaitList(false);
    		}, 2000);
    	}
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!clear') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
		var messages = $('#chat-messages').children();
		for (var i = 0; i < messages.length; i++) {
			for (var j = 0; j < messages[i].classList.length; j++) {
				if (messages[i].classList[j].indexOf('cid-') == 0) {
					API.moderateDeleteChat(messages[i].classList[j].substr(4));
					}
				}
			}
			API.sendChat("/em [" + data.from + " used clear]");
    		}
    });
    
    API.on(API.CHAT, function(data){
    	if(data.message.indexOf('!skip') === 0 && API.getUser(data.fromID).permission > 1){
    		API.moderateDeleteChat(data.chatID);
    		API.sendChat("/em [" + data.from + " used skip]");
    		API.moderateForceSkip();
    	}
    });
}catch(err){
	var d = new Date();
	API.sendChat("/em [An error has occurred on " + d + " for " + err + "]");
	API.chatLog("Error: " + d + " on " + err);
}
    
    
    
    //End of script (for now) 