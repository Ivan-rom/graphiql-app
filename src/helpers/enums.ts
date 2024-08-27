export enum Routes {
  home = '/',
  signIn = '/sign-in',
  signUp = '/sign-up',
  restApi = '/restful-client',
  graphiQL = '/graphiql',
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

export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
}
