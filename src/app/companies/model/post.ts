import { Company } from "src/app/public/register/model/company";

export interface Post {
  id: number,
  title: string,
  imageUrl: string,
  description: string,
  status: string,
  company: Company
}
