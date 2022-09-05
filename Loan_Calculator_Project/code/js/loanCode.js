// Storage.
// var storage = localStorage
// storage.setItem("name", "Nwadike Philip")
// console.clear()
// console.log(`Name: ${storage.getItem("name")}`)
// listen for submit 

document.getElementById('loan-form').addEventListener('submit', function(e){
    // Hide results
    document.getElementById('results').style.display = 'none';
    
    //show loader and calculating text.
    document.getElementById('loading').style.display = 'block';
    document.getElementById('resultText').textContent = 'Calculating...';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});

// calculate Results
function calculateResults(){
    console.log('Calculating...');

    //UI Vars
    
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    // Disabled fields/Inputs
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    

    //  converting to decimals 

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) /100 /12;
    const calculatedPayments = parseFloat(years.value) * 12;

    // Compute Monthly Payment

    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

        // Show Results
        document.getElementById('results').style.display = 'block';
        document.querySelector('#results #resultText').textContent = 'RESULTS';
        
        //  Hide loader
        document.getElementById('loading').style.display = 'none';
    } else{
        showError('Please check your numbers');
    }
        
}
// Show error
function showError(error){
    const errorDiv = document.createElement('div');

    // Hide Results
    document.getElementById('results').style.display = 'none';
        
    //  Hide loader
    document.getElementById('loading').style.display = 'none';

    // get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    // add class
    errorDiv.className = 'alert alert-danger';

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // insert error above heading
    card.insertBefore(errorDiv, heading);
    
    // clear error after 3s
    setTimeout(clearError, 3000);
}

// clear error function
function clearError(){
    document.querySelector('.alert').remove();
}
