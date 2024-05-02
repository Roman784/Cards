import CardType from "./CardType";

export default interface ModuleType {
    id: number;
    title: string;
    access: number;
    cards: CardType[];
}