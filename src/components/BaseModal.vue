<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="modalsStore.isModalOpen(name)"
        class="fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.32)] backdrop-opacity-90 flex items-center justify-center z-30"
        :style="{ zIndex: zIndex ?? 0 }"
      >
        <div
          class="flex flex-col justify-start items-stretch w-96 h-96 border border-dark bg-white rounded-xl shadow-xl"
        >
          <div class="p-4 border-b border-lightGrey">
            <BaseButton @click="close">close</BaseButton>
          </div>
          <div class="p-4">
            <slot />
          </div>
          <div class="p-4 border-t border-lightGrey mt-auto">footer</div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  import { useModalsStore } from '../stores/modals'
  import { ModalNames } from '../models/ModalNames'
  import BaseButton from '../components/BaseButton.vue'

  const props = defineProps<{
    name: ModalNames
    zIndex?: number
  }>()

  const modalsStore = useModalsStore()

  const close = () => modalsStore.close(props.name)
</script>

<style scoped>
  .modal-fade-enter-from,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: 0.25s ease all;
  }
</style>
