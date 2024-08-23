/**
 * delete 키워드는 객체의 속성값을 삭제하고 메모리 할당을 해제 할때 사용하는 키워드이다
 * - delete 키워드 사용 가능 객체들
 * 객체 - const Person = {name: "hunam", age: "18"}; (O)
 * 배열 - const colors = ['red', 'blue', 'green']; (O)
 * 상수 - const number = 8; (X)
 * 변수 - let variable = 3; (X)
 * 함수 - function hello() {console.log("hello")}; (X)
 * 화살표 함수 - const func = () => console.log("func"); (X)
 */

// 객체의 멤버 변수 해제
const Product = {
    name: "TV",
    price: 123456789,
    size: "very big"
}

console.log(Product.name) // "TV"

// 객체의 멤버 변수를 삭제하고 메모리에서 지워버린다.
delete Product.name
console.log(Product.name) // undefined

// 삭제된 멤버 변수는 메모리에서 지워지기 때문에 undefined로 남아있지 않고 공간자체가 사라진다.
console.log(Product) // {price: 123456789, size: "very big"}

// 객체 자체를 해제하지는 못한다.
delete Product; // 해제 안됨
console.log(Product); // {price: 123456789, suze: "very big"}



const arr = [1,2,3,4,5];

// 배열의 원소 값을 삭제하고 메모리에서 지워버린다.
delete arr[1];

// 삭제된 원소는 undefined가 아닌 empty 로 남게 된다.
console.log(arr) // [1, empty, 3, 4, 5]

// 물론 arr[1]를 직접 참조하게 되면 공간이 비어있기 때문에 undefined가 반환된다.
console.log(arr[1])

// 배열도 마찬가지로 배열 자체를 해제하는것은 안된다.
delete arr;

console.log(arr) // [1, empty, 3, 4, 5]