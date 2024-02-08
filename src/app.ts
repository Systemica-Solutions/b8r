/**
 * Module dependencies.
 */
import { createServer } from 'http';
import { ENV } from './config/env.config';

import app from './config/app.config';

/**
 * Normalize a port into a number, string, or false.
 */

const normalizePort = (val: any) => {
  const portVal = parseInt(val, 10);

  if (isNaN(portVal)) {
    // named pipe
    return val;
  }

  if (portVal >= 0) {
    // port number
    return portVal;
  }

  return false;
};

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(ENV.PORT || '80');
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

/**
 * Event listener for HTTP server "error" event.
 */
// @ts-ignore
const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

/**
 * Event listener for HTTP server "listening" event.
 */
const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
  console.log('Listening on ' + bind);
};

server.on('error', onError);
server.on('listening', onListening);
server.listen(port);
