import _ from 'lodash';
import React, { useState } from 'react'
import datasGrp from './data';


export default function Grouped(){
    const[enter, setEnter]=useState([])
    const[health, setHealth]=useState([])
    const[food, setFood]=useState([])

    /*var grouped = _.groupBy(datasGrp, function(car) {
      return car.field;
    });
    
    console.log(grouped.Entertainment);
    */
   function getValues(){
    var mapped = _.mapValues(_.groupBy(datasGrp, "field"), x => x.map(y => _.omit(y, "field",) ));
    setEnter(mapped.Entertainment)
    setFood(mapped.Food)
    console.log(mapped)
   }
    
    window.onload=getValues

    return(
        <div>
{enter.map((row)=>(
    <div>
<div>{row.name}</div>
<div>{row.price}</div>
        </div>
))}

{food.map((row)=>(
    <div>
<div>{row.name}</div>
<div>{row.price}</div>
        </div>
))}
        </div>
    )
}