document.addEventListener('DOMContentLoaded', function() {
    const carForm = document.getElementById('carForm');
    const engineType = document.getElementById('engineType');
    const fuelUse = document.getElementById('fuelUse');
    const responseDiv = document.getElementById('response');

    function updateFuelInput() {
        if (engineType.value === 'electric') {
            fuelUse.value = 0;
            fuelUse.disabled = true;
        } else {
            fuelUse.value = '';
            fuelUse.disabled = false;
        }
    }

    engineType.addEventListener('change', updateFuelInput);

    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');
    
    if (!carId) {
        window.location.href="index.html";
    }
    
    fetch(`https://iit-playground.arondev.hu/api/XVUF92/car/${carId}`)
        .then(response => {
            if (!response.ok) {
                window.location.href="index.html";
              }
            return response.json();
        })
        .then(car => {

            document.getElementById('brand').value = car.brand;
            document.getElementById('model').value = car.model;
            document.getElementById('engineType').value = car.electric ? 'electric' : 'gas';
            updateFuelInput();
            document.getElementById('fuelUse').value = car.fuelUse;
            document.getElementById('dayOfCommission').value = car.dayOfCommission;
            document.getElementById('owner').value = car.owner;
            
        })
        .catch(error => {
            responseDiv.innerHTML = `Error: ${error.message}`;
        });
        
    carForm.addEventListener('submit', async(e) => {
        e.preventDefault();
        
        const carData = {
            id:carId,
            brand: document.getElementById('brand').value,
            model: document.getElementById('model').value,
           electric: engineType.value === 'electric',
            fuelUse: document.getElementById('fuelUse').value,
            dayOfCommission: document.getElementById('dayOfCommission').value,
            owner: document.getElementById('owner').value
        };

        if (engineType.value !== 'electric') {
            const fuelValue = fuelUse.value.trim();
            if (fuelValue === '' || isNaN(fuelValue)) {
                document.getElementById('response').innerHTML = 
                    `<strong style="color: red;">Error:</strong> Fuel usage must be a valid number`;
                
                return;
            }
        }
        
        const response=await fetch(`https://iit-playground.arondev.hu/api/XVUF92/car`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(carData)
        })
        const result = await response.json();
        if (result.id) {
            document.getElementById('response').innerHTML = 
            `<strong style="color: green;">Success!</strong> Car modified (ID: ${result.id})`;
        
        fuelUse.disabled = engineType.value === 'electric';
        if (engineType.value === 'electric') fuelUse.value = 0;
        }
        else{            
            document.getElementById('response').innerHTML = 
                `<strong style="color: red;">Error:</strong> ${result.message}`;
        }
    });
});