document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const carForm = document.getElementById('carForm');
    const engineType = document.getElementById('engineType');
    const fuelUse = document.getElementById('fuelUse');
    const responseDiv = document.getElementById('response');

    // Function to handle engine type change
    function updateFuelInput() {
        console.log('Engine type changed to:', engineType.value);
        if (engineType.value === 'electric') {
            fuelUse.value = 0;
            fuelUse.disabled = true;
        } else {
            fuelUse.value = '';
            fuelUse.disabled = false;
        }
    }

    // Set up event listener for engine type changes
    engineType.addEventListener('change', updateFuelInput);

    // Get car ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const carId = urlParams.get('id');
    
    if (!carId) {
        window.location.href="index.html";
    }
    
    
    
    // Fetch car data and populate form
    fetch(`https://iit-playground.arondev.hu/api/XVUF92/car/${carId}`)
        .then(response => {
            if (!response.ok) {
                window.location.href="index.html";
              }
            return response.json();
        })
        .then(car => {
            console.log(car.dayOfCommission);
            document.getElementById('brand').value = car.brand;
            document.getElementById('model').value = car.model;
            document.getElementById('engineType').value = car.electric ? 'electric' : 'gas';
            updateFuelInput();
            document.getElementById('fuelUse').value = car.fuelUse;
            document.getElementById('dayOfCommission').value = car.dayOfCommission;
            document.getElementById('owner').value = car.owner;
            
            // Update fuel input based on initial engine type
            
        })
        .catch(error => {
            responseDiv.innerHTML = `Error: ${error.message}`;
        });
        
    // Handle form submission
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
                    `<strong>❌ Error:</strong> Fuel usage must be a valid number`;
                document.getElementById('response').style.background = '#ffdddd';
                return; // Don't proceed with the request
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
            `<strong>✅ Success!</strong> Car added (ID: ${result.id})`;
        document.getElementById('response').style.background = '#ddffdd';
        

        //carForm.reset();
        fuelUse.disabled = engineType.value === 'electric';
        if (engineType.value === 'electric') fuelUse.value = 0;
        }
        else{            
            console.log(result)
            document.getElementById('response').innerHTML = 
                `<strong>❌ Error:</strong> ${result.message}`;
            document.getElementById('response').style.background = '#ffdddd';
        }
    });
});