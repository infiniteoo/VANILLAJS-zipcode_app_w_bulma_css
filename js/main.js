// listen for submit
document.querySelector("#zipForm").addEventListener("submit", getLocationInfo);

// listen for delete
document.querySelector("body").addEventListener("click", deleteLocation);

function getLocationInfo(e) {
  e.preventDefault();

  // get zip value from input
  const zip = document.querySelector(".zip").value;

  // make request
  fetch(`https://api.zippopotam.us/us/${zip}`)
    .then((res) => {
      if (res.status !== 200) {
        showIcon("remove");
        document.querySelector("#output").innerHTML = `
              <article class="message is-danger">
                <div class="message-body">
                  Invalid Zipcode, please try again.
                </div>
              </article>
            `;

        throw Error(res.statusText);
      } else {
        showIcon("check");
        return res.json();
      }
    })
    .then((data) => {
      // show location info
      let output = "";
      data.places.forEach((place) => {
        output += `
              <article class="message is-primary">
                <div class="message-header">
                  <p>Location Info</p>
                  <button class="delete"></button>
                </div>
                <div class="message-body">
                  <ul>
                    <li><strong>City:</strong> ${place["place name"]}</li>
                    <li><strong>State:</strong> ${place["state"]}</li>
                    <li><strong>Logitude:</strong> ${place["longitude"]}</li>
                    <li><strong>Latutude:</strong> ${place["latitude"]}</li>
                  </ul>
                </div>
              </article>
            
            `;
      });

      document.querySelector("#output").innerHTML = output;
    })
    .catch((err) => console.log(err));
}

// show check or remove icon
function showIcon(icon) {
  // clear icons
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";

  // show correct icon
  document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}

// delete location box
function deleteLocation(e) {
  if (e.target.className === "delete") {
    document.querySelector(".message").remove();
    document.querySelector(".icon-check").remove();
    document.querySelector(".zip").value = "";
  }
}
