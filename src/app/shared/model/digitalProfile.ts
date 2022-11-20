import { Developer } from "src/app/developers/model/developer";

export interface DigitalProfile {
    id: number;
    name: string;
    developer: Developer;
}