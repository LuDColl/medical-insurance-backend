import { EXPIRES_IN } from './jwt.consts';

export const useFactory = () => ({
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: EXPIRES_IN },
});
