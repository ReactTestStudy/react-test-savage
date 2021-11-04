# react-shop-test

                         
### Setup, 전체적인 구조 만들기

```
 yarn add eslint-plugin-testing-library eslint-plugin-jest-dom -D
 
 1. eslint 플러그인 설치한다(node verion 을 업데이트했다)
 2. 플러그인 함수에 넣는다(장착)
 3. 규칙을 extends 안에 넣는다
   - 오타 때문에 햇갈림
   - pretiier 설정(prettier, eslint-plugin-prettier 설치) react-script 에 동봉된 eslint 때문에 오류 생긴다
     (TypeError: Error while loading rule 'prettier/prettier': context.getPhysicalFilename is not a function)
     해당 프로젝트가서 yarn upgrade -R eslint 
 4. pages 라는 폴더에 각자 페이지를 만든다(항상 폴더로, test 폴더는 따로만든다/ 하지만 나는 그냥 만듬)   
 
 
```

### Mock Service Worker

```
    실제 서비스에서 호출 하면 비효울적
    대신할 목서버를 생성하자
    1) 서비스워커를 브라우저에 등록 방법(프록시)
    2) 노드 서버를 만드는 방법
    
```

```typescript

// setUpTest 파일로 등록 시 전역으로 삽가능
// 모든 테스트 시작 전 실행 
beforeAll(() => server.listen());

// 한 테스트 파일이 끝나면 작동
// 다른 테스트에 영향안끼치게 test 단위가끝나면 종료
afterEach(() => server.resetHandlers());

// 테스트 종료 후
// 테스트 완벽히 끝나면 끄기
afterEach(() => server.close());

```