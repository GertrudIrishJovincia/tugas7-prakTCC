import User from "../models/UserModel.js";

export const getUsers = async(req, res) =>{
    try{
        const response = await User.findAll();
        console.log(response);
        res.status(200).json(response);
    } catch(error){
        console.log(error.message);
    }
}

export const getUserById = async(req, res) =>{
    try{
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch(error){
        console.log(error.message);
    }
}

export const createUser = async(req, res) =>{
    try{
        const date = req.body.date 
            ? new Date(req.body.date) 
            : new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
        
        await User.create({
            date: date.toISOString().split("T")[0], 
            title: req.body.title,
            content: req.body.content
        });

        res.status(201).json({msg: "User Created"});
    } catch(error){
        console.log(error.message);
    }
};


// export const createUser = async(req, res) =>{
//     try{
//         await User.create(req.body);
//         res.status(201).json({msg: "User Created"});
//     } catch(error){
//         console.log(error.message);
//     }
// }

export const updateUser = async(req, res) =>{
    try{
        await User.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch(error){
        console.log(error.message);
    }
}

// export const updateUser = async(req, res) =>{
//     try{
//         await User.update(req.body,{
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({msg: "User Updated"});
//     } catch(error){
//         console.log(error.message);
//     }
// }

export const deleteUser = async(req, res) =>{
    try{
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch(error){
        console.log(error.message);
    }
}