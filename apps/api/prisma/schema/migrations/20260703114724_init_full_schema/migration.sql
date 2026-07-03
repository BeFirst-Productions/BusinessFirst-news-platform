-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'SENDING', 'SENT', 'FAILED');

-- CreateEnum
CREATE TYPE "TwitterCardType" AS ENUM ('SUMMARY', 'SUMMARY_LARGE_IMAGE');

-- CreateEnum
CREATE TYPE "PageType" AS ENUM ('HOME', 'CONTACT', 'POLICY', 'CATEGORY', 'CUSTOM');

-- DropForeignKey
ALTER TABLE "Article" DROP CONSTRAINT "Article_categoryId_fkey";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "featuredImageTitle" TEXT,
ADD COLUMN     "isSponsored" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTopHeadline" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTrending" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isUaeNews" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "categoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "ArticleActivity" ALTER COLUMN "articleId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "NewsletterCampaign" (
    "id" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "htmlContent" TEXT NOT NULL,
    "status" "CampaignStatus" NOT NULL DEFAULT 'DRAFT',
    "sentCount" INTEGER NOT NULL DEFAULT 0,
    "failedCount" INTEGER NOT NULL DEFAULT 0,
    "sentBy" TEXT,
    "sentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsletterCampaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageSeo" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "pageType" "PageType" NOT NULL DEFAULT 'CUSTOM',
    "categoryId" TEXT,
    "metaTitle" TEXT NOT NULL,
    "metaDescription" TEXT NOT NULL,
    "canonicalUrl" TEXT,
    "ogTitle" TEXT,
    "ogDescription" TEXT,
    "ogImage" TEXT,
    "twitterCard" "TwitterCardType" NOT NULL DEFAULT 'SUMMARY_LARGE_IMAGE',
    "twitterTitle" TEXT,
    "twitterDescription" TEXT,
    "twitterImage" TEXT,
    "structuredData" JSONB,
    "robots" TEXT DEFAULT 'index, follow',
    "extraMeta" JSONB,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PageSeo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "NewsletterCampaign_status_idx" ON "NewsletterCampaign"("status");

-- CreateIndex
CREATE INDEX "NewsletterCampaign_createdAt_idx" ON "NewsletterCampaign"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "PageSeo_slug_key" ON "PageSeo"("slug");

-- CreateIndex
CREATE INDEX "PageSeo_slug_idx" ON "PageSeo"("slug");

-- CreateIndex
CREATE INDEX "PageSeo_pageType_idx" ON "PageSeo"("pageType");

-- CreateIndex
CREATE INDEX "PageSeo_categoryId_idx" ON "PageSeo"("categoryId");

-- CreateIndex
CREATE INDEX "PageSeo_isActive_idx" ON "PageSeo"("isActive");

-- CreateIndex
CREATE INDEX "Article_title_idx" ON "Article"("title");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageSeo" ADD CONSTRAINT "PageSeo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
