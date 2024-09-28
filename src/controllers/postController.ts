import prisma from "../../prisma/client";
import { PostData, PostResponse } from "../interfaces/postData";

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({ orderBy: { id: "desc" } });
    return {
      success: true,
      message: "List Data Posts!",
      data: posts,
    };
  } catch (e: unknown) {
    console.error(`Error getting posts: ${e}`);
  }
}

export async function createPost(options: PostData) {
  try {
    const { title, content } = options;
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
      },
    });
    return {
      success: true,
      message: "Post Created!",
      data: post,
    };
  } catch (e: unknown) {
    console.error(`Error creating post: ${e}`);
  }
}

export async function getPostById(id: string): Promise<PostResponse> {
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return {
        success: true,
        message: "Detail Data Post Not Found!",
        data: null,
      };
    }

    return {
      success: true,
      message: `Detail Data Post By ID: ${id}`,
      data: post,
    };
  } catch (e: unknown) {
    console.error(`Error finding post: ${e}`);
    return {
      success: false,
      message: "Error finding post.",
      data: null,
    };
  }
}
export async function updatePost(id: string, options: { title?: string; content?: string }) {
    try {
        const postId = id;
        const { title, content } = options;
        const post = await prisma.post.update({
            where: { id: postId },
            data: {
                ...(title ? { title } : {}),
                ...(content ? { content } : {}),
            },
        });

        return {
            success: true,
            message: "Post Updated Successfully!",
            data: post,
        }
    } catch (e: unknown) {
        console.error(`Error updating post: ${e}`);
    }
}