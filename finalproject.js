function submitForm(event) {
    // prevent the form from submitting normally
    event.preventDefault();

    // collect form data
    var name = document.getElementById('myName').value;
    var email = document.getElementById('myEmail').value;
    var answer = document.getElementById('myQuestion').value;

    // create a FormData object
    var formData = new FormData();
    formData.append("myName", name);
    formData.append("myEmail", email);
    formData.append("myQuestion", answer);

    // send the data to Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbx7ooLmwMjOoP3t3OgPZqGqbaNIc07YcOoRRd7JjD0jiqVjqGBNq6w1EduyKQwg3txl/exec', {
        method: 'POST', 
        body: formData 
    })
    .then(response => {
        console.log(response);
        if(!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(() => {
        alert("Thank you for submitting your information!");

        // redirect to another page
        window.location.href = 'https://atienze.github.io/index.html';
    })
    .catch(error => {
        // handle errors
        console.error('Error:', error);
        alert('There was an error submitting the form.');
    });
}
