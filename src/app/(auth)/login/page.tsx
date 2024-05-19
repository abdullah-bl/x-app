import LoginForm from "~/components/forms/login-form"

export default async function LoginPage() {
  return (
    <div className="min-h-screen min-w-screen grid place-items-center place-content-center overflow-hidden">
      <LoginForm />
    </div>
  )
}
