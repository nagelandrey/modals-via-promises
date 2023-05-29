<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="modalsStore.isModalOpen(name)"
        class="fixed left-0 top-0 z-30 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.32)] backdrop-opacity-90"
        :style="{ zIndex: zIndex }"
      >
        <div
          class="flex h-96 w-96 flex-col items-stretch justify-start rounded-xl border border-dark bg-white shadow-xl"
        >
          <div class="border-b border-lightGrey p-4">
            <BaseButton @click="close">close</BaseButton>
          </div>
          <div class="p-4">
            <slot />
          </div>
          <div class="mt-auto border-t border-lightGrey p-4">footer</div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  import { useModalsStore } from '../stores/modals'
  import { ModalNames } from '../models/ModalNames'
  import BaseButton from '../components/BaseButton.vue'
  import { computed } from 'vue/dist/vue'

  const props = defineProps<{
    name: ModalNames
  }>()

  const modalsStore = useModalsStore()

  const zIndex = computed(
    () => modalsStore.getModalData(props.name)?.zIndex ?? 0
  )

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
