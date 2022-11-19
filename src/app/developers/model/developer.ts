import { Database } from "./database";
import { Framework } from "./framework";
import { ProgrammingLanguage } from "./programmingLanguage";

export interface Developer{
  id:number,
  firstName:string,
  lastName:string,
  description:string,
  image:string,
  banner_image:string,
  adreess:string,
  email:string,
  password:string,
  phone:string,
  databases:Array<Database>,
  languages:Array<ProgrammingLanguage>,
  frameworks:Array<Framework>
}
