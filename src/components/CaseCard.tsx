// src/components/CaseCard.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Definição do tipo para os dados de um caso
interface CaseData {
  id: string;
  type: 'Indicação cirúrgica' | 'Orientação Diagnóstica' | 'Conduta frente a complicação pós-operatória' | 'Sugestão terapêutica';
  patientInitials: string;
  date: string;
  time: string;
  status: 'pending' | 'in_analysis_solicitante' | 'responded_solicitante' | 'new_specialist' | 'in_analysis_specialist' | 'responded_specialist';
}

interface CaseCardProps {
  caseData: CaseData;
  onPress: () => void;
}

const CaseCard: React.FC<CaseCardProps> = ({ caseData, onPress }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text style={styles.caseType}>{caseData.type} - {caseData.patientInitials}</Text>
        <Text style={styles.dateTime}>{caseData.date}</Text>
        <Text style={styles.dateTime}>{caseData.time}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  textContainer: {
    flex: 1,
  },
  caseType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 13,
    color: '#777',
  },
});

export default CaseCard;