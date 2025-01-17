import { ActorPF2e } from "@actor";
import { ItemPF2e } from "@item";
import { ArrayField, BooleanField, ModelPropsFromSchema, NumberField, StringField } from "types/foundry/common/data/fields.mjs";
import { RuleElementOptions } from "./";
import { AELikeData, AELikeRuleElement, AELikeSchema, AELikeSource } from "./ae-like";
/** Adjust the value of a modifier, change its damage type (in case of damage modifiers) or suppress it entirely */
declare class AdjustModifierRuleElement extends AELikeRuleElement<AdjustModifierSchema> {
    /** The number of times this adjustment has been applied */
    applications: number;
    constructor(data: AdjustModifierSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    static defineSchema(): AdjustModifierSchema;
    protected _validateModel(data: Record<string, unknown>): void;
    /** Instead of applying the change directly to a property path, defer it to a synthetic */
    applyAELike(): void;
}
interface AdjustModifierRuleElement extends AELikeRuleElement<AdjustModifierSchema>, ModelPropsFromSchema<AdjustModifierSchema> {
    data: AELikeData;
    suppress: boolean;
    maxApplications: number;
}
type AdjustModifierSchema = AELikeSchema & {
    /** An optional relabeling of the adjusted modifier */
    relabel: StringField<string, string, false, true, false>;
    selector: StringField<string, string, false, false, false>;
    selectors: ArrayField<StringField<string, string, true, false, false>>;
    damageType: StringField<string, string, false, true, true>;
    /** Rather than changing a modifier's value, ignore it entirely */
    suppress: BooleanField<boolean, boolean, false, true, false>;
    /** The maximum number of times this adjustment can be applied */
    maxApplications: NumberField<number, number, false, true, false>;
};
interface AdjustModifierSource extends Exclude<AELikeSource, "path"> {
    selector?: unknown;
    selectors?: unknown;
    relabel?: unknown;
    damageType?: unknown;
    suppress?: unknown;
}
export { AdjustModifierRuleElement };
