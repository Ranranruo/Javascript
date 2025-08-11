/**
 * LanguageDetector API Chrome 에서 실험적 기능으로 지원하는 API이다
 * 텍스트가 어느 언어인지 감지 할 수 있다.
 * 
 * 1. LanguageDetector.create() 메서드로 인스턴스를 할당한다. (Promise)
 * 2. 인스턴스의 detect메서드를 사용하여 언어를 감지한다. (Promise)
 * 
 * detect 결과값은 [...{confidence, detectedLanguage}] 형태의 객체 배열이며 배열 요소는 감지한 언어 확률대로 정렬되어 있다.
 * confidence: AI모델의 예측결과에 대한 확신도로 0~1값을 가지며 1에 가까울소록 모델의 예측이 정확할 것이라고 판단할 수 있다.
 * detectedLanguage: 어떤 언인지 감지 결과 (ko, en, hi...)
 */
if('LanguageDetector' in self) {
    console.log("현재 브라우저에서 Language Detector API를 지원합니다!");
}

const availability = await LanguageDetector.availability();
console.log(availability);

const detector = await LanguageDetector.create(); // 인스턴스 할당

const korean = "한국어입니다."; // 예측 텍스트
const english = "It's english"; // 예측 텍스트 

const koreanResult = await detector.detect(korean); // 예측
const englishResult = await detector.detect(english); // 예측

console.log(koreanResult);
console.log(englishResult);

console.log(koreanResult[0].confidence); // 0.996...
console.log(englishResult[0].confidence); // 0.996...

console.log(koreanResult[0].detectedLanguage); // ko
console.log(englishResult[0].detectedLanguage); // en