import { Post } from "@prisma/client";

export interface PostData {
  title: string;
  content: string;
}
export interface PostResponse {
  success: boolean;
  message: string;
  data: Post[] | Post | null;
}
