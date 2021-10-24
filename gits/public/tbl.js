import React, {useState} from 'react'
import $ from 'jquery';
import data from '../data/rowdata.js'
import { Pie, defaults } from 'react-chartjs-2'
import {
    PieChart,
    Tooltip,
    BarChart,
    XAxis,
    YAxis,
    Legend,
    CartesianGrid,
    Bar,
  } from "recharts";
import ChartView from './chartj2.js';

export default function TableSort() {

    //Hooks
    const [sort, setSort]=useState(0)
    const [group, setgroup]=useState('')
    const [chart, setChart]=useState(data)
    const[charName, setCharName]=useState([])
    const[charPrice, setCharPrice]=useState([])
    const [ selected, setselected]=useState(data)
   
//Chart Values
    function getCharvalues(){

   
    var i,j, text=[], prices=[], result;
    for(i=0; i<chart.length; i++){
        text.push(chart[i].name)
    }
    for(j=0; j<chart.length; j++){
        prices.push(chart[j].price)
    }
    setCharPrice(prices)
    setCharName(text)

}
window.onload=getCharvalues


//Sorting
    function sortColumn() {
        var filterTable, rows, sorted, i, x, y, sortFlag;
        filterTable = document.querySelector("#myTableGrid");
        sorted = true;
        while (sorted) {
            sorted = false;
            rows = filterTable.rows;
            console.log(rows)
            for (i = 1; i < rows.length - 1; i++) {
                sortFlag = false;
                x = rows[i].getElementsByTagName("TD")[sort];
                y = rows[i + 1].getElementsByTagName("TD")[sort];
                if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                    sortFlag = true;
                    break;
                }
            }
            if (sortFlag) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                sorted = true;
            }
        }
    }

    //Search
    function doTextSearch() {
        var input, filter, found, table, tr, th, td, i, j;
        input = document.getElementById("searchTermsRow");
        filter = input.value.toUpperCase();
        table = document.querySelector("#myTableGrid");
        tr = table.getElementsByTagName("tr");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
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



    //Grouping and Pie Chart
    function groupRows() {
        console.log(group)
        var input, filter, found, table, tr, th, td, i, j, k;
        filter = group.toUpperCase();
        table = document.querySelector("#myTableGrid");
        tr = table.getElementsByTagName("tr");
        th = table.getElementsByTagName("tr");
     
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td");
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
        var a,b,c,d, selName=[], selectPrice=[], selectName=[], result;
        for(a=0; a<selected.length; a++){
   
            if(selected[a].field===group){
                selName.push(selected[a])
            }
        }
        for(b=0; b<selName.length; b++){
            selectName.push(selName[b].name)
        }
        for(c=0; c<selName.length; c++){
            selectPrice.push(selName[c].price)
        }
        console.log(selectName)
        setCharPrice(selectPrice)
        setCharName(selectName)
    }

    return (
        <div>



            <input className="searchbar" type="text" id="searchTermsRow" placeholder="search..." onKeyPress={doTextSearch} />
           
            <table class="table mydatatable" id="myTableGrid"  >
            <thead>
                        <th scope="col" >Name</th>
                        <th scope="col" >Price</th>
                        <th scope="col" >Field</th>
                        <th scope="col">Date</th>
                </thead>
                {data.map((row) => (

                    <tbody key={row.name} className='tablerow' >
                        <tr id="rows">
                            <td className="cell-name">{row.name}</td>
                            <td className="cell-price">{row.price}</td>
                            <td data-field="field" className="cell-field">{row.field}</td>
                            <td className="cell-date" title="datetoLocal" data-testid="datetoLocal">{row.date}</td>
                        </tr>

                    </tbody>
                ))}

            </table><br></br><br></br>
            <div class="dropdown">
                <button class="dropbtn">Sort By</button>
                <div class="dropdown-content" id="sort-content">
                    <a  onMouseDown={()=>setSort(0)}  onClick={sortColumn }>Name</a>
                    <a   onMouseDown={()=>setSort(1)}  onClick={sortColumn}>Price</a>
                    <a  onMouseDown={()=>setSort(2)}  onClick={sortColumn}>Field</a>
                    <a   onMouseDown={()=>setSort(3)}   onClick={sortColumn}>Date</a>
                </div>
            </div>

         
            <div className="chart-container">
            <div class="dropdown">
                <button class="dropbtn">Group By</button>
                <div class="dropdown-content">
                    <a onMouseDown={()=>setgroup("Entertainment")}onClick={groupRows}>Entertainment</a>
                    <a onMouseDown={()=>setgroup("Health Care")}  onClick={groupRows}>Health Care</a>
                    <a onMouseDown={()=>setgroup("Food")} onClick={groupRows}>Food</a>
                </div>
            </div>
            <Pie
        data={{
          labels:charName,
          datasets: [
            {
              data: charPrice,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
         
          ],
        }}
        height={200}
        width={200}
      />
         
            </div>
           
        </div>
    )
}

/*

 const[selName, setselName]=useState([])
    const[selPrice, setselPrice]=useState([])
    const[charData, setCharData]=useState([])
    const [ show, setShow]=useState('')

 function selectedChar(){
 
    var a,b,c,d, selName=[], selectPrice=[], selectName=[], result;
    for(a=0; a<selected.length; a++){

        if(selected[a].field===show){
            selName.push(selected[a])
        }
    }
    for(b=0; b<selName.length; b++){
        selectName.push(selName[b].name)
    }
    for(c=0; c<selName.length; c++){
        selectPrice.push(selName[c].price)
    }
    console.log(selectName)
    setCharPrice(selectPrice)
    setCharName(selectName)
 }

  <div class="dropdown">
                <button class="dropbtn">Group By</button>
                <div class="dropdown-content">
                    <a onMouseDown={()=>setShow("Entertainment")}onClick={selectedChar}>Entertainment</a>
                    <a onMouseDown={()=>setShow("Health Care")}  onClick={selectedChar}>Health Care</a>
                    <a onMouseDown={()=>setShow("Food")} onClick={selectedChar}>Food</a>
                </div>
            </div>



*/