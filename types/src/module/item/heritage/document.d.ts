import { ActorPF2e } from "@actor";
import { CreatureTrait } from "@actor/creature";
import { ItemPF2e } from "@item";
import { Rarity } from "@module/data";
import { HeritageSource, HeritageSystemData } from "./data";
declare class HeritagePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    get traits(): Set<CreatureTrait>;
    get rarity(): Rarity;
    /** Prepare a character's data derived from their heritage */
    prepareActorData(this: HeritagePF2e<ActorPF2e>): void;
    getRollOptions(prefix?: string): string[];
}
interface HeritagePF2e<TParent extends ActorPF2e | null = ActorPF2e | null> extends ItemPF2e<TParent> {
    readonly _source: HeritageSource;
    system: HeritageSystemData;
}
export { HeritagePF2e };
