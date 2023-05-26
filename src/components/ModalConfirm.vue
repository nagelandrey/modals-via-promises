<template>
  <BaseModal :name="ModalNames.Confirm" :z-index="zIndex">
    <BaseButton @click="close">confirm action</BaseButton>
  </BaseModal>
</template>

<script setup lang="ts">
  import BaseModal from './BaseModal.vue'
  import { ModalNames } from '../models/ModalNames'
  import { useModalsStore } from '../stores/modals'
  import { computed } from 'vue'
  import BaseButton from './BaseButton.vue'

  const modalStore = useModalsStore()

  const zIndex = computed(
    () => modalStore.getModalData(ModalNames.Confirm)?.zIndex
  )

  const close = () => {
    modalStore.closeModalWithResponse(ModalNames.Confirm, {
      response: 'confirm',
    })
  }
</script>
