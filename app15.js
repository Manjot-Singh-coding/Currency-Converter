const BASE_URL =
    //"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
    "https://v6.exchangerate-api.com/v6/6390b5561b84f6b453d578b2/latest/USD";
//"https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
//"https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const btn = document.querySelector("form button");
const msg =document.querySelector(".msg")
for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        } /*elseif (select.name==="from"&& currCode==="USD") {
            newOption.selected="selected";
        }  */
        select.append(newOption);

    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}
const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    //"https://flagpedia.net/data/flags/{size}/{country-code}.png";
    //"https://flagpedia.net/download/api";
    //"https://www.countryflags.io/{country_code}/{style}/{size}.png";
    //"https://restcountries.com/v3.1/all";
    //`https://flagsapi.com/${currCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;

};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    // console.log(amtVal);
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }
    const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurr.value.toLowerCase()}.json`;
    console.log(URL);
    let response = await fetch(URL, {
        method : "GET",
        mode: 'cors',
        headers: {}
    });
    
    let data = await response.json();
    console.log(data);
    console.log("toCurr",toCurr.value);
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log("toCurr", data[fromCurr.value.toLowerCase()]);
    console.log("rate",rate);
    console.log("amount",amtVal);
    let finalAmount = amtVal * rate;
    console.log(finalAmount);
   msg.innerText=`${amtVal}${fromCurr.value}=${finalAmount}${toCurr.value};`
})