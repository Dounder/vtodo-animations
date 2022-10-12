<script setup lang="ts"></script>

<template>
  <article class="data">
    <img src="~/assets/no-data.svg" alt="No data" class="data-img" />
    <h1 class="data-title">There are no Todos here!</h1>
  </article>
</template>

<style lang="scss" scoped>
.data {
  position: absolute;
  width: 40rem;
  height: 20rem;
  inset: 50% 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-img {
    max-width: 100%;
    height: 80%;
    object-fit: contain;
  }
  &-title {
    width: 100%;
    margin: 1rem 0 0;
    font-size: 2rem;
    text-align: center;
    line-height: 1;
  }
}
</style>
