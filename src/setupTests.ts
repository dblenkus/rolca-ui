import { TextDecoder, TextEncoder } from 'util';
import { ReadableStream, TransformStream, WritableStream } from 'stream/web';
import { MessagePort } from 'worker_threads';

global.TextEncoder = TextEncoder as typeof global.TextEncoder;
global.TextDecoder = TextDecoder as typeof global.TextDecoder;
global.ReadableStream = ReadableStream as any;
global.WritableStream = WritableStream as any;
global.TransformStream = TransformStream as any;
global.MessagePort = MessagePort as any;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Enzyme = require('enzyme');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Adapter = require('@wojtekmaj/enzyme-adapter-react-17');

Enzyme.configure({ adapter: new Adapter() });

jest.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => (key === 'open' ? 'Open' : key),
    }),
}));
