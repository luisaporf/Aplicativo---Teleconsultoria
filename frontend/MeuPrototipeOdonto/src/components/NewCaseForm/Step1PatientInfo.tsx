// src/components/NewCaseForm/Step1PatientInfo.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Checkbox from '../Checkbox'; // Componente Checkbox customizado
import RadioButton from '../RadioButton'; // Componente RadioButton customizado
import { FormData } from '../../screens/NewCaseFormScreen'; // Importa a interface FormData

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const Step1PatientInfo: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleMedicalHistoryChange = (item: string) => {
    const updatedHistory = formData.medicalHistory.includes(item)
      ? formData.medicalHistory.filter((i: string) => i !== item) // Tipagem explícita para 'i'
      : [...formData.medicalHistory, item];
    updateFormData({ medicalHistory: updatedHistory });
  };

  return (
    // ScrollView aplicado aqui para permitir a rolagem do conteúdo da etapa
    <ScrollView contentContainerStyle={styles.stepContentContainer} style={styles.scrollView}>
      <Text style={styles.instruction}>Preencha o formulário para abrir um novo caso.</Text>

      <Text style={styles.label}>INICIAIS</Text>
      <TextInput
        style={styles.input}
        placeholder="JM"
        placeholderTextColor="#999"
        value={formData.patientInitials}
        onChangeText={text => updateFormData({ patientInitials: text })}
      />

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>IDADE</Text>
          <TextInput
            style={styles.input}
            placeholder="23"
            placeholderTextColor="#999"
            value={formData.patientAge}
            onChangeText={text => updateFormData({ patientAge: text })}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.label}>CARTÃO SUS</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira aqui"
            placeholderTextColor="#999"
            value={formData.patientSusCard}
            onChangeText={text => updateFormData({ patientSusCard: text })}
            keyboardType="numeric"
          />
        </View>
      </View>

      <Text style={styles.label}>SEXO</Text>
      <View style={styles.radioGroup}>
        <RadioButton label="Masculino" selected={formData.patientGender === 'Masculino'} onPress={() => updateFormData({ patientGender: 'Masculino' })} />
        <RadioButton label="Feminino" selected={formData.patientGender === 'Feminino'} onPress={() => updateFormData({ patientGender: 'Feminino' })} />
        <RadioButton label="Outro" selected={formData.patientGender === 'Outro'} onPress={() => updateFormData({ patientGender: 'Outro' })} />
      </View>

      <Text style={styles.label}>HISTÓRICO MÉDICO (Selecione os que forem relevantes)</Text>
      <Checkbox label="Diabetes mellitus" selected={formData.medicalHistory.includes('Diabetes mellitus')} onPress={() => handleMedicalHistoryChange('Diabetes mellitus')} />
      <Checkbox label="Hipertensão arterial sistêmica" selected={formData.medicalHistory.includes('Hipertensão arterial sistêmica')} onPress={() => handleMedicalHistoryChange('Hipertensão arterial sistêmica')} />
      <Checkbox label="Dislipidemias" selected={formData.medicalHistory.includes('Dislipidemias')} onPress={() => handleMedicalHistoryChange('Dislipidemias')} />
      <Checkbox label="Doença cardiovascular" selected={formData.medicalHistory.includes('Doença cardiovascular')} onPress={() => handleMedicalHistoryChange('Doença cardiovascular')} />
      <Checkbox label="Doenças autoimunes" selected={formData.medicalHistory.includes('Doenças autoimunes')} onPress={() => handleMedicalHistoryChange('Doenças autoimunes')} />
      <TextInput
        style={styles.input}
        placeholder="Outras: Detalhe aqui"
        placeholderTextColor="#999"
        value={formData.otherMedicalHistory}
        onChangeText={text => updateFormData({ otherMedicalHistory: text })}
      />

      <Text style={styles.label}>TABAGISMO</Text>
      <View style={styles.radioGroup}>
        <RadioButton label="Ativo" selected={formData.smokingStatus === 'Ativo'} onPress={() => updateFormData({ smokingStatus: 'Ativo' })} />
        <RadioButton label="Ex-tabagista" selected={formData.smokingStatus === 'Ex-tabagista'} onPress={() => updateFormData({ smokingStatus: 'Ex-tabagista' })} />
        <RadioButton label="Não" selected={formData.smokingStatus === 'Não'} onPress={() => updateFormData({ smokingStatus: 'Não' })} />
      </View>

      <Text style={styles.label}>USO DE MEDICAMENTOS CRÔNICOS?</Text>
      <View style={styles.radioGroup}>
        {/* Aqui, para simular o comportamento de radio buttons para "Sim/Não" e um input de detalhe se "Sim" for selecionado,
            precisamos de um controle mais específico. A melhor abordagem é ter um estado booleano para "usando medicamentos"
            e o campo de detalhe só aparecer se for true. O `formData.chronicMedications` deve ser ajustado para isso.
            Por enquanto, faremos uma adaptação para o protótipo: */}
        <RadioButton label="Sim" selected={formData.chronicMedications.includes('Sim')} onPress={() => updateFormData({ chronicMedications: 'Sim ' + formData.chronicMedications.replace('Sim ', '') })} />
        <RadioButton label="Não" selected={formData.chronicMedications === 'Não'} onPress={() => updateFormData({ chronicMedications: 'Não' })} />
      </View>
      {formData.chronicMedications.includes('Sim') && (
        <TextInput
          style={styles.input}
          placeholder="Detalhe quais medicamentos"
          placeholderTextColor="#999"
          value={formData.chronicMedications.replace('Sim ', '')} // Remove "Sim " para mostrar só o detalhe
          onChangeText={text => updateFormData({ chronicMedications: `Sim ${text}` })}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1, // Permite que o ScrollView ocupe o espaço disponível
    width: '100%', // Garante que o ScrollView ocupe a largura total
  },
  stepContentContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minHeight: 500, // Remova ou ajuste este valor. Ele pode forçar a rolagem mesmo quando não necessário.
    paddingBottom: 20, // Garante que o último item não fique colado ao fundo
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontWeight: 'bold',
    marginTop: 10,
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  halfWidth: {
    width: '48%',
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
});

export default Step1PatientInfo;