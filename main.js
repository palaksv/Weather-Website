import http from 'http';
import fs from 'fs';
import requests from 'requests';
const homefile=fs.readFileSync("index.html","utf-8");
const replaceVal=(tempVal, orgVal)=>{
    let temperature=tempVal.replaceVal("{%tempval%}",orgVal.main.temp);
     temperature=temperature.replaceVal("{%tempmin%}",orgVal.main.temp_min);
     temperature=temperature.replaceVal("{%tempmax%}",orgVal.main.temp_max);
     temperature=temperature.replaceVal("{%location%}",orgVal.name);
      temperature=temperature.replaceVal("{%country%}",orgVal.sys.country);
      temperature=temperature.replaceVal("{%tempStatus%}",orgVal.weather[0].main);
      return temperature;
}



const server=http.createServer((req,res)=>{
    if(req.url=="/"){
        requests('https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=be5e3273723a6abbc8bd3bd57cb5b597')
.on('data',  (chunk)=> {
    const objdata=JSON.parse(chunk);
    const arrData=[objdata];
//   console.log(arrData[0].main.temp);
  const realTimeData=arrData.map((val)=>replaceVal(homefile,val)).join("");
  res.write(realTimeData);
// console.log(realTimeData);
})
.on('end',  (err)=> {
  if (err) return console.log('connection closed due to errors', err);
 
  res.end();
});
    }
});

server.listen(8000,"127.0.0.1");