// dark mode
let body = document.querySelector("body");
let btnDark = document.querySelector(".dark-btn");
let containerData = document.querySelector(".content .container");

// dark mode

// get infromion Api
let selectRegion = document.querySelector(".search .container select");
let contry;

// async function getDAta() {
//   let AllDAta;

//   AllDAta = await fetch("https://restcountries.com/v2/all");
//   let alldata2 = await AllDAta.json();
//   for (let i = 0; i < alldata2.length; i++) {
//     let col = document.createElement("div");
//     col.className = `col`;
//     col.innerHTML = `
//     <a href = "../pages/datels.html">
//     <div class="card">
//     <img src="${alldata2[i].flags.png}" alt="" />
//       <div class="card-body">
//       <h4 class="card-title">${alldata2[i].name}</h4>
//       <p class="card-text">population : <span>${alldata2[i].population}</span></p>
//       <p class="card-text">Region : <span class = "Region">${alldata2[i].region}</span></p>
//       <p class="card-text">Capital : <span class = "capt">${alldata2[i].capital}</span></p>
//       </div>
//       </div>
//       </a>
//     `;

//     allCol2.push(col);
//     containerData.appendChild(col);
//   }

//   //  ايجاد الدولة التى يتم الضغط عليها

//   for (let x = 0; x < allCol2.length; x++) {
//     allCol2[x].addEventListener("click", function (t) {
//       contry =
//         allCol2[x].children[0].getElementsByClassName("card-title")[0]
//           .innerHTML;

//       sessionStorage.setItem("contry", contry);
//       // window.open("../pages/datels.html", "");
//     });
//   }
//   //  ايجاد الدولة التى يتم الضغط عليها

//   // filte in select
//   selectRegion.addEventListener("change", function (ch) {
//     for (let i = 0; i < allCol2.length; i++) {
//       allCol2[i].style.display = "none";
//       if (ch.target.value == "Filter by Reagion") {
//         allCol2[i].style.display = "grid";
//       } else if (
//         allCol2[i].children[0].getElementsByClassName("Region")[0].innerHTML ==
//         ch.target.value
//       ) {
//         console.log();
//         allCol2[i].style.display = `grid`;
//       }
//     }
//   });
//   // filte in select
//   // Filter search
//   let inputSeacrh = document.querySelector("input");
//   inputSeacrh.onkeyup = function () {
//     selectRegion.options[0].setAttribute("selected", "");
//     for (let i = 0; i < allCol2.length; i++) {
//       allCol2[i].style.display = `none`;

//       if (inputSeacrh.value == "") {
//         allCol2[i].style.display = `grid`;
//       } else if (inputSeacrh.value.startsWith(inputSeacrh.value)) {
//         if (
//           allCol2[i].children[0]
//             .getElementsByClassName("card-title")[0]
//             .innerHTML.startsWith(inputSeacrh.value)
//         ) {
//           allCol2[i].style.display = "grid";
//         }
//       }
//     }
//   };

//   // Filter search
// }

// getDAta();

// console.log(containerData.children[0].getElementsByClassName(card - title));

// get infromion Api

// containerData.setAttribute
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

      // console.log(ch.target.value);
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
// .then((click) => {
//   let allCol = Array.from(
//     document.querySelectorAll(".content .container .col")
//   );

//   for (let i = 0; i < allCol.length; i++) {
//     allCol[i].addEventListener("click", function () {
//       // sessionStorage.setItem(
//       //   "contry",
//       //   allCol[i].children[0].getElementsByClassName("card-title")[0]
//       //     .innerHTML
//       // );

//       console.log(
//         allCol[i].children[0].getElementsByClassName("card-title")[0]
//           .innerHTML
//       );
//     });
//   }
// });

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
