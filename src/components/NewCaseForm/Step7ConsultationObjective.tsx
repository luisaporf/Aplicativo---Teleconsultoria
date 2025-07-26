// src/components/NewCaseForm/Step7ConsultationObjective.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import Checkbox from '../Checkbox';
import { FormData } from '../../screens/NewCaseFormScreen';

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const Step7ConsultationObjective: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handleObjectiveChange = (item: string) => {
    const updatedObjective = formData.consultationObjective.includes(item)
      ? formData.consultationObjective.filter(i => i !== item)
      : [...formData.consultationObjective, item];
    updateFormData({ consultationObjective: updatedObjective });
  };

  return (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      <Text style={styles.label}>O QUE VOCÊ ESPERA DA RESPOSTA DO ESPECIALISTA?</Text>
      <View style={styles.checkboxGroup}>
        <Checkbox label="Orientação diagnóstica" selected={formData.consultationObjective.includes('Orientação diagnóstica')} onPress={() => handleObjectiveChange('Orientação diagnóstica')} />
        <Checkbox label="Sugestão terapêutica" selected={formData.consultationObjective.includes('Sugestão terapêutica')} onPress={() => handleObjectiveChange('Sugestão terapêutica')} />
        <Checkbox label="Indicação Cirúrgica" selected={formData.consultationObjective.includes('Indicação Cirúrgica')} onPress={() => handleObjectiveChange('Indicação Cirúrgica')} />
        <Checkbox label="Discussão sobre critérios de encaminhamento" selected={formData.consultationObjective.includes('Discussão sobre critérios de encaminhamento')} onPress={() => handleObjectiveChange('Discussão sobre critérios de encaminhamento')} />
        <Checkbox label="Conduta frente a complicação pós-operatória" selected={formData.consultationObjective.includes('Conduta frente a complicação pós-operatória')} onPress={() => handleObjectiveChange('Conduta frente a complicação pós-operatória')} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Outro: Detalhe aqui"
        placeholderTextColor="#999"
        value={formData.otherConsultationObjective}
        onChangeText={text => updateFormData({ otherConsultationObjective: text })}
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

export default Step7ConsultationObjective;