// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

import { server } from './mocks/serever';

// 모든 서버 시작전
beforeAll(() => server.listen());

// 다른 테스트에 영향안끼치게 test 단위가끝나면 종료
afterEach(() => server.resetHandlers());

// 테스트 완벽히 끝나면 끄기
afterAll(() => server.close());
