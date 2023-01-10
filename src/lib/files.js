import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { sortDesc } from "./utils";

const root = process.cwd();
export const notesDir = path.join(root, "src", "content", "notes");

/**
 * Gets slugs for all markdown in the content/notes
 * @returns {string[]} folder name/slugs of mdx content
 */
export function getSlugs() {
    const files = fs.readdirSync(notesDir);
    return files;
}

/**
 * Makes mdx frontmatter standard for all files
 * @param {string} slug
 * @param {Object} frontmatter json object of mdx frontmatter
 * @returns enhanced and standardized frontmatter
 */
export function getFrontmatterPro(slug, frontmatter) {
    const today = new Date().toISOString();
    frontmatter.date &&
        (frontmatter.date = new Date(frontmatter.date).toISOString());
    frontmatter.lastmod &&
        (frontmatter.lastmod = new Date(frontmatter.date).toISOString());
    const defaultReturn = {
        slug: slug,
        title: "Default title",
        description: "Default Description",
        date: today,
        lastmod: today,
        tags: [],
        keywords: [],
        draft: false,
    };
    return {
        ...defaultReturn,
        ...frontmatter,
    };
}

/**
 * Gets frontmatter and raw mdx text for a file-slug
 * @param {string} slug
 * @returns {} |{frontmatterPro, content}| standardized frontmatter and string of raw mdx file
 */
export function getFileBySlug(slug) {
    const filePath = path.join(notesDir, slug, "index.mdx");
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data: frontmatter, content } = matter(fileContents);
    return { frontmatterPro: getFrontmatterPro(slug, frontmatter), content };
}

/**
 * Gets file slugs and their raw mdx text
 * @returns |{frontmatterPro, content}| array of file objects
 */
export function getAllFiles() {
    const files = getSlugs()
        .map((slug) => getFileBySlug(slug))
        .sort((file1, file2) => sortDesc(file1, file2));
    return files;
}
