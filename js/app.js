getAllCountries();

document.querySelector("#searchButton").onclick = (event) => {

    getCountryBySearchValue(document.querySelector("#search").value); 

}

document.querySelector("#clearButton").onclick = (event) => {

    document.querySelector("#search").value = "";
    getAllCountries();

}

function getAllCountries() {

    fetch('https://restcountries.com/v2/all').then(response => response.json()).then(function(data) {
        renderCountries(mapData(data));
    });
    
}

function renderCountries(countriesData, searchValue) {

    if (!searchValue) {
        document.querySelector("#search").value = "";
    }

    if(document.querySelector(".table")) {
        document.querySelector(".table").remove();
    }

    if(document.querySelector(".alert-danger")) {
        document.querySelector(".alert-danger").remove();
    }

    let countriesTableElement = document.createElement("table");
    countriesTableElement.className = "table table-striped table-bordered";

    let htmlStr = countriesData.reduce((html, country) => {
        return html + `<tr>
            <td>${country.name}</td><td>${country.region}</td><td>${country.area}</td><td>${country.population}</td>
        </tr>`
    }, "");

    countriesTableElement.innerHTML = `<thead><tr>
        <th data-sort="name">Name</th>
        <th data-sort="region">Region</th>
        <th data-sort="area">Area</th>
        <th data-sort="population">Population</th>
        </tr></thead>
        <tbody>${htmlStr}</tbody>
    `;

    document.querySelector(".container").append(countriesTableElement);

}

function getCountryBySearchValue(searchValue) {

    fetch(`https://restcountries.com/v2/name/${searchValue}`).then(response => response.json()).then(function(data) {

        if (data.status === 404) {

            if (!document.querySelector(".alert-danger")) {

                document.querySelector(".table").remove();

                let notFoundDivElement = document.createElement("div");
                notFoundDivElement.className = "alert alert-danger text-center";
                notFoundDivElement.innerText = "Not found";
                document.querySelector(".container").append(notFoundDivElement);

            }

            return;

        };

        renderCountries(mapData(data), searchValue);
    
    });

}

function mapData(data) {

    return data.map(element => {
        return {
            name: element.name,
            region: element.region,
            area: element.area,
            population: element.population
        }
    })

}
