import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  FlatList,
  SafeAreaView, 
  Platform
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import CaseCard from '../components/CaseCard';
import { simulatedCases } from '../data/simulatedCases';
import { colors } from '../constants/colors';
import { RootStackParamList } from '../../App';

// Tipagem para as abas
type TabStatus = 'pending' | 'in_analysis' | 'responded';

const TABS: { key: TabStatus; label: string }[] = [
  { key: 'pending', label: 'Pendentes' },
  { key: 'in_analysis', label: 'Em Análise' },
  { key: 'responded', label: 'Respondidos' },
];

type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;
type DashboardScreenRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;

type Props = {
  navigation: DashboardScreenNavigationProp;
  route: DashboardScreenRouteProp;
};

const currentUser = {
  type: 'solicitante' as const,
  name: 'Dr. João da Silva',
};

const EmptyListComponent = () => (
  <View style={styles.noCasesContainer}>
    <Text style={styles.noCasesEmoji}>📭</Text>
    <Text style={styles.noCasesText}>Nenhum caso encontrado.</Text>
    <Text style={styles.noCasesSubText}>Tente selecionar outra aba ou crie um novo caso.</Text>
  </View>
);

export default function DashboardScreen({ navigation, route }: Props) {
  const [activeTab, setActiveTab] = useState<TabStatus>('pending');
  const [notif, setNotif] = useState<string>('');
  const caseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const recentInAnalysisIdsRef = useRef<Set<string>>(new Set());

  // Detecta se há um novo caso marcado com isNew e programa a simulação
  useEffect(() => {
    const newlyCreated = simulatedCases.find(c => (c as any).isNew && c.status === 'pending');
    if (!newlyCreated) return;

    // limpamos flag para não reprocessar
    (newlyCreated as any).isNew = false;
    setActiveTab('pending');

    if (caseTimerRef.current) clearTimeout(caseTimerRef.current);
    caseTimerRef.current = setTimeout(() => {
      const idx = simulatedCases.findIndex(c => c.id === newlyCreated.id);
      if (idx >= 0) {
        simulatedCases[idx] = {
          ...simulatedCases[idx],
          status: 'in_analysis_solicitante' as any,
          specialistResponse:
            'Resposta orientativa: Rever higiene oral, instituir terapia periodontal básica e acompanhamento.\nEncaminhamento necessário? Não.\nTempo sugerido de retorno: 30 dias.\nObservações clínicas: Controle de placa e motivação do paciente.',
          encaminhamento: 'Não',
          tempoRetorno: '30 dias',
          observacoes: 'Controle de placa.',
        } as any;
        recentInAnalysisIdsRef.current.add(simulatedCases[idx].id);
      }
      setNotif('Caso respondido, veja retorno.');
      setActiveTab('in_analysis');
      setTimeout(() => setNotif(''), 4000);
    }, 5000);

    return () => {
      if (caseTimerRef.current) clearTimeout(caseTimerRef.current);
    };
  }, [route.params]);

  const filteredCases = useMemo(() => {
    const statusMap = {
      solicitante: {
        pending: 'pending',
        in_analysis: 'in_analysis_solicitante',
        responded: 'responded_solicitante',
      },
      specialist: {
        pending: 'new_specialist',
        in_analysis: 'in_analysis_specialist',
        responded: 'responded_specialist',
      },
    } as const;

    const targetStatus = currentUser.type === 'solicitante' 
      ? (statusMap.solicitante[activeTab] as any)
      : (statusMap.specialist[activeTab] as any);

    return simulatedCases.filter(c => c.status === targetStatus);
  }, [activeTab]);

  const renderCase = ({ item }: { item: typeof simulatedCases[0] }) => (
    <View>
      <CaseCard
        key={item.id}
        caseData={item}
        isNew={activeTab === 'in_analysis' && recentInAnalysisIdsRef.current.has(item.id)}
        onPress={() => {
          // marcar como lido quando o usuário abre o caso
          if (recentInAnalysisIdsRef.current.has(item.id)) {
            recentInAnalysisIdsRef.current.delete(item.id);
          }
          navigation.navigate('CaseDetail', { caseId: item.id });
        }}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {notif ? (
        <View style={styles.toastOverlay}>
          <View style={styles.toastBox}>
            <Text style={styles.toastText}>{notif}</Text>
          </View>
        </View>
      ) : null}

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.iconButton}>
          <Image source={require('../../assets/Icons/leave.png')} style={styles.logoutIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meus Casos</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.iconButton}>
          <Image source={require('../../assets/user_profile.png')} style={styles.profileIcon} />
        </TouchableOpacity>
      </View>
      
      {/* Welcome Message & Illustration */}
      <View style={styles.welcomeSection}>
        <View>
          <Text style={styles.welcomeTitle}>Olá, {currentUser.name}!</Text>
          <Text style={styles.welcomeSubtitle}>Pronto para revisar seus casos?</Text>
        </View>
        <Image source={require('../../assets/dashboard_illustration.png')} style={styles.illustration} />
      </View>
      
      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {TABS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabButton, activeTab === tab.key && styles.activeTabButton]}
            onPress={() => setActiveTab(tab.key)}
          >
            <View style={styles.tabLabelRow}>
              <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>
                {tab.label}
              </Text>
              {tab.key === 'in_analysis' && recentInAnalysisIdsRef.current.size > 0 ? (
                <View style={styles.tabDot} />
              ) : null}
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Conditional "New Case" Button */}
      {currentUser.type === 'solicitante' && (
        <TouchableOpacity style={styles.newCaseButton} onPress={() => navigation.navigate('NewCaseForm')}>
          <Text style={styles.newCaseButtonText}>INICIAR NOVO CASO</Text>
        </TouchableOpacity>
      )}

      {/* List of Cases */}
      <FlatList
        data={filteredCases}
        renderItem={renderCase}
        keyExtractor={(item) => item.id}
        style={styles.casesList}
        contentContainerStyle={styles.casesListContent}
        ListEmptyComponent={<EmptyListComponent />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  toastOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', zIndex: 5 },
  toastBox: { backgroundColor: '#1b5e20', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.25, shadowRadius: 6, elevation: 6 },
  toastText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  notificationBanner: { backgroundColor: '#e6f4ea', borderLeftWidth: 4, borderLeftColor: '#2e7d32', padding: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 3, elevation: 2 },
  notificationText: { color: '#1b5e20', fontWeight: '700', textAlign: 'center' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, backgroundColor: colors.white, borderBottomWidth: 1, borderBottomColor: colors.lightGray, paddingTop: Platform.OS === 'android' ? 15 : 0 },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.darkBlue },
  iconButton: { padding: 8 },
  logoutIcon: { width: 24, height: 24, tintColor: colors.darkBlue },
  profileIcon: { width: 42, height: 42, borderRadius: 21 },
  welcomeSection: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 24, backgroundColor: colors.lightBlue },
  welcomeTitle: { fontSize: 22, fontWeight: 'bold', color: colors.darkBlue },
  welcomeSubtitle: { fontSize: 16, color: colors.darkGray, marginTop: 4 },
  illustration: { width: 120, height: 100, resizeMode: 'contain' },
  tabsContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: colors.white, paddingTop: 16, paddingBottom: 4, borderBottomWidth: 1, borderBottomColor: colors.lightGray },
  tabButton: { paddingVertical: 12, paddingHorizontal: 10, alignItems: 'center', borderBottomWidth: 3, borderBottomColor: 'transparent', flex: 1 },
  activeTabButton: { borderBottomColor: colors.mediumBlue },
  tabLabelRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  tabText: { fontSize: 15, color: colors.gray, fontWeight: '500' },
  activeTabText: { color: colors.mediumBlue, fontWeight: 'bold' },
  tabDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#D32F2F', marginLeft: 6 },
  newCaseButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: colors.mediumBlue, borderRadius: 12, paddingVertical: 16, marginHorizontal: 20, marginVertical: 20, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4 },
  newCaseButtonText: { color: colors.white, fontSize: 16, fontWeight: 'bold' },
  casesList: { flex: 1 },
  casesListContent: { paddingHorizontal: 20, paddingTop: 10, paddingBottom: 40 },
  noCasesContainer: { alignItems: 'center', justifyContent: 'center', marginTop: '30%', opacity: 0.7 },
  noCasesEmoji: { fontSize: 50, marginBottom: 16 },
  noCasesText: { fontSize: 18, fontWeight: '600', color: colors.darkGray, textAlign: 'center' },
  noCasesSubText: { fontSize: 14, color: colors.gray, textAlign: 'center', marginTop: 8 },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginLeft: 20, marginBottom: 4 },
  badgeDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#D32F2F', marginRight: 6 },
  badgeText: { color: '#D32F2F', fontSize: 12, fontWeight: '700' },
});