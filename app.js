/*jshint globalstrict: true*/
const express = require('express');
const app = express();

app.use('//old', express.static('old/'));
app.use('/old', express.static('old/'));
app.use('/', express.static('build/'));

app.listen(process.env.PORT || 5000);
