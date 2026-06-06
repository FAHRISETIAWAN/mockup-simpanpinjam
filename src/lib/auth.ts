export async function login(
  username: string,
  password: string
) {
  if (
    username === 'profile@gmail.com' &&
    password === 'b@ndung123!'
  ) {
    return {
      success: true,
      token: 'login-success',
    }
  }

  return {
    success: false,
    message: 'Username atau password salah',
  }
}