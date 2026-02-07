const BASE_URL = "http://localhost:8000/api";

function getToken() {
  return localStorage.getItem("token");
}

async function request(endpoint, method="GET", body=null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + getToken()
    }
  };

  if(body) options.body = JSON.stringify(body);

  const res = await fetch(BASE_URL + endpoint, options);
  return res.json();
}
