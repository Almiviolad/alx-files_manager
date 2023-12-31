const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    if (process.env.DB_HOST) {
      this.host = process.env.DB_HOST;
    } else {
      this.host = 'localhost';
    }

    if (process.env.DB_PORT) {
      this.port = process.env.DB_PORT;
    } else {
      this.port = 27017;
    }

    if (process.env.DB_DATABASE) {
      this.dbName = process.env.DB_DATABASE;
    } else {
      this.dbName = 'files_manager';
    }

    this.url = `mongodb://${this.host}:${this.port}`;
    this.client = new MongoClient(this.url, { useUnifiedTopology: true });
    this.connected = false;

    this.connect();
  }

  async connect() {
    try {
      await this.client.connect();
      this.connected = true;
      this.db = this.client.db(this.dbName);
    } catch (error) {
      this.connected = false;
    }
  }

  isAlive() {
    return this.connected;
  }

  async nbUsers() {
    const userCount = await this.db.collection('users').countDocuments();
    return userCount;
  }

  async nbFiles() {
    const filesCount = await this.db.collection('files').countDocuments();
    return filesCount;
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
