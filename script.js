document.body.onload = generateButtons;
let shown = false;
let presses = 0;

function generateButtons() {
    for(let i = 1; i <= 100; i++) {
        let button = document.createElement("button");
        button.className = "button";
        button.id = "button" + i;
        button.addEventListener("click", function() {
            changeColor(button.id)
        });
        document.body.appendChild(button);
        if (i % 10 == 0){
            document.body.appendChild(document.createElement("br"));
        }
    }
    
    document.body.appendChild(document.createElement("br"));
    let stepButton = document.createElement("button");
    stepButton.innerHTML = "Step";
    stepButton.addEventListener("click", step);
    document.body.appendChild(stepButton);

    let runButton = document.createElement("button");
    runButton.id = "runButton";
    runButton.innerHTML = "Run";
    runButton.addEventListener("click", runClicked);
    document.body.appendChild(runButton);

    let clearButton = document.createElement("button");
    clearButton.innerHTML = "Clear"
    clearButton.addEventListener("click", clear);
    document.body.appendChild(clearButton);

    let random = document.createElement("button");
    random.innerHTML = "Randomize"
    random.addEventListener("click", randomize);
    document.body.appendChild(random);

    let instruction = document.createElement("button");
    instruction.innerHTML = "Show Instructions"
    instruction.addEventListener("click", instructions);
    document.body.appendChild(instruction);
}

function runClicked(){
    presses++;
    run();
}

function run(){
    step();
    if (presses%2 === 1){
        document.getElementById("runButton").innerHTML = "Stop";
        let timer = setTimeout(run, 100);
    } else {
        document.getElementById("runButton").innerHTML = "Run";
    }
}

function randomize(){
    const colors = ["#FFFFCC", "#DDDDDD", "#228B22"]
    for (let i = 1; i <= 100; i++) {
        let button = document.getElementById("button"+i);
        button.style.background = colors[Math.floor(Math.random() * 3)]
    }
}

function changeColor(id) {
    let btn = document.getElementById(id);
    //If grey turn yellow
    if (getComputedStyle(btn).getPropertyValue("background-color") == "rgb(221, 221, 221)"){
        btn.style.background="#FFFFCC";
    }
    //If yellow turn green
    else if (getComputedStyle(btn).getPropertyValue("background-color") == "rgb(255, 255, 204)"){
        btn.style.background = "#228B22";
    //If green turn grey
    } else if (getComputedStyle(btn).getPropertyValue("background-color") == "rgb(34, 139, 34)"){
        btn.style.background="#DDDDDD";
    }
}

function clear(){
    for(let i = 1; i <= 100; i++) {
        let button = document.getElementById("button"+i);
        button.style.background="#DDDDDD";
    }
}

function step(){
    let yellows = [];
    let greens = [];
    for(let i = 1; i <= 100; i++) {
        let button = document.getElementById("button"+i);
        if (alive(i)){
            neighbors = getNeighbors(i);
            if (neighbors <= 1 || neighbors >= 4){
                if (getComputedStyle(button).getPropertyValue("background-color") == "rgb(34, 139, 34)"){
                    yellows.push(i);
                }
            } else {
                if (getComputedStyle(button).getPropertyValue("background-color") == "rgb(34, 139, 34)"){
                    greens.push(i);
                } else {
                    yellows.push(i);
                }
            }
        } else {
            neighbors = getNeighbors(i);
            if (neighbors == 3){
                yellows.push(i);
            } if (neighbors == 5){
                greens.push(i);
            }
        }
    } changeAllColors(yellows, greens);
}

function changeAllColors(yellows, greens){
    clear();
    for (i of yellows){
        let button = document.getElementById("button"+i)
        button.style.background = "#FFFFCC";
    } for (i of greens){
        let button = document.getElementById("button"+i)
        button.style.background = "#228B22";
    }
}

function alive(id){
    let cell = document.getElementById("button" + id);
    if (getComputedStyle(cell).getPropertyValue("background-color") != "rgb(221, 221, 221)"){
        return true;
    } return false;
}

function getNeighbors(i){
    //Check behind
    neighbors = 0;
    if (i%10 != 1){
        if (alive(i-1)){
            neighbors++;
        }
    }
    //Check front
    if (i%10 != 0){
        if (alive(i+1)){
            neighbors++;
        }
    }
    //Check above
    if (i>10){
        if (alive(i-10)){
            neighbors++;
        }
        //Check upper right
        if (i%10 != 1){
            if (alive(i-11)){
                neighbors++;
            }
        }
        //Check upper left
        if (i%10 != 0){
            if (alive(i-9)){
                neighbors++;
            }
        }
    }
    //Check below
    if (i<=90){
        if (alive(i+10)){
            neighbors++;
        }
        //Check lower right
        if (i%10 != 1){
            if (alive(i+9)){
                neighbors++;
            }
        }
        //Check lower left
        if (i%10 != 0){
            if (alive(i+11)){
                neighbors++;
            }
        }
    } return neighbors;
}

function instructions(){
    if (!shown){
        let list = document.createElement("ul")
        let inst1 = document.createElement("li");
        inst1.innerHTML = "Each yellow or green square represent a living cell";
        list.appendChild(inst1);

        let inst2 = document.createElement("li");
        inst2.innerHTML = "If there are 1 or 0 living cells around a living cell, it dies of loneliness";;
        list.appendChild(inst2);

        let inst3 = document.createElement("li");
        inst3.innerHTML = "If there are more than 4 living cells around a living cell, it dies of overpopulation";
        list.appendChild(inst3);

        let inst4 = document.createElement("li");
        inst4.innerHTML = "If there are 3 living cells around an empty space, it comes to life";
        list.appendChild(inst4);

        let inst5 = document.createElement("li");
        inst5.innerHTML = "Green cells will survive one deadly event, and will turn yellow when this happens (fan club doesnt want cells to die)";
        list.appendChild(inst5);

        let inst6 = document.createElement("li");
        inst6.innerHTML = "If there are 5 living cells around an empty space, it comes to life as a green cell";
        list.appendChild(inst6);

        let inst7 = document.createElement("li");
        inst7.innerHTML = "Click cells to make them come to life/change color";
        list.appendChild(inst7);

        document.body.appendChild(list);
        shown = true;
    } 
}