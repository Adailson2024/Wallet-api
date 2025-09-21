import { ObjectId } from "mongodb";
import { db } from "../config/database.js";


export async function getTransacoes(req, res){
  const pagina = req.query.pagina || 1;
  const limite = 2;
  const inicio = (pagina - 1)*limite;
  try{
    const transacoes = await db.collection("transacoes")
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
   const transacao = await db.collection("transacoes").findOne({
  _id:new ObjectId(id)
   });
   if(!transacao) return res.status(404).send("transacao não encontrada!");
   return res.send(transacao)
   }catch(err){
   res.status(500).send(err.message);
   }
};
export async function criarTransacoes(req,res){
  const transacao=req.body;
  
  
  try{
  const transacaoExistente=
  await db.collection("transacoes").findOne({titulo:transacao.titulo});
  if(transacaoExistente){
    return res.status(409).send("transacao com este título já cadastrada")
  }
  await db.collection("transacoes").insertOne({
    ...transacao,
  user: res.locals.user._id
  });
    res.status(201).send("Sua transacao foi adicionada com sucesso!")
  } 
  catch(err){
    res.status(404).send(err.message)
  }
};
export async function deletarTransacoes(req, res){
  const {id}=req.params;
    try {
         
        const resultado = await db.collection("transacoes").deleteOne({
            _id: new ObjectId(id)
        });

        if (resultado.deletedCount === 0) {
            return res.status(404).send("Essa transacao não existe"); // not found
        }
        return res.status(204).send("transacao foi deletada com sucesso!");
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function alterarTransacoes(req, res){
    const { id } = req.params;
    const transacao = req.body;

    
  try{

    const transacaoExistente = await db.collection("transacoes").findOne({
    titulo: transacao.titulo,
});

      if(transacaoExistente ){
    return res.status(409).send("transacao com este título já cadastrada!");
     }
    
   const resultadoUpdate=await db.collection("transacoes").updateOne(
        { _id: new ObjectId(id) },
        {
        $set: {
          titulo:transacao.titulo,
          ingredientes:transacao.ingredientes,
          preparo:transacao.preparo
        }
});
if(resultadoUpdate.matchedCount===0){
  return res.status(404).send("Essa transacao não existe!");
}
 res.send("transacao atualizada!")
  }
  catch(err){
     return res.status(500).send(err.message);
  }
};