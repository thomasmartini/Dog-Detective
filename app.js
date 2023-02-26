// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
const classifierml5 = ml5.imageClassifier('MobileNet', modelLoaded);

const image = document.getElementById('output')
const classifier = featureExtractor.classification(image);
const label = document.getElementById("label");
const score = document.getElementById("score");
const labelThreeBtn = document.querySelector("#labelThree");
const fileButton = document.querySelector("#file")
let scoreNumer = 0;

let synth = window.speechSynthesis

function speak(text) {
    if (synth.speaking) {
        console.log('still speaking...')
        return
    }
    if (text !== '') {
        let utterThis = new SpeechSynthesisUtterance(text)
        utterThis.lang = 'en-US';
        synth.speak(utterThis)
    }
}

// When the model is loaded
function modelLoaded() {
    console.log('Model Loaded!');
}
function loadCustomModel() {
    featureExtractor.load('https://thomasmartini.github.io/Dog-Detective/model.json');
    console.log('custom model loaded');
    speak("welcome to dog detective. take a picture of a dog and i will tell you if it is a dog or not.");
}

labelThreeBtn.addEventListener("click", () => classifyImage());

function classifyImage() {
    classifier.classify(document.getElementById("output")).then((results) => {
        console.log(results);
        if (results[0].confidence > 0.85 && results[0].label == "dog") {
            label.innerText = "This is a " + results[0].label + ". Well done";
            speak(label.innerText);
            scoreNumer += 1;
            score.innerText = "Your Score: " + scoreNumer;
        }
        else {
            classifierml5.classify(document.getElementById("output")).then((results) => {
                console.log(results);
                label.innerText = "This is not a dog, this is a " + results[0].label + ". Try again";
                speak(label.innerText);
            });
        }
    });
}

fileButton.addEventListener("change", (event) => {
    image.src = URL.createObjectURL(event.target.files[0])
})

label.innerText = "Take a picture of a dog!";
loadCustomModel();