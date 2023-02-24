// Extract the already learned features from MobileNet
const featureExtractor = ml5.featureExtractor('MobileNet', modelLoaded);
const classifierml5 = ml5.imageClassifier('MobileNet', modelLoaded);

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
function customModelLoaded() {
    console.log('custom model loaded');
}

const label = document.getElementById("label");

const labelOneBtn = document.querySelector("#labelOne");
const labelThreeBtn = document.querySelector("#labelThree");
const trainbtn = document.querySelector("#train");
const save = document.querySelector("#save");
const load = document.querySelector("#load");

labelOneBtn.addEventListener("click", () => classifier.addImage(document.getElementById("output"), 'dog'));
labelThreeBtn.addEventListener("click", () => classifyImage());

save.addEventListener("click", () => featureExtractor.save());
load.addEventListener("click", () => featureExtractor.load('https://github.com/thomasmartini/Dog-Detective/model.json', customModelLoaded));

function classifyImage(){
    classifier.classify(document.getElementById("output")).then((results) => {
        console.log(results);
        if(results[0].confidence > 0.85 && results[0].label == "dog"){
        label.innerText = "This is a " + results[0].label + ". Well done";
        speak(label.innerText);
}
else{
    classifierml5.classify(document.getElementById("output")).then((results) => {
        console.log(results);
        label.innerText = "This is not a dog, this is a " + results[0].label + ". Try again";
        speak(label.innerText);
    });
}
});
}

trainbtn.addEventListener("click", () => classifier.train((lossValue) => {
    console.log('Loss is', lossValue)
    }
    ));

const image = document.getElementById('output')
const classifier = featureExtractor.classification(image);


const fileButton = document.querySelector("#file")

fileButton.addEventListener("change", (event)=>{
    image.src = URL.createObjectURL(event.target.files[0])
})

label.innerText = "Take a picture of a dog";
speak(label.innerHTML);
