
const proxy = require('http-proxy-middleware');

module.exports = function(app){
   app.use(
   proxy('/execute',{
     target:"https://api.jdoodle.com/v1",
     changeOrigin:true,
   })
  );
}
