
export function AppConstants () {
    return {
        operations: ['FT', 'CSP', 'WS']        
    };
}

export function showNotification (mode = 'is-primary', message = '') {
    let notif = document.createElement('div');
    notif.classList.add('notification', mode);
    
    let close_btn = document.createElement('button');
    close_btn.classList.add('delete');
    
    let msg_container = document.createElement("P");
    let msg = document.createTextNode(message); 
    msg_container.appendChild(msg);
    
    notif.appendChild(close_btn);
    notif.appendChild(msg_container);
    
    let notif_container = document.querySelector('#notif-container');
    
    notif_container.appendChild(notif)
    
    close_btn.addEventListener('click', function(){
        notif_container.removeChild(notif);
    });
}

export function formatJSDate (js_date) {
    let date = new Date(js_date);
    return (date.getFullYear() + '-'
    + ('0' + (date.getMonth() + 1)).slice(-2)
    + '-' + ('0' + (date.getDate())).slice(-2)
    + ' ' + ('0' + (date.getHours())).slice(-2)
    + ':' + ('0' + (date.getMinutes())).slice(-2)
    + ':' + ('0' + (date.getSeconds())).slice(-2));
}

export function getParentNode(htmlElementNode, target) {
    while (htmlElementNode) {
        htmlElementNode = htmlElementNode.parentNode;
        if (htmlElementNode.tagName.toLowerCase() === target) {
            return htmlElementNode;
        }
    }
    return undefined;
}