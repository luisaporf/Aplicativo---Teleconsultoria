// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../constants/colors';

// Importe a tipagem RootStackParamList do App.tsx
import { RootStackParamList } from '../../App'; // Ajuste o caminho se necessário
import RadioButton from '../components/RadioButton'; // Importe o RadioButton

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props) {
  const [nomeCompleto, setNomeCompleto] = useState<string>('');
  const [cro, setCro] = useState<string>('');
  const [funcaoCargo, setFuncaoCargo] = useState<string>('');
  const [unidadeSaude, setUnidadeSaude] = useState<string>('');
  const [municipio, setMunicipio] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Função de validação de CPF (formato básico)
  const isValidCPF = (cpf: string): boolean => {
    const cleanedCpf = cpf.replace(/\D/g, '');
    if (cleanedCpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanedCpf)) return false;
    return true;
  };

  const handleRegister = () => {
    setErrorMessage(''); // Limpa a mensagem de erro anterior

    // 1. Validação de campos vazios (incluindo os novos)
    if (!nomeCompleto || !cro || !funcaoCargo || !unidadeSaude || !municipio || !email || !telefone || !cpf || !password || !confirmPassword) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // 2. Validação de formato da senha
    if (password.length < 6) {
      setErrorMessage('A senha deve ter no mínimo 6 caracteres.');
      return;
    }

    // 3. Validação de confirmação de senha
    if (password !== confirmPassword) {
      setErrorMessage('As senhas não coincidem.');
      return;
    }

    // 4. Validação de formato do CPF
    if (!isValidCPF(cpf)) {
      setErrorMessage('O CPF inserido não é válido. Verifique o formato (apenas números).');
      return;
    }

    // 5. Validação de formato do Email (básica)
    if (!email.includes('@') || !email.includes('.')) {
        setErrorMessage('O email inserido não é válido. Verifique o formato.');
        return;
    }

    // --- SIMULAÇÃO DE CADASTRO COM SUCESSO ---
    Alert.alert('Cadastro Realizado', 'Sua conta foi criada com sucesso! Você já pode fazer login.');
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
      <View style={styles.container}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />

        <Text style={styles.title}>Criar nova Conta</Text>

        {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}

        <View style={styles.formSection}> {/* Seção para agrupar campos e adicionar padding */}
          <Text style={styles.label}>NOME COMPLETO</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome completo"
            placeholderTextColor="#999"
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
          />

          <Text style={styles.label}>CRO</Text>
          <TextInput
            style={styles.input}
            placeholder="Número do CRO"
            placeholderTextColor="#999"
            value={cro}
            onChangeText={setCro}
            keyboardType="numeric"
          />

          <Text style={styles.label}>CARGO/FUNÇÃO</Text>
          <View style={styles.radioGroup}>
            <RadioButton label="Dentista" selected={funcaoCargo === 'Dentista'} onPress={() => setFuncaoCargo('Dentista')} />
            <RadioButton label="Médico" selected={funcaoCargo === 'Médico'} onPress={() => setFuncaoCargo('Médico')} />
            <RadioButton label="Outro" selected={funcaoCargo === 'Outro'} onPress={() => setFuncaoCargo('Outro')} />
          </View>

          <Text style={styles.label}>UNIDADE DE SAÚDE</Text>
          <TextInput
            style={styles.input}
            placeholder="Nome da sua unidade de saúde"
            placeholderTextColor="#999"
            value={unidadeSaude}
            onChangeText={setUnidadeSaude}
          />

          <Text style={styles.label}>MUNICÍPIO</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu município"
            placeholderTextColor="#999"
            value={municipio}
            onChangeText={setMunicipio}
          />

          <Text style={styles.label}>EMAIL INSTITUCIONAL</Text>
          <TextInput
            style={styles.input}
            placeholder="seu.email@instituicao.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>TELEFONE</Text>
          <TextInput
            style={styles.input}
            placeholder="(XX) XXXXX-XXXX"
            placeholderTextColor="#999"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="XXX.XXX.XXX-XX"
            placeholderTextColor="#999"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
            maxLength={14}
          />

          <Text style={styles.label}>SENHA</Text>
          <TextInput
            style={styles.input}
            placeholder="Crie sua senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>CONFIRMAR SENHA</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirme sua senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View> {/* Fim da formSection */}

        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
    paddingBottom: 50,
    backgroundColor: colors.lightBlue,
  },
  container: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primaryText,
    marginBottom: 20,
  },
  errorMessage: {
    width: '90%',
    backgroundColor: '#fdecea', // tom claro de vermelho
    borderLeftWidth: 4,
    borderLeftColor: '#f44336', // tom forte de vermelho
    color: colors.error,
    fontSize: 14,
    fontWeight: '600',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: 'left',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 2,
  },
  formSection: {
    width: '90%',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 25,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
  },
  label: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 6,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginTop: 12,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 10,
    fontSize: 16,
    color: colors.primaryText,
    backgroundColor: colors.white,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 15,
    marginTop: 5,
  },
  registerButton: {
    width: '90%',
    height: 52,
    backgroundColor: colors.mediumBlue,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: colors.black,
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 10,
    padding: 10,
  },
  backButtonText: {
    color: colors.link,
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});



