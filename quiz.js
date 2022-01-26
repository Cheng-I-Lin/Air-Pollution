var scaleX=(window.innerHeight/722)*100;
var scale=(window.outerHeight/824);
const text=document.getElementsByClassName("textContainer");
for(t of text){
    t.style.fontSize=scale*1.5+"em";
}
const text2=document.getElementsByClassName("pageText");
for(t of text2){
    t.style.fontSize=scale*1.75+"em";
}
const box=document.getElementsByClassName("box");
for(b of box){
    b.style.width=scale*b.offsetWidth+"px";
    b.style.height=scale*b.offsetHeight+"px";
}
document.getElementById("answerGrid").style.fontSize=scaleX+"%";
var air={
    x: 0,
    y: 0,
    ySpeed: 4,
    size: 25
}
const move={
    up: false,
    down: false,
    left: false,
    right: false
}
const grid=document.getElementById("grid");
var gameTime=20;
var pause=true;
var blockSize=30;
var qRandom=true;

function drawGame(){
    let canvas=document.getElementById("gameCanvas");
    let ds=canvas.getContext("2d");
    canvas.style.left=grid.offsetLeft+"px";
    canvas.style.top=grid.offsetTop+"px";
    canvas.width = grid.offsetWidth;
    canvas.height = grid.offsetHeight;
    ds.clearRect(canvas.left,canvas.top,canvas.width,canvas.height);/*Can use this as decoration
    ds.fillStyle="blue";
    ds.fillRect(air.x,air.y,air.size,air.size);*/
}
document.addEventListener("keydown", function(a){
    let control=a.code;
    switch(control){
        case "Enter":
            submitAns();
            break;
        default:
            break;
    }
});
var questions=["Where in Taiwan is the largest coal-fired power plant on earth located?(Hint: It is also the world’s single largest emitter of carbon dioxide, producing more than 40 million tons of CO2 every year, which is about the same CO2 output as Switzerland – as in the entire country.)"
,"Taiwan's industries have been a major source of air pollution in Taiwan, increasing the level of ______, an air pollutant that reduces visibility and causes the air to appear hazy, in the air and causing detrimental health effects."
,"What is the main source of air pollution in Taiwan?"];
var answers=["Taichung","PM2.5","Burning of fossil fuels"];
var questionNum=0;
var correctQuestion=[];
var actualQNum=0;
var lose=0;
var speed=1;
var pollutant=document.getElementById("pollutant");

grid.style.fontSize=scale*2+"em";
pollutant.style.fontSize=scale*0.65+"em";

