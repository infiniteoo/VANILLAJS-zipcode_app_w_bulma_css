// listen for submit
document.querySelector("#zipForm").addEventListener("submit", getLocationInfo);

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
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}

function showIcon(icon) {
  // clear icons
  document.querySelector(".icon-remove").style.display = "none";
  document.querySelector(".icon-check").style.display = "none";

  // show correct icon
  document.querySelector(`.icon-${icon}`).style.display = "inline-flex";
}
