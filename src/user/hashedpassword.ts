import * as bcrypt from 'bcrypt';

export const hashPassword = async (password:string)=>{
    try {
        const hashedPassword = await bcrypt.hash(password,12);
        return hashedPassword;
    } catch (error) {
        throw error;
    }
}

export const checkPass = async (hashedPassword:string,userPassword:string)=>{
    try {
        const result = await bcrypt.compare(userPassword,hashedPassword);
        if(result){
            return true;
        }else{
            return false;
        }
    } catch (error) {
        throw error;
    }
}