pollutant.style.top="100%";
pollutant.style.left=(Math.random()*70)+"%";
if(qRandom){
    actualQNum=Math.floor(Math.random()*questions.length);
} else{
    actualQNum=0;
}
document.addEventListener("keydown", function(key){
    let control=key.code;
    //document.getElementById("hi").innerHTML=control;
    switch(control){
        case "ArrowUp":
            move.up=true;
            break;
        case "ArrowDown":
            move.down=true;
            break;
        case "ArrowLeft":
            move.left=true;
            break;
        case "ArrowRight":
            move.right=true;
            break;
        default:
            break;
    }
});
document.addEventListener("keyup", function(key){
    let control=key.code;
    switch(control){
        case "ArrowUp":
            move.up=false;
            break;
        case "ArrowDown":
            move.down=false;
            break;
        case "ArrowLeft":
            move.left=false;
            break;
        case "ArrowRight":
            move.right=false;
            break;
        default:
            break;
    }
});
function game(){
    pollutant.style.top=pollutant.offsetTop-speed+"px";
    document.getElementById("question").innerHTML=questions[actualQNum];
    if(pollutant.offsetTop+pollutant.offsetHeight==0){
        grid.style.border="red 3px solid";
        lose++;
    }
    if(pollutant.offsetTop+pollutant.offsetHeight<=-50){
        if(correctQuestion.length!=questions.length){
            while(correctQuestion.includes(actualQNum)){
                if(qRandom){
                    actualQNum=Math.floor(Math.random()*questions.length);
                } else{
                    if(actualQNum==questions.length-1){
                        actualQNum=0;
                    } else{
                        actualQNum++;
                    }
                }
            }   
        }
        pollutant.style.top="100%";
        pollutant.style.left=(Math.random()*70)+"%";
        grid.style.border="black 3px solid";
    }
}
function addQ(){
    questions.push("");
    answers.push("");
    imageURLs.push("");
    imgWidth.push("");
    imgHeight.push("");
    imgPositionX.push("");
    imgPositionY.push("");
    isPicMoved.push(false);
}
function minusQ(){
    if(questions.length>1){
        questions.pop("");
        answers.pop("");
        imageURLs.pop("");
        imgWidth.pop("");
        imgHeight.pop("");
        imgPositionX.pop("");
        imgPositionY.pop("");
        isPicMoved.pop("");
    }
}
function save(){
    let q=document.getElementById("setQuestion");
    let a=document.getElementById("setAns");
    questions[questionNum]=q.value;
    answers[questionNum]=a.value;
}
function submitAns(){
    let ans=document.getElementById("ans");
    //use lower case to check if right or wrong
    if((ans.value).toLowerCase()==answers[actualQNum].toLowerCase()){
        //This makes record which you got correct so won't ask this again when randomizing questions
        correctQuestion.push(actualQNum);
        if(correctQuestion.length!=questions.length){
            while(correctQuestion.includes(actualQNum)){
                if(qRandom){
                    actualQNum=Math.floor(Math.random()*questions.length);
                } else{
                    if(actualQNum==questions.length-1){
                        actualQNum=0;
                    } else{
                        actualQNum++;
                    }
                }
            }
        } else{
            document.getElementById("winPage").style.bottom="0%";
            grid.style.border="green 3px solid";
            pause=true;
        }
        document.getElementById("pollutant").style.top="100%";
    }
    ans.value="";
}
function submitQuestionNumber(){
    let q=document.getElementById("setQuestion");
    let a=document.getElementById("setAns");
    let num=document.getElementById("select");
    questionNum=num.value-1;
    q.value=questions[questionNum];
    a.value=answers[questionNum];
}
function openSettings(){
    let settings=document.getElementById("changeSettings");
    if(settings.style.bottom=="0%"){
        settings.style.bottom="100%";
        pause=false;
    } else{
        settings.style.bottom="0%";
        pause=true;
    }
}
function orderQuestions(){
    //ask questions in order
    qRandom=false;
}
function randomizeQuestions(){
    //randomly ask questions
    qRandom=true;
}
function reviewPage(){
    let r=document.getElementById("reviewVocab");
    if(r.style.bottom=="0%"){
        r.style.bottom="100%";
    } else{
        r.style.bottom="0%";
    }
    //slideNum=0;
}
function restart(){
    document.getElementById("losePage").style.bottom="100%";
    document.getElementById("winPage").style.bottom="100%";
    grid.style.border="black 3px solid";
    //reset all questions
    if(qRandom){
        actualQNum=Math.floor(Math.random()*questions.length);
    } else{
        actualQNum=0;
    }
    correctQuestion=[];
    lose=0;
    pause=false;
}
        function nextGame(){
            document.getElementById("intro").style.bottom="100%";
            pause=false;
        }
