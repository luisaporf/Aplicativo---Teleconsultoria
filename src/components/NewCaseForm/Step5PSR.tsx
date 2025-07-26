// src/components/NewCaseForm/Step5PSR.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import Checkbox from '../Checkbox';
import { FormData } from '../../screens/NewCaseFormScreen';

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const PSR_SEXTANTS = [
  { key: '1', label: '1 – Superior direito' },
  { key: '2', label: '2 – Superior anterior' },
  { key: '3', label: '3 – Superior esquerdo' },
  { key: '4', label: '4 – Inferior esquerdo' },
  { key: '5', label: '5 – Inferior anterior' },
  { key: '6', label: '6 – Inferior direito' },
];

const Step5PSR: React.FC<StepProps> = ({ formData, updateFormData }) => {
  const handlePSRCodeChange = (sextantKey: string, value: string) => {
    updateFormData({
      psrCodes: { ...formData.psrCodes, [sextantKey]: value },
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      <Text style={styles.label}>Resultado do Exame PSR (Periodontal Screening and Recording)</Text>
      <Text style={styles.instruction}>Preencher os códigos conforme sextantes (0 a 4):</Text>

      {PSR_SEXTANTS.map(sextant => (
        <View key={sextant.key} style={styles.psrRow}>
          <Text style={styles.psrLabel}>{sextant.label}</Text>
          <TextInput
            style={styles.psrInput}
            placeholder="0-4"
            placeholderTextColor="#999"
            value={formData.psrCodes[sextant.key]}
            onChangeText={text => handlePSRCodeChange(sextant.key, text)}
            keyboardType="numeric"
            maxLength={1}
          />
        </View>
      ))}

      <Text style={styles.label}>Marcar se houver presença de furca, recessão > 3,5 mm ou mobilidade associada.</Text>
      <Checkbox
        label="Sim, há achados associados (furca, recessão > 3,5mm ou mobilidade)"
        selected={formData.psrAssociatedFindings}
        onPress={() => updateFormData({ psrAssociatedFindings: !formData.psrAssociatedFindings })}
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
  instruction: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  psrRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  psrLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  psrInput: {
    width: 50,
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default Step5PSR;