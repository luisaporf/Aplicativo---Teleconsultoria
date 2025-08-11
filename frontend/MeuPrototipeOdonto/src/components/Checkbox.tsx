// src/components/Checkbox.tsx
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

interface CheckboxProps {
  label: string;
  selected: boolean;
  onPress: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, selected, onPress }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <View style={[styles.checkbox, selected && styles.checkboxSelected]}>
        {selected && <Text style={styles.checkmark}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: colors.mediumBlue, // Cor da borda do checkbox
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    backgroundColor: colors.white,
  },
  checkboxSelected: {
    backgroundColor: colors.darkBlue, // Fundo azul quando selecionado
  },
  checkmark: {
    color: colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1, // Permite que o texto quebre linha
  },
});

export default Checkbox;