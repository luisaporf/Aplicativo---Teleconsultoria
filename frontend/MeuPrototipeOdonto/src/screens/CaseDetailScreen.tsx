// src/screens/CaseDetailScreen.tsx
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { simulatedCases } from '../data/simulatedCases';
import { colors } from '../constants/colors';

// Tipagem para navegação
type RootStackParamList = {
  Dashboard: undefined;
  CaseDetail: { caseId: string };
};

type CaseDetailScreenRouteProp = RouteProp<RootStackParamList, 'CaseDetail'>;
type CaseDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CaseDetail'>;

type Props = {
  route: CaseDetailScreenRouteProp;
  navigation: CaseDetailScreenNavigationProp;
};

interface ChatMessage {
  id: string;
  sender: 'solicitante' | 'especialista';
  message: string;
  timestamp: string;
  attachment?: string;
}

const currentUser: { type: 'solicitante' | 'especialista'; name: string; specialistName: string } = {
  type: 'solicitante',
  name: 'Dr. João da Silva',
  specialistName: 'Equipe FORP-USP',
};

export default function CaseDetailScreen({ route, navigation }: Props) {
  const { caseId } = route.params;
  const [caseData, setCaseData] = useState<any>(null);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [showNotif, setShowNotif] = useState<boolean>(false);
  const responseTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const foundCase = simulatedCases.find(c => c.id === caseId);
    if (foundCase) {
      setCaseData({ ...foundCase });
      // Se já houver resposta, inicializa mensagens simuladas
      if (foundCase.specialistResponse) {
        setChatMessages([
          {
            id: 'chat1',
            sender: 'especialista',
            message: foundCase.specialistResponse,
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } else {
      Alert.alert('Erro', 'Caso não encontrado.');
      navigation.goBack();
    }
  }, [caseId, navigation]);

  // Simulação: Se status pendente do solicitante, após 10s mover para em análise e preencher resposta
  useEffect(() => {
    if (!caseData) return;
    if (currentUser.type === 'solicitante' && caseData.status === 'pending' && !caseData.specialistResponse) {
      responseTimerRef.current = setTimeout(() => {
        const simulatedResponse = {
          specialistResponse:
            'Resposta orientativa: Iniciar terapia periodontal básica e reavaliar em 30 dias.\nEncaminhamento necessário? Não.\nTempo sugerido de retorno ou nova consulta: 30 dias.\nObservações clínicas: Reforçar higiene oral e controle de placa.',
          encaminhamento: 'Não',
          tempoRetorno: '30 dias',
          observacoes: 'Reforçar higiene oral.',
        };
        // Atualiza local
        setCaseData((prev: any) => ({ ...prev, ...simulatedResponse, status: 'in_analysis_solicitante' }));
        setChatMessages((prev) => [
          ...prev,
          {
            id: `chat${prev.length + 1}`,
            sender: 'especialista',
            message: 'Olá! Já revisei seu caso. Veja a resposta orientativa acima. Fico à disposição para dúvidas.',
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
        setShowNotif(true);
        setTimeout(() => setShowNotif(false), 4000);
        // Atualiza também no array de simulação para refletir no Dashboard
        const idx = simulatedCases.findIndex(c => c.id === caseId);
        if (idx >= 0) {
          simulatedCases[idx] = { ...simulatedCases[idx], ...simulatedResponse, status: 'in_analysis_solicitante' as any } as any;
        }
      }, 10000);
    }
    return () => {
      if (responseTimerRef.current) clearTimeout(responseTimerRef.current);
    };
  }, [caseData?.status, caseData?.specialistResponse]);

  if (!caseData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando detalhes do caso...</Text>
      </View>
    );
  }

  const handleSendMessage = () => {
    if (currentMessage.trim() === '' || caseData.status === 'responded_solicitante') return;
    const newMessage: ChatMessage = {
      id: `chat${chatMessages.length + 1}`,
      sender: currentUser.type,
      message: currentMessage.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };
    setChatMessages(prevMessages => [...prevMessages, newMessage]);
    setCurrentMessage('');
  };

  const handleFinalize = () => {
    Alert.alert('Finalizar atendimento', 'Deseja finalizar o atendimento deste caso?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Finalizar',
        style: 'destructive',
        onPress: () => {
          setCaseData((prev: any) => ({ ...prev, status: 'responded_solicitante' }));
          const idx = simulatedCases.findIndex(c => c.id === caseId);
          if (idx >= 0) simulatedCases[idx].status = 'responded_solicitante' as any;
        },
      },
    ]);
  };

  const isPendingSolicitante = currentUser.type === 'solicitante' && caseData.status === 'pending';
  const isInAnalysisSolicitante = currentUser.type === 'solicitante' && caseData.status === 'in_analysis_solicitante';
  const isFinalizedSolicitante = currentUser.type === 'solicitante' && caseData.status === 'responded_solicitante';

  return (
    <View style={styles.fullContainer}>
      {showNotif && (
        <View style={styles.notificationBanner}>
          <Text style={styles.notificationText}>Uma resposta do especialista foi recebida e o caso está em andamento.</Text>
        </View>
      )}

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Detalhes do Caso</Text>
          <Text style={styles.detailText}><Text style={styles.detailLabel}>Motivo da Teleconsultoria:</Text> {caseData.motivoTeleconsultoria || 'Não informado'}</Text>
          <Text style={styles.detailText}><Text style={styles.detailLabel}>Dúvida Clínica:</Text> {caseData.duvidaClinica || 'Não informada'}</Text>
          <TouchableOpacity style={styles.viewAttachmentButton} onPress={() => Alert.alert('PDF', 'Abrir PDF com o formulário enviado (simulado)')}>
            <Text style={styles.viewAttachmentButtonText}>Visualizar Formulário (PDF)</Text>
          </TouchableOpacity>
        </View>

        {isPendingSolicitante ? null : (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Resposta do Especialista</Text>
            <Text style={styles.specialistResponseText}>
              {caseData.specialistResponse || 'Aguardando resposta do especialista...'}
            </Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Encaminhamento necessário?</Text> {caseData.encaminhamento || '—'}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Tempo sugerido de retorno:</Text> {caseData.tempoRetorno || '—'}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Observações clínicas:</Text> {caseData.observacoes || '—'}</Text>
          </View>
        )}

        {(isInAnalysisSolicitante || isFinalizedSolicitante) && (
          <TouchableOpacity style={[styles.finalizeButton, isFinalizedSolicitante && { opacity: 0.6 }]} onPress={handleFinalize} disabled={isFinalizedSolicitante}>
            <Text style={styles.finalizeButtonText}>{isFinalizedSolicitante ? 'Atendimento finalizado' : 'Encerrar atendimento\n(quando não houver mais dúvidas)'}</Text>
          </TouchableOpacity>
        )}

        {/* Histórico e Chat não aparecem quando pendente */}
        {!isPendingSolicitante && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Histórico de Interações</Text>
            <View style={styles.chatContainer}>
              {chatMessages.map((msg) => (
                <View
                  key={msg.id}
                  style={[styles.messageBubble, msg.sender === currentUser.type ? styles.myMessage : styles.otherMessage]}
                >
                  <Text style={styles.senderName}>
                    {msg.sender === 'solicitante' ? 'Você' : currentUser.specialistName}
                  </Text>
                  <Text style={styles.messageText}>{msg.message}</Text>
                  <Text style={styles.timestamp}>{msg.timestamp}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Barra de digitação fixa */}
      {!isPendingSolicitante && (
        <View style={[styles.messageInputContainer, isFinalizedSolicitante && { opacity: 0.6 }] }>
          <TextInput
            style={styles.messageInput}
            placeholder={isFinalizedSolicitante ? 'Chat encerrado' : 'Digite sua mensagem...'}
            placeholderTextColor="#999"
            value={currentMessage}
            onChangeText={setCurrentMessage}
            editable={!isFinalizedSolicitante}
          />
          <TouchableOpacity style={styles.attachButton} disabled>
            <Image source={require('../../assets/Icons/folder.png')} style={styles.attachIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage} disabled={isFinalizedSolicitante}>
            <Image source={require('../../assets/Icons/paper-plane.png')} style={styles.sendIcon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBanner: {
    backgroundColor: '#e6f4ea',
    borderLeftWidth: 4,
    borderLeftColor: '#2e7d32',
    padding: 12,
  },
  notificationText: {
    color: '#1b5e20',
    fontWeight: '600',
    textAlign: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 90,
  },
  sectionContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryText,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 6,
  },
  detailText: {
    fontSize: 15,
    color: colors.secondaryText,
    marginBottom: 6,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: colors.primaryText,
  },
  specialistResponseText: {
    fontSize: 15,
    color: colors.primaryText,
    marginBottom: 10,
    lineHeight: 22,
  },
  viewAttachmentButton: {
    backgroundColor: colors.lightGray,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  viewAttachmentButtonText: {
    fontSize: 14,
    color: colors.primaryText,
    fontWeight: 'bold',
  },
  chatContainer: {
    marginTop: 10,
    maxHeight: 280,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderBottomRightRadius: 2,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0F0',
    borderBottomLeftRadius: 2,
  },
  senderName: {
    fontWeight: 'bold',
    marginBottom: 3,
    fontSize: 13,
    color: colors.primaryText,
  },
  messageText: {
    fontSize: 16,
    color: colors.primaryText,
    lineHeight: 20,
  },
  timestamp: {
    fontSize: 10,
    color: colors.gray,
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  messageInput: {
    flex: 1,
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    fontSize: 16,
    maxHeight: 100,
    color: colors.primaryText,
  },
  attachButton: {
    padding: 10,
  },
  attachIcon: {
    width: 24,
    height: 24,
    tintColor: colors.darkBlue,
  },
  sendButton: {
    padding: 10,
    marginLeft: 5,
  },
  sendIcon: {
    width: 24,
    height: 24,
    tintColor: colors.darkBlue,
  },
  finalizeButton: {
    backgroundColor: colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightGray,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 12,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 2,
  },
  finalizeButtonText: {
    color: colors.darkBlue,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'center',
  },
});
