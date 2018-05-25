var _HOST = null;
var _PORT = null;

if (process.env.NODE_ENV !== 'production') {
  _HOST = 'http://localhost';
  _PORT = 8080;  
} else {
  _HOST = 'http://localhost';
  _PORT = 3000;
}

export const HOST = _HOST;
export const PORT = _PORT;
export const BASE = 'api';

export const BASE_URL = `${HOST}:${PORT}/${BASE}`;

// acpair
export const ACPAIR_GET_URL = `${BASE_URL}/acpairs`;

// elegant
export const ELEGANT_POST_URL = `${BASE_URL}/elegant`;

// static files
export const ELEGANT_JAR_FILE = `${BASE_URL}/public/ELEGANT.jar`;
export const ELEGANT_CLI_JAR_FILE = `${BASE_URL}/public/elegant-cli.jar`;
