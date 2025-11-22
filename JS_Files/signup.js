///// signup code Below  ////
var submitBtn = document.querySelector('#submitBtn')

submitBtn.addEventListener("click", function (event) {
    console.log("javascript is running")
    event.preventDefault(); 
    
    const userName = document.querySelector("#userName").value.trim();
    const firstName  = document.querySelector("#firstName").value.trim();
    const lastName = document.querySelector("#lastName").value.trim(); 
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();
    const cPassword = document.querySelector("#cPassword").value.trim();

 let allusers = JSON.parse(localStorage.getItem("allusers")) || [];

    if (!userName || !firstName || !lastName || !email || !password || !cPassword) {  
       return alert("All fields are required");
    }

    if (password !== cPassword) {
       return alert("Password and Confirm Password must be Same!");
    }

    if(password.length < 8){
        return alert("Password must contain at least 8 characters")
    }

const theUser = allusers.find(function(userData){
    return userData.userName === userName;
});
const theEmail = allusers.find(function(userData){
    return userData.email === email;
});

if (theUser) {
    return alert(" Username already exists! Please choose another one.");
}
if (theEmail) {
    return alert(`This email  is already exist. Try to Login`);
}
const userDetailsObj = {
   userName,
   firstName,
   lastName,
   email,
   password
};

allusers.push(userDetailsObj);
localStorage.setItem("allusers", JSON.stringify(allusers));

window.location = "other_files/login.html"
});