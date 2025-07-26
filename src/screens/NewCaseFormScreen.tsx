// src/screens/NewCaseFormScreen.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { colors } from '../constants/colors';

// Importe a tipagem RootStackParamList do App.tsx
import { RootStackParamList } from '../../App'; // Ajuste o caminho se necessário

// Importe as etapas do formulário
import Step1PatientInfo from '../components/NewCaseForm/Step1PatientInfo';
import Step2ClinicalChar from '../components/NewCaseForm/Step2ClinicalChar';
import Step3PeriodontalEval from '../components/NewCaseForm/Step3PeriodontalEval';
import Step4ComplementaryExams from '../components/NewCaseForm/Step4ComplementaryExams';
import Step5PSR from '../components/NewCaseForm/Step5PSR';
import Step6ConductedActions from '../components/NewCaseForm/Step6ConductedActions';
import Step7ConsultationObjective from '../components/NewCaseForm/Step7ConsultationObjective';

// Tipagem para navegação
type NewCaseFormScreenNavigationProp = StackNavigationProp<RootStackParamList, 'NewCaseForm'>;

type Props = {
  navigation: NewCaseFormScreenNavigationProp;
};

// Interface para os dados do formulário
export interface FormData {
  patientInitials: string; patientAge: string; patientGender: string; patientSusCard: string;
  medicalHistory: string[]; otherMedicalHistory: string; smokingStatus: string; chronicMedications: string;
  mainComplaint: string; evolutionTime: string; prevPeriodontalTreatment: string; oralHygieneAdherence: string;
  gingivalBleeding: string; maxProbingDepth: string; toothMobility: string; suppuration: string;
  gingivalRecession: string; missingTeeth: string; plaqueIndex: string; affectedRegions: string; lastScaling: string;
  radiographyPeriapical: boolean; radiographyPanoramic: boolean; radiographyOther: boolean; radiographyOtherDetails: string;
  glucoseLevel: string; glucoseDate: string; hba1c: string; bloodPressure: string; bloodPressureDate: string;
  cholesterol: string; crp: string; otherExams: string;
  psrCodes: { [key: string]: string };
  psrAssociatedFindings: boolean;
  interventionsDone: string[]; lastInterventionDate: string;
  consultationObjective: string[]; otherConsultationObjective: string;
  attachedImages: string[]; attachedRadiographs: string[]; attachedLabExams: string[];
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

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    if (currentStep < 7) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    } else {
      navigation.goBack();
    }
  };

  const handleSubmit = () => {
    const newCase = {
      id: `s${Math.random().toString(36).substring(7)}`,
      type: formData.consultationObjective[0] || 'Novo Caso',
      patientInitials: formData.patientInitials || 'NP',
      date: new Date().toLocaleDateString('pt-BR'),
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      status: 'pending',
      motivoTeleconsultoria: formData.consultationObjective.join(', '),
      duvidaClinica: formData.mainComplaint,
    };

    Alert.alert(
      'Caso Enviado!',
      'Sua teleconsultoria foi enviada com sucesso para os especialistas da FORP-USP. Você pode acompanhar o status em "Meus Casos".',
      [{
        text: 'OK',
        onPress: () => navigation.navigate('Dashboard', { newCase: newCase, activeTab: 'pending' })
      }]
    );
  };

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
        return <Step5PSR formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <Step6ConductedActions formData={formData} updateFormData={updateFormData} />;
      case 7:
        return <Step7ConsultationObjective formData={formData} updateFormData={updateFormData} />;
      default:
        return <Text>Etapa não encontrada</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {/* Container para o Título da Etapa e Indicadores de Bolinhas */}
      <View style={styles.topContentWrapper}>
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
    backgroundColor: colors.lightBlue, // Usando cor da paleta
    paddingTop: 0,
  },
  topContentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: colors.lightBlue, // Usando cor da paleta
    borderBottomWidth: 1,
    borderBottomColor: colors.border, // Usando cor da paleta
    alignItems: 'center',
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondaryText, // Usando cor da paleta
    marginBottom: 10,
    textAlign: 'center',
  },
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  stepIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.lightGray, // Usando cor da paleta
    marginHorizontal: 3,
  },
  currentStepIndicator: {
    backgroundColor: colors.mediumBlue, // Usando cor da paleta (indicador de foco)
  },
  formContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border, // Usando cor da paleta
    backgroundColor: colors.lightBlue, // Usando cor da paleta
  },
  prevButton: {
    backgroundColor: colors.warning, // Usando cor da paleta
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: colors.shadow, // Usando cor da paleta
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8, // Ajuste para mais suavidade
    shadowRadius: 3,
    elevation: 5,
  },
  nextButton: {
    backgroundColor: colors.darkBlue, // Usando cor da paleta (botão principal)
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
    shadowColor: colors.shadow, // Usando cor da paleta
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8, // Ajuste para mais suavidade
    shadowRadius: 3,
    elevation: 5,
  },
  submitButton: {
    backgroundColor: colors.success, // Usando cor da paleta
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
    shadowColor: colors.shadow, // Usando cor da paleta
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8, // Ajuste para mais suavidade
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: colors.buttonText, // Usando cor da paleta
    fontSize: 16,
    fontWeight: 'bold',
  },
});