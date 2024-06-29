import { View } from "./View";

class SearchView extends View {
  parentElement = document.querySelector(".search");
  searchInput =
    this.parentElement?.querySelector<HTMLInputElement>(".search__field");

  constructor() {
    super();
  }

  getQuery() {
    if (!this.searchInput) return;

    const query = this.searchInput.value;

    this.clearInputs([this.searchInput]);

    return query;
  }

  addHandlerSearch(handler: () => void) {
    this.parentElement?.addEventListener("submit", (ev) => {
      ev.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
