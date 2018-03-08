const express = require('express');
const hbs =  require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(__dirname + '/views/partition');
hbs.registerHelper('getCurrentYear' , () =>{
  return new Date().getFullYear();
})
app.use(express.static(__dirname + '/public'));
/*
app.use((req ,res , next)=> {

  res.render('maintenance.hbs')
});
*/
app.use((req,res,next) =>{

  var date = new Date().toString();
  save =`${date} ${req.method} ${req.url}`;
  console.log(save);

  fs.appendFile('requests.log' , save + '\n', (err) =>{

    if(err){
      console.log('Error is there');
    }
  });

  next();

});
app.get('/' , (req , res) => {

  res.render('index.hbs' , {
    pageTitle : 'Welcome to our hotel website' ,
    message : 'Enjoy the luxorious comfort in  our hotel rooms'
  });

});

app.get('/gallery' , (req , res) =>{

  res.render('gallery.hbs' , {

    pageTitle : ' Gallery Page  ',
    message : 'Here are some of the very good pictures :'
  });
});

app.get('/bad' , (req,res)=> {

  res.send({
    errorMessage: 'Somethings wrong'
  });
});

app.listen(port , () =>{

  console.log('listening to port 3000');
})
