const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require("body-parser");
const port = 3000;

app.use(express.static(path.join(__dirname, '../client/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`);
})

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/views/home.html'));
});

app.get('/category.html', (req ,res)=>{
    res.sendFile(path.join(__dirname, '../client/views/category.html'))
});

// for handling post requests of category page
app.post('/category.html', (req, res) => {
    const cat = req.body.cat;
    const gst = req.body.gst;
    console.log(cat, gst); // Use this data to save to the database or perform other operations
    res.send('Category added successfully!'); // Return a success message
});


app.get('/product.html', (req, res)=>{
    res.sendFile(path.join(__dirname, '../client/views/product.html'));
})

// for handling post requests of product.html
app.post('/product.html', (req, res)=>{

});

app.get('/sale.html', (req, res)=>{
    const filePath = path.join(__dirname, '../client/views/sale.html');
    // needed to console log because was unable to render it from web page 
    console.log(`Attempting to send file from: ${filePath}`);

    res.sendFile(filePath, (err) => {
        if (err) { // if some error while browsing to sale route console log the error
            console.error(err);
            res.status(err.status).end();
        } else {
            console.log('File sent successfully');
        }
    });
})

// for handling post requests of gst.html
app.post('/sale.html', (req, res)=>{

})

app.get('/gst.html', (req, res)=>{
    const filePath = path.join(__dirname, '../client/views/gst.html');
    // needed to console log because was unable to render it from web page 
    console.log(`Attempting to send file from: ${filePath}`);

    res.sendFile(filePath, (err) => {
        if (err) { // if some error while browsing to sale route console log the error
            console.error(err);
            res.status(err.status).end();
        } else {
            console.log('File sent successfully');
        }
    });
})

// for handling post requests of gst.html
app.post('/gst.html', (req, res)=>{

})