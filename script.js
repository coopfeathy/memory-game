//painting the canvas
var canvas = document.getElementById("canvas");
var c = canvas.getContext("2d");



function drawShapes(difficulty){
    var total;
    var shapes;
    var items = [];

    if(difficulty == 1){
        total = 12;
        shapes = ["circle", "square", "triangle"];
    }
    if(difficulty == 2){
        total = 20; 
        shapes = ["circle", "square", "triangle", "star"];
    }
    if(difficulty == 3){
        total = 35;
        shapes = ["circle", "square", "triangle", "star", "heart"];
    }
    generate(total, shapes.length);

    for(var x=0; x<shapes.length; x++){
        for(var y=0; y<r[x]; y++){
            items.push(shapes[x]);
        }
    }
    shuffleArray(items);
    console.log(items);

    for (let index = 0; index < items.length; index++) {
        const element = items[index];
        if(element == "circle"){
            drawCircle();
        }
    }
    
}

var colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo','violet'];
var color = colors[Math.floor(Math.random() * colors.length)];

function drawCircle(){
    c.arc(100,100, 50, 0, 2 * Math.PI, false);
    c.fillStyle = color;
    c.fill();
    c.lineWidth = 5;
    c.strokeStyle = 'black';
    c.stroke();
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}



var r = [];
function generate(max, thecount) {
    
    var decimals = [];
    var currsum = 0;
    for(var i=0; i<thecount; i++) {
        r.push(Math.random());
        currsum += r[i];
    }

    var remaining = max;
    for(var i=0; i<r.length; i++) {
        var res = r[i] / currsum * max;
        r[i] = Math.floor(res);
        remaining -= r[i];
        decimals.push(res - r[i]);
    }

    while(remaining > 0){
        var maxPos = 0;
        var maxVal = 0;

        for(var i=0; i<decimals.length; i++){
            if(maxVal < decimals[i]){
                maxVal = decimals[i];
                maxPos = i;
            }
        }

        r[maxPos]++;
        decimals[maxPos] = 0; // We set it to 0 so we don't give this position another one.
        remaining--;
    }
}


function drawColors(){

}




//the dark view 
const container = document.querySelector('.container');
const view = document.querySelector('.view');

function showView(event) {
    view.removeAttribute('hidden');
    view.style.left = event.clientX - 125 + 'px';
    view.style.top = event.clientY - 125 + 'px';
    event.preventDefault();
}

function moveView(event) {
    view.style.left = event.clientX - 125 + 'px';
    view.style.top = event.clientY - 125 + 'px';
}

function hideView(event) {
    view.setAttribute('hidden', '');
}

container.onmousedown = showView;
container.onmousemove = moveView;
document.onmouseup = hideView;




//the quesions 
var pos = 0, test, test_status, question, choice, choices, chA, chB, chC, correct = 0;
var questions = [
  [ "What is 10 + 4?", "12", "14", "16", "B" ],
	[ "What is 20 - 9?", "7", "13", "11", "C" ],
	[ "What is 7 x 3?", "21", "24", "25", "A" ],
	[ "What is 8 / 2?", "10", "2", "4", "C" ]
];
function _(x){
	return document.getElementById(x);
}
function renderQuestion(){
	test = _("test");
	if(pos >= questions.length){
		test.innerHTML = "<h2>You got "+correct+" of "+questions.length+" questions correct</h2>";
		_("test_status").innerHTML = "Test Completed";
		pos = 0;
		correct = 0;
		return false;
	}
	_("test_status").innerHTML = "Question "+(pos+1)+" of "+questions.length;
	question = questions[pos][0];
	chA = questions[pos][1];
	chB = questions[pos][2];
	chC = questions[pos][3];
	test.innerHTML = "<h3>"+question+"</h3>";
	test.innerHTML += "<input type='radio' name='choices' value='A'> "+chA+"<br>";
	test.innerHTML += "<input type='radio' name='choices' value='B'> "+chB+"<br>";
	test.innerHTML += "<input type='radio' name='choices' value='C'> "+chC+"<br><br>";
	test.innerHTML += "<button onclick='checkAnswer()'>Submit Answer</button>";
}
function checkAnswer(){
	choices = document.getElementsByName("choices");
	for(var i=0; i<choices.length; i++){
		if(choices[i].checked){
			choice = choices[i].value;
		}
	}
	if(choice == questions[pos][4]){
		correct++;
	}
	pos++;
	renderQuestion();
}
window.addEventListener("load", renderQuestion, false);




