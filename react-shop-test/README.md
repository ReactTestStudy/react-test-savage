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