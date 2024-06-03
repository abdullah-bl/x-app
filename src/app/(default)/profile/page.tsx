import Container from "~/components/layout/container"
import { PageHeader } from "~/components/layout/header"
import { getUserDate } from "~/lib/auth"

export default async function ProfilePage() {
  const user = await getUserDate()
  return (
    <Container>
      <PageHeader showBackButton title="Profile Page" />
      <h3 className=" font-extrabold text-3xl">/Profile</h3>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Container>
  )
}
