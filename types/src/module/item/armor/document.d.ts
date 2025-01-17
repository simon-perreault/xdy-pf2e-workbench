import { ActorPF2e } from "@actor";
import { ItemSummaryData } from "@item/data";
import { PhysicalItemHitPoints, PhysicalItemPF2e } from "@item/physical";
import { ArmorCategory, ArmorGroup, ArmorSource, ArmorSystemData, BaseArmorType } from ".";
declare class ArmorPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    isStackableWith(item: PhysicalItemPF2e<TParent>): boolean;
    get isShield(): boolean;
    get isArmor(): boolean;
    get isBarding(): boolean;
    get baseType(): BaseArmorType | null;
    get group(): ArmorGroup | null;
    get category(): ArmorCategory;
    get dexCap(): number | null;
    get strength(): number | null;
    get checkPenalty(): number | null;
    get speedPenalty(): number;
    get acBonus(): number;
    get hitPoints(): PhysicalItemHitPoints;
    get hardness(): number;
    get isBroken(): boolean;
    get isDestroyed(): boolean;
    /** Given this is a shield, is it raised? */
    get isRaised(): boolean;
    /** Generate a list of strings for use in predication */
    getRollOptions(prefix?: string): string[];
    prepareBaseData(): void;
    prepareDerivedData(): void;
    prepareActorData(this: ArmorPF2e<ActorPF2e>): void;
    getChatData(this: ArmorPF2e<ActorPF2e>, htmlOptions?: EnrichHTMLOptions): Promise<ItemSummaryData>;
    generateUnidentifiedName({ typeOnly }?: {
        typeOnly?: boolean;
    }): string;
}
interface ArmorPF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends PhysicalItemPF2e<TParent> {
    readonly _source: ArmorSource;
    system: ArmorSystemData;
}
export { ArmorPF2e };
