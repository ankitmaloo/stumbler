// Centralized API client per endpoints.md
const BASE_URL = 'http://localhost:8000';

export type SourceType = 'home' | 'stumber';

export interface MultimodalSearchParams {
  text?: string;
  image?: File | null;
  isLive?: boolean;
  source: SourceType;
}

export interface MultimodalSearchResponse {
  articles?: any[];
  [key: string]: any;
}

export async function multimodalSearch({ text, image, isLive = false, source }: MultimodalSearchParams): Promise<MultimodalSearchResponse> {
  const formData = new FormData();
  if (text && text.trim()) formData.append('text', text);
  if (image) formData.append('image', image);
  formData.append('is_live', String(Boolean(isLive)));
  formData.append('source', source);

  const res = await fetch(`${BASE_URL}/api/multimodal-search`, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new Error(`multimodal-search failed: ${res.status} ${errText}`);
  }
  return res.json();
}

// Stubs for other endpoints in endpoints.md (not used here yet)
export async function textStream(prompt: string, onChunk: (chunk: string) => void): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/gemini/text-stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: prompt }),
  });
  const reader = res.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value, { stream: true }));
  }
}

// Article streaming with search grounding
export async function articleStream(prompt: string, onChunk: (chunk: string) => void): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/article/stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: prompt }),
  });
  
  if (!res.ok) {
    throw new Error(`article/stream failed: ${res.status}`);
  }
  
  const reader = res.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    onChunk(decoder.decode(value, { stream: true }));
  }
}

export async function imageGenerate(prompt: string): Promise<any> {
  const res = await fetch(`${BASE_URL}/api/gemini/image-generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: prompt }),
  });
  if (!res.ok) throw new Error(`image-generate failed: ${res.status}`);
  return res.json();
}

// WebSocket search - real-time streaming
export async function webSocketSearch({ text, image, source, isLive = false }: MultimodalSearchParams, onEvent: (evt: any) => void): Promise<void> {
  const WS_URL = BASE_URL.replace('http', 'ws');
  
  return new Promise((resolve, reject) => {
    try {
      const ws = new WebSocket(`${WS_URL}/ws/search`);
      
      ws.onopen = async () => {
        try {
          let imageBase64 = null;
          if (image) {
            imageBase64 = await fileToBase64(image);
          }
          
          const message = {
            text: text || '',
            image: imageBase64,
            source,
          };
          
          ws.send(JSON.stringify(message));
        } catch (error) {
          ws.close();
          reject(error);
        }
      };
      
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          onEvent(data);
          
          if (data.type === 'done') {
            ws.close();
            resolve();
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      
      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        reject(new Error('WebSocket connection failed'));
      };
      
      ws.onclose = () => {
        // Connection closed
      };
    } catch (error) {
      reject(error);
    }
  });
}

// Helper function to convert File to base64
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Extract base64 part (remove "data:image/...;base64," prefix)
      const base64 = result.split(',')[1] || result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Legacy HTTP orchestrated search API (kept for backward compatibility)
export async function startSearch({ text, image, source, isLive = false }: MultimodalSearchParams): Promise<{job_id: string}> {
  const formData = new FormData();
  if (text && text.trim()) formData.append('text', text);
  if (image) formData.append('image', image);
  formData.append('is_live', String(Boolean(isLive)));
  formData.append('source', source);
  const res = await fetch(`${BASE_URL}/api/search/start`, { method: 'POST', body: formData });
  if (!res.ok) throw new Error('search/start failed');
  return res.json();
}

export async function streamSearch(jobId: string, onEvent: (evt: any) => void): Promise<void> {
  const res = await fetch(`${BASE_URL}/api/search/stream?job=${encodeURIComponent(jobId)}`);
  const reader = res.body?.getReader();
  if (!reader) return;
  const decoder = new TextDecoder();
  let buffer = '';
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split('\n');
    buffer = lines.pop() || '';
    for (const line of lines) {
      if (!line) continue;
      try { onEvent(JSON.parse(line)); } catch {}
    }
  }
}
