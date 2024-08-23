/**
 * Proxy 객체란
 * 파라미터로 받은 객체가 특정 액션이 취해졌을때
 * 이를 가로채 로직을 커스텀 할 수 있는 객체이다.
*/
// 자동차의 정보를 담고 있는 자동차 객체 생성
const Car = {
    name: "tobot",
    color: "red",
    wheelCount: 4,
    price: 1234,
}
// 자동차 객체가 취한 액션이 따라 실행될 로직을 정의
const CarHandler = {
    /**
     * get 함수 정의
     * Car 객체의 멤버변수에 값을 불러올때 실행할 함수
     * target: 액션이 취해진 Car객체
     * props: 불러온 멤버변수의 key값
     * 
     * ex) console.log(Car.price);
     * target: {name: "tobot", color: "red", wheelCount: 4, price: 1234}
     * props: "price"
    */
    get(target, props) {
        console.log(target, props) // ex) {name: "tobot", color: "red", wheelCount: 4, price: 1234}, 'price';

        // 반환값
        return "return value";
    },

    /**
     * set 함수 정의
     * Car 객체의 멤버변수에 값을 수정할때 실행할 함수
     * 룰: 만약 값이 정상적으로 수정되었다면 true를 
     * target: 액션이 취해진 Car객체
     * props: 불러온 멤버변수의 key값
     * value: 대입할 값
     * 
     * ex) proxy.color = "blue"
     * target: {name: "tobot", color: "red", wheelCount: 4, price: 1234}
     * props: color
     * value: "blue"
     */
    set(target, props, value){
        console.log(target, props, value); // ex) {name: "tobot", color: "red", wheelCount: 4, price: 1234}, 'price', "newTobot";
        console.log(`${props}에 ${value} 저장`)

        // 만약 수정하려는 멤버변수가 name 이나 wheelCount 라면 값 수정 하지않고 false 반환하기 (자동차의 이름과 바퀴갯수는 바뀔 수 없기 때문)
        if(props == "name" || props == "wheelCount") return;

        // 만약 수정하려는 멤버변수가 name 이나 wheelCount가 아니라면 값 수정;
        target[props] = value;

        // 값 수정이 정상적으로 수행되었으니 true 반환
        return true;
    },
    /**
     * 이 외에도...
     * has(): in 연산자가 작동할때
     * deleteProperty(): delete 연산자가 작동할때
     * construct(): new 연산자가 작동할때
     * apply(): 함수를 호출할 때
     */

}
const proxy = new Proxy(Car, CarHandler);

console.log(proxy.color); // "return value"
proxy.wheelCount = 1; // 값 수정 불가
proxy.color = "blue"; // 값 수정 가능

/**
 * 프록시 해제
 * 프록시는 
 * 프록시를 해제 하기 위해선 처음 프록시를 정의 할때 취소 가능 프록시(Revocable Proxy)로 정의 해야한다 
 * 취소 가능 프록시 생성법: Proxy.revocable(taret, handler);
 * 일반 프록시 생성법: new Proxy(target, handler); 
 */

/** 
 * revocable 로 생성시 아래와 같은 객체 반환
 * {proxy: proxy, revoke: revoke}
 * 반환된 객체 구조분해 할당
 * - proxy라는 이름으로 반환된 멤버 객체를 proxy2라는 이름의 상수에 저장
 * - revoke라는 이름을 반환된 멤버 함수를 revoke라는 이름의 상수에 저장
*/
const {proxy: proxy2 , revoke} = Proxy.revocable(Car, CarHandler);

try{
    // revoke 함수 사용시 프록시 사용 불가
    revoke();
    proxy2.color = "blue"; // 에러 프록시 사용 불가
    
} catch (e) {
    console.error(e.message); // 에러 메세지 출력
}