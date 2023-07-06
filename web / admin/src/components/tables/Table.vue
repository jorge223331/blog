<template>
  <table class="c-table">
    <thead>
      <slot name="thead" />
    </thead>
    <tbody>
      <slot name="tbody" />
    </tbody>
  </table>
</template>


<style lang="scss">
.c-table {
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #fff;
    padding: 10px;
  }
}
</style>