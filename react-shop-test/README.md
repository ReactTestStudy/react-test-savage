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
        <OrderType orderType="product" />
      </QueryClientProvider>  
    )
~~~

## test.tsx Tips  
                
 - ### element tips
   - spinnbutton: input number type 일 경우 찾을 수 있다, 하지만 label 을 매치잇켜줘야한다
       
 - getByRole 
   - aria-role 기반 혹은 html 태그 기반으로 찾는다
   - name 속성은 태그 안에 있는 텍스트 값으로도 확인한다

 - ### userEvent
   - fireEvent 보다 좋다고 한다.(인간 친화적)
   - clear(): input textarea 에 텍스를 선택 한 후 제거 한다.
   - type(): input 안에 값을 타이핑으로 채운다
 - ### 느낀점
   - 케이스를 좀 복합적으로 해야겟다(지웟다 썻다 반복, )
   - toHaveContent 는 않좋은거같다 '500' 일 경우 1500, 3500, 다 통과가 된다
   - 항상 내가 하고 싶은것을 하기전에 초기화를 시켜주자
   - 너무 각 컴포넌트 말고 feature 를 잘잡아서 분리해주는것도 나쁘지않다. 
   - 확실히 버그 잡기가 용이하다(Context 버그만 2개는 잡아줌!!)
                                 
## Context 정리

 - createContext 함수로 생성 
 - 생성된 Context 를 변수에담아 내가 공유하고 싶은 부분을 안에있는 Provider 컴포넌트로 감싸준다
 - 그 대신 바로 Export 하지 말고 바로 안에서 Provider 를 생성해서 Export 해줬다

## Wrapper

 - Provider 즉 전역으로 감싸주는것을 사용할때 사용한다
 - Wrapper 라는 함수가 Render 함수에 존재한다, 하지만 일일히 번거롭기때문에 test-util.tsx 를 만들어서 보관하자
 
~~~typescript jsx
// jest 공식페이지에서 가져옴
// 전체 프로바이더를 만든다
const AllTheProviders: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <OrderContextProvider>{children}</OrderContextProvider>
    </QueryClientProvider>
  );
};
// 렌더 함수와 옴션값을 다시 넣어준다
const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
// test.util 로 간단히 다시 불러서 사용가능하다
// import { render, screen } from '../../util/test.utils';
export * from '@testing-library/react';

// override render method
export { customRender as render };

~~~

### Act Error
~~~javascript

    // 첫번째 페이지로 들어간다. 들어가면 react call stack 에 벗어나는 에러가 나온다
    userEvent.click(firstPageButton);

    // act 가 없어서 에러가 나온다 하는데 나오지 않음, 
    // act 와 같은 함수, 비동기 함수로 같이 그 다음 화면 컴포넌트 렌디링 페이지를 대기를 시킨다   
    await waitFor(async () => {
      screen.getByRole('spinbutton', {
        name: 'America',
      });
    });
		
	// 위에 두개의 함수를 합쳐서 만든게 findByRole !!
    await screen.findByRole('spinbutton', {
      name: 'America',
    });

~~~

### ETC
  - Array.from(), 유사 배열 객체를 배열로 만들어준다
  - Map 
  - Table html tag, thead, tbody, tFooter 로 감싸야한다.

