// REGISTER
const registerForm = document.getElementById("registerForm");

if(registerForm){
registerForm.addEventListener("submit", async e => {
  e.preventDefault();

  await fetch("http://localhost:8000/api/auth/register",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      name:name.value,
      email:email.value,
      password:password.value
    })
  });

  alert("Registered!");
  window.location="login.html";
});
}


// LOGIN
const loginForm = document.getElementById("loginForm");

if(loginForm){
loginForm.addEventListener("submit", async e => {
  e.preventDefault();

  const res = await fetch("http://localhost:8000/api/auth/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      email:loginEmail.value,
      password:loginPassword.value
    })
  });

  const data = await res.json();
  localStorage.setItem("token",data.token);

  window.location="dashboard.html";
});
}
