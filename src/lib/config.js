const config = {
  SUPPLIERS_API_URL : (process.env.NODE_ENV && process.env.NODE_ENV === 'production') ? 'https://suppliers.knawat.io/api' : 'https://dev.suppliers.knawat.io/api',
  BASIC_USER : process.env.KNAWAT_USER || process.env.BASIC_USER,
  BASIC_PASS : process.env.KNAWAT_PASS || process.env.BASIC_PASS, 
  HEADERS : {
    'Content-Type': 'application/json'
  }
};

module.exports = config;
