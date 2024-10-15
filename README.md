# 실전! SOLID 원칙을 지켜서 레거시 코드 리팩토링 하는 방법

## SOLID 원칙이란?

SOLID 원칙은 객체 지향 프로그래밍의 5대 설계 원칙을 의미한다. 이 원칙들은 소프트웨어를 설계할 때 지켜야 할 원칙들로, 이를 지키면 유지보수가 쉽고 확장성이 좋은 소프트웨어를 만들 수 있다.
이를 더 확장해서 프론트엔드의 레거시 코드를 리팩토링할 때도 적용할 수 있다.

### 1. SRP (Single Responsibility Principle)

SRP: 클래스는 단 하나의 책임을 가져야 한다. 클래스가 여러 책임을 가지게 되면, 한 책임이 변경되었을 때 다른 책임에 영향을 줄 수 있기 때문이다.

> Programming—use the same techniques for deciding if you should create a new function or object. One such technique is the single responsibility principle, that is, a component should ideally only do one thing. If it ends up growing, it should be decomposed into smaller subcomponents. - [React official documentation](https://reactjs.org/docs/design-principles.html)

컴포넌트는 하나의 책임을 가져야한다. 즉 컴포넌트는 이상적으로는 한 번에 한 가지 일만해야한다.

### 2. OCP (Open/Closed Principle)

OCP: 클래스는 확장에 대해서는 열려 있어야 하지만, 수정에 대해서는 닫혀 있어야 한다. 즉, 기존의 코드를 변경하지 않고 새로운 기능을 추가할 수 있어야 한다.

리액트에서는 render props나 children 을 사용하여 컴포넌트를 확장할 수 있다.

