import React from 'react'

export default function Divid(){
function btnSort(){
    var list, i, switching, b, shouldSwitch;
    list =document.querySelector("#divided");
    switching = true;
   
    while (switching) {
      switching = false;
      b = list.getElementsByClassName("card");
      for (i = 0; i < (b.length - 1); i++) {
        shouldSwitch = false;
        if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
      }
    }
       
}

function doSearch() {
    var input, filter, found, table, tr, td, i, j;
    input = document.getElementById("searchTerm");
    filter = input.value.toUpperCase();
    table =document.querySelector("#divided");
    tr = table.getElementsByClassName("card");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("h5");
        for (j = 0; j < td.length; j++) {
            if (td[j].innerHTML.toUpperCase().indexOf(filter) > -1) {
                found = true;
            }
        }
        if (found) {
            tr[i].style.display = "";
            found = false;
        } else {
            tr[i].style.display = "none";
        }
    }
}
    return(
      <div>

        <div id="divided">
            <button id="btnSort" onClick={btnSort}>sort</button>
            <p>Search: <input type="text" id="searchTerm" onKeyPress={doSearch} /></p>
        <div className="card" id="card">
  <div className="card-body">
    <h5 className="card-title">Card title</h5>
    <a href="#" className="btn btn-primary">Go </a>
  </div>
</div>

<div className="card">
  <div className="card-body">
    <h5 className="card-title">Apple</h5>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>
<div className="card">
  <div className="card-body">
    <h5 className="card-title">banana</h5>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div><div className="card">
  <div className="card-body">
    <h5 className="card-title">dates</h5>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div><div className="card">
  <div className="card-body">
    <h5 className="card-title">peanuts</h5>
    <a href="#" className="btn btn-primary">Go </a>
  </div>
</div><div className="card">
  <div className="card-body">
    <h5 className="card-title">xerox</h5>
    <a href="#" className="btn btn-primary">Go somewhere</a>
  </div>
</div>

        </div>

      </div>

    )
}

/*
   $('.card .card-body').sort(function(a,b) {
            return $(a).find(".card-title").text() > $(b).find(".card-title").text() ? 1 : -1;
        }).appendTo(".card");
        */