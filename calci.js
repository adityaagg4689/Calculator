let num1 = '';
let num2 = '';
let op = '';
let c = 0;
let visual = '';

function add(num1, num2) {
    return num1 + num2;
}

function sub(num1, num2) {
    return num1 - num2;
}

function mul(num1, num2) {
    return num1 * num2;
}

function div(num1, num2) {
    if (num2 == 0) {
        alert('Division by zero is not possible');
        return NaN;
    }
    return num1 / num2;
}



let button = document.querySelectorAll('.buttons button');
let display = document.querySelector('.display');

function disp() {
    display.innerText = visual;
}

function clear() {
    num1 = '';
    num2 = '';
    op = '';
    c = 0;
    visual = '';
    disp();
}

function back() {
    if (c == 0) {
        num1 = num1.slice(0, -1);
    } else {
        num2 = num2.slice(0, -1);
    }
    visual = visual.slice(0, -1);
    disp();
}

function ans(x, y, op) {
    x = parseFloat(x);
    y = parseFloat(y);
    if (isNaN(x) || isNaN(y)) {
        alert('Invalid input');
        return;
    }

    let ans;
    if (op == '+') {
        ans = add(x, y);
    } else if (op == '-') {
        ans = sub(x, y);
    } else if (op == '*') {
        ans = mul(x, y);
    } else if (op == '/') {
        ans = div(x, y);
    } else if (op == '%') {
        ans = mod(x, y);
    } else if (op == '^') {
        ans = Math.pow(x, y);
    } else {
        alert('Invalid Operator');
        return;
    }

    if (isNaN(ans)) {
        alert('Invalid operation');
        return;
    }

    if (typeof ans == 'number' && ans % 1 != 0) {
        ans = ans.toFixed(2);
    }

    visual = ans;
    disp();

    num1 = ans.toString(); 
    num2 = '';
    op = '';
    c = 0;
    return ans;
}

function identify(k) {
    if (k === '1' || k === '2' || k === '0' || k === '3' || k === '4' || k === '5' || k === '6' || k === '7' || k === '8' || k === '9') {
        if (c == 0) {
            num1 += k;
            visual += k;
            disp();
        } else {
            num2 += k;
            visual += k;
            disp();
        }
    } else if (k === '+' || k === '-' || k === '*' || k === '/') {
        if (num1 === '') {
            alert('Please enter a number first');
            return;
        }
        if (num2 !== '') {
          
            ans(num1, num2, op);
            op = k;
            c = 1;
            visual += k;
            disp();
        } else {
            op = k;
            c = 1;
            visual += k;
            disp();
        }
    } else if (k === '.') {
        if (c === 0 && !num1.includes('.')) {
            num1 += '.';
            visual += k;
            disp();
        } else if (c === 1 && !num2.includes('.')) {
            num2 += '.';
            visual += k;
            disp();
        }
    } else if (k === 'C') {
        clear();
    } else if (k === 'DEL') {
        back();
    } else if (k === '=') {
        if (num1 === '' || num2 === '') {
            alert('Please enter both numbers');
            return;
        }
        return ans(num1, num2, op);
    }
}

button.forEach((butt) => {
    butt.addEventListener('click', () => {
        let k = butt.textContent;
        identify(k);
    });
});