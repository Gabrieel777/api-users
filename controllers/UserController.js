const User = require("../models/User");
const PasswordToken = require("../models/PasswordToken");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const secret = "wbklxbxwlkbwxwxkbl"

class UserController {

    async index(req, res){

        let users = await User.findAll();
        res.json(users);

    }

    async findUser(req, res){
        let id = req.params.id;
        let user = await User.findById(id);

        if(user == undefined){
            res.status(404);
            res.json({err: "O id inserido não foi encontrado em nossa base de dados!"})
            return;
        }

        res.status(200);
        res.json(user);
    }

    async create(req, res){
        let {name, email, password} = req.body

        if(name && email && password) {

            let rt = /\S+@\S+\.\S+/;
            let tstemail = rt.test(email);


            if(tstemail != true){
                res.status(400);
                res.json({err: "O email está escrito de forma incorreta!"});
                return;
            }

            let findEmail = await User.findEmail(email);

            if(findEmail){
                res.status(400);
                res.send("O email inserido já está cadastrado no sistema!")
                return;
            }

            await User.new(name, email, password);

            res.status(200);
            res.send("Ok! Dado inserido com sucesso!")

        } else {
            res.status(400);
            res.json({err: "Os dados ainda não estão preenchidos!"});
        }

    }

    async update(req, res){
        let {id, name, role, email} = req.body;
        let result = await User.update(id, name, email, role);
        if(result != undefined){
            if(result.status){
                res.status(200);
                res.send("Tudo OK!")
            } else {
                res.status(406);
                res.send("" + result.err);
            }

        } else {
            res.status(406);
            res.send("Ocorreu um erro no servidor!");
        }
    }

    async remove(req, res){
        let id = req.params.id;
        let result = await User.delete(id)

        if(result.status){
                res.status(200);
                res.send("Usuário deletado com sucesso!")
        } else {
            res.status(406);
            res.send("" + result.err);
        }
    }

    async recoverPassword(req, res){
        let { email } = req.body;

        try{
            let result = await PasswordToken.create(email);
            if(result.status){
                res.status(200);
                res.send("" + result.token);
            } else {
                res.status(406);
                res.send("" + result.err);
            }
        } catch {
            
        }
        
    }

    async changePassword(req, res){
        let { token, password } = req.body;

        try {
            let isTokenValid = await PasswordToken.validate(token);
            if(isTokenValid.status){
                await User.changePassword(password, isTokenValid.token.user_id, isTokenValid.token.token);
                res.status(200);
                res.send("Senha atualizada com sucesso!");             
            } else {
                res.status(406);
                res.send("token inválido");
            }

        } catch (err) {q
            return {status: false, err: err};
        }

    };

    async login(req, res){
        let { email, password } = req.body;
        try {
            let user = await User.findByEmail(email)

            if(user != undefined){
                let result = await bcrypt.compare(password, user.password);

                if(result){
                    let token = jwt.sign({email: user.email, role: user.role}, secret)

                    res.status(400);
                    res.json({token: token});
                } else {
                    res.status(406);
                    res.send("Senha incorreta!");
                }

            } else {
                res.json({status: false});
            }
        } catch (err) {
            return {status: false, err: err}
        }
    }

}

module.exports = new UserController;