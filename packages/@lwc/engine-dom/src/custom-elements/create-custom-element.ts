/*
 * Copyright (c) 2018, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: MIT
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/MIT
 */
import features from '@lwc/features';
import { hasCustomElements } from './has-custom-elements';
import { createCustomElementCompat } from './create-custom-element-compat';
import { createCustomElementVanilla } from './create-custom-element-vanilla';
import { createCustomElementScoped } from './create-custom-element-scoped';
import type { LifecycleCallback } from '@lwc/engine-core';

/**
 * We have three modes for creating custom elements:
 *
 * 1. Compat (legacy) browser support (e.g. IE11). Totally custom, doesn't rely on native browser APIs.
 * 2. "Vanilla" custom elements registry. This system actually still allows us to have two LWC components with the
 *    same tag name, via a simple trick: every custom element constructor we define in the registry is basically
 *    the same. It's essentially a dummy `class extends HTMLElement` that accepts an `upgradeCallback` in its
 *    constructor, which allows us to have completely customized functionality for different components.
 * 3. "Scoped" (or "pivot") custom elements. This relies on a sophisticated system that emulates the "scoped custom
 *    elements registry" proposal, with support for avoiding conflicts in tag names both between LWC components and
 *    between LWC components and third-party elements. This uses a similar trick to #2, but is much more complex
 *    because it must patch the global `customElements` and `HTMLElement` objects.
 */
export let createCustomElement: (
    tagName: string,
    upgradeCallback: LifecycleCallback,
    connectedCallback: LifecycleCallback,
    disconnectedCallback: LifecycleCallback
) => HTMLElement;

if (hasCustomElements) {
    if (features.ENABLE_SCOPED_CUSTOM_ELEMENT_REGISTRY) {
        createCustomElement = createCustomElementScoped;
    } else {
        // use global custom elements registry (vanilla)
        createCustomElement = createCustomElementVanilla;
    }
} else {
    // no registry available here
    createCustomElement = createCustomElementCompat;
}
