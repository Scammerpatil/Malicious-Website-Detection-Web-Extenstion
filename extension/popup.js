const loader = document.getElementById("loader");

function transfer() {
  document.getElementById("button").style.display = "none";
  loader.style.display = "block";
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const original_url = tabs[0].url;
    var tablink = original_url;
    if (tablink.length > 30) {
      tablink = tablink.slice(0, 30) + " ...";
    }
    const data = {
      url: original_url,
    };
    document.getElementById("site").innerText = tablink;
    fetch("http://localhost:3000/checkurl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: original_url }),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseText) => {
        console.log(responseText);
        if (responseText.data == 0) {
          document.getElementById("div1").style.display = "block";
          document.getElementById("div1").innerText =
            "This website is Malicious";
          document.getElementById("div1").style.color = "#D62839";
          loader.style.display = "none";
          window.alert("This website is Malicious");
          // Clear all the data
          setInterval(function () {
            localStorage.clear();
            sessionStorage.clear();
            document.cookie.split(";").forEach(function (c) {
              document.cookie = c
                .replace(/^ +/, "")
                .replace(
                  /=.*/,
                  "=;expires=" + new Date().toUTCString() + ";path=/"
                );
            });
            chrome.tabs.create({ url: "chrome://newtab/" });
            // Close the malicious tab
            chrome.tabs.remove(tabs[0].id);
          }, 1000);
        } else {
          loader.style.display = "none";
          document.getElementById("div1").style.display = "block";
          document.getElementById("div1").innerText = "This website is Safe";
          document.getElementById("div1").style.color = "#85FFC7";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // Handle errors here
      });
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Assuming there is a button in your HTML
  document.querySelector("button").addEventListener("click", function () {
    transfer();
  });

  // Move the tab query inside the DOMContentLoaded listener
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tablink = tabs[0].url;
    if (tablink.length > 30) {
      tablink = tablink.slice(0, 30) + " ....";
    }
    document.getElementById("site").innerText = tablink + "\n\n";
  });
});
