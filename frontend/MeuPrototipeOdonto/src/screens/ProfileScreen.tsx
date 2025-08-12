// src/screens/ProfileScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import RadioButton from '../components/RadioButton';
import { RootStackParamList } from '../../App';
import { colors } from '../constants/colors'; // Importe as cores globais

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const initialProfileData = {
  nomeCompleto: 'MARIA SILVA DE NASCIMENTO',
  email: 'maria.nascimento@gmail.com',
  cns: '102-212-293',
  funcaoCargo: 'Médico',
  unidadeSaude: 'Minha unidade de saúde',
  municipio: 'Araxá',
  estado: 'MG',
  telefone: '(34) 91823-2912',
};

export default function ProfileScreen({ navigation }: Props) {
  const [profile, setProfile] = useState(initialProfileData);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { height: screenHeight } = Dimensions.get('window');

  useEffect(() => {
    // Carrega perfil salvo pelo cadastro, se existir
    let mounted = true;
    import('@react-native-async-storage/async-storage').then(({ default: AsyncStorage }) => {
      AsyncStorage.getItem('userProfile')
        .then((data) => {
          if (!mounted) return;
          if (data) {
            const parsed = JSON.parse(data);
            setProfile((prev) => ({
              ...prev,
              nomeCompleto: parsed.nomeCompleto ?? prev.nomeCompleto,
              email: parsed.email ?? prev.email,
              funcaoCargo: parsed.funcaoCargo ?? prev.funcaoCargo,
              unidadeSaude: parsed.unidadeSaude ?? prev.unidadeSaude,
              municipio: parsed.municipio ?? prev.municipio,
              telefone: parsed.telefone ?? prev.telefone,
            }));
          }
        })
        .catch(() => {});
    });

    return () => {
      mounted = false;
    };
  }, []);

  const handleChange = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleFunctionChange = (value: string) => {
    setProfile(prev => ({ ...prev, funcaoCargo: value }));
  };

  const handleSaveProfile = () => {
    if (!profile.nomeCompleto || !profile.email || !profile.cns || !profile.funcaoCargo ||
      !profile.unidadeSaude || !profile.municipio || !profile.estado || !profile.telefone) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.', [{ text: 'OK', style: 'cancel' }]);
      return;
    }

    // Dados já estão no estado `profile` via onChangeText; só sair do modo edição
    setIsEditing(false);
  };

  const handleGoBack = () => {
    if (isEditing) {
      Alert.alert('Descartar alterações?', 'Você tem alterações não salvas. Deseja descartá-las?', [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => setIsEditing(false) },
      ]);
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={[styles.fullContainer, { minHeight: screenHeight }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={handleGoBack}
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
          </TouchableOpacity>
          <View style={styles.iconButtonSpacer} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          style={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.profileImageContainer, styles.pageContent]}>
            <Image source={require('../../assets/user_profile.png')} style={styles.profileImage} />
          </View>

          {isEditing ? (
            <View style={[styles.formSection, styles.pageContent]}>
              <Text style={styles.label}>NOME COMPLETO</Text>
              <TextInput
                style={styles.input}
                value={profile.nomeCompleto}
                onChangeText={value => handleChange('nomeCompleto', value)}
                placeholder="Seu nome completo"
                placeholderTextColor={colors.placeholderText}
                autoCapitalize="words"
                returnKeyType="next"
              />

              <Text style={styles.label}>EMAIL</Text>
              <TextInput
                style={styles.input}
                value={profile.email}
                onChangeText={value => handleChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="seuemail@exemplo.com"
                placeholderTextColor={colors.placeholderText}
                returnKeyType="next"
              />

              <Text style={styles.label}>CARTÃO NACIONAL DE SAÚDE</Text>
              <TextInput
                style={styles.input}
                value={profile.cns}
                onChangeText={value => handleChange('cns', value)}
                keyboardType="numeric"
                placeholder="000-000-000"
                placeholderTextColor={colors.placeholderText}
                returnKeyType="next"
              />

              <Text style={styles.label}>FUNÇÃO/CARGO</Text>
              <View style={styles.radioGroup}>
                <RadioButton label="Dentista" selected={profile.funcaoCargo === 'Dentista'} onPress={() => handleFunctionChange('Dentista')} />
                <RadioButton label="Médico" selected={profile.funcaoCargo === 'Médico'} onPress={() => handleFunctionChange('Médico')} />
                <RadioButton label="Outra" selected={profile.funcaoCargo === 'Outra'} onPress={() => handleFunctionChange('Outra')} />
              </View>

              <Text style={styles.label}>UNIDADE DE SAÚDE</Text>
              <TextInput
                style={styles.input}
                value={profile.unidadeSaude}
                onChangeText={value => handleChange('unidadeSaude', value)}
                placeholder="Nome da unidade"
                placeholderTextColor={colors.placeholderText}
                returnKeyType="next"
              />

              <Text style={styles.label}>MUNICÍPIO</Text>
              <TextInput
                style={styles.input}
                value={profile.municipio}
                onChangeText={value => handleChange('municipio', value)}
                placeholder="Cidade"
                placeholderTextColor={colors.placeholderText}
                returnKeyType="next"
              />

              <Text style={styles.label}>ESTADO</Text>
              <TextInput
                style={styles.input}
                value={profile.estado}
                onChangeText={value => handleChange('estado', value)}
                placeholder="UF"
                placeholderTextColor={colors.placeholderText}
                autoCapitalize="characters"
                maxLength={2}
                returnKeyType="next"
              />

              <Text style={styles.label}>TELEFONE</Text>
              <TextInput
                style={styles.input}
                value={profile.telefone}
                onChangeText={value => handleChange('telefone', value)}
                keyboardType="phone-pad"
                placeholder="(00) 00000-0000"
                placeholderTextColor={colors.placeholderText}
                returnKeyType="done"
              />

              <TouchableOpacity style={styles.saveButton} onPress={handleSaveProfile} activeOpacity={0.9}>
                <Text style={styles.buttonText}>Salvar Perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setIsEditing(false)} activeOpacity={0.9}>
                <Text style={styles.cancelButtonText}>Voltar</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={[styles.infoSection, styles.pageContent]}>
              <Text style={styles.infoLabel}>NOME COMPLETO</Text>
              <Text style={styles.infoValue}>{profile.nomeCompleto || 'seu nome completo'}</Text>
              <Text style={styles.infoValueSmall}>{profile.email || 'seu melhor e-mail'}</Text>

              <Text style={styles.infoLabel}>CARTÃO NACIONAL DE SAÚDE</Text>
              <Text style={styles.infoValue}>{profile.cns || 'seu CNS'}</Text>

              <Text style={styles.infoLabel}>FUNÇÃO/CARGO</Text>
              <Text style={styles.infoValue}>{profile.funcaoCargo || 'selecione sua função'}</Text>

              <Text style={styles.infoLabel}>UNIDADE DE SAÚDE</Text>
              <Text style={styles.infoValue}>{profile.unidadeSaude || 'sua unidade de saúde'}</Text>

              <Text style={styles.infoLabel}>MUNICÍPIO</Text>
              <Text style={styles.infoValue}>{profile.municipio || 'seu município'}</Text>

              <Text style={styles.infoLabel}>ESTADO</Text>
              <Text style={styles.infoValue}>{profile.estado || 'seu estado'}</Text>

              <Text style={styles.infoLabel}>TELEFONE</Text>
              <Text style={styles.infoValue}>{profile.telefone || 'seu telefone'}</Text>

              <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)} activeOpacity={0.9}>
                <Text style={styles.buttonText}>Editar Perfil</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: colors.lightBlue, // Fundo principal da tela
  },
  headerContainer: {
    width: '100%',
    maxWidth: 1024,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: '700',
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 2,
  },
  iconButtonSpacer: {
    width: 36,
    height: 36,
  },
  iconImage: {
    width: 18,
    height: 18,
    tintColor: colors.darkBlue,
    resizeMode: 'contain',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  pageContent: {
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.mediumBlue, // Cor de fundo da imagem de perfil
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.lightBlue, // Borda da imagem de perfil
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
    elevation: 3,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 60,
  },
  infoSection: {
    width: '100%',
    backgroundColor: colors.white, // Fundo branco para as seções
    borderRadius: 12,
    padding: 20,
    shadowColor: colors.shadow, // Usando a nova cor de sombra
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8, // Aumentei um pouco a opacidade para melhor efeito
    shadowRadius: 4,
    elevation: 2,
  },
  infoLabel: {
    fontSize: 13,
    color: colors.gray, // Texto mais claro para labels
    marginTop: 16,
    marginBottom: 4,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 17,
    color: colors.primaryText, // Texto principal escuro
    fontWeight: '500',
    marginBottom: 6,
  },
  infoValueSmall: {
    fontSize: 14,
    color: colors.secondaryText, // Texto secundário
    marginBottom: 10,
  },
  editButton: {
    width: '100%',
    height: 48,
    backgroundColor: colors.darkBlue, // Cor do botão de edição (link/foco)
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  formSection: {
    width: '100%',
    backgroundColor: colors.white, // Fundo branco para as seções de formulário
    borderRadius: 12,
    padding: 20,
    shadowColor: colors.shadow, // Usando a nova cor de sombra
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8, // Aumentei um pouco a opacidade para melhor efeito
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 13,
    color: colors.secondaryText, // Cor para labels de formulário
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    width: '100%',
    height: 44,
    borderColor: colors.lightGray, // Borda do input
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 14,
    fontSize: 15,
    color: colors.primaryText, // Cor do texto do input
    backgroundColor: colors.background, // Fundo do input
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 14,
    width: '100%',
    gap: 8,
  },
  saveButton: {
    width: '100%',
    height: 48,
    backgroundColor: colors.darkBlue, // Cor para o botão de salvar
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  cancelButton: {
    width: '100%',
    height: 48,
    backgroundColor: colors.lightGray, // Cor para o botão de cancelar
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  cancelButtonText: {
    color: colors.secondaryText, // Cor do texto do botão cancelar
    fontSize: 16,
    fontWeight: '600',
  },
  buttonText: {
    color: colors.buttonText, // Cor do texto dos botões primários (branco)
    fontSize: 16,
    fontWeight: 'bold',
  },
});