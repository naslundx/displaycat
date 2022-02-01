/*jshint globalstrict: true*/
const compression = require('compression');
const express = require('express');
const app = express();

app.use(compression());

app.disable('x-powered-by');  

app.use('//old', express.static('old/'));
app.use('/old', express.static('old/'));
app.use('/', express.static('build/'));

app.listen(process.env.PORT || 5000);
