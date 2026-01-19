import { Button, Card, Input, Link, Screen, Subtitle, Title } from '@/components/ui';
import { Theme, useTheme } from '@/constants/theme';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function Index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth(); // Use the context hook
  const { styles } = useTheme(makeStyles);

  const handleLogin = () => {
    if (email && password) login(email);
  };

  return (
    <Screen>
      <Card>
        <Title>Welcome to Flippo</Title>
        <Subtitle>Please log in to continue</Subtitle>
        <Input placeholder="Email" value={email} onChangeText={setEmail} />
        <Input placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <Button title="Login" onPress={handleLogin} />
        <View style={styles.linksRow}>
          <Link href="/about">About</Link>
        </View>
      </Card>
    </Screen>
  );
}

const makeStyles = (theme: Theme) =>
  StyleSheet.create({
    linksRow: { flexDirection: 'row', gap: 10, justifyContent: 'center', marginTop: theme.spacing.lg },
  });
