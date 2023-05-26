<template>
  <BaseModal :name="ModalNames.Gallery">
    <BaseButton @click="close">gallery action</BaseButton>
  </BaseModal>
</template>

<script setup lang="ts">
  import BaseModal from './BaseModal.vue'
  import { ModalNames } from '../models/ModalNames'
  import { useModalsStore } from '../stores/modals'
  import BaseButton from './BaseButton.vue'
  import { GalleryModalResponse } from '../models/GalleryModalResponse'

  const modalsStore = useModalsStore()

  const close = () => {
    modalsStore.closeModalWithResponse(ModalNames.Gallery, {
      response: { a: 1, b: '2' } as GalleryModalResponse,
    })
  }
</script>
