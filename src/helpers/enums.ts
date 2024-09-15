export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  GRAPHQL = 'GRAPHQL',
}

export enum Routes {
  home = '/',
  signIn = '/sign-in',
  signUp = '/sign-up',
  client = '/client',
  restApi = `${Routes.client}/${RequestMethods.GET}`,
  graphiQL = `${Routes.client}/${RequestMethods.GRAPHQL}`,
  history = '/history',
}

export enum SignUpInputsNames {
  name = 'name',
  email = 'email',
  password = 'password',
  confirmPassword = 'confirmPassword',
}

export enum SignInInputsNames {
  email = 'email',
  password = 'password',
}
