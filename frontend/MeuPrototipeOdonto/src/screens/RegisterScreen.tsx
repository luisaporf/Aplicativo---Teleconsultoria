// src/screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  const [outraProfissao, setOutraProfissao] = useState<string>('');
  const [unidadeSaude, setUnidadeSaude] = useState<string>('');
  const [municipio, setMunicipio] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telefone, setTelefone] = useState<string>('');
  const [cpf, setCpf] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [globalErrorMessage, setGlobalErrorMessage] = useState<string>('');

  // Função de validação de CPF (formato básico)
  const isValidCPF = (cpf: string): boolean => {
    const cleanedCpf = cpf.replace(/\D/g, '');
    if (cleanedCpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cleanedCpf)) return false;
    return true;
  };

  const handleRegister = async () => {
    setSuccessMessage('');
    setGlobalErrorMessage('');
    setErrors({});

    // validação detalhada
    const newErrors: Record<string, string> = {};
    if (!nomeCompleto.trim()) newErrors.nomeCompleto = 'Informe seu nome completo.';
    if (!cro.trim()) newErrors.cro = 'Informe o CRO.';
    if (!funcaoCargo) newErrors.funcaoCargo = 'Selecione sua função/cargo.';
    if (funcaoCargo === 'Outro' && !outraProfissao.trim()) newErrors.outraProfissao = 'Descreva sua profissão.';
    if (!unidadeSaude.trim()) newErrors.unidadeSaude = 'Informe a unidade de saúde.';
    if (!municipio.trim()) newErrors.municipio = 'Informe o município.';
    if (!email.trim()) newErrors.email = 'Informe o e-mail.';
    else if (!email.includes('@') || !email.includes('.')) newErrors.email = 'E-mail inválido.';
    if (!telefone.trim()) newErrors.telefone = 'Informe o telefone.';
    if (!cpf.trim()) newErrors.cpf = 'Informe o CPF (apenas números).';
    else if (!isValidCPF(cpf)) newErrors.cpf = 'CPF inválido. Use 11 dígitos.';
    if (!password.trim()) newErrors.password = 'Crie uma senha.';
    else if (password.length < 6) newErrors.password = 'A senha deve ter no mínimo 6 caracteres.';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Confirme sua senha.';
    else if (password !== confirmPassword) newErrors.confirmPassword = 'As senhas não coincidem.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setGlobalErrorMessage('Falha no cadastro. Verifique os campos destacados.');
      return;
    }

    // Salvar dados validados no perfil (AsyncStorage)
    const profileToSave = {
      nomeCompleto: nomeCompleto.trim(),
      email: email.trim(),
      telefone: telefone.trim(),
      unidadeSaude: unidadeSaude.trim(),
      municipio: municipio.trim(),
      funcaoCargo: funcaoCargo || 'Outro',
      outraProfissao: funcaoCargo === 'Outro' ? outraProfissao.trim() : '',
      cro: cro.trim(),
      cpf: cpf.replace(/\D/g, ''),
    };

    try {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profileToSave));
      setSuccessMessage('Cadastro realizado com sucesso! Faça login para continuar.');
      setTimeout(() => {
        navigation.navigate('Login');
      }, 1200);
    } catch {
      setErrors({ storage: 'Falha ao salvar dados localmente. Tente novamente.' });
      setGlobalErrorMessage('Falha no cadastro. Tente novamente.');
    }
  };

  const renderError = (field: string) => (errors[field] ? <Text style={styles.fieldError}>{errors[field]}</Text> : null);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.scrollView}>
      <View style={[styles.container, styles.pageContent]}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />

        <Text style={styles.title}>Criar nova Conta</Text>

        {!!successMessage && <Text style={styles.successBanner}>{successMessage}</Text>}
        {!!globalErrorMessage && <Text style={styles.errorBanner}>{globalErrorMessage}</Text>}
        {!!errors.storage && <Text style={styles.errorBanner}>{errors.storage}</Text>}

        <View style={styles.formSection}> {/* Seção para agrupar campos e adicionar padding */}
          <Text style={styles.label}>NOME COMPLETO <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.nomeCompleto && styles.inputError]}
            placeholder="Seu nome completo"
            placeholderTextColor="#999"
            value={nomeCompleto}
            onChangeText={setNomeCompleto}
          />

          <Text style={styles.label}>CRO <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.cro && styles.inputError]}
            placeholder="Número do CRO"
            placeholderTextColor="#999"
            value={cro}
            onChangeText={setCro}
            keyboardType="numeric"
          />

          <Text style={styles.label}>CARGO/FUNÇÃO <Text style={styles.required}>*</Text></Text>
          <View style={styles.radioGroup}>
            <RadioButton label="Dentista" selected={funcaoCargo === 'Dentista'} onPress={() => setFuncaoCargo('Dentista')} />
            <RadioButton label="Médico" selected={funcaoCargo === 'Médico'} onPress={() => setFuncaoCargo('Médico')} />
            <RadioButton label="Outro" selected={funcaoCargo === 'Outro'} onPress={() => setFuncaoCargo('Outro')} />
          </View>
          {renderError('funcaoCargo')}

          {funcaoCargo === 'Outro' && (
            <>
              <Text style={styles.label}>DESCREVA SUA PROFISSÃO <Text style={styles.required}>*</Text></Text>
              <TextInput
                style={[styles.input, errors.outraProfissao && styles.inputError]}
                placeholder="Ex.: Auxiliar de Saúde Bucal"
                placeholderTextColor="#999"
                value={outraProfissao}
                onChangeText={setOutraProfissao}
              />
              {renderError('outraProfissao')}
            </>
          )}

          <Text style={styles.label}>UNIDADE DE SAÚDE <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.unidadeSaude && styles.inputError]}
            placeholder="Nome da sua unidade de saúde"
            placeholderTextColor="#999"
            value={unidadeSaude}
            onChangeText={setUnidadeSaude}
          />

          <Text style={styles.label}>MUNICÍPIO <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.municipio && styles.inputError]}
            placeholder="Seu município"
            placeholderTextColor="#999"
            value={municipio}
            onChangeText={setMunicipio}
          />

          <Text style={styles.label}>EMAIL INSTITUCIONAL <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="seu.email@instituicao.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>TELEFONE <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.telefone && styles.inputError]}
            placeholder="(XX) XXXXX-XXXX"
            placeholderTextColor="#999"
            value={telefone}
            onChangeText={setTelefone}
            keyboardType="phone-pad"
          />

          <Text style={styles.label}>CPF <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.cpf && styles.inputError]}
            placeholder="XXX.XXX.XXX-XX"
            placeholderTextColor="#999"
            value={cpf}
            onChangeText={setCpf}
            keyboardType="numeric"
            maxLength={14}
          />

          <Text style={styles.label}>SENHA <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.password && styles.inputError]}
            placeholder="Crie sua senha"
            placeholderTextColor="#999"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Text style={styles.label}>CONFIRMAR SENHA <Text style={styles.required}>*</Text></Text>
          <TextInput
            style={[styles.input, errors.confirmPassword && styles.inputError]}
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
  pageContent: {
    width: '100%',
    maxWidth: 720,
    marginHorizontal: 'auto',
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
  successBanner: {
    width: '90%',
    backgroundColor: '#e6f4ea',
    borderLeftWidth: 4,
    borderLeftColor: '#2e7d32',
    color: '#1b5e20',
    fontSize: 14,
    fontWeight: '600',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: 'left',
  },
  errorBanner: {
    width: '90%',
    backgroundColor: '#fdecea',
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
    color: colors.error,
    fontSize: 14,
    fontWeight: '600',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: 'left',
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
  inputError: {
    borderColor: '#d32f2f',
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



