btn.onclick = async (e) => {
  console.log(123);
  if (username.value && email.value) {
    let response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({ username: username.value, email: email.value }),
    });
    let res = await response.json();
    console.log(res);
    if (res.location) {
      window.location = "/" + res.location;
    }
  }
};
