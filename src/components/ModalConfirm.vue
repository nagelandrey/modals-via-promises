<template>
  <BaseModal :name="ModalNames.Confirm">
    <BaseButton @click="close">confirm action</BaseButton>
  </BaseModal>
</template>

<script setup lang="ts">
  import BaseModal from './BaseModal.vue'
  import { ModalNames } from '../models/ModalNames'
  import { useModalsStore } from '../stores/modals'
  import BaseButton from './BaseButton.vue'

  const modalsStore = useModalsStore()

  const close = () => {
    modalsStore.closeModalWithResponse(ModalNames.Confirm, {
      response: 'confirm',
    })
  }
</script>
