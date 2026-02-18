import '@testing-library/jest-dom/vitest';
import { TextDecoder, TextEncoder } from 'util';
import { ReadableStream, TransformStream, WritableStream } from 'stream/web';
import { MessagePort } from 'worker_threads';
import { vi } from 'vitest';

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
global.ReadableStream = ReadableStream as any;
global.WritableStream = WritableStream as any;
global.TransformStream = TransformStream as any;
global.MessagePort = MessagePort as any;

(globalThis as any).jest = vi;

vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => (key === 'open' ? 'Open' : key),
    }),
}));
