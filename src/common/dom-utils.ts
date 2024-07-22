export function fetchDOMElementById<T extends HTMLElement>(id: string): T {
    return document.getElementById(id) as T;
}

export function fetchDOMElementByQuerySelector<T extends HTMLElement>(selector: string): T {
    return document.querySelector(selector) as T;
}

export function fetchDOMElementsByQuerySelectorAll<T extends HTMLElement>(selector: string): NodeListOf<T> {
    return document.querySelectorAll(selector) as NodeListOf<T>;
}
