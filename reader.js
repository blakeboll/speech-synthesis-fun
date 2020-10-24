let readMe = '',
    voices = [],
    pitch=1,
    rate=10;

document.addEventListener('DOMContentLoaded', (e) => {
    let reader = window.speechSynthesis;
    window.setTimeout(() => {
        voices = reader.getVoices();
        for(i = 0; i < voices.length ; i++) {
            var option = document.createElement('option');
            option.textContent = voices[i].name + ' (' + voices[i].lang + ')';
            
            if(voices[i].default) {
                option.textContent += ' -- DEFAULT';
            }
        
            option.setAttribute('data-lang', voices[i].lang);
            option.setAttribute('data-name', voices[i].name);
            document.getElementById('voices').appendChild(option);
        }
    }, 200);

    const readIt = it => {
        if (reader.speaking || reader.pending || reader.paused) {
            reader.cancel();
        }
        const readableWords = new SpeechSynthesisUtterance(it);
        const voice = document.getElementById('voices').selectedOptions[0].getAttribute('data-name');
        for(i = 0; i < voices.length ; i++) {
            if(voices[i].name === voice) {
                readableWords.voice = voices[i];
            }
        }
        readableWords.pitch = pitch;
        readableWords.rate = rate / 10;
        reader.speak(readableWords)
    }


    document.getElementById('story').innerText = 'The quick brown fox jumped over the lazy dog';
    readMe = 'The quick brown fox jumped over the lazy dog';
    document.getElementById('story').addEventListener('keyup', kde => {
        if (kde.code === 'Enter') {
            readIt(readMe);
        } else {
            readMe = kde.target.value;
        }
    });
    document.getElementById('pitch').value = pitch;
    document.getElementById('rate').value = rate;
    document.getElementById('pitch').addEventListener('change', ce => {
        pitch = ce.target.value;
    });
    document.getElementById('rate').addEventListener('change', ce => {
        rate = ce.target.value;
    });
    document.getElementById('togglePlay').addEventListener('click', ce => {
        if (reader.paused) {
            reader.resume();
            return;
        }
        if (reader.speaking) {
            reader.pause();
            return;
        } 
    });
    document.getElementById('stop').addEventListener('click', ce => {
        if (reader.speaking || reader.paused || reader.pending) {
            reader.cancel();
        }
    });

    document.getElementById('readme-button').addEventListener('click', ce => readIt(readMe));
});