import React from 'react';

export default function JourneyListView(data) {
  const journeylist = data.props.journeyData
  //console.log('journeylist '+journeylist);
  
  //this component accepts journey data as props to list each journey
  //displays departure and return stations, covered distance in kilometers and duration in minutes
  return (
    <>

       <div>
    {(typeof journeylist ==='undefined'||journeylist.length<1) ? (
      <>empty list</> //if there is nothing to show, show a spinner
    ):( //display journey
     <>
     <Table journeylist={journeylist}  />
     </>
    )}
    </div>
      
    </>
  );
}

const Table = (data) => {
  //For each journey show departure and return stations, covered distance in kilometers and duration in minutes
  const columns = [
    { accessor: 'Departurestationname', label: 'Departure' },
    { accessor: 'Returnstationname', label: 'Return' },
    { accessor: 'Covereddistancem', label: 'Distance (m)' },
    { accessor: 'Durationsec', label: 'Duration (sec)' },
  ];
  const journeylist = data.journeylist.slice(0,20)
  //console.log('rows: '+journeylist);
  
  return (
    <table>
      <thead>
        <tr>
          {columns.map(column => {
            return <th key={column.accessor}>{column.label}</th>
          })}
        </tr>
      </thead>
      <tbody>
        {journeylist.map(journey => {
          return (
            <tr key={journey.id}>
              {columns.map(column => {
                if (column.format) {
                  return <td key={column.accessor}>{column.format(journey[column.accessor])}</td>
                }
                return <td key={column.accessor}>{journey[column.accessor]}</td>
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}