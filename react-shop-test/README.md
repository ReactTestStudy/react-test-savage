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

## Mock Service Worker
실제 서비스에서 호출 하면 비효울적
대신할 목서버를 생성하자
- node server 혹은 브라우저 목 서버를 생성한다
- 보다 효율적으로 관리 가능
- 에러를 던질수도 있고 서버를 제어가능

## setupTests.ts

- CRA 로 생성될때 생기는 파일
- 모든 테스트 셋업에 Global 사용 할 수 있다
```typescript

// setUpTest 파일로 등록 시 전역으로 삽가능
// 모든 테스트 시작 전 실행 
beforeAll(() => server.listen());

// 한 테스트 파일이 끝나면 작동
// 다른 테스트에 영향안끼치게 test 단위가끝나면 종료
afterEach(() => server.resetHandlers());

// 테스트 종료 후
// 테스트 완벽히 끝나면 끄기
afterAll(() => server.close());

```

## react-query 적용하기

- 데이터 패치 캐쉬 관리하기 위해 사용
- 사용 후 테스트 후 번거로움
- 테스트 할때 실제로 각 유닛의 상위에 감싸줘야함
- 테스트 안쪽에서 클라이언트 생성(밖에서 전역으로 생성시 캐쉬 옵션 작동함)
- retry 옵션을 끄지 않으면 계속 시도때문에 테스트케이스는 시도하기 어려움
~~~typescript jsx
    const queryClient = new QueryClient(
      defaultOptions: {
        queries: {
          retry: false,
        },
      }
    );

    render(
      <QueryClientProvider client={queryClient}>
        <Type orderType="product" />
      </QueryClientProvider>  
    )
~~~