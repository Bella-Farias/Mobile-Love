const contents = document.querySelectorAll(".content");

const listItems = document.querySelectorAll("nav ul li");

const clock = document.querySelector("#clock");

const batteryLevelElement = document.querySelector("#batteryLevel");

listItems.forEach((item, idx) => {
    item.addEventListener("click", () => {
        hideAllContent();
        hideAllItems();

        item.classList.add("active");
        contents[idx].classList.add("show");
    })
})

function hideAllContent() {
    contents.forEach(content => content.classList.remove("show"))
}

function hideAllItems() {
    listItems.forEach(item => item.classList.remove("active"))
}

function time(){
    let dateToday = new Date();
    let hr = String(dateToday.getHours()).padStart(2, '0');

    let min = String(dateToday.getMinutes()).padStart(2, '0');

    text.textContent = hr;
    text2.textContent = ":" + min;
}

setInterval(time, 1000);

function updateBatteryInfo(battery) {
    let level = Math.floor(battery.level * 100) + "%";
    batteryLevelElement.textContent = `${level}`;
}

function monitorBattery() {
    navigator.getBattery().then(function(battery) {
        
        updateBatteryInfo(battery);
        
        battery.addEventListener('levelchange', () => updateBatteryInfo(battery));
        
        battery.addEventListener('chargingchange', () => {
            let chargingStatus = battery.charging ? "Charging" : "Not Charging";
            batteryLevelElement.textContent += ` (${chargingStatus})`;
        });
    });
}

monitorBattery();
