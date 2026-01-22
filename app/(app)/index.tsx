import { Button, Card, Link, Screen, Subtitle, Title } from '@/components/ui';
import { Theme, useTheme } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { StyleSheet, View } from 'react-native';

export default function Index() {

  const { user, logout } = useAuth(); // Use the context hook
  const { styles } = useTheme(makeStyles);

  const handleLogout = () => {
    logout();
  };

  return (
    <Screen>
      <Card>
        <Title>{`Hello, ${user!.email}`}</Title>
        <Subtitle>You are logged in</Subtitle>
        <Button title="Logout" onPress={handleLogout} />
        <View style={styles.linksRow}>
          <Link href="/profile">Profile</Link>
        </View>
      </Card>
    </Screen>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    linksRow: { flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: theme.spacing.lg },
  });
