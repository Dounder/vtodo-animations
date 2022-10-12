import { useQuasar } from 'quasar';
const useDialog = () => {
  const { dialog } = useQuasar();

  return {
    onConfirm: () =>
      dialog({
        title: 'Confirm',
        message: 'Are you sure to delete this Todo?',
        cancel: true,
        persistent: true,
        ok: {
          standard: true,
          color: 'negative',
        },
      }),

    onAlert: (message: string, title = 'Alert') => dialog({ title, message }),
  };
};

export default useDialog;
