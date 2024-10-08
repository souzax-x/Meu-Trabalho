let searchBtn = document.getElementById("botao");
let countryInp = document.getElementById("procurar");
let result = document.getElementById("Paises");

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let countryName = countryInp.value;
    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    console.log(finalURL);

    fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {
            console.log(data[0]);
            console.log(data[0].capital[0]);
            console.log(data[0].flags.svg);
            console.log(data[0].name.common);
            console.log(data[0].continents[0]);
            console.log(Object.keys(data[0].currencies)[0]);
            console.log(data[0].currencies[Object.keys(data[0].currencies)].name);
            console.log(Object.values(data[0].languages).toString().split(",").join(", "));
            
            result.innerHTML = `
            <img src="${data[0].flags.svg}" class="flag-img">
            <h2>${data[0].name.common}</h2>
            <h4>${data[0].capital[0]}</h4>
            <h4>${data[0].continents[0]}</h4>
            <h4>${Object.values(data[0].languages).toString().split(",").join(", ")}</h4>
            <h4>${data[0].currencies[Object.keys(data[0].currencies)].name}</h4>
            `;
        });
});
