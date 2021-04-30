// Global Variables
const apiKEY = "&appid=78c3434f2ac1e1e0bfbe9a09bfeaabe2&units=imperial",
  apiURL = "http://localhost:4800",
  zipElement = document.getElementById("zip"),
  feelElement = document.getElementById("feelings"),
  date = document.getElementById("date"),
  temp = document.getElementById("temp"),
  content = document.getElementById("content"),
  generate = document.getElementById("generate");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// GLOBAL FUNCTION

// Function to GET Data
const getTheWeather = async (zipCode) => {
  const request = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}${apiKEY}&units=metric`
  );
  try {
    const data = await request.json();
    return data;
  } catch (err) {
    console.log("Error", err);
  }
};

// Function to POST data
const postTheData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  try {
    const theNewData = await response.json();
    return theNewData;
  } catch (err) {
    console.log("Error", err);
  }
};

// update the DOM
const updateTheUI = async () => {
  const req = await fetch("/all");
  try {
    const wholeData = await req.json();
    date.innerHTML = "Date : " + wholeData.date;
    temp.innerHTML = "Temperature : " + wholeData.temp;
    // Alert the User if the feeling box was empty
    if (wholeData.content == "") {
      return alert("You missed the feelings box");
    } else {
      content.innerHTML = "Your Feelings : " + wholeData.content;
    }
  } catch (err) {
    console.log("Error : ", err);
  }
};

// Function to retrieve data
const generateTheData = () => {
  // Scroll the page to the bottom
  window.scrollTo(0, document.body.scrollHeight);
  // Get data from API
  getTheWeather(zipElement.value).then((data) => {
    // If the User didn't enter the zipCode
    if (data.cod == 400) {
      return alert(data.message);
      // If the User entered wrong zipCode
    } else if (data.cod == 404) {
      return alert(data.message);
    } else {
      // Post data to the server
      postTheData("/postData", {
        temp: data.main.temp + "  C",
        date: d.toLocaleDateString(),
        content: feelElement.value,
      }).then(
        // Get data from the server
        updateTheUI()
      );
    }
  });
};

// Add Event Listener to 'Generate Button' to Retrieve Data
generate.addEventListener("click", generateTheData);
