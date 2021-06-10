// Update with your config settings.

module.exports = {

  // For development on your local machine.
  development: {
    client: 'pg',
    useNullAsDefault: true,
    migrations: {
      directory: './src/migrations'     // Directory to migration files of the project...
    },
    seeds: {
      directory: './src/seeds'          // Directory to seeds files of the project.
    },
    connection: {
      host: "localhost",
      user: "postgres",
      password: "root",
      database: "VirtualCorp"           // Create Database with same name on your local machine in postgres or change the name these with your database name.
    }
  },

  // For production of your project.
  production: {
    client: 'pg',
    connection: {
      host: "ec2-184-73-198-174.compute-1.amazonaws.com",
      port: 5432,
      user: "zeoyripqhbbjam",
      listen_addresses: "*",
      password: "0d4a7daf5044fa9dad1780d13693be347c83600fbe6c339ebc48252c36ee7fd8",
      database: "dfn9dm5eu6eee3",
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        },
                                      // Create Database with same name on your local machine in postgres or change the name these with your database name.
      }, 
     
    },                                   // Change these with your own database connection URL.
    migrations: {
      directory: './src/migrations'
    },
    useNullAsDefault: true
  }
};
