// dropdown
const currency_one = document.getElementById("currency-one");
const currency_two = document.getElementById("currency-two");

// input
const amount_one = document.getElementById("amount-one");
const amount_two = document.getElementById("amount-two");

//
const rateText = document.getElementById("rate");
const switch_btn = document.getElementById("switch-btn");

// event
currency_one.addEventListener('change',calculate)
currency_two.addEventListener('change',calculate)
amount_one.addEventListener('input',calculate)
amount_two.addEventListener('input',calculate)


function calculate(){
    const selection_one = currency_one.value;
    const selection_two = currency_two.value;
    
    // fetch api and display on text
    let url = `https://v6.exchangerate-api.com/v6/7c79dec03fa16580bad7e5c9/latest/${selection_one}`
    fetch(url).then(res => res.json()).then(data => {
        const exRate = data.conversion_rates[selection_two];
        rateText.innerText = `1 ${selection_one} = ${exRate} ${selection_two}`
        
        // calculate exchange rate for each input
        amount_two.value = (amount_one.value*exRate).toFixed(2);
    })  
}

// when click swap currency 
switch_btn.addEventListener('click', () =>{
    const temp = currency_one.value; //initial currency
    currency_one.value = currency_two.value;
    currency_two.value = temp;
    calculate();

})


// call when first render
calculate();