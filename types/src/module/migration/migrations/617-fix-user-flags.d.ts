import { UserSourcePF2e } from "@module/user/data";
import { MigrationBase } from "../base";
export declare class Migration617FixUserFlags extends MigrationBase {
    static version: number;
    updateUser(source: UserSourcePF2e): Promise<void>;
}
