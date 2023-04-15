btn.onclick = async (e) => {
  if (username.value && lastname.value && contact.value && email.value) {
    let response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify({
        username: username.value,
        lastname: lastname.value,
        phone: contact.value,
        email: email.value,
      }),
    });
    let res = await response.json();

    if (res.location) {
      window.location = "/" + res.location;
    }
  }
};
