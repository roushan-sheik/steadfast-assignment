'use client';

import { useQuery } from '@tanstack/react-query';
import { BLOG_QUERIES } from './queries';
import Image from 'next/image'; // ✅ import Next.js Image

export default function BlogList() {
  const { data, isLoading, isError } = useQuery(BLOG_QUERIES.getBlogs);

  if (isLoading) return <p>Loading blogs...</p>;
  if (isError || !data?.success) return <p>Failed to load blogs.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {data.data.map((blog) => (
        <div key={blog.id} className="border p-4 rounded">
          <div className="relative w-full h-48 mb-3">
            <Image
              src={blog.blog_image}
              alt={blog.title}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
          <h2 className="text-lg font-bold">{blog.title}</h2>
          <p className="text-gray-600">{blog.description}</p>
        </div>
      ))}
    </div>
  );
}
