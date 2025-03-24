import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
//import { updateUser } from '../../../backend/controllers/UserController';
import { BASE_URL } from "../utils";

const EditUser = () => {
const [date, setDate] = useState("");
const [title, setTitle] = useState("");
const [content, setContent] = useState("");
const navigate = useNavigate();
const {id} = useParams();

useEffect(()=>{
    getUserById();
},[]);

const updateUser = async(e) =>{
    e.preventDefault();
    try{
        await axios.patch(`${BASE_URL}/users/${id}`, {
            title,
            content,
        });
        navigate("/");
    }catch(error){
        console.log(error);
    }
};

const getUserById = async () => {
    const response = await axios.get(`http://localhost:5000/users/${id}`);
    setDate(response.data.date);
    setTitle(response.data.title);
    setContent(response.data.content);
}

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={updateUser}>
                <div className="field">
                    <label className="label">Date</label>
                    <div className="control">
                        <input 
                        type="date" 
                        className="input" 
                        value={date} 
                        readOnly/>
                    </div>
                </div>
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
                        Update
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
};

export default EditUser;
