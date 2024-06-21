import type { TemplateData } from '../const/index.ts';
interface OptionsObject {
    [key: string]: any;
}
interface T1 extends OptionsObject {
}
interface U1 extends OptionsObject {
}
export declare const generateId: (length?: number) => string;
export declare function extendDefaults<T extends T1, U extends U1>(source: U, properties: T): (T | U);
export declare function applyArgs<T extends T1, U extends U1>(argum: T, defaults: U): (T | U);
export declare const templater: ({ id, title, message, type, content }: TemplateData) => Function;
export declare const getDefaultTemplate: (id: string, title: string | undefined, message: string | undefined, type: string) => any;
export declare const getCustomTemplate: (id: string, content: string) => any;
export declare const getCloseButtonSelector: (id: string) => string;
export {};
