




import jd from './tableb3610.json' assert {type: 'json'};
const tab = jd.tab3610;
var NPStab =[] ;
var SCHtab =[] ;



       const NPScombo = document.getElementById('nps');
       const SCHcombo = document.getElementById('sch');
       const table = document.getElementById("infotable");
  
       
 function constructeur(){

    getnps();
    getsch();
    getinfo();

};

 function getnps () {

    let temp = [];

    tab.forEach(element => { temp.push(element.NPS); });
    temp.shift();

    NPStab = temp.filter((x, i) => temp.indexOf(x) === i);

    NPStab.forEach(element => {

        let op = document.createElement('option');
        op.textContent=element;
        op.value =element;
        NPScombo.appendChild(op);
        
    });

};

 function getsch (){
    SCHtab.length =0;
   
    
    tab.forEach(element => {
        
        if(NPScombo.value ==element.NPS && element.SCHEDULE != "***")
        {
            SCHtab.push(element.SCHEDULE) ;
            
        }

        if(NPScombo.value ==element.NPS && element.SCHEDULE == "***")
        {
            SCHtab.push(element['THICKNESS (mm)']) ;
            
        }

    });


    SCHcombo.innerHTML=null;
    
  SCHtab.forEach(element => {

    let op = document.createElement('option');
    op.textContent=element;
    op.value =element;
    SCHcombo.appendChild(op);
  });
    
};

  function getinfo()
{

   tab.forEach(element => 
   {

      if(NPScombo.value==element.NPS && (SCHcombo.value==element.SCHEDULE||SCHcombo.value==element['THICKNESS (mm)'] )) 
      {
       
          table.rows[0].cells[1].innerHTML=NPScombo.value + SCHcombo.value ;
          table.rows[1].cells[1].innerHTML=element.DN ;
          table.rows[2].cells[1].innerHTML=element['THICKNESS (mm)'] ;
          table.rows[3].cells[1].innerHTML=element['DIAMETRE (mm)'] ;
          table.rows[4].cells[1].innerHTML=element['ID (mm)'] ;
          table.rows[5].cells[1].innerHTML=element['WEIGHT (kg/m)'] ;
          table.rows[6].cells[1].innerHTML=element['DIAMETRE (in)'] ;
          table.rows[7].cells[1].innerHTML=element['THICKNESS (in)'];
          table.rows[8].cells[1].innerHTML=element['WEIGHT (lb/ft)'] ;

     
        
      };
    
    
   });
   

};



//********************************************
constructeur();
NPScombo.addEventListener("change", getsch ) ;
NPScombo.addEventListener("change", getinfo ) ;
SCHcombo.addEventListener("change", getinfo) ;


 
  




