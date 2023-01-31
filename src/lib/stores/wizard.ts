import type { Nullable } from '$lib/helpers/type';
import type { SvelteComponent } from 'svelte';
import { writable } from 'svelte/store';

export type WizardStore = {
    show: boolean;
    media?: Nullable<string>;
    component?: Nullable<typeof SvelteComponent>;
    interceptor?: Nullable<() => Promise<void>>;
};

function createWizardStore() {
    const { subscribe, update, set } = writable<WizardStore>({
        show: false,
        component: null,
        interceptor: null,
        media: null
    });

    return {
        subscribe,
        set,
        start: (component: WizardStore['component'], media: WizardStore['media'] = null) =>
            update((n) => {
                n.show = true;
                n.component = component;
                n.media = media;

                return n;
            }),
        setInterceptor: (callback: WizardStore['interceptor']) => {
            update((n) => {
                n.interceptor = callback;

                return n;
            });
        },
        hide: () =>
            update((n) => {
                n.show = false;
                n.component = null;
                n.media = null;

                return n;
            })
    };
}

export const wizard = createWizardStore();
