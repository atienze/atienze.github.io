function submitForm(event) {
    // Prevent the form from submitting normally
    event.preventDefault();

    // Collect form data
    var name = document.getElementById('myName').value;
    var email = document.getElementById('myEmail').value;

    // Create a FormData object
    var formData = new FormData();
    formData.append("myName", name);
    formData.append("myEmail", email);

    // Send the data to Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbzDfTCAI2A1gvRMMGNEA5ouuTc8Dn2iegHO10DTQs6_Dgg2EAMkjcObC8CsVid_ONhy/exec', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(data => {
        // Show a confirmation message (optional)
        alert("Thank you for submitting your information!");

        // Redirect to another page (replace with your desired URL)
        window.location.href = 'https://atienze.github.io/index.html'; // Change this URL to where you want the user to go
    })
    .catch(error => {
        // Handle errors (optional)
        console.error('Error:', error);
        alert('There was an error submitting the form.');
    });
}