<template>
  <base-container v-if="user">
    <h2>{{ user.fullName }}: Projects</h2>
    <base-search
      @search="updateSearch"
      :search-term="enteredSearchTerm"
    ></base-search>
    <div v-if="hasProjects">
      <button @click="sort('asc')" :class="{ selected: sorting === 'asc' }">
        Sort Ascending
      </button>
      <button @click="sort('desc')" :class="{ selected: sorting === 'desc' }">
        Sort Descending
      </button>
    </div>
    <ul v-if="hasProjects">
      <project-item
        v-for="prj in displayedProjects"
        :key="prj.id"
        :title="prj.title"
      ></project-item>
    </ul>
    <h3 v-else>No projects found.</h3>
  </base-container>
  <base-container v-else>
    <h3>No user selected.</h3>
  </base-container>
</template>

<!-- <script>
import ProjectItem from './ProjectItem.vue';

export default {
  components: {
    ProjectItem,
  },
  props: ['user'],
  data() {
    return {
      enteredSearchTerm: '',
      activeSearchTerm: '',
    };
  },
  computed: {
    hasProjects() {
      return this.user.projects && this.availableProjects.length > 0;
    },
    availableProjects() {
      if (this.activeSearchTerm) {
        return this.user.projects.filter((prj) =>
          prj.title.includes(this.activeSearchTerm)
        );
      }
      return this.user.projects;
    },
  },
  methods: {
    updateSearch(val) {
      this.enteredSearchTerm = val;
    },
  },
  watch: {
    enteredSearchTerm(val) {
      setTimeout(() => {
        if (val === this.enteredSearchTerm) {
          this.activeSearchTerm = val;
        }
      }, 300);
    },
    user() {
      console.log('WU');
      this.enteredSearchTerm = '';
    },
  },
};
</script> -->
<!-- <script>
import { computed, ref, toRefs, watch } from 'vue';
import ProjectItem from './ProjectItem.vue';

export default {
  components: {
    ProjectItem,
  },
  props: ['user'],
  setup(props, context) {
    console.log(context);

    const enteredSearchTerm = ref('');
    const activeSearchTerm = ref('');
    const { user } = toRefs(props);

    function updateSearch(val) {
      enteredSearchTerm.value = val;
    }

    watch(enteredSearchTerm, (val) => {
      setTimeout(() => {
        if (val === enteredSearchTerm.value) {
          activeSearchTerm.value = val;
        }
      }, 300);
    });

    const availableProjects = computed(() => {
      if (activeSearchTerm.value) {
        return user.value.projects.filter((prj) =>
          prj.title.includes(activeSearchTerm.value)
        );
      }
      return user.value.projects;
    });
    const hasProjects = computed(() => {
      return user.value.projects && availableProjects.value.length > 0;
    });

    watch(
      // () => props.user,
      user,
      () => {
        enteredSearchTerm.value = '';
      }
    );

    return {
      enteredSearchTerm,
      availableProjects,
      hasProjects,
      updateSearch,
    };
  },
};
</script> -->
<script setup>
import { computed, ref, toRefs, watch } from 'vue';
import useSort from '../../hooks/sort.js';
import ProjectItem from './ProjectItem.vue';

const props = defineProps(['user']);

const hasProjects = computed(() => {
  return props.user.projects && availableProjects.value.length > 0;
});
const availableProjects = computed(() => {
  if (activeSearchTerm.value) {
    return props.user.projects.filter((prj) =>
      prj.title.includes(activeSearchTerm.value)
    );
  }
  return props.user.projects;
});

const {
  sorting,
  displayedItems: displayedProjects,
  sort,
} = useSort(availableProjects, 'title');

const { user } = toRefs(props);
watch(
  // () => props.user,
  user,
  () => {
    enteredSearchTerm.value = '';
  }
);

const enteredSearchTerm = ref('');
const activeSearchTerm = ref('');

function updateSearch(val) {
  enteredSearchTerm.value = val;
}

watch(enteredSearchTerm, (val) => {
  setTimeout(() => {
    if (val === enteredSearchTerm.value) {
      activeSearchTerm.value = val;
    }
  }, 300);
});
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
