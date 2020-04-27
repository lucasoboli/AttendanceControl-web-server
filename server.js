const app = require('./express');
const teste = require('./src/controllers/teste');

app.listen(3000, () => async() =>{
    console.log('Server running at port 3000');
    console.log(teste);
})