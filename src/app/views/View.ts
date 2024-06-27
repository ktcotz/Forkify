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
}
