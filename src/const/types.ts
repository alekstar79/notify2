export type ElementMode = 'push' | 'unshift'
export type IconType = 'info' | 'warning' | 'error' | 'success'
export type AnimationType = 'fade' | 'swing' | 'rotate' | 'slide'

export interface Types {
  [key: string]: ElementMode;
}

export interface IconsMode {
  [key: string]: IconType;
}

export interface NotificationOptions {
  title?: string;
  message?: string;
  closeInMS?: number | null;
  animation?: AnimationType;
  type?: IconType;
  template?: Function | null;
  mode?: ElementMode;
  [key: string]: any;
}

export interface GroupOptions {
  id?: string | null;
  greedy?: boolean;
}

export interface TemplateData {
  id: string;
  title?: string;
  message?: string;
  type?: string;
  content?: string;
}

export const ADD_ELEMENT_MODE: Types = {
  UNSHIFT: 'unshift' as ElementMode,
  PUSH: 'push' as ElementMode
}
