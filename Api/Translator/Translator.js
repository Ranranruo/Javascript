/**
 * Translator API는 chrome에서만 실험적 기능으로 제공하는 API로
 * 텍스트를 다른 언어로 번역해주는 API이다.
 * 현재는 데스크톱 Chrome 에서만 작동한다. (2025.08.05)
 * 
 * Translator API로 텍스트를 번역하기 위해선 다음과 같은 과정을 따라야 한다.
 * 1. Translator가 현재 브라우저에서 제공되는지 체크한다.
 * 2. Translator.create() 메서드에 input 언어와 result 언어에 대한 인자 값을 넣어 인스턴스를 비동기적(Promise)으로 할당한다.
 * 3. Translator 인스턴스의 tranlate 비동기(Promise) 메서드를 통해 번역한다.
 * 
 * -- 주의사항 --
 * Translator.create() 메서드는 명시적인 행동 없이 실행될 수 없다
 * 코드가 페이지가 로드 되자마자 실행되기 때문에, 브라우저는 AI 모델을 다운로드하거나 초기화할 권한이 없다고 판단한다.
 * setTimeout, setInterval로 감싸면 명시적인 행동 없이 실행 할 수 있다.
 * (X) js파일을 실행하는 즉시 Translator.create() 메서드를 실행함
 * (O) 특정 버튼을 클릭 시 Trnaslator.create() 메서드를 실행함
 * (O) Translator.create() 메서드를 setTimeout callback 메서드 안에서 실행
 * 
 * 페이지가 로딩되자마자 Trnaslator.create() 메서드를 실행했을때 나는 오류
 * Uncaught SyntaxError: await is only valid in async functions and the top level bodies of modules (at Translator.js:17:20)
*/

document.querySelector("button").addEventListener("click", async () => {
    if ("Translator" in self) {
      console.log("API지원"); // 브라우저가 Tranlator API 제공하는지 체크
    }
    const translator = await Translator.create({ // 번역기 인스턴스 생성
      sourceLanguage: "ko", // input 언어
      targetLanguage: "en", // result 언어
    });
    
    const inputText = "안녕하세요!"; // input Text
    
    const resultText = await translator.translate(inputText);
    
    console.log(resultText); // Hello!
})