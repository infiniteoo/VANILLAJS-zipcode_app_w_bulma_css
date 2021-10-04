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
        document.querySelector("#output").innerHTML = `
              <article class="message message-body is-danger">
                Invalid Zipcode, please try again.
              </article>
            `;

        throw Error(res.statusText);
      } else {
        return res.json();
      }
    })
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
