document.getElementById("signupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  alert("You're on the Build Together early access list!");

  this.reset();
});
