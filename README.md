# Aplicativo de Teleconsultoria em Medicina Periodontal (FORP-USP)

## 1. Visão Geral do Projeto

Este documento resume a concepção e os requisitos essenciais para o desenvolvimento de um aplicativo de teleconsultoria em Medicina Periodontal. O objetivo principal é facilitar a comunicação clínica assíncrona entre **profissionais da atenção primária** (dentistas/médicos de unidades básicas de saúde) e **especialistas da FORP-USP**, visando qualificar o cuidado em saúde bucal, promover a integração ensino-serviço e aprimorar os desfechos clínicos, especialmente em condições crônicas como a periodontite.

## 2. Requisitos Chave

### 2.1. Requisitos Funcionais

* **Autenticação e Gestão de Perfil:**
    * Criação de contas e login seguro para profissionais solicitantes e especialistas.
    * Perfis com dados cadastrais relevantes para ambos os tipos de usuário.
* **Gestão de Casos Clínicos (Solicitante):**
    * **Formulário Detalhado:** Interface para preenchimento de todas as informações do "Protocolo Institucional de Teleconsultoria – Medicina Periodontal", incluindo identificação do paciente (pseudonimizada), histórico médico/odontológico, avaliação periodontal atual, PSR, condutas realizadas e motivo da consulta.
    * **Upload de Mídias:** Funcionalidade para anexar imagens intraorais (fotos), radiografias e exames laboratoriais (PDFs, fotos legíveis) com otimização de tamanho e qualidade.
    * **Acompanhamento de Status:** Visibilidade clara do progresso do caso (pendente, em análise, respondido).
    * **Notificações:** Alertas push para atualizações de status e novas respostas.
* **Gestão de Casos Clínicos (Especialista):**
    * **Visualização de Casos:** Acesso completo a todos os dados e anexos enviados pelo solicitante.
    * **Interface de Resposta:** Campos para "Resposta orientativa", indicação de encaminhamento, tempo sugerido para retorno e "Observações clínicas".
* **Comunicação Bidirecional Assíncrona (Chat por Caso):**
    * **Campo de Interação:** Um espaço dentro de cada caso clínico para que solicitantes e especialistas possam trocar mensagens, solicitar informações adicionais ou fazer perguntas de follow-up.
    * **Histórico de Comunicação:** Todas as mensagens ficam registradas e datadas dentro do contexto do caso, garantindo rastreabilidade e contexto completo.
    * **Notificações Bidirecionais:** Alertas push para ambos os lados sempre que uma nova mensagem for adicionada ao chat do caso.

### 2.2. Requisitos Não Funcionais

* **Segurança e Privacidade (LGPD):** Conformidade rigorosa com a Lei Geral de Proteção de Dados (LGPD) e demais regulamentações de saúde digital. Criptografia de dados (em trânsito e em repouso), controle de acesso baseado em papel e auditoria de logs.
* **Usabilidade (UX):** Interface intuitiva e amigável para profissionais de saúde, minimizando a curva de aprendizado. Design responsivo para smartphones e tablets.
* **Desempenho e Escalabilidade:** Tempos de resposta rápidos e capacidade de suportar um número crescente de usuários e casos.
* **Confiabilidade:** Alta disponibilidade do serviço e tratamento robusto de erros.

## 3. Tecnologias Sugeridas

* **Frontend Mobile:** **React Native** ou **Flutter** (para desenvolvimento multiplataforma iOS/Android).
* **Backend (API):** **Node.js (Express.js)** ou **Python (Django/Flask)**.
* **Banco de Dados:** **PostgreSQL** ou **MySQL** (relacionais, robustos).
* **Armazenamento de Mídias:** Serviços de nuvem como **AWS S3**, **Google Cloud Storage** ou **Azure Blob Storage**.
* **Hospedagem:** Plataformas de nuvem como **AWS**, **Google Cloud Platform** ou **Microsoft Azure**.
* **Controle de Versão:** **Git (GitHub/GitLab)**.

## 4. Dificuldades Técnicas Potenciais

* **Conformidade Regulatória:** Aderência estrita às normas da LGPD, Ministério da Saúde e CFO.
* **Segurança de Dados:** Proteção de informações de saúde sensíveis.
* **Otimização de Mídias:** Balancear qualidade visual com otimização de upload/armazenamento.
* **UX para Profissionais de Saúde:** Projetar uma interface que seja realmente útil e fácil de adotar.
* **Integração Assíncrona:** Implementar um sistema de notificação e chat robusto dentro do contexto do caso.

## 5. Tempo e Recursos (Estimativa)

* **Tempo:** 7 a 10.5 meses de esforço de desenvolvimento dedicado (para uma equipe pequena ou desenvolvedor experiente). Pode ser otimizado para um MVP focado nos requisitos essenciais para o mestrado.
* **Recursos:** Equipe multidisciplinar (Product Owner, UI/UX Designer, Desenvolvedor Frontend, Desenvolvedor Backend, Especialista em Segurança), hardware, software, serviços de nuvem e orçamento para licenças/taxas.

## 6. Avaliação do Aplicativo (Essencial para o Mestrado)

A fase de piloto e avaliação é crucial para validar o projeto. Incluirá:

* **Coleta de Dados Quantitativos:** Número de casos enviados, tempo médio de resposta, categorias clínicas mais frequentes, adesão de usuários.
* **Coleta de Dados Qualitativos:** Entrevistas/questionários sobre usabilidade, relevância clínica, impacto no fluxo de trabalho e potencial de incorporação.

Esta análise será fundamental para comprovar a viabilidade, aceitação e efetividade do aplicativo, cumprindo os objetivos do projeto de mestrado.