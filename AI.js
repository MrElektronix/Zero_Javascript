window.addEventListener("load", function() {
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext('2d');
	ctx.font = "30px Arial";

	Questions = [];
	Answers = [];
	NumberOfListItemArray = [];

	You = document.getElementById("you");
	ai_text = document.getElementById("ai");
	Question = document.getElementById("askinput");
	Answer = document.getElementById("answerinput");
	// LearnedDivKopje = document.getElementById("LearnedDivKopje");
	ai_text.style.fontSize = "25px";

	ai_text.innerHTML = Zero.name + ": " + "Hello my name is Zero";

	//document.getElementById("learnedlist").addEventListener("click", ShowList);
	//document.getElementById("happy_emotion").addEventListener("click", HappyEmotion);
	//document.getElementById("neutral_emotion").addEventListener("click", NeutralEmotion);
	//document.getElementById("sad_emotion").addEventListener("click", SadEmotion);

	setInterval(StartUp, 1000);
	setInterval(FoodDecrease, 1000);
});

var Zero = {
		name: "Zero",
		health: 100,
		hunger: 100,
		iq: 0,
		width: 100,
		height: 100 
}

function FoodDecrease() {
	Zero.hunger -= Math.floor(Math.random()*10);
	if (Zero.hunger < 50) {
		Zero.hunger = 100;
	}

}

function StartUp() {
	//var w = window.innerWidth;
	//var h = window.innerHeight;

	var chatboxstyle = document.getElementById("chatbox");
	chatboxstyle.style.height = ((canvas.height / 2 ) - 100) + "px";

	var learnboxstyle = document.getElementById("learnbox");
	learnboxstyle.style.height = (canvas.height / 2) + "px";

	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ZeroStats();
	MakeZero();
	//document.getElementById("happy_emotion").addEventListener("click", StartHappyEmotion);
	
	// Date
	var d = new Date();
	var weekday = new Array(7);
	weekday[0]=  "Sunday";
	weekday[1] = "Monday";
	weekday[2] = "Tuesday";
	weekday[3] = "Wednesday";
	weekday[4] = "Thursday";
	weekday[5] = "Friday";
	weekday[6] = "Saturday";
	var Day = "Day: " + weekday[d.getDay()];
	ctx.fillText(Day,10,90);

	// Time
	function addZero(i) { //function for adding a Zero to the time;
		if (i < 10) {
			i = "0" + i;
		}
		return i;
	}
	function StartHappyEmotion() {
		setInterval(HappyEmotion, 100)
	}

	var d = new Date();
	var h = addZero(d.getHours());
	var m = addZero(d.getMinutes());
	var s = addZero(d.getSeconds());
	var Time = "Time: " + h + ":" + m + ":" + s;
	ctx.fillText(Time,10,130);

	function HappyEmotion() {
		//ctx.clearRect(0,0, canvas.width, canvas.height)
		ctx.moveTo(20,20);
		ctx.bezierCurveTo(200,100,200,100,200,20);
		ctx.stroke();

		//setInterval(HappyEmotion, 1000)

	}
}

function ZeroStats() {
	// Name
	var Name = "Name: " + Zero.name;
	ctx.fillText(Name,10,50);

	// Health
	var Health = "Health: " + Zero.health;
	ctx.fillText(Health,800,50);

	// Hunger
	var Hunger = "Hunger: " + Zero.hunger;
	ctx.fillText(Hunger,800,90);

	// IQ
	var IQ = "IQ: " + Zero.iq;
	ctx.fillText(IQ,800,130);
}

function MakeZero() {
	Zero.x = (canvas.width / 2 - (Zero.width / 2))
	Zero.y = (canvas.height / 2)
	ctx.fillStyle = "black";
	ctx.fillRect(Zero.x, Zero.y, Zero.width, Zero.height);
}

