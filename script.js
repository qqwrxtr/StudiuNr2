var navbar = ["Home", "Magazin", "Altceva", "Poate", "Doarme"];

let mesta = document.getElementById("links");

for (let x = 0; x < navbar.length; x++) {
  const nav_li = document.createElement("li");
  const nav_a = document.createElement("a");
  nav_a.href = "index.html";
  // nav_a.href = `${navbar[x]}.html`.toLowerCase();
  nav_li.appendChild(nav_a);
  nav_a.textContent = navbar[x];

  mesta.appendChild(nav_li);
}

const swiper = new Swiper(".swiper", {
  // Optional parameters
  slidesPerGroup: 1,
  slidesPerView: 1,
  speed: 400,
  direction: "horizontal",
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  autoplay: {
    delay: 3000,
  },
});

const colorInputs = document.getElementsByName("color");
const sizeInput = document.getElementsByName("size");
const alegerea = document.getElementById("cealeg");
const denumirea = document.getElementById("denumirea");
const descrierea = document.getElementById("descrierea");
const price = document.getElementById("price");
const colorInputs1 = document.getElementsByName("color");
const submitButton = document.querySelector(".submit");
const outputDiv = document.getElementById("output");

function init() {
  if (!localStorage.getItem("products")) return false;

  let products = JSON.parse(localStorage.getItem("products"));

  products.forEach((el) => {
    let div = document.createElement("div");

    div.innerHTML = `
          <div class="title">
              <h3>${el.denumirea}</h3>
            </div>
            <div id="imgdiv">
            </div>
            <div class="descrierea">
              <p>${el.descrierea}</p>
            </div>
            <div class="price">
              <p>${el.price}$</p>
            </div>
            <div class="color">
            <p class="mic"> Culoarea </p>
            <p> ${el.color} </p>
            </div>
            <div class="size">
            <p> <span class="mic">Marimea</span> ${el.size}</p>
            </div>
            <div class="addto">
            <button type="submit" id="submit">Add To Cart</button>
            </div>
  
        `;

    if (el.alegerea && el.selectedColor == "rosu") {
      const img = document.createElement("img");
      img.src = "rosumaio.png";
      img.style.width = "200px";
      const imgdiv = document.createElement("div");
      imgdiv.id = "imgdiv";
      imgdiv.appendChild(img);
      const descriereaDiv = div.querySelector(".descrierea");
      descriereaDiv.parentNode.insertBefore(imgdiv, descriereaDiv.nextSibling);
    }

    div.classList.add("blockinfo");
    outputDiv.appendChild(div);


    // add event listener for color inputs
colorInputs.forEach((input) => {
  input.addEventListener("change", updateLocalStorage);
});

// add event listener for size inputs
sizeInput.forEach((input) => {
  input.addEventListener("change", updateLocalStorage);
});

// function to update local storage
function updateLocalStorage() {
  let products = JSON.parse(localStorage.getItem("products"));
  if (!products) return;
  
  const lastProduct = products[products.length - 1];
  lastProduct.color = document.querySelector('input[name="color"]:checked').value;
  lastProduct.size = document.querySelector('input[name="size"]:checked').value;

  localStorage.setItem("products", JSON.stringify(products));
}
  });
}

init();

submitButton.addEventListener("click", function (event) {
  event.preventDefault();

  let selectedColor = null;
  for (let i = 0; i < colorInputs.length; i++) {
    if (colorInputs[i].checked) {
      selectedColor = colorInputs[i].value;
      break;
    }
  }

  const selectedSize = Array.from(sizeInput)
    .filter((input) => input.checked)
    .map((input) => input.value)[0];

  const data = {
    alegerea: alegerea.options[alegerea.selectedIndex].text,
    denumirea: denumirea.value,
    descrierea: descrierea.value,
    price: price.value,
    color: selectedColor,
    size: selectedSize,
  };
  const key = `form-${Date.now()}`;

  let products = [];

  if (localStorage.getItem("products"))
    products = JSON.parse(localStorage.getItem("products"));

  products.push(data);

  localStorage.setItem("products", JSON.stringify(products));
});

let prevSizeCheckbox = null;

document.querySelectorAll('input[name="size"]').forEach((checkbox) => {
  checkbox.addEventListener("click", () => {
    // remove scale from previously selected checkbox
    if (prevSizeCheckbox !== null) {
      prevSizeCheckbox.parentNode.classList.remove("selected");
      prevSizeCheckbox.parentNode.style.transform = "scale(1)";
    }

    if (checkbox.checked) {
      checkbox.parentNode.classList.add("selected");
      checkbox.parentNode.style.transform = "scale(1.3)";
      prevSizeCheckbox = checkbox;
    } else {
      prevSizeCheckbox = null;
    }
  });
});

const colorBoxes = document.querySelectorAll(".color-box");
let lastColorBox = null;

colorBoxes.forEach((colorBox) => {
  colorBox.addEventListener("click", () => {
    if (lastColorBox !== null) {
      lastColorBox.style.transform = "scale(1.0)";
    }
    colorBox.style.transform = "scale(1.3)";
    lastColorBox = colorBox;
  });
});

