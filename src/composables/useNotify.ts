import { useQuasar } from 'quasar';

const useNotify = () => {
  const { notify } = useQuasar();

  return {
    onSuccess: (message: string, position: notifyPosition = 'top-right') =>
      notify({ type: 'positive', message, position, icon: 'o_task_alt' }),

    onError: (message: string, position: notifyPosition = 'top-right') =>
      notify({ type: 'negative', message, position, icon: 'o_error' }),

    onWarning: (message: string, position: notifyPosition = 'top-right') =>
      notify({ type: 'warning', message, position, icon: 'o_warning' }),

    onInfo: (message: string, position: notifyPosition = 'top-right') =>
      notify({ type: 'info', message, position, icon: 'o_info' }),

    onInfoOngoing: (message: string, position: notifyPosition = 'top-right') =>
      notify({ type: 'ongoing', message, position, spinner: true }),
  };
};

type notifyPosition =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'center'
  | undefined;

export default useNotify;
