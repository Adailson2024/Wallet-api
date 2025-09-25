import { ObjectId } from "mongodb";
import { db } from "../config/database.js";


export async function getTransacoes(req, res){
  let page = req.query.page || 1;
  page = Number(page); 
  if (isNaN(page) || !Number.isInteger(page) || page <= 0) {
    
    return res.status(400).send({
        mensagem: "O parâmetro 'page' deve ser um número inteiro positivo (ex: 1, 2, 3)."
    });
  }
  const limite = 10;
  const inicio = (page - 1)*limite;
  try{
    const transacoes = await db.collection("transaction")
    .find({user:res.locals.user._id})
    .skip(inicio)
    .limit(limite)
    .toArray()
    return res.send(transacoes);
  }catch(err){
    res.status(500).send(err.message)
  }
};

export async function getTransacoesPorId(req,res){
   const id=req.params.id;
   
   try {
   const transaction = await db.collection("transaction").findOne({
  _id:new ObjectId(id),
  user: res.locals.user._id
   });
   if(!transaction) return res.status(404).send("Transação não encontrada!");
   return res.send(transaction)
   }catch(err){
   res.status(500).send(err.message);
   }
};
export async function criarTransacoes(req,res){
  const transaction=req.body;
  
  
  try{
  
  await db.collection("transaction").insertOne({
    ...transaction,
  user: res.locals.user._id,
  createdAt:new Date()
  });
    res.status(201).send("Sua transação foi adicionada com sucesso!")
  } 
  catch(err){
    res.status(404).send(err.message)
  }
};
export async function deletarTransacoes(req, res){
  const {id}=req.params;
    try {
         
        const resultado = await db.collection("transaction").deleteOne({
            _id: new ObjectId(id),
            user: res.locals.user._id
        });

        if (resultado.deletedCount === 0) {
            return res.status(404).send("Essa transação não existe"); // not found
        }
        return res.status(204).send("Transação deletada com sucesso!");
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function alterarTransacoes(req, res){
    const { id } = req.params;
    const transaction = req.body;

    
  try{

    
    
   const resultadoUpdate=await db.collection("transaction").updateOne(
        { _id: new ObjectId(id) },
        {
        $set: {
          value:transaction.value,
          description:transaction.description,
          type:transaction.type
        }
});
if(resultadoUpdate.matchedCount===0){
  return res.status(404).send("Essa transação não existe!");
}
 res.send("Transação atualizada!")
  }
  catch(err){
     return res.status(500).send(err.message);
  }
};