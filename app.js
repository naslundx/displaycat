/*jshint globalstrict: true*/
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.static('public/react'));
app.listen(process.env.PORT || 5000);
