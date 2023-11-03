import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../utils/baseUrl';
import './styles.css'
import { Link } from 'react-router-dom';



const HomePage = () => {

  const [url, setUrl] = useState('');
  const [data, setData] = useState('')

  const handleChange = (e) => {
    setUrl(e.target.value)
  }
  //form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(`${baseUrl}/fetchdata`, {
      url
    })
    setData(data);
    console.log(data);
  }

  useEffect(() => {

  }, [data])

  return (
    <div className='main_container'>
      <form className='form'>
        <div className='input_section'>
          <label htmlFor="">Enter your URL</label>
          <input type="text" value={url} placeholder='Enter your url' onChange={handleChange} />
        </div>
        <button className='submit_button' type='submit' onClick={handleSubmit}>Submit</button>
      </form>

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
                  {data?.data?.isFavourit === "true" ? true : "false"}
                </td>
                <td>
                  {data?.data?.webLinks.map((item) => (
                    <>
                      {item?.length > 80 ? <a href={item}>{item.substring(0,80)}</a> : <a href={item}>{item}</a>}
                      {<br />}
                    </>
                  ))}
                </td>
                <td>
                  {data?.data?.mediaLinks.map((item) => (
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