<template>
  <router-view />
  <DebugInfo v-if="$devMode" />
</template>

<script lang="js" src="./App.js"></script>
<style src="./App.scss" lang="scss" scoped></style>
