const openModalBtn = document.getElementById("openModal-btn");
const modal = document.getElementById("modal");
openModalBtn.addEventListener("click", () => {
  modal.showModal();
});

modal.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    modal.close();
  } else {
    const msg = `${e.target} 클릭함`;
    alert(msg);
  }
});
