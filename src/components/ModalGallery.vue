<template>
  <BaseModal :name="ModalNames.Gallery" :z-index="zIndex">
    <BaseButton @click="close">gallery action</BaseButton>
  </BaseModal>
</template>

<script setup lang="ts">
  import BaseModal from './BaseModal.vue'
  import { ModalNames } from '../models/ModalNames'
  import { useModalsStore } from '../stores/modals'
  import BaseButton from './BaseButton.vue'
  import { computed } from 'vue'
  import { GalleryModalResponse } from '../models/GalleryModalResponse'

  const modalStore = useModalsStore()

  const zIndex = computed(
    () => modalStore.getModalData(ModalNames.Gallery)?.zIndex
  )

  const close = () => {
    modalStore.closeModalWithResponse(ModalNames.Gallery, {
      response: { a: 1, b: '2' } as GalleryModalResponse,
    })
  }
</script>
