<script setup lang="ts">
  import ModalGallery from './components/ModalGallery.vue'
  import ModalConfirm from './components/ModalConfirm.vue'
  import { useModalsStore } from './stores/modals'
  import { ModalNames } from './models/ModalNames'
  import BaseButton from './components/BaseButton.vue'
  import { GalleryModalResponse } from './models/GalleryModalResponse'

  const modalStore = useModalsStore()

  const openConfirm = async () => {
    const response = await modalStore.open(ModalNames.Confirm)

    console.log('result confirm', response)
  }

  const openGallery = async () => {
    const response = await modalStore.open(ModalNames.Gallery)

    const data = response?.response as GalleryModalResponse

    console.log('result gallery', data.a, data.b)
  }
</script>

<template>
  <div class="flex flex-col gap-3 items-start justify-start p-3">
    <BaseButton @click="openGallery"> Gallery </BaseButton>
    <BaseButton @click="openConfirm"> Confirm </BaseButton>
  </div>

  <ModalGallery />
  <ModalConfirm />
</template>
