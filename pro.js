//Array of words
const arrWords = [
    "Programming",
    "Code",
    "Javascript",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Internet",
    "Python",
    "Scala",
    "Styling",
    "Cascade",
    "Coding",
    "Funny",
    "Working",
    "Task",
    "Runner",
    "Test",
    "Rust",
];

// setting levels
const levels={
    "Easy": 6,
    "Normal": 5,
    "Difficult": 3,
};

// default level
let defaultLvl = "Normal",
    defaultSeconds = levels[defaultLvl];

// catch selector
let levelName = document.querySelector(".levelName"),
    duration = document.querySelector(".duration"),
    startButton = document.querySelector(".startButton"),
    theWord = document.querySelector(".theWord"),
    input = document.querySelector("input"),
    words = document.querySelector(".words"),
    leftTime = document.querySelector(".leftTime"),
    mark = document.querySelector(".mark"),
    fullMark = document.querySelector(".fullMark");

    levelName.innerHTML= defaultLvl;
    duration.innerHTML= defaultSeconds;
    leftTime.innerHTML= defaultSeconds;
    document.querySelector(".default").classList.add("selected");

//choose level
let lvl=defaultLvl,
    seconds=defaultSeconds;
let chooselevel = document.querySelectorAll(".levels span");
chooselevel.forEach(function(e){
    e.onclick=function(){
        chooselevel.forEach(function(ele){
            ele.classList.remove("selected");
        })
        e.classList.add("selected");
        lvl=document.querySelector(".selected").innerHTML;
        seconds=levels[lvl];
        //setting spans inner
        levelName.innerHTML= lvl;
        duration.innerHTML= seconds;
        leftTime.innerHTML= seconds;
    }

})
fullMark.innerHTML= arrWords.length;



//stop paste
input.onpaste=function(){
    return false;
}

//start button
startButton.onclick = function(){
    this.remove();
    input.focus();
    getWord();
    document.querySelector(".choseLevel").remove();
}

function getWord(){
    //get random word and its index
    let randomWord = arrWords[Math.floor(Math.random()*arrWords.length)],
        wordIndex = arrWords.indexOf(randomWord);
    //show word
    theWord.innerHTML=randomWord;
    //cut the word from array
    arrWords.splice(wordIndex, 1);
    //empty words place
    words.innerHTML="";
    //add every word to div
    for(let i=0 ; i<arrWords.length ; i++){
        let div = document.createElement("div");
        let text = document.createTextNode(arrWords[i]);
        div.appendChild(text);
        words.appendChild(div);
    }
    // call start play function
    startPlay();
}

function startPlay(){
    //set time
    leftTime.innerHTML=seconds;
    let start = setInterval(function(){
        leftTime.innerHTML--;
        if(leftTime.innerHTML==="0"){
            //stop timer
            clearInterval(start);
            //check if the anser is right
            if(input.value.toLowerCase()===theWord.innerHTML.toLowerCase()){
                //empty text input
                input.value="";
                //increase grade
                mark.innerHTML++;
                //check if still words in main array
                if(arrWords.length>0){
                    getWord();
                }
                else{
                    let endgame=document.createElement("div");
                    endgame.className="good";
                    let endgameText=document.createTextNode("Pravoo ^__^");
                    endgame.appendChild(endgameText);
                    document.querySelector(".finish").appendChild(endgame);
                }
            }
            else{
                //creat div for end game
                let endgame=document.createElement("div");
                endgame.className="bad";
                let endgameText=document.createTextNode("Game Over");
                endgame.appendChild(endgameText);
                document.querySelector(".finish").appendChild(endgame);
            }
        }
    }, 1000)
}
