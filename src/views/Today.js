import React, { useEffect, useState } from "react";
import "./Today.css";
import RecursiveTable from "./RecursiveTable";

function Today() {
  //https://martinco.pythonanywhere.com/api/today
  const [today_data, setToday_Data] = useState(null);
  const fetchDatafunc  = async(url, dataset) => {
    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        dataset(jsonData);
    }
    catch(error){
        console.error('Erro fetching data:' , error);
    }
};

  useEffect(() => {
        fetchDatafunc('https://martinco.pythonanywhere.com/api/today', setToday_Data);
  },[])

  //http://127.0.0.1:5000/api/today_list_order
  const [list_data, setList_Data] = useState();

  useEffect(() => {
    fetchDatafunc('https://martinco.pythonanywhere.com/api/today_list_order', setList_Data);
},[])


  //testing
  const [data_type, setData_Type] = useState(null);



  const [show, setShow] = useState(null);

  function handleDataChange(event){
    setData_Type(event.target.value)
    if (event.target.value === "Open"){
      setShow( <div>
        {list_data ? <RecursiveTable data = {list_data.data_dict_open} ></RecursiveTable>:<p>Loading...</p>}
    </div>)  
    }
    else if (event.target.value === "Closed"){
      setShow( <div>
        {list_data ? <RecursiveTable data = {list_data.data_dict_closed} ></RecursiveTable>:<p>Loading...</p>}
    </div>)  
    }
    else if (event.target.value === "Required"){
      setShow( <div>
        {list_data ? <RecursiveTable data = {list_data.data_dict_required} ></RecursiveTable>:<p>Loading...</p>}
    </div>)  
    }
    else{
      setShow("")
    }
  }

  
  



  return (
    <section className='report'>
        <section className="report-section">
            <h1 className="title">
                Report Name
            </h1>
            <div className="analysis-section">
                <div className="stat-div">
                  {today_data ? (
                    <ul className ="stat-list">
                      {Object.entries(today_data).map(([key,value]) => (
                        
                        <li key={key} className="stat-li">
                            <p>{key}</p>
                            <p>{value}</p>
                        </li>
                      ))}
                       
                    </ul>
                  ) : 
                  (
                    <p>Loading...</p>
                  )
                  } 
                </div>
              </div>
              <select value={data_type} onChange={handleDataChange}>
                <option value="nothing">Select</option>
                <option value="Open">Open</option>
                <option value="Closed">Closed</option>
                <option value="Required">Required</option>
              </select>
              {show}
              
            
        </section>
    </section>
  )
}

export default Today;
