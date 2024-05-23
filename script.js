// script.js
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Simple authentication logic (replace with real authentication)
    
fetch('https://dummyjson.com/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: username,
    password: password,
    expiresInMins: 30,
    // optional, defaults to 60
  })
})
.then(res => res.json())
.then(data=>
  {
    if(data.token){
      window.location.href='main.html'
      localStorage.setItem('token',data.token)
      console.log('Authentication successful:', data.token);
      // Redirect to the desired page or perform additional actions
    } else {
      // Authentication failed
      console.error('Authentication failed:', data.message);
      document.getElementById('loginForm').innerHTML+=`<p style="color:red">User Not Found</p>`
      // Display an error message to the user
    }
    console.log(data)
  })
  .catch(error => {
    console.error('Error:', error);
    // Display an error message to the user
  });



})

  //   if (username === 'admin' && password === 'password') {
  //     // Redirect to main page
  //     window.location.href = 'main.html';
  //   } else {
  //     alert('Invalid username or password');
  //   }
  // });
  