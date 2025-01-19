function submitForm(event) {
    // prevent the form from submitting normally
    event.preventDefault();

    // collect form data
    var name = document.getElementById('myName').value;
    var email = document.getElementById('myEmail').value;
    var answer = document.getElementById('myQuestion').value;

    if (!email.endsWith('.com')) {
        alert('Please enter a valid email address.');
        return;
    }

    // create URL parameters
    var params = new URLSearchParams();
    params.append("myName", name);
    params.append("myEmail", email);
    params.append("myQuestion", answer);

    // send the data to Google Apps Script
    fetch('https://script.google.com/macros/s/AKfycbz93PZhNlbxxxQvApJSpdNTOhiIHjdl8Ii6a-Z6SAU5uVjsilPKRosh3wSAHkjVSikD/exec?' + params.toString(), {
        method: 'GET'
    })
    .then(response => {
        console.log('Response:', response);
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(data => {
        console.log('Success:', data);
        
        alert("Thank you for submitting your information!");

        window.location.href = 'https://atienze.github.io/index.html';
    })
    .catch(error => {
        console.error('Error Occurred:', error);
        
        alert('There was an error submitting the form.');

        window.location.href = 'https://atienze.github.io/index.html';
    });
}
