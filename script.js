// Function to fetch and process the API data
async function fetchBreweries() {
  try {
    const response = await fetch('https://api.openbrewerydb.org/breweries');
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error('Unable to fetch breweries data.');
  }
}

// Function to display brewery information
function displayBreweries(breweries) {
  const container = document.getElementById('breweryContainer');
  container.innerHTML = ''; // Clear previous results

  if (breweries.length === 0) {
    container.innerHTML = 'No breweries found.';
    return;
  }

  breweries.forEach((brewery) => {
    const breweryElement = document.createElement('div');
    breweryElement.classList.add('brewery');

    const nameElement = document.createElement('h3');
    nameElement.textContent = brewery.name;
    breweryElement.appendChild(nameElement);

    const typeElement = document.createElement('p');
    typeElement.textContent = `Type: ${brewery.brewery_type}`;
    breweryElement.appendChild(typeElement);

    const addressElement = document.createElement('p');
    addressElement.textContent = `Address: ${brewery.street}, ${brewery.city}, ${brewery.state} ${brewery.postal_code}`;
    breweryElement.appendChild(addressElement);

    if (brewery.website_url) {
      const websiteElement = document.createElement('p');
      websiteElement.innerHTML = `Website: <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a>`;
      breweryElement.appendChild(websiteElement);
    }

    if (brewery.phone) {
      const phoneElement = document.createElement('p');
      phoneElement.textContent = `Phone: ${brewery.phone}`;
      breweryElement.appendChild(phoneElement);
    }

    container.appendChild(breweryElement);
  });
}

// Function to filter breweries based on search input
function filterBreweries(breweries, searchTerm) {
  const filteredBreweries = breweries.filter((brewery) => {
    const breweryName = brewery.name.toLowerCase();
    const breweryType = brewery.brewery_type.toLowerCase();
    const searchValue = searchTerm.toLowerCase();
    return breweryName.includes(searchValue) || breweryType.includes(searchValue);
  });

  return filteredBreweries;
}

// Function to handle search input changes
function handleSearchInput() {
  const input = document.getElementById('searchInput');
  const searchTerm = input.value.trim();

  fetchBreweries()
    .then((breweries) => {
      const filteredBreweries = filterBreweries(breweries, searchTerm);
      displayBreweries(filteredBreweries);
    })
    .catch((error) => {
      console.error(error.message);
      const container = document.getElementById('breweryContainer');
      container.innerHTML = 'An error occurred while fetching breweries data.';
    });
}

// Add event listener for search input changes
document.getElementById('searchInput').addEventListener('input', handleSearchInput);

// Initial fetch and display
fetchBreweries()
  .then((breweries) => {
    displayBreweries(breweries);
  })
  .catch((error) => {
    console.error(error.message);
    const container = document.getElementById('breweryContainer');
    container.innerHTML = 'An error occurred while fetching breweries data.';
  });
