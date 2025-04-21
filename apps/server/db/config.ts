import { DataSource, DataSourceOptions } from 'typeorm';

// 基础配置
export const baseConfig: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'test',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
};

// 该对象 typeorm cli 迁移时使用
export const ormConfigForCli: DataSourceOptions = {
  ...baseConfig,
  // subscribers: ['subscribers/*{.js,.ts}'],
  // logger: 'file',
  // logging: true,
};

//cli need not just option,but also the instance
const dataSource = new DataSource(baseConfig);

// 此处的dataSource需要 export default才可以使用
export default dataSource;
