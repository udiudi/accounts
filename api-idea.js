import type { LoginUserIdentityType, UserObjectType } from './packages/common/src/types';

interface AuthenticationService {
  authenticate(userIdentity: LoginUserIdentityType, credentials: ?Object): Promise<UserObjectType>,
}

// Implementation Example

class OAuth {
  constructor() {
    (this: AuthenticationService);
  }
  authenticate(userIdentity: LoginUserIdentityType, credentials: ?Object): Promise<UserObjectType> {
    return Promise.resolve({
      username: '',
      email: '',
    });
  }
}

class Server {
  constructor() {
    this.services = {
      google: new OAuth(),
    };
  }

  loginWithService = (
    serviceName: String,
    userIdentity: LoginUserIdentityType,
    credentials: ?Object,
  ) => Promise.resolve()
    .then(() => this.services[serviceName])
    .then(this.throwIfNull(`No service with the name ${serviceName} was registered.`))
    .then(service => service.authenticate(userIdentity, credentials))
    .then(this.throwIfNull(`Service ${serviceName} was not able to authenticate user ${userIdentity}`))
    .then(user => this.loginWithUser(user));

  throwIfNull = (message: String) => (obj: ?Object) => {
    if (obj == null) throw new Error(message);
    return obj;
  };
}