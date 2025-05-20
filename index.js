var elem =  document.getElementById("container");

function openSinglePage(id){
    window.location.href=`details.html?id=${id}`;
}

function CreateElement(car) {
    return `
                <div class="car-card" onclick="openSinglePage(${car.id})">
                    <div class="car-header">
                        <h3 class="car-title">${car.brand} ${car.model}</h3>
                        <h2 class="car-id">#${car.id}</h2>
                    </div>
                    
                </div>
            `;
} 

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