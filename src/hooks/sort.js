import { ref, computed } from 'vue';

export default function useSort(availableItems, sortProperty) {
  const sorting = ref(null);

  function sort(mode) {
    sorting.value = mode;
  }

  const displayedItems = computed(() => {
    if (!sorting.value) {
      return availableItems.value;
    }
    return availableItems.value.slice().sort((u1, u2) => {
      if (sorting.value === 'asc' && u1[sortProperty] > u2[sortProperty]) {
        return 1;
      } else if (sorting.value === 'asc') {
        return -1;
      } else if (
        sorting.value === 'desc' &&
        u1[sortProperty] > u2[sortProperty]
      ) {
        return -1;
      } else {
        return 1;
      }
    });
  });

  return {
    sorting,
    displayedItems,
    sort,
  };
}
