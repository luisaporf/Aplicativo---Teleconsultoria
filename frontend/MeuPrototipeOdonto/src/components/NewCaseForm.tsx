// src/screens/NewCaseFormScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

// Importe as etapas do formulário (que criaremos a seguir)
import Step1PatientInfo from '../components/NewCaseForm/Step1PatientInfo';
import Step2ClinicalChar from '../components/NewCaseForm/Step2ClinicalChar';
import Step3PeriodontalEval from '../components/NewCaseForm/Step3PeriodontalEval';
import Step4ComplementaryExams from '../components/NewCaseForm/Step4ComplementaryExams';
import Step5PSR from '../components/NewCaseForm/Step5PSR'; // Nova etapa
import Step6ConductedActions from '../components/NewCaseForm/Step6ConductedActions'; // Nova etapa
import Step7ConsultationObjective from '../components/NewCaseForm/Step7ConsultationObjective';

// Tipagem para navegação
type RootStackParamList = {
  Dashboard: undefined;
  NewCaseForm: undefined;
};

type NewCaseFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NewCaseForm'>;

type Props = {
  navigation: NewCaseFormScreenNavigationProp;
};

// Interface para os dados do formulário
export interface FormData {
  patientInitials: string;
  patientAge: string;
  patientGender: string;
  patientSusCard: string;
  medicalHistory: string[];
  otherMedicalHistory: string;
  smokingStatus: string;
  chronicMedications: string;
  mainComplaint: string;
  evolutionTime: string;
  prevPeriodontalTreatment: string;
  oralHygieneAdherence: string;
  gingivalBleeding: string;
  maxProbingDepth: string;
  toothMobility: string;
  suppuration: string;
  gingivalRecession: string;
  missingTeeth: string;
  plaqueIndex: string;
  affectedRegions: string;
  lastScaling: string;
  radiographyPeriapical: boolean;
  radiographyPanoramic: boolean;
  radiographyOther: boolean;
  radiographyOtherDetails: string;
  glucoseLevel: string;
  glucoseDate: string;
  hba1c: string;
  bloodPressure: string;
  bloodPressureDate: string;
  cholesterol: string;
  crp: string;
  otherExams: string;
  psrCodes: { [key: string]: string }; // Códigos PSR por sextante
  psrAssociatedFindings: boolean; // Furca, recessão > 3.5mm, mobilidade
  interventionsDone: string[];
  lastInterventionDate: string;
  consultationObjective: string[];
  otherConsultationObjective: string;
  // Simulação de anexos (apenas nome do arquivo para o protótipo)
  attachedImages: string[];
  attachedRadiographs: string[];
  attachedLabExams: string[];
}

