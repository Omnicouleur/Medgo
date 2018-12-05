const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Database connection
uri ='postgres://jepbowdbpgicwq:fb82eca5d5d6affe08fc3dbae0eb8247eb17913e57dc54e2e0341a6f281d49ef@ec2-54-75-231-3.eu-west-1.compute.amazonaws.com:5432/d41alm8l88a20h'
const Sequelize = require('sequelize');
const sequelize = new Sequelize(uri)
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  // Create Table 
  const Message = sequelize.define('message', {
    Name: {
      type: Sequelize.STRING
    },
    Email: {
      type: Sequelize.STRING
    },
    Message: {
      type: Sequelize.STRING
    }
  });

// API calls
app.get('/api/hello', (req, res) => {
  Message.findAll().then(((err, users) => {
    if (err){
        return res.send(err)
    }
    else {
        return res.json({
            data : users
        })
    }
  
}))
});

app.post('/api/world', (req, res) => {
  console.log(req.body);

  // Store message
  Message.sync({force: true}).then(() => {
    return Message.create({
      Name: req.body.name,
      Email: req.body.email,
      Message: req.body.message
    });
  });

  res.send(
    `Message sent successfully`
  );
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
