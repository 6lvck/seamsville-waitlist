const waitlistForm = document.getElementById('waitlist-form');
const inputContainer = document.getElementById('input-container');
const email = document.getElementById('email');
const joinButton = document.getElementById('join');
const modal = document.getElementById('modal');
const overlay = document.getElementById('overlay');
const line = document.getElementById('underline');
const cancel = document.getElementById('cancel');

const error  = {};
const data = {};
const waitlist = [];
function emptyChecker(obj){
    let isEmpty = true;
    for(const key in obj){
        if(obj.hasOwnProperty(key)) isEmpty = false;
    }
    return isEmpty
}
waitlistForm.addEventListener('submit', (e) =>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) || email.value !== '') {
        data.email = email.value;0
        delete error.email;
        inputContainer.style.background = '';
        email.style.background = ''
      } else {
        error.email = 'invalid email';
        inputContainer.style.background = 'rgb(255, 140, 140)';
        email.style.background = 'rgb(255, 140, 140)'
      }
    if(emptyChecker(error)){
            joinButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto;; display: block; shape-rendering: auto;" width="50px" height="50px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="50" cy="50" fill="none" stroke="#0a0a0a" stroke-width="5" r="19" stroke-dasharray="89.5353906273091 31.845130209103033" transform="rotate(10.1383 50 50)"><animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="1s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform></circle></svg>';
            joinButton.disabled = true;
            waitlist.push(data.email);
            modal.style.display = 'block';
            overlay.style.visibility = 'visible';
            line.style.visibility = 'hidden';
    }
    console.log(error);
    e.preventDefault();
});
cancel.addEventListener('click', ()=>{
    modal.style.display = 'none';
    overlay.style.visibility = 'hidden';
    line.style.visibility = 'visible';
})