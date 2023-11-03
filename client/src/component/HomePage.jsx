import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../utils/baseUrl';
import './styles.css'
import { Link } from 'react-router-dom';



const HomePage = () => {

  const [url, setUrl] = useState('');
  const [data, setData] = useState('');
  const [loading,setLoading]= useState(false);

  const handleChange = (e) => {
    setUrl(e.target.value)
  }
  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { data } = await axios.post(`${baseUrl}/fetchdata`, {
      url
    })

    if(data){
      setLoading(false);
    }

    setData(data);
    console.log(data?.data?._id);
  }

  //add to favourite
  const handleAddFavourite = async(id)=> {
    const {data} = await axios.put(`${baseUrl}/addFavourite`,{
      id,isFavourite:true
    });
    setData(data)
  }

  //remove from favourite
  const handleRemoveFavourite = async(id)=> {
    const {data} = await axios.put(`${baseUrl}/removeFavourite`,{
      id
    });
    setData(data)
  }

 

  return (
    <div className='main_container'>
      <div className='form_section'>
        <form className='form'>
          <h1>Webpage Scrapper</h1>
          <div className='input_section'>
            <label htmlFor="">Enter Website URL</label>
            <input type="text" value={url} placeholder='Enter your url' onChange={handleChange} />
          </div>
          <button className='submit_button' type='submit' onClick={handleSubmit}>Get insights</button>
        </form>
      </div>

      {loading === true &&  <h2>Loading..Please wait</h2>}

      {data && (
        <div className='main_table'>
          <h1>Search Result</h1>
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
            <tbody>
              <tr>
                <td>{data?.data?.url}</td>
                <td>{data?.data?.wordCount}</td>
                <td>
                  {data?.data?.isFavourite === true? "true" : "false"}
                </td>
                <td>
                  {data?.data?.webLinks?.map((item) => (
                    <>
                      {item?.length > 80 ? <a href={item}>{item.substring(0,80)}</a> : <a href={item}>{item}</a>}
                      {<br />}
                    </>
                  ))}
                </td>
                <td>
                  {data?.data?.mediaLinks?.map((item) => (
                    <>
                      {item?.length > 50 ? <a href={item}>{item.substring(0,50)}</a> : <a href={item}>{item}</a>}
                      {<br />}
                    </>
                  ))}
                </td>
                <td className='button_section'>
                  <button className='add_favourite' onClick={()=> handleAddFavourite(data?.data?._id)}>Add to favourite</button>
                  <button className='remove_favourite' onClick={()=>handleRemoveFavourite(data?.data?._id)}>Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <button className='view_all'>
        <Link className='link' to={'/viewAll'}>View All Search</Link>
      </button>


    </div>
  )
}

export default HomePage