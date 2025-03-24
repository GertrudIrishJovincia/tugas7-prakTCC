import React, {useState, useEffect} from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';
//import { deleteUser } from '../../../backend/controllers/UserController';
import { BASE_URL } from "../utils";

const UserList = () => {
const[users, setUser] = useState([]);

useEffect(()=>{
    getUsers();
},[]);

const getUsers = async () =>{
    const response = await axios.get(`${BASE_URL}/users`); 
    setUser(response.data);
};

const deleteUser = async(id) =>{
    try{
        await axios.delete(`${BASE_URL}/users/${id}`);
        getUsers();
    } catch(error){
        console.log(error);
    }
}

const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    return dateObj.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
};

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <Link to={`add`} className='button is-success'>Add Notes</Link>
            <table className='table is-striped is-fullwidth'>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Date</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                        <td>{index +1}</td>
                        <td>{formatDate(user.date)}</td>
                        <td>{user.title}</td>
                        <td>{user.content}</td>
                        <td>
                            <Link to={`edit/${user.id}`} className='button is-small is-info'>Edit</Link>
                            <button onClick={()=> deleteUser(user.id)} className='button is-small is-danger'>Delete</button>
                        </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default UserList
