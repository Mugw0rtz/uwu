let question = [
    {
      num: 1,
      title: "In JavaScript, what value is returned by default when a function doesn't have a return statement?",
      option: ["0", "undefined", "null", "-1"],
      ans: "b"
    },
    {
      num: 2,
      title: "Which event occurs when the user clicks on an HTML element?",
      option: ["onmouseover", "onchange", "onmouseclick", "onclick"],
      ans: "d"
    },
    {
      num: 3,
      title: "Are you google because you are everything _______.",
      option: ["i'm running for", "i'm dreaming of", "i'm searching for", "i'm looking for"],
      ans: "c"
    },
    {
      num: 4,
      title: "Are you a 90 degree angle? because ______.",
      option: ["You are looking tight!", "You are looking right!", "You are looking correct!", "You are on fleek!"],
      ans: "b"
    },
    {
      num: 5,
      title: "On a scale from 1 to 10, you're a 9...",
      option: ["and I am the one you need.", "and I am the one you want.", "and i'm 10.", "I am and the one you need."],
      ans: "a"
    }
  ];
  
  let abc = ["a", "b", "c", "d"];
  let sum = 0;
  let interval;
  let opt;
  let startBox = document.querySelector(".starter");
  let container = document.querySelector(".container");
  let queBox = document.querySelector(".question-box");
  let nextBtn = document.getElementById("next-btn");
  let finishBtn = document.getElementById("finish-btn");
  let timerDiv = document.querySelector(".timer");
  let resultBox = document.querySelector(".result-box");
  let index = 0;
  const eachTime = 30;
  let timeLimit = question.length * eachTime;
  const fixedTime = timeLimit;
  // start quiz
  function startQuiz(starter) {
    startBox.classList.add("hide");
    container.classList.remove("hide");
    interval = setInterval(timer, 1000);
  }
  
  for (i = 0; i < question.length; i++) {
    queBox.innerHTML +=
      `<div class='section' id='${question[i].num}'>` +
      `<p class='title'>${question[i].title}</p>` +
      `</div>`;
    let section = queBox.querySelectorAll(".section");
    for (k = 0; k < 4; k++) {
      section[
        i
      ].innerHTML += `<div id='${abc[k]}'>(${abc[k]}) ${question[i].option[k]}</div>`;
    }
  }
  section = queBox.querySelectorAll(".section");
  section.forEach((section1) => {
    opt = section1.querySelectorAll("div");
    let input = document.createElement("input");
    input.hidden = true;
    input.readOnly = true;
    section1.appendChild(input);
    opt.forEach((opt1) => {
      opt1.onclick = (e) => {
        section1.querySelectorAll("div").forEach((optR) => {
          optR.classList.remove("selected");
        });
        opt1.classList.add("selected");
        input.value = e.target.id;
      };
    });
  });
  
  function increament() {
    index++;
    if (index < question.length) {
      queBox.style.transform = `translateX(${-section[0].offsetWidth * index}px)`;
    }
    if (index == question.length - 1) {
      nextBtn.classList.add("hide");
      finishBtn.classList.remove("hide");
    }
  }
  nextBtn.onclick = () => {
    increament();
  };
  
  finishBtn.onclick = () => {
    clearInterval(interval);
    index = 0;
    container.classList.add("hide");
    resultBox.classList.remove("hide");
    for (j = 0; j < section.length; j++) {
      if (section[j].querySelector("input").value == question[j].ans) {
        sum++;
        section[j].querySelector(".selected").innerHTML +=
          "<i class='fa fa-check ricon'></i>";
      } else if (section[j].querySelector(".selected")) {
        section[j].querySelector(".selected").classList.add("wrong");
        section[j].querySelector(".selected").innerHTML +=
          "<i class='fa fa-times ricon'></i>";
      }
    }
    resultBox.querySelector("#got-num").innerHTML = sum;
    resultBox.querySelector("#total-num").innerHTML = question.length;
  };
  function replay() {
    sum = 0;
    index = 0;
    timeLimit = fixedTime;
    clearInterval(interval);
    interval = setInterval(timer, 1000);
  
    container.classList.remove("hide");
    resultBox.classList.add("hide");
    nextBtn.classList.remove("hide");
    finishBtn.classList.add("hide");
    queBox.style.transform = `translateX(0px)`;
    queBox.style.pointerEvents = "initial";
    queBox.querySelectorAll("div").forEach((opt2) => {
      opt2.classList.remove("selected", "correct", "wrong");
    });
    queBox.querySelectorAll(".ricon").forEach((ricon) => {
      ricon.remove();
    });
    queBox.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
  }
  function resultShow() {
    index = 0;
    sum = 0;
    container.classList.remove("hide");
    resultBox.classList.add("hide");
    nextBtn.classList.remove("hide");
    finishBtn.classList.remove("hide");
    queBox.style.transform = `translateX(0px)`;
    for (m = 0; m < question.length; m++) {
      section[m].querySelector(`#${question[m].ans}`).classList.add("correct");
    }
    queBox.style.pointerEvents = "none";
  }
  // timer start

  let min = (timeLimit / 60).toString().split(".")[0];
  let sec = timeLimit % 60;
  if (min < 10) min = "0" + min;
  if (sec < 10) sec = "0" + sec;
  timerDiv.innerHTML = min + " : " + sec;
  function timer() {
    timeLimit--;
    min = (timeLimit / 60).toString().split(".")[0];
    sec = timeLimit % 60;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;
    if (timeLimit == 0) {
      clearInterval(interval);
      nextBtn.classList.add("hide");
      finishBtn.classList.remove("hide");
      queBox.style.pointerEvents = "none";
    }
    timerDiv.innerHTML = min + " : " + sec;
  }
  //timer end
  document.onkeydown = (e) => {
    e.preventDefault();
    if (e.keyCode == 13 && index + 1 < question.length) {
      increament();
    }
  };
  window.onresize = () => {
    queBox.style.transform = `translateX(${-section[0].offsetWidth * index}px)`;
  };
  window.oncontextmenu = (e) => {
    e.preventDefault();
  };
  