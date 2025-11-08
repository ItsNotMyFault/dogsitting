import { ref } from "vue";

export function useModalShow() {
  const modalOpen = ref<boolean>(false);
  const localId = ref<number | undefined>(undefined);

  const showModal = (id?: number) => {
    modalOpen.value = true;
    localId.value = id ?? undefined;
  };

  const closeModal = () => {
    modalOpen.value = false;
    localId.value = undefined;
  };

  return {
    modalOpen,
    localId,
    showModal,
    closeModal
  };
}