const slideLeft=document.getElementById("slideLeft");
const slideRight=document.getElementById("slideRight");
var slideNum=0;
slideLeft.addEventListener("mouseleave", function(){
    slideLeft.style.borderRightColor="rgba(0, 0, 0, 0.2)";
});
slideLeft.addEventListener("mouseover", function(){
    slideLeft.style.borderRightColor="rgb(241, 183, 94)";
});
slideRight.addEventListener("mouseleave", function(){
    slideRight.style.borderLeftColor="rgba(0, 0, 0, 0.2)";
});
slideRight.addEventListener("mouseover", function(){
    slideRight.style.borderLeftColor="rgb(241, 183, 94)";
});
const slide1=document.getElementById("slide1");
const slide2=document.getElementById("slide2");
const slide3=document.getElementById("slide3");
var showAnswer=false;
slideLeft.addEventListener("click", function(){
    showAnswer=false;
    slideLeft.style.display="none";
    slideRight.style.display="block";
    setTimeout(showLArrow,1000);
    slideNum--;
    slide1.style.opacity="1";
    slide2.style.opacity="1";
    slide3.style.opacity="1";
    if(parseInt(slide1.style.left)==100){
        slide1.style.opacity="0";
        slide1.style.left="-100%";
    } else{
        slide1.style.left=parseInt(slide1.style.left)+100+"%";
    }
    if(parseInt(slide2.style.left)==100){
        slide2.style.opacity="0";
        slide2.style.left="-100%";
    } else{
        slide2.style.left=parseInt(slide2.style.left)+100+"%";
    }
    if(parseInt(slide3.style.left)==100){
        slide3.style.opacity="0";
        slide3.style.left="-100%";
    } else{
        slide3.style.left=parseInt(slide3.style.left)+100+"%";
    }
    a1.style.opacity=0;
    a2.style.opacity=0;
    a3.style.opacity=0;
});
slideRight.addEventListener("click", function(){
    showAnswer=false;
    slideLeft.style.display="block";
    slideRight.style.display="none";
    //Delays the appearance of the arrows so the slides can't be spammed
    setTimeout(showRArrow,1000);
    slideNum++;
    slide1.style.opacity="1";
    slide2.style.opacity="1";
    slide3.style.opacity="1";
    if(parseInt(slide1.style.left)==-100){
        slide1.style.opacity="0";
        slide1.style.left="100%";
    } else{
        slide1.style.left=parseInt(slide1.style.left)-100+"%";
    }
    if(parseInt(slide2.style.left)==-100){
        slide2.style.opacity="0";
        slide2.style.left="100%";
    } else{
        slide2.style.left=parseInt(slide2.style.left)-100+"%";
    }
    if(parseInt(slide3.style.left)==-100){
        slide3.style.opacity="0";
        slide3.style.left="100%";
    } else{
        slide3.style.left=parseInt(slide3.style.left)-100+"%";
    }
    a1.style.opacity=0;
    a2.style.opacity=0;
    a3.style.opacity=0;
});
document.getElementById("card1").addEventListener("click",function(){
    showAnswer=true;
});
document.getElementById("card2").addEventListener("click",function(){
    showAnswer=true;
});
document.getElementById("card3").addEventListener("click",function(){
    showAnswer=true;
});
var gotCorrect=[];
var needWork=[];
var gotWrong=[];
function gotIt(){
    if(!gotCorrect.includes(slideNum+1)){
        gotCorrect.push(slideNum+1);
    } else{
        gotCorrect.splice(gotCorrect.indexOf(slideNum+1),1);
    }
    if(needWork.includes(slideNum+1)){
        needWork.splice(needWork.indexOf(slideNum+1),1);
    }
    if(gotWrong.includes(slideNum+1)){
        gotWrong.splice(gotWrong.indexOf(slideNum+1),1);
    }
}
function needPractice(){
    if(!needWork.includes(slideNum+1)){
        needWork.push(slideNum+1);
    } else{
        needWork.splice(needWork.indexOf(slideNum+1),1);
    }
    if(gotCorrect.includes(slideNum+1)){
        gotCorrect.splice(gotCorrect.indexOf(slideNum+1),1);
    }
    if(gotWrong.includes(slideNum+1)){
        gotWrong.splice(gotWrong.indexOf(slideNum+1),1);
    }
}
function incorrect(){
    if(!gotWrong.includes(slideNum+1)){
        gotWrong.push(slideNum+1);
    } else{
        gotWrong.splice(gotWrong.indexOf(slideNum+1),1);
    }
    if(gotCorrect.includes(slideNum+1)){
        gotCorrect.splice(gotCorrect.indexOf(slideNum+1),1);
    }
    if(needWork.includes(slideNum+1)){
        needWork.splice(needWork.indexOf(slideNum+1),1);
    }
}
var url=document.getElementById("url");
var img=document.getElementById("img");
var circle=document.getElementById("circleImg");
var imageURLs=["","",""];
var imgWidth=["","",""];
var imgHeight=["","",""];
var imgPositionX=["","",""];
var imgPositionY=["","",""];
var isPicMoved=[false,false,false];
function imgURL(){
    if(url.value==""){
        img.style.display="none";
    } else{
        img.style.display="block";
    }
    imgWidth[slideNum]="auto";
    imgHeight[slideNum]="auto";
    isPicMoved[slideNum]=false;
    imageURLs[slideNum]=url.value;
    url.value="";
}
var selectImage=false;
circle.addEventListener("mouseover",function(){
    selectImage=true;
});
circle.addEventListener("mouseleave", function(){
    selectImage=false;
});
img.addEventListener("mouseover", function(){
    selectImage=true;
});
img.addEventListener("mouseover", function(){
    selectImage=false;
});
function enlarge(){
    //Use percentage of width/height to scale properly
    imgWidth[slideNum]=img.offsetWidth*1.1+"px";
    imgHeight[slideNum]=img.offsetHeight*1.1+"px";
}
function reduce(){
    imgWidth[slideNum]=img.offsetWidth/1.1+"px";
    imgHeight[slideNum]=img.offsetHeight/1.1+"px";
}
function closeImage(){
    imageURLs[slideNum]="";
}
function centerImage(){
    imgPositionX[slideNum]="0px";
    imgPositionY[slideNum]=(circle.offsetHeight/2-img.offsetHeight/2)+"px";
}
        setInterval(function(){  
            let max=document.getElementById("maximize");
            let min=document.getElementById("minimize");
            if(selectImage&&imageURLs[slideNum]!=""){
                circle.style.backgroundColor="rgb(241, 183, 94)";
                max.style.display="block";
                min.style.display="block";
                if(move.up){
                    imgPositionY[slideNum]=parseInt(imgPositionY[slideNum])-1+"px";
                    isPicMoved[slideNum]=true;
                }
                if(move.down){
                    imgPositionY[slideNum]=parseInt(imgPositionY[slideNum])+1+"px";
                    isPicMoved[slideNum]=true;
                }
                if(move.left){
                    imgPositionX[slideNum]=parseInt(imgPositionX[slideNum])-1+"px";
                    isPicMoved[slideNum]=true;
                }
                if(move.right){
                    imgPositionX[slideNum]=parseInt(imgPositionX[slideNum])+1+"px";
                    isPicMoved[slideNum]=true;
                }
            } else{
                circle.style.backgroundColor="white";
                max.style.display="none";
                min.style.display="none";
            }
            if(imageURLs[slideNum]==""){
                img.style.display="none";
            } else{
                img.style.display="block";
            }
            img.src=imageURLs[slideNum];
            if(!isPicMoved[slideNum]){
                imgPositionX[slideNum]="0px";
                imgPositionY[slideNum]=(circle.offsetHeight/2-img.offsetHeight/2)+"px";
            }
            img.style.width=imgWidth[slideNum];
            img.style.height=imgHeight[slideNum];
            img.style.left=imgPositionX[slideNum];
            img.style.top=imgPositionY[slideNum];
            document.getElementById("numOfQuestions").innerHTML=questions.length;
            //sets the max input value to the number of questions present
            document.getElementById("select").setAttribute("max",questions.length);
            //document.getElementById("op").innerHTML=actualQNum+"     lose pt   "+lose+"    "+correctQuestion.length+" "+questions.length;//+"    "+document.getElementById("ans").value;
            document.getElementById("speedValue").innerHTML=document.getElementById("pollutantSpeed").value;
            speed=document.getElementById("pollutantSpeed").value;
            let background=document.getElementById("background");
            if(grid.style.borderColor=="black"){
                background.style.backgroundColor="white";
            } else {
                background.style.backgroundColor=grid.style.borderColor;
            }
            //can restart here
            if(lose==3){
                pause=true;
                document.getElementById("losePage").style.bottom="0%";
            }
            if(slideNum==0){
                slideLeft.style.display="none";
            }
            if(slideNum==questions.length-1){
                slideRight.style.display="none";
            }
            //Change question and answer based on slidenum
            let q1=document.getElementById("q1");
            let a1=document.getElementById("a1");
            let q2=document.getElementById("q2");
            let a2=document.getElementById("a2");
            let q3=document.getElementById("q3");
            let a3=document.getElementById("a3");
            let q="";
            let a="";
            q=questions[slideNum];
            a=answers[slideNum];
            document.getElementById("flashQNum").innerHTML=slideNum+1;
            let flashcards=document.getElementById("flashcards");
            //document.getElementById("hi").innerHTML=img.offsetLeft;
            if(slide1.style.left=="0%"){
                q1.innerHTML=q;
                if(showAnswer){
                    a1.innerHTML=a;
                    a1.style.opacity=1;
                }
                if(gotCorrect.includes(slideNum+1)){
                    flashcards.style.border="green 5px solid";
                } else if(needWork.includes(slideNum+1)){
                    flashcards.style.border="blue 5px solid";
                } else if(gotWrong.includes(slideNum+1)){
                    flashcards.style.border="red 5px solid";
                } else{
                    flashcards.style.border="black 5px solid";
                }
            } else if(slide2.style.left=="0%"){
                q2.innerHTML=q;
                if(showAnswer){
                    a2.innerHTML=a;
                    a2.style.opacity=1;
                }
                if(gotCorrect.includes(slideNum+1)){
                    flashcards.style.border="green 5px solid";
                } else if(needWork.includes(slideNum+1)){
                    flashcards.style.border="blue 5px solid";
                } else if(gotWrong.includes(slideNum+1)){
                    flashcards.style.border="red 5px solid";
                } else{
                    flashcards.style.border="black 5px solid";
                }
            } else{
                q3.innerHTML=q;
                if(showAnswer){
                    a3.innerHTML=a;
                    a3.style.opacity=1;
                }
                if(gotCorrect.includes(slideNum+1)){
                    flashcards.style.border="green 5px solid";
                } else if(needWork.includes(slideNum+1)){
                    flashcards.style.border="blue 5px solid";
                } else if(gotWrong.includes(slideNum+1)){
                    flashcards.style.border="red 5px solid";
                } else{
                    flashcards.style.border="black 5px solid";
                }
            }
            //check when to pause game
            if(document.getElementById("intro").style.bottom=="0%"){
                pause=true;
            }
        });
        function showLArrow(){
            slideLeft.style.display="block";
        };
        function showRArrow(){
            slideRight.style.display="block";
        };
        setInterval(function(){
            if(!pause){
                drawGame();
                game();   
            }
        },gameTime);
        //click on img to move it like spacesurvivor using arrow keys and show buttons to enlarge, small it