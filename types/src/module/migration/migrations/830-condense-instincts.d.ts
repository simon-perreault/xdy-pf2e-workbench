import { ItemSourcePF2e } from "@item/data";
import { MigrationBase } from "../base";
/** Remove links to deleted compendium items */
export declare class Migration830BarbarianRework extends MigrationBase {
    #private;
    static version: number;
    updateItem(source: ItemSourcePF2e): Promise<void>;
}
