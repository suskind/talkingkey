(function(window, document) {

    /** 
     * ###################################
     * ########### KEY MAP ###############
     * ###################################
     *
     * Each map item must be: 
     *
     * 'keyCode': {
     *  'ogg': 'sounds/file.ogg',
     *  'mp4': 'sounds/file.mp4'
     * }
     *
     * in keyCode can you use "shitf", "alt", "ctrl" and "cmd" mapping as 
     * 'shift-keyCode': { ... }
     * 'ctrl-keyCode': { ... }
     * 'alt-keyCode': { ... }
     * 'cmd-keyCode': { ... }
     *
     */
    
    var map = {
        "57": {
            'ogg': 'sounds/nine.ogg',
            'mp4': 'sounds/nine.m4a'
        },
        "shift-79": {
            'ogg': 'sounds/oh.ogg',
            'mp4': 'sounds/oh.m4a'
        }
    };

    /**
     * ###################################
     * ######### END OF KEY MAP ##########
     * ###################################
     */


    var addEvent = function(eventName, callBack) {
        if(document.addEventListener) {
            document.addEventListener(eventName, callBack, false);
        } else {
            document.attachEvent('on'+eventName, callBack);
        }
    };

    var audio, 
        source1, 
        source2, 
        specialKey = '',
        lastPlayed = null;

    addEvent('keydown', function(event) {
            var keyCode = event.keyCode;
            switch(keyCode) {
                case 16:
                    specialKey = 'shift-';
                    break;
                case 17:
                    specialKey = 'ctrl-';
                    break;
                case 18:
                    specialKey = 'alt-';
                    break;
                case 224:
                    specialKey = 'cmd-';
                    break;
            }

            if(specialKey + keyCode in map) {
                if(lastPlayed !== specialKey + keyCode) {
                    if(audio && audio.parentNode) {
                        audio.parentNode.removeChild(audio);
                    }
                    if(source1) {
                        source1.parentNode.removeChild(source1);
                    }
                    if(source2) {
                        source2.parentNode.removeChild(source2);
                    }
   
                    audio = window.document.createElement('audio'); 
                    source1 = window.document.createElement('source');
                    source2 = window.document.createElement('source');
                    source1.setAttribute('type', 'audio/ogg');
                    source2.setAttribute('type', 'audio/mp4');
                    source1.setAttribute('src', map[specialKey + keyCode].ogg);
                    source2.setAttribute('src', map[specialKey + keyCode].mp4);

                    audio.appendChild(source1);
                    audio.appendChild(source2);

                    lastPlayed = specialKey + keyCode;

                } else {
                    if(audio.pause && audio.currentTime) {
                        audio.pause();
                        audio.currentTime=0;
                    }
                }
                if(audio.play) {
                    audio.play();
                }
            }


        });

    addEvent('keyup', function(event) {
            var keyCode = event.keyCode;
            if(specialKey !== '' && (keyCode === 16 || keyCode === 17 || keyCode === 18 || keyCode === 224)) {
                specialKey = '';
            }

        });

})(window, document);
