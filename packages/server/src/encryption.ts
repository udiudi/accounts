import * as bcrypt from 'bcrypt';
import { createHash } from 'crypto';
import * as isString from 'lodash/isString';

const bcryptPassword = async password => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const hashPassword = (password, algorithm) => {
  if (isString(password)) {
    const hash = createHash(algorithm);
    hash.update(password);
    return hash.digest('hex');
  }

  return password.digest;
};

const verifyPassword = async (password, hash) => bcrypt.compare(password, hash);

export { bcryptPassword, hashPassword, verifyPassword };
