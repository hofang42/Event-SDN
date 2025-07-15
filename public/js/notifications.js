// Toastify notification function
function showToast(message, type = "info") {
  const backgroundColor =
    type === "success"
      ? "#28a745"
      : type === "error"
      ? "#dc3545"
      : type === "warning"
      ? "#ffc107"
      : "#17a2b8";

  Toastify({
    text: message,
    duration: 3000,
    gravity: "top",
    position: "right",
    backgroundColor: backgroundColor,
    stopOnFocus: true,
    close: true,
  }).showToast();
}

// Modal function
function showModal(type, title, message) {
  const modalId =
    type === "error"
      ? "errorModal"
      : type === "success"
      ? "successModal"
      : "confirmModal";
  const bodyId =
    type === "error"
      ? "errorModalBody"
      : type === "success"
      ? "successModalBody"
      : "confirmModalBody";
  const labelId =
    type === "error"
      ? "errorModalLabel"
      : type === "success"
      ? "successModalLabel"
      : "confirmModalLabel";

  document.getElementById(labelId).textContent = title;
  document.getElementById(bodyId).textContent = message;

  const modal = new bootstrap.Modal(document.getElementById(modalId));
  modal.show();
}

// Show server messages on page load
function showServerMessages() {
  // This will be called from individual pages to show any server-side messages
  if (typeof serverMessage !== "undefined" && serverMessage) {
    showToast(serverMessage, "success");
  }

  if (typeof serverError !== "undefined" && serverError) {
    showToast(serverError, "error");
  }
}

// Loading state management
function setLoadingState(
  button,
  loadingText = "Loading...",
  originalText = null
) {
  if (!originalText) {
    originalText = button.textContent;
  }

  button.textContent = loadingText;
  button.disabled = true;

  return originalText;
}

function resetLoadingState(button, originalText) {
  button.textContent = originalText;
  button.disabled = false;
}
