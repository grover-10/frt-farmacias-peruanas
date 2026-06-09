export type ModalType = 'info' | 'success' | 'warning' | 'error';

export interface ModalConfig {
  open: boolean;
  type: ModalType;
  title: string;
  message: string;
}