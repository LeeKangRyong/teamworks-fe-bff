# BFF Server for MSA-BE, FSD-FE

### Architecture
`Layered Architecture`
- **Router**

Client 요청 받는 가장 상위 layer  
URL에 따라 어떤 Service로 보낼 지 결정

- **Service**  

여러 BE API를 호출  
데이터를 합치고 가공 -> FE에 맞게  
  
- **Adapter**

BE와 통신하는 가장 하위 layer  
실제 BE API 호출  
BE 주소, 인증 정보 관리  