export default function NewCaseFormScreen({ navigation }: Props) {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormData>({
    patientInitials: '', patientAge: '', patientGender: '', patientSusCard: '',
    medicalHistory: [], otherMedicalHistory: '', smokingStatus: '', chronicMedications: '',
    mainComplaint: '', evolutionTime: '', prevPeriodontalTreatment: '', oralHygieneAdherence: '',
    gingivalBleeding: '', maxProbingDepth: '', toothMobility: '', suppuration: '',
    gingivalRecession: '', missingTeeth: '', plaqueIndex: '', affectedRegions: '', lastScaling: '',
    radiographyPeriapical: false, radiographyPanoramic: false, radiographyOther: false, radiographyOtherDetails: '',
    glucoseLevel: '', glucoseDate: '', hba1c: '', bloodPressure: '', bloodPressureDate: '',
    cholesterol: '', crp: '', otherExams: '',
    psrCodes: { '1': '', '2': '', '3': '', '4': '', '5': '', '6': '' },
    psrAssociatedFindings: false,
    interventionsDone: [], lastInterventionDate: '',
    consultationObjective: [], otherConsultationObjective: '',
    attachedImages: [], attachedRadiographs: [], attachedLabExams: [],
  });

  // Função para atualizar os dados do formulário em cada etapa
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  // Função para avançar para a próxima etapa
  const handleNext = () => {
    // Adicione validações por etapa aqui se desejar
    // Ex: if (currentStep === 1 && !formData.patientInitials) { Alert.alert('Erro', 'Preencha as iniciais.'); return; }
    if (currentStep < 7) { // Max 7 etapas
      setCurrentStep(prev => prev + 1);
    }
  };

  // Função para voltar à etapa anterior
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Função para finalizar e enviar o caso (na última etapa)
  const handleSubmit = () => {
    // --- SIMULAÇÃO DE ENVIO DO CASO ---
    // Em um app real, aqui os dados seriam enviados para o backend
    Alert.alert(
      'Caso Enviado!',
      'Sua teleconsultoria foi enviada com sucesso para os especialistas da FORP-USP. Você pode acompanhar o status em "Meus Casos".',
      [{ text: 'OK', onPress: () => navigation.navigate('Dashboard') }]
    );
    // Poderia resetar o formulário aqui: setFormData(initialFormData); setCurrentStep(1);
  };

  // Mapeia a etapa atual para o componente da tela correspondente
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1PatientInfo formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <Step2ClinicalChar formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <Step3PeriodontalEval formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <Step4ComplementaryExams formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <Step5PSR formData={formData} updateFormData={updateFormData} />; // Nova etapa
      case 6:
        return <Step6ConductedActions formData={formData} updateFormData={updateFormData} />; // Nova etapa
      case 7:
        return <Step7ConsultationObjective formData={formData} updateFormData={updateFormData} />;
      default:
        return <Text>Etapa não encontrada</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Abrir Novo Caso</Text>
        <View style={styles.stepIndicatorContainer}>
          {Array.from({ length: 7 }).map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepIndicator,
                index + 1 === currentStep ? styles.currentStepIndicator : null,
              ]}
            />
          ))}
        </View>
      </View>

      {/* Conteúdo da Etapa Atual */}
      <View style={styles.formContent}>
        <Text style={styles.stepTitle}>
          Etapa {currentStep}:{' '}
          {currentStep === 1 && 'Identificação do Paciente e Motivo da Consulta'}
          {currentStep === 2 && 'Caracterização Clínica do Caso'}
          {currentStep === 3 && 'Avaliação Periodontal Atual'}
          {currentStep === 4 && 'Exames Complementares'}
          {currentStep === 5 && 'Resultado do Exame PSR'}
          {currentStep === 6 && 'Condutas já Realizadas'}
          {currentStep === 7 && 'Objetivo da Teleconsultoria'}
        </Text>
        {renderStep()}
      </View>

      {/* Botões de Navegação Inferiores */}
      <View style={styles.navigationButtons}>
        {currentStep > 1 && (
          <TouchableOpacity style={styles.prevButton} onPress={handleBack}>
            <Text style={styles.buttonText}>{'<'}</Text>
          </TouchableOpacity>
        )}
        {currentStep < 7 ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.buttonText}>Continuar</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Finalizar e Enviar</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEF0F4',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingBottom: 15,
    backgroundColor: '#DEF0F4',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  backButton: {
    padding: 10,
    marginRight: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    flex: 1, // Permite que o título ocupe o espaço restante
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  stepIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#CCC',
    marginHorizontal: 3,
  },
  currentStepIndicator: {
    backgroundColor: '#007BFF', // Cor da bolinha da etapa atual
  },
  formContent: {
    flex: 1, // Ocupa o espaço disponível entre o cabeçalho e os botões
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Para espalhar os botões
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
    backgroundColor: '#DEF0F4',
  },
  prevButton: {
    backgroundColor: '#FFC107', // Amarelo para voltar
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  nextButton: {
    backgroundColor: '#007BFF', // Azul para continuar
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1, // Ocupa o espaço restante
    marginLeft: 10, // Espaço entre voltar e continuar
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  submitButton: {
    backgroundColor: '#4CAF50', // Verde para finalizar
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});