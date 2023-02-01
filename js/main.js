// console.log("Request send...");

// setTimeout(() => {
//     console.log("On server...");

//     let data = {
//         type: "test",
//         port: 2000,
//         status: "in progress",
//     };

//     setTimeout(() => {
//         console.log("updating data...");
//         data.updated = true;
//     }, 2000);
// }, 2000);

// const p = new Promise(function (resolve, reject) {
//     setTimeout(() => {
//         console.log("On server...");

//         let data = {
//             type: "test",
//             port: 2000,
//             status: "in progress",
//         };
//         resolve(data);
//     }, 2000);
// });

// p.then((obj) => {
//     obj.updated = true;
// })
//     .then((updateData) => {
//         console.log(updateData);
//     })
//     .catch((err) => {
//         console.error("error");
//     })
//     .finally(() => {
//         console.log("finished");
//     });

let weather = {
    api_key: "secret_api_key",
    fetchWeather: function (cityName) {
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${this.api_key}&lang=ru&units=metric`
        )
            .then((response) => response.json())
            .then((data) => this.renderWeather(data))
            .then(() => {
                document.querySelector(".weather").style.display = "flex";
            })
            .catch((err) => {
                console.error(err);
                document.querySelector(".error").style.display = "block";
            });
    },
    renderWeather: function (info) {
        console.log(info);
        document.querySelector(".city").innerText = info.name;
        document.querySelector(".temperature").innerText =
            Math.round(info.main.temp) + " °C";
        document.querySelector(
            ".weather_icon"
        ).src = `https://openweathermap.org/img/wn/${info.weather[0].icon}.png`;
        document.querySelector(".precipitation").innerText =
            info.weather[0].description;
        document.querySelector(".wind").innerText =
            "Ветер: " + info.wind.speed + " м/с";
        document.querySelector(".humidity").innerText =
            "Влажность: " + info.main.humidity + "%";
    },
};

let background = {
    api_key: "secret_api_key",
    fetchPhoto: function (cityName) {
        fetch(
            `https://api.unsplash.com/search/photos?query=${
                cityName + " city"
            }&client_id=${this.api_key}`
        )
            .then((response) => response.json())
            .then((data) => this.renderBackground(data))
            .catch((err) => {
                console.error(err);
            });
    },
    renderBackground: function (info) {
        console.log(info);
        document.querySelector("body").style.backgroundImage =
            "url(" +
            info.results[Math.floor(Math.random() * 11)].urls.regular +
            ")";
    },
};

document.querySelector(".button").onclick = function () {
    document.querySelector(".weather").style.display = "none";
    document.querySelector(".error").style.display = "none";
    weather.fetchWeather(document.querySelector(".input").value);
    background.fetchPhoto(document.querySelector(".input").value);
};
