// src/components/NewCaseForm/Step6ConductedActions.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import Checkbox from '../Checkbox';
import { FormData } from '../../screens/NewCaseFormScreen';

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const Step6ConductedActions: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleInterventionsChange = (item: string) => {
    const updatedInterventions = formData.interventionsDone.includes(item)
      ? formData.interventionsDone.filter(i => i !== item)
      : [...formData.interventionsDone, item];
    updateFormData({ interventionsDone: updatedInterventions });
  };

  return (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      <Text style={styles.label}>Intervenções clínicas já feitas:</Text>
      <View style={styles.checkboxGroup}>
        <Checkbox label="Raspagem supra" selected={formData.interventionsDone.includes('Raspagem supra')} onPress={() => handleInterventionsChange('Raspagem supra')} />
        <Checkbox label="Raspagem subgengival" selected={formData.interventionsDone.includes('Raspagem subgengival')} onPress={() => handleInterventionsChange('Raspagem subgengival')} />
        <Checkbox label="Alisamento radicular" selected={formData.interventionsDone.includes('Alisamento radicular')} onPress={() => handleInterventionsChange('Alisamento radicular')} />
        <Checkbox label="Controle de placa" selected={formData.interventionsDone.includes('Controle de placa')} onPress={() => handleInterventionsChange('Controle de placa')} />
        <Checkbox label="Prescrição medicamentosa" selected={formData.interventionsDone.includes('Prescrição medicamentosa')} onPress={() => handleInterventionsChange('Prescrição medicamentosa')} />
        <Checkbox label="Reavaliação periodontal" selected={formData.interventionsDone.includes('Reavaliação periodontal')} onPress={() => handleInterventionsChange('Reavaliação periodontal')} />
      </View>

      <Text style={styles.label}>Data da última intervenção (DD/MM/AAAA):</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        placeholderTextColor="#999"
        value={formData.lastInterventionDate}
        onChangeText={text => updateFormData({ lastInterventionDate: text })}
      />
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
  checkboxGroup: {
    marginBottom: 10,
  },
});

export default Step6ConductedActions;