const config = {
  port: 3000,
  jwtSecret: 'fgljdflgkjsdfkgdskfg',
  saltRounds: 10,
  apiPath: '/api/v1',
  db:{
    user: "SampleUser",
    password: "SecretPassword",
    database: "YourDatabase",
    host: "db_hostname",
    port: 3306

  }
};

export default config;