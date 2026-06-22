import React from 'react';
import NewsDetail from "@/components/NewsDetail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  return (
    <main className="min-h-screen bg-white flex flex-col items-center w-full">
      <NewsDetail articleId={id} />
    </main>
  );
}
