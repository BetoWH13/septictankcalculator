function calculateTankSize() {
    // Validate inputs
    if (!validateInputs()) return;

    // Get base calculation
    const bedrooms = parseInt(document.getElementById('bedrooms').value);
    const bathrooms = parseInt(document.getElementById('bathrooms').value);
    const occupancy = parseInt(document.getElementById('occupancy').value);
    const baseGallons = bedrooms * 150 + bathrooms * 50 + occupancy * 25;

    // Apply regional factor
    const region = document.getElementById('region').value;
    const regionalFactors = {
        'new-england': 1.18,
        'mid-atlantic': 1.15,
        'south-atlantic': 1.12,
        'deep-south': 1.25,
        'great-lakes': 1.08,
        'plains': 1.05,
        'rocky-mountain': 1.20,
        'pacific-coast': 1.22,
        'default': 1.0
    };
    const regionalMultiplier = regionalFactors[region] || 1.0;

    const totalGallons = baseGallons * regionalMultiplier;
    
    // Round to nearest 500
    const tankSize = Math.ceil(totalGallons / 500) * 500;
    
    displayResult(tankSize, baseGallons, regionalMultiplier);
}

function validateInputs() {
    const bedrooms = parseInt(document.getElementById('bedrooms').value);
    const bathrooms = parseInt(document.getElementById('bathrooms').value);
    const occupancy = parseInt(document.getElementById('occupancy').value);

    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    // Validate ranges
    if (bedrooms < 1 || bedrooms > 10) {
        showError('bedrooms', 'Must be between 1-10');
        isValid = false;
    }
    
    if (bathrooms < 1 || bathrooms > 8) {
        showError('bathrooms', 'Must be between 1-8');
        isValid = false;
    }
    
    if (occupancy < 1 || occupancy > 20) {
        showError('occupancy', 'Must be between 1-20');
        isValid = false;
    }

    return isValid;
}

function showError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.createElement('div');
    error.className = 'error-message text-danger mt-1';
    error.textContent = message;
    input.parentNode.insertBefore(error, input.nextSibling);
}

function displayResult(tankSize, baseGallons, regionalMultiplier) {
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';
    resultDiv.innerHTML = `
        <h3>Recommended Tank Size:</h3>
        <div class="result-number">${tankSize} gallons</div>
        
        <div class="calculation-details mt-4">
            <h5>Calculation Details:</h5>
            <ul class="list-unstyled">
                <li>Base Calculation: ${baseGallons} gallons</li>
                <li>Regional Multiplier: ${regionalMultiplier}x</li>
                <li>Final Calculation: ${Math.round(baseGallons * regionalMultiplier)} gallons</li>
            </ul>
        </div>
        
        <div class="disclaimer mt-3">
            * Regional factors account for:
            <ul>
                <li>Soil type variations</li>
                <li>Local regulations</li>
                <li>Average rainfall</li>
            </ul>
        </div>
    `;
}

function resetForm() {
    document.getElementById('bedrooms').value = 3;
    document.getElementById('bathrooms').value = 2;
    document.getElementById('occupancy').value = 4;
    document.getElementById('region').value = 'default';
    document.getElementById('result').style.display = 'none';
    document.querySelectorAll('.error-message').forEach(el => el.remove());
}
