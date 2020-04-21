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
const proxy = 'https://cors-anywhere.herokuapp.com/';
function emptyChecker(obj){
    let isEmpty = true;
    for(const key in obj){
        if(obj.hasOwnProperty(key)) isEmpty = false;
    }
    return isEmpty
}
waitlistForm.addEventListener('submit', (e) =>{
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value) || email.value !== '') {
        data.email = email.value;
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
            axios.post(`${proxy}https://seamsville.herokuapp.com/api/v1/waitlist/add`, data)
            .then(res =>{
                console.log(res)
                modal.style.display = 'block';
                overlay.style.visibility = 'visible';
                line.style.visibility = 'hidden';
                joinButton.innerHTML = 'Get early access';
                joinButton.disabled = false;
            })
            .catch(err => {
                modal.style.display = 'block';
                overlay.style.visibility = 'visible';
                line.style.visibility = 'hidden';
                modal.innerHTML = `
                <svg id='cancel' cursor='pointer' width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><defs><path id="icon-close_svg__a" d="M0 1.5L1.5 0 8 6.5 14.5 0 16 1.5 9.5 8l6.5 6.5-1.5 1.5L8 9.5 1.5 16 0 14.5 6.5 8z"></path></defs><use xlink:href="#icon-close_svg__a" transform="translate(4 4)"></use></svg>
                <img src = '../static/emoji.svg' style='width: 20%'>
                <h1>${err.response.data}</h1>
                `;
                joinButton.innerHTML = 'Get early access';
                joinButton.disabled = false;
                const cancel = document.getElementById('cancel');
                cancel.addEventListener('click', ()=>{
                    modal.style.display = 'none';
                    overlay.style.visibility = 'hidden';
                    line.style.visibility = 'visible';
                })
            })
    }
    console.log(data);
    e.preventDefault();
});
cancel.addEventListener('click', ()=>{
    modal.style.display = 'none';
    overlay.style.visibility = 'hidden';
    line.style.visibility = 'visible';
})