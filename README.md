# 트위티콘 프론트엔드

트위티콘 차원문의 한글 별칭을 유저들에게 보기 쉽게 편집할수 있도록 편집한 프로젝트입니다.

https://twiticon.com

# 개발 및 

zeplin과 xd를 이용하여 디자인부터 시작 : https://scene.zeplin.io/project/5d946e78b311286125338b96


# 적용 프레임워크

next js를 이용하여 server-side-rendering이 가능하도록 만들었음

이를 통해 검색엔진 최적화를 하여 검색엔진에 사이트가 노출되는 것이 목표입니다.

# Single Page Application

PC로 접속하면 우측에 있는 채팅창이 있다. iframe을 이용하여 트위치 채팅창을 그대로 임베드한것인데

페이지간 이동을 할 때 이 채팅창을 유지하고 싶었기 때문에

next.js의 커스텀 _app.js를 이용하여 어느 페이지에서도 똑같은 트위치 채팅창 컴포넌트를 사용하여 

재렌더링을 막았습니다.

# 백엔드

node.js와 express, 그리고 pm2를 이용하여 관리하고 있습니다.

# 배포

centos 에서 아파치를 이용하여 배포중입니다. proxy 설정을 이용해 백엔드 API와 프론트엔드 주소가 같은 hostURL을 사용하도록 설계하였습니다.

# 반응형

각각의 페이지는 반응형을 이용하여 5가지의 width에 대응하도록 설계하였다.

# 트위티콘 차원문 ( 크롬익스텐션  ) 의 기능을 미리 해보기 용으로 포팅함

https://chrome.google.com/webstore/detail/%ED%8A%B8%EC%9C%84%ED%8B%B0%EC%BD%98-%EC%B0%A8%EC%9B%90%EB%AC%B8/hiiacklliopliehdgadldnhhpghlahla?hl=ko

크롬익스텐션에서 트위치 채팅창을 감지하여 원하는 기능을 임베드할 수 있는 트위치 챗 프레임워크위에서 돌아가던기존

기존 트위티콘 차원문의 로직을 트위티콘 사이트의 PC버전에서 사용할 수 있도록 이식하였습니다.
