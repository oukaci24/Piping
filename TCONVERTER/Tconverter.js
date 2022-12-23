//****************************************************************************************** */
let unite = "k";
let tempu = "0.0";
const inputbox = document.getElementById("inputtemp");
const templabel = document.getElementById('templabel');

const radios = document.querySelectorAll('input[name="radio"]');
const remark = document.getElementById("remark");
const table = document.getElementById('table');



const tab = [
  [1, 0.0, 0.0, "K"],
  [1, 273.15, 0.0, "C"],
  [5 / 9, 255.3722222, 0.0, "F"],
  [0.555555556, 0.0, 0.0, "R"],
  [1.25, 273.15, 0.0, "Re"],
]
//************************************************************************************** */
const bodyx = document.getElementById("body");

bodyx.onload = function () {
  radios.item(0).checked = true;
  tempu = 0;
  unite = "K";
  templabel.innerHTML="Temperatute [ °"+ unite +" ]";
  calcule();
};

//********************************************************************** */

radios.forEach((element) => {
  element.addEventListener("click", () => {


  
    if (element.checked) {

      
      unite = element.value;
      templabel.innerHTML="Temperatute [ °"+ unite +" ]";
      
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
  remark.innerHTML = "";
  let j=0;

  for (let i = 0; i < tab.length; i++) {

    if(tab[i][3]==unite){

        j=i;
        
    }

  }


  for (let i = 0; i < tab.length; i++) {

    tab[i][2] = ( (tab[j][0] * tempu + tab[j][1] - tab[i][1]) / tab[i][0]  ).toFixed(3);

    table.rows[i].cells[1].innerHTML = tab[i][2];

  }






  if (tab[0][2] < 0) {
    remark.innerHTML = " (0 °K) Absolute zero is the lowest limit ";
  }
}
