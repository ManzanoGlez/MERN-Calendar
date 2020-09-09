const jwt = require("jsonwebtoken");

const generateJWT = (user) => {
    return new Promise((resolve, reject) => {

       const payload = {
           uid: user.id,
           name: user.name,
           email: user.email,
       };
 

//console.log(payload);

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
