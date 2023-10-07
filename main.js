function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
          .writeText(text)
          .then(() => {
              console.log("Text copied to clipboard");
              showCopiedMessage();
          })
          .catch((error) => {
              console.error("Failed to copy text: ", error);
              alert("Failed to copy text: " + error);
          });
  } else {
      var textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      console.log("Text copied to clipboard");
      showCopiedMessage();
  }
}

function showCopiedMessage() {
  var message = document.createElement("div");
  message.innerText = "Copied!";
  message.style.position = "fixed";
  message.style.top = "95%";
  message.style.left = "50%";
  message.style.transform = "translate(-50%, -50%)";
  message.style.backgroundColor = "white";
  message.style.color = "black";
  message.style.padding = "10px";
  message.style.borderRadius = "20px";
  message.style.opacity = "0";
  message.style.transition = "opacity 0.5s";
  document.body.appendChild(message);

  // Fade in
  setTimeout(function() {
      message.style.opacity = "1";
  }, 50);

  // Fade out
  setTimeout(function() {
      message.style.opacity = "0";
  }, 850);

  // Remove from DOM after fade out
  setTimeout(function() {
      document.body.removeChild(message);
  }, 1500);
}

// Select all buttons
var buttons = document.querySelectorAll("button");

// Iterate over each button
buttons.forEach(function(button) {
  // Get the onclick attribute value
  var onclickValue = button.getAttribute("onclick");

  // Extract the copyText value
  var copyText = onclickValue.split("'")[1];

  // Create a span element for the tooltip
  var tooltip = document.createElement("span");
  tooltip.classList.add("tooltip");
  tooltip.innerText = copyText;

  // Append the tooltip to the button
  button.appendChild(tooltip);
});

// Search functionality

// Keep track of the last search query
let lastQuery = "";

function searchFunction() {
  // Declare variables
  var input, filter, h2, i, txtValue;

  // Get the input value and convert it to uppercase for case-insensitive search
  input = document.getElementById("searchInput");
  filter = input.value.toUpperCase();

  // Only proceed if the search query has changed
  if (filter !== lastQuery) {
      lastQuery = filter;

      // Get all h2 elements
      h2 = document.getElementsByTagName("h2");

      // Remove the fade-in class from all elements
      for (i = 0; i < h2.length; i++) {
          h2[i].classList.remove("fade-in");

          // Remove the fade-in class from siblings until the next h2 element
          let sibling = h2[i].nextElementSibling;
          while (sibling && sibling.tagName !== "H2") {
              sibling.classList.remove("fade-in");
              sibling = sibling.nextElementSibling;
          }
      }

      // Add a delay before adding the fade-in class back
      setTimeout(function() {
          // Loop through all h2 items, and hide or show based on the search query
          for (i = 0; i < h2.length; i++) {
              txtValue = h2[i].textContent || h2[i].innerText;

              // If the search query is found, show the h2 element and add the fade-in class
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  h2[i].style.display = "";
                  h2[i].classList.add("fade-in");

                  // Show siblings and add the fade-in class to siblings until the next h2 element
                  let sibling = h2[i].nextElementSibling;
                  while (sibling && sibling.tagName !== "H2") {
                      sibling.style.display = "";
                      sibling.classList.add("fade-in");
                      sibling = sibling.nextElementSibling;
                  }
              }
              // If the search query is not found, hide the h2 element and its siblings
              else {
                  h2[i].style.display = "none";

                  // Hide siblings until the next h2 element
                  let sibling = h2[i].nextElementSibling;
                  while (sibling && sibling.tagName !== "H2") {
                      sibling.style.display = "none";
                      sibling = sibling.nextElementSibling;
                  }
              }
          }
      }, 100); // 100ms delay
  }
}