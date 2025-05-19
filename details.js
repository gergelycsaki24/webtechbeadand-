var elem =  document.getElementById("container");

const params = new URLSearchParams(window.location.search);
    const carId = params.get('id');

function CreateElement(car) {
    console.log("lefutott:", car);
    return `
                <div class="car-card">
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


async function render() {
    
    const url = `https://iit-playground.arondev.hu/api/XVUF92/car/${carId}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        window.location.href="index.html";
      }
    
      const json = await response.json();
      
      console.log(json);

      const carElement = CreateElement(json);
      elem.innerHTML = carElement;
      


    } catch (error) {
      console.error(error);
    }
  }

render();

async function Delete(){
    const response = await fetch(`https://iit-playground.arondev.hu/api/XVUF92/car/${carId}`, {
        method: 'DELETE'
      });
    const result = await response.json();
    if (result.success) {
        window.location.href="index.html"
    }else{            
        console.log(result)
        document.getElementById('response').innerHTML = 
            `<strong>❌ Error:</strong> ${result.message}`;
        document.getElementById('response').style.background = '#ffdddd';
    }
    console.log(result)

}

function jumpToModify(){
    window.location.href=`put.html?id=${carId}`
}

