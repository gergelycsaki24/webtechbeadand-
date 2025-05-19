var elem =  document.getElementById("container");

function openSinglePage(id){
    window.location.href=`details.html?id=${id}`;
}

function CreateElement(car) {
    console.log("lefutott:", car);
    return `
                <div class="car-card" onclick="openSinglePage(${car.id})">
                    <div class="car-header">
                        <h3 class="car-title">${car.brand} ${car.model}</h3>
                        <span class="car-id">#${car.id}</span>
                    </div>
                    <div class="car-details">
                        <div class="detail-item">
                            <span class="detail-label">Owner</span>
                            <span class="detail-value">${car.owner}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Commission Date</span>
                            <span class="detail-value">${new Date(car.dayOfCommission).toLocaleDateString()}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Fuel Consumption</span>
                            <span class="detail-value">${car.fuelUse} L/100km</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label">Engine Type</span>
                            <span class="detail-value">
                                <span class="${car.electric ? 'electric-tag' : 'fuel-tag'}">
                                    ${car.electric ? 'Electric' : 'Fuel'}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            `;
} 

/*brand
: 
"Mitsubishi"
dayOfCommission
: 
"2021-03-05"
electric
: 
false
fuelUse
: 
12.67541486317909
id
: 
0
model
: 
"Stratos"
owner
: 
"Takács Zsófia"*/


async function getData() {
    const url = "https://iit-playground.arondev.hu/api/XVUF92/car";
    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log(json);
      json.forEach(car => {
        const element = CreateElement(car);
        elem.insertAdjacentHTML("beforeend", element);
    });


    } catch (error) {
      console.error(error.message);
    }
  }

  getData();