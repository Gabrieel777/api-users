const knex = require("../database/connection");
const bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class User{

    async findAll(){
        try{
            let result = await knex.select(["id", "name", "email", "role"]).from("users");
            return result;
        } catch(err){
            console.log(err);
            return [];
        }

    }

    async findById(id){
        try{
            let result = await knex.select(["id", "name", "email", "role"]).where({id: id}).table("users");
            
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

    async new(name, email, password){        
        try{

            let hash = await bcrypt.hash(password, 10);

            await knex.insert({email, name, password: hash, role: 0}).table("users");
        } catch(err) {
            console.log(err);
        }
    }
    
    async findByEmail(email){
        try{
            let result = await knex.select(["id", "name", "password", "email", "role"]).where({email: email}).table("users");
            
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

    async findEmail(email){
        try{

            let result = await knex.select("*").from("users").where({email: email});

            if(result.length > 0){
                return true;
            } else {
                return false;
            }

        } catch(err){
            console.log(err);
            return false;
        }
    }

    async update(id, name, email, role){
        try{
            let user = await this.findById(id);

            let editUser = {};

            if(user != undefined){

                if(email != undefined){

                    if(email != user.email);

                    let resultEmail = await this.findEmail(email);

                    if(resultEmail == false){

                        editUser.email = email;

                    } else {

                        return {status: false, err: "O email inserido já está cadastrado na base de dados!"}
                    }
                }
                
                if(name != undefined){
                    editUser.name = name;
                }

                if(role != undefined){
                    editUser.role = role;
                }
                
                await knex.update(editUser).where({id: user.id}).table("users");
                return {status: true};

            } else {
                return {status: false, err: "O id inserido não foi encontrado na base de dados!"}
            }

        } catch(err){
            console.log(err);
        }

    }


    async delete(id){

        let user = this.findById(id);

        if(user != undefined){
            try{
                await knex.delete().where({id: id}).table("users")
                return {status: true};
            } catch(err) {
                return {status: err}
            }
        } else {
            return {status: false, err: "O id inserido não foi encontrado na base de dados!"}
        }

    }

    async changePassword(newPassword, id, token){
        try {
            let hash = await bcrypt.hash(newPassword, 10);
            await knex.update({password: hash}).where({id: id}).table("users");

            await PasswordToken.setUsed(token)

        } catch (err) {
            return {status: false, err: err}
        }
    }

}

module.exports = new User();