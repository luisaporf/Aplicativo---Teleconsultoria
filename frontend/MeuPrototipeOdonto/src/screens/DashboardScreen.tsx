import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import CaseCard from '../components/CaseCard';
import { simulatedCases } from '../data/simulatedCases';
import { colors } from '../constants/colors';

type RootStackParamList = {
  Dashboard: undefined;
  Profile: undefined;
  NewCaseForm: undefined;
  CaseDetail: { caseId: string };
  Login: undefined;
};

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

type Props = {
  navigation: DashboardScreenNavigationProp;
};

const currentUser = {
  type: 'solicitante',
  name: 'Dr. João da Silva',
};

export default function DashboardScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<'pending' | 'in_analysis' | 'responded'>('pending');

  const getFilteredCases = () => {
    if (currentUser.type === 'solicitante') {
      if (activeTab === 'pending') return simulatedCases.filter(c => c.status === 'pending');
      if (activeTab === 'in_analysis') return simulatedCases.filter(c => c.status === 'in_analysis_solicitante');
      if (activeTab === 'responded') return simulatedCases.filter(c => c.status === 'responded_solicitante');
    } else {
      if (activeTab === 'pending') return simulatedCases.filter(c => c.status === 'new_specialist');
      if (activeTab === 'in_analysis') return simulatedCases.filter(c => c.status === 'in_analysis_specialist');
      if (activeTab === 'responded') return simulatedCases.filter(c => c.status === 'responded_specialist');
    }
    return [];
  };

  const filteredCases = getFilteredCases();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerInner}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.leftIconContainer}>
            <Image source={require('../../assets/Icons/leave.png')} style={styles.logoutIcon} />
          </TouchableOpacity>

          <View pointerEvents="none" style={styles.headerTitleWrapper}>
            <Text style={styles.headerTitle}>Meus Casos</Text>
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.rightIconContainer}>
            <Image source={require('../../assets/user_profile.png')} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.illustrationContainer, styles.pageContent]}>
        <Image source={require('../../assets/dashboard_illustration.png')} style={styles.illustration} />
      </View>

      <View style={[styles.tabsContainer, styles.pageContent]}>
        {['pending', 'in_analysis', 'responded'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab as any)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
              {tab === 'pending' ? 'Casos Pendentes' : tab === 'in_analysis' ? 'Casos em Análise' : 'Casos Respondidos'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {currentUser.type === 'solicitante' && (
        <TouchableOpacity style={[styles.newCaseButton, styles.pageContent]} onPress={() => navigation.navigate('NewCaseForm')}>
          <Text style={styles.newCaseButtonText}>+ INICIAR NOVO CASO</Text>
        </TouchableOpacity>
      )}

      <ScrollView style={styles.casesList} contentContainerStyle={styles.casesListContent}>
        {filteredCases.length > 0 ? (
          filteredCases.map(caseItem => (
            <CaseCard
              key={caseItem.id}
              caseData={caseItem}
              onPress={() => navigation.navigate('CaseDetail', { caseId: caseItem.id })}
            />
          ))
        ) : (
          <View style={styles.noCasesContainer}>
            <Text style={styles.noCasesEmoji}>📭</Text>
            <Text style={styles.noCasesText}>Nenhum caso nesta categoria.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 0,
    backgroundColor: colors.lightBlue,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 8,
    height: 56,
  },
  headerInner: {
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '100%',
  },
  headerTitleWrapper: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: colors.darkBlue,
    textAlign: 'center',
  },
  leftIconContainer: {
    padding: 8,
  },
  rightIconContainer: {
    padding: 8,
  },
  logoutIcon: {
    width: 24,
    height: 24,
    tintColor: colors.darkBlue,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pageContent: {
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
  },
  illustration: {
    width: 220,
    height: 110,
    resizeMode: 'contain',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  tabButton: {
    backgroundColor: '#E6E6E6',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.lightBlue,
  },
  tabText: {
    fontSize: 14,
    color: colors.black,
  },
  activeTabText: {
    fontWeight: 'bold',
    color: colors.black,
  },
  newCaseButton: {
    backgroundColor: colors.mediumBlue,
    borderRadius: 12,
    paddingVertical: 14,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 4,
  },
  newCaseButtonText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: '600',
  },
  casesList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  casesListContent: {
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
    paddingBottom: 20,
  },
  noCasesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
  },
  noCasesEmoji: {
    fontSize: 50,
    marginBottom: 8,
  },
  noCasesText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    maxWidth: 280,
  },
});
