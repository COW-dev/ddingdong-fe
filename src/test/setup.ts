import '@testing-library/jest-dom/vitest';
import { vi, afterEach } from 'vitest';

export const mockPush = vi.fn();
export const mockReplace = vi.fn();
export const mockBack = vi.fn();
export const mockPathname = vi.fn(() => '/');
export const mockSearchParams = vi.fn(() => new URLSearchParams());
export const mockParams = vi.fn(() => ({ id: '1' }));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    replace: mockReplace,
    back: mockBack,
    forward: vi.fn(),
    refresh: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => mockPathname(),
  useSearchParams: () => mockSearchParams(),
  useParams: () => mockParams(),
}));

export const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
  loading: vi.fn(),
};

vi.mock('react-hot-toast', () => ({
  default: mockToast,
  toast: mockToast,
}));

vi.mock('@sentry/nextjs', () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => children,
  captureException: vi.fn(),
}));

export const mockFetcher = {
  get: vi.fn(),
  getBlob: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
  patch: vi.fn(),
};

vi.mock('@/app/_api/fetcher', () => ({
  fetcher: mockFetcher,
}));

export const mockUseSuspenseQuery = vi.fn();

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual('@tanstack/react-query');
  return {
    ...actual,
    useSuspenseQuery: mockUseSuspenseQuery,
  };
});

afterEach(() => {
  vi.clearAllMocks();
});
