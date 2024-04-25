# 오늘 뭐 부르지? 🎤

![오늘 뭐 부르지](https://github.com/accelKim/musicToday/assets/141791880/f0634074-a79d-42ab-b03f-91aeba7dddde)

## 프로젝트 소개

-   오늘 뭐 부르지?는 노래의 검색과 저장 그리고 재생 및 가사를 제공하는 서비스 입니다 노래방에서 다른 어플보다 간단하게 사용할 수 있도록 노력해보았습니다.

## 개발환경

-   Front : HTML,CSS,Javascript
-   Back-end : Genius Api

## 프로젝트 구조

```
📦musicToday
 ┣ 📂common
 ┃ ┣ 📜login.css
 ┃ ┣ 📜my_reset.css
 ┃ ┗ 📜style.css
 ┣ 📂img
 ┃ ┣ 📜background.jpg
 ┃ ┗ 📜images.jpg
 ┣ 📂js
 ┃ ┣ 📜common.js
 ┃ ┗ 📜login.js
 ┣ 📂page
 ┃ ┗ 📜login.html
 ┣ 📜index.html
 ┗ 📜README.md
```

## 프로젝트 개요

-   프로젝트 목표: API 활용 능력 향상과 함께 로컬 스토리지를 이용한 마이리스트 및 로그인 회원가입 구현
-   API 활용 학습: API 활용에만 집중
-   로컬 스토리지 활용: Json-Server나 DB를 사용하는 대신에 바닐라 자바스크립트만을 이용하여 프로젝트를 구현하여 실험
-   기술적 제한: 모듈을 사용하지 않고 바닐라 자바스크립트만을 사용한 이유는 프로젝트의 규모와 목적에 적합하다고 판단

## 결론

-   이 프로젝트를 통해 API와 로컬 스토리지의 활용에 대한 이해가 높아졌고, 바닐라 자바스크립트로도 다양한 기능을 구현할 수 있다는 것을 깨달았습니다. ~~만 역시 쓸 수 있는거는 전부 활용해서 만든는게 편하고 좋다~~

## 트러블 슈팅

[노래가 없는데 왜 주소를 던지니 API야](https://github.com/accelKim/musicToday/wiki/%EB%85%B8%EB%9E%98%EA%B0%80-%EC%97%86%EB%8A%94%EB%8D%B0-%EC%99%9C-%EC%A3%BC%EC%86%8C%EB%A5%BC-%EB%8D%98%EC%A7%80%EB%8B%88-API%EC%95%BC)

## 개선 목표

-   json-server || SQl을 활용
-   회원가입시 회원의 비밀번호를 암호화하여 DB에 저장
-   JWT활용
-   CSS 최적화
