import type { GroupOptions } from './const/index.ts';
export declare class Group {
    options: GroupOptions;
    readonly _notifications: Map<any, any>;
    constructor(groupOptions: GroupOptions);
    _addNotification(notification: NotificationOptions): void;
    _hasNotification(id: string): boolean;
    _removeNotification(id: string): void;
    _getNotifications(): Map<any, any>;
    _getLength(): number;
    _isEmpty(): boolean;
}
