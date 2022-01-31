/*jshint globalstrict: true*/
const express = require('express');
const app = express();

app.use('/', express.static('build/'));
app.use('/old', express.static('old/'));

app.listen(process.env.PORT || 5000);
