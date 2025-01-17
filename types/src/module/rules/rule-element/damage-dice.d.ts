import { ActorPF2e, CharacterPF2e, NPCPF2e } from "@actor";
import { DamageDiceOverride } from "@actor/modifiers";
import { ItemPF2e } from "@item";
import { CriticalInclusion } from "@system/damage/types";
import { RuleElementData, RuleElementPF2e } from "./";
import { BracketedValue, RuleElementSource } from "./data";
declare class DamageDiceRuleElement extends RuleElementPF2e {
    #private;
    slug: string;
    selector: string;
    diceNumber: number | string;
    dieSize: string | null;
    damageType: string | null;
    critical: CriticalInclusion;
    category: "persistent" | "precision" | "splash" | null;
    brackets: BracketedValue | null;
    override: DamageDiceOverride | null;
    constructor(data: DamageDiceSource, item: ItemPF2e<ActorPF2e>);
    beforePrepareData(): void;
}
interface DamageDiceRuleElement {
    data: DamageDiceData;
    get actor(): CharacterPF2e | NPCPF2e;
}
interface DamageDiceData extends RuleElementData {
    name?: string;
    damageType?: string;
    override?: DamageDiceOverride;
    diceNumber?: number;
}
interface DamageDiceSource extends RuleElementSource {
    selector?: unknown;
    name?: unknown;
    diceNumber?: unknown;
    dieSize?: unknown;
    override?: unknown;
    damageType?: unknown;
    critical?: unknown;
    category?: unknown;
    damageCategory?: unknown;
}
export { DamageDiceRuleElement };
