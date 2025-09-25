import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { db } from "../config/database.js";
import dotenv from "dotenv";
dotenv.config();
export async function signUp(req,res){

const usuario=req.body;





try{
await db.collection("usuarios").insertOne({
  ...usuario,
  password:bcrypt.hashSync(usuario.password,10)}
);
res.status(201).send("Registro feito com sucesso!");
}catch(error){
return res.status(500).send(error.message);  
}
};

export async function signIn(req,res){

const usuario=req.body;




try{
const usuarioCadastrado= await db.collection("usuarios").findOne({
  email:usuario.email,
});
if(!usuarioCadastrado){
  return res.status(404).send("Usuário não encontrado");
}
if(usuarioCadastrado && bcrypt.compareSync(usuario.password,usuarioCadastrado.password)){
  console.log("Usuário logado com alegria!")
  const token= jwt.sign(
    { userId:usuarioCadastrado._id}, 
    process.env.JWT_SECRET,
  {expiresIn:86400});
  
  return res.status(200).send(token);
}
  return res.status(401).send("Email e senha incompatíveis!");
}catch(error){
return res.status(500).send(error.message);  
}
};