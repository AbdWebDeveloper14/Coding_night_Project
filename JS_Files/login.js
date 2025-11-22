const emailLogin = document.querySelector(".email")
const passwordLogin = document.querySelector(".password")

document.querySelector("#login").addEventListener("click", function() {

    if (!emailLogin.value || !passwordLogin.value) {
        return alert("All fields are required");
    }

    if (passwordLogin.value.length < 8) {
        return alert("Password must be 8 characters");
    }

    const allUsers = JSON.parse(localStorage.getItem("allusers")) || [];

    const isExist = allUsers.find(function(userData) {
        return userData.email === emailLogin.value;
    });

    console.log(isExist, "is exist this email");

    if (!isExist) {
        return alert("Please create your account first");
    }

    if (isExist.password === passwordLogin.value) {
        
        alert("Login successful!");
        localStorage.setItem("loggedInUser", JSON.stringify(isExist));

        window.location = "/other_files/createpost.html";

    } else {
        alert("Incorrect Password");
    }
});
