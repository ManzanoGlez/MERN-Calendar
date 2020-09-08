const jwt = require("jsonwebtoken");

const generateJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };

        jwt.sign(payload,process.env.SEED,{
            expiresIn: '2h'
        },(err,token)=>{
                if(err){
                    console.warn(err)
                    reject('No se logro generar el token');
                }else{
                    resolve(token);
                }
        });
    });
};

module.exports = { generateJWT };