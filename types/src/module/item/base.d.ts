/// <reference types="jquery" />
import { ActorPF2e } from "@actor";
import { ChatMessagePF2e } from "@module/chat-message";
import { RuleElementOptions, RuleElementPF2e } from "@module/rules";
import { UserPF2e } from "@module/user";
import { EnrichHTMLOptionsPF2e } from "@system/text-editor";
import { ItemSourcePF2e, ItemSummaryData, ItemType, TraitChatData } from "./data";
import { PhysicalItemPF2e } from "./physical/document";
import { ItemSheetPF2e } from "./sheet/base";
import { ItemFlagsPF2e, ItemSystemData } from "./data/base";
import { ItemInstances } from "./types";
/** Override and extend the basic :class:`Item` implementation */
declare class ItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends Item<TParent> {
    /** Prepared rule elements from this item */
    rules: RuleElementPF2e[];
    /** The sluggified name of the item **/
    get slug(): string | null;
    /** The compendium source ID of the item **/
    get sourceId(): ItemUUID | null;
    /** The recorded schema version of this item, updated after each data migration */
    get schemaVersion(): number | null;
    get description(): string;
    /** The item that granted this item, if any */
    get grantedBy(): ItemPF2e<ActorPF2e> | null;
    /** Check whether this item is in-memory-only on an actor rather than being a world item or embedded and stored */
    get isTemporary(): boolean;
    /**
     * Set a source ID on a dropped embedded item without a full data reset
     * This is currently necessary as of 10.291 due to system measures to prevent premature data preparation
     */
    static fromDropData<TDocument extends foundry.abstract.Document>(this: ConstructorOf<TDocument>, data: object, options?: Record<string, unknown>): Promise<TDocument | undefined>;
    /** Check this item's type (or whether it's one among multiple types) without a call to `instanceof` */
    isOfType<T extends ItemType>(...types: T[]): this is ItemInstances<TParent>[T];
    isOfType(type: "physical"): this is PhysicalItemPF2e<TParent>;
    isOfType<T extends "physical" | ItemType>(...types: T[]): this is T extends "physical" ? PhysicalItemPF2e<TParent> : T extends ItemType ? ItemInstances<TParent>[T] : never;
    /** Redirect the deletion of any owned items to ActorPF2e#deleteEmbeddedDocuments for a single workflow */
    delete(context?: DocumentModificationContext<TParent>): Promise<this>;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    getRollData(): NonNullable<EnrichHTMLOptionsPF2e["rollData"]>;
    /**
     * Create a chat card for this item and either return the message or send it to the chat log. Many cards contain
     * follow-up options for attack rolls, effect application, etc.
     */
    toMessage(event?: MouseEvent | JQuery.TriggeredEvent, { rollMode, create, data, }?: {
        rollMode?: RollMode;
        create?: boolean;
        data?: Record<string, unknown>;
    }): Promise<ChatMessagePF2e | undefined>;
    /** A shortcut to `item.toMessage(..., { create: true })`, kept for backward compatibility */
    toChat(event?: JQuery.TriggeredEvent): Promise<ChatMessagePF2e | undefined>;
    protected _initialize(): void;
    prepareData(): void;
    /** Ensure the presence of the pf2e flag scope with default properties and values */
    prepareBaseData(): void;
    prepareRuleElements(this: ItemPF2e<ActorPF2e>, options?: RuleElementOptions): RuleElementPF2e[];
    /** Pull the latest system data from the source compendium and replace this item's with it */
    refreshFromCompendium(): Promise<void>;
    /**
     * Internal method that transforms data into something that can be used for chat.
     * Currently renders description text using enrichHTML.
     */
    protected processChatData<T extends ItemSummaryData>(htmlOptions: EnrichHTMLOptionsPF2e | undefined, data: T): Promise<T>;
    getChatData(htmlOptions?: EnrichHTMLOptionsPF2e, _rollOptions?: Record<string, unknown>): Promise<ItemSummaryData>;
    protected traitChatData(dictionary?: Record<string, string | undefined>): TraitChatData[];
    /** Don't allow the user to create a condition or spellcasting entry from the sidebar. */
    static createDialog<TDocument extends foundry.abstract.Document>(this: ConstructorOf<TDocument>, data?: Record<string, unknown>, context?: {
        parent?: TDocument["parent"];
        pack?: Collection<TDocument> | null;
    } & Partial<FormApplicationOptions>): Promise<TDocument | null>;
    /** Assess and pre-process this JSON data, ensuring it's importable and fully migrated */
    importFromJSON(json: string): Promise<this>;
    /** Include the item type along with data from upstream */
    toDragData(): {
        type: string;
        itemType: string;
        [key: string]: unknown;
    };
    static createDocuments<TDocument extends foundry.abstract.Document>(this: ConstructorOf<TDocument>, data?: (TDocument | PreCreate<TDocument["_source"]>)[], context?: DocumentModificationContext<TDocument["parent"]>): Promise<TDocument[]>;
    static deleteDocuments<TDocument extends foundry.abstract.Document>(this: ConstructorOf<TDocument>, ids?: string[], context?: DocumentModificationContext<TDocument["parent"]>): Promise<TDocument[]>;
    protected _preCreate(data: PreDocumentId<this["_source"]>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<void>;
    /** Keep `TextEditor` and anything else up to no good from setting this item's description to `null` */
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentUpdateContext<TParent>, user: UserPF2e): Promise<void>;
    /** Call onCreate rule-element hooks */
    protected _onCreate(data: ItemSourcePF2e, options: DocumentModificationContext<TParent>, userId: string): void;
    /** Call onDelete rule-element hooks */
    protected _onDelete(options: DocumentModificationContext<TParent>, userId: string): void;
}
interface ItemPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends Item<TParent> {
    flags: ItemFlagsPF2e;
    readonly _source: ItemSourcePF2e;
    system: ItemSystemData;
    _sheet: ItemSheetPF2e<this> | null;
    get sheet(): ItemSheetPF2e<this>;
    prepareSiblingData?(this: ItemPF2e<ActorPF2e>): void;
    prepareActorData?(this: ItemPF2e<ActorPF2e>): void;
    /** Returns items that should also be added when this item is created */
    createGrantedItems(options?: object): Promise<ItemPF2e[]>;
    /** Returns items that should also be deleted should this item be deleted */
    getLinkedItems?(): ItemPF2e<ActorPF2e>[];
}
/** A `Proxy` to to get Foundry to construct `ItemPF2e` subclasses */
declare const ItemProxyPF2e: typeof ItemPF2e;
export { ItemPF2e, ItemProxyPF2e };
