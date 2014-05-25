/*
*
* Copyright (c) 2014 AstroShock (Pr0Code)
* All rights reserved.
* Do not copy or modify without my permission. 
* Please refer to the lincense for questions on that topic.
*
*@license
*
*Copyright (c) 2014, AstroShock
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are NOT permitted. If I (Jack Labbe) give permission, you may modify this code provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

* Neither the name of the AstroParty nor the names of its
  contributors may be used to endorse or promote products derived from
  this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*
* Pls follow the license or I will have the copied / modified script removed.
*
*/

//					SoundBot's Life Starts Here

if(location.pathname == '/astroparty/'){
try{

settings = {
	woot: true,
	announce: true,
	announceInt: { interval: 300000},
	logJoin: true,
	afkRemove: true,
	backlist: true,
	statMsg: false,
	timeGuard: false,
	chatGuard: false,
	lockGuard: true,
	cycleGuard: false,
	histSkip: true,
	save: true,
	smartReply: true,
	version: "1.0"
};

party = {
	on: false
};

games = {
	spin: false
};

guard = {
	lock: {warning: false, exit: false },
	cycle: {warning: false, exit: false },
	time: {warning: false, exit: false }
};

function startup(){
	loadSettings();
	loadAfk();
	loadAnnouncements();
	loadCommands();
	API.sendChat('/em now running!');
}

function loadSettings(){
	JSON.parse(localStorage.getItem('SoundBotSettings'));
}

var userData = {};
var usersinroom = API.getUsers();
for(var i in usersinroom){
	userData[usersinroom[i].id] = {
		username: usersinroom[i].username,
		afktime: Date.now(),
		dctime: Date.now(),
		warning: false,
		mute: false
	};
}
API.on(API.USER_JOIN, function(user){
	userData[user.id] = {
		username: user.username,
		afktime: Date.now(),
		dctime: Date.now(),
		warning: false,
		mute: false
	};
});
API.on(API.USER_LEAVE, function(user){
	delete userData[user.id];
});
API.on(API.CHAT, function(data){
	userData[data.fromID].afkTime = Date.now();
	userData[data.fromID].warning = false;
});
var thirtyMinute = 3600000;
var afkB = {
afkRemover: function(){
	var userswl = API.getWaitList();
	var now = Date.now();
	for(var i in userswl){
		var userafk = userData[userswl[i].id].afktime;
		var usertimeafksolo = now - userafk;
		var usertimeafk = Math.floor((now - userafk) / 60000) % 60;
		if (usertimeafksolo > thirtyMinute && userData[userswl[i].id].warning === false) {
			API.sendChat("@" + userswl[i].username + " Afk time: " + usertimeafk + " minutes. Chat in 4 minutes or I will remove you from the waitlist.");
			userData[userswl[i].id].warning = true;
			setTimeout(function() {
				userswl = API.getWaitList();
				for (var e in userswl) {
					if (userData[userswl[e].id].warning === true) {
						API.moderateRemoveDJ(userswl[e].id);
						userData[userswl[e].id].warning = false;
					}
				}
			}, 240000);
		}
     }
  },
};

function loadAfk(){
	if(settings.afkRemove){
		afkB.afkRemover();
	}else API.sendChat('AFKRemover is not true! Users can be afk without warning!');
}

var msgArray = [
	"Welcome to the AstroShock plug.dj room!",
	"Make sure to help out new users!",
	"Need help? Type !help for a list of commands",
	"This script is protected with an authentication system!",
	"More commands are on the way!",
	"The song limit for this room is 10 minutes.",
	"Please do not spam.",
	"We are currently open for applications to be a bouncer. More info here: https://astroparty.typeform.com/to/fwvOjP",
"If you submitted an application, please do not ask if we read it, if you do, we'll just delete it."];
msgR = Math.floor(Math.random() * msgArray.length); 
API.sendChat("/em [Announcement] " + msgArray[msgR]);

function loadAnnouncements(){
	setInterval(function(){
		API.sendChat("/em [Announcement] " + msgArray[msgR]);
	}, settings.announceInt.interval);
}

var spinstart = [];
var whitelist = [];
var spinTime = [60000, 78000, 120000, 138000, 180000, 198000, 240000, 258000];
var spinOutcome = [" got thier brains blasted out!"," dropped the ball!"," lost spin!"," got hit in the face with the ball!"," fell ontop of the ball!"," got shot up into the air and hit the ground!"," died."];

function loadCommands(){
	function userc(str, from, fromid, chatid, opt){
		var users = API.getUsers();
		switch(str){
			case '!help':
				API.moderateDeleteChat(chatid);
				API.sendChat('/em [' + from + '] My commands: http://goo.gl/jopl9J');
				break;
				
			case '!theme':
				API.moderateDeleteChat(chatid);
				API.sendChat('/em [' + from + '] The theme is Electronic Dance Music');
				break;
				
			case '!fight':
				API.moderateDeleteChat(chatid);
				for(var i in users){
					if(users[i].username == opt){
						var FR = Math.floor(Math.random() * fightArray.length);
						API.sendChat('@' + users[i].username + ', ' + from + ' says: ' + fightArray[FR]);
					}
				}
				break;
				
			case '!cookie':
				API.moderateDeleteChat(chatid);
				for(var i in users){
					if(users[i].username == opt){
						var ca = Math.floor(Math.random() * cookieArray.length);
						var co = Math.floor(Math.random() * outcome.length);
						API.sendChat('@' + users[i].username + ', ' + from + ' gives you ' + cookieArray[ca] + '!' + outcome[co]);
					}
				}
				break;
				
			case '!ask':
				API.moderateDeleteChat(chatid);
				var a = Math.floor(Math.random() * askArray.length);
				API.sendChat(askArray[a]);
				break;
				
			case '!link':
				API.moderateDeleteChat(chatid);
				if(API.getMedia().format == 1){
					API.sendChat('/em [' + from + '] Link to current song: ' + API.getMedia().cid);
				}else{
					var id = API.getMedia().cid;
					SC.get('/tracks', { ids: id, }, function(tracks){
						API.sendChat('/em [' + from + '] Link to current song: ' + tracks[0].permalink_url);
					});
				}
				break;
				
			case '!staff':
				API.moderateDeleteChat(chatid);
				var isonline = [];
				var online = API.getStaff();
				for(var i in online){
					isonline.push(online[i].username);
				}
				API.sendChat('/em [' + from + '] Staff that\'s online: ' + isonline.join(', ') + '.');
				isonline = [];
				break;
				
			case '!ad':
				API.moderateDeleteChat(chatid);
				API.sendChat("/em [" + from + "] Getting annoying ads? Get ADBlock here: https://adblockplus.org");
				break;
				
				//Spin Game Starts Here
				
			case '!spin':
				API.moderateDeleteChat(chatid);
				API.sendChat('/em [' + from + '] You requested a game of spin! Type !play to join!');
				if(!games.spin){
					games.spin = true;
					spinstart.push(from);
			case '!join':
					spinstart.push(from);
					API.sendChat('/em [' + from + '] Joined spin!');
			case '!start':
					API.sendChat("/em [" + from + "] Started the game!");
					var a = spinstart;
					var b = Math.floor(Math.random() * a.length);
					var z = setInterval(function(){
						API.sendChat("@" + a[b] + ", you got the ball! Type !pass to pass it!");
					}, 5000);
					var y = Math.floor(Math.random() * spinTime.length);
					setTimeout(function(){ //ends game
						clearInterval(z);
						if(spinstart.length == 0){
							API.sendChat("/em Spin has ended! All users are safe! :D");
							games.spin = false;
							whitelist = []; //clears array
							spinstart = []; //clears array
						}
						if(spinstart.length > 1){
							var c = Math.floor(Math.random() * a.length);
							var d = Math.floor(Math.random() * spinOutcome.length);
							API.sendChat("@" + a[c] + spinOutcome[d] + " :frowning:");
							games.spin = false;
							whitelist = []; //clears array
							spinstart = []; //clears array
						}
					}, spinTime[y]);
					z(); //Starts !pass
			case '!pass':
					API.sendChat('/em [' + from + '] Passed the ball!');
					spinstart.pop(from);
					whitelist.poop(from);
			case '!endspin':
				if(API.getUser(fromid).permission >= 2){
					clearInterval(z);
					spinstart = [];
					whitelist = [];
					games.spin = false;
					API.sendChat('/em [' + from + '] Stopped spin!');
					}else API.sendChat('/em [' + from + '] No permission!');
				}
				break;
				
				//Spin Game Stops Here
				
			case '!emoji':
				API.moderateDeleteChat(chatid);
				API.sendChat("/em [" + from + " List of all emoji's here: http://www.emoji-cheat-sheet.com]");
				break;
				
			case '!ba':
				API.moderateDeleteChat(chatid);
				API.sendChat("/em [" + from + "] Brand Ambassadors (BA's) are plug.dj's global moderators. More info here: http://blog.plug.dj/brand-ambassadors/");
				break;
				
			case '!party':
				API.moderateDeleteChat(chatid);
				if(API.getUser(fromid).permission == 5){
					if(!party.on){
						party.on = true;
						$.ajax({
							type: 'POST',
							url: 'http://plug.dj/_/gateway/moderate.update_name_1',
							contentType: 'application/json',
							data: '{"service":"moderate.update_name_1","body":["LIVE: PARTY! - #AstroParty"]}'
						});
						API.sendChat('/em [' + from + '] Started a party!');
						var plock = $('.lock-toggle');
						if(plock.hasClass('disabled')){
							API.moderateLockWaitList(false);
							setTimeout(function(){ API.moderateLockWaitList(true, true); }, 100);
						}else{
							API.moderateLockWaitList(true, true);
						}
					}else{
						API.sendChat('/em [' + from + '] In my records, no parties are running!');
					}
				}else API.sendChat('/em [' + from + '] That command is only for the host!');
				break;
				
			case '!endparty':
				API.moderateDeleteChat(chatid);
				if(API.getUser(fromid).permission == 5){
					if(party.on){
						party.on = false;
						$.ajax({
							type: 'POST',
							url: 'http://plug.dj/_/gateway/moderate.update_name_1',
							contentType: 'application/json',
							data: '{"service":"moderate.update_name_1","body":["pizza - #AstroParty"]}'
						});
						API.sendChat('/em ' + from + ' stopped a party!');
						API.moderateLockWaitList(false);
					}else{
						API.sendChat('/em [' + from + '] In my records, no parties are running!');
					}
				}else{
					API.sendChat('/em [' + from + '] That command is only for the host!');
				}
				break;
				
			case '!eta':
				API.moderateDeleteChat(chatid);
				var y = opt;
				var b = API.getUsers();
				for (var i in b) {
					if(b[i].username == y) {
						var c = API.getUser(b[i].id).wlIndex + 1;
						var d = 5;
						if(c == 1) {
							var e = $("#now-playing-time").children('span').text();
							API.sendChat("/em [" + from + "] ETA for " + b[i].username + " is " + e + " minutes.");
						}
						else if(c > 1) {
							var f = Math.floor(c*d);
							API.sendChat("/em [" + from + "] ETA for " + b[i].username + " is " + f + " minutes.");

						}else{
						API.sendChat("/em [" + from + "] ETA for " + b[i].username + " is N/A minutes.");
						}
					}
				}
				break;
				
			case '!status':
				API.moderateDeleteChat(chatid);
				if(API.getUser(fromid).permission >= 2){
					var g = Date.now();
					var v = statusTimeArray - g;
					var d = new Date();
			var n = d.getTimezoneOffset();
			if(n === 240){ var zed = 'Eastern Standard Time'; }
					API.sendChat('/em [' + from + '] Status | Uptime: ' + v + ' ~ My Time Zone: ' + zed + ' ~ Party: ' + party.on);
				}
				break;
				
			case '!add':
				API.moderateDeleteChat(chatid);
				if(API.getUser(fromid).permission >= 2){
					var aa = API.getUsers();
					for(var i in aa){
						if(aa[i].username == opt){
							API.sendChat("/em [" + from + "] Used add on: " + aa[i].username);
							var a = API.getWaitList().length;
							if(a === 50){
								API.sendChat('User is added to the queue!');
								var queueList = [];
								API.moderateLockWaitList(true, false);
								if(a <= 49){
									API.moderateAddDJ(aa[i].id);
									var b = API.getWaitListPosition(aa[i].id);
									if(b === 50){
										queueList = [];
										console.log('Queue add is successfull!');
									}else{
										API.sendChat('/em Uh oh! There was an issue when adding a Queue\'d user. Here\'s a list of the users.');
										API.sendChat('/em ' + queueList);
									}
								}
							}else{
								console.log('queue not needed!');
								API.moderateAddDJ(aa[i].id);
							}
						}
						if(aa[i].username === null){
							API.sendChat("/em [" + from + "] User not found!");
						}
					}
				}else{
					API.sendChat("/em [" + from + "] No permission!");
				}
				break;

			case '!move':
				API.moderateDeleteChat(chatid);
				if(API.getUser(fromid).permission >= 2){
					var fSpace = str.indexOf(' ');
					var lSpace = str.lastIndexOf(' ');
					var pos;
					if(lSpace === undefined){
						API.sendChat('/em [' + from + '] Invalid position!');
					}
					for(var i in users){
						if(users[i].username == opt){
							for(var i in lSpace){
								if(i == '1'){
									API.sendChat('/em [' + from + '] Moved ' + users[i].username);
									API.moderateMoveDJ(users[i].id, i);
								}
								if(i == '2'){
									API.sendChat('/em [' + from + '] Moved ' + users[i].username);
									API.moderateMoveDJ(users[i].id, i);
								}
								if(i == '3'){
									API.sendChat('/em [' + from + '] Moved ' + users[i].username);
									API.moderateMoveDJ(users[i].id, i);
								}
								if(i == '4'){
									API.sendChat('/em [' + from + '] Moved ' + users[i].username);
									API.moderateMoveDJ(users[i].id, i);
								}
								if(i == '5'){
									API.sendChat('/em [' + from + '] Moved ' + users[i].username);
									API.moderateMoveDJ(users[i].id, i);
								}
								if(i == '6'){
									API.sendChat('/em [' + from + '] Moved ' + users[i].usernam);
									API.moderateMoveDJ(users[i].id, i);
								}
								if(i == '7'){
									API.sendChat('/em [' + from + '] Moved ' + users[i].username);
									API.moderateMoveDJ(users[i].id, i);
								}
							}
						}
					}
					if(users[i].username === undefined){
							API.sendChat('/em [' + from + '] User not found!');
					}
				}else{
					API.sendChat('/em [' + from + '] No permission!');
				}
				break;

			case '!remove':
				API.moderateDeleteChat(chatid);
				if(API.getUser(fromid).permission >= 2){
					var rAll = API.getUsers();
					for(var i in rAll){
						if(rAll[i].username == opt){
							API.sendChat("/em [" + from + "] used remove on " + rAll[i].username);
							API.moderateRemoveDJ(rAll[i].id);
						}
						if(rAll[i].username === null){
							API.sendChat("/em [" + from + "] User not found!");
						}
					}
				}else{
					API.sendChat("/em [" + from + "] No permission!");
				}
				break;
				
			case '!vr':
				API.moderateDeleteChat(chatid);
				if(API.getUser(fromid).permission >= 3){
					var vr = API.getRoomScore();
					var h = [];
					var b = Math.floor(users.length - 1);
					var c = Math.floor(((b - vr.curates) -  vr.negative) * 10);
					var d = Math.floor(((b - vr.positive) - vr.negative) * 10);
					var f = Math.floor(((b - vr.positive) -  vr.curates) * 10);
					
					API.sendChat('/em [' + from + '] ' + c + '% users wooted! ' + d + '% grabbed and ' + f + '% meh\'d!');
				}else{
					API.sendChat('/em [' + from + '] No permission!');
				}
				break;

			case '!settings':
				API.moderateDeleteChat(chatid);
				if(API.getUser(fromid).permission >= 2){
					API.sendChat("/em [" + from + "] Current Settings | Autowoot: " + settings.woot + " | Announcements: " + settings.announce + " | Announcement Interval: " + settings.announceInt.interval + " | Log Join: " + settings.logJoin + " | AFKRemove: " + settings.afkRemove + " | Blacklist: " + settings.blacklist + " | TimeGuard: " + settings.timeGuard + ' | ChatGuard: ' + settings.chatGuard + ' | Party: ' + party.on + ' | LockGuard: ' + settings.lockGuard + ' | CycleGuard: ' + settings.cycleGuard + '.');
				}
				break;

			case '!clear':
				if(API.getUser(fromid).permission >= 2){
					API.moderateDeleteChat(chatid);
					var messages = $('#chat-messages').children();
					for (var i = 0; i < messages.length; i++) {
						for (var j = 0; j < messages[i].classList.length; j++) {
							if (messages[i].classList[j].indexOf('cid-') === 0) {
								API.moderateDeleteChat(messages[i].classList[j].substr(4));
								}
							}
						}	
					API.sendChat("/em [" + from + " used clear]");
				}
			break;

			case '!skip':
				if(API.getUser(fromid).permission >= 2){
					API.moderateDeleteChat(chatid);
					API.sendChat("/em [" + from + " used skip]");
					API.moderateForceSkip();
				}
				break;

			case '!lockskip':
				if(API.getUser(fromid).permission >= 2){
					API.moderateDeleteChat(chatid);
					API.sendChat("/em [" + from + " used lockskip]");
					API.moderateLockWaitList(true, false);
					API.moderateForceSkip();
				}else{
					API.sendChat("/em [" + from + "] No permission!");
				}
				break;

			case '!lock':
				if(API.getUser(fromid).permission >= 2){
					API.moderateDeleteChat(chatid);
					API.sendChat("/em [" + from + " used lock]");
					var llock = $('.lock-toggle');
					if(llock.hasClass('enabled')){
						API.moderateLockWaitList(true, false);
					}else{
						API.moderateLockWaitList(false);
					}
				}else{
					API.sendChat("/em [" + from + "] No permission!");
				}
				break;

			case '!cycle':
				if(API.getUser(fromid).permission >= 2){
					API.moderateDeleteChat(chatid);
					API.sendChat("/em [" + from + " used cycle]");
					var toggle = $(".cycle-toggle");
					if(toggle.hasClass("disabled")) {
						toggle.click();
					}else{
						toggle.click();
					}
				}
				break;

			case '!mute':
				if(API.getUser(fromid).permission >= 2){
					API.moderateDeleteChat(chatid);
					for (var i in users) {
						if (users[i].username == opt) {
							userData[users[i].id].mute = true;
							API.sendChat("/me [" + from + "] used mute on: " + opt);
						}
					}
				}
				break;

			case '!unmute':
				if(API.getUser(fromid).permission >= 2){
					if(userData[fromid].mute === true) API.moderateDeleteChat(chatid);
					if(userData[fromid].mute === true){
						API.sendChat("/em [" + from + "] Tried unmuting themselves, but they're muted!");
					}else{
					for (var i in users) {
						if (users[i].username == opt) {
							userData[users[i].id].mute = false;
							API.sendChat("/me [" + from + "] used unmute on: " + opt);
							}
						}
						API.moderateDeleteChat(chatid);
					}
				}
				break;

			case '!ban':
			if(API.getUser(fromid).permission >= 2){
				for (var i in users) {
					if (users[i].username == opt) {
						API.moderateDeleteChat(chatid);
						API.sendChat("/em [" + from + "] used ban on " + opt);
						API.moderateBanUser(users[i].id);
					}
				}
			}
			break;

			case '!say':
				if(API.getUser(fromid).permission >= 2){
					API.moderateDeleteChat(chatid);
					API.sendChat('/em [' + from + '] ' + opt);
				}
				break;

			case '!save':
				if(API.getUser(fromid).permission >= 3){
					API.moderateDeleteChat(chatid);
					API.sendChat("/em [" + from + "] Saving...");
					setTimeout(function(){
						saveSettings();
						API.sendChat("/em Saved!");
					}, 500);
				}else{
					API.sendChat("/em [" + from + "] No permission!");
				}
				break;

			case '!kick':
				if(API.getUser(fromid).permission >=2 ){
					var splitkick = opt;
					var userskick = API.getUsers();
					for(var i in userskick) {
						if (userskick[i].username == splitkick){
							var userkick = userskick[i].id;
							API.sendChat("[" + from + "] @" + userskick[i].username + " You will be kicked in 10 seconds.")
							setTimeout(function(){API.moderateBanUser(userkick, 1, API.BAN.HOUR);}, 10000);
							setTimeout(function(){API.moderateUnbanUser(userkick);}, 15000);
							setTimeout(function(){API.moderateUnbanUser(userkick); API.sendChat('/em Kicked user can now login!')}, 18000);
						}else{
							if(userskick[i].username === undefined){
								API.sendChat("/em [" + from + "] User not found!");
							}
						}
					}
				}else{
					API.sendChat("/em [" + from + "] No permission!");
				}
				break;

			case '!rdj':
				API.moderateDeleteChat(chatid);
				if(API.getUser(fromid).permission >= 2){
					var crowd = API.getUsers();
					for(var i in crowd){
						if(crowd[i].username === opt){
							API.sendChat("/em [" + from + "] Set " + crowd[i].username + " as a Resident DJ!");
							API.moderateSetRole(crowd[i].id, API.ROLE.RESIDENTDJ);
						}
					}
				}else{
					API.sendChat("/em [" + from + "] No permission!");
				}
				break;

			case '!bouncer':
				API.moderateDeleteChat(chatid);
				if(API.getUser(fromid).permission >= 3){
					var bcrowd = API.getUsers();
					for(var i in bcrowd){
						if(bcrowd[i].username === opt){
							API.sendChat('/em [' + from + '] Set ' + bcrowd[i].username + ' as a bouncer!');
							API.moderateSetRole(bcrowd[i].id, API.ROLE.BOUNCER);
						}
					}
				}else{
					API.sendChat('/em [' + from +'] No permission!');
				}
				break;

			case '!manager':
				API.moderateDeleteChat(chatid);
				if(API.getUser(fromid).permission >= 4){
					var mcrowd = API.getUsers();
					for(var i in mcrowd){
						if(mcrowd[i].username === opt){
							API.sendChat('/em [' + from + ' Set ' + mcrowd[i].username + ' as a manager!');
							API.moderateSetRole(mcrowd[i].id, API.ROLE.MANAGER);
						}
					}
				}else{
					API.sendChat('/em [' + from +'] No permission!');
				}
				break;

			case '!reg':
				API.moderateDeleteChat(chatid);
				if(API.getUser(fromid).permission >= 3){
					var rcrowd = API.getUsers();
					for(var i in rcrowd){
						if(rcrowd[i].username === opt){
							API.sendChat('/em [' + from + '] Removed ' + rcrowd[i].username + ' from the staff!');
							API.moderateSetRole(rcrowd[i].id, API.ROLE.NONE);
						}
					}
				}else{
					API.sendChat('/em [' + from + '] No permission!');
				}
				break;
				
				default: API.moderateDeleteChat(chatid); API.sendChat('/em [' + from + '] Unknown command! Type !help for a list.');
			}
		}
	API.on(API.CHAT, function(data) {
		if (data.message.substr(0,1) == '!') {
			if(data.message.indexOf('@') !=-1) {
				var index = data.message.indexOf('!');
				var endex = data.message.indexOf('@') -1;
				var msg = data.message.substr(index, endex).trim();
				var indexu = data.message.indexOf('@') +1;
				var u = data.message.substr(indexu).trim();
				userc(msg, data.from, data.fromID, data.chatID, u);
			}
			else {
				if(data.message.indexOf('!say') !=-1) {
					var smsg = data.message.substr(5);
					userc('!say', data.from, data.fromID, data.chatID, smsg);
				}
				else {
					userc(data.message, data.from, data.fromID, data.chatID);
				}
			}
			if (userData[data.fromID].mute === true) API.moderateDeleteChat(data.chatID);
		}
	});
}
function saveSettings(){
	localStorage.setItem('SoundBotSettings',JSON.stringify(settings));
	localStorage.setItem('SoundBotUserData', JSON.stringify(userData));
}

if(settings.woot){
	$('#woot').click();
	API.on(API.DJ_ADVANCE, function(){
		$('#woot').click();
	});
}

if(settings.logJoin){
	API.on(API.USER_JOIN, function(user){
		API.chatLog(user.username + ' has joined the room!');
	});
}

if(settings.statMsg){
	API.on(API.DJ_ADVANCE, function(){
		var a = API.getRoomScore();
		var b = $("#now-playing-time").children('span').text();
		if(b = '0:02'){
			API.sendChat('/em ' + API.getDJ().username + ' recieved ' + a.positive + ' woots, ' + a.curates + ' grabs, ' + a.negative + ' mehs for the song \'' + API.getMedia().title + '\'!');
		}else{
			return;
		}
	});
}

if(settings.chatGuard){
	API.on(API.CHAT, function(data){
		switch(data){
			case 'fan':              API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not ask for fans!');
			case 'fan_me:':          API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not ask for fans!');
			case 'friend4friend':    API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not ask for fans!');
			case 'friendme':         API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not ask for fans!');
			case 'friend_me':        API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not ask for fans!');
			case 'fan4fan':          API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not ask for fans!');
			case 'fanme':            API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not ask for fans!');
			case 'skip':             API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not ask for skips!');
			case 'fuck':             API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'shit':             API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'nigga':            API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'asshole':          API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'dick':             API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'bitch':            API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'fak':              API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'fuk':              API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'shet':             API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'fuku':             API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'faku':             API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'dammit':           API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'damm':             API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'fucker':           API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'damn':             API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'damnit':           API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'penis':            API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'assdick':          API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
			case 'cunt':             API.moderateDeleteChat(data.chatID); API.sendChat('@' + data.from + ' please do not swear!');
		}
	});
}else API.chatLog('ChatGuard is not true! Any blacklisted messages will not be deleted!');

if(settings.histSkip){
	var a = API.getMedia().title;
	var b = API.getHistory();
	for(var i in b){
		if(b[i] == a){
			API.sendChat('@' + API.getDJ().username + ' that song is in history!');
			API.moderateForceSkip();
		}
	}
}

if(settings.blacklist){
	var title = API.getMedia().title;
	for(var i = 0; i < backlist.length; i++){
		if(title.indexOf(blacklisti[i]) !=-1){
			API.sendChat('@' + API.getDJ().username + ' that song is blacklisted!');
			API.moderateForceSkip();
		}
	}
}

if(settings.smartReply){
	API.on(API.CHAT, function(data){
		msg = data.message.toLowerCase(), chatid = data.chatID, fromid = data.fromID, from = data.from;
		if(msg.indexOf('hi') !=-1){
			var replyHI = ['Yo!', 'Hey there!', 'Hi', 'What\'s up dud?', 'Wuddup bud', 'Hello!'];
			API.sendChat('@' + msg.from + replyHI[Math.floor(Math.random() * replyHI.length)]);
	 	}
	 	if(msg.indexOf('how are you?') !=-1){
	 		var replyHOW = ['I feel very botty!', 'Good!', 'Not much to say.', 'Alright.', 'Very good!'];
	 		API.sendChat('@' + msg.from + replyHOW[Math.floor(Math.random() * replyHOW.length)]);
	 	}
	 	if(msg.indexOf('fuck you') !=-1){
	 		var replyFck = ['Orlly m8? Fite me irl.', 'FITE ME DEN', 'Nah I\'m good', 'nop'];
	 		var replyFckEnd = ['kden. I\'ll kick you for 5 seconds.', 'KICKED (5secs)', 'I\'ll just kick u den...'];
	 		API.sendChat('@' + msg.from + replyFck[Math.floor(Math.random() * replyFck.length)]);
	 		setTimeout(function(){
	 			API.sendChat('@' + msg.from + replyFckEnd[Math.floor(Math.random() * replyFckEnd.length)]);
	 		}, 1000);
	 		setTimeout(function(){
	 			API.moderateBanUser(fromid, 1, API.BAN.HOUR);
	 		}, 3000);
	 		setTimeout(function(){
	 			API.moderateUnBanUser(fromid);
	 			API.sendChat('/em Kicked user can now login!');
	 		}, 8000);
	 	}
	});
}

if(settings.lockGuard){
	API.on(API.DJ_ADVANCE, function(a){
		switch(a){
		
			case '!lock':
				setTimeout(function(){
					guard.lock.warning = true;
					API.sendChat('/em [Warning] It has been 5 minutes since the waitlist has been locked!');
				}, 300000);
				setTimeout(function(){
					guard.lock.exit = true;
					API.sendChat('/em [Warning] It has been 15 minutes since the waitlist has been locked!');
				}, 900000);
				setTimeout(function(){
					guard.lock.warning = false;
					guard.lock.exit = false;
					API.sendChat('/em [Warning] 30 minutes have passed! Unlocking the waitlist!');
					API.moderateLockWaitLList(false);
				}, 1800000);
				break;
		}
	});
}

if(settings.cycleGuard){
	API.on(API.CHAT, function(a){
		switch(a){
			
			case '!cycle':
				setTimeout(function(){
					guard.cycle.warning = true;
					API.sendChat('/em [Warning] It has been 5 minutes since dj cycle has been enabled!');
				}, 300000);
				setTimeout(function(){
					guard.cycle.exit = true;
					API.sendChat('/em [Warning] It has been 5 minutes since dj cycle has been enabled!');
				}, 900000);
				setTimeout(function(){
					guard.cycle.warning = false;
					guard.cycle.exit = false;
					API.sendChat('/em [Warning] 30 minutes have passed! disabling dj cycle!');
				}, 1800000);
				break;
		}
	});
}

if(settings.timeGuard){
	var a = API.getMedia().title;
	var b = API.getTimeRemaining();
	if(b > 10){
		API.sendChat('[TimeGuard] ' + a + ' is more than 10 minutes! Skipping...');
		API.moderateForceSkip();
	}
}

var statusTime = Date.now();
var statusTimeArray = [];
statusTimeArray.push(statusTime);

var blacklist = [
	"Mediks - By A Thread (Ft. Georgina Upton) (Official Video)",
	"#SELFIE",
	"Trololol Song",
	"Hitler",
	"Gangnam Style",
	"Longarms Dubstep Remix",
	"Friday Rebecca Black",
	"Saturday Rebecca Black",
	"Hello Kitty",
	"Make My Weed"
	];

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

var fightArray = ['Array not found!'];

}catch(e){API.sendChat('/em An error has occurred on ' + Date() + ' for ' + e + '!');}
startup();
}else alert('This script is only authenticated for plug.dj/astroparty/!');
