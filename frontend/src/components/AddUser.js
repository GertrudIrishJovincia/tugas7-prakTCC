import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../utils";

const AddUser = () => {
//const [date, setDate] = useState("");
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const navigate = useNavigate();

const saveUser = async(e) =>{
    e.preventDefault();
    try{
        await axios.post(`${BASE_URL}/users`, {
            title,
            content
        });
        navigate("/");
    }catch(error){
        console.log(error);
    }
};

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={saveUser}>
                {/* <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                        <input 
                        type="date" 
                        className="input" 
                        value={date} 
                        onChange={(e)=> setDate(e.target.value)}
                        placeholder='Date'/>
                    </div>
                </div> */}
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input 
                        type="text" 
                        className="input" 
                        value={title} 
                        onChange={(e)=> setTitle(e.target.value)}
                        placeholder='Title'/>
                    </div>
                </div>
                <div className="field">
                    <label className="label">Content</label>
                    <div className="control">
                        <input 
                        type="text" 
                        className="input" 
                        value={content} 
                        onChange={(e)=> setContent(e.target.value)}
                        placeholder='Content'/>
                    </div>
                </div>
                <div className="field">
                    <button type='submit' className='button is-success'>
                        Save
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default AddUser;