document.onkeydown = function(evt) {
	Chat = document.getElementById("chatinput");
	var Enter = 13;

	if (evt.keyCode == Enter && Question.value == "" && Answer.value == "" && Chat.value != "") {
		Typing();
	}

	if (evt.keyCode == Enter && Question.value != "" && Answer.value != "" && Chat.value == "") {
		Ai_Chat();
	}
}

function Typing() {
	You.style.font = "30px Arial";
	You.innerHTML = "You: " + Chat.value;

	AiEmpty = ["Error &*##%&/)o_o/)",
				"I do not understand you!",
				"I do not speak Moron!",
				"I did not learn this!",
				"Denied!",
				"Error: 404 word not found",
				"What language is that?"];

	if (Chat.value 	!= "" && Question.value == "" || Answer.value == "") {
		ai_text.innerHTML = Zero.name + ": " + "I have not learned anything";
	}


	for (j = 0; j < Questions.length; j++) {
		var a = Questions[j];
		if (Chat.value == a) {
			//alert("Question matched Chat value");
			ai_text.innerHTML = Zero.name + ": " + Answers[j];
			//setTimeout(function(){Chat.value = ""}, 100);
			break;
			//console.log("J: " + j);
			//console.log("Question J: " + Questions[j]);
			//console.log("Length: " + Questions.length);
		}
		else {
			//alert("Question did not match Chat value");
			ai_text.innerHTML = "";
			var RandomNummerAi = Math.floor(Math.random()*AiEmpty.length);
			ai_text.innerHTML = Zero.name + ": " + (AiEmpty[RandomNummerAi - 1]);
			//setTimeout(function(){Chat.value = ""}, 100);
			//console.log("J2: " + j);
			//console.log("Question J2: " + Questions[j]);
			//console.log("Length2: " + Questions.length);
		}
	}
	setTimeout(function(){Chat.value = ""}, 100);
}

function Ai_Chat() {
	ai_text.innerHTML = "";
	Zero.iq += 1;
	Questions.push(Question.value);
	Answers.push(Answer.value);
	clearAndShow ();
	LearnedDiv.innerHTML = "";

	//Check if first letter is Capital AND if last character is ?
	for (i = 0; i < Question.value.length; i++) {
		if (Question.value[i] === Question.value[i].toUpperCase()) {
			console.log(Question.value.toLowerCase());
		}
	}
	/*
	function removeLastPlus(str) {
		if (str.slice(-1) == '+') {
			return str.slice(0, -1);  
		}
		return str;
	}
	*/

	ArrayNames(Questions);
}

function ArrayNames(arrayname) {
	var NumberOfListItemsArray = [];
	var NumberOfListItems = 0;
	var LearnedDiv = document.getElementById("LearnedDiv");
	//LearnedDivKopje.innerHTML = "Learned Words List";
	for (i = 0; i < arrayname.length; i++){
		NumberOfListItems++;
		NumberOfListItemsArray.push(NumberOfListItems);
		//var h = NumberOfListItemsArray[i] + ". " + arrayname[i];
		var h = NumberOfListItems + ". " + arrayname[i];
		var h3 = document.createElement('h3');
		var t = document.createTextNode(h);
		h3.appendChild(t);
		LearnedDiv.appendChild(h3);
	}
}

function clearAndShow() {
	//ai_text.innerHTML = "AI: " + Questions;
	setTimeout(function(){Question.value = ""}, 100);
	setTimeout(function(){Answer.value = ""}, 100);
}

/*
function ShowList() {
	var NumberOfListItem = 0;
	var haha = document.getElementById("LearnedDiv");
	//document.getElementById("LearnedDiv").removeChild(h1);
	for (k = 0; k < Questions.length; k++){
		NumberOfListItem++;
		NumberOfListItemArray.push(NumberOfListItem);
		var h = NumberOfListItemArray[k] + ". " + Questions[k];
		var h3 = document.createElement('h3');
		var t = document.createTextNode(h);
		h3.appendChild(t);
		haha.appendChild(h3);
		//setTimeout(function(){haha.removeChild(h3)}, 1000);
	}
}
*/
