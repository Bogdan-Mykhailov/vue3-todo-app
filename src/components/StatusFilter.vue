<script>
export default {
  props: {
    modelValue: String
  },

  emits: ['update:modelValue'],

  methods: {
    changeFilter(type) {
      this.$emit('update:modelValue', type)
    }
  }
}
</script>

<template>
  <nav class="filter">
    <a
      href="#/"
      class="filter__link"
      :class="{selected: modelValue === 'all'}"
      @click="changeFilter('all')"
    >
      All
    </a>

    <a
      href="#/active"
      class="filter__link"
      :class="{selected: modelValue === 'active'}"
      @click="changeFilter('active')"
    >
      Active
    </a>

    <a
      href="#/completed"
      class="filter__link"
      :class="{selected: modelValue === 'completed'}"
      @click="changeFilter('completed')"
    >
      Completed
    </a>
  </nav>
</template>
