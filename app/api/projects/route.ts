import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  // Parse the query parameters
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get('page') || '0', 10);
  
  const pageSize = 10;

  // Generate project data
  const projects = Array(pageSize)
    .fill(0)
    .map((_, i) => {
      const id = page * pageSize + (i + 1);
      return {
        name: 'Project ' + id,
        id,
      };
    });

  // Simulate network delay
  await new Promise((r) => setTimeout(r, 1000));

  // Respond with projects and pagination info
  return NextResponse.json({ projects, hasMore: page < 9 });
}
