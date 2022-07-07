import React, { useEffect, useState } from 'react'
//import "./chart.scss"
//import  { PureComponent } from 'react';
import { BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer ,Legend , Bar } from 'recharts';
import axios from 'axios';




const BChart = () => {

    const [countryData, setCountryData] = useState([]);

    useEffect( () =>{
      axios.get("http://localhost:3001/getCountryTotal").then(
        (response)=>{
            setCountryData(response.data);
            console.log(response.data);
        })
    },[])
  return (
    <div className='chart'>
        <div className="title">Rating Counts</div>
        <BarChart width={730} height={250} data={countryData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total" fill="#8884d8" />
        </BarChart>
    </div>
  )
}

export default BChart