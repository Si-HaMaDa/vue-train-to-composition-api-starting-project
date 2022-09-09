import { ref, computed, watch } from 'vue';

export default function useSearch(items, searchProp) {
  const enteredSearchTerm = ref('');
  const activeSearchTerm = ref('');

  function updateSearch(val) {
    enteredSearchTerm.value = val;
  }

  const availableItems = computed(function () {
    let searchedItems = [];
    if (activeSearchTerm.value) {
      searchedItems = items.value.filter((item) =>
        item[searchProp]
          .toLowerCase()
          .includes(activeSearchTerm.value.toLowerCase())
      );
    } else if (items.value) {
      searchedItems = items.value;
    }

    return searchedItems;
  });

  const hasItems = computed(() => {
    return availableItems.value.length > 0;
  });

  watch(enteredSearchTerm, (val) => {
    setTimeout(() => {
      if (val === enteredSearchTerm.value) {
        activeSearchTerm.value = val;
      }
    }, 300);
  });

  return {
    enteredSearchTerm,
    availableItems,
    updateSearch,
    hasItems,
  };
}
