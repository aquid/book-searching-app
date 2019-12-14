const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      // API informations (required)
      title: 'Book Searching App', // Title (required)
      version: '1.0.0', // Version (required)
      description: 'A sample API server for searchig books', // Description (optional)
      constact: {
        name: 'Aquid Shahwar',
        email: 'aquid.shahwar@gmail.com',
      },
    },
  },
  explorer: true,
  basePath: '/',
  apis: ['./controllers/*.js', './routes/*.js'],
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/explorer', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
