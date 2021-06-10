const knex = require("../database/connection");
const User = require("./User");
const { v4: uuidv4 } = require("uuid");

class PasswordToken {
 
    async findByEmail(email){
        try{
            let result = await knex.select(["id", "name", "email", "role"]).where({email: email}).table("users");
            
            if(result.length > 0){
                return result[0];
            } else {
                return undefined;
            }
        }catch(err){
            console.log(err);
            return undefined;
        }
    }

    async create(email){
        try {

            let user = await this.findByEmail(email);

            if(user != undefined){

                let token = uuidv4();

                await knex.insert({
                    user_id: user.id,
                    used: 0,
                    token: token
                }).table("passwordtokens");

                return {status: true, token: token};

            } else {
                return{status: false, err: "O email inserido não foi encontrado em nossa base de dados!"};
            }

        } catch (err) {
            console.log(err);
            return{status: false, err: err};
        }
    }

    async validate(token){
        try {
            let result = await knex.select().where({token: token}).table("passwordtokens");

            if(result.length > 0){

                let tk = result[0]

                if(tk.used){
                    return {status: false};
                } else {
                    return {status: true, token: tk};
                }

            } else {
                return{status: false, err: "O token inserido não foi encontrado em nossa base de dados!"};
            }

        } catch (err) {   
            return {status: false, err: err}
        }
    }

    async setUsed(token){
        await knex.update({used: 1}).where({token: token}).table("passwordtokens")
    }

}

module.exports = new PasswordToken;