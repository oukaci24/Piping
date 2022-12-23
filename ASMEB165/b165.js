import { DATACT, GRADECT, NOTECT, CLASSESC, GROUPSC } from "./tableC.js";
import { DATAFT, GRADEFT, NOTEFT, CLASSESF, GROUPSF } from "./tableF.js";

var groupvalue = "";
var processvalue = "";
var gradevalue = "";
var compositionvalue = "";
var notevalue = "";
var notedialay = "";
var classvalue = "";
var temperaturevalue = "";
var pressurevalue = "";

const gradeCB = document.getElementById("grade");
const classCB = document.getElementById("pclass");
const tempCB = document.getElementById("temp");
const bodyx = document.getElementById("body");
const radioc = document.getElementById("switchc");
const radiof = document.getElementById("switchf");
const table = document.getElementById("infotable");

radioc.addEventListener("click", systemunitechange);
radiof.addEventListener("click", systemunitechange);
radioc.addEventListener("click", loadbody);
radiof.addEventListener("click", loadbody);
tempCB.addEventListener("change", temperaturechange);
classCB.addEventListener("change", classechange);
gradeCB.addEventListener("change", gradechange);
bodyx.onload = loadbody;

var DATAT = DATACT;
var GRADET = GRADECT;
var NOTET = NOTECT;
var CLASSES = CLASSESC;
var GROUPS = GROUPSC;
var unitep = "Bar";
var unitet = "°C";
radioc.checked = true;

//****************************LOAD DATA********************************************************* */

function loadbody() {
  /******fil class */
  classCB.innerHTML = null;

  CLASSES.forEach((element) => {
    var op = document.createElement("option");
    op.value = element;
    op.textContent = element;
    classCB.appendChild(op);
  });

  /** fill grades */

  gradeCB.innerHTML = null;
  GRADET.forEach((element) => {
    var op = document.createElement("option");
    op.value = element[0];
    op.textContent = element[0];
    gradeCB.appendChild(op);
  });

  gradevalue = gradeCB.value;
  classvalue = classCB.value;
  updatetemp();
  temperaturevalue = tempCB.value;
  updatepressure();
  updatenote();
  updateinfos();
}

/*****************************LISTENERS*************************************************************************** */
function systemunitechange() {
  if (radioc.checked) {
    DATAT = DATACT;
    GRADET = GRADECT;
    NOTET = NOTECT;
    CLASSES = CLASSESC;
    GROUPS = GROUPSC;
    unitep = "Bar";
    unitet = "°C";
  }
  if (radiof.checked) {
    DATAT = DATAFT;
    GRADET = GRADEFT;
    NOTET = NOTEFT;
    CLASSES = CLASSESF;
    GROUPS = GROUPSF;
    unitep = "Psi";
    unitet = "°F";
  }
}

function gradechange() {
  gradevalue = gradeCB.value;

  for (let i = 0; i < GRADET.length; i++) {
    if (gradevalue == GRADET[i][0]) {
      groupvalue = GRADET[i][3];
      processvalue = GRADET[i][1];
      compositionvalue = GRADET[i][2];
      notevalue = GRADET[i][4];
    }
  }

  updatetemp();
  updatepressure();
  updatenote();
  updateinfos();
}

function classechange() {
  classvalue = classCB.value;
  updatepressure();
  updateinfos();
}

function temperaturechange() {
  temperaturevalue = tempCB.value;
  updatepressure();
  updateinfos();
}

/******************UPDATES ************************************************************************************/

function updatetemp() {
  tempCB.innerHTML = null;

  for (let i = 0; i < GRADET.length; i++) {
    if (gradevalue == GRADET[i][0]) {
      groupvalue = GRADET[i][3];
      processvalue = GRADET[i][1];
      compositionvalue = GRADET[i][2];
      notevalue = GRADET[i][4];
    }
  }

  for (let i = 0; i < DATAT.length; i++) {
    if (groupvalue == DATAT[i][0]) {
      var op = document.createElement("option");
      op.value = DATAT[i][2];
      op.textContent = DATAT[i][2];
      tempCB.appendChild(op);
    }
  }
}

function updatepressure() {
  for (let i = 0; i < GRADET.length; i++) {
    if (gradevalue == GRADET[i][0]) {
      groupvalue = GRADET[i][3];
      processvalue = GRADET[i][1];
      compositionvalue = GRADET[i][2];
      notevalue = GRADET[i][4];
    }
  }

  for (let i = 0; i < DATAT.length; i++) {
    if (temperaturevalue == DATAT[i][2] && groupvalue == DATAT[i][0]) {
      for (let j = 3; j < 10; j++) {
        if (classvalue == DATAT[0][j]) {
          pressurevalue = DATAT[i][j];
        }
      }
    }
  }
}

function updatenote() {
  notedialay = "";

  for (let i = 0; i < NOTET.length; i++) {
    if (groupvalue == NOTET[i][0]) {
      if (
        (notevalue.includes("(1)") && NOTET[i][2].includes("(1)")) ||
        (notevalue.includes("(2)") && NOTET[i][2].includes("(2)")) ||
        (notevalue.includes("(3)") && NOTET[i][2].includes("(3)")) ||
        (notevalue.includes("(4)") && NOTET[i][2].includes("(4)")) ||
        (notevalue.includes("(5)") && NOTET[i][2].includes("(5)")) ||
        (notevalue.includes("(6)") && NOTET[i][2].includes("(6)")) ||
        (notevalue.includes("(7)") && NOTET[i][2].includes("(7)")) ||
        (notevalue.includes("(8)") && NOTET[i][2].includes("(8)"))
      ) {
        notedialay = notedialay + NOTET[i][2];
      }
    }
  }
}

/*********************************** infos display*********************************************************************/

function updateinfos() {
  table.rows[0].cells[1].innerHTML = gradevalue;
  table.rows[1].cells[1].innerHTML = groupvalue;
  table.rows[2].cells[1].innerHTML = processvalue;
  table.rows[3].cells[1].innerHTML = compositionvalue;
  table.rows[4].cells[1].innerHTML = classvalue;
  table.rows[5].cells[1].innerHTML = temperaturevalue + "  " + unitet;
  table.rows[6].cells[1].innerHTML = pressurevalue + "  " + unitep;
  table.rows[7].cells[1].innerHTML = notedialay;
}

/********************************************************************************************************************* */
