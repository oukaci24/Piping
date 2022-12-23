//****************************************************************************************** */
let unite = "Pa";
let tempu = 0;
const inputbox = document.getElementById("inputtemp");
const templabel = document.getElementById("unitlabel");
const radios = document.querySelectorAll('input[name="radio"]');
const table = document.getElementById("table");
const remark = document.getElementById("remark");

const tab = [
  [1.0, 0.0, "Pa"],
  [1000000.0, 0.0, "Mpa"],
  [100000.0, 0.0, "Bar"],
  [6894.757, 0.0, "Psi"],
  [9806.38, 0.0, "m_H2O"],
  [133.322387415, 0.0, "mm_HG"],
  [101325, 0.0, "Atm"],
];
//************************************************************************************** */
const bodyx = document.getElementById("body");

bodyx.onload = function () {
  unite = "Pa";
  tempu = 1000000;
  radios.item(0).checked = true;
  templabel.innerHTML = "[" + unite + "]";
  calcule();
};

//*********************************************************************************** */

radios.forEach((element) => {
  element.addEventListener("click", () => {
    if (element.checked) {
      unite = element.value;
      templabel.innerHTML = "[" + unite + "]";
      if (inputbox.value.length == 0) {
        tempu = 0;
      }
      if (inputbox.value.length != 0) {
        tempu = parseFloat(inputbox.value);
      }
      calcule();
    }
  });
});

inputbox.addEventListener("input", () => {
  if (inputbox.value.length == 0) {
    tempu = 0;
  }
  if (inputbox.value.length != 0) {
    tempu = parseFloat(inputbox.value);
  }

  calcule();
});

/***************************************************************************************** */
function calcule() {
  let j = 0;

  remark.innerHTML = "";

  if (tempu < 0) {
    tempu = 0;
    inputbox.value = "";
  }

  for (let i = 0; i < tab.length; i++) {
    if (tab[i][2] == unite) {
      j = i;
    }
  }

  for (let i = 0; i < tab.length; i++) {
    tab[i][1] = ((tab[j][0] / tab[i][0]) * tempu).toFixed(3);

    table.rows[i].cells[1].innerHTML = tab[i][1];
  }

  if (unite == "Psi") {
    remark.innerHTML = "Remark :Psi = lbf/in2";
  }
  if (unite == "Atm") {
    remark.innerHTML = "Remark :Atm = Kgf/m2";
  }
}
