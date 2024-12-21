const API_KEY = "WA9RNUS9BGKJWTR28PBHBG8DC";
const form = document.querySelector("form");
const container = document.querySelector(".container");

async function getData(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function render(location) {
  const data = await getData(location);
  if (!data) {
    generateErrorMessage();
    return;
  }

  const address = data.resolvedAddress;
  const temp = data.currentConditions.temp;
  const conditions = data.currentConditions.conditions;
  const description = data.description;

  container.innerHTML = "";

  const addressLabel = document.createElement("h1");
  addressLabel.innerHTML = address;

  const conditionsLabel = document.createElement("h3");
  conditionsLabel.innerHTML = conditions;

  const descriptionLabel = document.createElement("h3");
  descriptionLabel.innerHTML = description;

  const tempLabel = document.createElement("h3");
  tempLabel.innerHTML = `${temp} °F`;

  container.appendChild(addressLabel);
  container.appendChild(conditionsLabel);
  container.appendChild(descriptionLabel);
  container.appendChild(tempLabel);
}

function generateErrorMessage() {
  container.innerHTML = "";
  const errorMessage = document.createElement("h1");
  errorMessage.innerHTML = "An error occurred or location could not be found.";
  container.appendChild(errorMessage);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = document.querySelector(".search-bar").value.trim();
  document.querySelector(".search-bar").value = "";
  if (location) {
    render(location);
  } else {
    generateErrorMessage();
  }
});
