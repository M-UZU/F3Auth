// Utility function to generate a random 16-byte string
function generateAccessToken() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 16; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }
  
  // Check if the user is already logged in (access token in local storage)
  function checkLoggedIn() {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      // Redirect to profile page if the user is logged in
      window.location.replace('profile.html');
    }
  }
  
  // Check if the user is not logged in (no access token in local storage)
  function checkNotLoggedIn() {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      // Redirect to signup page if the user is not logged in
      window.location.replace('index.html');
    }
  }
  
  // Function to handle signup form submission
  function handleSignup() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Save user details to local storage
    const accessToken = generateAccessToken();
    const user = {
      username,
      email,
      accessToken,
    };
    localStorage.setItem('user', JSON.stringify(user));
  
    // Display success message and redirect to the profile page
    const signupMessage = document.getElementById('signupMessage');
    signupMessage.innerText = 'Signup successful! Redirecting to the profile page...';
    signupMessage.classList.add('message');
    signupMessage.classList.add('success');
  
    setTimeout(() => {
      window.location.replace('profile.html');
    }, 2000);
  }
  
  // Function to display user details on the profile page
  function displayProfileDetails() {
    const userData = JSON.parse(localStorage.getItem('user'));
    document.getElementById('username').innerText = userData.username;
    document.getElementById('email').innerText = userData.email;
    document.getElementById('accessToken').innerText = userData.accessToken;
  }
  
  // Function to handle logout
  function handleLogout() {
    // Clear user data from local storage
    localStorage.removeItem('user');
    // Redirect to signup page after logout
    window.location.replace('index.html');
  }
  
  // Event listeners
  document.addEventListener('DOMContentLoaded', () => {
    checkNotLoggedIn();
    document.getElementById('signupButton').addEventListener('click', handleSignup);
    displayProfileDetails();
    document.getElementById('logoutButton').addEventListener('click', handleLogout);
  });
  