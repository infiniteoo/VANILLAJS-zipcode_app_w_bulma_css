// listen for submit
document.querySelector("#zipForm").addEventListener("submit", getLocationInfo);

function getLocationInfo(e) {
  e.preventDefault();
  console.log(e);
}
