import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { baseUrl } from '../utils/baseUrl';
import'./styles.css'

const ViewAll = () => {

const [datas, setDatas] = useState('');

const fetchDatas = async()=>{
  const {data} = await axios.get(`${baseUrl}/viewAll`);
  setDatas(data?.data);
}


// //add to favourite
// const handleAddFavourite = async(id)=> {
//   const {datas} = await axios.put(`${baseUrl}/addFavourite`,{
//     id
//   });
//   console.log(datas);
// }

// //remove from favourite
// const handleRemoveFavourite = async(id)=> {
//   const {data} = await axios.put(`${baseUrl}/removeFavourite`,{
//     id
//   });
//   setDatas(data)
// }



useEffect(()=>{
  fetchDatas();
},[])

  return (
    <>
       {datas?  (
        <div className='main_table'>
          <h1 style={{color:"red"}}>All Search Result</h1>
          <table>
            <thead>
              <tr>
                <th>Domain Name</th>
                <th>Word Count</th>
                <th>Favourite</th>
                <th width={'5'}>Web Links</th>
                <th>Media Links</th>
                <th>Actions</th>
              </tr>
            </thead>

            {datas && datas.map((data)=>(
              <tbody key={data?._id}>
              <tr>
                <td>{data?.url}</td>
                <td>{data?.wordCount}</td>
                <td>
                  {data?.isFavourite === true ? "true" : "false"}
                </td>
                <td>
                  {data?.webLinks?.map((item) => (
                    <>
                      {item?.length > 80 ? <a href={item}>{item.substring(0,80)}</a> : <a href={item}>{item}</a>}
                      {<br />}
                    </>
                  ))}
                </td>
                <td>
                  {data?.mediaLinks?.map((item) => ( 
                    <>
                      {item?.length > 50 ? <a href={item}>{item.substring(0,50)}</a> : <a href={item}>{item}</a>}
                      {<br />}
                    </>
                  ))}
                </td>
                <td className='button_section'>
                  <button className='add_favourite'>Add to favourite</button>
                  <button className='remove_favourite'>Remove</button>
                </td>
              </tr>
            </tbody>
            ))}
            
          </table>
        </div>
      ) : (
        <div>
          <h2>Loading.... please wait</h2>
        </div>
      )}
    </>
  )
}

export default ViewAll