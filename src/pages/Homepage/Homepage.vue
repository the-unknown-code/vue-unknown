<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <div class="block max-w-md my-2 mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img class="h-48 w-full object-contain md:w-48 px-6 py-6" :src="getVersioned('images/vue-logo.png')" alt="" />
        </div>
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm font-semibold">{{ $t('title') }}</div>
          <p class="block mt-1 text-lg leading-tight font-medium text-black">{{ $t('subtitle') }}</p>
          <p class="mt-2 text-gray-500" v-html="$t('description')"></p>
        </div>
      </div>
    </div>
    <div class="block max-w-md my-2 mx-auto">
      <a href="#" class="font-semibold hover:underline">Wiki</a>
    </div>
  </div>
</template>

<script lang="js" src="./Homepage.js"></script>
