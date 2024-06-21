import type { NotificationOptions } from './const/index.ts';
export interface ToastNotification {
    id: string;
    options: NotificationOptions;
    onBeforeRemove: (n: ToastNotification) => void;
    remove: () => void;
}
export declare class Notification implements ToastNotification {
    id: string;
    options: NotificationOptions;
    onBeforeRemove: (n: any) => void;
    constructor(options: NotificationOptions);
    remove(): void;
    _addToContainer(options: any): void;
}
