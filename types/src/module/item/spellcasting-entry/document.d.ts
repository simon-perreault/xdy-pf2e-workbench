import { ActorPF2e } from "@actor";
import { AbilityString } from "@actor/types";
import { ItemPF2e, PhysicalItemPF2e, SpellPF2e } from "@item";
import { MagicTradition } from "@item/spell/types";
import { ZeroToFour } from "@module/data";
import { UserPF2e } from "@module/user";
import { Statistic } from "@system/statistic";
import { SpellCollection } from "./collection";
import { SpellcastingEntrySource, SpellcastingEntrySystemData } from "./data";
import { SpellcastingCategory, SpellcastingEntry, SpellcastingEntryPF2eCastOptions, SpellcastingSheetData } from "./types";
declare class SpellcastingEntryPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> implements SpellcastingEntry<TParent> {
    spells: SpellCollection<NonNullable<TParent>, this> | null;
    /** Spellcasting attack and dc data created during actor preparation */
    statistic: Statistic;
    get ability(): AbilityString;
    /** This entry's magic tradition, null if the spell's tradition should be used instead */
    get tradition(): MagicTradition | null;
    get category(): SpellcastingCategory;
    /**
     * Returns the proficiency used for calculations.
     * For innate spells, this is the highest spell proficiency (min trained)
     */
    get rank(): ZeroToFour;
    get isPrepared(): boolean;
    get isFlexible(): boolean;
    get isSpontaneous(): boolean;
    get isInnate(): boolean;
    get isFocusPool(): boolean;
    /** Ritual spellcasting is handled separately */
    get isRitual(): false;
    get highestLevel(): number;
    get showSlotlessLevels(): boolean;
    prepareBaseData(): void;
    prepareSiblingData(this: SpellcastingEntryPF2e<ActorPF2e>): void;
    prepareActorData(this: SpellcastingEntryPF2e<ActorPF2e>): void;
    /** All spells associated with this spellcasting entry on the actor that should also be deleted */
    getLinkedItems(): SpellPF2e<ActorPF2e>[];
    /** Returns if the spell is valid to cast by this spellcasting entry */
    canCast(spell: SpellPF2e, { origin }?: {
        origin?: PhysicalItemPF2e;
    }): boolean;
    /** Casts the given spell as if it was part of this spellcasting entry */
    cast(spell: SpellPF2e<ActorPF2e>, options?: SpellcastingEntryPF2eCastOptions): Promise<void>;
    consume(spell: SpellPF2e<ActorPF2e>, level: number, slot?: number): Promise<boolean>;
    /**
     * Adds a spell to this spellcasting entry, either moving it from another one if its the same actor,
     * or creating a new spell if its not.
     */
    addSpell(spell: SpellPF2e<TParent | null>, options?: {
        slotLevel?: number;
    }): Promise<SpellPF2e<NonNullable<TParent>> | null>;
    /** Saves the prepared spell slot data to the spellcasting entry  */
    prepareSpell(spell: SpellPF2e, slotLevel: number, spellSlot: number): Promise<this | null>;
    /** Removes the spell slot and updates the spellcasting entry */
    unprepareSpell(spellLevel: number, slotLevel: number): Promise<this | null>;
    /** Sets the expended state of a spell slot and updates the spellcasting entry */
    setSlotExpendedState(slotLevel: number, spellSlot: number, isExpended: boolean): Promise<this | null>;
    /** Returns rendering data to display the spellcasting entry in the sheet */
    getSheetData(): Promise<SpellcastingSheetData>;
    getRollOptions(prefix?: string): string[];
    protected _preUpdate(changed: DeepPartial<this["_source"]>, options: DocumentModificationContext<TParent>, user: UserPF2e): Promise<void>;
    /**
     * To prevent (or delay) console spam, will send out a deprecation notice in a later release
     * @deprecated
     */
    getSpellData(): Promise<SpellcastingSheetData>;
}
interface SpellcastingEntryPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: SpellcastingEntrySource;
    system: SpellcastingEntrySystemData;
}
export { SpellcastingEntryPF2e };
