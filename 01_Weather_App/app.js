const temperatureField = document.querySelector('.temp p');
const locationField = document.querySelector('.time_location p:first-child');
const dataField = document.querySelector('.time_location p:last-child');    
const weatherField = document.querySelector('.condition p:last-child');
const searchField = document.querySelector('.search_area');
const form = document.querySelector('form'); 

form.addEventListener('submit', search_area);

let target = 'Pune';

const fetchResults = async (targetLocation) => {
    let url = `https://api.weatherapi.com/v1/current.json?key=15669f63cd20447681e175807240808&q=${targetLocation}&aqi=no`;

    try {
        const res = await fetch(url);
        const data = await res.json();

        console.log(data);

        let location = data.location.name;
        let temp_c = data.current.temp_c;
        let condition = data.current.condition.text;
        let localtime = data.location.localtime;

        // Call updatedetails to update the UI properly
        updatedetails(temp_c, location, localtime, condition);

    } catch (error) {
        console.error("Error fetching data:", error);
    }
};


function updatedetails(temp, locationName, time, condition) {
    let dateObj = new Date(time); // Create a Date object from localtime
    let splitDate = time.split(' ')[0]; // Extract the date
    let splitTime = time.split(' ')[1]; // Extract the time
    let currentDay = getDayName(dateObj.getDay()); // Get the day name

    temperatureField.innerHTML = `${temp}°C`;
    locationField.innerHTML = `${locationName}`;
    dataField.innerHTML = `${splitDate} ${currentDay} ${splitTime}`;
    weatherField.innerHTML = `${condition}`;
}

function search_area(e) {
    e.preventDefault();
    let inputLocation = searchField.value.trim();
    
    if (inputLocation) {
        target = inputLocation;
        fetchResults(target);
    } else {
        alert("Please enter a location!");
    }
}

// Initial fetch
fetchResults(target);

function getDayName(day) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
}
