import jwt from "jsonwebtoken";

const SECRET_KEY = "B";

export const auth = ( req, res , next) => {

    try {
        let token = req.headers.authorization;
        console.log(token);
        if(token){
            token  = token.split(" ")[1];
            let user =  jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
                console.log(user );
        }
        else {
            res.status(401).json({ message: "Unauthorized User"})
        }
        next();
    } catch (error) {
        res.status(400).json({ msg: error });
        console.log(error);
      }

}

export default auth;