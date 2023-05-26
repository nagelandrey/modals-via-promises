import { defineStore } from 'pinia'
import { ModalNames } from '../models/ModalNames'
import { ModalResponse } from '../models/ModalResponse'

type Resolve = null | ((value: ModalResponse) => void)
type Reject = null | ((reason: Error) => void)

const zIndexStep = 10

interface ModalPromise {
  promise: Promise<ModalResponse>
  resolve: Resolve
  reject: Reject
  zIndex: number
}

interface ModalsState {
  openedModals: Map<ModalNames, ModalPromise>
}

export const useModalsStore = defineStore('modals', {
  state: (): ModalsState => ({
    openedModals: new Map(),
  }),
  actions: {
    async open(modalName: ModalNames) {
      let modalResolve: Resolve = null
      let modalReject: Reject = null

      const newModalPromise = new Promise<ModalResponse>((resolve, reject) => {
        modalResolve = resolve
        modalReject = reject
      })

      if (!modalReject || !modalResolve) {
        return
      }

      this.openedModals.set(modalName, {
        promise: newModalPromise,
        resolve: modalResolve,
        reject: modalReject,
        zIndex: (this.openedModals.size + 1) * zIndexStep,
      })

      return await newModalPromise
    },

    close(modalName: ModalNames) {
      this.openedModals.delete(modalName)
    },

    closeModalWithResponse(modalName: ModalNames, content: ModalResponse) {
      const modalPromise = this.openedModals.get(modalName)
      if (!modalPromise || !modalPromise.resolve) {
        return
      }
      modalPromise.resolve(content)
      this.close(modalName)
    },
  },
  getters: {
    isModalOpen: (state) => (name: ModalNames) => state.openedModals.has(name),
    getModalData: (state) => (name: ModalNames) => state.openedModals.get(name),
  },
})
