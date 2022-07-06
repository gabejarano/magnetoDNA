const app = require('../app');

app.set('port', process.env.PORT || 63671);

//Run server express.
app.listen(app.get('port'), () => {
    console.log(`server on port ${app.get('port')}`);
})