const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("home.html","utf-8");
const replaceVal = (tempVal,orgVal)=>{
    let temperature = tempVal.replace("{%tempval%}",orgVal.main.temp);
    temperature = temperature.replace("{%tempmin%}",orgVal.main.temp_min);
    temperature = temperature.replace("{%tempmax%}",orgVal.main.temp_max);
    temperature = temperature.replace("{%location%}",orgVal.name);
    temperature = temperature.replace("{%country%}",orgVal.sys.country);
    // console.log(temperature)
    return temperature
}

const server = http.createServer((req,res)=>{
    if (req.url == "/"){
        requests('https://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=faf86ec4d32f3ee268303a77ff870027')
.on('data', (chunk)=> {
    const objData = JSON.parse(chunk);
    const arrayData = [objData];
    const realTimeData= arrayData.map((val)=>{
     const result=replaceVal(homeFile,val)
     res.write(result);
    });
    
    console.log(realTimeData);

//   console.log(arrayData[0].main.temp);
})
.on('end', (err)=> {
  if (err) return console.log('connection closed due to errors', err);
  res.end();
 
  console.log('end');
});
    }
})
server.listen(80,"127.0.0.1")
// https://api.openweathermap.org/data/2.5/weather?q=Karachi&appid=faf86ec4d32f3ee268303a77ff870027