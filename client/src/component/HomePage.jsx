import React, { useState } from 'react'

const HomePage = () => {

    const [url, setUrl] = useState('');



    //form submit
    const handleSubmit = ()=>{

    }

  return (
    <div>
        <form>
            <div>
                <label htmlFor="">Enter your URL</label>
                <input type="text" />
            </div>
            <button type='submit' onClick={handleSubmit}>Submit</button>
        </form>
    </div>
  )
}

export default HomePage