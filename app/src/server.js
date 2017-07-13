'use strict';

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import NotFoundPage from './components/NotFoundPage';
import models from "./models";


// initialize the server and configure support for ejs templates
const app = new Express();
const server = new Server(app);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


// products add
app.post('/api/products/add', function(req, res) {
  // var user_id = req.body.id;
  // var token = req.body.token;
  // var geo = req.body.geo;
  console.log(req.body);

  models.Product.create(req.body).then(anotherTask => {
      // you can now access the currently saved task with the variable anotherTask... nice!
      console.log('yay0');
      res.send('ok');

  }).catch(error => {
      // Ooops, do some error-handling
      console.log('error0');
    })
});

app.get('/api/products', function(req, res) {
  models.Product.findAll().then(function(products) {
    console.log(products);
    res.send(products);
  });
});

// universal routing and rendering
app.get('*', (req, res) => {
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {

      // in case of error display the error message
      if (err) {
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup;
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage/>);
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup });
    }
  );
});

// start the server
const port = 3000;
const env = process.env.NODE_ENV || 'production';

models.sequelize.sync().then(() => {
  console.info(`DB synced`);
  server.listen(port, err => {
    if (err) {
      return console.error(err);
    }
    console.info(`Server running on http://localhost:${port} [${env}]`);
  });

});

// server.listen(port, err => {
//   if (err) {
//     return console.error(err);
//   }
//   console.info(`Server running on http://localhost:${port} [${env}]`);
// });
