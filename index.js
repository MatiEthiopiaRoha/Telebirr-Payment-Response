const NodeRSA = require('node-rsa');
const key = new NodeRSA({b: 512});
const express = require('express');
const crypto = require ("crypto");
var app = express();
var bodyParser = require('body-parser');



var PORT = 8100;
  
// Without this middleware
app.use(express.raw());


app.use(function(req, res, next){
    var data = "";
    req.on('data', function(chunk){ data += chunk})
    req.on('end', function(){
       req.rawBody = data;
       next();
    })
 })
 

 
 app.post('/notifyurl/', function(req, res){


    var  publicKey  = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAiIkbxUiGzlNYTthyGobvKP/7Yf5QlGElh/HIQhDi1ScbmVB9XTv9DmxxuGENFkb4HXntwC5xxlTwC8JQ9/1hc+IjNw13MfzIy1HyOKp3EAotHM2piB+pJbiaO0aUkCH1rr54yZZT92Uxgc8bI6x4ViMri9Uj3HrbaClYvLOA2ZJwT4iUsKxpj+Ko8yhSWV/dzHfKh9X0Gumi7QqkTs37WYpbQlBP3s1zq9+omAVE5/vrdoAwAE+7ZJZcTvIC2ktmhJS8qJdMERh33PLs/gtXJ1T3LYxQmXgESfQ1CGwEeq74V9g9wdZSYzjPDMjywxVcjo+g8cBEaJrIczTJBEaapQIDAQAB';
      
    const rsa_decrypt = (data) => {

 
        let key = new NodeRSA(getPublicKey(publicKey));
        
        key.setOptions({encryptionScheme: 'pkcs1'});
        let decryptKey = key.decryptPublic(data, 'base64');
        return decryptKey;
    } 



    function insertStr(str, insertStr, sn) {
        var newstr = '';
        for (var i = 0; i < str.length; i += sn) {
            var tmp = str.substring(i, i + sn);
            newstr += tmp + insertStr;
        }
        return newstr;
    }
    const getPublicKey = function (key) {
        const result = insertStr(key, '\n', 64);
        return '-----BEGIN PUBLIC KEY-----\n' + result + '-----END PUBLIC KEY-----';
    };    
    
    
     var edata  = req.rawBody;
     console.log("------------------------");
     console.log(edata);
     console.log("------------------------");
     var decryptedjson =  rsa_decrypt(edata);
     decryptedjson = Buffer.from(decryptedjson, 'base64');
     decryptedjson = decryptedjson.toString('utf-8');
     console.log(decryptedjson);
     let jsonData = JSON.parse(decryptedjson);
     console.log(jsonData);
     msisdn =(jsonData.msisdn);
     outTradeNo =(jsonData.outTradeNo);
     totalAmount =(jsonData.totalAmount);
     tradeDate =(jsonData.tradeDate);
     tradeNo =(jsonData.tradeNo);
     tradeStatus =(jsonData.tradeStatus);
     transactionNo =(jsonData.transactionNo);
     console.log(msisdn);
     console.log(outTradeNo);
     console.log(totalAmount);
     console.log(tradeDate);
     console.log(tradeNo);
     console.log(tradeStatus);
     console.log(transactionNo);

     const jsonMain = {
        
             msisdn :  msisdn ,
             outTradeNo :  outTradeNo ,
             totalAmount :  totalAmount,
             tradeDate : tradeDate,
             tradeNo :  tradeNo ,
             tradeStatus : tradeStatus,
             transactionNo :  transactionNo ,
             paymentMethod :  "Telebirr" 
          
     };
    
     
    
 
      
    


    res.send(jsonData);
 })


app.post('/returnurl/', function (req, res) {
    console.log(req.rawBody);
    res.end();
})
  
  
app.listen(
    PORT,
    () => console.log(`Server Started on http://localhost:${PORT}`)
)