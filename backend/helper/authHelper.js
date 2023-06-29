const bcrypt = require('bcrypt');

 const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hashSync(password, saltRounds);
        return hashedPassword;


    } catch (error) {
        console.log(error.message);

    }
}

 const comparePassword = async (password, hashedPassword) => {
    return  bcrypt.compareSync(password, hashedPassword);
}

module.exports={hashPassword,comparePassword}