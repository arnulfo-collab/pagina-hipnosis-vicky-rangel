document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    console.log(
      username,

      "  ",
      password
    );
    // Enviar solicitud POST al backend para verificar el usuario en MongoDB
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Inicio de sesión exitoso");
          // Aquí puedes redirigir al usuario a otra página o realizar otras acciones necesarias
        } else {
          alert(
            "Inicio de sesión fallido. Por favor, verifica tus credenciales"
          );
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
