import React, { Fragment, useEffect, useState } from 'react';

const CovidData = () => {
    const [covidCase, setCovidCase] = useState([])
    const [sorted,setSorted] = useState('')
   const [date,setDate] = useState('&after=2022-01-01')
    const getData = async () => {
        let response = await fetch(process.env.REACT_APP_API_KEY+date)
        let jsonData = response.json()
        jsonData.then(res => {            
            setCovidCase(res.summary)
        });

    }
    const sortByCase = () => {
        if(!sorted){
            let sortedData =  [...covidCase].sort( (a,b)=> a.cases-b.cases)
            setCovidCase(sortedData)
            setSorted(true)
        } else {
            setCovidCase([...covidCase].reverse())
        }
        
    }
    
    useEffect(() => {
        getData()
    }, [])
    return (
        <Fragment>
            <div className='container'>
                <div style={{ margin: "30px" }}>                <h3> Ontario Covid cases since 2022</h3>
                </div>
                <div className='sort-function' style={{ margin: "30px",display:'flex',justifyContent:'center',flexWrap: 'wrap' }}>
                <button className='btn btn-outline-secondary' onClick={sortByCase}> Sort by Number of Cases</button>
                </div>
                <div className='covid-data'>
                {covidCase.map((i, index) => (
                    <div className="table-responsive" key={index}>
                        <table className="table w-100 d-block d-md-table  text-center">
                            <thead>
                                <tr>
                                    <th style={{ minWidth: "150px" }}>Date</th>
                                    <th style={{ minWidth: "150px" }}>province</th>
                                    <th style={{ minWidth: "150px" }}>Cases</th>
                                    <th style={{ minWidth: "150px" }}> Active cases</th>


                                    <th style={{ minWidth: "150px" }}>Deaths</th>
                                    <th style={{ minWidth: "150px" }}>Recovered</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr >
                                    <td style={{ verticalAlign: "middle" }}>{i.date}</td>
                                    <td style={{ verticalAlign: "middle" }}>{i.province}</td>
                                    <td style={{ verticalAlign: "middle" }}>{i.cases}</td>

                                    <td style={{ verticalAlign: "middle" }}>{i.active_cases}</td>
                                    <td style={{ verticalAlign: "middle" }}>{i.deaths}</td>
                                    <td style={{ verticalAlign: "middle" }}>{i.recovered}</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>

                ))}
                </div>
            </div>
        </Fragment>
    )
}
export default CovidData