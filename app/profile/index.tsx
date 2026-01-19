import Screen from '@/components/ui/Screen';
import { Subtitle, Title } from '@/components/ui/Typography';
import { useAuth } from '@/contexts/AuthContext';

export default function Profile() {
  const { user } = useAuth();
  return (
    <Screen>
      <Title>Profile Page</Title>
      <Subtitle>{user!.email}</Subtitle>
    </Screen>
  );
}
