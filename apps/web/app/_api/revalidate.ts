export async function revalidateCache(tag: string): Promise<void> {
  try {
    await fetch('/api/revalidate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag }),
    });
  } catch (error) {
    console.error(`Failed to revalidate cache tag: ${tag}`, error);
  }
}
