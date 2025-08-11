// src/screens/VerifyCodeScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../constants/colors';

// Tipagem para navegação
type RootStackParamList = {
  Login: undefined;
  VerifyCode: undefined;
  ChangePassword: undefined;
};

type VerifyCodeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VerifyCode'>;

type Props = {
  navigation: VerifyCodeScreenNavigationProp;
};

export default function VerifyCodeScreen({ navigation }: Props) {
  const [code, setCode] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false); // Para simular erro de código

  const handleVerifyCode = () => {
    // --- SIMULAÇÃO DE VERIFICAÇÃO DE CÓDIGO ---
    const correctCode = '123456'; // Código simulado

    if (code === correctCode) {
      setIsError(false);
      Alert.alert('Sucesso', 'Código verificado! Agora você pode trocar sua senha.');
      navigation.navigate('ChangePassword'); // Navega para a tela de troca de senha
    } else {
      setIsError(true);
      Alert.alert('Erro', 'CÓDIGO INCORRETO! Um novo código foi enviado por e-mail.');
      setCode(''); // Limpa o campo para nova tentativa
      // Em um app real, aqui você acionaria o reenvio do código
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagem do dente */}
      <Image source={require('../../assets/icon.png')} style={styles.logo} />

      <Text style={styles.title}>Esqueci minha Senha</Text>

      {isError ? (
        <Text style={styles.errorMessage}>CÓDIGO INCORRETO!</Text>
      ) : null}

      <Text style={styles.instructionText}>
        {isError ? 'Novo código enviado por e-mail. Insira aqui:' : 'Código enviado por e-mail. Insira aqui:'}
      </Text>

      <TextInput
        style={[styles.input, isError && styles.inputError]} // Estilo de erro se houver
        placeholder="○○○○○○" // Placeholder com círculos como no protótipo
        placeholderTextColor="#B0B0B0"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        maxLength={6} // Código de 6 dígitos
      />

      <TouchableOpacity style={styles.sendButton} onPress={handleVerifyCode}>
        <Text style={styles.buttonText}>Enviar Código</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#DEF0F4',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 30,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#FF0000', // Vermelho para erro
    fontWeight: 'bold',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 20, // Fonte maior para o código
    textAlign: 'center', // Centraliza o texto
    letterSpacing: 5, // Espaçamento entre os caracteres
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  inputError: {
    borderColor: '#FF0000', // Borda vermelha para erro
    borderWidth: 2,
  },
  sendButton: {
    width: '90%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
  },
  backButtonText: {
    color: '#007BFF',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});