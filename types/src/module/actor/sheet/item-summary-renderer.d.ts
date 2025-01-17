/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { ItemSummaryData } from "@item/data";
/**
 * Implementation used to populate item summaries, toggle visibility
 * of item summaries, and save expanded/collapsed state of item summaries.
 */
export declare class ItemSummaryRenderer<TActor extends ActorPF2e> {
    protected sheet: Application & {
        get actor(): TActor;
    };
    constructor(sheet: Application & {
        get actor(): TActor;
    });
    activateListeners(html: HTMLElement): void;
    /**
     * Triggers toggling the visibility of an item summary element,
     * delegating the populating of the item summary to renderItemSummary().
     * Returns true if it the item is valid and it was toggled.
     */
    toggleSummary(element: HTMLElement, options?: {
        instant?: boolean;
    }): Promise<void>;
    /**
     * Called when an item summary is expanded and needs to be filled out.
     */
    renderItemSummary(div: HTMLElement, item: ItemPF2e, chatData: ItemSummaryData): Promise<void>;
    /**
     * Executes a callback, performing a save and restore for all item summaries to maintain visual state.
     * Most restorations are driven by a data-item-id attribute, however data-item-summary-id with a custom string
     * can be used to avoid conflicts in areas such as spell preparation.
     */
    saveAndRestoreState(callback: () => Promise<JQuery<HTMLElement>>): Promise<JQuery<HTMLElement>>;
}
