let body = document.querySelector("body");

let allspanCountry;

let contry = sessionStorage.getItem("contry");
let container = document.querySelector(".card .container");

fetch(`https://restcountries.com/v2/name/${contry}`)
  .then((resbone) => resbone.json())
  .then((arrDAta) => {
    let content = document.createElement("div");
    content.className = "content";
    let allborder = arrDAta[0].borders;
    let spans;
    content.innerHTML = `
      <div class="left">
      <img src="${arrDAta[0].flags.png}" alt="" />
    </div>
    <div class="right">
      <h2 class="card-title">blugem</h2>
      <div class="text">
        <div class="left-text">
          <p class="nativeName">
            naviteName :
            <span class="naviteNameSpan">${arrDAta[0].nativeName}</span>
          </p>
          <p class="population">
            population :
            <span class="populationspan">${arrDAta[0].population}</span>
          </p>
          <p class="Region">
            Region :
            <span class="Region">${arrDAta[0].region}</span>
          </p>
          <p class="SubRegion">
            SubRegion :
            <span class="SubRegionspan">${arrDAta[0].subregion}</span>
          </p>
          <p class="Capital">
            Capital :
            <span class="Capital span">${arrDAta[0].capital}</span>
          </p>
          <div class="borderContries">
            border Contries :
    
          </div>
        </div>
        <div class="right-text">
          <p class="TopDomin">
            Top Level Domain :
            <span class="Topdominspain">${arrDAta[0].topLevelDomain[0]}</span>
          </p>
          <p class="currencies">
            currencies :
            <span class="currenciesspan">${arrDAta[0].currencies[0].name}</span>
          </p>
          <p class="languages">
            languages :
            <span class="languagesspan"></span>
          </p>
        </div>
      </div>
    </div>
    
      `;

    container.appendChild(content);
    return arrDAta;
  })
  .then((addborder) => {
    Object.keys(addborder[0]).forEach((e) => {
      if (e == "borders") {
        for (let x = 0; x < addborder[0].borders.length; x++) {
          let spans = document.createElement("span");
          let item = document.createElement("div");
          item.className = `border-item`;
          spans.innerHTML = addborder[0].borders[x];
          item.style.paddingLeft = `calc(25% / ${addborder[0].borders.length})`;
          item.style.paddingRight = `calc(25% / ${addborder[0].borders.length})`;
          item.style.marginLeft = `3px`;
          item.appendChild(spans);
          document.querySelector(".borderContries").appendChild(item);
        }
      }
    });

    return addborder;
  })
  .then((leng) => {
    let allleng = leng[0].languages;
    let spn = document.querySelector(".languagesspan");
    allleng.forEach((element, i) => {
      let spnleng = document.createElement("span");
      spnleng.innerHTML = `${i + 1}- ${element.nativeName}`;
      document.querySelector(".languages").appendChild(spnleng);
    });
  })
  .then((darkmode) => {
    let nav = document.querySelector(".nav-header");
    let btnDark = document.querySelector(".dark-btn");
    let allbord = Array.from(document.querySelectorAll(".border-item"));
    btnDark.addEventListener("click", function () {
      body.classList.toggle("dark");

      allbord.forEach((e) => {
        e.classList.toggle("dark");
      });
    });
    if (nav.classList.contains("dark")) {
      body.classList.toggle("dark");
    }
  });


