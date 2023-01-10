/**
 * Formats any date-ish string into local representation
 * @param {String} date a javascript date or string
 * @returns date to locale date string
 */
export function formatDate(date) {
    return date
        ? new Date(date).toLocaleDateString()
        : new Date().toLocaleDateString();
}

/**
 * Sorts in descending order
 * @param {Object} file1 frontmatter
 * @param {Object} file2 frontmatter
 * @returns 1 if file 1 comes before file 2, -1 if opposite
 */
export function sortDesc(file1, file2) {
    return file1.frontmatterPro.date < file2.frontmatterPro.date ? 1 : -1;
}
