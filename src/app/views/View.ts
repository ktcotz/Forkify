export class View {
  clearElementContent<T extends Element>(parentElement?: T | null) {
    if (!parentElement) return;

    parentElement.innerHTML = "";
  }

  renderSpinner<T extends Element>(parentElement?: T | null) {
    if (!parentElement) return;

    const spinnerContent = /* HTML */ `
      <div class="spinner">
        <svg>
          <use href="img/icons.svg#icon-loader"></use>
        </svg>
      </div>
    `;

    this.clearElementContent(parentElement);
    parentElement.insertAdjacentHTML("afterbegin", spinnerContent);
  }

  renderMessage<T extends Element>(parentElement?: T | null, message?: string) {
    if (!parentElement) return;

    const messageContent = /* HTML */ `
      <div class="message">
        <div>
          <svg>
            <use href="img/icons.svg#icon-smile"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>
    `;

    this.clearElementContent(parentElement);

    parentElement.insertAdjacentHTML("afterbegin", messageContent);
  }

  renderError<T extends Element>(parentElement?: T | null, error?: string) {
    if (!parentElement) return;

    const errorContent = /* HTML */ `
      <div class="error">
        <div>
          <svg>
            <use href="img/icons.svg#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${error}</p>
      </div>
    `;

    this.clearElementContent(parentElement);

    parentElement.insertAdjacentHTML("afterbegin", errorContent);
  }

  clearInputs(inputs: (HTMLInputElement | null)[]) {
    inputs.forEach((input) => {
      if (!input) return;

      input.value = "";
    });
  }
}
