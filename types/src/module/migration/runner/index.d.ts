import type { ActorPF2e } from "@actor/base";
import type { ItemPF2e } from "@item/base";
import { MigrationRunnerBase } from "@module/migration/runner/base";
import { MigrationBase } from "@module/migration/base";
export declare class MigrationRunner extends MigrationRunnerBase {
    #private;
    needsMigration(): boolean;
    /** Ensure that an actor or item reflects the current data schema before it is created */
    static ensureSchemaVersion(document: ActorPF2e | ItemPF2e, migrations: MigrationBase[]): Promise<void>;
    runCompendiumMigration<T extends ActorPF2e<null> | ItemPF2e<null>>(compendium: CompendiumCollection<T>): Promise<void>;
    runMigrations(migrations: MigrationBase[]): Promise<void>;
    runMigration(force?: boolean): Promise<void>;
}
