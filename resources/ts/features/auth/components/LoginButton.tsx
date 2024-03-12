import { useSanctum } from 'react-sanctum'

type Props = {
  email: string
  password: string
  remember: boolean
}

const LoginButton = ({ email, password, remember }: Props) => {
  const { authenticated, user, signIn } = useSanctum()

  if (authenticated === true) {
    return <h1>Welcome, {user.name}</h1>
  } else {
    return (
      <button
        onClick={() => {
          signIn(email, password, remember)
            .then(() => window.alert('Signed in!'))
            .catch(() => window.alert('Incorrect email or password'))
        }}>
        Sign in
      </button>
    )
  }
}

export default LoginButton
