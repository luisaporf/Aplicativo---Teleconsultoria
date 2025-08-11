// src/components/NewCaseForm/Step4ComplementaryExams.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Checkbox from '../Checkbox';
import { FormData } from '../../screens/NewCaseFormScreen';

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const Step4ComplementaryExams: React.FC<StepProps> = ({ formData, updateFormData }) => {
  // Simulação de upload de arquivo
  const handleUploadFile = (type: 'images' | 'radiographs' | 'labExams') => {
    // Em um app real, aqui você usaria uma biblioteca como expo-image-picker
    Alert.alert('Upload Simulado', 'Arquivo anexado com sucesso! (Funcionalidade de upload real não implementada neste protótipo).');
    const newFileName = `arquivo_simulado_${Date.now()}.png`; // Nome fictício
    if (type === 'images') {
      updateFormData({ attachedImages: [...formData.attachedImages, newFileName] });
    } else if (type === 'radiographs') {
      updateFormData({ attachedRadiographs: [...formData.attachedRadiographs, newFileName] });
    } else if (type === 'labExams') {
      updateFormData({ attachedLabExams: [...formData.attachedLabExams, newFileName] });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      <Text style={styles.label}>EXAMES DE IMAGEM</Text>
      <View style={styles.checkboxGroup}>
        <Checkbox label="Radiografia periapical (recente, até 12 meses)" selected={formData.radiographyPeriapical} onPress={() => updateFormData({ radiographyPeriapical: !formData.radiographyPeriapical })} />
        <Checkbox label="Radiografia panorâmica" selected={formData.radiographyPanoramic} onPress={() => updateFormData({ radiographyPanoramic: !formData.radiographyPanoramic })} />
        <Checkbox label="Outras:" selected={formData.radiographyOther} onPress={() => updateFormData({ radiographyOther: !formData.radiographyOther })} />
        {formData.radiographyOther && (
          <TextInput
            style={styles.input}
            placeholder="Insira detalhes da outra radiografia"
            placeholderTextColor="#999"
            value={formData.radiographyOtherDetails}
            onChangeText={text => updateFormData({ radiographyOtherDetails: text })}
          />
        )}
        <TouchableOpacity style={styles.uploadButton} onPress={() => handleUploadFile('radiographs')}>
          <Text style={styles.uploadButtonText}>Anexar Imagem (Radiografia)</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>EXAMES SISTÊMICOS RELEVANTES</Text>
      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.labelSmall}>Glicemia em jejum (mg/dL)</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira"
            placeholderTextColor="#999"
            value={formData.glucoseLevel}
            onChangeText={text => updateFormData({ glucoseLevel: text })}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.labelSmall}>Data (DD/MM/AAAA)</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#999"
            value={formData.glucoseDate}
            onChangeText={text => updateFormData({ glucoseDate: text })}
          />
        </View>
      </View>

      <Text style={styles.labelSmall}>HbA1c (se disponível) (%)</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira"
        placeholderTextColor="#999"
        value={formData.hba1c}
        onChangeText={text => updateFormData({ hba1c: text })}
        keyboardType="numeric"
      />

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <Text style={styles.labelSmall}>Pressão arterial aferida (mmHg)</Text>
          <TextInput
            style={styles.input}
            placeholder="Insira"
            placeholderTextColor="#999"
            value={formData.bloodPressure}
            onChangeText={text => updateFormData({ bloodPressure: text })}
          />
        </View>
        <View style={styles.halfWidth}>
          <Text style={styles.labelSmall}>Data (DD/MM/AAAA)</Text>
          <TextInput
            style={styles.input}
            placeholder="DD/MM/AAAA"
            placeholderTextColor="#999"
            value={formData.bloodPressureDate}
            onChangeText={text => updateFormData({ bloodPressureDate: text })}
          />
        </View>
      </View>

      <Text style={styles.labelSmall}>Colesterol total e frações (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira"
        placeholderTextColor="#999"
        value={formData.cholesterol}
        onChangeText={text => updateFormData({ cholesterol: text })}
      />

      <Text style={styles.labelSmall}>PCR (Proteína C Reativa) (mg/L)</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira"
        placeholderTextColor="#999"
        value={formData.crp}
        onChangeText={text => updateFormData({ crp: text })}
        keyboardType="numeric"
      />

      <Text style={styles.labelSmall}>Outros exames laboratoriais relevantes</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira"
        placeholderTextColor="#999"
        value={formData.otherExams}
        onChangeText={text => updateFormData({ otherExams: text })}
      />

      <TouchableOpacity style={styles.uploadButton} onPress={() => handleUploadFile('labExams')}>
        <Text style={styles.uploadButtonText}>Anexar Outros Exames Importantes</Text>
      </TouchableOpacity>
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
  labelSmall: {
    fontSize: 12,
    color: '#777',
    marginBottom: 2,
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
  uploadButton: {
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  uploadButtonText: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  halfWidth: {
    width: '48%',
  },
});

export default Step4ComplementaryExams;