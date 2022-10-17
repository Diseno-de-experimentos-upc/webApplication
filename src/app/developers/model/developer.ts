export interface Developer{
  id:number,
  first_name:string,
  last_name:string,
  description:string,
  image:string,
  banner_image:string,
  adreess:string,
  email:string,
  password:string,
  phone:string,
  databases:Array<string>,
  languages:Array<string>,
  frameworks:Array<string>
}
