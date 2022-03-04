const Seller = require("../database/models/Seller");
const Sequelize = require("sequelize");
const Sale = require("../database/models/Sale");
const res = require("express/lib/response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

function passwordValidation(password){
    if(password.length < 8)
    return "Senha deve ter no minimo 8 caracteres";
    else if(!password.match(/[a-zA-Z]/g))
    return "Senha deve ter no minimo uma letra";
    else if(!password.match(/[0-9]+/))
    return "Senha deve ter no minimo um numero";
    else return "OK";
}

function generateToken(id){
    process.env.JWT_SECRET= Math.random().toString(36).slice(-20);
    const token = jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: 82800,
    });
    return token;
}

module.exports = {
    async listAllSellers(req, res){
        const sellers = await Seller.findAll({
            order: [["name", "ASC"]],
        }).catch((error) => {
            res.status(500).json({msg: error});
        });
        if(sellers) res.status(200).json({sellers});
        else
        res.status(404).json({ msg: "Não foi possivel encontrar vendedores"});
    },
    async searchSellerByName(req, res){
        const name = req.body.name;
        if (!name)
        res.status(400).json({
            msg : "Parametro nome esta vazio",
        });
        const Op = Sequelize.Op;
        const seller = await Seller.findAll({
            where: {name:{[Op.like]: "%" + name + "%"} },
        });
        console.log(seller);
        if (seller){
            if(seller == "")
            res.status(400).json({msg: "Vendedor não encontrado"});
            else res.status(200).json({seller});
        }else{
            res.status(404).json({
                msg: "Vendedor não encontrado",
            });    
        }
    },
    async newSeller(req, res){
        const {name, email, password } = req.body;
        if(!name || !email || !password){
            res.status(400).json({ msg : "Dados obrigatorios não foram preenchidos"});
        }
        const passwordValid = passwordValidation(password);
        if(passwordValid !== "OK")
        return res.status(400).json({msg: passwordValid});

        const isSellerNew = await Seller.findOne({
            where: {email},
        });
        if (isSellerNew)
            res.status(403).json({msg : "Vendedor ja foi cadastrado"});
        else{
            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(password, salt);
            const seller = await Seller.create({
                name,
                email,
                password: hash,
            }).catch((error) => {
                res.status(500).json({msg: "Não foi possivel inserir os dados"});
            });
            if(seller)
                res.status(201).json({msg : "Novo vendedor foi adicionado"});
            else
                res.status(404).json({msg : "Não foi possivel cadastrar novo paciente"});
        }
    },
    async deleteSeller( req, res){
        const sellerId = req.params.id;
        const deleteSeller = await Seller.destroy({
            where: {id: sellerId },
        }).catch(async (error) => {
            const sellerHasRef = await Sale.findOne({
                where: { sellerId },
            }).catch((error) => {
                res.status(500).json({msg : "Falha na conexão"});
            });
            if(sellerHasRef)
                 res.status(403).json({ msg: "Vendedor possui vendas em seu nome"});
        });
        if (deleteSeller != 0)
            res.status(200).json({msg : "Vendededor excluido com sucesso"});
        else res.status(404).json({msg: "Vendedor não encontrado"});
    },
    async updateSeller(req, res){
        const sellerId = req.body.id;
        const seller = req.body;
        if (!sellerId) 
        res.status(400).json({ msg : "ID do vendedor vazio"});
        else {
            const sellerExists = await Seller.findByPk(sellerId);
            if (!sellerExists)
                res.status(404).json({msg: "Vendedor não encontrado"});
            else {
                if (seller.name || seller.email){
                    await Seller.update(seller, {
                        where: { id: sellerId},
                    });
                    return res.status(200).json({msg : "Vendedor atualizado com sucesso"});
                }else
                return res.status(400).json({msg : "Campos obrigatórios não preenchidos"});
            }    
        }
    },
    async authentication(req,res){
        const email = req.body.email;
        const password = req.body.password;

        if(!email || !password)
           return res.status(400).json({msg : "Parametros vazios"});
        try{
            const seller = await Seller.findOne({
                where : {email},
            });
            if(!seller)
                return res.status(404).json({msg: "Usuario ou senha inválidos"});
            else{
                if(bcrypt.compareSync(password,seller.password)){
                    const token = generateToken(seller.id);
                    return res.status(200).json({msg : "Autenticado com sucesso", token});
                }else
                    return res.status(404).json({msg: "Usuario ou senha inválidos"});    
            }
        } catch(error){
           res.status(500).json(error); 
        }
    },
};