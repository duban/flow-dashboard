const User = require('../models/users');
const authService = require('../services/auth.service');
const bcryptService = require('../services/bcrypt.service');

const UserController = () => {
	const register_user = async (req, res) => {
	try {
	      const user = await User.create({
	        fullname:req.body.fullname,
	        email:req.body.email,
			phone_number:req.body.phone_number,
			role:req.body.role,
			hash_password:req.body.hash_password,
	      });
	      if (user){
			console.log(user.hash_password)
	        return res.status(201).json({
	                                status: 201,
	                                data: { user },
	                                message: "Registered successfully: "
	                        });
	      }
	    }catch (err) {
	                        return res.status(200).json({
	                                status: 500,
	                                data: [],
	                                message: "Error: " + err
	                        });
	                }
	  };

	const login_user = async (req, res) => {
		const { email, password } = req.body;
		if (email && password){
			try{
				const user = await User.findOne({
                                                        where: {
                                                                email,
                                                        },
                                        });

                                if (!user) {
                                        return res.status(200).json({
                                                status: 400,
                                                data: "",
                                                message: "User not found"
                                        });
                                }
								if(bcryptService().comparePassword(password, user.hash_password)){
									const token = authService().issue({ id: user.id });
									return res.status(200).json({
                                                status: 400,
                                                data: {token, user},
                                                message: "Successfully Logged In"
                                        });
									
								}
			} catch (err) {
								console.log(password)
								console.log(err)
                                return res.status(500).json({
                                        status: 500,
                                        data: "",
                                        message: "Sorry, try again later."
                                });
                        }
		}
		return res.status(200).json({
                        status: 400,
                        data: "",
                        message: "Email or password is wrong."
                });
		};
		
       const list_user = async (req, res) => {
                try {
                        const users = await User.findAll();
						console.log(users)

                        return res.status(200).json({ users });
                } catch (err) {
                        console.log(err);
                        return res.status(500).json({ msg: 'Internal server error' });
                }
        };
		
	
	
  	return {register_user,
			login_user,
			list_user,
  	};
};
module.exports = UserController;
