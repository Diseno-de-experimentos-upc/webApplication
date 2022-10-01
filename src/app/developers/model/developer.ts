export interface Developer{
  id:number,
  first_name:string,
  last_name:string,
  email:string,
  password:string,
  phone:string,
  databases:Array<string>,
  languages:Array<string>,
  frameworks:Array<string>
}
