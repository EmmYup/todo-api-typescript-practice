import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly envConfig: Record<string, string>;
  constructor() {
    const { error, parsed } = dotenv.config();

    if (error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = parsed;
    }
  }

  public get(key: string): string {
    return this.envConfig[key];
  }

  public async getPortConfig() {
    return this.get('PORT');
  }

  public async getMongoConfig() {
    return {
      uri:
        'mongodb+srv://' +
        this.get('MONGO_USER') +
        ':' +
        this.get('MONGO_PASSWORD') +
        '@' +
        this.get('MONGO_HOST') +
        '/' +
        this.get('MONGO_DATABASE'),
    };
  }
}
