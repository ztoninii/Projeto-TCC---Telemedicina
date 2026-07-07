// script.js

// Aguarda o carregamento completo do HTML antes de manipular elementos da página
document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  const openTabButtons = document.querySelectorAll("[data-open-tab]");

  const increaseFontButton = document.getElementById("increaseFont");
  const decreaseFontButton = document.getElementById("decreaseFont");
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

  let currentFontScale = 1;

  // Função responsável por alternar as abas principais do portal
  function activateTab(tabId) {
    tabButtons.forEach(function (button) {
      const isActive = button.dataset.tab === tabId;
      button.classList.toggle("active", isActive);
    });

    tabContents.forEach(function (content) {
      const isActive = content.id === tabId;
      content.classList.toggle("active", isActive);
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  // Eventos dos botões de navegação por abas
  tabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activateTab(button.dataset.tab);
    });
  });

  // Botões internos que direcionam para uma aba específica
  openTabButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      activateTab(button.dataset.openTab);
    });
  });

  // Aumenta a fonte global da página sem quebrar a hierarquia visual
  increaseFontButton.addEventListener("click", function () {
    if (currentFontScale < 1.3) {
      currentFontScale += 0.1;
      root.style.setProperty("--font-scale", currentFontScale.toFixed(1));
    }
  });

  // Diminui a fonte global respeitando um limite mínimo de leitura
  decreaseFontButton.addEventListener("click", function () {
    if (currentFontScale > 0.9) {
      currentFontScale -= 0.1;
      root.style.setProperty("--font-scale", currentFontScale.toFixed(1));
    }
  });

  // Alterna a classe de alto contraste no body
  toggleContrastButton.addEventListener("click", function () {
    document.body.classList.toggle("high-contrast");
  });

  // Remove obrigatoriedade dos campos que estão escondidos
  function clearDynamicRequirements() {
    susCard.required = false;
    ubs.required = false;
    healthPlan.required = false;
    cardNumber.required = false;
  }

  // Controla a exibição dos campos conforme o tipo de atendimento escolhido
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

  // Escuta mudanças nos radio buttons de tipo de atendimento
  serviceTypeRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      updateServiceTypeFields(radio.value);
    });
  });

  // Simulação de envio do formulário para fins de protótipo acadêmico
  appointmentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formMessage.textContent =
      "Solicitação enviada com sucesso. A equipe responsável analisará os dados e retornará com as orientações da teleconsulta.";

    appointmentForm.reset();

    publicFields.classList.add("hidden");
    privateFields.classList.add("hidden");
    clearDynamicRequirements();
  });
});