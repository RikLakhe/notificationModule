const { port, env } = require('./config/vars');
const app = require('./config/express');
const logger = require('./config/logger');
const api = require('./api');
const error = require('./api/middleware/error');

app.listen(port, () => logger.info(`server started on port ${port} (${env})`));

app.use('/api', api);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

/**
* Exports express
* @public
*/
module.exports = app;
