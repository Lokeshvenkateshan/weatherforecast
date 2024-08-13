const form = document.querySelector(".form");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey=`574797d1bdb3635fea5ff8c912671fda`;


form.addEventListener("submit", async event=>{
    event.preventDefault();
    const city = cityinput.value;
    try{
        if(city){
            const data =await getweather(city);
            displayweather(data);
            
        }
        else{
            displayerror("Enter a city");
        }
    }
    catch(error){
        console.error(error);
        displayerror(error);
    }
})
function displayweather(data){
    const{name:city,
        main : {temp,humidity},
        weather:[{description,id}],
        wind:{speed},
        visibility

    }=data;
    card.style.display = "block";
    card.style.transition = "0.5s";

    let windspeed = Number(speed);
    windspeed=(windspeed*3.6).toFixed(2);

    let visibilitycal = Number(visibility);
    visibilitycal = visibilitycal/1000;

    const location = document.getElementById("location");
    location.textContent = `📍${city}`;
    const temperature =document.getElementById("temperature");
    temperature.textContent= `${(temp).toFixed(0)}°C`;

    document.querySelector(".emoji").textContent=emoji(id);
    document.getElementById("desdisplay").textContent=description;
    document.getElementById("humidisplay").textContent=`${humidity}%`;
    document.getElementById("speeddisplay").textContent = `${windspeed}km/h`;
    document.getElementById("visibilitydisplay").textContent = `${visibilitycal}km`;
}
function emoji(id){
    switch(true){
        case (id>=200 && id < 300):
            return "⛈️";
        case (id>=300 && id < 400):
            return "🌧️";    
        case (id>=500 && id < 600):
            return "🌧️";
        case (id>=600 && id < 700):
            return "❄️";
        case (id>=700 && id < 800):
            return "🌫️";
        case (id===800):
            return "☀️";
        case (id>=801 && id<810):
            return "☁️";
        default:
            return "❓";
    }
}
async function getweather(city){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;
    const response =await fetch(url);
    if(!response.ok){
        throw new Error("Could not fetch data");
    }
    return response.json();
}


function displayerror(msg){
    const errors = document.getElementById("errors");
    errors.textContent=msg;
}

const preloader=document.getElementById("loading");
const main = document.querySelector(".main");

window.addEventListener("load", function(){
    preloader.style.display = "none";
    main.style.display ="flex";
})
