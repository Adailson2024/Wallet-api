import { ObjectId } from "mongodb";
import { db } from "../config/database.js";


export async function getTransacoes(req, res){
  const pagina = req.query.pagina || 1;
  const limite = 2;
  const inicio = (pagina - 1)*limite;
  try{
    const transacoes = await db.collection("transaction")
    .find()
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
  _id:new ObjectId(id)
   });
   if(!transaction) return res.status(404).send("transaction não encontrada!");
   return res.send(transaction)
   }catch(err){
   res.status(500).send(err.message);
   }
};
export async function criarTransacoes(req,res){
  const transaction=req.body;
  
  
  try{
  const transactionExistente=
  await db.collection("transaction").findOne({titulo:transaction.titulo});
  if(transactionExistente){
    return res.status(409).send("transaction com este título já cadastrada")
  }
  await db.collection("transaction").insertOne({
    ...transaction,
  user: res.locals.user._id
  });
    res.status(201).send("Sua transaction foi adicionada com sucesso!")
  } 
  catch(err){
    res.status(404).send(err.message)
  }
};
export async function deletarTransacoes(req, res){
  const {id}=req.params;
    try {
         
        const resultado = await db.collection("transaction").deleteOne({
            _id: new ObjectId(id)
        });

        if (resultado.deletedCount === 0) {
            return res.status(404).send("Essa transaction não existe"); // not found
        }
        return res.status(204).send("transaction foi deletada com sucesso!");
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function alterarTransacoes(req, res){
    const { id } = req.params;
    const transaction = req.body;

    
  try{

    const transactionExistente = await db.collection("transaction").findOne({
    titulo: transaction.titulo,
});

      if(transactionExistente ){
    return res.status(409).send("transaction com este título já cadastrada!");
     }
    
   const resultadoUpdate=await db.collection("transaction").updateOne(
        { _id: new ObjectId(id) },
        {
        $set: {
          titulo:transaction.titulo,
          ingredientes:transaction.ingredientes,
          preparo:transaction.preparo
        }
});
if(resultadoUpdate.matchedCount===0){
  return res.status(404).send("Essa transaction não existe!");
}
 res.send("transaction atualizada!")
  }
  catch(err){
     return res.status(500).send(err.message);
  }
};