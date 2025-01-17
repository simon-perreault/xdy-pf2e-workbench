import { CompendiumBrowser } from "..";
import { ContentTabName } from "../data";
import { CompendiumBrowserTab } from "./base";
import { CompendiumBrowserIndexData, SpellFilters } from "./data";
export declare class CompendiumBrowserSpellTab extends CompendiumBrowserTab {
    tabName: ContentTabName;
    filterData: SpellFilters;
    templatePath: string;
    searchFields: string[];
    storeFields: string[];
    constructor(browser: CompendiumBrowser);
    protected loadData(): Promise<void>;
    protected filterIndexData(entry: CompendiumBrowserIndexData): boolean;
    protected prepareFilterData(): SpellFilters;
}
