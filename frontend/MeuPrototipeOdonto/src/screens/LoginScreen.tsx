// src/screens/LoginScreen.tsx
import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  useWindowDimensions
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../constants/colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RootStackParamList } from '../../App';
import AsyncStorage from '@react-native-async-storage/async-storage';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

// --- Função Utilitária para Máscara de CPF ---
const formatCPF = (value: string): string => {
  const numericValue = value.replace(/\D/g, '');
  if (numericValue.length <= 3) return numericValue;
  if (numericValue.length <= 6) return `${numericValue.slice(0, 3)}.${numericValue.slice(3)}`;
  if (numericValue.length <= 9) return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6)}`;
  return `${numericValue.slice(0, 3)}.${numericValue.slice(3, 6)}.${numericValue.slice(6, 9)}-${numericValue.slice(9, 11)}`;
};

export default function LoginScreen({ navigation }: Props) {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  // --- Hooks de estado para UX ---
  const [identifier, setIdentifier] = useState<string>(''); // CPF (mascarado) ou E-mail
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [loginMode, setLoginMode] = useState<'cpf' | 'email'>('cpf');

  useEffect(() => {
    // Autofill a partir do cadastro
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('loginCredentials');
        if (saved) {
          const { identifier: savedId, password: savedPass, userType } = JSON.parse(saved);
          if (userType === 'especialista') {
            setLoginMode('email');
            setIdentifier(savedId || '');
          } else {
            setLoginMode('cpf');
            setIdentifier(savedId ? formatCPF(savedId) : '');
          }
          if (savedPass) setPassword(savedPass);
        }
      } catch {}
    })();
  }, []);

  const handleIdentifierChange = (text: string) => {
    if (loginMode === 'cpf') setIdentifier(formatCPF(text));
    else setIdentifier(text);
  };

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert('Atenção', 'Por favor, preencha os campos.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.replace('Dashboard');
    }, 900);
  };

  const identifierLabel = loginMode === 'email' ? 'E-MAIL' : 'CPF';
  const identifierPlaceholder = loginMode === 'email' ? 'seu.email@instituicao.com' : 'Seu CPF';

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={[styles.scrollContent, isWide && styles.scrollContentWide]} keyboardShouldPersistTaps="handled">
        <View style={[styles.contentWrapper, isWide && styles.contentWrapperWide]}> 
          {/* Cabeçalho com logotipo e título */}
          <View style={[styles.header, isWide && styles.headerWide]}> 
            <Image source={require('../../assets/icon2.png')} style={styles.logo} />
            <Text style={styles.brandText}>TelePerio</Text>
            <Text style={styles.title}>Bem-vindo!</Text>
          </View>

          {/* Card do formulário */}
          <View style={[styles.formCard, isWide && styles.formCardWide]}> 
            <Text style={styles.cardLabel}>{identifierLabel}</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name={loginMode === 'email' ? 'email-outline' : 'card-account-details-outline'} size={22} color={colors.gray} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder={identifierPlaceholder}
                placeholderTextColor={colors.gray}
                value={identifier}
                onChangeText={handleIdentifierChange}
                keyboardType={loginMode === 'email' ? 'email-address' : (Platform.OS === 'web' ? 'default' : 'numeric')}
                autoCapitalize={loginMode === 'email' ? 'none' : 'none'}
              />
            </View>

            <Text style={[styles.cardLabel, { marginTop: 12 }]}>SENHA</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons name="lock-outline" size={22} color={colors.gray} style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Sua senha"
                placeholderTextColor={colors.gray}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!isPasswordVisible}
                autoCapitalize='none'
              />
              <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.iconTouchable}>
                <MaterialCommunityIcons name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'} size={22} color={colors.gray} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin} 
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Text style={styles.buttonText}>Log in</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.smallLink}>Esqueci minha senha</Text>
            </TouchableOpacity>
          </View>

          {/* Ilustração central para melhor aproveitamento de espaço */}
          <View style={styles.illustrationWrapper}>
            <Image source={require('../../assets/dashboard_illustration.png')} style={[styles.illustration, isWide && styles.illustrationWide]} />
          </View>

          {/* Rodapé com CTA de cadastro */}
          <View style={styles.footerCta}>
            <Text style={styles.footerText}>Primeiro acesso?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.signupPill}>
              <Text style={styles.signupPillText}>Cadastre-se aqui!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    paddingVertical: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  scrollContentWide: {
    paddingVertical: 40,
  },
  contentWrapper: {
    width: '100%',
    maxWidth: 480,
    paddingHorizontal: 16,
  },
  contentWrapperWide: {
    maxWidth: 920,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  headerWide: {
    marginBottom: 8,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  brandText: {
    fontSize: 16,
    color: colors.darkGray,
    marginBottom: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.darkBlue,
    marginBottom: 4,
    textAlign: 'center',
  },
  formCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.lightGray,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  formCardWide: {
    alignSelf: 'center',
    width: '100%',
    maxWidth: 520,
  },
  cardLabel: {
    fontSize: 12,
    color: colors.gray,
    marginBottom: 6,
    fontWeight: '700',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: colors.white,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  icon: {
    marginRight: 10,
  },
  iconTouchable: {
    padding: 5,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: colors.darkGray,
  },
  loginButton: {
    width: '100%',
    height: 50,
    backgroundColor: colors.mediumBlue,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '700',
  },
  smallLink: {
    alignSelf: 'center',
    color: colors.darkGray,
    fontSize: 12,
    textDecorationLine: 'underline',
    marginTop: 6,
  },
  illustrationWrapper: {
    alignItems: 'center',
    marginVertical: 16,
  },
  illustration: {
    width: 220,
    height: 120,
    resizeMode: 'contain',
  },
  illustrationWide: {
    width: 320,
    height: 160,
  },
  footerCta: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  footerText: {
    fontSize: 12,
    color: colors.darkGray,
    marginBottom: 6,
  },
  signupPill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: colors.lightBlue,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  signupPillText: {
    color: colors.darkBlue,
    fontWeight: '700',
  },
});
