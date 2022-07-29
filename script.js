// Selecting the eye div
let eye_ref = document.querySelectorAll(".eye")

// Mousemove for devices with mouse and Touchmove for touchscreen devies
let events = ["mousemove","touchmove"]

// Check for touch Screen
function isTouchDevice() {
    try{
        document.createEvent("TouchEvent");
        return true;
    }
    catch(e){
        return false;
    }
}

//Same functions for both events
events.forEach((eventType) => {
    document.body.addEventListener(eventType, (event) => {
        eye_ref.forEach((eye) => {
            /* getBoundingClientRect() method returns the position relative to the viewport*/
            let eyeX = eye.getBoundingClientRect().left + eye.clientWidth /2;
            let eyeY = eye.getBoundingClientRect().top + eye.clientHeight /2;
            console.log(eyeX, eyeY)

            /* ClientX and ClientY return the position of the cursor from top left of the screen */
            var x = !isTouchDevice() ? event.clientX :
            event.touches[0].clientX;
            var y = !isTouchDevice() ? event.clientY :
            event.touches[0].clientY;

            /* Subtract x position of mouse from x position of eye and y position of mouse from y position of eye. Use atan2 (returns angle in radians)*/
            let radian = Math.atan2(x - eyeX, y - eyeY);

            // Convert radians into degrees
            let rotationDegrees = radian * (180 / Math.PI) * -1 + 180;

            // Rotate the eye
            eye.style.transform = "rotate(" + rotationDegrees + "deg)";
        });
    });
});