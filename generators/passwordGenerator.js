const passwordGenerator = ()=>{
    const generator = "AaBbcCdDEefFGgHhiIJjKklLmMNnoOpPQqRrSstTuUVwWXxYyZz0123456789!@#$%^&89)-_+={}[]|?/:;'<>"
    let password = '';
    for(let i = 1 ; i <= 20 ; i++){
        password += generator.charAt(Math.floor(Math.random()*generator.length));
    }
    return password;
}

module.exports = passwordGenerator;