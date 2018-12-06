const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Database connection
localuri = 'postgres://postgres:123@localhost:5432/medgo'

uri = 'postgres://ybculoiwujkqko:7fc9b53d5a0dda8c6317d76dc0a4059992c67489bf003c3db8852b213cd1c50f@ec2-54-197-249-140.compute-1.amazonaws.com:5432/d3q8mhq0er43t5'
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
app.get('/api/fetch', (req, res) => {
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

app.post('/api/store', (req, res) => {
  console.log(req.body);

  // Store message
   Message.sync().then(() => {
    return Message.create({
      Name: req.body.name,
      Email: req.body.email,
      Message: req.body.message
    });
  }); 
  res.send(
    'Message sent successfully'
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
