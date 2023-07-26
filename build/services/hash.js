const bcrypt = require('bcrypt');
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
async function checkhashPassword(password, hashpassword) {
    console.log(password, '-------------------------------', hashpassword);
    await bcrypt.compare(password, hashpassword, function (err, result) {
        console.log("err================1", err);
        console.log("result=============1", result);
        if (err)
            throw err;
        return result == true ? 1 : 0;
    });
}
module.exports = {
    hashPassword,
    checkhashPassword,
};
//# sourceMappingURL=hash.js.map