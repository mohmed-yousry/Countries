let body = document.querySelector("body");
let btnDark = document.querySelector(".dark-btn");
let containerData = document.querySelector(".content .container");
let selectRegion = document.querySelector(".search .container select");
function addDAta(arr, stat) {
  for (let i = 0; i < arr.length; i++) {
    let namess = arr[i].name;
    let namess2 = arr[i].name.common;
    let col = document.createElement("div");
    col.className = `col`;
    col.innerHTML = `
        <a href = "../pages/datels.html">
        <div class="card">
        <img src="${arr[i].flags.png}" alt="" />
          <div class="card-body">
         <h4 class="card-title">${stat ? namess : namess2}</h4>
          <p class="card-text">population : <span>${
            arr[i].population
          }</span></p>
          <p class="card-text">Region : <span class = "Region">${
            arr[i].region
          }</span></p>
          <p class="card-text">Capital : <span class = "capt">${
            arr[i].capital
          }</span></p>
          </div>
          </div>
          </a>
          `;
    containerData.appendChild(col);
    let nav = document.querySelector("nav");
    if (nav.classList.contains("dark")) {
      col.classList.add("dark");
    }
  }

  clickce();
}

fetch(`https://restcountries.com/v2/all`)
  .then((resbone) => resbone.json())
  .then((arrdata) => {
    addDAta(arrdata, true);
  })
  .catch((err) => {
    console.log(err);
  })

  .then((filter) => {
    selectRegion.addEventListener("change", function (ch) {
      if (ch.target.value != "Filter by Reagion") {
        let recoust = new XMLHttpRequest();
        recoust.onload = function () {
          if (this.status == 200 && this.readyState == 4) {
            let dataCaree = JSON.parse(recoust.response);
            containerData.innerHTML = ``;
            addDAta(dataCaree, false);
          }
        };
        recoust.open(
          "get",
          `https://restcountries.com/v3.1/region/${ch.target.value}`,
          true
        );
        recoust.send();
      } else {
        let recoust = new XMLHttpRequest();
        recoust.onload = function () {
          if (this.status == 200 && this.readyState == 4) {
            let dataCaree = JSON.parse(recoust.response);
            containerData.innerHTML = ``;
            addDAta(dataCaree, true);
          }
        };
        recoust.open("get", `https://restcountries.com/v2/all`, true);
        recoust.send();
      }
    });
  })

  .then((filterWord) => {
    let inputSeacrh = document.querySelector("input");
    inputSeacrh.onkeyup = function () {
      let allCol2 = Array.from(
        document.querySelectorAll(".content .container .col")
      );
      for (let i = 0; i < allCol2.length; i++) {
        allCol2[i].style.display = `none`;
        if (inputSeacrh.value == "") {
          allCol2[i].style.display = `grid`;
        } else if (inputSeacrh.value.startsWith(inputSeacrh.value)) {
          if (
            allCol2[i].children[0]
              .getElementsByClassName("card-title")[0]
              .innerHTML.startsWith(inputSeacrh.value)
          ) {
            allCol2[i].style.display = "grid";
          }
        }
      }
    };
  })

  .then((dark) => {
    btnDark.addEventListener("click", function () {
      let allCol2 = Array.from(
        document.querySelectorAll(".content .container .col")
      );
      body.classList.toggle("dark");
      allCol2.forEach((e) => {
        e.classList.toggle("dark");
      });
      document.querySelector(".nav-header").classList.toggle("dark");
      document
        .querySelector(".search .container select")
        .classList.toggle("dark");
      document
        .querySelector(".search .container input")
        .classList.toggle("dark");
      document.querySelector(".input-search   i").classList.toggle("dark");
    });
  });


function clickce() {
  let allCol = Array.from(
    document.querySelectorAll(".content .container .col")
  );

  for (let i = 0; i < allCol.length; i++) {
    allCol[i].addEventListener("click", function () {
      sessionStorage.setItem(
        "contry",
        allCol[i].children[0].getElementsByClassName("card-title")[0].innerHTML
      );
    });
  }
}
