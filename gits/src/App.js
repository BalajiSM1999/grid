import './style/App.css'
import Divid from './components/cards';
import { groupBy} from 'lodash';
import _ from 'lodash';
import datasGrp from './data'
import { useState } from 'react';
import Grouped from './group';
function App() {
 const [sort, setSort]=useState([])
 const [group, setgroup]=useState('')
 function doSearch() {
  var input, filter, found, table, tr, td, i, j;
  input = group
  filter = input.toUpperCase();
  table =document.querySelector("#sorted");
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
  return (
    <div className="App">
      <button onClick={doSearch}></button>
      <div class="row" id="sorted">
      {datasGrp.map((row)=>(
        <div className="card" key={row.name} >
          <div className="card-body">
  <div>{row.name}</div>
  <div>{row.price}</div>
  <h5 id="fields">{row.field}</h5>
  <div>{row.date}</div>
  </div>
  </div>
      ))}
          <div>

  </div>
  <div class="dropdown">
                <button class="dropbtn">Group By</button>
                <div class="dropdown-content">
                    <a onMouseDown={()=>setgroup("Entertainment")}onClick={doSearch}>Entertainment</a>
                    <a onMouseDown={()=>setgroup("Health Care")}  onClick={doSearch}>Health Care</a>
                    <a onMouseDown={()=>setgroup("Food")} onClick={doSearch}>Food</a>
                </div>
            </div>
  
</div>
<Grouped />

     <Divid />
    </div>
  );
}

export default App;
