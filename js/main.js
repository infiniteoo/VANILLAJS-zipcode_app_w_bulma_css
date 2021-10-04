// listen for submit
document.querySelector("#zipForm").addEventListener("submit", getLocationInfo);

function getLocationInfo(e) {
  e.preventDefault();

  // get zip value from input
  const zip = document.querySelector(".zip").value;

  // make request
  fetch(`https://api.zippopotam.us/us/${zip}`)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
}
