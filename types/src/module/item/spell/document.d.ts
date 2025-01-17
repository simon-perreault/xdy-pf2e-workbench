/// <reference types="jquery" />
import { ActorPF2e } from "@actor";
import { AbilityString } from "@actor/types";
import { ItemPF2e } from "@item";
import { ActionTrait } from "@item/action/data";
import { ItemSourcePF2e, ItemSummaryData } from "@item/data";
import { BaseSpellcastingEntry } from "@item/spellcasting-entry";
import { TrickMagicItemEntry } from "@item/spellcasting-entry/trick";
import { MeasuredTemplatePF2e } from "@module/canvas";
import { ChatMessagePF2e } from "@module/chat-message";
import { OneToTen, ZeroToTwo } from "@module/data";
import { UserPF2e } from "@module/user";
import { CheckRoll } from "@system/check";
import { DamageRoll } from "@system/damage/roll";
import { DamageRollContext, SpellDamageTemplate } from "@system/damage/types";
import { StatisticRollParameters } from "@system/statistic";
import { EnrichHTMLOptionsPF2e } from "@system/text-editor";
import { SpellHeightenLayer, SpellOverlayType, SpellSource, SpellSystemData } from "./data";
import { SpellOverlayCollection } from "./overlay";
import { MagicSchool, MagicTradition, SpellComponent, SpellTrait } from "./types";
interface SpellConstructionContext<TParent extends ActorPF2e | null> extends DocumentConstructionContext<TParent> {
    fromConsumable?: boolean;
}
declare class SpellPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly isFromConsumable: boolean;
    /** The original spell. Only exists if this is a variant */
    original?: SpellPF2e<NonNullable<TParent>>;
    /** The overlays that were applied to create this variant */
    appliedOverlays?: Map<SpellOverlayType, string>;
    /** Set if casted with trick magic item. Will be replaced via overriding spellcasting on cast later. */
    trickMagicEntry: TrickMagicItemEntry<NonNullable<TParent>> | null;
    overlays: SpellOverlayCollection;
    constructor(data: PreCreate<ItemSourcePF2e>, context?: SpellConstructionContext<TParent>);
    get baseLevel(): OneToTen;
    /**
     * Heightened level of the spell if heightened, otherwise base.
     * This applies for spontaneous or innate spells usually, but not prepared ones.
     */
    get level(): number;
    get traits(): Set<SpellTrait>;
    /** Action traits added when Casting this Spell */
    get castingTraits(): ActionTrait[];
    get school(): MagicSchool;
    get traditions(): Set<MagicTradition>;
    get spellcasting(): BaseSpellcastingEntry<NonNullable<TParent>> | null;
    get isAttack(): boolean;
    get isCantrip(): boolean;
    get isFocusSpell(): boolean;
    get isRitual(): boolean;
    get ability(): AbilityString;
    get components(): Record<SpellComponent, boolean> & {
        value: string;
    };
    /** Whether this spell has unlimited uses */
    get unlimited(): boolean;
    get isVariant(): boolean;
    get hasVariants(): boolean;
    get uuid(): ItemUUID;
    /** Given a slot level, compute the actual level the spell will be cast at */
    computeCastLevel(slotLevel?: number): number;
    getRollData(rollOptions?: {
        castLevel?: number | string;
    }): NonNullable<EnrichHTMLOptions["rollData"]>;
    getDamage(damageOptions?: SpellDamageOptions): Promise<SpellDamage | null>;
    /**
     * Loads an alternative version of this spell, called a variant.
     * The variant is created via the application of one or more overlays based on parameters.
     * This handles heightening as well as alternative cast modes of spells.
     * If there's nothing to apply, returns null.
     */
    loadVariant(options?: {
        castLevel?: number;
        overlayIds?: string[];
    }): SpellPF2e<NonNullable<TParent>> | null;
    getHeightenLayers(level?: number): SpellHeightenLayer[];
    createTemplate(): MeasuredTemplatePF2e;
    placeTemplate(): void;
    prepareBaseData(): void;
    prepareSiblingData(this: SpellPF2e<ActorPF2e>): void;
    getRollOptions(prefix?: string): string[];
    toMessage(event?: JQuery.TriggeredEvent, { create, data, rollMode }?: SpellToMessageOptions): Promise<ChatMessagePF2e | undefined>;
    getChatData(this: SpellPF2e<ActorPF2e>, htmlOptions?: EnrichHTMLOptionsPF2e, rollOptions?: {
        castLevel?: number | string;
        slotLevel?: number | string;
    }): Promise<Omit<ItemSummaryData, "traits">>;
    rollAttack(this: SpellPF2e<ActorPF2e>, event: MouseEvent | JQuery.ClickEvent, attackNumber?: number, context?: StatisticRollParameters): Promise<void>;
    rollDamage(this: SpellPF2e<ActorPF2e>, event: MouseEvent | JQuery.ClickEvent, mapIncreases?: ZeroToTwo): Promise<Rolled<DamageRoll> | null>;
    /** Roll counteract check */
    rollCounteract(event: JQuery.ClickEvent): Promise<Rolled<CheckRoll> | null>;
    update(data: DocumentUpdateData<this>, options?: DocumentUpdateContext<TParent>): Promise<this>;
    protected _preCreate(data: PreDocumentId<this["_source"]>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<void>;
    protected _preUpdate(changed: DeepPartial<SpellSource>, options: DocumentUpdateContext<TParent>, user: UserPF2e): Promise<void>;
}
interface SpellPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: SpellSource;
    system: SpellSystemData;
}
interface SpellDamage {
    template: SpellDamageTemplate;
    context: DamageRollContext;
}
interface SpellToMessageOptions {
    create?: boolean;
    rollMode?: RollMode;
    data?: {
        castLevel?: number;
    };
}
interface SpellDamageOptions {
    rollMode?: RollMode | "roll";
    skipDialog?: boolean;
    target?: ActorPF2e | null;
}
export { SpellPF2e, SpellToMessageOptions };
