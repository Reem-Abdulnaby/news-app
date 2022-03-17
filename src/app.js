const request=require('request')
const url='https://newsapi.org/v2/top-headlines?country=eg&apiKey=64de264208e34bfd9ab2969599c77093'

const express = require('express')

const app = express()
const port=process.env.port||3000
const path=require('path')
const publicDir=path.join(__dirname,'../piblic')

app.use(express.static(publicDir))

app.set('view engine',"hbs")
/*const viewDirectory=path.join(__dirname,'../templates/views')
app.set('views',viewDirectory)*/
request({url,json:true},(error,responce)=>{
  
  
  if(error){
        return  app.get('/',(req,res)=>{
        
        res.send({error:'unable to connect'})
    })
        
        }
       
  
    else if(responce.body.message){
  return   app.get('/',(req,res)=>{

            res.send({message:responce.body.message})
    })
       
}   
else if (responce.body.articles.length==0){
    return   app.get('/',(req,res)=>{

        res.send({message:'No News Available on this link please Check the link And Try Again'})
})
   
}



  
app.get('/',(req,res)=>{ 
  if(responce.body.message)
  return  res.send( { messsage:responce.body.message })  
        
            


    res.render('index', { articles:responce.body.articles    })  



    
})

   
 
})







app.listen(port, () => {
    console.log(`server is run ${port}`)
  })
  