// src/data/simulatedCases.ts

interface Case {
    id: string;
    type: 'Indicação cirúrgica' | 'Orientação Diagnóstica' | 'Conduta frente a complicação pós-operatória' | 'Sugestão terapêutica';
    patientInitials: string;
    date: string;
    time: string;
    status: 'pending' | 'in_analysis_solicitante' | 'responded_solicitante' | 'new_specialist' | 'in_analysis_specialist' | 'responded_specialist';
    
    // --- NOVOS CAMPOS ADICIONADOS ---
    motivoTeleconsultoria?: string;
    duvidaClinica?: string;
    historicoOdontologico?: string;
    avaliacaoPeriodontal?: string;
    examesComplementares?: string[]; // Ex: ['Radiografia Periapical', 'Exame de Glicemia']
    // ... adicione outros campos do protocolo conforme a necessidade de exibição
    
    specialistResponse?: string; // Resposta formal do especialista
    encaminhamento?: 'Sim' | 'Não';
    especialidadeEncaminhamento?: string;
    tempoRetorno?: string;
    observacoes?: string;
  }
  
  export const simulatedCases: Case[] = [
    // Casos para o Solicitante
    {
      id: 's001',
      type: 'Indicação cirúrgica',
      patientInitials: 'GL',
      date: '17/06/2025',
      time: '10:25',
      status: 'in_analysis_solicitante', // Em análise pelo especialista
      motivoTeleconsultoria: 'Discussão de conduta cirúrgica',
      duvidaClinica: 'Paciente com periodontite avançada e necessidade de enxerto ósseo. Qual a melhor abordagem? Apresenta doença periodontal generalizada, bolsa de 7mm no 26.',
      historicoOdontologico: 'Tratamento periodontal anterior há 2 anos, mas sem controle adequado. Queixa de sangramento e mobilidade no 26.',
      avaliacaoPeriodontal: 'Sangramento à sondagem em 40% dos sítios, bolsa de 7mm no 26 distal. Mobilidade Grau II no 26.',
      examesComplementares: ['Radiografia Periapical (26)', 'Panorâmica'],
      // specialistResponse será nulo, pois ainda está em análise
    },
    {
      id: 's002',
      type: 'Orientação Diagnóstica',
      patientInitials: 'LG',
      date: '17/06/2025',
      time: '10:25',
      status: 'responded_solicitante', // Respondido pelo especialista
      motivoTeleconsultoria: 'Apoio diagnóstico',
      duvidaClinica: 'Paciente com lesão em gengiva, suspeita de GUNA. Preciso de confirmação. Há dor intensa e necrose papilar.',
      historicoOdontologico: 'Paciente nunca teve problemas periodontais antes. Queixa apareceu de repente.',
      avaliacaoPeriodontal: 'Gengiva avermelhada, sangramento espontâneo, papilas necróticas. PSR código 4 em sextante inferior anterior.',
      examesComplementares: [],
      specialistResponse: 'Olá! Analisei o caso da Sra. L. G. A descrição e imagens sugerem GUNA. Sugiro iniciar terapia periodontal de suporte e acompanhamento rigoroso. Se não houver melhora, considerar biópsia.',
      encaminhamento: 'Não',
      tempoRetorno: '30 dias',
      observacoes: 'Importante avaliar hábitos de higiene e estresse.'
    },
    {
      id: 's003',
      type: 'Conduta frente a complicação pós-operatória',
      patientInitials: 'SRA',
      date: '17/06/2025',
      time: '10:25',
      status: 'responded_solicitante', // Respondido
      motivoTeleconsultoria: 'Conduta frente a complicação pós-operatória',
      duvidaClinica: 'Edema e dor persistentes após exodontia de terceiro molar inferior há 5 dias. Febre leve.',
      historicoOdontologico: 'Exodontia de 38, sem intercorrências durante o procedimento. Paciente relata dor crescente.',
      avaliacaoPeriodontal: 'Edema acentuado, trismo, supuração leve. PSR sem alteração.',
      examesComplementares: ['Radiografia Pós-operatória'],
      specialistResponse: 'Sugiro reavaliação presencial, descartar alveolite. Prescrever anti-inflamatório e analgésico. Se houver febre persistente, considerar antibiótico.',
      encaminhamento: 'Sim',
      especialidadeEncaminhamento: 'Cirurgia Oral',
      tempoRetorno: '2 dias',
      observacoes: 'Necessário desbridamento e irrigação local se for alveolite.'
    },
    {
      id: 's006',
      type: 'Orientação Diagnóstica',
      patientInitials: 'JP',
      date: '18/07/2025',
      time: '09:00',
      status: 'pending', // Novo caso (para a aba de Pendentes do solicitante)
      motivoTeleconsultoria: 'Apoio diagnóstico',
      duvidaClinica: 'Suspeita de periodontite agressiva em paciente jovem de 22 anos, sem fatores de risco sistêmicos conhecidos. Destruição óssea rápida generalizada.',
      historicoOdontologico: 'Sem histórico de tratamento periodontal prévio. Começou a notar mobilidade nos dentes da frente recentemente.',
      avaliacaoPeriodontal: 'Perda de inserção generalizada, PSR 4 em todos os sextantes. Sem sangramento à sondagem.',
      examesComplementares: ['Panorâmica'],
    },
  
    // Casos para o Especialista (com status diferentes para ele)
    {
      id: 'e001', // ID diferente para não conflitar com os do solicitante
      type: 'Orientação Diagnóstica',
      patientInitials: 'LG',
      date: '17/06/2025',
      time: '10:25',
      status: 'responded_specialist', // Já respondido pelo especialista (aparece na aba de Respondidos dele)
      motivoTeleconsultoria: 'Apoio diagnóstico',
      duvidaClinica: 'Paciente com lesão em gengiva, suspeita de GUNA. Preciso de confirmação.',
      historicoOdontologico: 'Paciente nunca teve problemas periodontais antes. Queixa apareceu de repente.',
      avaliacaoPeriodontal: 'Gengiva avermelhada, sangramento espontâneo, papilas necróticas. PSR código 4 em sextante inferior anterior.',
      examesComplementares: [],
      specialistResponse: 'Olá! Analisei o caso da Sra. L. G. A descrição e imagens sugerem GUNA. Sugiro iniciar terapia periodontal de suporte e acompanhamento rigoroso. Se não houver melhora, considerar biópsia.',
      encaminhamento: 'Não',
      tempoRetorno: '30 dias',
      observacoes: 'Importante avaliar hábitos de higiene e estresse.'
    },
    {
      id: 'e002',
      type: 'Indicação cirúrgica',
      patientInitials: 'RS',
      date: '18/07/2025',
      time: '11:00',
      status: 'new_specialist', // Novo caso para o especialista
      motivoTeleconsultoria: 'Discussão de conduta cirúrgica',
      duvidaClinica: 'Qual a técnica de enxerto mais indicada para caso de perda óssea severa no dente 46? Paciente relata mobilidade.',
      historicoOdontologico: 'Paciente passou por tratamento periodontal não cirúrgico há 1 ano. Remissão de bolsa, mas com perda óssea persistente.',
      avaliacaoPeriodontal: 'Bolsa de 6mm na distal do 46, perda óssea horizontal significativa. PSR 3.',
      examesComplementares: ['Tomografia (46)'],
    },
    {
      id: 'e003',
      type: 'Sugestão terapêutica',
      patientInitials: 'MC',
      date: '18/07/2025',
      time: '14:30',
      status: 'in_analysis_specialist', // Especialista está interagindo
      motivoTeleconsultoria: 'Apoio terapêutico',
      duvidaClinica: 'Paciente gestante (5 meses) com gengivite grave, qual tratamento periodontal posso fazer sem risco ao bebê?',
      historicoOdontologico: 'Gengivite pré-existente piorou durante a gravidez. Paciente está preocupada.',
      avaliacaoPeriodontal: 'Gengiva edemaciada, muito sangramento espontâneo. PSR 2.',
      examesComplementares: [],
      specialistResponse: 'Para gestantes, o foco é na raspagem e alisamento radicular não cirúrgico, com ênfase na higiene oral. Evitar medicamentos sistêmicos. Pode ser realizado no segundo trimestre. Se houver dúvidas, me avise.',
      encaminhamento: 'Não',
      tempoRetorno: '15 dias',
      observacoes: 'Foco na remoção de fatores irritantes locais.'
    },
  ];