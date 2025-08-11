// src/components/NewCaseForm/Step3PeriodontalEval.tsx
import React from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import RadioButton from '../RadioButton';
import { FormData } from '../../screens/NewCaseFormScreen';

interface StepProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
}

const Step3PeriodontalEval: React.FC<StepProps> = ({ formData, updateFormData }) => {
  return (
    <ScrollView contentContainerStyle={styles.stepContainer}>
      <Text style={styles.label}>SANGRAMENTO GENGIVAL ESPONTÂNEO OU À SONDAGEM</Text>
      <View style={styles.radioGroup}>
        <RadioButton label="Sim" selected={formData.gingivalBleeding === 'Sim'} onPress={() => updateFormData({ gingivalBleeding: 'Sim' })} />
        <RadioButton label="Não" selected={formData.gingivalBleeding === 'Não'} onPress={() => updateFormData({ gingivalBleeding: 'Não' })} />
      </View>

      <Text style={styles.label}>PROFUNDIDADE DE SONDAGEM MÁXIMA POR QUADRANTE (mm)</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira aqui"
        placeholderTextColor="#999"
        value={formData.maxProbingDepth}
        onChangeText={text => updateFormData({ maxProbingDepth: text })}
        keyboardType="numeric"
      />

      <Text style={styles.label}>MOBILIDADE DENTÁRIA</Text>
      <View style={styles.radioGroup}>
        <RadioButton label="Sim" selected={formData.toothMobility === 'Sim'} onPress={() => updateFormData({ toothMobility: 'Sim' })} />
        <RadioButton label="Não" selected={formData.toothMobility === 'Não'} onPress={() => updateFormData({ toothMobility: 'Não' })} />
      </View>
      {formData.toothMobility === 'Sim' && (
        <TextInput
          style={styles.input}
          placeholder="Grau: ___"
          placeholderTextColor="#999"
          value={formData.toothMobility.replace('Sim', '')}
          onChangeText={text => updateFormData({ toothMobility: `Sim ${text}` })}
        />
      )}

      <Text style={styles.label}>SUPURAÇÃO/PUS</Text>
      <View style={styles.radioGroup}>
        <RadioButton label="Sim" selected={formData.suppuration === 'Sim'} onPress={() => updateFormData({ suppuration: 'Sim' })} />
        <RadioButton label="Não" selected={formData.suppuration === 'Não'} onPress={() => updateFormData({ suppuration: 'Não' })} />
      </View>

      <Text style={styles.label}>RECESSSÃO GENGIVAL</Text>
      <View style={styles.radioGroup}>
        <RadioButton label="Sim" selected={formData.gingivalRecession === 'Sim'} onPress={() => updateFormData({ gingivalRecession: 'Sim' })} />
        <RadioButton label="Não" selected={formData.gingivalRecession === 'Não'} onPress={() => updateFormData({ gingivalRecession: 'Não' })} />
      </View>
      {formData.gingivalRecession === 'Sim' && (
        <TextInput
          style={styles.input}
          placeholder="Onde?"
          placeholderTextColor="#999"
          value={formData.gingivalRecession.replace('Sim', '')}
          onChangeText={text => updateFormData({ gingivalRecession: `Sim ${text}` })}
        />
      )}

      <Text style={styles.label}>DENTES AUSENTES POR PERDA PERIODONTAL?</Text>
      <View style={styles.radioGroup}>
        <RadioButton label="Sim" selected={formData.missingTeeth === 'Sim'} onPress={() => updateFormData({ missingTeeth: 'Sim' })} />
        <RadioButton label="Não" selected={formData.missingTeeth === 'Não'} onPress={() => updateFormData({ missingTeeth: 'Não' })} />
      </View>

      <Text style={styles.label}>ÍNDICE DE PLACA ESTIMADO (%)</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira"
        placeholderTextColor="#999"
        value={formData.plaqueIndex}
        onChangeText={text => updateFormData({ plaqueIndex: text })}
        keyboardType="numeric"
      />

      <Text style={styles.label}>REGIÕES MAIS ACOMETIDAS</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira"
        placeholderTextColor="#999"
        value={formData.affectedRegions}
        onChangeText={text => updateFormData({ affectedRegions: text })}
      />

      <Text style={styles.label}>ÚLTIMA RASPAGEM/LIMPEZA</Text>
      <TextInput
        style={styles.input}
        placeholder="Insira (DD/MM/AAAA)"
        placeholderTextColor="#999"
        value={formData.lastScaling}
        onChangeText={text => updateFormData({ lastScaling: text })}
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
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
});

export default Step3PeriodontalEval;