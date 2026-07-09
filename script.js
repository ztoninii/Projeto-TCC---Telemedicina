// script.js

// Aguarda o carregamento completo do HTML antes de manipular elementos da página
document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  const openTabButtons = document.querySelectorAll("[data-open-tab]");
  const menuToggle = document.getElementById("menuToggle");
  const mainNavigation = document.getElementById("mainNavigation");

  const languageSelect = document.getElementById("languageSelect");
  const increaseFontButton = document.getElementById("increaseFont");
  const decreaseFontButton = document.getElementById("decreaseFont");
  const toggleThemeButton = document.getElementById("toggleTheme");
  const themeIcon = document.getElementById("themeIcon");
  const toggleContrastButton = document.getElementById("toggleContrast");

  const serviceTypeRadios = document.querySelectorAll("input[name='serviceType']");
  const publicFields = document.getElementById("publicFields");
  const privateFields = document.getElementById("privateFields");

  const susCard = document.getElementById("susCard");
  const ubs = document.getElementById("ubs");
  const healthPlan = document.getElementById("healthPlan");
  const cardNumber = document.getElementById("cardNumber");

  const appointmentForm = document.getElementById("appointmentForm");
  const formMessage = document.getElementById("formMessage");

  const STORAGE_KEYS = {
    language: "telemedicina-language",
    theme: "telemedicina-theme",
    contrast: "telemedicina-high-contrast"
  };

  // Dicionário central de traduções. Para novos idiomas, adicione outro objeto em translations.
  const translations = {
    pt: {
      lang: "pt-BR",
      title: "Portal Unificado de Telemedicina de Jundiaí",
      aria: {
        accessibilityBar: "Barra de acessibilidade",
        language: "Selecionar idioma",
        menuOpen: "Abrir menu de navegação",
        menuClose: "Fechar menu de navegação",
        themeDark: "Ativar modo escuro",
        themeLight: "Ativar modo claro",
        contrastOn: "Ativar alto contraste",
        contrastOff: "Desativar alto contraste",
        fontIncrease: "Aumentar tamanho da fonte",
        fontDecrease: "Diminuir tamanho da fonte",
        whatsapp: "Falar no WhatsApp em uma nova aba",
        navigation: "Navegação principal",
        brandLogo: "Prefeitura de Jundiaí"
      },
      formMessage: "Solicitação enviada com sucesso. A equipe responsável analisará os dados e retornará com as orientações da teleconsulta.",
      text: {}
    },
    en: {
      lang: "en",
      title: "Unified Telemedicine Portal of Jundiaí",
      aria: {
        accessibilityBar: "Accessibility bar",
        language: "Select language",
        menuOpen: "Open navigation menu",
        menuClose: "Close navigation menu",
        themeDark: "Enable dark mode",
        themeLight: "Enable light mode",
        contrastOn: "Enable high contrast",
        contrastOff: "Disable high contrast",
        fontIncrease: "Increase font size",
        fontDecrease: "Decrease font size",
        whatsapp: "Talk on WhatsApp in a new tab",
        navigation: "Main navigation",
        brandLogo: "City Hall of Jundiaí"
      },
      formMessage: "Request sent successfully. The responsible team will review the information and return with teleconsultation instructions.",
      text: {
        "Idioma": "Language",
        "Portal Unificado de Telemedicina de Jundiaí": "Unified Telemedicine Portal of Jundiaí",
        "Rede Pública, Convênios e Atendimento Particular em uma única plataforma": "Public network, health plans, and private care in a single platform",
        "Início": "Home",
        "Como funciona": "How it works",
        "Marcar consulta": "Book appointment",
        "FAQ": "FAQ",
        "Sobre": "About",
        "Saúde digital integrada": "Integrated digital health",
        "Atendimento médico online para cidadãos de Jundiaí": "Online medical care for Jundiaí residents",
        "O Portal Unificado de Telemedicina de Jundiaí conecta pacientes à Rede Pública de Saúde, convênios médicos e atendimentos particulares, oferecendo mais praticidade, organização e acesso ao cuidado.": "The Unified Telemedicine Portal of Jundiaí connects patients to the public health network, health plans, and private medical care, offering more convenience, organization, and access to care.",
        "Rede Pública SUS": "Public SUS Network",
        "Atendimento vinculado à UBS de referência, com identificação pelo Cartão SUS e encaminhamento conforme os fluxos da saúde municipal.": "Care linked to the reference primary care unit, with identification through the SUS card and referral according to municipal health flows.",
        "Rede Privada": "Private Network",
        "Pacientes com convênio ou atendimento particular podem utilizar a mesma plataforma para solicitar consultas com seus médicos ou serviços credenciados.": "Patients with a health plan or private care can use the same platform to request appointments with their doctors or accredited services.",
        "Acesso simplificado": "Simplified access",
        "O cidadão informa seus dados, seleciona o tipo de atendimento e acompanha as orientações para realizar a consulta de forma remota.": "The citizen enters their data, selects the type of care, and follows the instructions to complete the appointment remotely.",
        "Fluxo do atendimento": "Care flow",
        "Como funciona a sua consulta por vídeo?": "How does your video appointment work?",
        "Veja como é fácil e seguro ser atendido sem sair de casa, passo a passo.": "See how easy and safe it is to receive care from home, step by step.",
        "Escolha o tipo de atendimento": "Choose the type of care",
        "O cidadão informa se deseja atendimento pela Rede Pública SUS ou pela Rede Privada, incluindo convênios e consultas particulares.": "The citizen informs whether they want care through the Public SUS Network or the Private Network, including health plans and private appointments.",
        "Preencha os dados necessários": "Fill in the required information",
        "Para o SUS, são solicitados o Cartão SUS e a UBS de referência. Para a Rede Privada, são solicitados o convênio ou plano de saúde e o número da carteirinha.": "For SUS, the SUS Card and reference primary care unit are requested. For the Private Network, the health plan and membership card number are requested.",
        "Aguarde a confirmação": "Wait for confirmation",
        "A solicitação é encaminhada para análise. O paciente poderá ser atendido pelo médico da sua UBS ou pelo profissional vinculado ao seu convênio ou atendimento particular.": "The request is sent for review. The patient may be treated by the doctor from their primary care unit or by the professional linked to their health plan or private care.",
        "Realize a consulta online": "Attend the online appointment",
        "Após a confirmação, o paciente recebe as orientações de acesso à teleconsulta, garantindo mais comodidade e continuidade no cuidado em saúde.": "After confirmation, the patient receives instructions to access the teleconsultation, ensuring greater convenience and continuity of health care.",
        "Segurança": "Security",
        "Antes da consulta, vamos confirmar quem é você para garantir sua segurança. Você também precisará clicar em \"Aceitar\" para nos autorizar a realizar o seu atendimento por vídeo.": "Before the appointment, we will confirm your identity to ensure your safety. You will also need to click \"Accept\" to authorize video care.",
        "A Hora da Consulta": "Appointment time",
        "No horário marcado, você entrará em uma sala de vídeo segura. Você e o médico vão conversar em tempo real. Ele vai ouvir suas queixas, ver você pela câmera e avaliar sua saúde com todo o cuidado e sigilo.": "At the scheduled time, you will enter a secure video room. You and the doctor will talk in real time. The doctor will listen to your concerns, see you through the camera, and assess your health with care and confidentiality.",
        "Receitas e Exames no seu Celular": "Prescriptions and exams on your phone",
        "Após a conversa, se você precisar de remédios, atestados ou exames, o médico enviará os documentos direto para o seu celular. Eles vêm com uma assinatura digital e valem em qualquer farmácia!": "After the conversation, if you need medicine, certificates, or exams, the doctor will send the documents directly to your phone. They include a digital signature and are valid at any pharmacy!",
        "Acompanhamento Contínuo": "Continuous follow-up",
        "Nós cuidamos de você mesmo depois de desligar a chamada. Todos os seus dados ficam guardados com total segurança e, se necessário, deixaremos seu retorno agendado.": "We keep caring for you even after the call ends. All your data is stored securely and, if necessary, your follow-up appointment will be scheduled.",
        "Solicitação de atendimento": "Care request",
        "Nome completo": "Full name",
        "CPF": "CPF",
        "Data de nascimento": "Date of birth",
        "Telefone ou WhatsApp": "Phone or WhatsApp",
        "Tipo de atendimento": "Type of care",
        "Rede Privada Convênio/Particular": "Private Network Health Plan/Private",
        "Número do Cartão SUS": "SUS Card number",
        "UBS de referência": "Reference primary care unit",
        "Selecione uma UBS": "Select a primary care unit",
        "UBS Central": "Central UBS",
        "UBS Vila Arens": "Vila Arens UBS",
        "UBS Eloy Chaves": "Eloy Chaves UBS",
        "UBS Vila Hortolândia": "Vila Hortolândia UBS",
        "UBS Novo Horizonte": "Novo Horizonte UBS",
        "Nome do convênio/plano de saúde": "Health plan name",
        "Número da carteirinha": "Membership card number",
        "Especialidade desejada": "Desired specialty",
        "Selecione uma especialidade": "Select a specialty",
        "Clínico geral": "General practitioner",
        "Pediatria": "Pediatrics",
        "Psicologia": "Psychology",
        "Cardiologia": "Cardiology",
        "Dermatologia": "Dermatology",
        "Descreva brevemente o motivo da consulta": "Briefly describe the reason for the appointment",
        "Enviar solicitação": "Send request",
        "Dúvidas frequentes": "Frequently asked questions",
        "O portal é somente para pacientes do SUS?": "Is the portal only for SUS patients?",
        "Não. O portal foi ampliado para integrar tanto a Rede Pública SUS quanto a Rede Privada, incluindo convênios médicos e atendimentos particulares.": "No. The portal was expanded to integrate both the Public SUS Network and the Private Network, including health plans and private appointments.",
        "Posso ser atendido pelo médico da minha UBS?": "Can I be treated by the doctor from my primary care unit?",
        "Sim. Ao escolher Rede Pública SUS, o sistema solicita o Cartão SUS e a UBS de referência para encaminhar o atendimento conforme a organização da rede municipal.": "Yes. When choosing the Public SUS Network, the system requests the SUS Card and reference primary care unit to route the care according to the municipal network organization.",
        "Quem tem convênio também pode usar?": "Can people with health plans also use it?",
        "Sim. Pacientes da Rede Privada podem informar o nome do convênio ou plano de saúde e o número da carteirinha para solicitar atendimento pela plataforma.": "Yes. Private Network patients can enter the health plan name and membership card number to request care through the platform.",
        "A consulta é sempre online?": "Is the appointment always online?",
        "O objetivo principal é facilitar a teleconsulta. Porém, dependendo da avaliação profissional, o paciente poderá receber orientação para atendimento presencial.": "The main goal is to make teleconsultation easier. However, depending on the professional evaluation, the patient may be advised to seek in-person care.",
        "Como agendar uma consulta?": "How do I schedule an appointment?",
        "É muito simples! Basta clicar no botão de agendamento na tela principal. Você vai escolher o tipo de médico que precisa, o dia e o horário que achar melhor. Se precisar de ajuda em qualquer etapa, temos um botão de suporte pronto para te auxiliar.": "It is very simple! Just click the scheduling button on the main screen. You will choose the type of doctor you need, the day, and the time that works best. If you need help at any step, we have a support button ready to assist you.",
        "O que acontece se a internet cair na hora?": "What happens if the internet drops during the appointment?",
        "Não se preocupe, isso pode acontecer! Se a sua conexão ou a do médico falhar, ele tentará ligar de novo. Caso não seja possível voltar para a chamada de vídeo, nossa equipe entrará em contato com você por telefone ou mensagem para remarcar a consulta, sem nenhum custo extra.": "Do not worry, this can happen! If your connection or the doctor's connection fails, the doctor will try to call again. If it is not possible to return to the video call, our team will contact you by phone or message to reschedule the appointment at no extra cost.",
        "O que preciso de ter para realizar a consulta por vídeo?": "What do I need for a video appointment?",
        "Apenas precisa de um telemóvel (smartphone), tablet ou computador com acesso à internet. O aparelho precisa de ter uma câmara e um microfone a funcionar. Não é necessário instalar programas complicados, basta clicar no link ou botão de \"Entrar na consulta\" à hora marcada.": "You only need a smartphone, tablet, or computer with internet access. The device needs a working camera and microphone. There is no need to install complicated programs; just click the link or \"Join appointment\" button at the scheduled time.",
        "Como me devo preparar antes de a consulta começar?": "How should I prepare before the appointment starts?",
        "Recomendamos que escolha um local calmo, silencioso e bem iluminado na sua casa. Tenha consigo o seu documento de identificação (como o Cartão de Cidadão) e as caixas dos medicamentos que já toma habitualmente, para poder mostrar ao médico caso ele pergunte.": "We recommend choosing a quiet, calm, and well-lit place at home. Keep your identification document and the packages of any medications you usually take nearby, so you can show them to the doctor if asked.",
        "Como vou receber minha receita de remédios?": "How will I receive my prescription?",
        "Após a conversa, se o médico receitar algum remédio ou pedir exames, ele enviará o documento direto para o seu celular. Essa receita digital é super segura e vale normalmente em qualquer farmácia perto da sua casa.": "After the conversation, if the doctor prescribes medicine or requests exams, the document will be sent directly to your phone. This digital prescription is very secure and is normally accepted at pharmacies near your home.",
        "Meus dados de saúde estão seguros?": "Are my health data safe?",
        "Com certeza. Seguimos leis muito rigorosas (como a Lei Geral de Proteção de Dados - LGPD) para garantir que apenas você e seu médico tenham acesso às suas informações e ao que foi conversado durante a consulta.": "Absolutely. We follow strict laws, such as Brazil's General Data Protection Law (LGPD), to ensure that only you and your doctor have access to your information and what was discussed during the appointment.",
        "Posso ter um familiar ou cuidador comigo durante a consulta?": "Can I have a family member or caregiver with me during the appointment?",
        "Com certeza! Se se sentir mais confortável ou precisar de ajuda para falar com o médico ou mexer no telemóvel, um familiar, amigo ou cuidador pode e deve estar ao seu lado durante toda a chamada de vídeo.": "Absolutely! If you feel more comfortable or need help talking to the doctor or using the phone, a family member, friend, or caregiver can and should stay by your side throughout the video call.",
        "E se o médico precisar de ver um exame que eu já fiz antes?": "What if the doctor needs to see an exam I already had?",
        "É muito simples. Na página da sua consulta, existe um botão chamado \"Enviar documento ou exame\". Pode simplesmente usar o seu telemóvel para tirar uma fotografia ao exame em papel e enviá-la de forma segura. O médico conseguirá ver a imagem na tela dele durante o atendimento.": "It is very simple. On your appointment page, there is a button called \"Send document or exam\". You can simply use your phone to take a picture of the paper exam and send it securely. The doctor will be able to see the image on their screen during the appointment.",
        "O sistema tem opções para pessoas com dificuldades de visão ou outras deficiências?": "Does the system offer options for people with visual difficulties or other disabilities?",
        "Sim, o nosso sistema foi desenhado a pensar em todos. Utilizamos letras grandes, cores fáceis de ler e a nossa página está preparada para funcionar com leitores de ecrã (para pessoas cegas ou com baixa visão). O nosso objetivo é que consiga agendar a sua consulta sem barreiras.": "Yes, our system was designed with everyone in mind. We use large fonts, easy-to-read colors, and our page is prepared to work with screen readers for blind and low-vision users. Our goal is for you to schedule your appointment without barriers.",
        "Ainda ficou com alguma dúvida?": "Still have a question?",
        "Entre em contato com a equipe responsável para receber ajuda sobre o uso do portal e o atendimento por telemedicina.": "Contact the responsible team to get help with using the portal and telemedicine care.",
        "Falar no WhatsApp": "Talk on WhatsApp",
        "Sobre o projeto": "About the project",
        "Este projeto foi desenvolvido como parte de um": "This project was developed as part of a",
        "Trabalho de Conclusão de Curso (TCC)": "final course project (TCC)",
        "com o objetivo de propor uma solução digital para facilitar o acesso da população de Jundiaí a atendimentos médicos por telemedicina.": "with the goal of proposing a digital solution to make it easier for the population of Jundiaí to access telemedicine appointments.",
        "A plataforma simula um portal": "The platform simulates a",
        "GovTech": "GovTech",
        "inspirado em": "portal inspired by",
        "padrões de interface do": "interface patterns from",
        "Gov.br": "Gov.br",
        "e da": "and the",
        "Prefeitura de Jundiaí": "City Hall of Jundiaí",
        "reunindo em um único ambiente a Rede Pública SUS, convênios de saúde e atendimentos particulares.": "bringing together the Public SUS Network, health plans, and private care in one environment.",
        "O sistema prioriza acessibilidade, clareza visual, organização das informações e uma experiência simples para o cidadão, permitindo escolher o tipo de atendimento, preencher os dados necessários e solicitar uma consulta online.": "The system prioritizes accessibility, visual clarity, information organization, and a simple citizen experience, allowing users to choose the type of care, fill in the required information, and request an online appointment.",
        "Objetivos do projeto": "Project goals",
        "Modernizar o acesso aos serviços de saúde digital.": "Modernize access to digital health services.",
        "Integrar atendimento público e privado em uma mesma plataforma.": "Integrate public and private care in the same platform.",
        "Reduzir barreiras de deslocamento para consultas iniciais.": "Reduce travel barriers for initial appointments.",
        "Garantir que a população tenha acesso a informações claras e confiáveis.": "Ensure the population has access to clear and reliable information.",
        "Promover a inclusão digital e acessibilidade para todos os cidadãos.": "Promote digital inclusion and accessibility for all citizens.",
        "Instituição:": "Institution:",
        "Colégio Domus Sapiens": "Colégio Domus Sapiens",
        "Professor Orientador: Felipe Schadt": "Advisor: Felipe Schadt",
        "Alunos integrantes:": "Student members:",
        "© 2026": "© 2026",
        "Yago Tonini": "Yago Tonini",
        "- Todos os direitos reservados.": "- All rights reserved."
      }
    }
  };

  const originalText = new WeakMap();
  let currentFontScale = 1;
  let currentLanguage = localStorage.getItem(STORAGE_KEYS.language) || "pt";

  function normalizeText(text) {
    return text.replace(/\s+/g, " ").trim();
  }

  function keepSpacing(original, translated) {
    const leading = original.match(/^\s*/)[0];
    const trailing = original.match(/\s*$/)[0];
    return leading + translated + trailing;
  }

  function translatableTextNodes() {
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        const parent = node.parentElement;
        if (!parent || ["SCRIPT", "STYLE"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT;
        }

        return normalizeText(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    const nodes = [];
    let node = walker.nextNode();
    while (node) {
      nodes.push(node);
      node = walker.nextNode();
    }
    return nodes;
  }

  function closeMobileMenu() {
    if (!menuToggle || !mainNavigation) {
      return;
    }

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", translations[currentLanguage].aria.menuOpen);
    mainNavigation.classList.remove("menu-open");
  }

  function applyTranslations(language) {
    const dictionary = translations[language] || translations.pt;
    currentLanguage = language;

    document.documentElement.lang = dictionary.lang;
    document.title = dictionary.title;

    translatableTextNodes().forEach(function (node) {
      if (!originalText.has(node)) {
        originalText.set(node, node.nodeValue);
      }

      const original = originalText.get(node);
      const normalized = normalizeText(original);
      const translated = language === "pt" ? normalized : dictionary.text[normalized] || normalized;
      node.nodeValue = keepSpacing(original, translated);
    });

    document.querySelector(".accessibility-bar").setAttribute("aria-label", dictionary.aria.accessibilityBar);
    languageSelect.setAttribute("aria-label", dictionary.aria.language);
    increaseFontButton.setAttribute("aria-label", dictionary.aria.fontIncrease);
    decreaseFontButton.setAttribute("aria-label", dictionary.aria.fontDecrease);
    document.querySelector(".whatsapp-button").setAttribute("aria-label", dictionary.aria.whatsapp);
    mainNavigation.setAttribute("aria-label", dictionary.aria.navigation);
    document.querySelector(".brand-logo").setAttribute("alt", dictionary.aria.brandLogo);
    updateThemeButton();
    updateContrastButton();
    closeMobileMenu();
  }

  function updateThemeButton() {
    const dictionary = translations[currentLanguage];
    const isDark = document.body.classList.contains("dark-mode");
    const label = isDark ? dictionary.aria.themeLight : dictionary.aria.themeDark;

    themeIcon.textContent = isDark ? "☀️" : "🌙";
    toggleThemeButton.setAttribute("aria-label", label);
    toggleThemeButton.setAttribute("title", label);
  }

  function updateContrastButton() {
    const dictionary = translations[currentLanguage];
    const isHighContrast = document.body.classList.contains("high-contrast");
    const label = isHighContrast ? dictionary.aria.contrastOff : dictionary.aria.contrastOn;

    toggleContrastButton.setAttribute("aria-label", label);
    toggleContrastButton.setAttribute("title", label);
  }

  function applyStoredPreferences() {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    const savedContrast = localStorage.getItem(STORAGE_KEYS.contrast);

    document.body.classList.toggle("dark-mode", savedTheme === "dark");
    document.body.classList.toggle("high-contrast", savedContrast === "true");
    languageSelect.value = translations[currentLanguage] ? currentLanguage : "pt";
    applyTranslations(languageSelect.value);
  }

  function activateTab(tabId) {
    tabButtons.forEach(function (button) {
      const isActive = button.dataset.tab === tabId;
      button.classList.toggle("active", isActive);
    });

    tabContents.forEach(function (content) {
      const isActive = content.id === tabId;
      content.classList.toggle("active", isActive);
    });

    closeMobileMenu();

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  if (menuToggle && mainNavigation) {
    menuToggle.addEventListener("click", function () {
      const dictionary = translations[currentLanguage];
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? dictionary.aria.menuOpen : dictionary.aria.menuClose);
      mainNavigation.classList.toggle("menu-open", !isOpen);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        closeMobileMenu();
      }
    });
  }

  tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activateTab(button.dataset.tab);
    });
  });

  openTabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activateTab(button.dataset.openTab);
    });
  });

  languageSelect.addEventListener("change", function () {
    localStorage.setItem(STORAGE_KEYS.language, languageSelect.value);
    applyTranslations(languageSelect.value);
  });

  increaseFontButton.addEventListener("click", function () {
    if (currentFontScale < 1.3) {
      currentFontScale += 0.1;
      root.style.setProperty("--font-scale", currentFontScale.toFixed(1));
    }
  });

  decreaseFontButton.addEventListener("click", function () {
    if (currentFontScale > 0.9) {
      currentFontScale -= 0.1;
      root.style.setProperty("--font-scale", currentFontScale.toFixed(1));
    }
  });

  toggleThemeButton.addEventListener("click", function () {
    const shouldUseDarkMode = !document.body.classList.contains("dark-mode");
    document.body.classList.toggle("dark-mode", shouldUseDarkMode);
    localStorage.setItem(STORAGE_KEYS.theme, shouldUseDarkMode ? "dark" : "light");
    updateThemeButton();
  });

  toggleContrastButton.addEventListener("click", function () {
    const shouldUseHighContrast = !document.body.classList.contains("high-contrast");
    document.body.classList.toggle("high-contrast", shouldUseHighContrast);
    localStorage.setItem(STORAGE_KEYS.contrast, String(shouldUseHighContrast));
    updateContrastButton();
  });

  function clearDynamicRequirements() {
    susCard.required = false;
    ubs.required = false;
    healthPlan.required = false;
    cardNumber.required = false;
  }

  function updateServiceTypeFields(selectedType) {
    clearDynamicRequirements();

    if (selectedType === "publica") {
      publicFields.classList.remove("hidden");
      privateFields.classList.add("hidden");

      susCard.required = true;
      ubs.required = true;

      healthPlan.value = "";
      cardNumber.value = "";
    }

    if (selectedType === "privada") {
      privateFields.classList.remove("hidden");
      publicFields.classList.add("hidden");

      healthPlan.required = true;
      cardNumber.required = true;

      susCard.value = "";
      ubs.value = "";
    }
  }

  serviceTypeRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      updateServiceTypeFields(radio.value);
    });
  });

  appointmentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formMessage.textContent = translations[currentLanguage].formMessage;
    originalText.set(formMessage.firstChild || formMessage.appendChild(document.createTextNode("")), translations.pt.formMessage);

    appointmentForm.reset();

    publicFields.classList.add("hidden");
    privateFields.classList.add("hidden");
    clearDynamicRequirements();
  });

  applyStoredPreferences();
});
