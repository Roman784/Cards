import CardType from "./CardType";

export default interface ModuleType {
    title: string;
    access: number;
    cards: CardType[];
}