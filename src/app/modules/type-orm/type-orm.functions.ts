import { TypeOrmDataSourceFactory } from '@nestjs/typeorm';
import { typeOrmModuleOptions } from './type-orm.options';
import { DataSource } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { hash } from 'bcrypt';
import { UserRule } from '../user/entities/user-rule.entity';

export const useFactory = () => typeOrmModuleOptions;

export const dataSourceFactory: TypeOrmDataSourceFactory = async (options) => {
  const dataSource = await new DataSource(options!).initialize();
  const userRepository = dataSource.getRepository(User);

  const hasAdmin = await userRepository.exists({
    where: { name: process.env.DB_USER },
  });

  if (!hasAdmin)
    await dataSource.transaction(async (manager) => {
      const userRepository = manager.getRepository(User);
      const passwordHash = await hash(process.env.DB_PASS!, 12);

      const { id, userRules } = await userRepository.save({
        name: process.env.DB_USER,
        hash: passwordHash,
        insertUserId: 0,
        userRules: [{ insertUserId: 0, path: '/' }],
      });

      const [userRule] = userRules;

      const userRuleRepository = manager.getRepository(UserRule);
      await Promise.all([
        userRepository.update(id, { insertUserId: id }),
        userRuleRepository.update(userRule.id, {
          insertUserId: id,
        }),
      ]);
    });

  return dataSource;
};
