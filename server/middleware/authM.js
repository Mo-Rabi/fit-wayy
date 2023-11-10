import jwt from "jsonwebtoken";
const auth = (req, res, next) => {
    let {token} = req.headers;
    !token && res.status(401).json({message: "Please provide a token"});
    let decoded = jwt.verify(token, "secret_key");
    if(decoded) {
        next()
    }else{
        res.status(401).json({message: "Invalid token"})
    }
}
export default auth;