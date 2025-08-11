// src/screens/CaseDetailScreen.tsx
import React, { useState, useEffect } from 'react';
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

// Definição da interface para uma mensagem de chat
interface ChatMessage {
  id: string;
  sender: 'solicitante' | 'especialista';
  message: string;
  timestamp: string;
  attachment?: string;
}

// Dados simulados do usuário logado (pode vir do login simulado)
const currentUser: { type: 'solicitante' | 'especialista'; name: string; specialistName: string; } = {
  type: 'solicitante', // Mude para 'especialista' para testar a visão do especialista
  name: 'Dr. João da Silva', // Nome do solicitante
  specialistName: 'Mateus Fernandes', // Nome do especialista para simular respostas
};

export default function CaseDetailScreen({ route, navigation }: Props) {
  const { caseId } = route.params;
  const [caseData, setCaseData] = useState<any>(null);
  const [currentMessage, setCurrentMessage] = useState<string>('');
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const foundCase = simulatedCases.find(c => c.id === caseId);
    if (foundCase) {
      setCaseData(foundCase);
      if (foundCase.specialistResponse) {
        setChatMessages([
          {
            id: 'chat1',
            sender: 'especialista',
            message: foundCase.specialistResponse,
            timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          },
          {
            id: 'chat2',
            sender: 'solicitante',
            message: 'Obrigado pela orientação! Teria algum material de apoio para o paciente?',
            timestamp: new Date(Date.now() + 1000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          },
          {
            id: 'chat3',
            sender: 'especialista',
            message: 'Sim, vou anexar um material educativo. Sempre à disposição.',
            timestamp: new Date(Date.now() + 2000).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
            attachment: 'MaterialEducativo_DiabetesPeriodontite.pdf',
          },
        ]);
      } else {
        setChatMessages([]);
      }
    } else {
      Alert.alert('Erro', 'Caso não encontrado.');
      navigation.goBack();
    }
  }, [caseId, navigation]);

  if (!caseData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando detalhes do caso...</Text>
      </View>
    );
  }

  const handleSendMessage = () => {
    if (currentMessage.trim() === '') return;

    const newMessage: ChatMessage = {
      id: `chat${chatMessages.length + 1}`,
      sender: currentUser.type,
      message: currentMessage.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages(prevMessages => [...prevMessages, newMessage]);
    setCurrentMessage('');

    setTimeout(() => {
      const simulatedResponse: ChatMessage = {
        id: `chat${chatMessages.length + 2}`,
        sender: currentUser.type === 'solicitante' ? 'especialista' : 'solicitante',
        message: currentUser.type === 'solicitante'
          ? 'Ok, entendi sua pergunta. Vou analisar e te respondo em breve.'
          : 'Ciente, Dr. (a).',
        timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages(prevMessages => [...prevMessages, simulatedResponse]);
    }, 1500);
  };

  const handleSpecialistFormalResponse = () => {
    Alert.alert('Resposta Enviada', 'A resposta formal foi enviada ao solicitante.');
    setCaseData((prev: any) => ({ ...prev, status: 'responded_solicitante' }));
  };

  return (
    <View style={styles.fullContainer}>
      {/* REMOVEMOS O HEADER CUSTOMIZADO AQUI.
          O HEADER DO REACT NAVIGATION (App.tsx) AGORA SERÁ USADO. */}

      <ScrollView contentContainerStyle={[styles.scrollViewContent, styles.pageContent]}>
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Detalhes do Caso</Text>
          <Text style={styles.detailText}><Text style={styles.detailLabel}>Motivo da Teleconsultoria:</Text> {caseData.motivoTeleconsultoria || 'Não informado'}</Text>
          <Text style={styles.detailText}><Text style={styles.detailLabel}>Dúvida Clínica:</Text> {caseData.duvidaClinica || 'Não informada'}</Text>
          <Text style={styles.detailLabel}>Anexos:</Text>
          <View style={styles.attachmentsContainer}>
            <Text style={styles.attachmentText}>- Radiografia Periapical (simulada).jpg</Text>
            <Text style={styles.attachmentText}>- Exame de Glicemia (simulado).pdf</Text>
            <TouchableOpacity style={styles.viewAttachmentButton}>
              <Text style={styles.viewAttachmentButtonText}>Visualizar Anexos</Text>
            </TouchableOpacity>
          </View>
        </View>

        {currentUser.type === 'solicitante' && caseData.specialistResponse && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Resposta do Especialista</Text>
            <Text style={styles.specialistResponseText}>
              <Text style={styles.detailLabel}>Especialista {currentUser.specialistName}:</Text> {caseData.specialistResponse}
            </Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Encaminhamento necessário?</Text> {caseData.encaminhamento || 'Não'}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Tempo sugerido de retorno:</Text> {caseData.tempoRetorno || 'Não especificado'}</Text>
            <Text style={styles.detailText}><Text style={styles.detailLabel}>Observações:</Text> {caseData.observacoes || 'Nenhuma'}</Text>
          </View>
        )}

        {currentUser.type === 'especialista' && (
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Sua Resposta Formal</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Digite sua resposta orientativa aqui..."
              multiline
              numberOfLines={4}
              value={caseData.specialistResponse || ''}
              onChangeText={(text) => setCaseData((prev: any) => ({ ...prev, specialistResponse: text }))}
            />
            <Text style={styles.detailLabel}>Encaminhamento necessário?</Text>
            <View style={styles.radioGroup}>
                <TouchableOpacity style={[styles.radioOption, caseData.encaminhamento === 'Sim' && styles.radioOptionSelected]}
                                  onPress={() => setCaseData((prev: any) => ({ ...prev, encaminhamento: 'Sim' }))}>
                    <Text style={[styles.radioText, caseData.encaminhamento === 'Sim' && styles.radioTextSelected]}>Sim</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.radioOption, caseData.encaminhamento === 'Não' && styles.radioOptionSelected]}
                                  onPress={() => setCaseData((prev: any) => ({ ...prev, encaminhamento: 'Não' }))}>
                    <Text style={[styles.radioText, caseData.encaminhamento === 'Não' && styles.radioTextSelected]}>Não</Text>
                </TouchableOpacity>
            </View>
            {caseData.encaminhamento === 'Sim' && (
              <TextInput style={styles.input} placeholder="Para qual especialidade?" value={caseData.especialidadeEncaminhamento || ''} onChangeText={(text) => setCaseData((prev: any) => ({ ...prev, especialidadeEncaminhamento: text }))} />
            )}
            <TextInput style={styles.input} placeholder="Tempo sugerido de retorno ou nova consulta" value={caseData.tempoRetorno || ''} onChangeText={(text) => setCaseData((prev: any) => ({ ...prev, tempoRetorno: text }))} />
            <TextInput style={styles.input} placeholder="Observações clínicas" value={caseData.observacoes || ''} onChangeText={(text) => setCaseData((prev: any) => ({ ...prev, observacoes: text }))} />

            <TouchableOpacity
              style={styles.specialistResponseButton}
              onPress={handleSpecialistFormalResponse}
              disabled={caseData.status === 'responded_solicitante'}
            >
              <Text style={styles.buttonText}>
                {caseData.status === 'responded_solicitante' ? 'Resposta Já Enviada' : 'Enviar Resposta Formal'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Histórico de Interações</Text>
          <View style={styles.chatContainer}>
            {chatMessages.map((msg, index) => (
              <View
                key={msg.id}
                style={[
                  styles.messageBubble,
                  msg.sender === currentUser.type ? styles.myMessage : styles.otherMessage,
                ]}
              >
                <Text style={styles.senderName}>
                  {msg.sender === 'solicitante' ? 'Dr. João da Silva' : currentUser.specialistName}
                </Text>
                <Text style={styles.messageText}>{msg.message}</Text>
                {msg.attachment && (
                  <TouchableOpacity style={styles.chatAttachment}>
                    <Image source={require('../../assets/Icons/file.png')} style={styles.fileIcon} />
                    <Text style={styles.chatAttachmentText}>{msg.attachment}</Text>
                  </TouchableOpacity>
                )}
                <Text style={styles.timestamp}>{msg.timestamp}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.messageInputContainer, styles.pageContent]}>
        <TextInput
          style={styles.messageInput}
          placeholder="Digite sua mensagem..."
          placeholderTextColor="#999"
          value={currentMessage}
          onChangeText={setCurrentMessage}
        />
        <TouchableOpacity style={styles.attachButton}>
          <Image source={require('../../assets/Icons/folder.png')} style={styles.attachIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Image source={require('../../assets/Icons/paper-plane.png')} style={styles.sendIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  fullContainer: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 50,
  },
  pageContent: {
    width: '100%',
    maxWidth: 1024,
    marginHorizontal: 'auto',
  },
  sectionContainer: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primaryText,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: colors.secondaryText,
    marginBottom: 8,
  },
  detailLabel: {
    fontWeight: 'bold',
    color: colors.primaryText,
  },
  attachmentsContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  attachmentText: {
    fontSize: 14,
    color: colors.darkBlue,
    textDecorationLine: 'underline',
    marginBottom: 5,
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
  specialistResponseText: {
    fontSize: 16,
    color: colors.primaryText,
    marginBottom: 10,
    lineHeight: 22,
  },
  specialistResponseButton: {
    backgroundColor: colors.success,
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    marginTop: 10,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 15,
    marginBottom: 10,
    maxWidth: '80%',
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6', // Verde claro (mantido)
    borderBottomRightRadius: 2,
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F0F0F0', // Cinza claro (mantido)
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
  chatAttachment: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.mediumBlue,
    borderRadius: 8,
    padding: 8,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  fileIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
    tintColor: colors.primaryText,
  },
  chatAttachmentText: {
    fontSize: 14,
    color: colors.darkBlue,
    textDecorationLine: 'underline',
  },
  input: {
    width: '100%',
    height: 45,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 15,
    fontSize: 16,
    color: colors.primaryText,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingVertical: 10,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 15,
    width: '100%',
    gap: 20,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  radioOptionSelected: {
    backgroundColor: colors.mediumBlue,
  },
  radioText: {
    fontSize: 15,
    color: colors.darkBlue,
    fontWeight: 'bold',
  },
  radioTextSelected: {
    color: colors.white,
  },
});
