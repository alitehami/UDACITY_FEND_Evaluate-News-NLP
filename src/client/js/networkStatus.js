const status = document.querySelector(".status");

function changeStatus(isOnline) {
  let x = status;
  if (isOnline) {
    console.log("ONLINE!!");
    x.textContent = "ONLINE";
    x.classList.add("online");
    x.classList.remove("offline");
  } else {
    console.log("OFFLINE!!");
    x.textContent = "OFFLINE";
    x.classList.add("offline");
    x.classList.remove("online");
  }
}

window.addEventListener("online", () => {
  changeStatus(true);
});
window.addEventListener("offline", () => {
  changeStatus(false);
});

export { changeStatus };
