export class SlugUtil {
  static generate(text: string, unique: boolean = true): string {
    let slug = text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/[\s_]+/g, '-')   // Replace spaces and underscores with hyphens
      .replace(/-+/g, '-')       // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, '');  // Remove leading and trailing hyphens

    if (unique) {
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substring(2, 5);
      slug = `${slug}-${timestamp}${random}`;
    }

    return slug;
  }

  static isValid(slug: string): boolean {
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    return slugRegex.test(slug);
  }
}