/// <reference types="jquery" />
/// <reference types="jquery" />
/// <reference types="tooltipster" />
import { ChatMessagePF2e } from "@module/chat-message";
export declare class ChatLogPF2e extends ChatLog<ChatMessagePF2e> {
    #private;
    /** Replace parent method in order to use DamageRoll class as needed */
    protected _processDiceCommand(command: string, matches: RegExpMatchArray[], chatData: DeepPartial<foundry.documents.ChatMessageSource>, createOptions: ChatMessageModificationContext): Promise<void>;
    activateListeners($html: JQuery<HTMLElement>): void;
    protected _getEntryContextOptions(): EntryContextOption[];
}
