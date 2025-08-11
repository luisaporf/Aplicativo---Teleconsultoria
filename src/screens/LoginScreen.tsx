// src/screens/LoginScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../constants/colors';

// Defina os tipos para as rotas do seu Stack Navigator
// Isso é importante para o TypeScript saber quais rotas existem
type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  ForgotPassword: undefined;
  Register: undefined;
  // Adicione outras telas aqui conforme você as cria
};

// Define o tipo de navegação para esta tela específica
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// Define as props que esta tela irá receber
type Props = {
  navigation: LoginScreenNavigationProp;
};

export default function LoginScreen({ navigation }: Props) {
  const [cpf, setCpf] = useState<string>('102.012.012-23'); // Pré-preenchido para facilitar o teste, como no protótipo
  const [password, setPassword] = useState<string>('******'); // Pré-preenchido para facilitar o teste

  // Função para simular o login
  const handleLogin = () => {
    // --- SIMULAÇÃO DE AUTENTICAÇÃO ---
    // Em um app real, aqui você faria uma chamada para o backend
    // Para o protótipo, vamos usar credenciais fixas para simular o sucesso
    const simulatedCPF = '102.012.012-23';
    const simulatedPassword = '******'; // Ou uma senha mais robusta para testar o campo de senha

    if (cpf === simulatedCPF && password === simulatedPassword) {
      // Se as credenciais estiverem corretas, navega para o Dashboard
      navigation.navigate('Dashboard');
    } else {
      // Caso contrário, mostra um alerta de erro
      Alert.alert('Erro de Login', 'CPF ou senha incorretos. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagem do dente - ajuste o caminho se seu arquivo não for 'assets/icon.png' */}
      {/* Use o ícone que você tem no seu protótipo */}
      <Image source={require('../../assets/icon.png')} style={styles.logo} />

      <Text style={styles.welcomeText}>Bem-vindo!</Text>

      <TextInput
        style={styles.input}
        placeholder="102.012.012-23" // Placeholder com o exemplo do protótipo
        placeholderTextColor="#B0B0B0" // Cor mais clara para o placeholder
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric" // Sugere teclado numérico
        maxLength={14} // Máximo para o formato de CPF
      />

      <TextInput
        style={styles.input}
        placeholder="******" // Placeholder da senha
        placeholderTextColor="#B0B0B0"
        secureTextEntry // Esconde o texto digitado (mostra asteriscos)
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.linkText}>Esqueci minha senha</Text>
      </TouchableOpacity>

      {/* Linha divisória horizontal, como no protótipo */}
      <View style={styles.separator} />

      <Text style={styles.firstAccessText}>Primeiro acesso?</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerLinkText}>Cadastre-se aqui!</Text>
      </TouchableOpacity>
    </View>
  );
}

// Definição dos estilos usando StyleSheet.create
const styles = StyleSheet.create({
  container: {
    flex: 1, // Faz com que o container ocupe todo o espaço disponível
    justifyContent: 'center', // Centraliza os itens verticalmente
    alignItems: 'center', // Centraliza os itens horizontalmente
    padding: 20,
    backgroundColor: colors.background, // Cor de fundo azul claro do seu protótipo
  },
  logo: {
    width: 150, // Ajuste para o tamanho do seu logo
    height: 150, // Ajuste para o tamanho do seu logo
    marginBottom: 30, // Espaço abaixo do logo
    resizeMode: 'contain', // Garante que a imagem se ajuste sem cortar
  },
  welcomeText: {
    fontSize: 28, // Tamanho da fonte
    fontWeight: 'bold', // Negrito
    color: colors.black, // Cor do texto
    marginBottom: 20, // Espaço abaixo do texto
  },
  input: {
    width: '90%', // Largura dos campos de texto
    height: 50,
    backgroundColor: '#FFFFFF', // Fundo branco
    borderColor: '#CCCCCC', // Borda cinza clara
    borderWidth: 1, // Largura da borda
    borderRadius: 10, // Cantos arredondados
    paddingHorizontal: 15, // Preenchimento horizontal
    marginBottom: 15, // Espaço abaixo de cada input
    fontSize: 16, // Tamanho da fonte do texto digitado
    color: '#333', // Cor do texto digitado
  },
  loginButton: {
    width: '90%', // Largura do botão
    height: 50,
    backgroundColor: colors.mediumBlue, // Azul vibrante para o botão "Log in"
    borderRadius: 10, // Cantos arredondados
    justifyContent: 'center', // Centraliza o texto do botão verticalmente
    alignItems: 'center', // Centraliza o texto do botão horizontalmente
    marginBottom: 20, // Espaço abaixo do botão
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: colors.black, // Texto branco no botão
    fontSize: 18, // Tamanho da fonte
    fontWeight: 'bold', // Negrito
  },
  linkText: {
    color: colors.link,
    fontSize: 15,
    marginTop: 5,
    fontWeight: 'bold',

  },
  separator: {
    width: '80%', // Largura da linha
    height: 1, // Espessura da linha
    backgroundColor: '#BBBBBB', // Cor cinza da linha
    marginVertical: 25, // Espaço vertical ao redor da linha
  },
  firstAccessText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  registerLinkText: {
    color: colors.link, // Azul para o link de cadastro
    fontSize: 18,
    fontWeight: 'bold',
  },
});