document.addEventListener('DOMContentLoaded', function() {
    const carForm = document.getElementById('carForm');
    const engineType = document.getElementById('engineType');
    const fuelUse = document.getElementById('fuelUse');


    function updateFuelInput() {
        if (engineType.value === 'electric') {
            fuelUse.value = 0;
            fuelUse.disabled = true;
        } else {
            fuelUse.value = '';
            fuelUse.disabled = false;
        }
    };

        engineType.addEventListener('change', updateFuelInput);
        
    if (carForm) {
        carForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const carData = {
                brand: document.getElementById('brand').value,
                model: document.getElementById('model').value,
                fuelUse: parseFloat(fuelUse.value),
                owner: document.getElementById('owner').value,
                dayOfCommission: document.getElementById('dayOfCommission').value,
                electric: engineType.value === 'electric'
            };

            if (engineType.value !== 'electric') {
                const fuelValue = fuelUse.value.trim();
                if (fuelValue === '' || isNaN(fuelValue)) {
                    document.getElementById('response').innerHTML = 
                        `<strong style=" color:red ">Error:</strong> Fuel usage must be a valid number`;
                    return;
                }
            }

                const response = await fetch('https://iit-playground.arondev.hu/api/XVUF92/car', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(carData)
                });
                const result = await response.json();
                if (response.ok) {
                    document.getElementById('response').innerHTML = 
                    `<strong style="color: green">Success!</strong> Car added (ID: ${result.id})`;
                
  
                carForm.reset();
                fuelUse.disabled = engineType.value === 'electric';
                if (engineType.value === 'electric') fuelUse.value = 0;
                }
                else{            
                    document.getElementById('response').innerHTML = 
                        `<strong style="color: red">Error:</strong> ${result.message}`;
                }

        });
    } else {
        console.error('Could not find carForm element');
    }
});