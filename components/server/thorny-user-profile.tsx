
interface ThornyUserProfileProps {
  userID: string
}

export default function ThornyUserProfile({ userID }: ThornyUserProfileProps) {
  return (
    <p>{userID}</p>
  )
}
