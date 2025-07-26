// src/screens/TestScrollScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors } from '../constants/colors';

export default function TestScrollScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Teste de Rolagem</Text>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}>
        {Array.from({ length: 50 }).map((_, i) => (
          <Text key={i} style={styles.lineText}>Linha de Conteúdo Teste {i + 1}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#add8e6',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'rgba(255,0,0,0.2)',
  },
  contentContainer: {
    padding: 20,
    backgroundColor: 'rgba(0,255,0,0.2)',
    minHeight: 1200, // <<< Mantenha este valor ou aumente se necessário (ex: 1500)
  },
  lineText: {
    fontSize: 18,
    paddingVertical: 5,
  },
});