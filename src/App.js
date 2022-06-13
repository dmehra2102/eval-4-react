import React, { useEffect, useState } from "react";
import ButtonComponent from "./components/ButtonComponent";
import CityRow from "./components/CityRow";
import "./styles.css";

export default function App() {
  const [data, setData] = useState([{}]);
  const [page,setpage] = useState(1);
  const [sorting,setsorting] = useState(true);

// <div id="loading-container"></div>

  useEffect(() => {
        fetch(`https://json-server-mocker-masai.herokuapp.com/cities?_limit=10&_page=${page}`)
      .then((res)=> res.json())
      .then(datas=> {
        if(sorting){
          return datas.sort((a,b)=> a.population-b.population);
        }
        return datas.sort((a,b)=> b.population-a.population);
      })
      .then((datas)=> setData(datas));
      console.log(data);

  }, [page,sorting]);

  

  const handlechange = (inc)=>{
    setpage(page+inc); 
  }
  
  return (
    <div className="App">
      {/* <div id="loading-container"></div> */}
      <table>
        <tr>
          <th>
            ID
          </th>
          <th>
            CITY NAME
          </th>
          <th>
            COUNTRY NAME
          </th>
          <th>
            POPULATION
          </th>
          </tr>
          {
            data.map((item)=> {
                return <CityRow item={item}/>              
            })
          }
      </table>

      <div>{
        page!==1 && (
           <ButtonComponent title="PREV" id="PREV" onClick={()=> handlechange(-1)}/>
          )
        }
        <ButtonComponent id="SORT_BUTTON" title={!sorting ? "Sort by Increasing Population": "Sort by Descending Population"} onClick={()=> setsorting(!sorting)}/>
        {
          page!==5 && (
            <ButtonComponent id="NEXT" title="NEXT" page={page} setpage={setpage} onClick={()=> handlechange(1)}/>
          )
        }
      </div>
    </div>
  );
}
