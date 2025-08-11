// src/components/NewCaseForm/Step2ClinicalChar.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import RadioButton from '../RadioButton';
import { FormData } from '../../screens/NewCaseFormScreen';

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const Step2ClinicalChar: React.FC<StepProps> = ({ formData, updateFormData }) => {
  return (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      <Text style={styles.label}>QUEIXA PRINCIPAL</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Insira aqui"
        placeholderTextColor="#999"
        value={formData.mainComplaint}
        onChangeText={text => updateFormData({ mainComplaint: text })}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>TEMPO DE EVOLUÇÃO</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira aqui"
        placeholderTextColor="#999"
        value={formData.evolutionTime}
        onChangeText={text => updateFormData({ evolutionTime: text })}
      />

      <Text style={styles.label}>HISTÓRICO DE TRATAMENTO PERIODONTAL ANTERIOR</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Insira aqui"
        placeholderTextColor="#999"
        value={formData.prevPeriodontalTreatment}
        onChangeText={text => updateFormData({ prevPeriodontalTreatment: text })}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.label}>ADESÃO À HIGIENE ORAL</Text>
      <View style={styles.radioGroup}>
        <RadioButton label="Boa" selected={formData.oralHygieneAdherence === 'Boa'} onPress={() => updateFormData({ oralHygieneAdherence: 'Boa' })} />
        <RadioButton label="Regular" selected={formData.oralHygieneAdherence === 'Regular'} onPress={() => updateFormData({ oralHygieneAdherence: 'Regular' })} />
        <RadioButton label="Ruim" selected={formData.oralHygieneAdherence === 'Ruim'} onPress={() => updateFormData({ oralHygieneAdherence: 'Ruim' })} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  stepContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
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
  textArea: {
    height: 100, // Altura maior para campos de texto longos
    textAlignVertical: 'top', // Para o texto começar no topo
    paddingVertical: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
});

export default Step2ClinicalChar;