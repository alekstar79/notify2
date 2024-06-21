import { Notification, ToastNotification } from './notification.ts';
import type { NotificationOptions, GroupOptions } from './const/index.ts';
interface ModuleOptions {
    onNotificationsCountChange: (c: number) => void;
    container: string | null;
}
export interface NotifyModule {
    options: ModuleOptions;
    notificationsCount: number;
    groups: Map<any, any>;
    id: string;
    pushNotification: (no: NotificationOptions) => ToastNotification;
    unshiftNotification: (no: NotificationOptions) => ToastNotification;
    removeNotifications: (id?: string) => void;
    createEmptyGroup: (go: GroupOptions) => boolean;
}
declare const defaultModuleOptions: ModuleOptions;
export declare class Module implements NotifyModule {
    options: ModuleOptions;
    notificationsCount: number;
    groups: Map<any, any>;
    id: string;
    constructor(moduleOptions: typeof defaultModuleOptions);
    _setNotificationsCount(count: number): void;
    createEmptyGroup(groupOptions: GroupOptions): boolean;
    _removeGroupNotifications(id: string, notificationStartIndex?: number): void;
    removeNotifications(id?: string): void;
    _onBeforeRemove(notification: {
        id: string;
        options: any;
    }): void;
    _createNotification(options: NotificationOptions): Notification;
    _addNotification(options: NotificationOptions): Notification;
    pushNotification(options: NotificationOptions): Notification;
    unshiftNotification(options: NotificationOptions): Notification;
}
export {};
