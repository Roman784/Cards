import ICard from "./ICard";

export default interface IModule {
    id: number;
    title: string;
    access: number;
    cards: ICard[];
}