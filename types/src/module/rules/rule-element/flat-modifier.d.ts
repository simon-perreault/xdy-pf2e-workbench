import { ActorPF2e } from "@actor";
import { ModifierType } from "@actor/modifiers";
import { AbilityString } from "@actor/types";
import { ItemPF2e } from "@item";
import { DamageCategoryUnique } from "@system/damage/types";
import { ArrayField, BooleanField, ModelPropsFromSchema, NumberField, StringField } from "types/foundry/common/data/fields.mjs";
import { RuleElementOptions, RuleElementPF2e, RuleElementSchema, RuleElementSource } from "./";
/**
 * Apply a constant modifier (or penalty/bonus) to a statistic or usage thereof
 * @category RuleElement
 */
declare class FlatModifierRuleElement extends RuleElementPF2e<FlatModifierSchema> {
    constructor(source: FlatModifierSource, item: ItemPF2e<ActorPF2e>, options?: RuleElementOptions);
    static defineSchema(): FlatModifierSchema;
    get selectors(): string[];
    beforePrepareData(): void;
}
interface FlatModifierRuleElement extends RuleElementPF2e<FlatModifierSchema>, ModelPropsFromSchema<FlatModifierSchema> {
}
type FlatModifierSchema = RuleElementSchema & {
    /** All domains to add a modifier to */
    selector: ArrayField<StringField<string, string, true, false, false>>;
    /** The modifier (or bonus/penalty) type */
    type: StringField<ModifierType, ModifierType, true, false, true>;
    /** If this is an ability modifier, the ability score it modifies */
    ability: StringField<AbilityString, AbilityString, false, false, false>;
    /** Hide this modifier from breakdown tooltips if it is disabled */
    min: NumberField<number, number, false, false, false>;
    max: NumberField<number, number, false, false, false>;
    hideIfDisabled: BooleanField;
    /** Whether to use this bonus/penalty/modifier even if it isn't the greatest magnitude */
    force: BooleanField;
    /** Whether this modifier comes from equipment or an equipment effect */
    fromEquipment: BooleanField;
    /** If a damage modifier, a damage type */
    damageType: StringField<string, string, false, true, false>;
    /** If a damage modifier, a special category */
    damageCategory: StringField<DamageCategoryUnique, DamageCategoryUnique, false, false, false>;
    /** If a damage modifier, whether it applies given the presence or absence of a critically successful attack roll */
    critical: BooleanField<boolean, boolean, false, true, false>;
};
interface FlatModifierSource extends RuleElementSource {
    selector?: unknown;
    min?: unknown;
    max?: unknown;
    type?: unknown;
    ability?: unknown;
    force?: unknown;
    damageType?: unknown;
    damageCategory?: unknown;
    critical?: unknown;
    hideIfDisabled?: unknown;
    fromEquipment?: unknown;
}
export { FlatModifierRuleElement, FlatModifierSource };
