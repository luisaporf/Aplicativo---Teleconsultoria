// App.tsx
import React from 'react';
import { NavigationContainer, Theme } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
  StackNavigationOptions,
} from '@react-navigation/stack';
import { Text, View, StyleSheet, SafeAreaView, Dimensions, Platform } from 'react-native';
import { colors } from './src/constants/colors';

import LoginScreen from './src/screens/LoginScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import NewCaseFormScreen from './src/screens/NewCaseFormScreen';
import CaseDetailScreen from './src/screens/CaseDetailScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import VerifyCodeScreen from './src/screens/VerifyCodeScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import TestScrollScreen from './src/screens/TestScrollScreen';

export type RootStackParamList = {
  Login: undefined;
  Profile: undefined;
  Dashboard: { newCase?: any; activeTab?: 'pending' | 'in_analysis' | 'responded' } | undefined;
  NewCaseForm: undefined;
  CaseDetail: { caseId: string };
  ForgotPassword: undefined;
  Register: undefined;
  VerifyCode: undefined;
  ChangePassword: undefined;
  TestScroll: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        document.documentElement.style.height = 'auto';
        document.body.style.height = 'auto';
        document.body.style.overflow = 'auto';
      } catch {}
    }
  }, []);

  const defaultHeaderOptions: StackNavigationOptions = {
    headerShown: true,
    headerTitleAlign: 'center',
    headerTintColor: colors.darkBlue,
    headerStyle: {
      backgroundColor: colors.mediumBlue,
      height: 90,
    },
    headerTitleStyle: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.primaryText,
    },
  };

  const screenHeight = Dimensions.get('window').height;

  return (
    <SafeAreaView style={appGlobalStyles.safeArea}>
      <NavigationContainer
        onStateChange={() => {
          if (Platform.OS === 'web') {
            try {
              const active = document.activeElement as HTMLElement | null;
              if (active && typeof active.blur === 'function') active.blur();
            } catch {}
          }
        }}
      >
        <Stack.Navigator initialRouteName="Login" screenOptions={defaultHeaderOptions}>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Meu Perfil' }} />
          <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NewCaseForm" component={NewCaseFormScreen} options={{ title: 'Abrir Novo Caso' }} />
          <Stack.Screen
            name="CaseDetail"
            component={CaseDetailScreen}
            options={({ route }: { route: any; navigation: any; theme: Theme }) => ({
              headerTitle: () => {
                const { caseId } = route.params as { caseId: string };
                const { simulatedCases } = require('./src/data/simulatedCases');
                const caseData = simulatedCases.find((c: any) => c.id === caseId);

                if (!caseData) return <Text>Detalhes do Caso</Text>;

                return (
                  <View style={appStyles.headerTitleContainer}>
                    <Text style={appStyles.headerCaseType}>{caseData.type}</Text>
                    <Text style={appStyles.headerPatientInitials}>Paciente: {caseData.patientInitials}</Text>
                  </View>
                );
              },
            })}
          />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Esqueci a Senha' }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Criar Conta' }} />
          <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} options={{ title: 'Verificar Código' }} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Trocar Senha' }} />
          <Stack.Screen name="TestScroll" component={TestScrollScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const appStyles = StyleSheet.create({
  headerTitleContainer: {
    alignItems: 'center',
  },
  headerCaseType: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primaryText,
    textAlign: 'center',
  },
  headerPatientInitials: {
    fontSize: 17,
    color: colors.primaryText,
    textAlign: 'center',
  },
});

const appGlobalStyles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.lightBlue,
  },
});
